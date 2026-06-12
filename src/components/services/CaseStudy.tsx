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
  <div className="case-metric-row">
    {/* Metric label */}
    <p className="case-metric-label text-foreground">{label}</p>

    {/* BEFORE row — neutral baseline bar */}
    <div className="case-metric-bar-row">
      <span className="case-metric-side-label" style={{ color: "rgba(244,242,237,0.45)" }}>
        Benchmark
      </span>
      <div className="case-metric-track">
        <div
          className="case-metric-fill"
          style={{ width: "100%", background: "rgba(244,242,237,0.25)" }}
        />
      </div>
      <span className="case-metric-value" style={{ color: "rgba(244,242,237,0.7)" }}>
        {before}
      </span>
    </div>

    {/* AFTER row — accent-colored progress bar */}
    <div className="case-metric-bar-row case-metric-bar-row-last">
      <span className="case-metric-side-label" style={{ color }}>
        Nemi
      </span>
      <div className="case-metric-track">
        <div
          className="case-metric-fill"
          style={{
            width: `${barPercent}%`,
            background: color,
            boxShadow: `0 0 10px ${color}66`,
          }}
        />
      </div>
      <span className="case-metric-value-after" style={{ color }}>
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
    <div className="services-case-content case-content-cell">
      <h3
        className="case-title"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {/* Context */}
      <div className="case-section">
        <p className="case-section-tag" style={{ color }}>Context</p>
        <p className="case-section-text text-muted-foreground">{context}</p>
      </div>

      {/* Outcome */}
      <div className="case-section">
        <p className="case-section-tag" style={{ color }}>Outcome</p>
        <p className="case-section-text text-muted-foreground">{outcome}</p>
      </div>

      {/* Key Metrics */}
      <div>
        <p className="case-section-tag" style={{ color, marginBottom: "0.4rem" }}>Key Metrics</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {metrics.map((m) => (
            <MetricRow key={m.label} {...m} />
          ))}
        </div>
        <p className="case-disclaimer text-muted-foreground/45">
          Customer name withheld under NDA. Reference available on request during investor diligence.
        </p>
      </div>
    </div>
  );

  const imageBlock = (
    <ScrollReveal variant="zoom" repeat style={{ height: "100%" }} className="case-image-cell">
      <div className="services-case-image-wrap" style={{ position: "relative" }}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="services-case-image hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {/* Gradient label at bottom of image */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "60px 18px 28px",
          background: "linear-gradient(to top, rgba(6,4,16,0.92) 0%, rgba(6,4,16,0.5) 60%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}>
          <p style={{
            color,
            fontSize: "8px",
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginBottom: "3px",
            lineHeight: 1,
          }}>NEMI&rsquo;s LMM in Real World Application</p>
          <p style={{
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: 800,
            letterSpacing: "0.01em",
            lineHeight: 1.2,
          }}>NEMI AI Case Studies</p>
        </div>
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
      <style>{`
        .services-case-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0.75rem 0.875rem;
        }
        .services-case-image-wrap {
          height: 100%;
          overflow: hidden;
          position: relative;
          background: transparent;
          min-height: 110px;
        }
        .services-case-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .case-title {
          font-weight: 700;
          font-size: 0.95rem;
          line-height: 1.15;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }
        .case-section { margin-bottom: 0.45rem; }
        .case-section-tag {
          font-weight: 700;
          font-size: 8.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 0.15rem;
        }
        .case-section-text {
          font-size: 10.5px;
          line-height: 1.4;
          letter-spacing: 0.01em;
        }
        .case-metric-row {
          padding: 0.35rem 0;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .case-metric-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .case-metric-bar-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.2rem;
        }
        .case-metric-bar-row-last { margin-bottom: 0; }
        .case-metric-side-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 7.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          width: 3.5rem;
          flex-shrink: 0;
        }
        .case-metric-track {
          flex: 1;
          position: relative;
          height: 2px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
        }
        .case-metric-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          border-radius: 2px;
        }
        .case-metric-value {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          width: 4rem;
          text-align: right;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .case-metric-value-after {
          font-family: 'Montserrat', sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          width: 4rem;
          text-align: right;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .case-disclaimer {
          font-size: 8px;
          font-style: italic;
          margin-top: 0.35rem;
          line-height: 1.3;
        }
        @media (min-width: 768px) {
          .services-case-content { padding: 1.75rem 2.25rem; }
          .services-case-image-wrap { min-height: 290px; }
          .case-title { font-size: 1.5rem; line-height: 1.1; margin-bottom: 1rem; letter-spacing: 0.05em; }
          .case-section { margin-bottom: 0.9rem; }
          .case-section-tag { font-size: 10px; margin-bottom: 0.25rem; }
          .case-section-text { font-size: 0.8rem; line-height: 1.55; }
          .case-metric-row { padding: 0.85rem 0; }
          .case-metric-label { font-size: 0.88rem; margin-bottom: 0.6rem; }
          .case-metric-bar-row { gap: 0.7rem; margin-bottom: 0.5rem; }
          .case-metric-side-label { font-size: 0.6rem; letter-spacing: 0.2em; width: 5rem; }
          .case-metric-track { height: 3px; }
          .case-metric-value { font-size: 0.82rem; width: 5.5rem; }
          .case-metric-value-after { font-size: 0.95rem; width: 5.5rem; }
          .case-disclaimer { font-size: 0.65rem; margin-top: 1rem; line-height: 1.5; }
        }
        @media (max-width: 900px) {
          .services-case-grid {
            grid-template-columns: 1fr !important;
          }
          .case-image-cell { order: 0 !important; }
          .case-content-cell { order: 1 !important; }
        }
        /* Landscape phone — keep side-by-side image | content so the case study fits one viewport */
        @media (max-width: 900px) and (orientation: landscape), (max-height: 700px) and (orientation: landscape) {
          .services-case-grid { grid-template-columns: 1.1fr 1fr !important; }
          .services-case-content { padding: 4px 8px !important; }
          .services-case-image-wrap { min-height: 0 !important; height: 100% !important; max-height: 240px !important; }
          .services-case-image { object-fit: contain !important; height: 100% !important; }
          .case-title { font-size: 12px !important; margin-bottom: 4px !important; letter-spacing: 0.03em !important; }
          .case-section { margin-bottom: 3px !important; }
          .case-section-tag { font-size: 7.5px !important; margin-bottom: 0 !important; letter-spacing: 0.18em !important; }
          .case-section-text { font-size: 9px !important; line-height: 1.25 !important; }
          .case-metric-row { padding: 2px 0 !important; }
          .case-metric-label { font-size: 9px !important; margin-bottom: 2px !important; }
          .case-metric-bar-row { gap: 4px !important; margin-bottom: 1px !important; }
          .case-metric-side-label { font-size: 6.5px !important; width: 2.4rem !important; letter-spacing: 0.14em !important; }
          .case-metric-track { height: 2px !important; }
          .case-metric-value { font-size: 8.5px !important; width: 2.8rem !important; }
          .case-metric-value-after { font-size: 9.5px !important; width: 2.8rem !important; }
          .case-disclaimer { font-size: 7px !important; margin-top: 2px !important; line-height: 1.2 !important; }
        }
      `}</style>
    </div>
  );
};

export { CaseStudy, MetricRow as MetricBar };
export type { CaseStudyProps, MetricBarProps };
