import { useMemo } from "react";

interface AkioDesignSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const bootLines = [
  "NEMI BIOS v4.2.1, Initializing...",
  "CPU: Quantum Neural Processor × 128 cores",
  "RAM: 2.048 TB Unified Manufacturing Memory",
  "GPU: Physical AI Accelerator, ONLINE",
  "Loading AKIO Intelligence Suite...",
  "Mounting design modules............ OK",
  "Calibrating generative engine...... OK",
  "Connecting to LMM backbone......... OK",
  "AKIO INTELLIGENCE SUITE, READY",
];

const bannerWords = "We can design just about any hardware".split(" ");

interface PartItem {
  name: string;
  colorHsl: string;
}

const parts: PartItem[] = [
  { name: "Battery Pack", colorHsl: "45 90% 55%" },
  { name: "Drivetrain", colorHsl: "200 85% 55%" },
  { name: "Chassis Frame", colorHsl: "0 75% 55%" },
  { name: "Control Unit", colorHsl: "145 75% 50%" },
  { name: "Sensor Array", colorHsl: "275 80% 60%" },
];

const AkioDesignSection = ({ scrollProgress }: AkioDesignSectionProps) => {
  // Section: 0.23–0.33
  const sectionVisible = scrollProgress > 0.225 && scrollProgress < 0.335;

  // No separate banner, integrated into section
  const bannerP = rangeProgress(scrollProgress, 0.23, 0.245);
  const bannerExitP = easeOut(rangeProgress(scrollProgress, 0.245, 0.25));

  const headingP = easeOut(rangeProgress(scrollProgress, 0.23, 0.245));
  const headingExitP = easeOut(rangeProgress(scrollProgress, 0.245, 0.255));
  const headingOpacity = headingP * (1 - headingExitP);

  const bootP = easeOut(rangeProgress(scrollProgress, 0.255, 0.275));
  const bootExitP = easeOut(rangeProgress(scrollProgress, 0.275, 0.285));

  const roomEnterP = easeOut(rangeProgress(scrollProgress, 0.285, 0.295));
  const roomExitP = easeOut(rangeProgress(scrollProgress, 0.295, 0.30));

  const partsP = rangeProgress(scrollProgress, 0.30, 0.315);
  const partsExitP = easeOut(rangeProgress(scrollProgress, 0.315, 0.32));

  const patentEnterP = easeOut(rangeProgress(scrollProgress, 0.32, 0.325));
  const patentExitP = easeOut(rangeProgress(scrollProgress, 0.325, 0.33));

  // Which part is highlighted
  const activePartIndex = useMemo(() => {
    if (partsP <= 0) return -1;
    return Math.min(Math.floor(partsP * parts.length), parts.length - 1);
  }, [partsP]);


  if (!sectionVisible) return null;

  return (
    <>
      {/* ============ SECTION HEADING ============ */}
      {headingOpacity > 0 && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            zIndex: 40,
            opacity: headingOpacity,
            transform: `translateY(${(1 - headingP) * 30}px)`,
          }}
        >
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-3"
            style={{
              textShadow: "0 0 30px hsl(275 80% 60% / 0.4), 0 0 60px hsl(270 70% 50% / 0.2)",
            }}
          >
            Akio
          </h2>
          <p
            className="text-sm md:text-lg lg:text-xl font-light tracking-[0.2em] uppercase text-muted-foreground text-center max-w-xl mx-4"
            style={{
              textShadow: "0 0 15px hsl(275 80% 60% / 0.2)",
            }}
          >
            We can design just about any hardware
          </p>
        </div>
      )}

      {/* ============ BOOT SEQUENCE ============ */}
      {bootP > 0 && bootExitP < 1 && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{
            zIndex: 40,
            opacity: (1 - bootExitP),
            background: "hsl(230 25% 4% / 0.85)",
          }}
        >
          <div className="max-w-2xl w-full mx-6 font-mono text-sm md:text-base">
            {bootLines.map((line, i) => {
              const lineProgress = bootP * bootLines.length;
              const lineVisible = i < lineProgress;
              const isLast = i === bootLines.length - 1;

              return (
                <div
                  key={i}
                  className="mb-1"
                  style={{
                    opacity: lineVisible ? 1 : 0,
                    transition: "opacity 0.1s",
                    color: isLast && lineVisible
                      ? "hsl(145 75% 55%)"
                      : "hsl(145 75% 45% / 0.7)",
                    fontWeight: isLast ? 700 : 400,
                    fontSize: isLast ? "1.1em" : undefined,
                    textShadow: isLast && lineVisible
                      ? "0 0 20px hsl(145 75% 50% / 0.5)"
                      : undefined,
                  }}
                >
                  {lineVisible ? line : ""}
                  {lineVisible && i === Math.floor(lineProgress) && (
                    <span className="animate-pulse">█</span>
                  )}
                </div>
              );
            })}

            {/* Loading bar */}
            <div className="mt-4 h-1 w-full rounded-full overflow-hidden" style={{ background: "hsl(0 0% 15%)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${bootP * 100}%`,
                  background: "linear-gradient(90deg, hsl(145 75% 45%), hsl(275 80% 60%))",
                  boxShadow: "0 0 10px hsl(275 80% 60% / 0.5)",
                  transition: "width 0.05s linear",
                }}
              />
            </div>
          </div>
        </div>
      )}


      {/* ============ WHITE ROOM, Challenger, Humanoid, Drone ============ */}
      {roomEnterP > 0 && roomExitP < 1 && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 40,
            opacity: roomEnterP * (1 - roomExitP),
          }}
        >
          {/* AKIO AI label */}
          <div
            className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2"
            style={{
              opacity: roomEnterP,
              transform: `translateX(${(1 - roomEnterP) * -40}px) translateY(-50%)`,
            }}
          >
            <h2
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter"
              style={{ color: "hsl(0 0% 95%)" }}
            >
              AKIO
            </h2>
            <p
              className="text-lg md:text-xl tracking-[0.5em] uppercase font-light"
              style={{ color: "hsl(230 25% 70%)" }}
            >
              Intelligence
            </p>
          </div>

          {/* Silhouettes */}
          <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex items-end gap-6 md:gap-10">
            {/* Challenger (car silhouette) */}
            <div
              className="flex flex-col items-center"
              style={{
                opacity: easeOut(rangeProgress(roomEnterP, 0, 0.4)),
                transform: `translateY(${(1 - easeOut(rangeProgress(roomEnterP, 0, 0.4))) * 40}px)`,
              }}
            >
              <div
                className="w-32 h-16 md:w-48 md:h-24 rounded-lg"
                style={{
                  background: "hsl(230 15% 55%)",
                  clipPath: "polygon(10% 100%, 0% 60%, 15% 30%, 35% 10%, 65% 10%, 85% 30%, 100% 60%, 90% 100%)",
                }}
              />
              <span className="mt-2 text-xs tracking-widest uppercase" style={{ color: "hsl(230 25% 70%)" }}>
                Challenger
              </span>
            </div>

            {/* Humanoid */}
            <div
              className="flex flex-col items-center"
              style={{
                opacity: easeOut(rangeProgress(roomEnterP, 0.3, 0.7)),
                transform: `translateY(${(1 - easeOut(rangeProgress(roomEnterP, 0.3, 0.7))) * 40}px)`,
              }}
            >
              <div className="relative">
                <div
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto"
                  style={{ background: "hsl(230 15% 55%)" }}
                />
                <div
                  className="w-16 h-28 md:w-20 md:h-36 rounded-t-lg mx-auto mt-1"
                  style={{ background: "hsl(230 15% 50%)" }}
                />
              </div>
              <span className="mt-2 text-xs tracking-widest uppercase" style={{ color: "hsl(230 25% 70%)" }}>
                Humanoid
              </span>
            </div>

            {/* Drone */}
            <div
              className="flex flex-col items-center"
              style={{
                opacity: easeOut(rangeProgress(roomEnterP, 0.6, 1)),
                transform: `translateY(${(1 - easeOut(rangeProgress(roomEnterP, 0.6, 1))) * -30}px)`,
              }}
            >
              <div className="relative">
                <div
                  className="w-20 h-3 md:w-28 md:h-4 rounded-full mx-auto"
                  style={{ background: "hsl(230 15% 55%)" }}
                />
                <div
                  className="w-10 h-6 md:w-14 md:h-8 rounded mx-auto mt-1"
                  style={{ background: "hsl(230 15% 50%)" }}
                />
              </div>
              <span className="mt-2 text-xs tracking-widest uppercase" style={{ color: "hsl(230 25% 70%)" }}>
                Drone
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============ PARTS HIGHLIGHT, Battery etc. ============ */}
      {partsP > 0 && partsExitP < 1 && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 40,
            opacity: 1 - partsExitP,
          }}
        >
          {/* AKIO AI label (small, top-left) */}
          <div className="absolute left-8 md:left-16 top-8">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: "hsl(0 0% 90%)" }}>
              AKIO AI
            </h3>
          </div>

          {/* Transparent objects in background */}
          <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex items-end gap-6 md:gap-10 opacity-15">
            <div className="w-32 h-16 md:w-48 md:h-24 rounded-lg" style={{ background: "hsl(230 15% 35%)", clipPath: "polygon(10% 100%, 0% 60%, 15% 30%, 35% 10%, 65% 10%, 85% 30%, 100% 60%, 90% 100%)" }} />
            <div>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto" style={{ background: "hsl(230 15% 35%)" }} />
              <div className="w-16 h-28 md:w-20 md:h-36 rounded-t-lg mx-auto mt-1" style={{ background: "hsl(230 15% 35%)" }} />
            </div>
            <div>
              <div className="w-20 h-3 md:w-28 md:h-4 rounded-full mx-auto" style={{ background: "hsl(230 15% 35%)" }} />
              <div className="w-10 h-6 md:w-14 md:h-8 rounded mx-auto mt-1" style={{ background: "hsl(230 15% 35%)" }} />
            </div>
          </div>

          {/* Active part highlight */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center">
            {/* Large battery / part icon */}
            <div
              className="w-40 h-56 md:w-56 md:h-72 rounded-2xl border-4 flex items-center justify-center"
              style={{
                borderColor: activePartIndex >= 0 ? `hsl(${parts[activePartIndex].colorHsl})` : "hsl(230 25% 25%)",
                background: activePartIndex >= 0
                  ? `linear-gradient(180deg, hsl(${parts[activePartIndex].colorHsl} / 0.1), hsl(${parts[activePartIndex].colorHsl} / 0.03))`
                  : "hsl(230 25% 8%)",
                boxShadow: activePartIndex >= 0
                  ? `0 0 40px hsl(${parts[activePartIndex].colorHsl} / 0.2), 0 0 80px hsl(${parts[activePartIndex].colorHsl} / 0.1)`
                  : "none",
                transition: "all 0.3s ease-out",
              }}
            >
              {activePartIndex >= 0 && (
                <div className="text-center">
                  <div
                    className="text-5xl md:text-7xl font-black"
                    style={{ color: `hsl(${parts[activePartIndex].colorHsl})` }}
                  >
                    ⚡
                  </div>
                  <p
                    className="mt-2 text-lg md:text-xl font-bold tracking-wider"
                    style={{ color: `hsl(${parts[activePartIndex].colorHsl})` }}
                  >
                    {parts[activePartIndex].name}
                  </p>
                </div>
              )}
            </div>

            {/* Part indicators */}
            <div className="flex gap-3 mt-6">
              {parts.map((part, i) => (
                <div
                  key={part.name}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    background: i === activePartIndex ? `hsl(${part.colorHsl})` : "hsl(230 25% 25%)",
                    boxShadow: i === activePartIndex ? `0 0 12px hsl(${part.colorHsl} / 0.5)` : "none",
                    transform: i === activePartIndex ? "scale(1.4)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ PATENT CARDS ============ */}
      {patentEnterP > 0 && patentExitP < 1 && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 40,
            opacity: 1 - patentExitP,
          }}
        >
          {/* Room pushed left */}
          <div
            className="absolute top-1/2 -translate-y-1/2 flex items-end gap-6 opacity-10"
            style={{
              left: `${-patentEnterP * 30}%`,
              transition: "left 0.05s linear",
            }}
          >
            <div className="w-32 h-16 rounded-lg" style={{ background: "hsl(230 15% 35%)", clipPath: "polygon(10% 100%, 0% 60%, 15% 30%, 35% 10%, 65% 10%, 85% 30%, 100% 60%, 90% 100%)" }} />
            <div>
              <div className="w-12 h-12 rounded-full mx-auto" style={{ background: "hsl(230 15% 35%)" }} />
              <div className="w-16 h-28 rounded-t-lg mx-auto mt-1" style={{ background: "hsl(230 15% 35%)" }} />
            </div>
          </div>

          {/* Patent card sliding from right, centered */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translateX(${(1 - patentEnterP) * 100}%)`,
              transition: "transform 0.05s linear",
            }}
          >
            <div
              className="flex items-center gap-8 md:gap-14 rounded-2xl border-2 px-10 py-10 md:px-16 md:py-14"
              style={{
                borderColor: "hsl(45 50% 35%)",
                background: "linear-gradient(160deg, hsl(230 25% 10%), hsl(230 25% 7%))",
                boxShadow: "0 10px 40px hsl(0 0% 0% / 0.4), 0 0 20px hsl(45 50% 45% / 0.15)",
              }}
            >
              {/* Left, 40+ */}
              <div
                className="flex-shrink-0"
                style={{
                  opacity: patentEnterP,
                  transform: `scale(${0.5 + patentEnterP * 0.5})`,
                  transition: "all 0.3s ease-out",
                }}
              >
                <div
                  className="text-8xl md:text-[10rem] lg:text-[12rem] font-black leading-none"
                  style={{
                    color: "hsl(0 0% 95%)",
                    textShadow: "0 0 40px hsl(275 80% 60% / 0.3), 0 0 80px hsl(270 70% 50% / 0.15)",
                  }}
                >
                  40+
                </div>
              </div>

              {/* Right, description & certification */}
              <div className="flex flex-col gap-4 max-w-xs">
                <p
                  className="text-sm md:text-base leading-relaxed font-light"
                  style={{ color: "hsl(230 25% 70%)" }}
                >
                  Patent applications and extensive experience covering all these types of parts. This combined knowledge and experience has gone into building the Akio suite.
                </p>
                <div className="h-px w-full" style={{ background: "hsl(45 40% 25%)" }} />
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(45 50% 35%)" }}>
                    <span className="text-base font-bold" style={{ color: "hsl(45 50% 75%)" }}>✦</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: "hsl(45 40% 65%)" }}>Patent Certification</p>
                    <p className="text-xs" style={{ color: "hsl(45 30% 50%)" }}>Nemi Technologies Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AkioDesignSection;
