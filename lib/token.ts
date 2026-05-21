import { SignJWT, jwtVerify } from "jose";

export type Offering = "reg-d" | "reg-s";

const ISSUER = "invest.nemi-ai.com";
const AUDIENCE = "invest.nemi-ai.com/offering";

function getSecret(): Uint8Array {
  const secret = process.env.GATE_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "GATE_TOKEN_SECRET is missing or too short. Set a value of at least 32 characters."
    );
  }
  return new TextEncoder().encode(secret);
}

function getTtlSeconds(): number {
  const raw = process.env.GATE_TOKEN_TTL_SECONDS;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 600;
}

export async function issueGateToken(offering: Offering): Promise<{
  token: string;
  jti: string;
  exp: number;
}> {
  const jti = crypto.randomUUID();
  const ttl = getTtlSeconds();
  const now = Math.floor(Date.now() / 1000);
  const exp = now + ttl;

  const token = await new SignJWT({ offering })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject("visitor")
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setJti(jti)
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .sign(getSecret());

  return { token, jti, exp };
}

export type VerifiedGateToken = {
  offering: Offering;
  jti: string;
  exp: number;
};

export async function verifyGateToken(
  token: string,
  expected: Offering
): Promise<VerifiedGateToken | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
      audience: AUDIENCE
    });
    if (payload.offering !== expected) return null;
    if (typeof payload.jti !== "string" || typeof payload.exp !== "number") {
      return null;
    }
    return {
      offering: payload.offering as Offering,
      jti: payload.jti,
      exp: payload.exp
    };
  } catch {
    return null;
  }
}
