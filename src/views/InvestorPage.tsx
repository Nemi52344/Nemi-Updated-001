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
const kpis = [
  { value: "36+", label: "Enterprise Customers" },
  { value: "300K+", label: "Sq Ft Manufacturing" },
  { value: "40+", label: "Patents" },
  { value: "90%+", label: "Gross Revenue Retention" },
];

const processSteps = [
  { step: "01", title: "Submit the inquiry", desc: "Share firm, title, contact details, check size, and what you want to evaluate." },
  { step: "02", title: "NEMI reviews fit", desc: "The team prioritizes serious institutional and strategic conversations." },
  { step: "03", title: "Receive follow-up", desc: "Qualified investors receive the right next step: call, summary materials, or deeper diligence." },
  { step: "04", title: "Enter diligence", desc: "Customer references and data-room materials can be shared as the process advances." },
];

const signals = [
  "Texas C-Corporation",
  "36+ enterprise customers",
  "300K+ sq ft manufacturing",
  "40+ patents",
  "AS9100D and ISO 9001",
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

      {/* ── Hero ── */}
      <section className="relative z-[1] pt-32 pb-16 px-6 md:px-12 lg:px-16 text-center">
        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-semibold">For Investors</p>
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase mb-6"
            style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
          >
            The AI Operating System<br />for Manufacturing
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            One model connects every design decision, every machine, and every deployed unit.
            Use this page to request investor materials.
          </p>
        </ScrollReveal>
      </section>

      {/* ── KPI Strip ── */}
      <section className="relative z-[1] py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <ScrollReveal key={kpi.label}>
              <div className="text-center py-4">
                <span
                  className="text-2xl md:text-4xl font-extrabold block mb-1"
                  style={{
                    background: "linear-gradient(135deg, hsl(275 80% 65%), hsl(var(--foreground)))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {kpi.value}
                </span>
                <span className="text-[0.6rem] md:text-xs tracking-[0.15em] uppercase text-muted-foreground font-semibold">
                  {kpi.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
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
