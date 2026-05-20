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
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = SUPABASE_URL && SERVICE_ROLE
  ? createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

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

    // 1) Persist to DB (service-role bypasses RLS). Logs row even if email fails.
    if (supabase) {
      const { error: dbErr } = await supabase.from("contact_submissions").insert({
        full_name: name,
        email,
        phone: phone || null,
        company: company || null,
        message,
      });
      if (dbErr) {
        console.error("contact_submissions insert error:", dbErr);
        // Continue — we still try to send email so the team is notified.
      }
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

    // Auto-confirmation back to the submitter
    const firstName = name.split(/\s+/)[0];
    const confirmHtml = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:36px 28px;color:#1a1a1a;background:#ffffff">
  <div style="text-align:center;margin-bottom:28px">
    <div style="display:inline-block;background:linear-gradient(135deg,#6b22c4,#9333ea);width:56px;height:56px;border-radius:14px;line-height:56px;color:#fff;font-size:24px;font-weight:700">✓</div>
  </div>
  <h1 style="margin:0 0 14px;font-size:22px;font-weight:700;text-align:center;color:#111">Thank you for getting in touch, ${escapeHtml(firstName)}.</h1>
  <p style="font-size:15px;line-height:1.65;color:#444;margin:0 0 20px;text-align:center">We've received your message at the NEMI AI team and someone will be in touch shortly.</p>
  <div style="background:#f7f4ff;border-left:3px solid #6b22c4;padding:16px 20px;border-radius:8px;margin:0 0 24px">
    <p style="font-size:14px;line-height:1.6;color:#333;margin:0 0 8px"><strong>What happens next?</strong></p>
    <p style="font-size:14px;line-height:1.6;color:#444;margin:0">We'll get back to you at <strong>${escapeHtml(email)}</strong> within one business day with the right next step — whether that's a quick call, a tailored deck, or a direct intro.</p>
  </div>
  <p style="font-size:14px;line-height:1.6;color:#444;margin:0 0 20px">If you'd like to read more about what we're building in the meantime, head over to <a href="https://nemi-ai.com" style="color:#6b22c4;font-weight:600;text-decoration:none">nemi-ai.com</a>.</p>
  <p style="font-size:14px;color:#6b22c4;font-weight:600;margin:0">— The NEMI AI Team</p>
  <hr style="border:none;border-top:1px solid #eee;margin:28px 0 16px"/>
  <p style="font-size:11px;color:#999;margin:0;text-align:center">NEMI AI · Full-stack manufacturing automation with Physical AI</p>
</div>`;

    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [email],
        subject: `Thank you for contacting NEMI AI, ${firstName}`,
        html: confirmHtml,
      }),
    }).catch((err) => console.error("Resend confirm error:", err));

    return json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return json({ ok: false, error: msg }, 500);
  }
});
