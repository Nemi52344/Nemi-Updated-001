// Supabase Edge Function — Resume submission (Drop Resume form)
// Handles storage upload + DB insert + email notification in one call.
// Uses service role key so it bypasses RLS — call only from server-trusted
// flows (here: after client-side OTP verify gates the request).
//
// Deploy:
//   supabase functions deploy submit-application --no-verify-jwt
//   supabase secrets set RESEND_API_KEY=re_xxx
//
// Required Function secrets:
//   RESEND_API_KEY                 re_xxx
//   SUPABASE_URL                   (auto-populated)
//   SUPABASE_SERVICE_ROLE_KEY      (auto-populated)
// Optional:
//   FROM_EMAIL  defaults to info@nemi-ai.com
//   FROM_NAME   defaults to "NEMI AI Careers"
//   NOTIFY_TO   defaults to info@nemi-ai.com
//   RESUME_BUCKET  defaults to "resumes"

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
const FROM_NAME = Deno.env.get("FROM_NAME") ?? "NEMI AI Careers";
const NOTIFY_TO = Deno.env.get("NOTIFY_TO") ?? "info@nemi-ai.com";
const RESUME_BUCKET = Deno.env.get("RESUME_BUCKET") ?? "resumes";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false, autoRefreshToken: false },
});

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

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

interface ApplicationPayload {
  full_name?: string;
  email?: string;
  phone?: string;
  about?: string;
  interests?: string;
  wants_to_work_on?: string;
  resume_name?: string;
  resume_type?: string;
  resume_base64?: string;
  role?: string;
  department?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const body = (await req.json()) as ApplicationPayload;
    const fullName = (body.full_name ?? "").trim();
    const email = (body.email ?? "").trim().toLowerCase();
    const phone = (body.phone ?? "").trim();
    const about = (body.about ?? "").trim();
    const interests = (body.interests ?? "").trim();
    const wantsToWorkOn = (body.wants_to_work_on ?? "").trim();
    const resumeName = (body.resume_name ?? "").trim();
    const resumeType = (body.resume_type ?? "application/octet-stream").trim();
    const resumeB64 = body.resume_base64 ?? "";
    const role = (body.role ?? "General Application").trim();
    const department = (body.department ?? "AI Screening").trim();

    if (!fullName || !email || !resumeB64 || !resumeName) {
      return json({ ok: false, error: "Missing required fields" }, 400);
    }

    // 1) Upload resume bytes to Supabase Storage (service role bypasses RLS)
    const safeName = resumeName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${Date.now()}_${safeName}`;
    const bytes = base64ToBytes(resumeB64);

    const { error: uploadErr } = await supabase.storage
      .from(RESUME_BUCKET)
      .upload(filePath, bytes, {
        contentType: resumeType,
        upsert: false,
      });
    if (uploadErr) {
      console.error("storage upload error:", uploadErr);
      return json({ ok: false, error: `Storage: ${uploadErr.message}` }, 500);
    }

    // 2) Insert row into applications table
    const coverLetter = [
      about && `About:\n${about}`,
      interests && `Interests:\n${interests}`,
      wantsToWorkOn && `Wants to work on:\n${wantsToWorkOn}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const { error: insertErr } = await supabase.from("applications").insert({
      role,
      department,
      full_name: fullName,
      email,
      phone: phone || null,
      location: null,
      experience: null,
      linkedin: null,
      portfolio: null,
      cover_letter: coverLetter || null,
      resume_path: filePath,
    });
    if (insertErr) {
      console.error("db insert error:", insertErr);
      return json({ ok: false, error: `DB: ${insertErr.message}` }, 500);
    }

    // 3) Generate signed URL (7 days) for the resume
    const { data: signed } = await supabase.storage
      .from(RESUME_BUCKET)
      .createSignedUrl(filePath, 60 * 60 * 24 * 7);
    const resumeLink = signed?.signedUrl ?? "(unavailable)";

    // 4) Send notification email to info@nemi-ai.com via Resend
    if (RESEND_API_KEY) {
      const notifyHtml = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1a1a1a">
  <h2 style="margin:0 0 16px;font-size:20px;color:#6b22c4">New resume submission</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6">
    <tr><td style="padding:6px 0;color:#666;width:140px"><strong>Name</strong></td><td style="padding:6px 0">${escapeHtml(fullName)}</td></tr>
    <tr><td style="padding:6px 0;color:#666"><strong>Email</strong></td><td style="padding:6px 0">${escapeHtml(email)} (verified)</td></tr>
    ${phone ? `<tr><td style="padding:6px 0;color:#666"><strong>Phone</strong></td><td style="padding:6px 0">${escapeHtml(phone)}</td></tr>` : ""}
    <tr><td style="padding:6px 0;color:#666"><strong>Role</strong></td><td style="padding:6px 0">${escapeHtml(role)}</td></tr>
  </table>
  <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
  ${about ? `<h3 style="margin:0 0 6px;font-size:14px;color:#333">About</h3><p style="white-space:pre-wrap;font-size:13px;line-height:1.6;color:#333;margin:0 0 16px">${escapeHtml(about)}</p>` : ""}
  ${interests ? `<h3 style="margin:0 0 6px;font-size:14px;color:#333">Interests</h3><p style="white-space:pre-wrap;font-size:13px;line-height:1.6;color:#333;margin:0 0 16px">${escapeHtml(interests)}</p>` : ""}
  ${wantsToWorkOn ? `<h3 style="margin:0 0 6px;font-size:14px;color:#333">Wants to work on</h3><p style="white-space:pre-wrap;font-size:13px;line-height:1.6;color:#333;margin:0 0 16px">${escapeHtml(wantsToWorkOn)}</p>` : ""}
  <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
  <p style="font-size:14px;margin:0"><a href="${resumeLink}" style="color:#6b22c4;font-weight:600">Download resume (${escapeHtml(safeName)})</a> — link valid 7 days</p>
</div>`;

      const notifyRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `${FROM_NAME} <${FROM_EMAIL}>`,
          to: [NOTIFY_TO],
          reply_to: email,
          subject: `New resume: ${fullName} — ${role}`,
          html: notifyHtml,
        }),
      });

      if (!notifyRes.ok) {
        const errText = await notifyRes.text();
        console.error("Resend notify error:", notifyRes.status, errText);
        // Don't fail the whole submission — DB row + storage upload already succeeded.
      }

      // Auto-confirm email to the applicant
      const firstName = fullName.split(/\s+/)[0];
      const confirmHtml = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#1a1a1a">
  <h2 style="margin:0 0 16px;font-size:20px">Thanks, ${escapeHtml(firstName)}!</h2>
  <p style="font-size:14px;line-height:1.6;color:#333;margin:0 0 16px">We've received your resume for NEMI AI. Our team will review it and reach out at <strong>${escapeHtml(email)}</strong> if there's a fit.</p>
  <p style="font-size:14px;line-height:1.6;color:#333;margin:0 0 24px">In the meantime, feel free to explore what we're building at <a href="https://nemi-ai.com" style="color:#6b22c4">nemi-ai.com</a>.</p>
  <p style="font-size:12px;color:#888;margin:0">— The NEMI AI team</p>
</div>`;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `${FROM_NAME} <${FROM_EMAIL}>`,
          to: [email],
          subject: `We received your NEMI AI application`,
          html: confirmHtml,
        }),
      }).catch((err) => console.error("Resend confirm error:", err));
    } else {
      console.log(`[APPLICATION] (no RESEND_API_KEY) ${fullName} <${email}>`);
    }

    return json({ ok: true, resume_path: filePath });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("submit-application error:", msg);
    return json({ ok: false, error: msg }, 500);
  }
});
