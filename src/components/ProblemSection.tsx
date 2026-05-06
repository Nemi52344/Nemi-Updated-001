interface ProblemSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Colors lifted from the source slide
const PURPLE_LABEL = "hsl(258, 100%, 75%)";   // #9B7FFF
const PURPLE_FILL  = "hsl(258, 47%, 43%)";    // #513A9F
const PURPLE_DEEP  = "hsl(252, 45%, 32%)";    // #3B2B73
const TEXT_LIGHT   = "hsl(240, 8%, 91%)";     // #E6E6E9
const PURPLE_TINT  = "hsl(258, 60%, 85%)";    // #CEC3EC

const IMG = {
  sketch:     "/Images/lmm-flow/01-sketch.png",
  render:     "/Images/lmm-flow/02-render.png",
  cad:        "/Images/lmm-flow/03-cad.png",
  simulation: "/Images/lmm-flow/04-simulation.png",
  bom:        "/Images/lmm-flow/05-bom.png",
  tooling:    "/Images/lmm-flow/06-tooling.png",
  production: "/Images/lmm-flow/07-production.png",
  dashboard:  "/Images/lmm-flow/08-dashboard.png",
};

// Image height in the snake-flow rows
const IMG_H = 130;
const ROW_GAP = 26;

const SlideImage = ({ src, alt }: { src: string; alt: string }) => (
  <div
    className="bg-white relative overflow-hidden rounded-sm w-full"
    style={{ height: `${IMG_H}px` }}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
    />
  </div>
);

const ArrowSvg = ({ direction }: { direction: "right" | "left" }) => (
  <svg
    width="60"
    height="12"
    viewBox="0 0 60 12"
    preserveAspectRatio="none"
    aria-hidden
    className="w-full max-w-[100px]"
  >
    {direction === "right" ? (
      <>
        <line x1="0" y1="6" x2="50" y2="6" stroke={PURPLE_FILL} strokeWidth="6" />
        <path d="M 46 0 L 60 6 L 46 12 Z" fill={PURPLE_FILL} />
      </>
    ) : (
      <>
        <line x1="60" y1="6" x2="10" y2="6" stroke={PURPLE_FILL} strokeWidth="6" />
        <path d="M 14 0 L 0 6 L 14 12 Z" fill={PURPLE_FILL} />
      </>
    )}
  </svg>
);

const StageColumn = ({
  label,
  typical,
  lmm,
  direction = "right",
}: {
  label: string;
  typical?: string;
  lmm?: string;
  direction?: "right" | "left";
}) => (
  <div className="flex flex-col justify-center items-center w-[100px] md:w-[130px] lg:w-[160px] shrink-0 px-1">
    <p
      className="text-[0.55rem] md:text-[0.7rem] lg:text-[0.8rem] font-bold text-center leading-[1.2] max-w-[160px] mb-2"
      style={{ color: PURPLE_LABEL }}
    >
      {label}
    </p>
    <ArrowSvg direction={direction} />
    {(typical || lmm) && (
      <div className="flex flex-col items-center gap-0 mt-2">
        {typical && (
          <p className="text-[0.55rem] md:text-[0.65rem] lg:text-[0.75rem]" style={{ color: TEXT_LIGHT }}>
            Typical*: <span className="font-semibold">{typical}</span>
          </p>
        )}
        {lmm && (
          <p className="text-[0.55rem] md:text-[0.65rem] lg:text-[0.75rem]" style={{ color: TEXT_LIGHT }}>
            LMM: <span className="font-semibold">{lmm}</span>
          </p>
        )}
      </div>
    )}
  </div>
);

const ComparisonPanel = ({
  heading,
  highlight,
  items,
}: {
  heading: string;
  highlight: boolean;
  items: { label: string; outcome: string }[];
}) => (
  <div
    className="rounded-md px-3 py-2 md:px-4 md:py-2.5"
    style={{
      background: highlight ? PURPLE_FILL : `${PURPLE_FILL}aa`,
      border: highlight ? `1.5px solid ${PURPLE_TINT}` : `1px solid ${PURPLE_DEEP}`,
      boxShadow: highlight ? "0 0 18px hsl(258 70% 50% / 0.3)" : "none",
    }}
  >
    <p
      className="font-bold text-[0.7rem] md:text-[0.8rem] mb-1"
      style={{ color: highlight ? PURPLE_TINT : "white" }}
    >
      {heading}
    </p>
    <ul className="flex flex-col gap-0.5 text-[0.65rem] md:text-[0.75rem] list-none p-0 m-0">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-1 leading-tight" style={{ color: "white" }}>
          <span>▪</span>
          <span>
            {item.label} <span style={{ color: PURPLE_TINT }}>&rarr;</span> {item.outcome}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const ProblemSection = ({ scrollProgress }: ProblemSectionProps) => {
  const enter = rangeProgress(scrollProgress, 0.45, 0.48);
  const exit = rangeProgress(scrollProgress, 0.57, 0.60);

  if (enter <= 0 && exit <= 0) return null;

  const opacity = Math.min(easeOut(enter), 1 - easeOut(exit));
  const translateY = (1 - easeOut(enter)) * 60;
  const cardsP = easeOut(rangeProgress(scrollProgress, 0.46, 0.51));

  // Outer connector dimensions match exactly to row geometry
  // Each connector spans ~ROW_GAP between rows + half image on each side
  const connectorH = IMG_H / 2 + ROW_GAP + IMG_H / 2; // arc spans middle of row N to middle of row N+1
  const arcRadius = 28;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none px-3 md:px-6 lg:px-10 overflow-y-auto"
      style={{
        zIndex: 15,
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "opacity 0.05s linear",
        background: "hsl(230 25% 4%)",
      }}
    >
      <div
        className="relative w-full max-w-[1280px] mx-auto pointer-events-auto py-4"
        style={{ opacity: cardsP, transform: `translateY(${(1 - cardsP) * 30}px)` }}
      >
        {/* TITLE BAR */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h2 className="text-base md:text-xl lg:text-[1.6rem] font-bold leading-tight" style={{ color: "white" }}>
              What does a product that moves through LMM look like?
            </h2>
            <p className="text-sm md:text-base lg:text-lg font-bold leading-tight mt-0.5" style={{ color: "white" }}>
              3x faster, 3x leaner, improves with every iteration
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0 mt-1">
            <span className="text-foreground font-bold tracking-[0.18em] text-sm">NEMI</span>
            <span className="flex items-center gap-1">
              <span className="block w-2 h-2 rounded-full" style={{ background: "hsl(0, 72%, 52%)" }} />
              <span className="block w-2 h-2 rounded-full" style={{ background: "hsl(217, 91%, 60%)" }} />
              <span className="block w-2 h-2 rounded-full" style={{ background: "hsl(142, 71%, 45%)" }} />
            </span>
          </div>
        </div>

        <div
          className="h-[2px] w-[40%] mb-4"
          style={{ background: `linear-gradient(90deg, ${PURPLE_FILL} 0%, ${PURPLE_DEEP} 100%)` }}
        />

        {/* SNAKE FLOW WRAPPER — relative for outer connector positioning.
            Side padding leaves room for the outer L-arrows. */}
        <div className="relative lg:px-10">
          {/* OUTER LEFT FEEDBACK LOOP — placed FIRST in DOM so it renders
              behind all rows. Body spans the entire LEFT side; horizontal arm
              at TOP ends in arrowhead pointing RIGHT into Sketch; horizontal
              arm at BOTTOM extends right under row 3 (matches slide Shape 18). */}
          {(() => {
            const totalH = IMG_H * 3 + ROW_GAP * 2;        // full snake-flow height
            const svgTop = IMG_H / 2 - 12;                  // align arrowhead tip with Sketch mid
            const svgHeight = totalH - svgTop + 14;         // extend past bottom of row 3 for bottom arm
            const bottomArmWidth = 580;                     // bottom arm extends right under row 3
            return (
              <svg
                aria-hidden
                className="hidden lg:block absolute"
                width={bottomArmWidth}
                height={svgHeight}
                viewBox={`0 0 ${bottomArmWidth} ${svgHeight}`}
                preserveAspectRatio="none"
                style={{
                  left: "-2px",
                  top: `${svgTop}px`,
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              >
                <path
                  d={`M 0 6
                      L 42 6
                      L 42 0
                      L 60 12
                      L 42 24
                      L 42 18
                      L 14 18
                      L 14 ${svgHeight - 14}
                      L ${bottomArmWidth} ${svgHeight - 14}
                      L ${bottomArmWidth} ${svgHeight}
                      L 0 ${svgHeight}
                      Z`}
                  fill={PURPLE_FILL}
                />
              </svg>
            );
          })()}

          {/* ROW 1 — Sketch → Render → CAD */}
          <div
            className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-center"
            style={{ marginBottom: `${ROW_GAP}px`, zIndex: 1 }}
          >
            <SlideImage src={IMG.sketch} alt="Sketch" />
            <StageColumn label="Sketch to Render" typical="2 mo" lmm="<1 week" direction="right" />
            <SlideImage src={IMG.render} alt="Render" />
            <StageColumn label="Render to CAD + Simulation" typical="6-12 mo" lmm="12 wks" direction="right" />
            <SlideImage src={IMG.cad} alt="CAD model" />
          </div>

          {/* OUTER RIGHT L-ARROW — exact path from slide Shape 28, scaled.
              Filled L-shape with arrowhead pointing LEFT into row 2's right edge.
              Path coord space: 60.84 wide × 253.87 tall (from PPT EMUs, /10000). */}
          <svg
            aria-hidden
            className="hidden lg:block absolute"
            width="42"
            height={connectorH}
            viewBox="0 0 60.84 253.87"
            preserveAspectRatio="none"
            style={{ right: "-4px", top: `${IMG_H / 2}px` }}
          >
            <path
              d="M 1.06 0
                 L 60.84 0
                 L 60.84 17.69
                 L 60.48 17.69
                 L 60.48 244.98
                 L 17.78 244.98
                 L 17.78 253.87
                 L 0 236.09
                 L 17.78 218.31
                 L 17.78 227.20
                 L 42.79 227.20
                 L 42.79 17.69
                 L 1.06 17.69
                 Z"
              fill={PURPLE_FILL}
            />
          </svg>

          {/* ROW 2 — Tooling | BOM | Simulation (flow ←) */}
          <div
            className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-center"
            style={{ marginBottom: `${ROW_GAP}px`, zIndex: 1 }}
          >
            <SlideImage src={IMG.tooling} alt="Tooling / mold" />
            <StageColumn label="BOM to Tooling + Production" typical="9-12 mo" lmm="12 wks" direction="left" />
            <SlideImage src={IMG.bom} alt="Bill of materials" />
            <StageColumn label="CAD to BOM release" typical="1 mo" lmm="<1 week" direction="left" />
            <SlideImage src={IMG.simulation} alt="CAD simulation / FEA" />
          </div>

          {/* ROW 3 — Production → Dashboard | Comparison panels.
              items-center keeps the row 3 images at their natural 130px height
              so the (taller) comparison panels don't stretch the rest of the row. */}
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_1.45fr] gap-2 items-center" style={{ zIndex: 1 }}>
            <SlideImage src={IMG.production} alt="Production line" />
            <StageColumn label="Production to post sales tracking" direction="right" />
            <SlideImage src={IMG.dashboard} alt="Post-sales tracking dashboard" />
            <div className="flex flex-col gap-1.5 lg:pl-3 self-center">
              <ComparisonPanel
                heading="What foundation models did:"
                highlight={false}
                items={[
                  { label: "Planning", outcome: "automated" },
                  { label: "Code", outcome: "generated" },
                  { label: "Iteration", outcome: "instant" },
                ]}
              />
              <ComparisonPanel
                heading="LMM does the same for manufacturing:"
                highlight={true}
                items={[
                  { label: "Design", outcome: "generated" },
                  { label: "Production", outcome: "automated" },
                  { label: "Iteration", outcome: "real-time" },
                ]}
              />
            </div>
          </div>
        </div>

        <p
          className="text-[0.55rem] md:text-[0.65rem] italic mt-3 leading-snug"
          style={{ color: "hsl(0 0% 70%)" }}
        >
          *Pre-LMM for test-bed EV business which was already ~30% faster than other benchmark peers
        </p>
      </div>
    </div>
  );
};

export default ProblemSection;
