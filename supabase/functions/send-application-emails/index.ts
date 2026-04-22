// Supabase Edge Function: sends two emails when a new application is inserted.
// 1. Notification to Humans@nemi-ai.com with applicant details + resume signed URL.
// 2. Auto-confirmation to the applicant.
//
// Deploy:
//   supabase functions deploy send-application-emails --no-verify-jwt
//   supabase secrets set RESEND_API_KEY=re_xxx
//
// Wire as Database Webhook in Supabase:
//   Dashboard > Database > Webhooks > New
//   Table: applications, Events: INSERT
//   Type: Supabase Edge Functions -> send-application-emails

// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM = "NEMI AI Careers <onboarding@resend.dev>"; // swap to your verified domain later
const NOTIFY_TO = "Humans@nemi-ai.com";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend failed ${res.status}: ${body}`);
  }
}

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const row = payload.record ?? payload;

    // Signed URL for the resume (valid 7 days).
    const { data: signed } = await supabase.storage
      .from("resumes")
      .createSignedUrl(row.resume_path, 60 * 60 * 24 * 7);

    const resumeLink = signed?.signedUrl ?? "(unavailable)";

    // 1. Internal notification
    const notifyHtml = `
      <h2>New application: ${row.role}</h2>
      <p><strong>Department:</strong> ${row.department}</p>
      <hr/>
      <p><strong>Name:</strong> ${row.full_name}</p>
      <p><strong>Email:</strong> ${row.email}</p>
      <p><strong>Phone:</strong> ${row.phone}</p>
      <p><strong>Location:</strong> ${row.location ?? "—"}</p>
      <p><strong>Experience:</strong> ${row.experience}</p>
      <p><strong>LinkedIn:</strong> ${row.linkedin ?? "—"}</p>
      <p><strong>Portfolio:</strong> ${row.portfolio ?? "—"}</p>
      <hr/>
      <p><strong>Cover letter:</strong></p>
      <p>${(row.cover_letter ?? "").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p><a href="${resumeLink}">Download resume</a> (link valid 7 days)</p>
    `;
    await sendEmail(NOTIFY_TO, `New application: ${row.full_name} — ${row.role}`, notifyHtml);

    // 2. Applicant confirmation
    const confirmHtml = `
      <p>Hi ${row.full_name.split(" ")[0]},</p>
      <p>Thanks for applying to the <strong>${row.role}</strong> role at NEMI AI. We've received your application and our team will review it shortly.</p>
      <p>If your background is a fit, we'll reach out at ${row.email} to schedule a call.</p>
      <p>— The NEMI AI team</p>
    `;
    await sendEmail(row.email, `We received your NEMI AI application — ${row.role}`, confirmHtml);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
