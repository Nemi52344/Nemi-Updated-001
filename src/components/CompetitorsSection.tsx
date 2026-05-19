import { useState } from "react";
import toolingImg from "@/assets/tooling-fixture.webp";
import injectionMoldingImg from "@/assets/injection-molding.webp";

interface CompetitorsSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const factoryImages: { src: string; title: string; description: string }[] = [
  {
    src: injectionMoldingImg,
    title: "Press and Molds",
    description: "Injection moulding, compression moulding and high-tonnage press operations across plastics and metals.",
  },
  {
    src: "/Images/Pipe%20bending.webp",
    title: "Fabrication",
    description: "Cutting, bending, forming, welding, machining, casting and forging of sheet metal and structural components.",
  },
  {
    src: "/Images/Nemi%20battery%20manufacturing%2001.webp",
    title: "Battery Manufacturing",
    description: "End-to-end Li-ion cell ageing and pack assembly, from portable chargers to EVs and industrial energy storage.",
  },
  {
    src: toolingImg,
    title: "Tools, Dies, and Fixtures",
    description: "Injection moulding tools, die-casting tools, press tools, welding fixtures and assembly jigs designed and built in-house.",
  },
  {
    src: "/Images/Electronics%20production.webp",
    title: "Electronic Manufacturing",
    description: "PCB assemblies, box builds, system integration and end-of-line functional testing.",
  },
  {
    src: "/Images/Nemi%20stores.webp",
    title: "Inventory and Warehouse",
    description: "On-site stores, kitting and line-side replenishment with connected inventory management for every program.",
  },
  {
    src: "/Images/Nemi%20Testing%20components.webp",
    title: "Testing and Validation",
    description: "Component, sub-system and full-system testing across mechanical, electrical and environmental regimes.",
  },
  {
    src: "/Images/Nemi%20parking.webp",
    title: "NEMI Facilities",
    description: "300,000+ sq ft of owned manufacturing footprint across India, engineering, tooling and assembly under one roof.",
  },
];

interface StatTile {
  label: string;
  value?: string;
  unit?: string;
  image?: string; // when present, render the cert badge image instead of text
  imageAlt?: string;
  imageHeight?: number; // override rendered height for visual balance
  imageScale?: number;  // CSS scale transform to zoom into logo content when image has padding
}

interface StyledStat extends StatTile {
  accent: string; // hsl values
  variant: "value" | "logo";
}

const stats: StyledStat[] = [
  { value: "300K", unit: "sq ft", label: "Facility",  accent: "275 80% 65%", variant: "value" },
  { image: "/Images/certifications/as9100-certification.png", imageAlt: "AS9100 Certified",      label: "Aerospace", imageHeight: 70, accent: "210 85% 65%", variant: "logo" },
  { image: "/Images/certifications/iso-9001.png",             imageAlt: "ISO 9001:2015 Certified", label: "Quality",  imageHeight: 44, accent: "200 90% 70%", variant: "logo" },
  { value: "40+", unit: "", label: "Patents", accent: "275 80% 65%", variant: "value" },
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
      className="cursor-pointer w-full h-[72px] sm:h-24 md:h-36 lg:h-40"
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
  // Why Us - placed between Dual Revenue and Why Now
  const sectionVisible = scrollProgress > 0.860 && scrollProgress < 0.910;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.866, 0.880));
  const cardsP = rangeProgress(scrollProgress, 0.872, 0.895);
  const statsP = easeOut(rangeProgress(scrollProgress, 0.882, 0.898));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.900, 0.910));

  if (!sectionVisible) return null;

  const opacity = enterP * (1 - exitP);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-y-auto pt-16 pb-4 sm:py-6 competitors-inner"
      style={{ zIndex: 40, opacity, background: "hsl(230 25% 4%)" }}
    >
      <div className="max-w-6xl w-full mx-3 sm:mx-6 pointer-events-auto">
        <div className="text-center mb-3 sm:mb-6" style={{ opacity: enterP }}>
          <p
            className="text-[0.55rem] sm:text-[0.6rem] md:text-xs tracking-[0.35em] sm:tracking-[0.4em] uppercase font-medium mb-1.5 sm:mb-2"
            style={{ color: "hsl(275 60% 65%)" }}
          >
            Fortress Factories
          </p>
          <h2
            className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight"
            style={{
              letterSpacing: "-0.02em",
              color: "hsl(275 80% 80%)",
              textShadow: "0 0 24px hsl(275 80% 60% / 0.4)",
            }}
          >
            Multi-capability factories deploying LMM
          </h2>
        </div>
        {/* Factory photo cards, 4x2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-4 mb-3 sm:mb-8">
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

        {/* Stats - individually styled cards */}
        <div
          className="grid grid-cols-4 sm:flex sm:flex-wrap items-stretch justify-center gap-1.5 sm:gap-3 md:gap-4 mx-auto sm:w-fit"
          style={{
            opacity: statsP,
            transform: `translateY(${(1 - statsP) * 25}px)`,
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative rounded-lg sm:rounded-2xl px-2 sm:px-5 md:px-6 py-2 sm:py-3 flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-0.5 min-h-[78px] sm:min-h-[110px] sm:min-w-[140px]"
              style={{
                border: `1px solid hsl(${stat.accent} / 0.28)`,
                background: `linear-gradient(135deg, hsl(${stat.accent} / 0.10), hsl(220 25% 6% / 0.7))`,
                boxShadow: `0 0 24px hsl(${stat.accent} / 0.12), inset 0 0 20px hsl(${stat.accent} / 0.04)`,
                backdropFilter: "blur(6px)",
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-px"
                style={{
                  width: "60%",
                  background: `linear-gradient(to right, transparent, hsl(${stat.accent} / 0.7), transparent)`,
                }}
              />

              {stat.variant === "logo" ? (
                <div className="flex items-center justify-center h-9 sm:h-[60px]">
                  <img
                    src={stat.image}
                    alt={stat.imageAlt || stat.label}
                    style={{
                      height: `${stat.imageHeight ?? 44}px`,
                      maxHeight: "100%",
                      width: "auto",
                      display: "block",
                      filter: `drop-shadow(0 0 16px hsl(${stat.accent} / 0.55))`,
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="flex items-baseline justify-center gap-0.5 sm:gap-1 h-9 sm:h-[60px]">
                  <span
                    className="text-lg sm:text-3xl md:text-4xl font-bold leading-none self-center"
                    style={{
                      color: `hsl(${stat.accent})`,
                      textShadow: `0 0 18px hsl(${stat.accent} / 0.55), 0 0 36px hsl(${stat.accent} / 0.20)`,
                    }}
                  >
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span
                      className="text-[9px] sm:text-xs md:text-sm font-semibold leading-none self-center"
                      style={{
                        color: `hsl(${stat.accent} / 0.85)`,
                        textShadow: `0 0 12px hsl(${stat.accent} / 0.35)`,
                      }}
                    >
                      {stat.unit}
                    </span>
                  )}
                </div>
              )}

              <span
                className="text-[7.5px] sm:text-[10px] md:text-[11px] tracking-[0.15em] sm:tracking-[0.25em] uppercase mt-1 sm:mt-2 block font-semibold text-center leading-tight"
                style={{ color: `hsl(${stat.accent} / 0.85)` }}
              >
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
