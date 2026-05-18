import nodemailer from "nodemailer";

let cached: nodemailer.Transporter | null = null;

const getTransporter = (): nodemailer.Transporter | null => {
  if (cached) return cached;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return cached;
};

export interface SendResult {
  ok: boolean;
  error?: string;
}

export const sendOtpEmail = async (to: string, code: string): Promise<SendResult> => {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "info@nemi-ai.com";

  if (!transporter) {
    // Fallback: log to console for local dev when SMTP env vars are missing.
    // eslint-disable-next-line no-console
    console.log(`\n[OTP] (SMTP not configured) Email: ${to}  Code: ${code}\n`);
    return { ok: true };
  }

  try {
    await transporter.sendMail({
      from: `"NEMI" <${from}>`,
      to,
      subject: `Your NEMI verification code: ${code}`,
      text: `Your NEMI verification code is ${code}.\n\nThis code expires in 10 minutes. If you didn't request it, ignore this email.\n\n— NEMI`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
          <h2 style="margin: 0 0 16px; font-size: 20px;">Verify your email</h2>
          <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #555;">Use this code to verify your email with NEMI.</p>
          <div style="font-size: 32px; font-weight: 700; letter-spacing: 0.4em; padding: 18px 24px; background: #f4f1ff; border-radius: 8px; text-align: center; color: #6b22c4;">${code}</div>
          <p style="margin: 24px 0 0; font-size: 12px; color: #888; line-height: 1.5;">This code expires in 10 minutes. If you didn't request it, you can safely ignore this email.</p>
          <p style="margin: 16px 0 0; font-size: 12px; color: #aaa;">— NEMI</p>
        </div>
      `,
    });
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to send email";
    // eslint-disable-next-line no-console
    console.error("[OTP] SMTP send failed:", msg);
    return { ok: false, error: msg };
  }
};
