import { ScrollReveal } from "@/hooks/ScrollReveal";

interface MetricBarProps {
  label: string;
  before: string;
  after: string;
  barPercent: number;
  color: string;
}

const MetricBar = ({ label, before, after, barPercent, color }: MetricBarProps) => (
  <div style={{ marginBottom: "0.1rem" }}>
    {/* Metric label */}
    <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "rgba(244,242,237,0.7)", marginBottom: "0.55rem", letterSpacing: "0.04em" }}>
      {label}
    </p>

    {/* Actual (before) row */}
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem" }}>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(244,242,237,0.3)", width: "3.2rem", flexShrink: 0 }}>
        Actual
      </span>
      <div style={{ flex: 1, position: "relative", height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "100%", background: "rgba(244,242,237,0.18)", borderRadius: 2 }} />
      </div>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", color: "rgba(244,242,237,0.38)", width: "5rem", textAlign: "right", flexShrink: 0 }}>
        {before}
      </span>
    </div>

    {/* AKIO (after) row */}
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, width: "3.2rem", flexShrink: 0 }}>
        AKIO
      </span>
      <div style={{ flex: 1, position: "relative", height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${barPercent}%`, background: color, borderRadius: 2, boxShadow: `0 0 8px ${color}80` }} />
      </div>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.68rem", fontWeight: 700, color, width: "5rem", textAlign: "right", flexShrink: 0 }}>
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
    <div style={{ padding: "3rem", borderLeft: imageFirst ? "1px solid rgba(255,255,255,0.06)" : undefined, borderRight: !imageFirst ? "1px solid rgba(255,255,255,0.06)" : undefined, display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
      <h3 className="font-bold text-xl md:text-2xl uppercase tracking-wider mb-8 leading-tight" dangerouslySetInnerHTML={{ __html: title }} />
      <div style={{ marginBottom: "1.2rem" }}>
        <p className="font-bold text-xs tracking-[0.2em] uppercase mb-1" style={{ color }}>Context</p>
        <p className="text-sm text-muted-foreground leading-[1.7] tracking-wide">{context}</p>
      </div>
      <div style={{ marginBottom: "1.2rem" }}>
        <p className="font-bold text-xs tracking-[0.2em] uppercase mb-1" style={{ color }}>Outcome</p>
        <p className="text-sm text-muted-foreground leading-[1.7] tracking-wide">{outcome}</p>
      </div>
      <div>
        <p className="font-bold text-xs tracking-[0.2em] uppercase mb-3" style={{ color }}>Key Metrics</p>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.1rem" }}>
          {metrics.map((m) => <MetricBar key={m.label} {...m} />)}
        </div>
        <p className="text-[0.65rem] text-muted-foreground/50 italic mt-5 leading-relaxed">
          Customer name withheld under NDA. Reference available on request during investor diligence.
        </p>
      </div>
    </div>
  );

  const imageBlock = (
    <ScrollReveal variant="zoom" repeat style={{ height: "100%" }}>
      <div style={{ height: "100%", minHeight: 380, overflow: "hidden" }}>
        <img src={imageSrc} alt={imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" as const, opacity: 0.65, transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} className="hover:scale-105" loading="lazy" decoding="async" />
      </div>
    </ScrollReveal>
  );

  return (
    <div className="px-6 md:px-12 lg:px-16">
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }} className="services-case-grid">
        {imageFirst ? imageBlock : contentBlock}
        {imageFirst ? contentBlock : imageBlock}
      </div>
    </div>
  );
};

export { CaseStudy, MetricBar };
export type { CaseStudyProps, MetricBarProps };
