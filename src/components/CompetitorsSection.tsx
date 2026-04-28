import { useState } from "react";

interface CompetitorsSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const factoryImages: { src: string; title: string; description: string }[] = [
  {
    src: "/Images/Injection%20modling%20.webp",
    title: "Injection Molding",
    description: "Multi-cavity dies producing precision plastic parts at scale.",
  },
  {
    src: "/Images/Nemi%20battery%20manufacturing%2001.webp",
    title: "Battery Pack Assembly",
    description: "End-to-end Li-ion cell ageing and pack assembly in-house.",
  },
  {
    src: "/Images/Electronics%20production.webp",
    title: "Electronics Assembly",
    description: "ESD-controlled PCB assembly and inline functional testing.",
  },
  {
    src: "/Images/Nemi%20Testing%20components.webp",
    title: "Endurance Test Rigs",
    description: "Every component cycled through load and lifetime testing.",
  },
  {
    src: "/Images/Pipe%20bending.webp",
    title: "CNC Pipe Bending",
    description: "Programmable bends for chassis and structural tubing.",
  },
  {
    src: "/Images/Tooling%20and%20fixturing.webp",
    title: "Tooling & Die Build",
    description: "Production dies, jigs and fixtures designed and built in-house.",
  },
  {
    src: "/Images/Nemi%20stores.webp",
    title: "Parts Warehouse",
    description: "Kitted inventory delivered line-side, no stockouts.",
  },
  {
    src: "/Images/Nemi%20parking.webp",
    title: "NEMI Campus",
    description: "Engineering, tooling and assembly under one roof.",
  },
];

const stats = [
  { value: "300K", unit: "sq ft", label: "Facility" },
  { value: "AIS", unit: "9100D", label: "Certified" },
  { value: "40+", unit: "", label: "Patents" },
];

interface FactoryItem {
  src: string;
  title: string;
  description: string;
}

const FactoryFlipCard = ({
  item,
  style,
}: {
  item: FactoryItem;
  style?: React.CSSProperties;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="cursor-pointer w-full h-24 md:h-36 lg:h-40"
      style={{ perspective: "1000px", ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front: image */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderColor: "hsl(275 80% 60% / 0.15)",
          }}
        >
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Back: title + description */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border flex flex-col items-start justify-center p-3 md:p-4"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: "hsl(275 80% 60% / 0.4)",
            background:
              "linear-gradient(135deg, hsl(275 80% 30% / 0.35), hsl(230 25% 6% / 0.95))",
            boxShadow:
              "inset 0 0 30px hsl(275 80% 60% / 0.12), 0 0 20px hsl(275 80% 60% / 0.15)",
          }}
        >
          <h4
            className="text-[11px] md:text-sm font-semibold tracking-wide mb-1"
            style={{
              color: "hsl(275 80% 80%)",
              textShadow: "0 0 12px hsl(275 80% 60% / 0.5)",
            }}
          >
            {item.title}
          </h4>
          <p className="text-[9px] md:text-[11px] lg:text-xs text-foreground/90 leading-snug">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const CompetitorsSection = ({ scrollProgress }: CompetitorsSectionProps) => {
  const sectionVisible = scrollProgress > 0.61 && scrollProgress < 0.74;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.62, 0.66));
  const cardsP = rangeProgress(scrollProgress, 0.64, 0.70);
  const statsP = easeOut(rangeProgress(scrollProgress, 0.67, 0.70));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.71, 0.74));

  if (!sectionVisible) return null;

  const opacity = enterP * (1 - exitP);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 40, opacity, background: "hsl(230 25% 4%)" }}
    >
      <div className="max-w-6xl w-full mx-6 pointer-events-auto">
        {/* Heading */}
        <div
          className="text-center mb-10"
          style={{ opacity: enterP, transform: `translateY(${(1 - enterP) * 40}px)` }}
        >
          <h2
            className="text-sm md:text-base tracking-[0.4em] uppercase text-muted-foreground mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Execution
          </h2>
          <h3
            className="text-2xl md:text-4xl font-bold text-foreground tracking-wider"
            style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}
          >
            Competitors simulate. <span className="text-foreground">We execute.</span>
          </h3>
        </div>

        {/* Factory photo cards, 4x2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8">
        {factoryImages.map((item, i) => {
            const cardDelay = i * 0.08;
            const cardP = easeOut(Math.min(Math.max((cardsP - cardDelay) / 0.35, 0), 1));

            return (
              <FactoryFlipCard
                key={i}
                item={item}
                style={{
                  opacity: cardP,
                  transform: `translateY(${(1 - cardP) * 50}px) scale(${0.9 + cardP * 0.1})`,
                  boxShadow: `0 8px 40px hsl(275 80% 40% / ${cardP * 0.15})`,
                }}
              />
            );
          })}
        </div>

        {/* Stats bar */}
        <div
          className="flex items-center justify-center divide-x divide-purple-500/20 rounded-xl border border-purple-500/15 bg-purple-500/[0.03] backdrop-blur-sm px-1 md:px-2 py-2 md:py-2.5 mx-auto w-fit"
          style={{
            opacity: statsP,
            transform: `translateY(${(1 - statsP) * 25}px)`,
            boxShadow: "0 0 30px hsl(275 80% 40% / 0.1)",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4 md:px-6">
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="text-xl md:text-3xl font-bold leading-none"
                  style={{
                    color: "hsl(275 80% 65%)",
                    textShadow:
                      "0 0 18px hsl(275 80% 60% / 0.5), 0 0 36px hsl(275 80% 60% / 0.18)",
                  }}
                >
                  {stat.value}
                </span>
                {stat.unit && (
                  <span
                    className="text-xs md:text-sm font-semibold leading-none"
                    style={{
                      color: "hsl(275 60% 80%)",
                      textShadow: "0 0 12px hsl(275 80% 60% / 0.3)",
                    }}
                  >
                    {stat.unit}
                  </span>
                )}
              </div>
              <span className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1.5 block font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitorsSection;
