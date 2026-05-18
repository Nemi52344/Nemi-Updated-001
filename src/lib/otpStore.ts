// Simple in-memory OTP store.
// Suitable for single-instance dev/preview deployments.
// For production, swap this with Redis/Supabase/etc.

type Entry = { code: string; expiresAt: number; attempts: number };

const TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

// Module-level Map persists across requests in the same Node process.
// Hot reload may clear it during development — that's fine.
const store = new Map<string, Entry>();

const normalize = (email: string) => email.trim().toLowerCase();

export const issueCode = (email: string): string => {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  store.set(normalize(email), {
    code,
    expiresAt: Date.now() + TTL_MS,
    attempts: 0,
  });
  return code;
};

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: "no_code" | "expired" | "too_many_attempts" | "wrong_code" };

export const verifyCode = (email: string, code: string): VerifyResult => {
  const key = normalize(email);
  const entry = store.get(key);
  if (!entry) return { ok: false, reason: "no_code" };
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return { ok: false, reason: "expired" };
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    store.delete(key);
    return { ok: false, reason: "too_many_attempts" };
  }
  if (entry.code !== code.trim()) {
    entry.attempts += 1;
    return { ok: false, reason: "wrong_code" };
  }
  store.delete(key);
  return { ok: true };
};
