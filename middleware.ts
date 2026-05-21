import { NextRequest, NextResponse } from "next/server";
import { verifyGateToken, type Offering } from "@/lib/token";
import { consumeNonce } from "@/lib/nonce-store";

export const config = {
  matcher: ["/reg-d", "/reg-s"]
};

function offeringFromPath(pathname: string): Offering | null {
  if (pathname === "/reg-d") return "reg-d";
  if (pathname === "/reg-s") return "reg-s";
  return null;
}

function deny(req: NextRequest): NextResponse {
  return NextResponse.redirect(new URL("/", req.url));
}

export async function middleware(req: NextRequest) {
  const offering = offeringFromPath(req.nextUrl.pathname);
  if (!offering) return deny(req);

  const token = req.nextUrl.searchParams.get("token");
  if (!token) return deny(req);

  const verified = await verifyGateToken(token, offering);
  if (!verified) return deny(req);

  // Single-use enforcement. A page refresh will fail this and redirect home,
  // per spec section 3.2 step 5.
  if (!consumeNonce(verified.jti, verified.exp)) return deny(req);

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}
