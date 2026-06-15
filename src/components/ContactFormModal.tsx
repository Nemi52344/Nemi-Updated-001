"use client";

import { useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import { z } from "zod";
import PhoneInput from "@/components/PhoneInput";
import { notifyNemi } from "@/lib/resendClient";
import { track } from "@/lib/analytics";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(150).optional(),
  message: z.string().trim().min(1, "Please tell us a bit about your needs").max(1500),
});

type ContactForm = z.infer<typeof contactSchema>;

const emptyForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const handleChange = <K extends keyof ContactForm>(field: K, value: ContactForm[K]) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return;
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      for (const err of result.error.issues) {
        const key = err.path[0] as keyof ContactForm;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }
    const d = result.data;
    setSubmitting(true);
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const html = `
<div style="font-family:-apple-system,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1a1a1a">
  <h2 style="margin:0 0 16px;font-size:20px;color:#6b22c4">New Contact Form Submission</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6">
    <tr><td style="padding:6px 0;color:#666;width:120px"><strong>Name</strong></td><td>${esc(d.name)}</td></tr>
    <tr><td style="padding:6px 0;color:#666"><strong>Email</strong></td><td>${esc(d.email)}</td></tr>
    ${d.phone ? `<tr><td style="padding:6px 0;color:#666"><strong>Phone</strong></td><td>${esc(d.phone)}</td></tr>` : ""}
    ${d.company ? `<tr><td style="padding:6px 0;color:#666"><strong>Company</strong></td><td>${esc(d.company)}</td></tr>` : ""}
  </table>
  <h3 style="font-size:14px;margin:16px 0 4px">Message</h3>
  <p style="font-size:13px;white-space:pre-wrap;color:#444;margin:0;line-height:1.6">${esc(d.message)}</p>
</div>`;
    try {
      await notifyNemi({ replyTo: d.email, subject: `Contact: ${d.name}${d.company ? ` — ${d.company}` : ""}`, html });
    } catch {
      // Don't block submission on email error
    }
    setSubmitted(true);
    setSubmitting(false);
    track("contact_form_submit", { has_company: Boolean(d.company), has_phone: Boolean(d.phone) });
  };

  const handleClose = () => {
    setForm(emptyForm);
    setErrors({});
    setSubmitted(false);
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
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      style={{ zIndex: 200, background: "hsl(230 25% 4% / 0.85)", backdropFilter: "blur(12px)" }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-form-title"
    >
      <div
        className="relative w-full sm:max-w-xl rounded-2xl px-5 pt-5 pb-6 sm:p-7 my-0 sm:my-6 max-h-[92vh] overflow-y-auto"
        style={{
          background: "linear-gradient(145deg, hsl(230 20% 10%), hsl(230 25% 6%))",
          border: "1px solid hsl(275 80% 55% / 0.22)",
          boxShadow: "0 0 60px hsl(275 80% 55% / 0.12), 0 25px 50px hsl(230 25% 4% / 0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
            <h3 className="text-xl font-bold text-foreground mb-2">Thank you for contacting us</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Our team will get back to you soon.
            </p>
            <button
              onClick={handleClose}
              className="mt-7 px-6 py-2.5 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 text-white"
              style={{ background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))" }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase font-semibold mb-1.5" style={{ color: "hsl(275 60% 65%)" }}>
              Contact Us
            </p>
            <h3
              id="contact-form-title"
              className="text-xl sm:text-2xl font-bold text-foreground mb-1"
              style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}
            >
              Let&rsquo;s build together.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-5">
              Tell us about your product or program. We&rsquo;ll get back to you within a business day.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  maxLength={100}
                  placeholder="Jane Doe"
                />
                {errors.name && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 60%)" }}>{errors.name}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  maxLength={150}
                  placeholder="Acme Industries"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  maxLength={255}
                  placeholder="jane@company.com"
                />
                {errors.email && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 60%)" }}>{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">Phone (optional)</label>
                <PhoneInput
                  value={form.phone}
                  onChange={(val) => handleChange("phone", val)}
                  placeholder="555 123 4567"
                  inputStyle={inputStyle}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  How can we help? *
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={4}
                  className={inputClass + " resize-none"}
                  style={inputStyle}
                  maxLength={1500}
                  placeholder="Tell us about your product, volumes, timelines, or any questions you have."
                />
                {errors.message && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 60%)" }}>{errors.message}</p>}
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-1">
                <p className="text-[11px] text-muted-foreground/80">
                  Or email us at{" "}
                  <a className="text-primary hover:underline" href="mailto:info@nemi-ai.com">info@nemi-ai.com</a>
                </p>
                <button
                  type="submit"
                  disabled={submitting || submitted}
                  className="font-bold text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
                    boxShadow: "0 4px 25px hsl(275 80% 55% / 0.3)",
                  }}
                >
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
