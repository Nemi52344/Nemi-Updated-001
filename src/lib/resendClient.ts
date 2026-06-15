const RESEND_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY ?? "";
const FROM = "NEMI AI <info@nemi-ai.com>";
const NOTIFY_TO = "info@nemi-ai.com";

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function sendOtpEmail(email: string, code: string): Promise<{ ok: boolean }> {
  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#1a1a1a">
  <h2 style="margin:0 0 16px;font-size:20px">Verify your email</h2>
  <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#555">Use this code to verify your email with NEMI.</p>
  <div style="font-size:32px;font-weight:700;letter-spacing:.4em;padding:18px 24px;background:#f4f1ff;border-radius:8px;text-align:center;color:#6b22c4">${code}</div>
  <p style="margin:24px 0 0;font-size:12px;color:#888;line-height:1.5">This code expires in 10 minutes. If you didn't request it, you can safely ignore this email.</p>
  <p style="margin:16px 0 0;font-size:12px;color:#aaa">— NEMI</p>
</div>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [email], subject: "Your NEMI verification code", html }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

interface NotifyOptions {
  replyTo?: string;
  subject: string;
  html: string;
  attachments?: { filename: string; content: string }[];
}

export async function notifyNemi(opts: NotifyOptions): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [NOTIFY_TO],
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
        subject: opts.subject,
        html: opts.html,
        ...(opts.attachments ? { attachments: opts.attachments } : {}),
      }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const idx = result.indexOf(",");
      resolve(idx >= 0 ? result.slice(idx + 1) : result);
    };
    reader.onerror = () => reject(reader.error || new Error("File read error"));
    reader.readAsDataURL(file);
  });
}
