"use client";

interface LMMIntroSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const LMMIntroSection = ({ scrollProgress }: LMMIntroSectionProps) => {
  const sectionVisible = scrollProgress > 0.315 && scrollProgress < 0.46;
  const enterP  = easeOut(rangeProgress(scrollProgress, 0.325, 0.37));
  const exitP   = easeOut(rangeProgress(scrollProgress, 0.43, 0.455));
  const opacity = enterP * (1 - exitP);

  const tagP      = easeOut(rangeProgress(scrollProgress, 0.33, 0.37));
  const titleP    = easeOut(rangeProgress(scrollProgress, 0.35, 0.39));
  const subtitleP = easeOut(rangeProgress(scrollProgress, 0.37, 0.41));
  const lineP     = easeOut(rangeProgress(scrollProgress, 0.38, 0.42));

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
      style={{ zIndex: 42, opacity, background: "hsl(0 0% 2%)" }}
    >
      <div className="flex flex-col items-center text-center px-6">

        {/* Kicker */}
        <p
          className="text-xs tracking-[0.5em] uppercase font-medium mb-6"
          style={{
            color: "hsl(275 60% 65%)",
            opacity: tagP,
            transform: `translateY(${(1 - tagP) * 12}px)`,
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
          className="mt-8 text-sm md:text-base text-muted-foreground max-w-md leading-relaxed"
          style={{
            opacity: lineP,
            transform: `translateY(${(1 - lineP) * 10}px)`,
          }}
        >
          The world&rsquo;s first AI model purpose-built for
          end-to-end manufacturing automation.
        </p>

      </div>
    </div>
  );
};

export default LMMIntroSection;
