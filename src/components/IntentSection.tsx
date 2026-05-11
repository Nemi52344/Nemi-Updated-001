interface IntentSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const IntentSection = ({ scrollProgress }: IntentSectionProps) => {
  const sectionVisible = scrollProgress > 0.045 && scrollProgress < 0.155;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.05, 0.075));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.13, 0.15));

  if (!sectionVisible) return null;

  const opacity = enterP * (1 - exitP);
  const translateY = (1 - enterP) * 30;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none px-6"
      style={{ zIndex: 30, opacity, background: "hsl(230 25% 4%)" }}
      aria-label="Bringing about the next industrial revolution"
    >
      {/* Subtle nebula glow behind the text, matching the hero theme */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 50% 50%, hsl(275 80% 40% / 0.18) 0%, transparent 65%),
            radial-gradient(ellipse 75% 60% at 50% 55%, hsl(260 70% 30% / 0.10) 0%, transparent 70%)
          `,
        }}
      />

      <div
        className="relative z-[1] max-w-5xl mx-auto text-center pointer-events-auto"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        {/* Kicker - refined eyebrow */}
        <div className="inline-flex items-center gap-3 mb-7 md:mb-9">
          <span
            aria-hidden
            className="block w-8 h-px"
            style={{ background: "linear-gradient(to right, transparent, hsl(275 60% 55% / 0.5))" }}
          />
          <p
            className="text-[0.6rem] md:text-[0.7rem] tracking-[0.5em] uppercase font-semibold"
            style={{ color: "hsl(275 50% 72%)" }}
          >
            The Next Industrial Revolution
          </p>
          <span
            aria-hidden
            className="block w-8 h-px"
            style={{ background: "linear-gradient(to left, transparent, hsl(275 60% 55% / 0.5))" }}
          />
        </div>

        {/* Heading - manufacturing reimagined with AI, NEMI is leading */}
        <h2
          className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-[1.25] md:leading-[1.2] text-foreground/95"
          style={{ textShadow: "0 0 24px hsl(275 60% 50% / 0.18)" }}
        >
          AI is changing manufacturing and{" "}
          <br />
          NEMI is the{" "}
          <span
            className="relative inline-block font-extrabold"
            style={{ color: "hsl(275 55% 78%)" }}
          >
            one-stop platform
            <span
              aria-hidden
              className="absolute left-0 right-0 -bottom-1 md:-bottom-1.5 h-[2px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, hsl(275 60% 60% / 0.55), transparent)",
              }}
            />
          </span>
          {" "}for AI-powered manufacturing, helping manufacturers{" "}
          <span
            className="relative inline-block font-extrabold"
            style={{ color: "hsl(275 55% 78%)" }}
          >
            scale intelligently
            <span
              aria-hidden
              className="absolute left-0 right-0 -bottom-1 md:-bottom-1.5 h-[2px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, hsl(275 60% 60% / 0.55), transparent)",
              }}
            />
          </span>
          {" "}without scaling complexity<span className="text-foreground/95">.</span>
        </h2>
      </div>
    </div>
  );
};

export default IntentSection;
