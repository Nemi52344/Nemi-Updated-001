"use client";

import { useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import { z } from "zod";

const investorSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  firm: z.string().trim().min(1, "Firm or fund name is required").max(150),
  role: z.string().trim().max(100).optional(),
  stage: z.string().trim().max(50).optional(),
  checkSize: z.string().trim().max(50).optional(),
  location: z.string().trim().max(100).optional(),
  website: z.string().trim().max(255).optional(),
  message: z.string().trim().min(1, "Please share what interests you about NEMI").max(1500),
});

type InvestorForm = z.infer<typeof investorSchema>;

const emptyForm: InvestorForm = {
  name: "",
  email: "",
  firm: "",
  role: "",
  stage: "",
  checkSize: "",
  location: "",
  website: "",
  message: "",
};

const STAGES = [
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
  "Growth / Late-stage",
  "Strategic / Corporate",
];

const CHECK_SIZES = [
  "Under $500K",
  "$500K – $2M",
  "$2M – $10M",
  "$10M – $50M",
  "$50M+",
];

interface InvestorContactModalProps {
  open: boolean;
  onClose: () => void;
}

const InvestorContactModal = ({ open, onClose }: InvestorContactModalProps) => {
  const [form, setForm] = useState<InvestorForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof InvestorForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const handleChange = <K extends keyof InvestorForm>(field: K, value: InvestorForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = investorSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof InvestorForm, string>> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof InvestorForm;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const d = result.data;
    const subject = encodeURIComponent(`Investor Inquiry from ${d.firm}`);
    const body = encodeURIComponent(
      [
        `Name: ${d.name}`,
        `Email: ${d.email}`,
        `Firm / Fund: ${d.firm}`,
        d.role ? `Role: ${d.role}` : null,
        d.stage ? `Stage focus: ${d.stage}` : null,
        d.checkSize ? `Typical check size: ${d.checkSize}` : null,
        d.location ? `Location: ${d.location}` : null,
        d.website ? `Website / LinkedIn: ${d.website}` : null,
        "",
        d.message,
      ]
        .filter(Boolean)
        .join("\n")
    );
    window.location.href = `mailto:investors@nemi-ai.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleClose = () => {
    setForm(emptyForm);
    setErrors({});
    setSubmitted(false);
    // Strip the #contact hash so reload doesn't re-open the modal
    if (typeof window !== "undefined" && window.location.hash === "#contact") {
      const { pathname, search } = window.location;
      window.history.replaceState(null, "", pathname + search);
    }
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    background: "hsl(230 20% 10% / 0.8)",
    border: "1px solid hsl(275 80% 55% / 0.22)",
  };

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/50 transition-all";

  return (
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      style={{ zIndex: 200, background: "hsl(230 25% 4% / 0.85)", backdropFilter: "blur(12px)" }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="investor-form-title"
    >
      <div
        className="relative w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl p-5 sm:p-7 my-0 sm:my-6 max-h-[95vh] overflow-y-auto"
        style={{
          background: "linear-gradient(145deg, hsl(230 20% 10%), hsl(230 25% 6%))",
          border: "1px solid hsl(275 80% 55% / 0.22)",
          boxShadow: "0 0 60px hsl(275 80% 55% / 0.12), 0 25px 50px hsl(230 25% 4% / 0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          style={{ background: "hsl(275 80% 55% / 0.1)" }}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-10 px-2">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "hsl(275 80% 55% / 0.15)", border: "1px solid hsl(275 80% 55% / 0.3)" }}
            >
              <Send className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Inquiry ready to send</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Your email client should open with your inquiry pre-filled. If it doesn&rsquo;t, email us
              directly at{" "}
              <a className="text-primary hover:underline" href="mailto:investors@nemi-ai.com">
                investors@nemi-ai.com
              </a>
              .
            </p>
            <button
              onClick={handleClose}
              className="mt-7 px-6 py-2.5 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 text-white"
              style={{
                background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p
              className="text-[10px] sm:text-xs tracking-[0.35em] uppercase font-semibold mb-1.5"
              style={{ color: "hsl(275 60% 65%)" }}
            >
              Investor Inquiry
            </p>
            <h3
              id="investor-form-title"
              className="text-xl sm:text-2xl font-bold text-foreground mb-1"
              style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}
            >
              Let&rsquo;s talk.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-5">
              We&rsquo;re building Physical AI for manufacturing. Tell us a bit about your fund and
              what you&rsquo;d like to explore.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  maxLength={100}
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p className="text-xs mt-1" style={{ color: "hsl(0 70% 60%)" }}>{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  maxLength={255}
                  placeholder="jane@fund.com"
                />
                {errors.email && (
                  <p className="text-xs mt-1" style={{ color: "hsl(0 70% 60%)" }}>{errors.email}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  Firm / Fund Name *
                </label>
                <input
                  type="text"
                  value={form.firm}
                  onChange={(e) => handleChange("firm", e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  maxLength={150}
                  placeholder="Acme Ventures"
                />
                {errors.firm && (
                  <p className="text-xs mt-1" style={{ color: "hsl(0 70% 60%)" }}>{errors.firm}</p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  maxLength={100}
                  placeholder="Partner"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  maxLength={100}
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  Stage Focus
                </label>
                <select
                  value={form.stage}
                  onChange={(e) => handleChange("stage", e.target.value)}
                  className={inputClass + " appearance-none cursor-pointer"}
                  style={inputStyle}
                >
                  <option value="">Select stage</option>
                  {STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  Typical Check Size
                </label>
                <select
                  value={form.checkSize}
                  onChange={(e) => handleChange("checkSize", e.target.value)}
                  className={inputClass + " appearance-none cursor-pointer"}
                  style={inputStyle}
                >
                  <option value="">Select range</option>
                  {CHECK_SIZES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  Website / LinkedIn
                </label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  maxLength={255}
                  placeholder="https://"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  What interests you about NEMI? *
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={4}
                  className={inputClass + " resize-none"}
                  style={inputStyle}
                  maxLength={1500}
                  placeholder="Thesis areas, portfolio overlap, questions on the platform…"
                />
                {errors.message && (
                  <p className="text-xs mt-1" style={{ color: "hsl(0 70% 60%)" }}>{errors.message}</p>
                )}
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-1">
                <p className="text-[11px] text-muted-foreground/80">
                  Prefer email? Reach us at{" "}
                  <a className="text-primary hover:underline" href="mailto:investors@nemi-ai.com">
                    investors@nemi-ai.com
                  </a>
                </p>
                <button
                  type="submit"
                  className="font-bold text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] text-white"
                  style={{
                    background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
                    boxShadow: "0 4px 25px hsl(275 80% 55% / 0.3)",
                  }}
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InvestorContactModal;
