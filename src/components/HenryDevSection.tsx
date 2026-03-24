import { useRef, useState } from "react";

interface HenryDevSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const HenryDevSection = ({ scrollProgress }: HenryDevSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Section: 0.51–0.59
  const sectionVisible = scrollProgress > 0.505 && scrollProgress < 0.595;

  // Sub-phases
  const cardEnterP = easeOut(rangeProgress(scrollProgress, 0.51, 0.53));
  const cardExitP = easeOut(rangeProgress(scrollProgress, 0.53, 0.55));

  const videoEnterP = easeOut(rangeProgress(scrollProgress, 0.55, 0.57));
  const videoExitP = easeOut(rangeProgress(scrollProgress, 0.57, 0.59));

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!sectionVisible) return null;

  return (
    <>
      {/* ============ BLUEPRINT CARD ============ */}
      {cardEnterP > 0 && cardExitP < 1 && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{
            zIndex: 40,
            opacity: cardEnterP * (1 - cardExitP),
            background: "hsl(230 25% 4%)",
          }}
        >
          <div
            className="max-w-3xl w-full mx-6 rounded-2xl border-2 overflow-hidden"
            style={{
              borderColor: "hsl(210 80% 45% / 0.4)",
              background: "linear-gradient(160deg, hsl(210 60% 12%), hsl(210 50% 8%))",
              boxShadow: "0 20px 60px hsl(0 0% 0% / 0.4), 0 0 40px hsl(210 80% 50% / 0.1)",
              transform: `translateY(${(1 - cardEnterP) * 60}px)`,
            }}
          >
            {/* Blueprint grid pattern */}
            <div
              className="relative p-8 md:p-12"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(210 80% 50% / 0.06) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(210 80% 50% / 0.06) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            >
              {/* Label */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "hsl(210 80% 55%)", boxShadow: "0 0 10px hsl(210 80% 55% / 0.5)" }}
                />
                <span
                  className="text-xs tracking-[0.4em] uppercase font-semibold"
                  style={{ color: "hsl(210 80% 65%)" }}
                >
                  Manufacturing Blueprint
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4"
                style={{ textShadow: "0 0 30px hsl(210 80% 55% / 0.3)" }}
              >
                Develop with Henry AI
              </h2>

              {/* Description */}
              <p
                className="text-base md:text-lg font-light leading-relaxed max-w-xl"
                style={{ color: "hsl(210 40% 75%)" }}
              >
                300k sqft of space, AIS9100D and ISO9001 certified. We can manufacture just about anything.
              </p>

              {/* Certification badges */}
              <div className="flex gap-4 mt-8">
                {["AIS9100D", "ISO9001"].map((cert) => (
                  <div
                    key={cert}
                    className="px-4 py-2 rounded-full text-xs tracking-[0.3em] uppercase font-semibold"
                    style={{
                      color: "hsl(45 60% 65%)",
                      background: "hsl(45 40% 20% / 0.3)",
                      border: "1px solid hsl(45 40% 35% / 0.4)",
                    }}
                  >
                    {cert}
                  </div>
                ))}
                <div
                  className="px-4 py-2 rounded-full text-xs tracking-[0.3em] uppercase font-semibold"
                  style={{
                    color: "hsl(210 70% 70%)",
                    background: "hsl(210 50% 20% / 0.3)",
                    border: "1px solid hsl(210 50% 35% / 0.4)",
                  }}
                >
                  300K SQFT
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ HENRY VIDEO CARD ============ */}
      {videoEnterP > 0 && videoExitP < 1 && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{
            zIndex: 40,
            opacity: videoEnterP * (1 - videoExitP),
            background: "hsl(230 25% 4%)",
          }}
        >
          <div
            className="w-full max-w-4xl mx-6 pointer-events-auto"
            style={{
              transform: `translateY(${(1 - videoEnterP) * 100}px)`,
              transition: "transform 0.05s linear",
            }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "hsl(230 25% 12%)",
                boxShadow: "0 20px 60px hsl(0 0% 0% / 0.3), 0 0 30px hsl(210 80% 55% / 0.1)",
              }}
            >
              {/* Video area */}
              <div
                className="relative aspect-video bg-black flex items-center justify-center cursor-pointer"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                >
                  {/* Swap source when Henry video is ready */}
                </video>

                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 flex items-center justify-center backdrop-blur-sm"
                      style={{
                        borderColor: "hsl(210 80% 55% / 0.6)",
                        background: "hsl(210 80% 55% / 0.15)",
                        boxShadow: "0 0 30px hsl(210 80% 55% / 0.3)",
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 md:w-10 md:h-10 ml-1">
                        <path d="M8 5.14v14l11-7-11-7z" fill="hsl(210, 80%, 70%)" />
                      </svg>
                    </div>
                  </div>
                )}

                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center gap-2 backdrop-blur-sm"
                      style={{
                        borderColor: "hsl(210 80% 55% / 0.6)",
                        background: "hsl(210 80% 55% / 0.15)",
                      }}
                    >
                      <div className="w-2 h-8 rounded" style={{ background: "hsl(210 80% 70%)" }} />
                      <div className="w-2 h-8 rounded" style={{ background: "hsl(210 80% 70%)" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Card label */}
              <div className="p-4 md:p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground tracking-wider">
                    HENRY Manufacturing AI
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Watch Henry in action
                  </p>
                </div>
                <div
                  className="text-xs tracking-[0.3em] uppercase font-medium px-3 py-1 rounded-full"
                  style={{
                    color: "hsl(210 80% 60%)",
                    background: "hsl(210 80% 60% / 0.1)",
                    border: "1px solid hsl(210 80% 60% / 0.2)",
                  }}
                >
                  Demo
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HenryDevSection;
