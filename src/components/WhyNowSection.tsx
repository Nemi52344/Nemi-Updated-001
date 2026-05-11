"use client";

interface WhyNowSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const WhyNowSection = ({ scrollProgress }: WhyNowSectionProps) => {
  // Section: 0.910–0.945 (after Why Us)
  const sectionVisible = scrollProgress > 0.905 && scrollProgress < 0.945;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.912, 0.928));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.935, 0.945));
  const opacity = Math.min(enterP, 1 - exitP);

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 42, opacity, background: "hsl(230 25% 4%)" }}
      aria-labelledby="why-now-section-heading"
    >
      {/* Purple nebula glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 40%, hsl(275 80% 40% / 0.15) 0%, transparent 65%),
            radial-gradient(ellipse 80% 60% at 50% 70%, hsl(260 70% 30% / 0.08) 0%, transparent 70%)
          `,
        }}
      />

      <div
        className="relative z-[2] w-full max-w-7xl mx-auto px-6 md:px-8 py-8 pointer-events-auto"
        style={{
          opacity: enterP,
          transform: `translateY(${(1 - enterP) * 24}px)`,
        }}
      >
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h2
            id="why-now-section-heading"
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3"
            style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.35), 0 0 60px hsl(270 70% 50% / 0.15)" }}
          >
            Why Now
          </h2>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide max-w-[540px]">
            A once-in-a-30-year shift is underway in manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
          {/* Venn diagram */}
          <div className="flex justify-center items-center">
            <div
              className="relative"
              style={{ width: "100%", maxWidth: "400px", height: "360px" }}
              role="img"
              aria-label="Three converging forces: Sovereign Manufacturing, Physical AI, and High ROI Automation"
            >
              {/* Top circle — text pushed UP into its outer petal */}
              <div
                className="absolute rounded-full flex items-start justify-center text-center px-6 pt-12"
                style={{
                  width: "230px", height: "230px",
                  top: "0", left: "50%", marginLeft: "-115px",
                  background: "linear-gradient(135deg, hsl(275 80% 22% / 0.85) 0%, hsl(275 80% 60% / 0.55) 100%)",
                  border: "1px solid hsl(275 80% 65% / 0.35)",
                  boxShadow: "0 0 30px hsl(275 80% 55% / 0.2)",
                }}
              >
                <div>
                  <p className="text-sm font-bold text-foreground mb-1 leading-tight">Sovereign Manufacturing</p>
                  <p className="text-[0.65rem] text-muted-foreground/90 leading-[1.3]">$3T of global trade at risk due to reshoring push</p>
                </div>
              </div>
              {/* Bottom-left circle — text pushed LEFT into its outer petal */}
              <div
                className="absolute rounded-full flex items-center justify-start text-left pl-5 pr-3"
                style={{
                  width: "230px", height: "230px",
                  bottom: "0", left: "0",
                  background: "linear-gradient(135deg, hsl(275 80% 22% / 0.85) 0%, hsl(275 80% 60% / 0.55) 100%)",
                  border: "1px solid hsl(275 80% 65% / 0.35)",
                  boxShadow: "0 0 30px hsl(275 80% 55% / 0.2)",
                }}
              >
                <div style={{ maxWidth: "130px" }}>
                  <p className="text-sm font-bold text-foreground mb-1 leading-tight">Physical AI</p>
                  <p className="text-[0.65rem] text-muted-foreground/90 leading-[1.3]">Starting to transform manufacturing</p>
                </div>
              </div>
              {/* Bottom-right circle — title wraps to 2 lines, pushed RIGHT into its outer petal */}
              <div
                className="absolute rounded-full flex items-center justify-end text-right pr-5 pl-3"
                style={{
                  width: "230px", height: "230px",
                  bottom: "0", right: "0",
                  background: "linear-gradient(135deg, hsl(275 80% 22% / 0.85) 0%, hsl(275 80% 60% / 0.55) 100%)",
                  border: "1px solid hsl(275 80% 65% / 0.35)",
                  boxShadow: "0 0 30px hsl(275 80% 55% / 0.2)",
                }}
              >
                <div style={{ maxWidth: "130px" }}>
                  <p className="text-sm font-bold text-foreground mb-1 leading-tight">High ROI<br />Automation</p>
                  <p className="text-[0.65rem] text-muted-foreground/90 leading-[1.3]">Driving immediate value from M&amp;A</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: text blocks */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-base md:text-lg font-bold text-foreground mb-3 flex items-baseline gap-2">
                <span className="text-primary text-xl md:text-2xl">24–48 mo</span>
                <span>window</span>
              </h3>
              <ul className="text-xs md:text-sm text-muted-foreground space-y-2 list-none pl-0">
                <li className="flex gap-3 items-start">
                  <span className="text-primary mt-1.5 shrink-0">•</span>
                  <span>Physical AI reaches massive commercial deployment</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-primary mt-1.5 shrink-0">•</span>
                  <span>Reshoring driven by geopolitics reframes manufacturing</span>
                </li>
              </ul>
            </div>

            <div
              className="rounded-xl px-5 py-4"
              style={{ background: "hsl(230 20% 8% / 0.5)", borderLeft: "3px solid hsl(275 80% 55% / 0.5)" }}
            >
              <p className="text-sm md:text-base font-semibold text-foreground leading-snug">
                This type of shift happens once every ~30 years
              </p>
              <p className="text-xs text-muted-foreground mt-1">e.g., previously the rise of IT, TPS</p>
            </div>

            <div
              className="rounded-xl px-5 py-4"
              style={{ background: "hsl(230 20% 8% / 0.5)", borderLeft: "3px solid hsl(275 80% 55% / 0.5)" }}
            >
              <p className="text-sm md:text-base font-semibold text-foreground leading-snug">
                Early leaders capture data, market share, and permanence
              </p>
              <p className="text-xs text-muted-foreground mt-1">They become the default.</p>
            </div>

            <div
              className="rounded-xl px-6 py-5"
              style={{
                background: "linear-gradient(135deg, hsl(275 80% 40% / 0.18), hsl(260 70% 30% / 0.12))",
                border: "1px solid hsl(275 80% 55% / 0.3)",
                boxShadow: "0 0 30px hsl(275 80% 55% / 0.15)",
              }}
            >
              <p className="text-sm md:text-base font-bold text-foreground">
                NEMI is building the infrastructure to win this shift.
              </p>
            </div>

            <p className="text-[0.6rem] text-muted-foreground/50 italic">Source: McKinsey Global Institute, 2025.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyNowSection;
