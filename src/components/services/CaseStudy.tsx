import { ScrollReveal } from "@/hooks/ScrollReveal";

interface MetricBarProps {
  label: string;
  before: string;
  after: string;
  beforeDetail?: string;
  afterDetail?: string;
  barPercent: number;
  color: string;
}

const MetricRow = ({ label, before, after, barPercent, color }: MetricBarProps) => (
  <div
    style={{
      paddingTop: "0.85rem",
      paddingBottom: "0.85rem",
      borderTop: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    {/* Metric label */}
    <p
      className="text-foreground"
      style={{
        fontFamily: "'Montserrat',sans-serif",
        fontSize: "0.88rem",
        fontWeight: 700,
        letterSpacing: "0.01em",
        marginBottom: "0.6rem",
      }}
    >
      {label}
    </p>

    {/* BEFORE row — neutral baseline bar */}
    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
      <span
        style={{
          fontFamily: "'Montserrat',sans-serif",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(244,242,237,0.45)",
          width: "5rem",
          flexShrink: 0,
        }}
      >
        Benchmark
      </span>
      <div style={{ flex: 1, position: "relative", height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            background: "rgba(244,242,237,0.25)",
            borderRadius: 2,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "'Montserrat',sans-serif",
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "rgba(244,242,237,0.7)",
          width: "5.5rem",
          textAlign: "right",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        {before}
      </span>
    </div>

    {/* AFTER row — accent-colored progress bar */}
    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
      <span
        style={{
          fontFamily: "'Montserrat',sans-serif",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color,
          width: "5rem",
          flexShrink: 0,
        }}
      >
        Nemi
      </span>
      <div style={{ flex: 1, position: "relative", height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${barPercent}%`,
            background: color,
            borderRadius: 2,
            boxShadow: `0 0 10px ${color}66`,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "'Montserrat',sans-serif",
          fontSize: "0.95rem",
          fontWeight: 700,
          color,
          width: "5.5rem",
          textAlign: "right",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        {after}
      </span>
    </div>
  </div>
);

interface CaseStudyProps {
  title: string;
  context: string;
  outcome: string;
  color: string;
  metrics: MetricBarProps[];
  imageSrc: string;
  imageAlt: string;
  imageFirst?: boolean;
}

const CaseStudy = ({ title, context, outcome, color, metrics, imageSrc, imageAlt, imageFirst = true }: CaseStudyProps) => {
  const contentBlock = (
    <div
      style={{
        padding: "1.75rem 2.25rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3
        className="font-bold text-lg md:text-xl lg:text-2xl uppercase tracking-wider mb-4 leading-tight"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {/* Context */}
      <div style={{ marginBottom: "0.9rem" }}>
        <p className="font-bold text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color }}>
          Context
        </p>
        <p className="text-[0.8rem] text-muted-foreground leading-[1.55] tracking-wide">
          {context}
        </p>
      </div>

      {/* Outcome */}
      <div style={{ marginBottom: "1.1rem" }}>
        <p className="font-bold text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color }}>
          Outcome
        </p>
        <p className="text-[0.8rem] text-muted-foreground leading-[1.55] tracking-wide">
          {outcome}
        </p>
      </div>

      {/* Key Metrics */}
      <div>
        <p className="font-bold text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color }}>
          Key Metrics
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {metrics.map((m) => (
            <MetricRow key={m.label} {...m} />
          ))}
        </div>

        <p className="text-[0.65rem] text-muted-foreground/45 italic mt-4 leading-relaxed">
          Customer name withheld under NDA. Reference available on request during investor diligence.
        </p>
      </div>
    </div>
  );

  const imageBlock = (
    <ScrollReveal variant="zoom" repeat style={{ height: "100%" }}>
      <div style={{ height: "100%", minHeight: 290, overflow: "hidden", position: "relative", background: "transparent" }}>
        <img
          src={imageSrc}
          alt={imageAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
          className="hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
    </ScrollReveal>
  );

  return (
    <div className="px-0">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: imageFirst ? "1.15fr 1fr" : "1fr 1.15fr",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        className="services-case-grid"
      >
        {imageFirst ? imageBlock : contentBlock}
        {imageFirst ? contentBlock : imageBlock}
      </div>
    </div>
  );
};

export { CaseStudy, MetricRow as MetricBar };
export type { CaseStudyProps, MetricBarProps };
