import { NextRequest, NextResponse } from "next/server";
import { issueGateToken, type Offering } from "@/lib/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isOffering(value: unknown): value is Offering {
  return value === "reg-d" || value === "reg-s";
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function ipCountry(req: NextRequest): string {
  return (
    req.headers.get("cf-ipcountry") ??
    req.headers.get("x-vercel-ip-country") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const offering = (body as { offering?: unknown })?.offering;
  if (!isOffering(offering)) {
    return NextResponse.json({ error: "invalid_offering" }, { status: 400 });
  }

  const attestation = (body as { attestation?: unknown })?.attestation;
  if (attestation !== true) {
    return NextResponse.json({ error: "attestation_required" }, { status: 400 });
  }

  let token: string;
  let jti: string;
  let exp: number;
  try {
    ({ token, jti, exp } = await issueGateToken(offering));
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    const misconfigured = /GATE_TOKEN_SECRET/.test(message);
    // eslint-disable-next-line no-console
    console.error(
      JSON.stringify({
        event: "gate_error",
        offering,
        ts: new Date().toISOString(),
        message
      })
    );
    return NextResponse.json(
      {
        error: misconfigured ? "server_misconfigured" : "token_issue_failed",
        detail: misconfigured
          ? "Server is missing GATE_TOKEN_SECRET. Configure it in the hosting environment (e.g., Vercel Project → Settings → Environment Variables) and redeploy."
          : "Unable to issue the access token. Try again, and contact invest@nemi-ai.com if the problem persists."
      },
      { status: misconfigured ? 503 : 500 }
    );
  }

  // Structured log line for analytics ingestion (per spec section 3.4).
  // Geographic soft-signal: warn if Reg S clicked from a US IP.
  const country = ipCountry(req);
  const log = {
    event: "gate_click",
    offering,
    jti,
    exp,
    ts: new Date().toISOString(),
    ip: clientIp(req),
    country,
    userAgent: req.headers.get("user-agent") ?? "",
    warning:
      offering === "reg-s" && country === "US"
        ? "reg_s_click_from_us_ip"
        : undefined
  };
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(log));

  return NextResponse.json({
    redirect: `/${offering}?token=${encodeURIComponent(token)}`
  });
}
