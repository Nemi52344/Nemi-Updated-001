"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";

/* ── Data ── */
// Flagship cases, public-safe comparison claims only.
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
    title: "Drone subsystem \, motor, battery and control unit.",
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

// Ever-deepening moat — each stage deepens the relationship with the customer
// (and the moat against alternate suppliers).
const moatStages: {
  stage: string;
  title: string;
  desc: string;
  link?: { href: string; label: string };
}[] = [
  {
    stage: "01",
    title: "Cost, quality, speed",
    desc: "Customers approach us due to our three clear advantages over alternate suppliers.",
  },
  {
    stage: "02",
    title: "High switching risk",
    desc: "Customers stick with us since their critical parts have high re-qualification and switching costs.",
  },
  {
    stage: "03",
    title: "Data deepens the moat",
    desc: "Customers expand their reach with us due to constantly improving performance from our LMM flywheel.",
    link: { href: "/technology#flywheel", label: "LMM flywheel" },
  },
  {
    stage: "04",
    title: "Strategic partner",
    desc: "No longer a supplier — essential to operations. Impossible to replace.",
  },
];


const ProofPage = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <ConstellationCanvas />
      <Navbar />

      {/* ── Hero, full-screen, matches About page style ── */}
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
        <div className="text-center relative z-[3] max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.95] mb-8"
            style={{ textShadow: "0 0 25px hsl(275 80% 60% / 0.2), 0 0 50px hsl(270 70% 50% / 0.1)" }}
          >
            <span style={{ display: "inline-block", animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
              Hardware
            </span>
            <br />
            <span style={{ display: "inline-block", animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both" }}>
              in the
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary) / 0.8))",
                backgroundSize: "200% 200%",
                animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both, hero-gradient-shift 6s ease-in-out infinite 1.4s",
              }}
            >
              Field.
            </span>
          </h1>
          <p
            className="text-sm md:text-lg font-light text-muted-foreground leading-relaxed tracking-[0.15em] uppercase mx-auto md:whitespace-nowrap"
            style={{ opacity: 0, animation: "hero-fade-up 0.7s ease-out 1s forwards" }}
          >
            Real factories. Real programs. Real field data.
          </p>
        </div>
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
                  <p className="text-[0.65rem] text-muted-foreground/50 italic mt-5 leading-relaxed">
                    Customer name withheld under NDA. Reference available on request during investor diligence.
                  </p>
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

      {/* ── Ever-deepening Moat ── */}
      <section className="relative z-[1] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-4 text-center"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              A Deeper and Wider Moat
              <br className="hidden md:block" />
              <span className="md:inline"> with Every Customer</span>
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              As customers deepen their relationship with us, every stage deepens our moat.
            </p>
          </ScrollReveal>
          <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-2">
            {moatStages.map((s, i) => {
              // Gradient: lighter at stage 1, darker / more saturated at stage 4 to
              // visually convey the moat deepening as customers move through stages.
              const intensity = (i + 1) / moatStages.length; // 0.25 → 1.0
              const bgAlpha = 0.06 + intensity * 0.18;        // 0.105 → 0.24
              const borderAlpha = 0.18 + intensity * 0.42;    // 0.285 → 0.6
              const accent = `hsl(275 80% 60% / ${borderAlpha.toFixed(3)})`;
              return (
                <ScrollReveal key={s.stage} delay={i * 90} className="flex-1">
                  <div className="flex items-stretch gap-2 lg:gap-1 h-full">
                    <div
                      className="p-5 rounded-2xl h-full flex flex-col flex-1 transition-transform duration-300 hover:-translate-y-0.5"
                      style={{
                        background: `hsl(275 80% 30% / ${bgAlpha.toFixed(3)})`,
                        border: `1px solid ${accent}`,
                        boxShadow: `0 0 ${(intensity * 30).toFixed(0)}px hsl(275 80% 60% / ${(intensity * 0.18).toFixed(3)})`,
                      }}
                    >
                      <span
                        className="text-[0.6rem] tracking-[0.3em] uppercase font-bold mb-3"
                        style={{ color: `hsl(275 80% ${65 + intensity * 8}%)` }}
                      >
                        Stage {s.stage}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-foreground mb-2 leading-tight">
                        {s.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {s.link ? (
                          <>
                            {s.desc.split(s.link.label)[0]}
                            <Link
                              href={s.link.href}
                              className="text-primary hover:underline"
                            >
                              {s.link.label}
                            </Link>
                            {s.desc.split(s.link.label)[1]}
                          </>
                        ) : (
                          s.desc
                        )}
                      </p>
                    </div>
                    {/* Chevron between stages — desktop only */}
                    {i < moatStages.length - 1 && (
                      <div
                        aria-hidden
                        className="hidden lg:flex items-center"
                        style={{ color: `hsl(275 80% ${55 + intensity * 12}% / 0.7)` }}
                      >
                        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                          <path
                            d="M3 3 L13 11 L3 19"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
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
