import { ScrollReveal } from "@/hooks/ScrollReveal";

interface MetricBarProps {
  label: string;
  before: string;
  after: string;
  barPercent: number;
  color: string;
}

const MetricBar = ({ label, before, after, barPercent, color }: MetricBarProps) => (
  <div>
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 90px 80px",
      alignItems: "center", marginBottom: "0.35rem",
    }}>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", color: "rgba(244,242,237,0.55)" }}>{label}</span>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.7rem", color: "rgba(244,242,237,0.35)" }}>{before}</span>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "0.7rem", color }}>{after}</span>
    </div>
    <div style={{ position: "relative", height: 5, background: "rgba(255,255,255,0.08)" }}>
      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "100%", background: `${color}26` }} />
      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${barPercent}%`, background: color }} />
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
  const metricHeader = (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 90px 80px", gap: 0,
      marginBottom: "0.5rem", alignItems: "center",
    }}>
      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(244,242,237,0.2)" }}>Metric</span>
      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
        <div style={{ width: 10, height: 3, background: `${color}4D` }} />
        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(244,242,237,0.3)" }}>Before</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
        <div style={{ width: 10, height: 3, background: color }} />
        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color }}>{" "}After</span>
      </div>
    </div>
  );

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
        {metricHeader}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.9rem" }}>
          {metrics.map((m) => <MetricBar key={m.label} {...m} />)}
        </div>
      </div>
    </div>
  );

  const imageBlock = (
    <ScrollReveal variant="zoom" repeat>
      <div style={{ height: 380, overflow: "hidden" }}>
        <img src={imageSrc} alt={imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" as const, opacity: 0.65, transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} className="hover:scale-105" decoding="async" />
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
