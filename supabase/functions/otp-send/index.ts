// Supabase Edge Function — OTP send
// Runs on Deno. Replaces the Next.js /api/otp/send route so the static-host
// (AWS + nginx) frontend can request OTPs without needing a Node server.
//
// Required Function secrets (set in Supabase dashboard → Edge Functions → Settings):
//   RESEND_API_KEY     re_xxxxxxxxxxxxxxxxxxxxxxxx
//   SUPABASE_URL       auto-populated by Supabase
//   SUPABASE_SERVICE_ROLE_KEY  auto-populated by Supabase
// Optional:
//   FROM_EMAIL  defaults to info@nemi-ai.com
//   FROM_NAME   defaults to NEMI

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "info@nemi-ai.com";
const FROM_NAME = Deno.env.get("FROM_NAME") ?? "NEMI";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const TTL_MS = 10 * 60 * 1000; // 10 minutes
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function sha256Hex(value: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const emailHtml = (code: string) => `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#1a1a1a">
  <h2 style="margin:0 0 16px;font-size:20px">Verify your email</h2>
  <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#555">Use this code to verify your email with NEMI.</p>
  <div style="font-size:32px;font-weight:700;letter-spacing:.4em;padding:18px 24px;background:#f4f1ff;border-radius:8px;text-align:center;color:#6b22c4">${code}</div>
  <p style="margin:24px 0 0;font-size:12px;color:#888;line-height:1.5">This code expires in 10 minutes. If you didn't request it, you can safely ignore this email.</p>
  <p style="margin:16px 0 0;font-size:12px;color:#aaa">— NEMI</p>
</div>`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const body = (await req.json()) as { email?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    if (!email || !emailRegex.test(email)) {
      return json({ ok: false, error: "Invalid email" }, 400);
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const codeHash = await sha256Hex(code);

    const { error: dbErr } = await supabase.from("otp_codes").upsert(
      {
        email,
        code_hash: codeHash,
        expires_at: new Date(Date.now() + TTL_MS).toISOString(),
        attempts: 0,
      },
      { onConflict: "email" },
    );
    if (dbErr) {
      return json({ ok: false, error: `DB: ${dbErr.message}` }, 500);
    }

    if (!RESEND_API_KEY) {
      // Dev fallback — log the code so you can see it in the function logs.
      console.log(`[OTP] (no RESEND_API_KEY set) ${email}  Code: ${code}`);
      return json({ ok: true, dev: true });
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [email],
        subject: `Your NEMI verification code: ${code}`,
        html: emailHtml(code),
        text: `Your NEMI verification code is ${code}. Expires in 10 minutes.`,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", resendRes.status, errText);
      return json(
        { ok: false, error: `Email send failed (${resendRes.status})` },
        502,
      );
    }

    return json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return json({ ok: false, error: msg }, 500);
  }
});
