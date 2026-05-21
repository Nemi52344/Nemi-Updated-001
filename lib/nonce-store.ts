// In-memory single-use nonce store with automatic eviction on expiry.
//
// PRODUCTION NOTE: This is fine for a single-node dev/preview environment but
// will not survive across serverless instances or restarts. For production,
// back this with Redis / Upstash / Vercel KV / Cloudflare KV (the spec calls
// out edge runtime — pair with Vercel KV or Cloudflare KV for that).

declare global {
  // eslint-disable-next-line no-var
  var __nemiNonceStore: Map<string, number> | undefined;
}

const store: Map<string, number> =
  globalThis.__nemiNonceStore ?? (globalThis.__nemiNonceStore = new Map());

function evictExpired(now: number): void {
  for (const [jti, exp] of store) {
    if (exp <= now) store.delete(jti);
  }
}

export function consumeNonce(jti: string, exp: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  evictExpired(now);
  if (exp <= now) return false;
  if (store.has(jti)) return false;
  store.set(jti, exp);
  return true;
}
