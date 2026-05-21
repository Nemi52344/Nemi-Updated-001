"use client";

import { useId, useState } from "react";

type Offering = "reg-d" | "reg-s";

type Props = {
  offering: Offering;
  eyebrow: string;
  heading: string;
  body: React.ReactNode;
  attestation: string;
  ctaLabel: string;
};

export function JurisdictionCard({
  offering,
  eyebrow,
  heading,
  body,
  attestation,
  ctaLabel
}: Props) {
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const checkboxId = useId();
  const dialogId = useId();

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offering,
          attestation: true,
          ts: Date.now()
        })
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Request failed");
      }
      const data = (await res.json()) as { redirect: string };
      window.location.href = data.redirect;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
      setLoading(false);
    }
  }

  return (
    <>
      <article className="nemi-surface group relative flex h-full flex-col gap-5 p-7 transition hover:border-violet-300/40 md:p-8">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent opacity-0 transition group-hover:opacity-100"
        />
        <p className="nemi-eyebrow">{eyebrow}</p>
        <h2 className="nemi-heading text-xl md:text-2xl">{heading}</h2>
        <div className="nemi-body space-y-3 text-sm md:text-base">{body}</div>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setError(null);
              setAgreed(false);
            }}
            className="nemi-btn-primary w-full whitespace-nowrap px-4 text-[0.7rem] tracking-nemi md:text-xs"
          >
            <span>{ctaLabel}</span>
            <span aria-hidden className="ml-1">→</span>
          </button>
        </div>
      </article>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogId}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm md:items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget && !loading) setOpen(false);
          }}
        >
          <div className="nemi-surface w-full max-w-lg space-y-5 bg-deep-space p-6 md:p-8">
            <p className="nemi-eyebrow">Attestation Required</p>
            <h3 id={dialogId} className="nemi-heading text-lg md:text-xl">
              Confirm your status before proceeding
            </h3>
            <p className="text-sm leading-body text-soft-grey">{attestation}</p>

            <label
              htmlFor={checkboxId}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4 transition hover:border-violet-300/40"
            >
              <input
                id={checkboxId}
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-violet-500"
                disabled={loading}
              />
              <span className="text-sm leading-body text-soft-grey">
                I confirm the above statement is true. I understand this
                attestation is being recorded.
              </span>
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-200"
              >
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 pt-2 md:flex-row md:justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="nemi-btn-ghost order-2 md:order-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={!agreed || loading}
                className="nemi-btn-primary order-1 md:order-2"
              >
                <span>{loading ? "Verifying…" : "Continue"}</span>
                <span aria-hidden className="ml-1">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
