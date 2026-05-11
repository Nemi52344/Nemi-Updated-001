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
    insightTitle: "High Capital",
    insightBody: "Every new product demands massive upfront investment in tooling, prototyping, and certification.",
    image: designReleaseImg,
    imageAlt: "Motorcycle CAD design release for production",
  },
  {
    num: "02",
    label: "Develop",
    color: "215 75% 60%",
    desc: "Tooling from scratch, knowledge locked in heads.",
    insightTitle: "More Time-Consuming",
    insightBody: "Development cycles stretch endlessly - each iteration restarts from scratch with no reusable process.",
    image: developToolingImg,
    imageAlt: "Manual tooling and manufacturing process",
  },
  {
    num: "03",
    label: "Deliver",
    color: "152 60% 45%",
    desc: "Fragmented supply chain, zero visibility.",
    insightTitle: "Knowledge Doesn't Compound",
    insightBody: "Expertise stays locked in people's heads - nothing transfers across the value chain.",
    image: distributeWarehousingImg,
    imageAlt: "Manual warehousing and delivery process",
  },
];

const CoreTechSection = ({ scrollProgress }: CoreTechSectionProps) => {
  const sectionVisible = scrollProgress > 0.145 && scrollProgress < 0.33;
  const crossfadeP     = rangeProgress(scrollProgress, 0.30, 0.33);

  const headEnterP  = easeOut(rangeProgress(scrollProgress, 0.16, 0.20));
  const headExitP   = easeOut(rangeProgress(scrollProgress, 0.29, 0.32));
  const headOpacity = headEnterP * (1 - headExitP);

  const bodyP       = easeOut(rangeProgress(scrollProgress, 0.19, 0.23));
  const bodyExit    = easeOut(rangeProgress(scrollProgress, 0.29, 0.32));
  const bodyOpacity = bodyP * (1 - bodyExit);

  const panel0P    = easeOut(rangeProgress(scrollProgress, 0.21, 0.25));
  const panel1P    = easeOut(rangeProgress(scrollProgress, 0.23, 0.27));
  const panel2P    = easeOut(rangeProgress(scrollProgress, 0.25, 0.29));
  const panelExitP = easeOut(rangeProgress(scrollProgress, 0.29, 0.33));

  if (!sectionVisible) return null;

  const panelPs = [panel0P, panel1P, panel2P];

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none flex flex-col justify-center"
        style={{ zIndex: 25, padding: "8vh 6vw 3vh" }}
      >

        {/* ── HEADLINE ── */}
        <div style={{ opacity: headOpacity, transform: `translateY(${(1 - headEnterP) * 18}px)` }}>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            Hardware is Hard.
          </h2>
          <p
            className="text-base text-muted-foreground leading-relaxed whitespace-nowrap"
            style={{ opacity: bodyOpacity }}
          >
            Manufacturing is deeply fragmented, every product restarts from zero, burning capital and losing knowledge at every handoff.
          </p>
        </div>

        {/* ── CARDS ── */}
        <div
          className="grid grid-cols-3 gap-4 pointer-events-auto"
          style={{ margin: "2.5vh 0" }}
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
                <div className="relative overflow-hidden" style={{ height: "180px", background: "hsl(220 20% 6%)" }}>
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
                <div className="flex flex-col px-5 pb-4 pt-3 gap-2">
                  <span
                    className="text-base md:text-lg tracking-[0.18em] uppercase font-semibold"
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
                    className="text-lg md:text-xl font-medium leading-snug"
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
        <div className="grid grid-cols-3 gap-4" style={{ opacity: bodyOpacity }}>
          {PHASES.map((ph) => (
            <div
              key={ph.insightTitle}
              className="rounded-2xl border px-5 py-4 flex items-center justify-center text-center"
              style={{
                borderColor: "hsl(275 70% 55% / 0.35)",
                background: "linear-gradient(135deg, hsl(275 70% 50% / 0.10), hsl(275 20% 8% / 0.6))",
                boxShadow: "0 0 24px hsl(275 80% 50% / 0.10)",
              }}
            >
              <span
                className="text-base md:text-lg font-bold tracking-tight"
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
