"use client";

interface LMMIntroSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const LMMIntroSection = ({ scrollProgress }: LMMIntroSectionProps) => {
  // Entry begins at the SEGS-segment-2 boundary (0.315) so there's no
  // tiny blink between IntentSection exiting and LMMIntroSection starting
  // to fade in. Exit and other timings unchanged.
  // Enter window starts at the SEGS-segment-2 boundary (0.315) and fades in
  // fast so the section reaches full opacity immediately after the SEGS jump.
  // Earlier 0.317 → 0.36 left a low-opacity zone at raw 0.234 (just past the
  // segment jump from seg 1 → seg 2).
  // Exit is staggered to start only AFTER LMMFlow (which renders on top with an
  // opaque background) has fully faded in to cover the screen (LMMFlow enters
  // 0.43→0.45). This section then fades out underneath it (0.45→0.475), so the
  // 3rd→4th transition never shows both panels half-faded at once. The exit
  // slide is also reduced from -80vh to -10vh so content stays centred instead
  // of sliding far up and leaving a gap.
  const sectionVisible = scrollProgress > 0.315 && scrollProgress < 0.475;
  const enterP  = easeOut(rangeProgress(scrollProgress, 0.315, 0.320));
  const exitP   = easeOut(rangeProgress(scrollProgress, 0.45, 0.475));
  const opacity = enterP * (1 - exitP);
  const slideVh = (1 - enterP) * 100 + exitP * -10;

  const tagP      = easeOut(rangeProgress(scrollProgress, 0.32, 0.36));
  const titleP    = easeOut(rangeProgress(scrollProgress, 0.34, 0.38));
  const subtitleP = easeOut(rangeProgress(scrollProgress, 0.36, 0.40));
  const lineP     = easeOut(rangeProgress(scrollProgress, 0.37, 0.41));

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
      style={{ zIndex: 42, opacity, background: "hsl(0 0% 2%)", transform: `translateY(${slideVh}vh)` }}
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
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-4"
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
          className="text-base sm:text-lg md:text-xl text-muted-foreground tracking-[0.1em] sm:tracking-[0.15em] font-light mb-8"
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
