import { useState } from "react";
import SiteFooter from "@/components/SiteFooter";

interface CTASectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const CTASection = ({ scrollProgress }: CTASectionProps) => {
  const sectionVisible = scrollProgress > 0.993;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.994, 0.998));

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", location: "", website: "", message: "" });
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nLocation: ${form.location}\nWebsite: ${form.website}\nAttachment: ${fileName || "None"}\n\n${form.message}`
    );
    window.open(`mailto:info@nemi-ai.com?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);
  };

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col pointer-events-auto overflow-y-auto"
      style={{ zIndex: 45, opacity: enterP, background: "hsl(230 25% 4%)" }}
    >
      <div className="flex-1 flex items-center justify-center relative px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 45% 50% at 50% 45%, hsl(275 80% 40% / 0.3) 0%, transparent 60%),
              radial-gradient(ellipse 60% 45% at 50% 50%, hsl(260 70% 30% / 0.18) 0%, transparent 55%)
            `,
          }}
        />
        <div className="text-center relative z-[2]" style={{ marginTop: "40px" }}>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
            style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
          >
            See what LMM can do for
            <br />
            your costs and lead times
          </h2>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide max-w-[500px] mx-auto mb-8">
            We'll show you how NEMI compresses your product development cycle.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-10 py-3.5 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-primary-foreground"
            style={{
              background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
              boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)",
            }}
          >
            Reach Out to Us
          </button>
          <div className="mt-5">
            <a
              href="mailto:info@nemi-ai.com"
              className="text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              info@nemi-ai.com
            </a>
          </div>
        </div>
      </div>

      <SiteFooter />

      {/* Modal overlay */}
      {showForm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[200] px-4"
          style={{ background: "hsl(230 25% 4% / 0.85)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
            style={{
              marginTop: "60px",
              background: "linear-gradient(145deg, hsl(230 25% 8%), hsl(230 25% 5%))",
              boxShadow: "0 0 80px hsl(275 80% 50% / 0.18), 0 30px 60px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
              animation: "modal-enter 0.3s ease-out",
            }}
          >
            {/* Top accent gradient bar */}
            <div
              className="h-[2px] w-full"
              style={{ background: "linear-gradient(to right, transparent, hsl(275 80% 60%), hsl(var(--primary)), transparent)" }}
            />

            <div className="p-5 md:p-6">
              {/* Close button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10"
                style={{ color: "hsl(0 0% 60%)" }}
                aria-label="Close form"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "hsl(275 80% 50% / 0.15)" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="hsl(275 80% 70%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-foreground mb-2">Thank you for reaching out!</p>
                  <p className="text-sm text-muted-foreground">Our team will review your inquiry and get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <p className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-1.5" style={{ color: "hsl(275 60% 65%)" }}>
                      Customer Inquiry
                    </p>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">
                      Tell us about your project
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)]"
                        style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)]"
                        style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Company</label>
                      <input
                        type="text"
                        placeholder="Acme Inc."
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)]"
                        style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Location</label>
                      <input
                        type="text"
                        placeholder="City, Country"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)]"
                        style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Website</label>
                      <input
                        type="url"
                        placeholder="https://yourcompany.com"
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                        className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)]"
                        style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Brand Deck / Document</label>
                      <label
                        className="flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-all duration-200 hover:border-purple-500/40"
                        style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="hsl(275 60% 65%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs" style={{ color: fileName ? "hsl(0 0% 90%)" : "hsl(0 0% 45%)" }}>
                          {fileName || "Upload PDF, PPT, or images"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.ppt,.pptx,.doc,.docx,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                        />
                      </label>
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">How can we help?</label>
                      <textarea
                        rows={2}
                        placeholder="Describe your manufacturing needs, product type, volumes..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)] resize-none"
                        style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }}
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-center pt-1">
                      <button
                        type="submit"
                        className="w-full md:w-auto font-bold text-xs tracking-[0.2em] uppercase px-12 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 text-primary-foreground"
                        style={{
                          background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
                          boxShadow: "0 4px 30px hsl(var(--primary) / 0.35), 0 0 60px hsl(275 80% 60% / 0.1)",
                        }}
                      >
                        Submit Inquiry
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes modal-enter {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default CTASection;
