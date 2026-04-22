"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";

interface LeaderMember {
  name: string;
  photo?: string;
  initials?: string;
  role: string;
  desc: string;
  colorHsl: string;
  linkedin?: string;
}

// Small inline LinkedIn glyph, inherits color + current font size.
const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-3.5 h-3.5 md:w-4 md:h-4"
    aria-hidden="true"
  >
    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.42v1.56h.05c.48-.91 1.65-1.86 3.4-1.86 3.64 0 4.3 2.4 4.3 5.52v6.23zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.53C0 23.22.79 24 1.77 24h20.45c.98 0 1.77-.78 1.77-1.74V1.73C24 .78 23.21 0 22.22 0z" />
  </svg>
);

const LeaderFlipCard = ({ member }: { member: LeaderMember }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full cursor-pointer"
      style={{ perspective: "1000px", height: "300px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden border flex flex-col items-center justify-center p-2 md:p-6 lg:p-8 transition-shadow duration-500"
          style={{
            backfaceVisibility: "hidden",
            borderColor: `hsl(${member.colorHsl} / 0.3)`,
            boxShadow: `0 0 20px hsl(${member.colorHsl} / 0.1), 0 4px 20px hsl(230 25% 4% / 0.4)`,
            background: `linear-gradient(135deg, hsl(${member.colorHsl} / 0.08), hsl(var(--card) / 0.7))`,
          }}
        >
          <div
            className="rounded-full mb-2 md:mb-4 relative z-10 flex items-center justify-center"
            style={{
              width: "8rem", height: "8rem",
              background: `radial-gradient(circle, hsl(${member.colorHsl} / 0.2) 50%, hsl(${member.colorHsl} / 0.05) 65%, transparent 72%)`,
            }}
          >
            <div
              className="rounded-full overflow-hidden flex items-center justify-center"
              style={{
                width: "6.5rem", height: "6.5rem",
                border: `1.5px solid hsl(${member.colorHsl} / 0.45)`,
                boxShadow: `0 0 10px hsl(${member.colorHsl} / 0.2), inset 0 0 8px hsl(${member.colorHsl} / 0.08)`,
                background: member.photo ? "transparent" : `hsl(${member.colorHsl} / 0.15)`,
              }}
            >
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" decoding="async" />
              ) : (
                <span className="font-black text-xl tracking-widest" style={{ color: `hsl(${member.colorHsl})` }}>
                  {member.initials}
                </span>
              )}
            </div>
          </div>
          <div
            className="absolute w-20 h-20 md:w-44 md:h-44 rounded-full blur-2xl opacity-20"
            style={{ background: `radial-gradient(circle, hsl(${member.colorHsl} / 0.4), transparent)`, top: "10%" }}
          />
          <h3 className="text-xs md:text-xl font-semibold text-foreground tracking-wider mb-0 md:mb-1"
            style={{ textShadow: `0 0 12px hsl(${member.colorHsl} / 0.4)`, animation: "text-glow-pulse 3s ease-in-out infinite" }}
          >
            {member.name}
          </h3>
          <p className="text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.3em] uppercase font-medium"
            style={{ color: `hsl(${member.colorHsl})` }}
          >
            {member.role}
          </p>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden border flex flex-col items-center justify-center p-2 md:p-6 lg:p-8 transition-shadow duration-500"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `hsl(${member.colorHsl} / 0.3)`,
            boxShadow: `0 0 20px hsl(${member.colorHsl} / 0.1), 0 4px 20px hsl(230 25% 4% / 0.4)`,
            background: `linear-gradient(135deg, hsl(${member.colorHsl} / 0.1), hsl(var(--card) / 0.85))`,
          }}
        >
          <p className="text-[10px] mb-2 md:text-sm md:mb-4 tracking-[0.2em] md:tracking-[0.3em] uppercase font-medium"
            style={{ color: `hsl(${member.colorHsl})` }}
          >
            {member.role}
          </p>
          <p className="text-[10px] leading-relaxed md:text-sm text-muted-foreground text-center">
            {member.desc}
          </p>
          <a
            href={member.linkedin || "https://www.linkedin.com/company/nemi-ai"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${member.name} on LinkedIn`}
            className="mt-3 md:mt-4 inline-flex items-center gap-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-100 opacity-80"
            style={{ color: `hsl(${member.colorHsl})` }}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* CONSTELLATION + GLOW BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <ConstellationCanvas />
        <div className="absolute inset-0 pointer-events-none"
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
              radial-gradient(ellipse 40% 35% at 50% 45%, hsl(275 80% 40% / 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 55% 45% at 50% 50%, hsl(260 70% 30% / 0.1) 0%, transparent 55%)
            `,
          }}
        />
        <div className="text-center relative z-[3] max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.95] mb-8"
            style={{ textShadow: "0 0 25px hsl(275 80% 60% / 0.2), 0 0 50px hsl(270 70% 50% / 0.1)" }}
          >
            <span style={{ display: "inline-block", animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
              We Build
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary) / 0.8))",
                backgroundSize: "200% 200%",
                animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both, hero-gradient-shift 6s ease-in-out infinite 1.4s",
              }}
            >
              Intelligent
            </span>
            <br />
            <span style={{ display: "inline-block", animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both" }}>
              Factories.
            </span>
          </h1>
          <p className="text-sm md:text-lg font-light text-muted-foreground leading-relaxed tracking-[0.15em] uppercase max-w-[600px] mx-auto"
            style={{ opacity: 0, animation: "hero-fade-up 0.7s ease-out 1s forwards" }}
          >
            Physical AI for the next era of manufacturing.
          </p>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 relative z-[1]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase text-primary/80 mb-4 font-bold">What We Do</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
            <ScrollReveal delay={100}>
              <div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-6">
                  One platform.<br />Three systems.
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-[1.8] max-w-[400px]">
                  From first sketch to final delivery, NEMI covers the entire product lifecycle with AI at every step.
                </p>
              </div>
            </ScrollReveal>

            <div className="flex flex-col gap-0">
              {[
                { color: "hsl(0, 72%, 52%)", label: "AKIO", subtitle: "Design Intelligence",
                  body: "AI-powered CAD generation, simulation, prototyping. Concept to production-ready design in weeks." },
                { color: "hsl(217, 91%, 60%)", label: "HENRY", subtitle: "Manufacturing Engine",
                  body: "Full-stack production, metal parts, electronics, batteries, motors. Sensor-driven quality at every stage." },
                { color: "hsl(142, 71%, 45%)", label: "SAM", subtitle: "Deployment & Lifecycle",
                  body: "Fleet deployment, last-mile logistics, leasing, financing, field monitoring. Real-world data feeds back into AKIO designs." },
              ].map((pillar, i) => (
                <ScrollReveal key={pillar.label} delay={i * 150}>
                  <div
                    className="group flex gap-6 md:gap-8 items-start py-8 cursor-default transition-all duration-300"
                    style={{ borderBottom: "1px solid hsl(var(--border) / 0.3)" }}
                  >
                    {/* Number + accent */}
                    <div className="flex flex-col items-center gap-2 pt-1">
                      <div className="w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-125"
                        style={{ background: pillar.color, boxShadow: `0 0 12px ${pillar.color}40` }}
                      />
                      <div className="w-px h-full min-h-[40px] opacity-20" style={{ background: pillar.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3 className="text-xl md:text-2xl font-extrabold tracking-wider uppercase group-hover:text-foreground transition-colors"
                          style={{ color: pillar.color }}
                        >
                          {pillar.label}
                        </h3>
                        <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-muted-foreground/50">
                          {pillar.subtitle}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground leading-[1.9] max-w-[500px]">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY NOW ── */}
      <section
        aria-labelledby="why-now-heading"
        className="py-24 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-semibold">
              Market Timing
            </p>
            <h2
              id="why-now-heading"
              className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
              style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
            >
              Why Now
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-16 max-w-[600px]">
              A once in a 30-year shift is underway in manufacturing.
            </p>
          </ScrollReveal>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
            {/* Left: Venn diagram of converging forces */}
            <ScrollReveal variant="scale">
              <div className="flex justify-center items-center min-h-[420px] py-4">
                <div
                  className="relative"
                  style={{ width: "100%", maxWidth: "420px", height: "380px" }}
                  role="img"
                  aria-label="Three converging forces: Sovereign Manufacturing, Physical AI, and High ROI Automation"
                >
                  {/* Circle 1 - Sovereign Manufacturing (TOP) */}
                  <div
                    className="venn-circle absolute rounded-full flex items-center justify-center text-center px-6"
                    style={{
                      width: "230px",
                      height: "230px",
                      top: "0",
                      left: "50%",
                      marginLeft: "-115px",
                      background:
                        "radial-gradient(circle, hsl(275 80% 55% / 0.32) 0%, hsl(275 80% 55% / 0.10) 70%)",
                      border: "1px solid hsl(275 80% 55% / 0.3)",
                    }}
                  >
                    <div className="relative z-[2]">
                      <span className="text-sm font-bold text-foreground block mb-1.5">
                        Sovereign Manufacturing
                      </span>
                      <span className="text-[0.65rem] text-muted-foreground leading-snug">
                        $3T of global trade at risk due to reshoring push
                      </span>
                    </div>
                  </div>

                  {/* Circle 2 - Physical AI (BOTTOM-LEFT) */}
                  <div
                    className="venn-circle venn-circle-2 absolute rounded-full flex items-center justify-center text-center px-6"
                    style={{
                      width: "230px",
                      height: "230px",
                      bottom: "0",
                      left: "0",
                      background:
                        "radial-gradient(circle, hsl(265 75% 50% / 0.28) 0%, hsl(265 75% 50% / 0.08) 70%)",
                      border: "1px solid hsl(265 75% 50% / 0.25)",
                    }}
                  >
                    <div className="relative z-[2]">
                      <span className="text-sm font-bold text-foreground block mb-1.5">
                        Physical AI
                      </span>
                      <span className="text-[0.65rem] text-muted-foreground leading-snug">
                        Starting to transform manufacturing
                      </span>
                    </div>
                  </div>

                  {/* Circle 3 - High ROI Automation (BOTTOM-RIGHT) */}
                  <div
                    className="venn-circle venn-circle-3 absolute rounded-full flex items-center justify-center text-center px-6"
                    style={{
                      width: "230px",
                      height: "230px",
                      bottom: "0",
                      right: "0",
                      background:
                        "radial-gradient(circle, hsl(285 80% 60% / 0.28) 0%, hsl(285 80% 60% / 0.08) 70%)",
                      border: "1px solid hsl(285 80% 60% / 0.25)",
                    }}
                  >
                    <div className="relative z-[2]">
                      <span className="text-sm font-bold text-foreground block mb-1.5">
                        High ROI Automation
                      </span>
                      <span className="text-[0.65rem] text-muted-foreground leading-snug">
                        Driving immediate value from M&amp;A
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Key points */}
            <div className="flex flex-col gap-6">
              <ScrollReveal>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-3 flex items-baseline gap-2">
                    <span className="text-primary text-xl md:text-2xl">24-48 mo</span>
                    <span>window</span>
                  </h3>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-2 list-none pl-0">
                    <li className="flex gap-3 items-start">
                      <span className="text-primary mt-1.5 shrink-0">•</span>
                      <span>Physical AI reaches massive commercial deployment</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-primary mt-1.5 shrink-0">•</span>
                      <span>Reshoring driven by geopolitics reframes manufacturing</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <div
                  className="rounded-xl px-5 py-4"
                  style={{
                    background: "hsl(230 20% 8% / 0.5)",
                    borderLeft: "3px solid hsl(275 80% 55% / 0.5)",
                  }}
                >
                  <p className="text-sm md:text-base font-semibold text-foreground leading-snug">
                    This type of shift happens once every ~30 years
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    e.g., previously the rise of IT, TPS
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={220}>
                <div
                  className="rounded-xl px-5 py-4"
                  style={{
                    background: "hsl(230 20% 8% / 0.5)",
                    borderLeft: "3px solid hsl(275 80% 55% / 0.5)",
                  }}
                >
                  <p className="text-sm md:text-base font-semibold text-foreground leading-snug">
                    Early leaders capture data, market share, and permanence
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    They become the default.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={320}>
                <div
                  className="rounded-xl px-6 py-5 mt-2"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(275 80% 40% / 0.18), hsl(260 70% 30% / 0.12))",
                    border: "1px solid hsl(275 80% 55% / 0.3)",
                    boxShadow: "0 0 30px hsl(275 80% 55% / 0.15)",
                  }}
                >
                  <p className="text-sm md:text-base font-bold text-foreground">
                    NEMI is building the infrastructure to win this shift.
                  </p>
                </div>
              </ScrollReveal>

              <p className="text-[0.6rem] text-muted-foreground/50 italic mt-2">
                Source: McKinsey Global Institute, 2025.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY WE WIN ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        <ScrollReveal>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Why We Win
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-16 max-w-[500px]">
            Six structural advantages. Not features, moats.
          </p>
        </ScrollReveal>

        <div className="flex flex-col">
          {[
            { num: "01", color: "275 85% 65%", tag: "RESILIENCE-AS-A-SERVICE", title: "Sovereign Manufacturing",
              desc: "Edge AI within national borders. No cloud dependency. Full data sovereignty." },
            { num: "02", color: "272 78% 58%", tag: "WORLD-CLASS ENGINEERING · LOCALIZED COSTS", title: "Extreme Capital Efficiency",
              desc: "Coimbatore ops at 1/5th US cost. Same engineering quality." },
            { num: "03", color: "269 70% 52%", tag: "PROPRIETARY AI", title: "The LMM Advantage",
              desc: "Proprietary AI trained on real production data. Smarter every job." },
            { num: "04", color: "266 62% 46%", tag: "ONE PARTNER · FULL STACK", title: "End-to-End Integration",
              desc: "Design to delivery. One partner. No integration gaps." },
            { num: "05", color: "263 55% 40%", tag: "RETROFIT · NOT REPLACE", title: "AI Retrofit for Legacy",
              desc: "Upgrade existing factories. No greenfield capital needed." },
            { num: "06", color: "260 48% 35%", tag: "ACCESSIBLE PHYSICAL AI", title: "Mid-Market Focus",
              desc: "Physical AI for companies enterprise vendors ignore." },
          ].map((moat, i) => (
            <ScrollReveal key={moat.num} delay={i * 80}>
              <div className="group grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr_1fr] lg:grid-cols-[6rem_1fr_1.2fr] gap-6 md:gap-10 items-start py-8 border-t border-border/20 transition-all duration-300 hover:border-border/50">
                <div className="font-black text-2xl md:text-4xl lg:text-5xl leading-none tabular-nums transition-all duration-300 group-hover:scale-110 origin-left"
                  style={{ color: `hsl(${moat.color} / 0.25)`, fontVariantNumeric: "tabular-nums" }}
                >
                  {moat.num}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight leading-[1.15] text-foreground group-hover:text-primary transition-colors duration-300">
                    {moat.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: `hsl(${moat.color})` }} />
                    <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase" style={{ color: `hsl(${moat.color})` }}>
                      {moat.tag}
                    </span>
                  </div>
                </div>
                <p className="col-span-2 md:col-span-1 text-sm md:text-base leading-[1.75] text-muted-foreground tracking-wide pl-[3.5rem] md:pl-0">
                  {moat.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="border-t border-border/20 mt-0" />
      </section>
      {/* ── THE TEAM ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 relative z-[1]">
        <div className="text-center max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-4"
              style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
            >
              The Team
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-14 max-w-2xl mx-auto">
              Leadership team that built manufacturing at scale and AI systems at scale, now combining both.
            </p>
          </ScrollReveal>

          {/* Core Leadership */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-14">
            {[
              {
                name: "Anirudh Ravi Narayanan",
                photo: "/Images/team/Anirudh%20Ravi%20Narayanan.webp",
                role: "Chief Executive Officer",
                desc: "Built Nemi from a garage to 300k sq ft and $15M ARR; led 10+ recovery and margin transformations at McKinsey. BS ECE Rose-Hulman, MBA Yale.",
                colorHsl: "275 85% 65%",
                linkedin: "https://www.linkedin.com/in/anirudh-narayanan-26b0a121/",
              },
              {
                name: "Gokul Madhavan",
                photo: "/Images/team/Gokul%20Madhavan.webp",
                role: "Chief Financial Officer",
                desc: "Supported M&A integrations, built digital finance ops, led digital transformations. A.B., PhD from Harvard, MBA from Yale.",
                colorHsl: "268 82% 62%",
              },
              {
                name: "Shreerith Seshadri",
                photo: "/Images/team/Sreeridh%20Seshahri.webp",
                role: "Chief Technology Officer",
                desc: "Deployed AI systems used by 100M+ users, shaped early architecture and infrastructure at eightfold.AI. CS, UIUC.",
                colorHsl: "282 78% 60%",
              },
              {
                name: "Vinoth Thiruvenkatasamy",
                photo: "/Images/team/Vinoth%20Thiruvenkatasamy.webp",
                role: "Chief Operating Officer",
                desc: "20+ years in automotive manufacturing. Scaled production lines from pilot to 100K+ units multiple times.",
                colorHsl: "272 80% 58%",
              },
            ].map((member, i) => (
              <ScrollReveal key={member.name} variant="scale" delay={i * 100}>
                <LeaderFlipCard member={member} />
              </ScrollReveal>
            ))}
          </div>

          {/* Extended Leadership */}
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 font-bold">
              Extended Leadership
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Subramanian R", photo: "/Images/team/Subramanian%20R.webp", role: "CFO, India",
                desc: "Chartered & Cost Accountant with 27+ years in manufacturing across auto, industrial, and consumer goods.", colorHsl: "275 55% 52%" },
              { name: "Vijay Ragavalu", photo: "/Images/team/Vijay%20Ragavalu.webp", role: "President, AKIO Suite (Mechanical)",
                desc: "30+ years in manufacturing leadership, automation, operational optimization, and large-scale team management.", colorHsl: "282 50% 48%" },
              { name: "Sadasivam B", photo: "/Images/team/Sadasivam%20Balasubramanian.webp", role: "President, AKIO Suite (Electrical)",
                desc: "20 years in electronics product development across telematics, defence, aerospace, and factory automation.", colorHsl: "272 48% 50%" },
              { name: "Vijay Ramakrishnan", photo: "/Images/team/Vijay%20RamaKrishnan.webp", role: "President, SAM",
                desc: "15+ years in Sales & Marketing across automotive, finance, and tourism. Built and led 100+ person sales teams.", colorHsl: "278 53% 49%" },
            ].map((member, i) => (
              <ScrollReveal key={member.name} variant="scale" delay={i * 100}>
                <LeaderFlipCard member={member} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOARD & ADVISORS ── */}
      <section className="py-20 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        <ScrollReveal>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Board & Advisors
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-12">
            Guided by operators who scaled global enterprises.
          </p>
        </ScrollReveal>

        {/* Board of Directors */}
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6 font-bold">Board of Directors</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30 mb-16">
          {[
            { initials: "ARN", photo: "/Images/team/Anirudh%20Ravi%20Narayanan.webp", name: "Anirudh Ravi Narayanan", title: "Executive Director & CEO", tag: "Executive", color: "275 42% 45%", desc: "CEO & Founder of BNC Motors. Drives NEMI's vision of making manufacturing accessible through Physical AI." },
            { initials: "VT", photo: "/Images/team/Vinoth%20Thiruvenkatasamy.webp", name: "Vinoth Thiruvenkatasamy", title: "Executive Board Member", tag: "Executive", color: "268 40% 43%", desc: "CTO at BNC Motors. 20+ years in automotive R&D with experience at Nissan & Ford." },
            { initials: "SS", photo: "/Images/team/Sam%20Swaminathan.webp", name: "Sam Swaminathan", title: "Non-Executive Board Member", tag: "Non-Executive", color: "282 38% 41%", desc: "General Partner, De La Crème Ventures. Ex-SVP Fractal Analytics. IIT Madras alumnus." },
            { initials: "NN", photo: "/Images/team/Naoya%20Nishimura.webp", name: "Naoya Nishimura", title: "Non-Executive Board Member", tag: "Non-Executive", color: "272 36% 39%", desc: "CEO, Musashi Auto Parts India. Leads EV expansion for Musashi Seimitsu in India & Africa." },
          ].map((member, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-background p-6 h-full flex flex-col" style={{ borderTop: `2px solid hsl(${member.color} / 0.5)` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{ background: `hsl(${member.color} / 0.12)`, border: `1px solid hsl(${member.color} / 0.3)` }}
                  >
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" decoding="async" />
                    ) : (
                      <span className="font-black text-xs" style={{ color: `hsl(${member.color})` }}>{member.initials}</span>
                    )}
                  </div>
                  <span className="text-[0.55rem] tracking-[0.15em] uppercase font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: `hsl(${member.color})`, background: `hsl(${member.color} / 0.1)` }}>
                    {member.tag}
                  </span>
                </div>
                <p className="font-bold text-sm tracking-[0.05em] uppercase text-foreground mb-1">{member.name}</p>
                <p className="font-semibold text-[0.58rem] tracking-[0.12em] uppercase mb-3" style={{ color: `hsl(${member.color})` }}>{member.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.desc}</p>
                <a
                  href="https://www.linkedin.com/company/nemi-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.15em] opacity-70 hover:opacity-100 transition-opacity self-start"
                  style={{ color: `hsl(${member.color})` }}
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Advisors */}
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6 font-bold">Advisors</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { initials: "SR", photo: "/Images/team/Sampath%20Ravi%20Narayanan.webp", name: "Dr. Sampath Ravinarayanan", title: "Board Advisor", color: "275 30% 38%",
              highlights: ["Founder, Microcon; Chairman & MD, Axis CADES", "Fmr. Board: Air India, Airbus India, KPTCL"] },
            { initials: "RM", photo: "/Images/team/Ramesh%20Mangaleshwaran.webp", name: "Ramesh Mangaleshwaran", title: "Advisor", color: "268 28% 36%",
              highlights: ["Senior Partner Emeritus, McKinsey & Company (30 yrs)", "Co-led Industrials Practice, India & Asia"] },
            { initials: "VD", photo: "/Images/team/Vinod%20K%20Dasari.webp", name: "Vinod K. Dasari", title: "Advisor", color: "282 26% 35%",
              highlights: ["Fmr. MD & CEO, Ashok Leyland & Royal Enfield", "Led global innovation, modernization & international expansion"] },
          ].map((advisor, i) => (
            <ScrollReveal key={advisor.name} delay={i * 120}>
              <div className="rounded-xl border p-6 h-full flex flex-col"
                style={{ borderColor: `hsl(${advisor.color} / 0.25)`, background: `linear-gradient(135deg, hsl(${advisor.color} / 0.06), hsl(var(--card) / 0.7))` }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{ background: `hsl(${advisor.color} / 0.15)`, border: `1.5px solid hsl(${advisor.color} / 0.4)` }}
                  >
                    {advisor.photo ? (
                      <img src={advisor.photo} alt={advisor.name} className="w-full h-full object-cover" decoding="async" />
                    ) : (
                      <span className="font-black text-sm" style={{ color: `hsl(${advisor.color})` }}>{advisor.initials}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm tracking-wide text-foreground">{advisor.name}</p>
                    <p className="text-[0.6rem] tracking-[0.15em] uppercase font-semibold" style={{ color: `hsl(${advisor.color})` }}>{advisor.title}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {advisor.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: `hsl(${advisor.color})` }} />
                      {h}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.linkedin.com/company/nemi-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${advisor.name} on LinkedIn`}
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.15em] opacity-70 hover:opacity-100 transition-opacity self-start"
                  style={{ color: `hsl(${advisor.color})` }}
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── PARTNER LOGOS ── */}
      <section className="py-16 md:py-20 border-t border-border/20 relative z-[1] overflow-hidden">
        <ScrollReveal>
          <p className="text-center text-xs tracking-[0.4em] uppercase text-muted-foreground mb-12">
            Affiliated &amp; Partnered With
          </p>
        </ScrollReveal>

        {/* Row 1, scrolls left */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] mb-3 md:mb-4">
          <div className="flex" style={{ animation: "partner-scroll-left 40s linear infinite", willChange: "transform" }}>
            {[0, 1].map((set) => (
              <div key={set} className="flex items-center gap-3 md:gap-4 shrink-0 pr-3 md:pr-4" aria-hidden={set === 1 ? true : undefined}>
                {[
                  { src: "/Images/logos/samsung.webp", label: "Samsung" },
                  { src: "/Images/logos/tata.webp", label: "Tata" },
                  { src: "/Images/logos/lamborghini.webp", label: "Lamborghini" },
                  { src: "/Images/logos/whirlpool.webp", label: "Whirlpool" },
                  { src: "/Images/logos/abb.webp", label: "ABB" },
                  { src: "/Images/logos/caterpillar.webp", label: "Caterpillar" },
                  { src: "/Images/logos/isro.webp", label: "ISRO" },
                  { src: "/Images/logos/drdo.webp", label: "DRDO" },
                  { src: "/Images/logos/boeing.webp", label: "Boeing" },
                  { src: "/Images/logos/ashok-leyland.webp", label: "Ashok Leyland" },
                ].map((logo) => (
                  <div
                    key={logo.label + set}
                    className="flex items-center justify-center shrink-0 rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm"
                    style={{ width: "160px", height: "80px" }}
                  >
                    <img src={logo.src} alt={logo.label} title={logo.label}
                      style={{ height: "40px", width: "auto", maxWidth: "120px", objectFit: "contain" }} decoding="async" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2, scrolls right */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex" style={{ animation: "partner-scroll-right 38s linear infinite", willChange: "transform" }}>
            {[0, 1].map((set) => (
              <div key={set} className="flex items-center gap-3 md:gap-4 shrink-0 pr-3 md:pr-4" aria-hidden={set === 1 ? true : undefined}>
                {[
                  { src: "/Images/logos/royal-enfield.webp", label: "Royal Enfield" },
                  { src: "/Images/logos/brahmos.webp", label: "BrahMos" },
                  { src: "/Images/logos/bharat-dynamics.webp", label: "Bharat Dynamics" },
                  { src: "/Images/logos/exide.webp", label: "Exide" },
                  { src: "/Images/logos/flipkart.webp", label: "Flipkart" },
                  { src: "/Images/logos/zomato.webp", label: "Zomato" },
                  { src: "/Images/logos/rapido.webp", label: "Rapido" },
                  { src: "/Images/logos/tvs-mobility.webp", label: "TVS Mobility" },
                  { src: "/Images/logos/mahindra.webp", label: "Mahindra" },
                  { src: "/Images/logos/ducati.webp", label: "Ducati" },
                ].map((logo) => (
                  <div
                    key={logo.label + set}
                    className="flex items-center justify-center shrink-0 rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm"
                    style={{ width: "160px", height: "80px" }}
                  >
                    <img src={logo.src} alt={logo.label} title={logo.label}
                      style={{ height: "40px", width: "auto", maxWidth: "120px", objectFit: "contain" }} decoding="async" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── WHERE WE'RE GOING ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-b border-border/30 relative z-[1]">
        {/* Top: Centered text + stats */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold"
              style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
            >
              Our Vision
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-6"
              style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.15)" }}
            >
              Where We're Going
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-base md:text-lg text-muted-foreground tracking-wide mb-3">
              300,000 sq ft of AI-powered manufacturing, and growing.
            </p>
            <p className="text-sm text-muted-foreground/70 leading-[1.9] max-w-xl mx-auto">
              Our factories combine advanced machinery with real-time AI intelligence. Every square foot is built for precision, speed, and scale, from prototyping to full production.
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom: Bento image grid */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
            {/* Large image, spans 2 cols & 2 rows */}
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden group">
              <img
                src="/Images/Nemi%2002.webp"
                alt="NEMI Headquarters"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy" decoding="async"
              />
            </div>
            {/* Top right */}
            <div className="rounded-2xl overflow-hidden group">
              <img
                src="/Images/nemi%2001.webp"
                alt="NEMI Campus"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy" decoding="async"
              />
            </div>
            <div className="rounded-2xl overflow-hidden group">
              <img
                src="/Images/Nemi%20parking.webp"
                alt="NEMI Facility"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy" decoding="async"
              />
            </div>
            {/* Bottom right */}
            <div className="rounded-2xl overflow-hidden group">
              <img
                src="/Images/Electronics%20production.webp"
                alt="Electronics Production"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy" decoding="async"
              />
            </div>
            <div className="rounded-2xl overflow-hidden group">
              <img
                src="/Images/Nemi%20stores.webp"
                alt="NEMI Stores"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy" decoding="async"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Quality Certifications ── */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[0.65rem] md:text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3 font-bold">
                Certified Excellence
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-[1.1]">
                Quality{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                  }}
                >
                  Certifications
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
            {[
              {
                img: "/Images/certifications/iso-9001.webp",
                alt: "ISO 9001:2015 Certificate of Registration",
                title: "ISO 9001:2015",
                subtitle: "Quality Management System",
                id: "25EQOJ38",
                validity: "Valid through 19/03/2028",
              },
              {
                img: "/Images/certifications/icat-type-approval.webp",
                alt: "ICAT Type Approval Certificate",
                title: "ICAT Type Approval",
                subtitle: "AIS-037 Compliance",
                id: "CR6816",
                validity: "Issued: 02/09/2024",
              },
            ].map((cert, i) => (
              <ScrollReveal key={cert.title} delay={i * 120}>
                <div
                  className="group rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background:
                      "linear-gradient(145deg, hsl(230 20% 10%), hsl(230 25% 6%))",
                    border: "1px solid hsl(275 80% 55% / 0.2)",
                    boxShadow: "0 4px 24px hsl(230 25% 4% / 0.4)",
                  }}
                >
                  <div className="bg-white overflow-hidden h-[220px] md:h-[260px]">
                    <img
                      src={cert.img}
                      alt={cert.alt}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 md:p-6 border-t border-border/30">
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">
                      {cert.subtitle}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] text-muted-foreground/80">
                      <span className="font-mono">{cert.id}</span>
                      <span className="opacity-40">·</span>
                      <span>{cert.validity}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PageCTAFooter
        headline="Let's Build."
        tagline="Talk to our team. See what NEMI can do for your operations."
        buttonText="Get Started"
        buttonHref="/services"
      />
    </div>
  );
};

export default AboutUs;
