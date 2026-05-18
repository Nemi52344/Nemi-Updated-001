import { NextResponse } from "next/server";
import { verifyCode } from "@/lib/otpStore";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reasonToMessage: Record<string, string> = {
  no_code: "Request a code first",
  expired: "Code expired — request a new one",
  too_many_attempts: "Too many attempts — request a new code",
  wrong_code: "Invalid code",
};

export async function POST(req: Request) {
  try {
    const { email, code } = (await req.json()) as {
      email?: string;
      code?: string;
    };
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }
    if (!code || !/^\d{4,8}$/.test(code.trim())) {
      return NextResponse.json(
        { ok: false, error: "Invalid code" },
        { status: 400 }
      );
    }

    const result = await verifyCode(email, code);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: reasonToMessage[result.reason] || "Invalid code" },
        { status: 400 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
