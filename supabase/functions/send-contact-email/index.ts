// Supabase Edge Function — Contact form email
// Posts a contact form submission to info@nemi-ai.com via Resend.
//
// Deploy:
//   supabase functions deploy send-contact-email --no-verify-jwt
//   supabase secrets set RESEND_API_KEY=re_xxx
//
// Required Function secrets:
//   RESEND_API_KEY   re_xxxxxxxxxxxxxxxxxxxxxxxx
// Optional:
//   FROM_EMAIL  defaults to info@nemi-ai.com
//   FROM_NAME   defaults to "NEMI AI Contact"
//   NOTIFY_TO   defaults to info@nemi-ai.com

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "info@nemi-ai.com";
const FROM_NAME = Deno.env.get("FROM_NAME") ?? "NEMI AI Contact";
const NOTIFY_TO = Deno.env.get("NOTIFY_TO") ?? "info@nemi-ai.com";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const body = (await req.json()) as ContactPayload;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim().toLowerCase();
    const phone = (body.phone ?? "").trim();
    const company = (body.company ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !message) {
      return json({ ok: false, error: "Missing required fields" }, 400);
    }

    const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a">
  <h2 style="margin:0 0 16px;font-size:20px;color:#6b22c4">New contact form submission</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6">
    <tr><td style="padding:6px 0;color:#666;width:120px"><strong>Name</strong></td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
    <tr><td style="padding:6px 0;color:#666"><strong>Email</strong></td><td style="padding:6px 0">${escapeHtml(email)} (verified)</td></tr>
    ${phone ? `<tr><td style="padding:6px 0;color:#666"><strong>Phone</strong></td><td style="padding:6px 0">${escapeHtml(phone)}</td></tr>` : ""}
    ${company ? `<tr><td style="padding:6px 0;color:#666"><strong>Company</strong></td><td style="padding:6px 0">${escapeHtml(company)}</td></tr>` : ""}
  </table>
  <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
  <h3 style="margin:0 0 8px;font-size:15px;color:#333">Message</h3>
  <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;color:#333;margin:0">${escapeHtml(message)}</p>
</div>`;

    const text = [
      `New contact form submission`,
      ``,
      `Name: ${name}`,
      `Email: ${email} (verified)`,
      phone ? `Phone: ${phone}` : null,
      company ? `Company: ${company}` : null,
      ``,
      `Message:`,
      message,
    ].filter(Boolean).join("\n");

    if (!RESEND_API_KEY) {
      console.log(`[CONTACT] (no RESEND_API_KEY) ${name} <${email}> "${message.slice(0, 60)}"`);
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
        to: [NOTIFY_TO],
        reply_to: email,
        subject: `Contact form: ${name}${company ? ` (${company})` : ""}`,
        html,
        text,
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
