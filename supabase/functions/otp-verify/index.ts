// Supabase Edge Function — OTP verify
// Verifies a code previously issued by otp-send. Hashes the input and compares
// against the stored hash. On success the row is deleted (single-use).

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const MAX_ATTEMPTS = 5;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const codeRegex = /^\d{4,8}$/;

const messages: Record<string, string> = {
  no_code: "Request a code first",
  expired: "Code expired — request a new one",
  too_many_attempts: "Too many attempts — request a new code",
  wrong_code: "Invalid code",
};

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const body = (await req.json()) as { email?: string; code?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    const code = String(body.code ?? "").trim();

    if (!email || !emailRegex.test(email)) {
      return json({ ok: false, error: "Invalid email" }, 400);
    }
    if (!codeRegex.test(code)) {
      return json({ ok: false, error: "Invalid code" }, 400);
    }

    const { data, error } = await supabase
      .from("otp_codes")
      .select("code_hash, expires_at, attempts")
      .eq("email", email)
      .maybeSingle();

    if (error || !data) {
      return json({ ok: false, error: messages.no_code }, 400);
    }

    if (new Date(data.expires_at).getTime() < Date.now()) {
      await supabase.from("otp_codes").delete().eq("email", email);
      return json({ ok: false, error: messages.expired }, 400);
    }

    if (data.attempts >= MAX_ATTEMPTS) {
      await supabase.from("otp_codes").delete().eq("email", email);
      return json({ ok: false, error: messages.too_many_attempts }, 400);
    }

    const codeHash = await sha256Hex(code);
    if (data.code_hash !== codeHash) {
      await supabase
        .from("otp_codes")
        .update({ attempts: data.attempts + 1 })
        .eq("email", email);
      return json({ ok: false, error: messages.wrong_code }, 400);
    }

    await supabase.from("otp_codes").delete().eq("email", email);
    return json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return json({ ok: false, error: msg }, 500);
  }
});
