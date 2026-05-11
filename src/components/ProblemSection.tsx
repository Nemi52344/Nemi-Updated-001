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
const IMG_H = 155;
const ROW_GAP = 14;

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

// Chunky block-style right/left arrow matching the PPT `rightArrow` primitive:
// rectangular body on one side, triangular head on the other.
const ArrowSvg = ({ direction }: { direction: "right" | "left" }) => (
  <svg
    width="64"
    height="22"
    viewBox="0 0 64 22"
    preserveAspectRatio="none"
    aria-hidden
    className="w-full max-w-[110px]"
  >
    {direction === "right" ? (
      <path
        d="M 0 6 L 44 6 L 44 0 L 64 11 L 44 22 L 44 16 L 0 16 Z"
        fill={PURPLE_FILL}
      />
    ) : (
      <path
        d="M 64 6 L 20 6 L 20 0 L 0 11 L 20 22 L 20 16 L 64 16 Z"
        fill={PURPLE_FILL}
      />
    )}
  </svg>
);

const DownArrowSvg = () => (
  <svg
    width="20"
    height="36"
    viewBox="0 0 20 36"
    preserveAspectRatio="none"
    aria-hidden
    style={{ display: "block", marginTop: "-18px" }}
  >
    <path
      d="M 6 0 L 14 0 L 14 26 L 20 26 L 10 36 L 0 26 L 6 26 Z"
      fill={PURPLE_FILL}
    />
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
  <div className="flex flex-col justify-center items-center w-[100px] md:w-[130px] lg:w-[160px] shrink-0 px-1" style={{ height: `${IMG_H}px` }}>
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
            Benchmark*: <span className="font-semibold">{typical}</span>
          </p>
        )}
        {lmm && (
          <p className="text-[0.55rem] md:text-[0.65rem] lg:text-[0.75rem]" style={{ color: TEXT_LIGHT }}>
            Improvement: <span className="font-semibold">{lmm}</span>
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
      className="fixed inset-0 flex items-center justify-center pointer-events-none px-3 md:px-6 lg:px-10 pt-[65px] overflow-y-auto"
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
            <h2 className="text-base md:text-xl lg:text-[1.6rem] font-bold leading-tight whitespace-nowrap" style={{ color: "white" }}>
              A product through LMM: 3x faster, 3x leaner, improving every iteration
            </h2>
          </div>
        </div>

        <div
          className="h-[2px] w-[40%] mb-4"
          style={{ background: `linear-gradient(90deg, ${PURPLE_FILL} 0%, ${PURPLE_DEEP} 100%)` }}
        />

        {/* SNAKE FLOW WRAPPER - relative for outer connector positioning.
            Side padding leaves room for the outer L-arrows. Bottom padding
            keeps the wrap-around bracket's bottom rail clear of the row 3
            summary panels. */}
        <div className="relative lg:px-10 lg:pb-6">
          {/* OUTER WRAP-AROUND BRACKET - 4 pieces forming a U-shape that wraps
              the entire snake-flow:
                1. Top-left arm SVG with arrowhead → INTO Sketch
                2. Left vertical bar (down)
                3. Bottom rail (right) under all rows
                4. Right vertical bar (up)
              All anchored to the snake-flow wrapper's padding box, so the
              shape resizes naturally with viewport width. */}
          {(() => {
            const svgTop = IMG_H / 2 - 12;                  // align arrowhead tip with Sketch mid
            const innerBarTop = svgTop + 6;                  // top edge of vertical bar interior
            const railThickness = 14;
            return (
              <>
                {/* Top-left arm with rightward arrowhead. SVG width matches the
                    distance from the bracket's left edge to Sketch's left edge
                    (snake-flow padding 40 + bracket left:-2 offset = 42px), so
                    the arrowhead tip lands exactly ON Sketch's left edge -
                    fully visible and touching the image. */}
                <svg
                  aria-hidden
                  className="hidden lg:block absolute"
                  width={42}
                  height={24}
                  viewBox="0 0 42 24"
                  preserveAspectRatio="none"
                  style={{
                    left: "-2px",
                    top: `${svgTop}px`,
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                >
                  <path d="M 0 6 L 24 6 L 24 0 L 42 12 L 24 24 L 24 18 L 0 18 Z" fill={PURPLE_FILL} />
                </svg>
                {/* Left vertical bar */}
                <div
                  aria-hidden
                  className="hidden lg:block absolute"
                  style={{
                    left: "-2px",
                    top: `${innerBarTop}px`,
                    bottom: `${railThickness + 18}px`,
                    width: "14px",
                    background: PURPLE_FILL,
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                />
                <div
                  aria-hidden
                  className="hidden lg:block absolute"
                  style={{
                    left: "-2px",
                    right: "calc(59.01% - 108px)",
                    bottom: "18px",
                    height: `${railThickness}px`,
                    background: PURPLE_FILL,
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                />
                {/* Drop connector - runs from dashboard bottom down to the bottom rail top.
                    top = row1 + gap + row2 + connector + IMG_H (dashboard bottom).
                    bottom matches rail exactly so it never overshoots. */}
                <div
                  aria-hidden
                  className="hidden lg:block absolute pointer-events-none"
                  style={{
                    left: "calc(40.99% + 94px)",
                    top: `${IMG_H * 3 + ROW_GAP * 2}px`,
                    bottom: `${railThickness + 18}px`,
                    width: "14px",
                    background: PURPLE_FILL,
                    zIndex: 0,
                  }}
                />
                {/* Right vertical bar - removed per design feedback */}
              </>
            );
          })()}

          {/* ROW 1 - Sketch → Render → CAD */}
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

          {/* OUTER RIGHT L-ARROW - exact path from slide Shape 28, scaled.
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

          {/* ROW 2 - Tooling | BOM | Simulation (flow ←) */}
          <div
            className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-center"
            style={{ marginBottom: 0, zIndex: 1 }}
          >
            <SlideImage src={IMG.tooling} alt="Tooling / mold" />
            <StageColumn label="BOM to Tooling + Production" typical="9-12 mo" lmm="12 wks" direction="left" />
            <SlideImage src={IMG.bom} alt="Bill of materials" />
            <StageColumn label="CAD to BOM release" typical="1 mo" lmm="<1 week" direction="left" />
            <SlideImage src={IMG.simulation} alt="CAD simulation / FEA" />
          </div>

          {/* ROW 2 → ROW 3 connector: down arrow in col 1, aligned to production image */}
          <div
            className="hidden lg:grid grid-cols-[1fr_auto_1.05fr_1.67fr] gap-2 items-center"
            style={{ height: `${ROW_GAP}px`, zIndex: 2, position: "relative", overflow: "visible" }}
          >
            <div className="flex flex-col items-center" style={{ position: "relative", height: 0 }}>
              <DownArrowSvg />
            </div>
            <div className="w-[100px] md:w-[130px] lg:w-[160px] shrink-0" />
            <div />
            <div />
          </div>

          {/* ROW 3 - Production → Dashboard | Comparison panels. items-center matches rows 1 & 2 */}
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1.05fr_1.67fr] gap-2 lg:items-start items-center" style={{ zIndex: 1 }}>
            {/* Constrain production image to the same width as col 1 in rows 1/2.
                Rows 1/2 grid: [1fr auto 1fr auto 1fr] with auto=160px, gap=8px.
                col1_w = (container_w − 2·160 − 4·8) / 3 = (container_w − 352) / 3
                container_w at lg = min(viewport, 1280) − 80 outer − 80 inner = min(vw,1280) − 160 */}
            <div style={{ maxWidth: "calc((min(100vw, 1280px) - 160px - 352px) / 3)" }}>
              <SlideImage src={IMG.production} alt="Production line" />
            </div>
            <StageColumn label="Production to post sales tracking" direction="right" />
            <div className="relative">
              <SlideImage src={IMG.dashboard} alt="Post-sales tracking dashboard" />
            </div>
            <div className="flex flex-col gap-1.5 lg:pl-3 self-start">
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
