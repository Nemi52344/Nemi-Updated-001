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

  const { token, jti, exp } = await issueGateToken(offering);

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
