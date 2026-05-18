import { NextRequest, NextResponse } from "next/server";
import { issueCode } from "@/lib/otpStore";
import { sendOtpEmail } from "@/lib/mailer";

const isValidEmail = (s: unknown): s is string =>
  typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email;
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    const code = issueCode(email);
    const sendResult = await sendOtpEmail(email, code);
    if (!sendResult.ok) {
      return NextResponse.json(
        { ok: false, error: sendResult.error || "Failed to send email" },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
