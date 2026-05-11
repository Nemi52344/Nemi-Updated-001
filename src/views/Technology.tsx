import Link from "next/link";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";
import SiteFooter from "@/components/SiteFooter";
import MOSAccordion from "@/components/MOSAccordion";

const accent = "hsl(var(--accent))";
const akio = "hsl(0, 72%, 52%)";
const henry = "hsl(217, 91%, 60%)";
const sam = "hsl(142, 71%, 45%)";

type AIService = "AKIO" | "HENRY" | "SAM";

const aiColor: Record<AIService, string> = {
  AKIO: akio,
  HENRY: henry,
  SAM: sam,
};

const lmmLayers: {
  name: string;
  agent: string;
  desc: string;
  img: string;
  serves: AIService[];
}[] = [
  {
    name: "Inference CNS",
    agent: "Taskmaster",
    desc: "Routes every task to the right sub-model. The central nervous system of the platform.",
    img: "/Images/Image in technology/Screenshot 2026-04-06 141717.webp",
    serves: ["AKIO", "HENRY", "SAM"],
  },
  {
    name: "Simulation Optimization",
    agent: "Far-seer",
    desc: "Predicts optimal speed, temperature, and tooling, before a single cut is made.",
    img: "/Images/Image in technology/freepik__clean-this-image-more-brit-should-look-very-neat-a__60512.webp",
    serves: ["AKIO", "HENRY"],
  },
  {
    name: "Quality Prediction",
    agent: "Sommelier",
    desc: "Catches defects before they happen. Eliminates scrap. Kills rework.",
    img: "/Images/Image in technology/freepik__this-chassis-and-everything-is-fine-brbut-the-bacg__75353.webp",
    serves: ["HENRY"],
  },
  {
    name: "Design-to-Product Bridge",
    agent: "Craftsman",
    desc: "Turns CAD files into production-ready process plans in minutes, not weeks.",
    img: "/Images/Image in technology/freepik__i-want-a-image-ehener-thsi-img2-is-on-the-left-sid__60508.webp",
    serves: ["AKIO", "HENRY"],
  },
  {
    name: "Supply Chain Optimization",
    agent: "Dispatcher",
    desc: "Dynamically routes work across suppliers for lowest cost and fastest delivery.",
    img: "/Images/Image in technology/Screenshot 2026-04-07 093826.webp",
    serves: ["HENRY"],
  },
  {
    name: "Lifecycle Intelligence",
    agent: "Trainer",
    desc: "Field data flows back into design. Every failure makes the next build better.",
    img: "/Images/Image in technology/Feeback loop .webp",
    serves: ["SAM"],
  },
];

// Three vertices on the wheel circumference, equilateral. LMM lives at the hub
// and learns from all three. IMPROVE runs along the rim as curved text.
const flywheelVertices = [
  { label: "DESIGN", sub: "AKIO generates data", color: akio, angleDeg: -90 }, // top
  { label: "DEVELOP", sub: "HENRY captures process data", color: henry, angleDeg: 30 }, // bottom-right
  { label: "DEPLOY", sub: "SAM collects field data", color: sam, angleDeg: 150 }, // bottom-left
] as const;

const strategySteps = [
  { num: "01", code: "ASS", title: "Assimilate", body: "Embed into existing factories. Ingest real machines, real data, real customers, without disrupting production." },
  { num: "02", code: "AUG", title: "Augment", body: "Layer the LMM stack on top: sensors, AI scheduling, quality prediction. Production runs get smarter overnight." },
  { num: "03", code: "ACC", title: "Accelerate", body: "Every job feeds the model. Each factory compounds the learning, making the whole network faster, cheaper and more reliable." },
];


const comparisonRows = [
  { dimension: "Intelligence", legacy: "Rule-based automation", nemi: "AI that learns from every job" },
  { dimension: "Scope", legacy: "Point solutions per machine", nemi: "End-to-end design to delivery" },
  { dimension: "Data", legacy: "Siloed per factory", nemi: "Unified across all operations" },
  { dimension: "Deployment", legacy: "Cloud-dependent", nemi: "Edge-first, sovereign" },
  { dimension: "Cost", legacy: "Enterprise pricing", nemi: "Mid-market accessible" },
  { dimension: "Improvement", legacy: "Static after install", nemi: "Compounds with every run" },
];

const Technology = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div className="fixed inset-0 z-0">
        <ConstellationCanvas />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 45%, hsl(var(--accent) / 0.18) 0%, transparent 65%)" }}
        />
      </div>

      <Navbar scrollProgress={1} />

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center justify-center relative z-[1] overflow-hidden pt-32 pb-16 px-6 md:px-12 lg:px-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 45% 40% at 50% 45%, hsl(275 80% 40% / 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 50% 50%, hsl(260 70% 30% / 0.1) 0%, transparent 55%)
            `,
          }}
        />
        <div className="text-center relative z-[3] max-w-5xl mx-auto">
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.95] mb-8"
            style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.15), 0 0 40px hsl(270 70% 50% / 0.08)" }}
          >
            <span style={{ display: "inline-block", animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
              Manufacturing
            </span>
            <br />
            <span style={{ display: "inline-block", animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both" }}>
              Has a New
            </span>
            <span
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary) / 0.8))",
                backgroundSize: "200% 200%",
                animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both, hero-gradient-shift 6s ease-in-out infinite 1.6s",
                marginLeft: "0.2em",
              }}
            >
              Brain.
            </span>
          </h1>
          <p className="text-sm md:text-lg font-light text-muted-foreground leading-relaxed max-w-[600px] mx-auto mb-14"
            style={{ opacity: 0, animation: "hero-fade-up 0.7s ease-out 1s forwards" }}
          >
            The LMM learns from every part, every sensor, every run. It doesn't just automate, it reasons.
          </p>
          <div
            className="inline-flex items-center gap-0 rounded-2xl border border-border/30 overflow-hidden"
            style={{ background: "hsl(var(--card) / 0.5)", backdropFilter: "blur(12px)", opacity: 0, animation: "hero-fade-up 0.7s ease-out 1.2s forwards" }}
          >
            {[
              { num: "6", label: "AI Modules" },
              { num: "10×", label: "Cost Efficiency" },
              { num: "80%", label: "Faster Engineering" },
            ].map((stat, i) => (
              <div key={stat.label} className={`text-center px-6 md:px-10 py-5 md:py-6 ${i > 0 ? "border-l border-border/30" : ""}`}>
                <p className="text-xl md:text-3xl font-extrabold text-foreground tracking-tight">{stat.num}</p>
                <p className="text-[0.55rem] md:text-[0.65rem] text-muted-foreground tracking-[0.2em] uppercase mt-1.5">{stat.label}</p>
              </div>
            ))}
          </div>
          <p
            className="text-[0.65rem] md:text-xs text-muted-foreground/55 italic leading-relaxed max-w-[640px] mx-auto mt-6 px-4"
            style={{ opacity: 0, animation: "hero-fade-up 0.7s ease-out 1.4s forwards" }}
          >
            10&times; and 80% figures reflect outcomes across published AKIO case studies
            (Refrigerator Design, Drone Powertrain, EV Motorcycle). Methodology available
            under NDA.
          </p>
        </div>
      </section>

      {/* ── NEMI M-OS ARCHITECTURE (the explainer - comes first) ── */}
      <section
        id="nemi-m-os"
        className="py-24 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]"
      >
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-primary/80 mb-4 font-bold">
            System Architecture
          </p>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.15)" }}
          >
            NEMI M-OS
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-14 max-w-[640px]">
            The operating system for the physical world. Four layers working as one: applications on top, agents in the middle, data and machines underneath.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="scale">
          <MOSAccordion />
        </ScrollReveal>
      </section>

      {/* ── 1 INTELLIGENCE → 3 VERTICALS → 6 AGENTS → 9 PLATFORMS ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            LMM Architecture
          </p>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Inside the LMM Stack
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-14 max-w-[640px]">
            One Large Manufacturing Model at the core. It runs three product verticals, powered by six specialised agents and nine production platforms.
          </p>
        </ScrollReveal>

        {/* TIER 1 - One Intelligence flywheel */}
        <ScrollReveal>
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-8 font-bold text-center">One Intelligence</p>
            <div className="flex items-center justify-center w-full">
              {(() => {
                const SIZE = 560;
                const cx = SIZE / 2;
                const cy = SIZE / 2;
                const R = 200;
                const nodeR = 54;
                const hubR = 62;
                const toRad = (d: number) => (d * Math.PI) / 180;

                const nodes = flywheelVertices.map((v) => ({
                  ...v,
                  x: cx + Math.cos(toRad(v.angleDeg)) * R,
                  y: cy + Math.sin(toRad(v.angleDeg)) * R,
                }));

                const arcPath = (a1: number, a2: number, r: number) => {
                  const x1 = cx + Math.cos(toRad(a1)) * r;
                  const y1 = cy + Math.sin(toRad(a1)) * r;
                  const x2 = cx + Math.cos(toRad(a2)) * r;
                  const y2 = cy + Math.sin(toRad(a2)) * r;
                  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
                };

                const arcSegments = [
                  { a1: -90, a2: 30,  c1: akio,  c2: henry, id: "arc-ah" },
                  { a1: 30,  a2: 150, c1: henry, c2: sam,   id: "arc-hs" },
                  { a1: 150, a2: 270, c1: sam,   c2: akio,  id: "arc-sa" },
                ];

                return (
                  <svg
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    className="w-full max-w-[480px] h-auto"
                    role="img"
                    aria-label="LMM flywheel: Design, Develop, Deploy feed the central LMM"
                  >
                    <defs>
                      {arcSegments.map((seg) => {
                        const x1 = cx + Math.cos(toRad(seg.a1)) * R;
                        const y1 = cy + Math.sin(toRad(seg.a1)) * R;
                        const x2 = cx + Math.cos(toRad(seg.a2)) * R;
                        const y2 = cy + Math.sin(toRad(seg.a2)) * R;
                        return (
                          <linearGradient
                            key={seg.id}
                            id={seg.id}
                            x1={`${(x1 / SIZE) * 100}%`}
                            y1={`${(y1 / SIZE) * 100}%`}
                            x2={`${(x2 / SIZE) * 100}%`}
                            y2={`${(y2 / SIZE) * 100}%`}
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0%" stopColor={seg.c1} />
                            <stop offset="100%" stopColor={seg.c2} />
                          </linearGradient>
                        );
                      })}
                      <radialGradient id="fw-hub-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="hsl(280 95% 75%)" />
                        <stop offset="55%" stopColor="hsl(275 85% 50%)" />
                        <stop offset="100%" stopColor="hsl(275 75% 30%)" />
                      </radialGradient>
                    </defs>

                    {/* Coloured arc rim */}
                    {arcSegments.map((seg) => (
                      <path
                        key={seg.id}
                        d={arcPath(seg.a1, seg.a2, R)}
                        fill="none"
                        stroke={`url(#${seg.id})`}
                        strokeWidth="2.5"
                        opacity="0.9"
                      />
                    ))}

                    {/* Dashed spokes from hub to each node */}
                    {nodes.map((node) => {
                      const dx = node.x - cx;
                      const dy = node.y - cy;
                      const dist = Math.sqrt(dx * dx + dy * dy);
                      const ux = dx / dist;
                      const uy = dy / dist;
                      return (
                        <line
                          key={node.label}
                          x1={cx + ux * hubR}
                          y1={cy + uy * hubR}
                          x2={node.x - ux * nodeR}
                          y2={node.y - uy * nodeR}
                          stroke={node.color}
                          strokeWidth="1.5"
                          strokeDasharray="5,5"
                          opacity="0.55"
                        />
                      );
                    })}

                    {/* Node circles */}
                    {nodes.map((node) => {
                      const lines = node.sub.split(" ");
                      const mid = Math.ceil(lines.length / 2);
                      const line1 = lines.slice(0, mid).join(" ");
                      const line2 = lines.slice(mid).join(" ");
                      return (
                        <g key={node.label}>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={nodeR}
                            fill="hsl(230 25% 7%)"
                            stroke={node.color}
                            strokeWidth="2.5"
                            style={{ filter: `drop-shadow(0 0 18px ${node.color.replace(")", " / 0.55)")})` }}
                          />
                          <text
                            x={node.x}
                            y={node.y - 10}
                            textAnchor="middle"
                            fill={node.color}
                            fontSize="12"
                            fontWeight="900"
                            letterSpacing="2"
                            style={{ filter: `drop-shadow(0 0 8px ${node.color.replace(")", " / 0.8)")})` }}
                          >
                            {node.label}
                          </text>
                          {line1 && (
                            <text x={node.x} y={node.y + 6} textAnchor="middle" fill="hsl(0 0% 80%)" fontSize="7.5" letterSpacing="0.5">
                              {line1}
                            </text>
                          )}
                          {line2 && (
                            <text x={node.x} y={node.y + 17} textAnchor="middle" fill="hsl(0 0% 80%)" fontSize="7.5" letterSpacing="0.5">
                              {line2}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* LMM hub */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={hubR + 10}
                      fill="none"
                      stroke="hsl(275 80% 60% / 0.2)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={hubR}
                      fill="url(#fw-hub-grad)"
                      stroke="hsl(275 90% 80% / 0.9)"
                      strokeWidth="2.5"
                      style={{ filter: "drop-shadow(0 0 35px hsl(275 80% 60% / 0.85))" }}
                    />
                    <text
                      x={cx}
                      y={cy - 10}
                      textAnchor="middle"
                      fill="hsl(0 0% 100%)"
                      fontSize="22"
                      fontWeight="900"
                      letterSpacing="5"
                      style={{ filter: "drop-shadow(0 0 8px hsl(275 80% 80% / 0.8))" }}
                    >
                      LMM
                    </text>
                    <text x={cx} y={cy + 8} textAnchor="middle" fill="hsl(275 60% 80%)" fontSize="7" letterSpacing="1.5" fontWeight="600">
                      LEARNS FROM
                    </text>
                    <text x={cx} y={cy + 19} textAnchor="middle" fill="hsl(275 60% 80%)" fontSize="7" letterSpacing="1.5" fontWeight="600">
                      ALL THREE
                    </text>
                  </svg>
                );
              })()}
            </div>
            <div aria-hidden className="w-px h-8 mt-4" style={{ background: "linear-gradient(180deg, hsl(275 80% 60% / 0.7), transparent)" }} />
          </div>
        </ScrollReveal>

        {/* TIER 2 - Three Verticals */}
        <ScrollReveal delay={100}>
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <h3 className="text-xl md:text-3xl font-extrabold tracking-wider uppercase text-foreground mb-6 md:mb-8 text-center"
              style={{ textShadow: "0 0 16px hsl(275 80% 60% / 0.4)" }}
            >
              Three Verticals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 w-full max-w-4xl">
              {[
                { name: "AKIO",  role: "Design",  color: akio,  tab: "akio",  img: "/Images/AKIO.webp"  },
                { name: "HENRY", role: "Develop", color: henry, tab: "henry", img: "/Images/Henry.webp" },
                { name: "SAM",   role: "Deploy",  color: sam,   tab: "sam",   img: "/Images/SAM.webp"   },
              ].map((v) => (
                <Link
                  key={v.name}
                  href={`/services?tab=${v.tab}`}
                  className="group rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: v.color.replace(")", " / 0.55)"),
                    background: "hsl(230 25% 6% / 0.6)",
                    boxShadow: `inset 0 0 18px ${v.color.replace(")", " / 0.08)")}, 0 4px 24px ${v.color.replace(")", " / 0.15)")}`,
                  }}
                >
                  <div
                    className="relative h-40 md:h-44 overflow-hidden"
                    style={{ borderBottom: `2px solid ${v.color}` }}
                  >
                    <img
                      src={v.img}
                      alt={`${v.name} ${v.role}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      loading="lazy"
                      decoding="async"
                      style={{ opacity: 0.85 }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, hsl(230 25% 6% / 0.85) 0%, hsl(230 25% 6% / 0.15) 55%, transparent 100%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at center, ${v.color.replace(")", " / 0.10)")} 0%, transparent 60%)`,
                      }}
                    />
                  </div>
                  <div className="px-4 py-4 md:py-5 text-center">
                    <p
                      className="font-black text-base md:text-xl tracking-[0.25em]"
                      style={{
                        color: v.color,
                        textShadow: `0 0 16px ${v.color.replace(")", " / 0.55)")}`,
                      }}
                    >
                      {v.name}
                    </p>
                    <p className="text-[0.6rem] md:text-[0.7rem] tracking-[0.3em] uppercase text-muted-foreground/80 mt-1.5">
                      {v.role}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div aria-hidden className="w-px h-8 mt-4" style={{ background: "linear-gradient(180deg, hsl(275 80% 60% / 0.7), transparent)" }} />
          </div>
        </ScrollReveal>

        {/* TIER 3 - Six Agents (rich photo cards) */}
        <ScrollReveal delay={150}>
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <h3 className="text-xl md:text-3xl font-extrabold tracking-wider uppercase text-foreground mb-6 md:mb-8 text-center"
              style={{ textShadow: "0 0 16px hsl(275 80% 60% / 0.4)" }}
            >
              Six Agents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
              {lmmLayers.map((layer, i) => (
                <div key={layer.name} className="group transition-transform duration-500 hover:-translate-y-1">
                  {/* Service tabs above the card */}
                  <div className="flex gap-1.5 mb-2 pl-1 pr-1">
                    {layer.serves.map((svc) => (
                      <div key={svc} className="flex-1 flex flex-col items-center gap-1.5" title={`Touches ${svc}`}>
                        <span
                          className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.3em]"
                          style={{ color: aiColor[svc] }}
                        >
                          {svc}
                        </span>
                        <div
                          className="h-[3px] w-full rounded-full transition-all duration-500 group-hover:h-[5px]"
                          style={{
                            background: aiColor[svc],
                            boxShadow: `0 0 10px ${aiColor[svc].replace(")", " / 0.55)")}, 0 0 20px ${aiColor[svc].replace(")", " / 0.25)")}`,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="relative rounded-2xl overflow-hidden cursor-default h-[320px] md:h-[360px] transition-shadow duration-500 group-hover:shadow-[0_20px_60px_-15px_hsl(275_80%_50%_/_0.3)]">
                    <img
                      src={layer.img}
                      alt={layer.name}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                      decoding="async"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.92) 30%, hsl(var(--background) / 0.55) 55%, hsl(var(--background) / 0.15) 75%, transparent 100%)",
                      }}
                    />
                    <div className="absolute inset-0 border border-border/20 rounded-2xl pointer-events-none transition-colors duration-300 group-hover:border-primary/30" />

                    <span className="absolute top-5 right-6 font-black text-5xl md:text-6xl text-white/[0.07] select-none leading-none tracking-tighter">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                      <div className="w-10 h-px mb-3 transition-all duration-500 group-hover:w-16" style={{ background: "hsl(275 80% 60% / 0.6)" }} />
                      <p className="text-[0.65rem] md:text-[0.7rem] font-bold tracking-[0.3em] uppercase mb-1.5" style={{ color: "hsl(275 80% 70% / 0.85)" }}>
                        {layer.agent}
                      </p>
                      <h3 className="text-base md:text-lg lg:text-xl font-bold tracking-[0.05em] text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {layer.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground/85 leading-[1.7]">
                        {layer.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div aria-hidden className="w-px h-8 mt-8" style={{ background: "linear-gradient(180deg, hsl(275 80% 60% / 0.7), transparent)" }} />
          </div>
        </ScrollReveal>

        {/* TIER 4 - Nine Platforms - image cards, one per platform */}
        <ScrollReveal delay={280}>
          <div className="flex flex-col items-center">
            <h3 className="text-xl md:text-3xl font-extrabold tracking-wider uppercase text-foreground mb-6 md:mb-8 text-center"
              style={{ textShadow: "0 0 16px hsl(275 80% 60% / 0.4)" }}
            >
              Nine Platforms
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full">
              {[
                { name: "Lumos",         vertical: "AKIO",  color: akio,  desc: "Ideation partner",                       img: "/Images/Design%20and%20Development.webp" },
                { name: "Manvil",        vertical: "AKIO",  color: akio,  desc: "Mechanical generative CAD + simulation", img: "/Images/Parts%20Manufacturing.webp" },
                { name: "Envil",         vertical: "AKIO",  color: akio,  desc: "Electronics generative CAD + simulation", img: "/Images/Validation.webp" },
                { name: "Nemi OS",       vertical: "HENRY", color: henry, desc: "Digital twin + orchestrator",            img: "/Images/Nemi%20parking.webp" },
                { name: "Legion",        vertical: "HENRY", color: henry, desc: "Industrial robotics suite",              img: "/Images/SPMS.webp" },
                { name: "Hawkeye",       vertical: "HENRY", color: henry, desc: "Factory data acquisition",               img: "/Images/Nemi%20Testing%20components.webp" },
                { name: "Quartermaster", vertical: "SAM",   color: sam,   desc: "Warehouse management",                   img: "/Images/Nemi%20stores.webp" },
                { name: "Atom",          vertical: "SAM",   color: sam,   desc: "Post-sales data tracking",               img: "/Images/Usage%20tracking.webp" },
                { name: "Exchequer",     vertical: "SAM",   color: sam,   desc: "Leasing and financing",                  img: "/Images/Predictive%20Maintenance.webp" },
              ].map((p) => (
                <div
                  key={p.name}
                  className="group rounded-xl border overflow-hidden cursor-default transition-transform duration-500 hover:-translate-y-1"
                  style={{
                    borderColor: p.color.replace(")", " / 0.4)"),
                    background: "hsl(230 25% 6% / 0.6)",
                    boxShadow: `0 4px 24px ${p.color.replace(")", " / 0.08)")}`,
                  }}
                >
                  <div className="relative h-40 md:h-44 overflow-hidden" style={{ borderBottom: `2px solid ${p.color}` }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      loading="lazy"
                      decoding="async"
                      style={{ opacity: 0.85 }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, hsl(230 25% 6% / 0.85) 0%, hsl(230 25% 6% / 0.1) 60%, transparent 100%)`,
                      }}
                    />
                    <span
                      className="absolute top-3 left-3 px-2 py-0.5 rounded text-[0.55rem] md:text-[0.6rem] font-black tracking-[0.25em] uppercase"
                      style={{
                        color: p.color,
                        background: p.color.replace(")", " / 0.12)"),
                        border: `1px solid ${p.color.replace(")", " / 0.4)")}`,
                        textShadow: `0 0 10px ${p.color.replace(")", " / 0.5)")}`,
                      }}
                    >
                      {p.vertical}
                    </span>
                  </div>
                  <div className="p-4 md:p-5">
                    <h4
                      className="font-bold text-base md:text-lg tracking-wide mb-1.5 transition-colors duration-300 group-hover:text-foreground"
                      style={{ color: p.color, textShadow: `0 0 12px ${p.color.replace(")", " / 0.35)")}` }}
                    >
                      {p.name}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground/85 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── OUR PLAYBOOK - THE 3A METHOD ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-bold">Our Playbook</p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            The 3A Model
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-12 max-w-[600px]">
            Assimilate. Augment. Accelerate. A repeatable playbook for turning legacy factories into Physical-AI-native operations.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
          {strategySteps.map((step, i) => (
            <ScrollReveal key={step.code} delay={i * 120} className="h-full">
              <div className="bg-background p-7 md:p-9 h-full relative overflow-hidden group hover:bg-card transition-colors duration-300">
                <span className="absolute top-3 right-5 font-black text-6xl text-foreground/[0.04] select-none">
                  {step.num}
                </span>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-primary px-2.5 py-1 border-l-2 border-primary bg-primary/5 rounded-r">
                    {step.code}
                  </span>
                </div>
                <h3 className="font-bold text-lg md:text-xl tracking-wider uppercase mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-[1.8]">{step.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>


      {/* ── THE NEMI EDGE ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Competitive Edge
          </p>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Legacy vs. NEMI
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-14 max-w-[500px]">
            Not incremental. A fundamentally different architecture.
          </p>
        </ScrollReveal>
        <ScrollReveal variant="scale">
          <div className="rounded-xl border border-border/40 overflow-hidden" style={{ background: "hsl(var(--card) / 0.7)" }}>
            {/* Header Row */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-card px-6 py-4 border-b border-border/40">
              <span />
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-foreground/70">Traditional MES / PLM Vendors</span>
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase pl-5" style={{ color: "hsl(275 80% 72%)", textShadow: "0 0 12px hsl(275 80% 60% / 0.4)" }}>NEMI</span>
            </div>
            {/* Data Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-[1.2fr_1fr_1fr] px-6 py-5 ${i < comparisonRows.length - 1 ? "border-b border-border/20" : ""} hover:bg-card/60 transition-colors group`}
              >
                <span className="text-sm md:text-base font-bold tracking-[0.1em] uppercase text-foreground group-hover:text-primary transition-colors">{row.dimension}</span>
                <span className="flex items-center gap-3 text-sm md:text-base text-foreground/70">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="hsl(0 72% 58%)" strokeWidth="2.5" strokeLinecap="round" className="shrink-0">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>{row.legacy}</span>
                </span>
                <span className="flex items-center gap-3 text-sm md:text-base font-semibold pl-5" style={{ borderLeft: "2px solid hsl(275 80% 60% / 0.35)", color: "hsl(275 80% 78%)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="hsl(142 71% 50%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {row.nemi}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <PageCTAFooter
        headline="See It in Action."
        tagline="Book a walkthrough. See the LMM run on real production data."
        buttonText="Request a Demo"
        buttonHref="/#contact"
      />
      <SiteFooter />
    </div>
  );
};

export default Technology;
