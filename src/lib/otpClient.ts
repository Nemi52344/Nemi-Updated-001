// Client-side helpers for the OTP flow.
//
// OTP send/verify are deployed as Supabase Edge Functions
// (supabase/functions/otp-send + otp-verify), so the call works from
// any static host (AWS + nginx, Vercel, Netlify) without needing a
// Next.js server runtime in production.

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://wrkfxtodkxhhlzmfpvgt.supabase.co";

const FUNCTIONS_BASE = `${SUPABASE_URL}/functions/v1`;

export const OTP_SEND_URL = `${FUNCTIONS_BASE}/otp-send`;
export const OTP_VERIFY_URL = `${FUNCTIONS_BASE}/otp-verify`;
export const CONTACT_EMAIL_URL = `${FUNCTIONS_BASE}/send-contact-email`;
export const APPLICATION_URL = `${FUNCTIONS_BASE}/submit-application`;

export interface OtpResponse {
  ok: boolean;
  error?: string;
  dev?: boolean;
}

export async function sendOtp(email: string): Promise<OtpResponse> {
  const res = await fetch(OTP_SEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = (await res.json().catch(() => ({}))) as Partial<OtpResponse>;
  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error || `Failed (${res.status})` };
  }
  return { ok: true, dev: data.dev };
}

export async function verifyOtp(email: string, code: string): Promise<OtpResponse> {
  const res = await fetch(OTP_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const data = (await res.json().catch(() => ({}))) as Partial<OtpResponse>;
  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error || `Failed (${res.status})` };
  }
  return { ok: true };
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export async function sendContactEmail(payload: ContactPayload): Promise<OtpResponse> {
  const res = await fetch(CONTACT_EMAIL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as Partial<OtpResponse>;
  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error || `Failed (${res.status})` };
  }
  return { ok: true };
}

export interface ApplicationPayload {
  full_name: string;
  email: string;
  phone?: string;
  about?: string;
  interests?: string;
  wants_to_work_on?: string;
  resume_name: string;
  resume_type: string;
  resume_base64: string;
  role?: string;
  department?: string;
}

export async function submitApplication(payload: ApplicationPayload): Promise<OtpResponse> {
  const res = await fetch(APPLICATION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as Partial<OtpResponse>;
  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error || `Failed (${res.status})` };
  }
  return { ok: true };
}

/**
 * Read a File into base64 (without the data: URI prefix).
 * Used for sending the resume file payload to the submit-application Edge Function.
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const idx = result.indexOf(",");
      resolve(idx >= 0 ? result.slice(idx + 1) : result);
    };
    reader.onerror = () => reject(reader.error || new Error("File read error"));
    reader.readAsDataURL(file);
  });
}
