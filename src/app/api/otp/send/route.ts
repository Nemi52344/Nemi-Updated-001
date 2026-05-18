import { NextResponse } from "next/server";
import { issueCode } from "@/lib/otpStore";
import { sendOtpEmail } from "@/lib/mailer";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    const code = await issueCode(email);
    const result = await sendOtpEmail(email, code);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error || "Failed to send email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
