const RESEND_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY ?? "";
const FROM = "NEMI AI <info@nemi-ai.com>";
const NOTIFY_TO = "info@nemi-ai.com";

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
