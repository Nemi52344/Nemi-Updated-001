import { NextRequest, NextResponse } from "next/server";
import { verifyCode } from "@/lib/otpStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email;
    const code = body?.code;
    if (typeof email !== "string" || typeof code !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    const result = verifyCode(email, code);
    if (!result.ok) {
      const messages: Record<string, string> = {
        no_code: "Request a code first",
        expired: "Code expired, please request a new one",
        too_many_attempts: "Too many attempts, request a new code",
        wrong_code: "Incorrect code",
      };
      return NextResponse.json(
        { ok: false, error: messages[result.reason] ?? "Verification failed" },
        { status: 400 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
