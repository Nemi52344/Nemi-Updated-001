"use client";

import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";

/* ── Data ── */
// Flagship cases — public-safe comparison claims only.
// No specific customer revenue, contract values, or named testimonials.
const flagshipCases = [
  {
    tag: "EV Platform",
    title: "Full EV platform delivered in 9 months.",
    desc: "Design, engineering, manufacturing, and deployment moved through one stack instead of fragmented vendors. Over 2,500 units deployed across India and Africa.",
    metrics: [
      { label: "Faster Than Benchmark", value: "2\u00d7" },
      { label: "More Cost Efficient", value: "10\u00d7" },
      { label: "Units Deployed", value: "2,500+" },
    ],
    color: "hsl(0, 72%, 52%)",
  },
  {
    tag: "Defence Subsystem",
    title: "Drone subsystem \u2014 motor, battery and control unit.",
    desc: "Design and prototype for drone powertrain collapsed into one engineering and manufacturing loop.",
    metrics: [
      { label: "Faster", value: "4\u00d7" },
      { label: "Lower Cost", value: "5\u00d7" },
    ],
    color: "hsl(217, 91%, 60%)",
  },
  {
    tag: "Precision Tooling",
    title: "Tooling and fixturing program for supercar OEM.",
    desc: "Tool and fixture design, simulation and finished components delivered inside a compressed launch window.",
    metrics: [
      { label: "Faster", value: "2.5\u00d7" },
      { label: "Lower Cost", value: "2\u00d7" },
    ],
    color: "hsl(142, 71%, 45%)",
  },
];

const whyRepeats = [
  {
    title: "Shared data model",
    desc: "Engineering data, process telemetry, inspection outcomes, and field events reinforce one another instead of fragmenting across vendors.",
  },
  {
    title: "Physical execution control",
    desc: "Owned manufacturing, certifications, and quality systems keep the model grounded in production reality rather than simulation alone.",
  },
  {
    title: "Closed commercial loop",
    desc: "Every production run sharpens the next design. The result is faster speed and lower cost, release after release.",
  },
];

const certifications = ["AS9100D", "ISO 9001:2015", "DRDO Cleared", "ISRO Cleared"];

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
            Real factories. Real programs. Real field data. Execution infrastructure, not a concept piece.
          </p>
        </ScrollReveal>
      </section>

      {/* ── Flagship Cases ── */}
      <section className="relative z-[1] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-4 text-center"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Flagship Programmes
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

                  <div
                    className={
                      "grid grid-cols-2 " +
                      (c.metrics.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2 max-w-md") +
                      " gap-3"
                    }
                  >
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
        </div>
      </section>

      {/* ── Why It Repeats ── */}
      <section className="relative z-[1] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-4 text-center"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Why it repeats
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              The outcomes are systematic, not accidental.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whyRepeats.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div
                  className="p-6 rounded-2xl h-full"
                  style={{
                    background: "hsl(230 20% 8% / 0.6)",
                    border: "1px solid hsl(275 80% 55% / 0.1)",
                  }}
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
              Institutional trust
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
        headline="See it in action."
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
