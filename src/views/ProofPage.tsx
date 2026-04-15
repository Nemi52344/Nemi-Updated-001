"use client";

import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";

/* ── Data (sourced from investor deck) ── */
const topKpis = [
  { value: "36+", label: "Enterprise Customers" },
  { value: "$15M", label: "ARR" },
  { value: "90%+", label: "Gross Revenue Retention" },
  { value: "9.8x", label: "LTV / CAC" },
];

const flagshipCases = [
  {
    tag: "Hero Case \u00b7 EV Motorcycle Platform",
    title: "Full EV platform delivered in 9 months for under $0.5M.",
    desc: "Design, engineering, manufacturing, and deployment moved through one stack — BNC Motors test-bed business. Over 2,500 units deployed.",
    metrics: [
      { label: "Faster Than Benchmark", value: "2\u00d7" },
      { label: "More Cost Efficient", value: "10\u00d7" },
      { label: "Program Cost", value: "<$0.5M" },
      { label: "Units Deployed", value: "2,500+" },
    ],
    color: "hsl(0, 72%, 52%)",
  },
  {
    tag: "Case 02 \u00b7 Tier 1 Defence",
    title: "Drone subsystem \u2014 motor, battery and control unit.",
    desc: "Design and prototype for drone powertrain collapsed into one engineering and manufacturing loop.",
    metrics: [
      { label: "Faster", value: "4\u00d7" },
      { label: "Lower Cost", value: "5\u00d7" },
    ],
    color: "hsl(217, 91%, 60%)",
  },
  {
    tag: "Case 03 \u00b7 Top-3 Supercar OEM",
    title: "Tooling and fixturing program.",
    desc: "Tool and fixture design, simulation and finished components delivered inside a compressed launch window.",
    metrics: [
      { label: "Faster", value: "2.5\u00d7" },
      { label: "Lower Cost", value: "2\u00d7" },
    ],
    color: "hsl(142, 71%, 45%)",
  },
];

const compoundingStages = [
  { stage: "Stage 1", title: "Cost / Quality / Speed", desc: "Advantage over alternate suppliers", customers: "3 customers" },
  { stage: "Stage 2", title: "High Switching Risk", desc: "Critical parts carry high qualification cost to switch", customers: "7 customers" },
  { stage: "Stage 3", title: "Data Compounds Moat", desc: "Historical data deepens yield gains, cost reductions, and raises switching costs", customers: "10 customers" },
  { stage: "Stage 4", title: "Strategic Partner", desc: "No longer a supplier \u2014 essential to operations; impossible to replace", customers: "16 customers" },
];

const tractionMetrics = [
  { value: "36+", label: "Enterprise Customers" },
  { value: "90%+", label: "Gross Revenue Retention" },
  { value: "~300%", label: "NRR Next 12 Months" },
  { value: "9.8x", label: "LTV / CAC" },
  { value: "<7 mo", label: "CAC Payback" },
  { value: "6+", label: "Scaling to >$5M ACV" },
];

const landExpandDominate = [
  { stage: "Land", timeline: "Month 1\u20136", range: "$10K\u2013$40K", desc: "Trial order" },
  { stage: "Expand", timeline: "Month 6\u201312", range: "~$1M ARR", desc: "Account motion" },
  { stage: "Dominate", timeline: "Month 12+", range: "$5M+ ARR", desc: "Program depth" },
];

const certifications = ["AS9100D", "ISO 9001:2015", "DRDO Cleared", "ISRO Cleared"];

const financialHighlights = [
  { value: "$15M", label: "ARR" },
  { value: "EBITDA+", label: "From FY26" },
  { value: "40%+", label: "Gross Margins (ex-EV)" },
  { value: "300K+", label: "Sq Ft Manufacturing" },
];

const ProofPage = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <ConstellationCanvas />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative z-[1] pt-32 pb-12 px-6 md:px-12 lg:px-16 text-center">
        <ScrollReveal>
          <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-semibold">The Proof</p>
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase mb-6"
            style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
          >
            These are not pilots.<br />These are production systems.
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real factories. Real programs. Real field data. This is execution infrastructure, not a concept piece.
          </p>
        </ScrollReveal>
      </section>

      {/* ── Top KPI Strip ── */}
      <section className="relative z-[1] py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {topKpis.map((kpi) => (
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

      {/* ── Flagship Cases ── */}
      <section className="relative z-[1] py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-4 text-center"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Flagship Cases
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Proof that speed and cost can move together.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-8">
            {flagshipCases.map((c, i) => (
              <ScrollReveal key={c.tag} delay={i * 120}>
                <div
                  className="rounded-2xl p-6 md:p-8"
                  style={{
                    background: "hsl(230 20% 8% / 0.6)",
                    border: `1px solid ${c.color}20`,
                  }}
                >
                  <span
                    className="text-[0.6rem] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full inline-block mb-4"
                    style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}30` }}
                  >
                    {c.tag}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{c.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-6">{c.desc}</p>

                  <div className={`grid grid-cols-2 ${c.metrics.length > 2 ? "md:grid-cols-4" : "md:grid-cols-2 max-w-md"} gap-3`}>
                    {c.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="text-center py-3 px-2 rounded-xl"
                        style={{ background: `${c.color}08`, border: `1px solid ${c.color}15` }}
                      >
                        <span className="text-xl md:text-2xl font-extrabold block" style={{ color: c.color }}>
                          {m.value}
                        </span>
                        <span className="text-[0.55rem] tracking-[0.1em] uppercase text-muted-foreground font-semibold">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Quote */}
          <ScrollReveal delay={200}>
            <blockquote
              className="mt-10 text-center max-w-2xl mx-auto py-8 px-6 rounded-2xl"
              style={{
                background: "hsl(230 20% 8% / 0.4)",
                border: "1px solid hsl(275 80% 55% / 0.1)",
              }}
            >
              <p className="text-sm md:text-base text-foreground/90 italic leading-relaxed mb-3">
                &ldquo;No one in India was able to accomplish this... We are thoroughly impressed by the capabilities demonstrated.&rdquo;
              </p>
              <cite className="text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground not-italic font-semibold">
                &mdash; DRDL Scientist (Defense Research)
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Compounding Moat ── */}
      <section className="relative z-[1] py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-4 text-center"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Once Adopted, They Cannot Go Back
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Switching away means losing your own advantage. This compounds faster than competitors can build it.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {compoundingStages.map((item, i) => (
              <ScrollReveal key={item.stage} delay={i * 100}>
                <div
                  className="p-6 rounded-2xl h-full relative"
                  style={{
                    background: "hsl(230 20% 8% / 0.6)",
                    border: "1px solid hsl(275 80% 55% / 0.1)",
                  }}
                >
                  <span className="text-2xl font-extrabold block mb-2" style={{ color: "hsl(275 80% 55% / 0.25)" }}>
                    {item.stage}
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                  <span className="text-[0.6rem] tracking-[0.15em] uppercase text-primary font-semibold">
                    {item.customers}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Traction Quality ── */}
      <section className="relative z-[1] py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-4 text-center"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Customers Don&apos;t Churn. They Expand.
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground text-center mb-12 max-w-md mx-auto">
              Expansion is performance-driven, not sales-driven.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {tractionMetrics.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 60}>
                <div className="text-center py-5 px-3 rounded-xl" style={{ background: "hsl(230 20% 8% / 0.5)", border: "1px solid hsl(275 80% 55% / 0.08)" }}>
                  <span
                    className="text-xl md:text-2xl font-extrabold block mb-1"
                    style={{
                      background: "linear-gradient(135deg, hsl(275 80% 65%), hsl(var(--foreground)))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {m.value}
                  </span>
                  <span className="text-[0.55rem] md:text-[0.65rem] tracking-[0.12em] uppercase text-muted-foreground font-semibold">
                    {m.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Land / Expand / Dominate */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-stretch gap-4 justify-center">
              {landExpandDominate.map((item, i) => (
                <div
                  key={item.stage}
                  className="flex-1 text-center py-6 px-6 rounded-xl relative"
                  style={{
                    background: "hsl(230 20% 8% / 0.6)",
                    border: "1px solid hsl(275 80% 55% / 0.12)",
                  }}
                >
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-primary font-bold mb-1">{item.stage}</p>
                  <p className="text-lg md:text-xl font-extrabold text-foreground mb-1">{item.range}</p>
                  <p className="text-[0.6rem] text-muted-foreground uppercase tracking-wider mb-1">{item.desc}</p>
                  <p className="text-[0.55rem] text-muted-foreground/50 tracking-wider">{item.timeline}</p>
                  {i < landExpandDominate.length - 1 && (
                    <span className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-muted-foreground/30 text-lg">&rarr;</span>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Financial Highlights ── */}
      <section className="relative z-[1] py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-xl md:text-2xl font-extrabold tracking-tight uppercase mb-8 text-center"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Where We Are
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {financialHighlights.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 80}>
                <div className="text-center py-5 px-3 rounded-xl" style={{ background: "hsl(230 20% 8% / 0.5)", border: "1px solid hsl(275 80% 55% / 0.08)" }}>
                  <span
                    className="text-xl md:text-2xl font-extrabold block mb-1"
                    style={{
                      background: "linear-gradient(135deg, hsl(275 80% 65%), hsl(var(--foreground)))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {m.value}
                  </span>
                  <span className="text-[0.55rem] md:text-[0.65rem] tracking-[0.12em] uppercase text-muted-foreground font-semibold">
                    {m.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={200}>
            <p className="text-xs text-muted-foreground/60 text-center mt-6 italic max-w-lg mx-auto">
              Growth is constrained by deployment capacity &mdash; not demand. Funding accelerates capacity, not survival.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Institutional Trust ── */}
      <section className="relative z-[1] py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2
              className="text-xl md:text-2xl font-extrabold tracking-tight uppercase mb-8"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Institutional Trust
            </h2>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert} delay={i * 80}>
                <span
                  className="inline-block text-[0.65rem] tracking-[0.1em] uppercase font-semibold px-5 py-2.5 rounded-full"
                  style={{
                    background: "hsl(275 80% 55% / 0.08)",
                    border: "1px solid hsl(275 80% 55% / 0.2)",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  {cert}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PageCTAFooter
        headline="See It In Action."
        tagline="Book a walkthrough. See real production data."
        buttonText="Request Demo"
        buttonHref="/#contact"
        secondaryButtonText="Investor Materials"
        secondaryButtonHref="/investors"
      />
    </div>
  );
};

export default ProofPage;
