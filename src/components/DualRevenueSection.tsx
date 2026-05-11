"use client";

interface DualRevenueSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface Stream {
  tag: string;
  title: string;
  subtitle: string;
  bullets: string[];
  accent: string;
}

const STREAMS: Stream[] = [
  {
    tag: "",
    title: "Internal Use",
    subtitle: "Dogfooding",
    bullets: [
      "Proves technology in real production",
      "Generates foundational LMM training data",
      "Creates reference architecture for customers",
    ],
    accent: "275 70% 65%",
  },
  {
    tag: "",
    title: "External Deployment",
    subtitle: "Scale Revenue",
    bullets: [
      "Module-by-module adoption path",
      "Phase platform licensing (full domain)",
      "Full-stack LMM Factory Kit",
      "Federated learning strengthens all models",
    ],
    accent: "210 80% 65%",
  },
];

const DualRevenueSection = ({ scrollProgress }: DualRevenueSectionProps) => {
  // Section: 0.815–0.860
  const sectionVisible = scrollProgress > 0.812 && scrollProgress < 0.860;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.818, 0.835));
  const exitP  = easeOut(rangeProgress(scrollProgress, 0.850, 0.860));
  const opacity = enterP * (1 - exitP);
  const headP = easeOut(rangeProgress(scrollProgress, 0.820, 0.840));

  if (!sectionVisible) return null;

  const cardP = (i: number) => {
    const delay = i * 0.004;
    return easeOut(rangeProgress(scrollProgress, 0.826 + delay, 0.846 + delay));
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 42, opacity, background: "hsl(0 0% 2%)" }}
    >
      {/* Backdrop glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 40%, hsl(275 80% 40% / 0.12) 0%, transparent 65%),
            radial-gradient(ellipse 80% 60% at 50% 70%, hsl(210 70% 30% / 0.06) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative w-full max-w-[1380px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className="text-center mb-5 md:mb-7"
          style={{ opacity: headP, transform: `translateY(${(1 - headP) * 14}px)` }}
        >
          <p
            className="text-[12px] tracking-[0.4em] uppercase font-medium mb-2"
            style={{ color: "hsl(275 60% 65%)" }}
          >
            Business Model
          </p>
          <h2
            className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight"
            style={{
              letterSpacing: "-0.02em",
              textShadow: "0 0 40px hsl(275 80% 60% / 0.3), 0 0 80px hsl(270 70% 50% / 0.15)",
            }}
          >
            Dual Revenue Model
          </h2>
          <p className="text-base text-muted-foreground mt-1.5 tracking-wide">
            Two reinforcing streams, proof at home, scale outside.
          </p>
        </div>

        {/* Two streams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {STREAMS.map((s, i) => {
            const p = cardP(i);
            return (
              <div
                key={s.title}
                className="rounded-xl border p-5 md:p-6 flex flex-col gap-3"
                style={{
                  opacity: p,
                  transform: `translateY(${(1 - p) * 18}px)`,
                  borderColor: `hsl(${s.accent} / 0.25)`,
                  background: `linear-gradient(135deg, hsl(${s.accent} / 0.06), hsl(220 20% 6% / 0.7))`,
                }}
              >
                <div className="flex items-baseline gap-2">
                  {s.tag && (
                    <span
                      className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-semibold px-2 py-0.5 rounded"
                      style={{
                        color: `hsl(${s.accent})`,
                        background: `hsl(${s.accent} / 0.12)`,
                        border: `1px solid hsl(${s.accent} / 0.3)`,
                      }}
                    >
                      {s.tag}
                    </span>
                  )}
                  <h3
                    className="text-base md:text-lg lg:text-xl font-bold tracking-tight uppercase leading-tight"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {s.title}
                  </h3>
                </div>

                <p
                  className="text-base italic"
                  style={{ color: i === 1 ? "hsl(275 70% 80%)" : `hsl(${s.accent} / 0.85)` }}
                >
                  {s.subtitle}
                </p>

                <ul className="flex flex-col gap-1.5 mt-1">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-base leading-relaxed"
                      style={{ color: i === 1 ? "hsl(275 70% 80%)" : "hsl(275 70% 65% / 0.85)" }}
                    >
                      <span
                        className="inline-block mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: i === 1 ? "hsl(275 70% 80%)" : "hsl(275 70% 65% / 0.85)" }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Reinforcing arrow caption */}
        <p
          className="text-center text-[12px] tracking-[0.3em] uppercase mt-4"
          style={{ color: "hsl(0 0% 100% / 0.4)", opacity: enterP }}
        >
          Internal use ⟷ External deployment · Each stream compounds the other
        </p>
      </div>
    </div>
  );
};

export default DualRevenueSection;
