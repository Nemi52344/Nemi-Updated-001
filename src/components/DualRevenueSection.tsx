"use client";

interface DualRevenueSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface Stream {
  num: string;
  title: string;
  subtitle: string;
  bullets: string[];
  alpha: number;
}

const STREAMS: Stream[] = [
  {
    num: "01",
    title: "Internal Manufacturing Operations",
    subtitle: "Internal Manufacturing · Physical AI Dogfooding · System Optimization",
    bullets: [
      "B2B & last-mile delivery partner",
      "Tier 1 manufacturing supplier",
      "Physical AI dogfooding for model refinement",
    ],
    alpha: 0.18,
  },
  {
    num: "02",
    title: "Manufacturing as a Service",
    subtitle: "End-to-End Manufacturing · AI-Powered Production · Scalable Operations",
    bullets: [
      "Physical AI-powered contract manufacturing for external clients",
      "Faster turnaround, lower unit cost, uncompromised quality",
      "Any product, any industry, at any scale",
    ],
    alpha: 0.12,
  },
  {
    num: "03",
    title: "External Deployment",
    subtitle: "Enterprise Deployment · Factory Intelligence · External AI Integration",
    bullets: [
      "Physical AI platform licensed to external manufacturers",
      "Full-stack LMM deployment at client facilities",
      "Subscription & usage-based licensing model",
    ],
    alpha: 0.08,
  },
  {
    num: "04",
    title: "Global Manufacturing Intelligence Network",
    subtitle: "Physical AI Infrastructure · Cross-Border Learning · Operational Scale",
    bullets: [
      "Expand manufacturing intelligence across global production hubs",
      "Continuously refine Physical AI through real-world operational data",
      "Combine precision engineering, scalable production, and cost-efficient infrastructure into one unified manufacturing network",
    ],
    alpha: 0.05,
  },
];

const DualRevenueSection = ({ scrollProgress }: DualRevenueSectionProps) => {
  const sectionVisible = scrollProgress > 0.565 && scrollProgress < 0.655;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.572, 0.590));
  const exitP  = easeOut(rangeProgress(scrollProgress, 0.638, 0.653));
  const opacity = enterP * (1 - exitP);
  const headP = easeOut(rangeProgress(scrollProgress, 0.575, 0.595));

  if (!sectionVisible) return null;

  const cardP = (i: number) => {
    const delay = i * 0.004;
    return easeOut(rangeProgress(scrollProgress, 0.580 + delay, 0.600 + delay));
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 42, opacity, background: "hsl(0 0% 2%)" }}
    >
      {/* Purple radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 45%, hsl(275 80% 35% / 0.18) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 25% 60%, hsl(280 70% 40% / 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 75% 60%, hsl(270 75% 40% / 0.08) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative w-full max-w-[1300px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className="text-center mb-2 md:mb-6"
          style={{ opacity: headP, transform: `translateY(${(1 - headP) * 14}px)` }}
        >
          <p
            className="text-[11px] tracking-[0.45em] uppercase font-semibold mb-2"
            style={{ color: "hsl(275 60% 70%)" }}
          >
            Business Model
          </p>
          <h2
            className="text-base md:text-3xl lg:text-4xl font-bold"
            style={{
              letterSpacing: "-0.02em",
              color: "hsl(0 0% 98%)",
              textShadow: "0 0 40px hsl(275 80% 60% / 0.4), 0 0 80px hsl(275 70% 50% / 0.2)",
            }}
          >
            Four Revenue Streams
          </h2>
          <p
            className="text-[10px] md:text-sm mt-1 md:mt-1.5 tracking-wide"
            style={{ color: "hsl(275 40% 75% / 0.6)" }}
          >
            Four reinforcing streams, each compounding the next.
          </p>
        </div>

        {/* Four streams — mobile: slim stacked cards, desktop: 2×2 grid */}
        {/* Mobile */}
        <div className="flex flex-col gap-2.5 md:hidden">
          {STREAMS.map((s, i) => {
            const p = cardP(i);
            return (
              <div
                key={s.title}
                className="rounded-xl border px-3 py-3 flex items-start gap-3"
                style={{
                  opacity: p,
                  transform: `translateY(${(1 - p) * 12}px)`,
                  borderColor: `hsl(275 70% 60% / ${s.alpha + 0.12})`,
                  background: `linear-gradient(135deg, hsl(275 70% 50% / ${s.alpha}) 0%, hsl(270 60% 15% / 0.4) 100%)`,
                }}
              >
                <span
                  className="text-lg font-black leading-none mt-0.5 shrink-0"
                  style={{ color: "hsl(275 70% 65% / 0.35)", fontVariantNumeric: "tabular-nums" }}
                >
                  {s.num}
                </span>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide leading-tight" style={{ color: "hsl(0 0% 97%)" }}>
                    {s.title}
                  </h3>
                  <p className="text-xs mt-1 leading-snug" style={{ color: "hsl(275 30% 85% / 0.7)" }}>
                    {s.bullets[0]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-2 gap-4">
          {STREAMS.map((s, i) => {
            const p = cardP(i);
            return (
              <div
                key={s.title}
                className="rounded-2xl border p-5 flex flex-col gap-2.5"
                style={{
                  opacity: p,
                  transform: `translateY(${(1 - p) * 18}px)`,
                  borderColor: `hsl(275 70% 60% / ${s.alpha + 0.12})`,
                  background: `linear-gradient(135deg, hsl(275 70% 50% / ${s.alpha}) 0%, hsl(270 60% 15% / 0.4) 100%)`,
                  backdropFilter: "blur(4px)",
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="text-2xl font-black leading-none mt-0.5 flex-shrink-0"
                    style={{ color: "hsl(275 70% 65% / 0.35)", fontVariantNumeric: "tabular-nums" }}
                  >
                    {s.num}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-base font-bold uppercase tracking-wide leading-tight" style={{ color: "hsl(0 0% 97%)" }}>
                      {s.title}
                    </h3>
                    <p className="text-[11px] tracking-wide" style={{ color: "hsl(275 50% 75% / 0.55)" }}>
                      {s.subtitle}
                    </p>
                  </div>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "hsl(275 30% 85% / 0.8)" }}>
                      <span className="inline-block mt-[5px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: "hsl(275 70% 70%)" }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom caption */}
        <p
          className="text-center text-[7px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase mt-2 md:mt-4"
          style={{ color: "hsl(275 40% 70% / 0.4)", opacity: enterP }}
        >
          Internal use ⟷ External deployment · Each stream compounds the other
        </p>
      </div>
    </div>
  );
};

export default DualRevenueSection;
