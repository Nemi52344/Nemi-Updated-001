"use client";

import designReleaseImg from "@/assets/design-release.webp";
import developToolingImg from "@/assets/develop-tooling.webp";
import distributeWarehousingImg from "@/assets/distribute-warehousing.webp";

interface CoreTechSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const PHASES = [
  {
    num: "01",
    label: "Design",
    color: "0 72% 58%",
    desc: "Siloed tools, manual BOMs, no production feedback.",
    insightTitle: "High Upfront Capital & Burn at Every Iteration",
    insightBody: "Every new product demands massive upfront investment in tooling, prototyping, and certification.",
    image: designReleaseImg,
    imageAlt: "Motorcycle CAD design release for production",
  },
  {
    num: "02",
    label: "Develop",
    color: "215 75% 60%",
    desc: "Tooling from scratch, knowledge locked in heads.",
    insightTitle: "Repeated Engineering Overhead & Slow Iteration Cycles",
    insightBody: "Development cycles stretch endlessly - each iteration restarts from scratch with no reusable process.",
    image: developToolingImg,
    imageAlt: "Manual tooling and manufacturing process",
  },
  {
    num: "03",
    label: "Deliver",
    color: "152 60% 45%",
    desc: "Fragmented supply chain, zero visibility, knowledge lost at every handoff.",
    insightTitle: "Factories Should Compound Knowledge",
    insightBody: "Expertise stays locked in people's heads - nothing transfers across the value chain.",
    image: distributeWarehousingImg,
    imageAlt: "Manual warehousing and delivery process",
  },
];

const CoreTechSection = ({ scrollProgress }: CoreTechSectionProps) => {
  const sectionVisible = scrollProgress > 0.120 && scrollProgress < 0.225;
  const crossfadeP     = rangeProgress(scrollProgress, 0.215, 0.225);

  const headEnterP  = easeOut(rangeProgress(scrollProgress, 0.128, 0.150));
  const headExitP   = easeOut(rangeProgress(scrollProgress, 0.205, 0.222));
  const headOpacity = headEnterP * (1 - headExitP);

  const bodyP       = easeOut(rangeProgress(scrollProgress, 0.140, 0.160));
  const bodyExit    = easeOut(rangeProgress(scrollProgress, 0.205, 0.222));
  const bodyOpacity = bodyP * (1 - bodyExit);

  const panel0P    = easeOut(rangeProgress(scrollProgress, 0.155, 0.175));
  const panel1P    = easeOut(rangeProgress(scrollProgress, 0.165, 0.185));
  const panel2P    = easeOut(rangeProgress(scrollProgress, 0.175, 0.195));
  const panelExitP = easeOut(rangeProgress(scrollProgress, 0.205, 0.225));

  if (!sectionVisible) return null;

  const panelPs = [panel0P, panel1P, panel2P];

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none flex flex-col justify-center pt-[50px] md:pt-0"
        style={{ zIndex: 25, padding: "4vh 4vw 2vh" }}
      >

        {/* ── HEADLINE ── */}
        <div style={{ opacity: headOpacity, transform: `translateY(${(1 - headEnterP) * 18}px)` }}>
          <h2
            className="text-2xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            Hardware is Hard.
          </h2>
          <p
            className="text-sm md:text-base text-muted-foreground leading-relaxed md:whitespace-nowrap"
            style={{ opacity: bodyOpacity }}
          >
            Manufacturing today is fragmented across disconnected tools, suppliers, and workflows causing every production cycle to restart from zero.
          </p>
        </div>

        {/* ── CARDS ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 pointer-events-auto"
          style={{ margin: "1.5vh 0" }}
        >
          {PHASES.map((ph, i) => {
            const p       = panelPs[i];
            const opacity = p * (1 - panelExitP);
            const ty      = (1 - p) * 28;

            return (
              <div
                key={ph.label}
                className="relative rounded-2xl flex flex-col overflow-hidden"
                style={{
                  opacity,
                  transform: `translateY(${ty}px)`,
                  border: `1px solid hsl(${ph.color} / 0.15)`,
                  background: "hsl(220 20% 7% / 0.8)",
                  height: "auto",
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-[75px] md:h-[180px]" style={{ background: "hsl(220 20% 6%)" }}>
                  <img
                    src={ph.image}
                    alt={ph.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.7) saturate(0.85)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, transparent 40%, hsl(220 20% 7%) 100%)` }}
                  />
                </div>

                {/* Card body */}
                <div className="flex flex-col px-3 pb-3 pt-2 gap-1 md:px-5 md:pb-4 md:pt-3 md:gap-2">
                  <span
                    className="text-xs md:text-lg tracking-[0.18em] uppercase font-semibold"
                    style={{
                      color: `hsl(${ph.color})`,
                      letterSpacing: "0.18em",
                      lineHeight: 1,
                    }}
                  >
                    {ph.label}
                  </span>
                  <div className="h-px" style={{ background: `hsl(${ph.color} / 0.12)` }} />
                  <p
                    className="text-xs md:text-xl font-medium leading-snug"
                    style={{ letterSpacing: "-0.01em", color: "hsl(0 0% 92%)" }}
                  >
                    {ph.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── INSIGHTS - three individual violet boxes, titles only ── */}
        <div className="hidden md:grid grid-cols-3 gap-4" style={{ opacity: bodyOpacity }}>
          {PHASES.map((ph) => (
            <div
              key={ph.insightTitle}
              className="rounded-2xl border px-3 py-2 md:px-5 md:py-4 flex items-center justify-center text-center"
              style={{
                borderColor: "hsl(275 70% 55% / 0.35)",
                background: "linear-gradient(135deg, hsl(275 70% 50% / 0.10), hsl(275 20% 8% / 0.6))",
                boxShadow: "0 0 24px hsl(275 80% 50% / 0.10)",
              }}
            >
              <span
                className="text-[9px] md:text-[13px] font-bold tracking-tight whitespace-nowrap"
                style={{
                  color: "hsl(275 80% 75%)",
                  textShadow: "0 0 18px hsl(275 80% 60% / 0.35)",
                }}
              >
                {ph.insightTitle}
              </span>
            </div>
          ))}
        </div>

      </div>

      {crossfadeP > 0 && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 25,
            background: "hsl(230 25% 4%)",
            opacity: crossfadeP * 0.85,
            transition: "opacity 0.05s linear",
          }}
        />
      )}
    </>
  );
};

export default CoreTechSection;
