"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";

/* ── Validation ── */
const investorSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100),
  firm: z.string().trim().min(1, "Firm is required").max(100),
  title: z.string().trim().min(1, "Title is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional(),
  geography: z.string().trim().max(100).optional(),
  checkSize: z.string().optional(),
  stagePreference: z.string().optional(),
});

type InvestorForm = z.infer<typeof investorSchema>;

/* ── Data ── */
const processSteps = [
  { step: "01", title: "Submit the inquiry", desc: "Share firm, title, contact details, check size, and what you want to evaluate." },
  { step: "02", title: "NEMI reviews fit", desc: "The team prioritizes serious institutional and strategic conversations." },
  { step: "03", title: "Receive follow-up", desc: "Qualified investors receive the right next step: call, teaser summary, or data-room access." },
  { step: "04", title: "Enter diligence", desc: "Customer references and data-room materials can be shared as the process advances." },
];

// Ordered: Certifications first, then IP, then corporate status, then traction.
const signals = [
  "AS9100D and ISO 9001",
  "DRDO and ISRO cleared",
  "Patents across core IP",
  "Texas C-Corporation",
  "300K+ sq ft manufacturing",
  "Four industries in production",
];

/* ── Styles ── */
const inputClasses =
  "w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/50 transition-all";
const inputStyle = {
  background: "hsl(230 20% 10% / 0.8)",
  border: "1px solid hsl(275 80% 55% / 0.2)",
};
const selectClasses =
  "w-full px-4 py-3 rounded-xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer";

const InvestorPage = () => {
  const [form, setForm] = useState<InvestorForm>({
    fullName: "", firm: "", title: "", email: "", phone: "", geography: "", checkSize: "", stagePreference: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof InvestorForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof InvestorForm, value: string) => {
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
    const subject = encodeURIComponent(`Investor Inquiry from ${d.fullName} — ${d.firm}`);
    const body = encodeURIComponent(
      `Name: ${d.fullName}\nFirm: ${d.firm}\nTitle: ${d.title}\nEmail: ${d.email}\nPhone: ${d.phone || "N/A"}\nGeography: ${d.geography || "N/A"}\nCheck Size: ${d.checkSize || "N/A"}\nStage: ${d.stagePreference || "N/A"}`
    );
    window.location.href = `mailto:investors@nemi-ai.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <ConstellationCanvas />
      <Navbar />

      {/* ── Hero — full-screen, matches About / Careers / Proof style ── */}
      <section className="min-h-screen flex items-center justify-center relative z-[1] overflow-hidden pt-32 pb-16 px-6 md:px-12 lg:px-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 40% 35% at 50% 45%, hsl(275 80% 40% / 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 55% 45% at 50% 50%, hsl(260 70% 30% / 0.1) 0%, transparent 55%)
            `,
          }}
        />
        <div className="text-center relative z-[3] max-w-5xl mx-auto">
          <p
            className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary/80 mb-6 font-bold"
            style={{ animation: "hero-label-in 0.8s ease-out 0.2s both" }}
          >
            For Investors
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.95] mb-8"
            style={{ textShadow: "0 0 25px hsl(275 80% 60% / 0.2), 0 0 50px hsl(270 70% 50% / 0.1)" }}
          >
            <span style={{ display: "inline-block", animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
              Investor
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary) / 0.8))",
                backgroundSize: "200% 200%",
                animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both, hero-gradient-shift 6s ease-in-out infinite 1.4s",
              }}
            >
              Relations.
            </span>
          </h1>
          <p
            className="text-sm md:text-lg font-light text-muted-foreground leading-relaxed tracking-[0.15em] uppercase max-w-[640px] mx-auto"
            style={{ opacity: 0, animation: "hero-fade-up 0.7s ease-out 1s forwards" }}
          >
            The AI Operating System for Manufacturing.
          </p>
        </div>
      </section>

      {/* ── Inquiry Form ── */}
      <section className="relative z-[1] py-16 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-2 text-center"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Investor Enquiries
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground text-center mb-10 max-w-lg mx-auto">
              Share your details and what you want to evaluate. No NDA gate on first touch.
            </p>
          </ScrollReveal>

          {submitted ? (
            <ScrollReveal>
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "hsl(275 80% 55% / 0.15)", border: "1px solid hsl(275 80% 55% / 0.3)" }}
                >
                  <Send className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Inquiry Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Your email client should open with the inquiry pre-filled.<br />
                  Fallback: email <span className="text-primary">investors@nemi-ai.com</span> directly.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-8 rounded-2xl"
                style={{
                  background: "linear-gradient(145deg, hsl(230 20% 10%), hsl(230 25% 6%))",
                  border: "1px solid hsl(275 80% 55% / 0.15)",
                  boxShadow: "0 0 60px hsl(275 80% 55% / 0.06)",
                }}
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input type="text" placeholder="Full Name *" value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} className={inputClasses} style={inputStyle} maxLength={100} />
                    {errors.fullName && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 55%)" }}>{errors.fullName}</p>}
                  </div>
                  <div>
                    <input type="text" placeholder="Firm *" value={form.firm} onChange={(e) => handleChange("firm", e.target.value)} className={inputClasses} style={inputStyle} maxLength={100} />
                    {errors.firm && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 55%)" }}>{errors.firm}</p>}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input type="text" placeholder="Title *" value={form.title} onChange={(e) => handleChange("title", e.target.value)} className={inputClasses} style={inputStyle} maxLength={100} />
                    {errors.title && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 55%)" }}>{errors.title}</p>}
                  </div>
                  <div>
                    <input type="email" placeholder="Work Email *" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClasses} style={inputStyle} maxLength={255} />
                    {errors.email && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 55%)" }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className={inputClasses} style={inputStyle} maxLength={30} />
                  <input type="text" placeholder="Geography" value={form.geography} onChange={(e) => handleChange("geography", e.target.value)} className={inputClasses} style={inputStyle} maxLength={100} />
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select value={form.checkSize} onChange={(e) => handleChange("checkSize", e.target.value)} className={selectClasses} style={inputStyle}>
                    <option value="" disabled>Typical Check Size</option>
                    <option value="sub-1m">Below $1M</option>
                    <option value="1m-5m">$1M to $5M</option>
                    <option value="5m-15m">$5M to $15M</option>
                    <option value="15m-plus">$15M+</option>
                  </select>
                  <select value={form.stagePreference} onChange={(e) => handleChange("stagePreference", e.target.value)} className={selectClasses} style={inputStyle}>
                    <option value="" disabled>Stage Preference</option>
                    <option value="venture">Venture growth</option>
                    <option value="pre-ipo">Pre-IPO / crossover</option>
                    <option value="strategic">Strategic / corporate</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] mt-2"
                  style={{
                    background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
                    color: "hsl(0 0% 100%)",
                    boxShadow: "0 0 25px hsl(275 80% 55% / 0.3)",
                  }}
                >
                  Send Investor Inquiry
                </button>
                <p className="text-[0.6rem] text-muted-foreground/60 text-center mt-1">
                  Fallback: email <a href="mailto:investors@nemi-ai.com" className="text-primary/70 hover:text-primary transition-colors">investors@nemi-ai.com</a>
                </p>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="relative z-[1] py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-12 text-center"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Process
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 100}>
                <div
                  className="p-6 rounded-2xl h-full"
                  style={{
                    background: "hsl(230 20% 8% / 0.6)",
                    border: "1px solid hsl(275 80% 55% / 0.1)",
                  }}
                >
                  <span
                    className="text-3xl font-extrabold block mb-3"
                    style={{ color: "hsl(275 80% 55% / 0.25)" }}
                  >
                    {s.step}
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-foreground">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Institutional Signals ── */}
      <section className="relative z-[1] py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2
              className="text-xl md:text-2xl font-extrabold tracking-tight uppercase mb-8"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Institutional Signals
            </h2>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3">
            {signals.map((sig, i) => (
              <ScrollReveal key={sig} delay={i * 60}>
                <span
                  className="inline-block text-[0.65rem] tracking-[0.1em] uppercase font-semibold px-5 py-2.5 rounded-full"
                  style={{
                    background: "hsl(275 80% 55% / 0.08)",
                    border: "1px solid hsl(275 80% 55% / 0.2)",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  {sig}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Think About Risk ── */}
      <section className="relative z-[1] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-xl md:text-2xl font-extrabold tracking-tight uppercase mb-6 text-center"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              How We Think About Risk
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div
              className="rounded-2xl p-6 md:p-10"
              style={{
                background: "hsl(230 20% 8% / 0.6)",
                border: "1px solid hsl(275 80% 55% / 0.14)",
              }}
            >
              <p className="text-sm md:text-base text-muted-foreground leading-[1.8]">
                Manufacturing is capital-intensive. Defence programmes are regulated.
                Customer concentration is an early-stage reality. NEMI&apos;s structure
                &mdash; AS9100D-certified operations, a diversified programme mix across
                four industries, retrofit-first capital deployment, and board-level
                operating experience &mdash; is designed to address each. Full discussion
                available in diligence.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <PageCTAFooter
        headline="Let's Talk."
        tagline="Serious investors. Serious infrastructure. The next step is simple."
        buttonText="Request Demo"
        buttonHref="/#contact"
        secondaryButtonText="Investor Materials"
        secondaryButtonHref="mailto:investors@nemi-ai.com"
      />
    </div>
  );
};

export default InvestorPage;
