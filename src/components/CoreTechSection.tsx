import { useState } from "react";
import akioImg from "@/assets/akio.webp";
import henryImg from "@/assets/henry.webp";
import samImg from "@/assets/sam.webp";

interface CoreTechSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface TechLeader {
  name: string;
  role: string;
  color: string;
  colorHsl: string;
  bio: string;
  initials: string;
  photo?: string;
}

const techLeaders: TechLeader[] = [
  {
    name: "Akio",
    role: "Design",
    color: "from-red-500/20 to-red-900/10",
    colorHsl: "0 85% 55%",
    bio: "One of the greatest inventors of the 20th century, Akio pioneered the intersection of human-centered design and industrial precision, transforming how we imagine and shape the physical world.",
    initials: "A",
    photo: akioImg,
  },
  {
    name: "Henry",
    role: "Develop",
    color: "from-blue-500/20 to-blue-900/10",
    colorHsl: "220 85% 55%",
    bio: "A visionary engineer who revolutionized mass production and democratized manufacturing, proving that scalable systems could deliver quality to the world at unprecedented speed.",
    initials: "H",
    photo: henryImg,
  },
  {
    name: "Sam",
    role: "Distribute",
    color: "from-green-500/20 to-green-900/10",
    colorHsl: "145 75% 45%",
    bio: "A master of global logistics and distribution networks, Sam redefined how products reach every corner of the earth, building the arteries of modern commerce.",
    initials: "S",
    photo: samImg,
  },
];

const FlipCard = ({ leader, compact }: { leader: TechLeader; compact?: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full h-full cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front: photo + name + role */}
        <div
          className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden border flex flex-col items-center justify-center p-2 md:p-6 lg:p-8 transition-shadow duration-500"
          style={{
            backfaceVisibility: "hidden",
            borderColor: `hsl(${leader.colorHsl} / 0.3)`,
            boxShadow: `0 0 20px hsl(${leader.colorHsl} / 0.1), 0 4px 20px hsl(230 25% 4% / 0.4)`,
            background: `linear-gradient(135deg, hsl(${leader.colorHsl} / 0.08), hsl(var(--card) / 0.7))`,
          }}
        >
          {leader.photo && (
            <>
              {/* Outer glow ring */}
              <div
                className="rounded-full mb-2 md:mb-4 relative z-10 flex items-center justify-center"
                style={{
                  width: "8rem",
                  height: "8rem",
                  background: `radial-gradient(circle, hsl(${leader.colorHsl} / 0.2) 50%, hsl(${leader.colorHsl} / 0.05) 65%, transparent 72%)`,
                }}
              >
                <div
                  className="rounded-full overflow-hidden"
                  style={{
                    width: "6.5rem",
                    height: "6.5rem",
                    border: `1.5px solid hsl(${leader.colorHsl} / 0.45)`,
                    boxShadow: `0 0 10px hsl(${leader.colorHsl} / 0.2), inset 0 0 8px hsl(${leader.colorHsl} / 0.08)`,
                  }}
                >
                  <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" decoding="async" />
                </div>
              </div>
              <div
                className="absolute w-20 h-20 md:w-44 md:h-44 rounded-full blur-2xl opacity-20"
                style={{
                  background: `radial-gradient(circle, hsl(${leader.colorHsl} / 0.4), transparent)`,
                  top: "10%",
                }}
              />
            </>
          )}
          <h3
            className={`${compact ? 'text-[10px]' : 'text-xs'} md:text-xl font-semibold text-foreground tracking-wider mb-0 md:mb-1`}
            style={{ textShadow: `0 0 12px hsl(${leader.colorHsl} / 0.4)` }}
          >
            {leader.name}
          </h3>
          <p
            className={`${compact ? 'text-[8px]' : 'text-[10px]'} md:text-sm tracking-[0.15em] md:tracking-[0.3em] uppercase font-medium`}
            style={{ color: `hsl(${leader.colorHsl})` }}
          >
            {leader.role}
          </p>
        </div>

        {/* Back: bio text */}
        <div
          className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden border flex flex-col items-center justify-center p-2 md:p-6 lg:p-8 transition-shadow duration-500"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `hsl(${leader.colorHsl} / 0.3)`,
            boxShadow: `0 0 20px hsl(${leader.colorHsl} / 0.1), 0 4px 20px hsl(230 25% 4% / 0.4)`,
            background: `linear-gradient(135deg, hsl(${leader.colorHsl} / 0.1), hsl(var(--card) / 0.85))`,
          }}
        >
          <p
            className={`${compact ? 'text-[8px] mb-1' : 'text-[10px] mb-2'} md:text-sm md:mb-4 tracking-[0.2em] md:tracking-[0.3em] uppercase font-medium`}
            style={{ color: `hsl(${leader.colorHsl})` }}
          >
            {leader.role}
          </p>
          <p className={`${compact ? 'hidden' : 'text-[10px] leading-relaxed'} md:block md:text-sm text-muted-foreground text-center`}>
            {leader.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

const CoreTechSection = ({ scrollProgress }: CoreTechSectionProps) => {
  // Section: 0.20–0.44
  const sectionVisible = scrollProgress > 0.19 && scrollProgress < 0.45;
  const crossfadeP = rangeProgress(scrollProgress, 0.41, 0.44);

  const titleEnterP = easeOut(rangeProgress(scrollProgress, 0.21, 0.25));
  const titleExitP = easeOut(rangeProgress(scrollProgress, 0.38, 0.41));
  const titleOpacity = titleEnterP * (1 - titleExitP);

  const subtitleP = easeOut(rangeProgress(scrollProgress, 0.25, 0.29));
  const subtitleExitP = easeOut(rangeProgress(scrollProgress, 0.38, 0.41));
  const subtitleOpacity = subtitleP * (1 - subtitleExitP);

  const panel0P = easeOut(rangeProgress(scrollProgress, 0.27, 0.31));
  const panel1P = easeOut(rangeProgress(scrollProgress, 0.29, 0.33));
  const panel2P = easeOut(rangeProgress(scrollProgress, 0.31, 0.35));
  const panelExitP = easeOut(rangeProgress(scrollProgress, 0.39, 0.43));

  const bottomP = easeOut(rangeProgress(scrollProgress, 0.27, 0.31));
  const bottomExitP = easeOut(rangeProgress(scrollProgress, 0.39, 0.43));
  const bottomOpacity = bottomP * (1 - bottomExitP);

  if (!sectionVisible) return null;

  const panelProgresses = [panel0P, panel1P, panel2P];

  return (
    <>
      {/* Grouped centered content */}
      <div
        className="fixed inset-0 pointer-events-none flex items-center justify-center"
        style={{ zIndex: 25 }}
      >
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4">
          {/* Heading: Introducing */}
          <div
            style={{
              opacity: titleOpacity,
              transform: `translateY(${(1 - titleEnterP) * 20}px)`,
            }}
          >
            <h2
              className="text-xs md:text-base tracking-[0.3em] md:tracking-[0.4em] uppercase text-muted-foreground text-center"
              style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
            >
              Introducing
            </h2>
          </div>

          {/* Title: LMM */}
          <div
            className="flex flex-col items-center mt-1 md:mt-4"
            style={{
              opacity: subtitleOpacity,
              transform: `translateY(${(1 - subtitleP) * 20}px)`,
            }}
          >
            <h3
              className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-wider"
              style={{
                textShadow:
                  "0 0 30px hsl(275 80% 60% / 0.5), 0 0 60px hsl(270 70% 50% / 0.2)",
              }}
            >
              LMM
            </h3>
            <p className="mt-1 md:mt-2 text-sm md:text-xl text-muted-foreground tracking-widest">
              Large Manufacturing Model
            </p>
          </div>

          {/* Tagline */}
          <div
            className="mt-1 md:mt-5"
            style={{
              opacity: bottomOpacity,
              transform: `translateY(${(1 - bottomP) * 15}px)`,
            }}
          >
            <p
              className="text-sm md:text-xl lg:text-2xl font-light text-foreground tracking-wide md:tracking-widest text-center max-w-2xl mx-auto leading-snug"
              style={{
                textShadow:
                  "0 0 20px hsl(275 80% 60% / 0.5), 0 0 40px hsl(270 70% 50% / 0.25)",
                animation: bottomP >= 1 ? "text-glow-pulse 3s ease-in-out infinite" : "none",
              }}
            >
              The most powerful foundation for Physical AI
            </p>
          </div>

          {/* Cards */}
          <div className="mt-6 md:mt-6 lg:mt-8 w-full pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 w-full px-6 md:px-4 lg:px-0 max-w-sm md:max-w-5xl mx-auto">
              {techLeaders.map((leader, i) => {
                const p = panelProgresses[i];
                const opacity = p * (1 - panelExitP);
                const translateY = (1 - p) * 60;

                return (
                  <div
                    key={leader.name}
                    className="w-full"
                    style={{
                      opacity,
                      transform: `translateY(${translateY}px)`,
                      height: "clamp(180px, 22vh, 380px)",
                    }}
                  >
                    <FlipCard leader={leader} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Crossfade overlay */}
      {crossfadeP > 0 && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 25,
            background: `hsl(230 25% 4%)`,
            opacity: crossfadeP * 0.85,
            transition: "opacity 0.05s linear",
          }}
        />
      )}
    </>
  );
};

export default CoreTechSection;
