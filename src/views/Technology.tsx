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
  { num: "01", code: "ACQ", title: "Acquire", body: "Buy proven factories. Real machines. Real data. Real customers." },
  { num: "02", code: "AUG", title: "Augment", body: "Layer the LMM stack on top — sensors, AI scheduling, quality prediction. Production runs get smarter overnight." },
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
              Has a New{" "}
            </span>
            <span
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary) / 0.8))",
                backgroundSize: "200% 200%",
                animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both, hero-gradient-shift 6s ease-in-out infinite 1.6s",
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

      {/* ── NEMI M-OS ARCHITECTURE (the explainer — comes first) ── */}
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
            The operating system for the physical world. Four layers working as one — applications on top, agents in the middle, data and machines underneath.
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

        {/* TIER 1 — One Intelligence at the hub, with three vertices on the rim */}
        <ScrollReveal>
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.35em] uppercase text-muted-foreground/70 font-bold mb-2">
              One Intelligence
            </p>
            <div className="flex items-center justify-center w-full">
              {(() => {
                const cx = 280;
                const cy = 280;
                const rim = 220;
                const nodeR = 60;
                const hubR = 70;
                const toRad = (d: number) => (d * Math.PI) / 180;
                const point = (angle: number, r: number) => ({
                  x: cx + Math.cos(toRad(angle)) * r,
                  y: cy + Math.sin(toRad(angle)) * r,
                });
                return (
                  <svg
                    viewBox="0 0 560 560"
                    className="w-full max-w-[465px] h-auto"
                    role="img"
                    aria-label="LMM at the hub. AKIO, HENRY and SAM at three vertices feed it."
                  >
                    <defs>
                      <radialGradient id="hier-flywheel-hub" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="hsl(275 80% 25%)" stopOpacity="0.9" />
                        <stop offset="70%" stopColor="hsl(275 80% 12%)" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="hsl(230 25% 8%)" stopOpacity="0.95" />
                      </radialGradient>
                      {(() => {
                        const arcs = [
                          { id: "hier-rim-1", from: point(-90, rim), to: point(30, rim), c1: akio, c2: henry },
                          { id: "hier-rim-2", from: point(30, rim), to: point(150, rim), c1: henry, c2: sam },
                          { id: "hier-rim-3", from: point(150, rim), to: point(270, rim), c1: sam, c2: akio },
                        ];
                        return arcs.map((a) => (
                          <linearGradient
                            key={a.id}
                            id={a.id}
                            gradientUnits="userSpaceOnUse"
                            x1={a.from.x}
                            y1={a.from.y}
                            x2={a.to.x}
                            y2={a.to.y}
                          >
                            <stop offset="0%" stopColor={a.c1} />
                            <stop offset="100%" stopColor={a.c2} />
                          </linearGradient>
                        ));
                      })()}
                    </defs>

                    {(() => {
                      const arcs = [
                        { id: "hier-rim-1", from: point(-90, rim), to: point(30, rim) },
                        { id: "hier-rim-2", from: point(30, rim), to: point(150, rim) },
                        { id: "hier-rim-3", from: point(150, rim), to: point(270, rim) },
                      ];
                      return arcs.map((a) => (
                        <path
                          key={a.id}
                          d={`M ${a.from.x},${a.from.y} A ${rim},${rim} 0 0 1 ${a.to.x},${a.to.y}`}
                          fill="none"
                          stroke={`url(#${a.id})`}
                          strokeWidth="3"
                          strokeLinecap="round"
                          style={{ filter: "drop-shadow(0 0 8px hsl(275 80% 60% / 0.25))" }}
                        />
                      ));
                    })()}

                    {flywheelVertices.map((v, i) => {
                      const p = point(v.angleDeg, rim);
                      const inner = point(v.angleDeg, hubR);
                      return (
                        <g key={`hier-spoke-${v.label}`}>
                          <line x1={inner.x} y1={inner.y} x2={p.x} y2={p.y} stroke={v.color} strokeOpacity="0.18" strokeWidth="1.5" />
                          <line
                            x1={p.x}
                            y1={p.y}
                            x2={inner.x}
                            y2={inner.y}
                            stroke={v.color}
                            strokeOpacity="0.85"
                            strokeWidth="1.5"
                            strokeDasharray="4 14"
                            className="lmm-spoke-flow"
                            style={{ animationDelay: `${i * 0.5}s` }}
                          />
                        </g>
                      );
                    })}

                    {flywheelVertices.map((v) => {
                      const p = point(v.angleDeg, rim);
                      return (
                        <g key={`hier-node-${v.label}`}>
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={nodeR}
                            fill="hsl(230 25% 8%)"
                            stroke={v.color}
                            strokeOpacity="0.7"
                            strokeWidth="1.5"
                            style={{ filter: `drop-shadow(0 0 16px ${v.color.replace(")", " / 0.45)")})` }}
                          />
                          <text x={p.x} y={p.y - 6} textAnchor="middle" fill={v.color} fontSize="14" fontWeight="900" letterSpacing="2">
                            {v.label}
                          </text>
                          <text x={p.x} y={p.y + 14} textAnchor="middle" fill="hsl(0 0% 70%)" fontSize="9" letterSpacing="0.6" style={{ textTransform: "uppercase" }}>
                            <tspan x={p.x} dy="0">{v.sub.split(" ").slice(0, 2).join(" ")}</tspan>
                            <tspan x={p.x} dy="11">{v.sub.split(" ").slice(2).join(" ")}</tspan>
                          </text>
                        </g>
                      );
                    })}

                    <circle
                      cx={cx}
                      cy={cy}
                      r={hubR}
                      fill="url(#hier-flywheel-hub)"
                      stroke="hsl(275 80% 60% / 0.7)"
                      strokeWidth="1.5"
                      className="lmm-hub-pulse"
                    />
                    <text x={cx} y={cy - 4} textAnchor="middle" fill="hsl(275 80% 80%)" fontSize="22" fontWeight="900" letterSpacing="4">
                      LMM
                    </text>
                    <text x={cx} y={cy + 16} textAnchor="middle" fill="hsl(0 0% 70%)" fontSize="9" letterSpacing="2" style={{ textTransform: "uppercase" }}>
                      <tspan x={cx} dy="0">Learns from</tspan>
                      <tspan x={cx} dy="11">all three</tspan>
                    </text>
                  </svg>
                );
              })()}
            </div>
            <div aria-hidden className="w-px h-8 mt-4" style={{ background: "linear-gradient(180deg, hsl(275 80% 60% / 0.7), transparent)" }} />
          </div>
        </ScrollReveal>

        {/* TIER 2 — Three Verticals */}
        <ScrollReveal delay={100}>
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.35em] uppercase text-muted-foreground/70 font-bold mb-4">
              Three Verticals
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-3xl">
              {[
                { name: "AKIO", role: "Design", color: akio, tab: "akio" },
                { name: "HENRY", role: "Develop", color: henry, tab: "henry" },
                { name: "SAM", role: "Deploy", color: sam, tab: "sam" },
              ].map((v) => (
                <Link
                  key={v.name}
                  href={`/services?tab=${v.tab}`}
                  className="rounded-xl border px-4 py-4 md:py-5 text-center transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    borderColor: v.color.replace(")", " / 0.55)"),
                    background: v.color.replace(")", " / 0.08)"),
                    boxShadow: `inset 0 0 18px ${v.color.replace(")", " / 0.1)")}, 0 4px 18px ${v.color.replace(")", " / 0.12)")}`,
                  }}
                >
                  <p
                    className="font-black text-base md:text-xl tracking-[0.2em]"
                    style={{
                      color: v.color,
                      textShadow: `0 0 16px ${v.color.replace(")", " / 0.5)")}`,
                    }}
                  >
                    {v.name}
                  </p>
                  <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground/80 mt-1">
                    {v.role}
                  </p>
                </Link>
              ))}
            </div>
            <div aria-hidden className="w-px h-8 mt-4" style={{ background: "linear-gradient(180deg, hsl(275 80% 60% / 0.7), transparent)" }} />
          </div>
        </ScrollReveal>

        {/* TIER 3 — Six Agents (rich photo cards) */}
        <ScrollReveal delay={150}>
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.35em] uppercase text-muted-foreground/70 font-bold mb-6">
              Six Agents
            </p>
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

        {/* TIER 4 — Nine Platforms (3 per vertical) */}
        <ScrollReveal delay={280}>
          <div className="flex flex-col items-center">
            <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.35em] uppercase text-muted-foreground/70 font-bold mb-4">
              Nine Platforms
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full">
              {[
                {
                  vertical: "AKIO",
                  color: akio,
                  platforms: [
                    { name: "Lumos", desc: "Ideation partner" },
                    { name: "Manvil", desc: "Mechanical generative CAD + simulation" },
                    { name: "Envil", desc: "Electronics generative CAD + simulation" },
                  ],
                },
                {
                  vertical: "HENRY",
                  color: henry,
                  platforms: [
                    { name: "Nemi OS", desc: "Digital twin + orchestrator" },
                    { name: "Legion", desc: "Industrial robotics suite" },
                    { name: "Hawkeye", desc: "Factory data acquisition" },
                  ],
                },
                {
                  vertical: "SAM",
                  color: sam,
                  platforms: [
                    { name: "Quartermaster", desc: "Warehouse management" },
                    { name: "Atom", desc: "Post-sales data tracking" },
                    { name: "Exchequer", desc: "Leasing and financing" },
                  ],
                },
              ].map((group) => (
                <div
                  key={group.vertical}
                  className="rounded-xl border p-4 md:p-5"
                  style={{
                    borderColor: group.color.replace(")", " / 0.3)"),
                    background: group.color.replace(")", " / 0.04)"),
                  }}
                >
                  <p
                    className="text-[0.6rem] md:text-[0.65rem] font-black tracking-[0.3em] uppercase mb-3 text-center"
                    style={{
                      color: group.color,
                      textShadow: `0 0 12px ${group.color.replace(")", " / 0.4)")}`,
                    }}
                  >
                    {group.vertical}
                  </p>
                  <div className="flex flex-col gap-2">
                    {group.platforms.map((p) => (
                      <div
                        key={p.name}
                        className="rounded-md border px-3 py-2"
                        style={{
                          borderColor: group.color.replace(")", " / 0.4)"),
                          background: group.color.replace(")", " / 0.06)"),
                        }}
                      >
                        <p className="text-xs md:text-sm font-bold tracking-wide" style={{ color: group.color }}>
                          {p.name}
                        </p>
                        <p className="text-[0.6rem] md:text-[0.65rem] text-muted-foreground/85 leading-snug mt-0.5">
                          {p.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── OUR PLAYBOOK — THE 3A METHOD ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-bold">Our Playbook</p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            The 3A Method
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-12 max-w-[600px]">
            Acquire. Augment. Accelerate. A repeatable playbook for turning legacy factories into Physical-AI-native operations.
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
            <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-card p-5 border-b border-border/30">
              <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-muted-foreground"></span>
              <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-foreground/80">Traditional MES / PLM Vendors</span>
              <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-primary">NEMI</span>
            </div>
            {/* Data Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-[1.2fr_1fr_1fr] p-5 ${i < comparisonRows.length - 1 ? "border-b border-border/15" : ""} hover:bg-card/50 transition-colors group`}
              >
                <span className="text-xs md:text-sm font-bold tracking-[0.12em] uppercase text-foreground/85 group-hover:text-foreground transition-colors">{row.dimension}</span>
                <span className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/85">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(0 72% 60%)" strokeWidth="2.5" strokeLinecap="round" className="shrink-0">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>{row.legacy}</span>
                </span>
                <span className="flex items-center gap-2.5 text-xs md:text-sm text-primary font-semibold pl-4" style={{ borderLeft: "2px solid hsl(var(--primary) / 0.4)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(142 71% 45%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
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
