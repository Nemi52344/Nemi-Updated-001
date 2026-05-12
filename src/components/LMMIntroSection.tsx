"use client";

interface LMMIntroSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const LMMIntroSection = ({ scrollProgress }: LMMIntroSectionProps) => {
  const sectionVisible = scrollProgress > 0.220 && scrollProgress < 0.305;
  const enterP  = easeOut(rangeProgress(scrollProgress, 0.225, 0.255));
  const exitP   = easeOut(rangeProgress(scrollProgress, 0.285, 0.303));
  const opacity = enterP * (1 - exitP);

  const tagP      = easeOut(rangeProgress(scrollProgress, 0.228, 0.250));
  const titleP    = easeOut(rangeProgress(scrollProgress, 0.238, 0.265));
  const subtitleP = easeOut(rangeProgress(scrollProgress, 0.248, 0.275));
  const lineP     = easeOut(rangeProgress(scrollProgress, 0.255, 0.280));

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
      style={{ zIndex: 42, opacity, background: "hsl(0 0% 2%)" }}
    >
      <div className="flex flex-col items-center text-center px-6">

        {/* Kicker — new heading */}
        <p
          className="text-sm md:text-base tracking-wide font-semibold mb-6 max-w-xl leading-snug"
          style={{
            color: "hsl(275 60% 75%)",
            opacity: tagP,
            transform: `translateY(${(1 - tagP) * 12}px)`,
          }}
        >
          We built the system that fixes fragmented manufacturing
        </p>


        {/* Introducing line */}
        <p
          className="text-xs tracking-[0.5em] uppercase font-medium mb-3"
          style={{
            color: "hsl(275 50% 60%)",
            opacity: titleP,
            transform: `translateY(${(1 - titleP) * 10}px)`,
          }}
        >
          Introducing
        </p>

        {/* Title */}
        <h2
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-4"
          style={{
            opacity: titleP,
            transform: `translateY(${(1 - titleP) * 20}px)`,
            letterSpacing: "-0.03em",
            backgroundImage: "linear-gradient(135deg, hsl(0 0% 98%) 0%, hsl(285 65% 90%) 50%, hsl(275 75% 78%) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            filter: "drop-shadow(0 0 80px hsl(275 80% 60% / 0.25)) drop-shadow(0 0 160px hsl(270 70% 50% / 0.15))",
          }}
        >
          NEMI LMM
        </h2>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-muted-foreground tracking-[0.15em] font-light mb-8"
          style={{
            opacity: subtitleP,
            transform: `translateY(${(1 - subtitleP) * 14}px)`,
          }}
        >
          Large Manufacturing Model
        </p>

        {/* Decorative line */}
        <div
          className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{
            width: `${lineP * 200}px`,
            opacity: lineP,
          }}
        />

        {/* One-liner */}
        <p
          className="mt-8 text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed"
          style={{
            opacity: lineP,
            transform: `translateY(${(1 - lineP) * 10}px)`,
          }}
        >
          A unified AI-powered system connecting the entire manufacturing value chain,<br />turning fragmented manufacturing into compounding intelligence.
        </p>

      </div>
    </div>
  );
};

export default LMMIntroSection;
