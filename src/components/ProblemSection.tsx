import { useState } from "react";
import developSupplyChain from "@/assets/develop-supply-chain.webp";
import developTooling from "@/assets/develop-tooling.webp";
import developParts from "@/assets/develop-parts.webp";
import developProduction from "@/assets/develop-production.webp";
import developTesting from "@/assets/develop-testing.webp";
import distributeSales from "@/assets/distribute-sales.webp";
import distributeShipment from "@/assets/distribute-shipment.webp";
import distributeWarehousing from "@/assets/distribute-warehousing.webp";
import distributeFinancing from "@/assets/distribute-financing.webp";
import distributeAftersales from "@/assets/distribute-aftersales.webp";
import designIdeation from "@/assets/design-ideation.webp";
import designRendering from "@/assets/design-rendering.webp";
import designEngineering from "@/assets/design-engineering.webp";
import designSimulation from "@/assets/design-simulation.webp";
import designRelease from "@/assets/design-release.webp";

interface ProblemSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface StepData {
  label: string;
  image: string;
}

interface RowData {
  category: string;
  colorHsl: string;
  glowHsl: string;
  steps: StepData[];
}

const rows: RowData[] = [
  {
    category: "DESIGN",
    colorHsl: "0 75% 50%",
    glowHsl: "0 80% 55%",
    steps: [
      { label: "Ideation", image: designIdeation },
      { label: "Rendering", image: designRendering },
      { label: "Engineering Design / Prototyping", image: designEngineering },
      { label: "Simulation / Validation", image: designSimulation },
      { label: "Release for Production", image: designRelease },
    ],
  },
  {
    category: "DEVELOP",
    colorHsl: "195 100% 45%",
    glowHsl: "195 100% 50%",
    steps: [
      { label: "Supply Chain Development", image: developSupplyChain },
      { label: "Tooling / Fixturing / Other Capex", image: developTooling },
      { label: "Part Ordering", image: developParts },
      { label: "Production", image: developProduction },
      { label: "Final Testing / Dispatch", image: developTesting },
    ],
  },
  {
    category: "DISTRIBUTE",
    colorHsl: "160 70% 45%",
    glowHsl: "160 75% 50%",
    steps: [
      { label: "Sales & Marketing", image: distributeSales },
      { label: "Shipment (First Mile, Last Mile)", image: distributeShipment },
      { label: "Warehousing", image: distributeWarehousing },
      { label: "Leasing / Financing", image: distributeFinancing },
      { label: "Aftersales / Service", image: distributeAftersales },
    ],
  },
];

const StepCard = ({
  step,
  image,
  colorHsl,
}: {
  step: string;
  image: string;
  colorHsl: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="cursor-pointer relative"
      style={{
        perspective: "800px",
        zIndex: hovered ? 50 : 1,
        filter: hovered ? `drop-shadow(0 0 6px hsl(${colorHsl} / 0.3))` : "none",
        transition: "filter 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full"
        style={{
          aspectRatio: "3/2",
          transformStyle: "preserve-3d",
          transform: hovered ? "rotateY(180deg) scale(1.08)" : "rotateY(0deg) scale(1)",
          transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-lg border flex items-center justify-center p-2"
          style={{
            backfaceVisibility: "hidden",
            borderColor: `hsl(${colorHsl} / 0.3)`,
            background: `linear-gradient(145deg, hsl(230 25% 8% / 0.95), hsl(${colorHsl} / 0.08))`,
            boxShadow: `inset 0 1px 0 hsl(${colorHsl} / 0.1)`,
          }}
        >
          <span className="text-[10px] md:text-xs font-medium text-foreground/85 text-center leading-tight">
            {step}
          </span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-lg border overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `hsl(${colorHsl} / 0.5)`,
            boxShadow: hovered
              ? `0 20px 60px hsl(230 25% 4% / 0.7), 0 0 40px hsl(${colorHsl} / 0.3)`
              : `0 0 20px hsl(${colorHsl} / 0.2)`,
          }}
        >
          <img src={image} alt={step} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div
            className="absolute inset-0 flex items-end p-2"
            style={{
              background: `linear-gradient(to top, hsl(230 25% 4% / 0.8) 0%, transparent 60%)`,
            }}
          >
            <span className="text-[10px] md:text-xs font-semibold text-foreground/90 leading-tight">
              {step}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProblemSection = ({ scrollProgress }: ProblemSectionProps) => {
  const enter = rangeProgress(scrollProgress, 0.05, 0.08);
  const exit = rangeProgress(scrollProgress, 0.17, 0.20);

  if (enter <= 0 && exit <= 0) return null;

  const opacity = Math.min(easeOut(enter), 1 - easeOut(exit));
  const translateY = (1 - easeOut(enter)) * 60;
  const cardsP = easeOut(rangeProgress(scrollProgress, 0.06, 0.11));

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none px-4 md:px-6"
      style={{
        zIndex: 15,
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "opacity 0.05s linear",
      }}
    >
      <div
        className="relative max-w-5xl w-full mx-auto pointer-events-auto"
        style={{ opacity: cardsP, transform: `translateY(${(1 - cardsP) * 50}px)` }}
      >
        {/* Heading: top-left, with a red downward arrow column-aligned to the inter-row arrows */}
        <h2
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground tracking-wide text-left leading-tight mb-2 md:mb-3"
          style={{
            textShadow: "0 0 40px hsl(var(--primary) / 0.25)",
          }}
        >
          Hardware is hard.
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-5 px-2 mb-2 md:mb-2.5">
          <div className="col-span-3 md:col-span-1 flex justify-center">
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              aria-hidden
              style={{
                color: "hsl(0 75% 55%)",
                filter:
                  "drop-shadow(0 0 6px hsl(0 80% 55% / 0.7)) drop-shadow(0 0 14px hsl(0 80% 55% / 0.35))",
              }}
            >
              <path d="M10 2 V15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path
                d="M3 12 L10 19 L17 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Three category rows with arrows sitting on the seam between boxes */}
        <div className="flex flex-col gap-2 md:gap-3">
          {rows.map((row, rowIdx) => (
            <div key={row.category} className="contents">
            <div
              className="rounded-xl border p-2"
              style={{
                borderColor: `hsl(${row.colorHsl} / 0.3)`,
                background: `linear-gradient(135deg, hsl(${row.colorHsl} / 0.04), hsl(${row.colorHsl} / 0.02))`,
                boxShadow: `0 0 20px hsl(${row.glowHsl} / 0.08), inset 0 1px 0 hsl(${row.colorHsl} / 0.1)`,
                opacity: Math.min(1, cardsP * 3 - rowIdx * 0.5),
                transform: `translateY(${Math.max(0, (1 - cardsP * 3 + rowIdx * 0.5)) * 20}px)`,
                transition: "transform 0.1s linear",
              }}
            >
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-5 items-center">
                {/* Category label */}
                <div className="flex items-center justify-center col-span-3 md:col-span-1">
                  <span
                    className="text-sm md:text-base lg:text-lg font-extrabold tracking-[0.18em] uppercase whitespace-nowrap"
                    style={{
                      color: `hsl(${row.colorHsl})`,
                      textShadow: `0 0 20px hsl(${row.glowHsl} / 0.5), 0 0 40px hsl(${row.glowHsl} / 0.2)`,
                    }}
                  >
                    {row.category}
                  </span>
                </div>

                {/* 5 step cards with chevrons between them */}
                {row.steps.map((s, sIdx) => (
                  <div key={s.label} className="relative">
                    <StepCard
                      step={s.label}
                      image={s.image}
                      colorHsl={row.colorHsl}
                    />
                    {sIdx < row.steps.length - 1 && (
                      <div
                        aria-hidden
                        className="hidden md:flex absolute top-1/2 -right-[calc(0.625rem+7px)] -translate-y-1/2 z-10 items-center justify-center pointer-events-none"
                        style={{
                          color: `hsl(${row.colorHsl})`,
                          filter: `drop-shadow(0 0 6px hsl(${row.glowHsl} / 0.6))`,
                        }}
                      >
                        <svg width="14" height="18" viewBox="0 0 14 18">
                          <path
                            d="M3 2 L11 9 L3 16"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {rowIdx < rows.length - 1 && (
              <div className="relative h-0 z-20 pointer-events-none">
                <div className="absolute left-0 right-0 top-0 -translate-y-1/2 grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-5 px-2">
                  <div className="col-span-3 md:col-span-1 flex justify-center">
                    <svg
                      width="22"
                      height="14"
                      viewBox="0 0 22 14"
                      aria-hidden
                      style={{
                        color: `hsl(${row.colorHsl})`,
                        filter: `drop-shadow(0 0 6px hsl(${row.glowHsl} / 0.7)) drop-shadow(0 0 14px hsl(${row.glowHsl} / 0.35))`,
                      }}
                    >
                      <path
                        d="M3 3 L11 11 L19 3"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            </div>
          ))}
        </div>

        {/* Footer: green arrow centered above the word "Nemi" */}
        <p
          className="text-xl md:text-2xl lg:text-3xl font-light text-foreground/85 tracking-wide text-right leading-tight mt-8 md:mt-10"
          style={{
            textShadow: "0 0 40px hsl(var(--primary) / 0.25)",
          }}
        >
          All three phases are integrated into one stack at{" "}
          <span className="relative inline-block">
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 -top-7 md:-top-8"
              style={{
                color: "hsl(160 70% 50%)",
                filter:
                  "drop-shadow(0 0 6px hsl(160 75% 50% / 0.7)) drop-shadow(0 0 14px hsl(160 75% 50% / 0.35))",
              }}
            >
              <path d="M10 2 V15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path
                d="M3 12 L10 19 L17 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span
              className="font-extrabold bg-clip-text text-transparent tracking-wider"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(275 90% 75%), hsl(275 80% 55%), hsl(285 90% 65%))",
                filter: "drop-shadow(0 0 18px hsl(275 80% 60% / 0.55))",
              }}
            >
              NEMI
            </span>
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default ProblemSection;
