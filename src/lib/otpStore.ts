// Supabase-backed OTP store. Persists across requests/instances so it works on
// serverless hosts (Netlify, Vercel) where in-memory state is lost between
// invocations. Server-side only — uses the service role key.

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import crypto from "crypto";

const TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

let cached: SupabaseClient | null = null;
const getAdmin = (): SupabaseClient => {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env"
    );
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
};

const normalize = (email: string) => email.trim().toLowerCase();
const hashCode = (code: string) =>
  crypto.createHash("sha256").update(code.trim()).digest("hex");

export const issueCode = async (email: string): Promise<string> => {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const { error } = await getAdmin()
    .from("otp_codes")
    .upsert(
      {
        email: normalize(email),
        code_hash: hashCode(code),
        expires_at: new Date(Date.now() + TTL_MS).toISOString(),
        attempts: 0,
      },
      { onConflict: "email" }
    );
  if (error) throw new Error(`Failed to persist OTP: ${error.message}`);
  return code;
};

export type VerifyResult =
  | { ok: true }
  | {
      ok: false;
      reason: "no_code" | "expired" | "too_many_attempts" | "wrong_code";
    };

export const verifyCode = async (
  email: string,
  code: string
): Promise<VerifyResult> => {
  const admin = getAdmin();
  const key = normalize(email);

  const { data, error } = await admin
    .from("otp_codes")
    .select("code_hash, expires_at, attempts")
    .eq("email", key)
    .maybeSingle();

  if (error || !data) return { ok: false, reason: "no_code" };

  if (new Date(data.expires_at).getTime() < Date.now()) {
    await admin.from("otp_codes").delete().eq("email", key);
    return { ok: false, reason: "expired" };
  }

  if (data.attempts >= MAX_ATTEMPTS) {
    await admin.from("otp_codes").delete().eq("email", key);
    return { ok: false, reason: "too_many_attempts" };
  }

  if (data.code_hash !== hashCode(code)) {
    await admin
      .from("otp_codes")
      .update({ attempts: data.attempts + 1 })
      .eq("email", key);
    return { ok: false, reason: "wrong_code" };
  }

  await admin.from("otp_codes").delete().eq("email", key);
  return { ok: true };
};
