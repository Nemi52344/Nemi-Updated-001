import { useRef, useState } from "react";

interface AkioVideoSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const AkioVideoSection = ({ scrollProgress }: AkioVideoSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Section: 0.38–0.43
  const sectionVisible = scrollProgress > 0.375 && scrollProgress < 0.435;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.385, 0.40));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.42, 0.43));

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

  const opacity = enterP * (1 - exitP);
  const translateY = (1 - enterP) * 100;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{
        zIndex: 40,
        opacity,
        background: "hsl(230 25% 4%)",
      }}
    >
      <div
        className="w-full max-w-4xl mx-6 pointer-events-auto"
        style={{
          transform: `translateY(${translateY}px)`,
          transition: "transform 0.05s linear",
        }}
      >
        {/* Video card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "hsl(230 25% 12%)",
            boxShadow: "0 20px 60px hsl(0 0% 0% / 0.3), 0 0 30px hsl(275 80% 60% / 0.1)",
          }}
        >
          {/* Video area */}
          <div className="relative aspect-video bg-black flex items-center justify-center cursor-pointer" onClick={togglePlay}>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              onEnded={() => setIsPlaying(false)}
            >
              {/* Placeholder — swap source when video is ready */}
            </video>

            {/* Play/pause overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 flex items-center justify-center backdrop-blur-sm"
                  style={{
                    borderColor: "hsl(275 80% 60% / 0.6)",
                    background: "hsl(275 80% 60% / 0.15)",
                    boxShadow: "0 0 30px hsl(275 80% 60% / 0.3)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 md:w-10 md:h-10 ml-1">
                    <path d="M8 5.14v14l11-7-11-7z" fill="hsl(275, 80%, 70%)" />
                  </svg>
                </div>
              </div>
            )}

            {/* Pause icon when playing */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                <div
                  className="w-20 h-20 rounded-full border-2 flex items-center justify-center gap-2 backdrop-blur-sm"
                  style={{
                    borderColor: "hsl(275 80% 60% / 0.6)",
                    background: "hsl(275 80% 60% / 0.15)",
                  }}
                >
                  <div className="w-2 h-8 rounded" style={{ background: "hsl(275 80% 70%)" }} />
                  <div className="w-2 h-8 rounded" style={{ background: "hsl(275 80% 70%)" }} />
                </div>
              </div>
            )}
          </div>

          {/* Card label */}
          <div className="p-4 md:p-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground tracking-wider">
                AKIO Intelligence Suite
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Watch the full product demonstration
              </p>
            </div>
            <div
              className="text-xs tracking-[0.3em] uppercase font-medium px-3 py-1 rounded-full"
              style={{
                color: "hsl(275 80% 60%)",
                background: "hsl(275 80% 60% / 0.1)",
                border: "1px solid hsl(275 80% 60% / 0.2)",
              }}
            >
              Demo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AkioVideoSection;
