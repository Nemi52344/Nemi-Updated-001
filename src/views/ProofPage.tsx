"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";
import SiteFooter from "@/components/SiteFooter";

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
    tag: "Defense Subsystem",
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

// Ever-deepening moat — each stage deepens the relationship with the customer.
// Stage cards are styled as a stepped staircase: heights and depths increase
// as you move right, mirroring the slide deck.
const moatStages: {
  stage: string;
  title: string;
  desc: string;
  link?: { href: string; label: string };
  customers: string;
}[] = [
  {
    stage: "1",
    title: "Cost, quality, speed",
    desc: "Customers approach us due to our three clear advantages over alternate suppliers.",
    customers: "16 customers",
  },
  {
    stage: "2",
    title: "High switching risk",
    desc: "Customers stick with us since their critical parts have high re-qualification and switching costs.",
    customers: "10 customers",
  },
  {
    stage: "3",
    title: "Data deepens the moat",
    desc: "Customers expand their reach with us due to constantly improving performance from our LMM flywheel.",
    link: { href: "/technology#flywheel", label: "LMM flywheel" },
    customers: "7 customers",
  },
  {
    stage: "4",
    title: "Strategic partner",
    desc: "No longer a supplier — essential to operations. Impossible to replace.",
    customers: "3 customers",
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
              Flagship Programs
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

      {/* ── Ever-deepening Moat — staircase ── */}
      <section className="relative z-[1] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-6 max-w-3xl"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Once customers adopt LMM, they cannot go back.
            </h2>
            <div className="border-t border-primary/40 mb-8 max-w-3xl" />
          </ScrollReveal>

          {/* Why this cannot be replicated — bullets */}
          <ScrollReveal delay={100}>
            <div className="mb-12 max-w-3xl">
              <p className="text-sm md:text-base font-bold text-foreground mb-3">
                Why this cannot be replicated:
              </p>
              <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground/90">
                {[
                  "Requires full-stack factories + AI (rare)",
                  "Requires closed-loop data (time-dependent)",
                  "Requires deployment at scale (hard)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 inline-block w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: "hsl(275 80% 65%)",
                        boxShadow: "0 0 8px hsl(275 80% 60% / 0.6)",
                      }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs md:text-sm text-foreground/85 mt-5 italic">
                This advantage compounds faster than competitors can build it.
              </p>
            </div>
          </ScrollReveal>

          {/* Funnel: 4 stages span the full row width (proportional widths grow
              left → right), vertically centred so the funnel reads as a
              horizontal horn opening up and down. */}
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 lg:grid-cols-[1fr_1.2fr_1.4fr_1.6fr] gap-3 md:gap-4 items-center">
              {moatStages.map((s, i) => {
                const intensity = (i + 1) / moatStages.length; // 0.25 → 1.0
                // Heights step up to keep the funnel growing visually. Sizes
                // sized so the 3-line paragraph + header + customer count all
                // breathe inside the smallest stage, then scale up evenly.
                const lgHeights = [
                  "lg:h-[280px]",
                  "lg:h-[340px]",
                  "lg:h-[400px]",
                  "lg:h-[460px]",
                ];
                const bgFromLight = 80 - intensity * 40; // 70 → 40
                const bgAlpha = 0.18 + intensity * 0.5; // 0.30 → 0.68
                const borderAlpha = 0.3 + intensity * 0.4;
                return (
                  <div
                    key={s.stage}
                    className={`group relative rounded-xl md:rounded-2xl overflow-hidden p-4 md:p-5 lg:p-6 flex flex-col h-[260px] w-full ${lgHeights[i]} backdrop-blur-sm transition-all duration-500 hover:-translate-y-1`}
                    style={{
                      background: `linear-gradient(155deg,
                        hsl(275 80% ${bgFromLight + 8}% / ${(bgAlpha * 0.95).toFixed(3)}) 0%,
                        hsl(275 75% ${bgFromLight}% / ${(bgAlpha * 0.85).toFixed(3)}) 35%,
                        hsl(280 80% ${bgFromLight - 14}% / ${bgAlpha.toFixed(3)}) 100%)`,
                      border: `1px solid hsl(275 85% 75% / ${borderAlpha.toFixed(3)})`,
                      boxShadow: `0 12px 48px -12px hsl(275 80% ${20 + intensity * 25}% / ${(0.3 + intensity * 0.3).toFixed(3)}),
                                  0 0 ${(intensity * 50).toFixed(0)}px hsl(275 80% 60% / ${(intensity * 0.25).toFixed(3)}),
                                  inset 0 1px 0 hsl(275 90% 92% / ${(0.18 + intensity * 0.15).toFixed(3)}),
                                  inset 0 -1px 0 hsl(275 80% 18% / ${(0.4 + intensity * 0.2).toFixed(3)})`,
                    }}
                  >
                    {/* Specular highlight — soft white sheen in upper-left */}
                    <div
                      aria-hidden
                      className="absolute -top-1/4 -left-1/4 w-2/3 h-2/3 pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(ellipse at 30% 30%,
                          hsl(275 95% 92% / ${(0.16 + intensity * 0.12).toFixed(3)}) 0%,
                          hsl(275 95% 80% / ${(0.06 + intensity * 0.05).toFixed(3)}) 35%,
                          transparent 65%)`,
                        filter: "blur(8px)",
                      }}
                    />
                    {/* Top sheen — thin glossy reflection along the top edge */}
                    <div
                      aria-hidden
                      className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg,
                          transparent,
                          hsl(275 95% 90% / ${(0.4 + intensity * 0.4).toFixed(3)}) 50%,
                          transparent)`,
                      }}
                    />
                    {/* Subtle diagonal shine ribbon — moves on hover */}
                    <div
                      aria-hidden
                      className="absolute -top-full -right-full w-[150%] h-[200%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `linear-gradient(115deg,
                          transparent 35%,
                          hsl(275 100% 95% / 0.07) 47%,
                          hsl(280 100% 92% / 0.12) 50%,
                          hsl(275 100% 95% / 0.07) 53%,
                          transparent 65%)`,
                        transform: "translateX(0%)",
                      }}
                    />

                    {/* Card layout: stage label at top, heading + paragraph
                        vertically centred in the middle (`my-auto`), customer
                        count pinned at the bottom. */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Stage label, top */}
                      <p
                        className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase"
                        style={{
                          color: `hsl(275 80% ${82 + intensity * 6}%)`,
                          textShadow: `0 0 12px hsl(275 90% 70% / ${(0.3 + intensity * 0.3).toFixed(3)})`,
                        }}
                      >
                        Stage {s.stage}
                      </p>

                      {/* Centred block: title + paragraph */}
                      <div className="my-auto flex flex-col text-center">
                        <h3
                          className="text-xs md:text-sm font-bold text-foreground leading-tight whitespace-nowrap mb-3"
                          style={{
                            textShadow: `0 1px 2px hsl(275 80% 10% / 0.5), 0 0 16px hsl(275 90% 70% / ${(intensity * 0.25).toFixed(3)})`,
                          }}
                        >
                          {s.title}
                        </h3>
                        <p
                          className="text-[0.7rem] md:text-xs text-foreground/80 leading-relaxed text-center"
                          style={{
                            minHeight: "calc(3 * 1.625em)",
                            maxHeight: "calc(4 * 1.625em)",
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical" as const,
                            overflow: "hidden",
                          }}
                        >
                          {s.link ? (
                            <>
                              {s.desc.split(s.link.label)[0]}
                              <Link
                                href={s.link.href}
                                className="text-foreground underline decoration-primary/60 underline-offset-2 hover:decoration-primary"
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

                      {/* Customer count, bottom */}
                      <div className="pt-3 relative text-center">
                        <span
                          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                          style={{
                            background: `linear-gradient(90deg,
                              transparent,
                              hsl(275 80% 70% / ${(0.4 + intensity * 0.3).toFixed(3)}) 30%,
                              hsl(275 80% 70% / ${(0.4 + intensity * 0.3).toFixed(3)}) 70%,
                              transparent)`,
                          }}
                        />
                        <p className="text-[0.65rem] md:text-xs font-bold tracking-wider text-foreground/85">
                          {s.customers}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom strap */}
            <div
              className="mt-3 md:mt-4 rounded-xl md:rounded-2xl p-4 md:p-5 backdrop-blur-sm"
              style={{
                background: "linear-gradient(180deg, hsl(275 70% 30% / 0.45), hsl(275 75% 22% / 0.5))",
                border: "1px solid hsl(275 80% 60% / 0.5)",
                boxShadow: "0 0 28px hsl(275 80% 50% / 0.18), inset 0 1px 0 hsl(275 80% 70% / 0.18)",
              }}
            >
              <p className="text-sm md:text-base font-bold text-foreground tracking-wide">
                Switching away means losing your own advantage.
              </p>
            </div>
          </ScrollReveal>
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
      <SiteFooter />
    </div>
  );
};

export default ProofPage;
