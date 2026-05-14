"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import SiteFooter from "@/components/SiteFooter";
import useScrollProgress from "@/hooks/useScrollProgress";
import designReleaseImg from "@/assets/design-release.webp";
import developToolingImg from "@/assets/develop-tooling.webp";
import distributeWarehousingImg from "@/assets/distribute-warehousing.webp";

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/* ═══════════════════ DATA ═══════════════════ */

const HARDWARE_PHASES = [
  { label: "Design", color: "0 72% 58%", points: ["Siloed tools", "Highly iterative", "High cost of failure"], image: designReleaseImg, imageAlt: "Motorcycle CAD design release for production" },
  { label: "Develop", color: "215 75% 60%", points: ["High investments", "Long lead time", "Fragmented suppliers"], image: developToolingImg, imageAlt: "Manual tooling and manufacturing process" },
  { label: "Distribute", color: "152 60% 45%", points: ["No feedback loop", "Aftersales complexities", "Extensive effort"], image: distributeWarehousingImg, imageAlt: "Manual warehousing and delivery process" },
];

const JOURNEY_STEPS = [
  { tag: "Intent", title: "Build BYD for India", sub: "Vertically integrated EV manufacturing", accent: "275 80% 65%" },
  { tag: "Reality", title: "Plans met reality", sub: "2yr → 4+yr · $5M → $10M · Near-death events", accent: "268 75% 60%" },
  { tag: "Insight", title: "Hardware Remains Hard", sub: "Non-compounding: more revenue = more capital", accent: "260 70% 58%" },
  { tag: "Breakthrough", title: "AI changed everything", sub: "Years → months · Factories → data engines", accent: "252 75% 62%" },
  { tag: "Outcome", title: "3k → 300k sq ft", sub: "35+ enterprise customers · Built to compound", accent: "275 85% 65%" },
];

interface TeamMember {
  name: string;
  photo: string;
  role: string;
  desc: string;
  colorHsl: string;
  linkedin?: string;
}

const CORE_TEAM: TeamMember[] = [
  { name: "Anirudh Ravi Narayanan", photo: "/Images/team/Anirudh%20Ravi%20Narayanan.webp", role: "Chief Executive Officer", desc: "Built Nemi from a garage to 300k sq ft and $15M ARR; led 10+ recovery and margin transformations at McKinsey. BS ECE Rose-Hulman, MBA Yale.", colorHsl: "275 85% 65%", linkedin: "https://www.linkedin.com/in/anirudh-narayanan-26b0a121/" },
  { name: "Gokul Madhavan", photo: "/Images/team/Gokul%20Madhavan.webp", role: "Chief Financial Officer", desc: "Supported M&A integrations, built digital finance ops, led digital transformations. A.B., PhD from Harvard, MBA from Yale.", colorHsl: "268 82% 62%" },
  { name: "Shreerith Seshadri", photo: "/Images/team/Sreeridh%20Seshahri.webp", role: "Chief Technology Officer", desc: "Deployed AI systems used by 100M+ users, shaped early architecture at eightfold.AI. CS, UIUC.", colorHsl: "282 78% 60%" },
  { name: "Vinoth Thiruvenkatasamy", photo: "/Images/team/Vinoth%20Thiruvenkatasamy.webp", role: "Chief Operating Officer", desc: "20+ years in automotive manufacturing. Scaled production lines from pilot to 100K+ units multiple times.", colorHsl: "272 80% 58%" },
];

const EXTENDED_TEAM: TeamMember[] = [
  { name: "Subramanian Rangaswamy", photo: "/Images/team/Subramanian%20R.webp", role: "CFO, India", desc: "Chartered & Cost Accountant with 27+ years in manufacturing across auto, industrial, and consumer goods.", colorHsl: "275 55% 52%" },
  { name: "Vijay Ragavalu", photo: "/Images/team/Vijay%20Ragavalu.webp", role: "President, AKIO Suite", desc: "30+ years in manufacturing leadership, automation, operational optimization, and large-scale team management.", colorHsl: "282 50% 48%" },
  { name: "Sadasivam Balasubramaniam", photo: "/Images/team/Sadasivam%20Balasubramanian.webp", role: "President, AKIO Suite", desc: "20 years in electronics product development across telematics, defense, aerospace, and factory automation.", colorHsl: "272 48% 50%" },
  { name: "Vijay Ramakrishnan", photo: "/Images/team/Vijay%20RamaKrishnan.webp", role: "President, SAM", desc: "15+ years in Sales & Marketing across automotive, finance, and tourism. Built and led 100+ person sales teams.", colorHsl: "278 53% 49%" },
];

const BOARD = [
  { photo: "/Images/team/Sam%20Swaminathan.webp", name: "Sam Swaminathan", title: "Non-Executive Board Member", color: "282 38% 41%", desc: "General Partner, De La Crème Ventures. Ex-SVP Fractal Analytics. IIT Madras alumnus." },
  { photo: "/Images/team/Naoya%20Nishimura.webp", name: "Naoya Nishimura", title: "Non-Executive Board Member", color: "272 36% 39%", desc: "CEO, Musashi Auto Parts India. Leads EV expansion for Musashi Seimitsu in India & Africa." },
];

const ADVISORS = [
  { photo: "/Images/team/Sampath%20Ravi%20Narayanan.webp", name: "Dr. Sampath Ravinarayanan", title: "Board Advisor", color: "275 30% 38%", highlights: ["Founder, Microcon; Chairman & MD, Axis CADES", "Fmr. Board: Air India, Airbus India, KPTCL"] },
  { photo: "/Images/team/Ramesh%20Mangaleshwaran.webp", name: "Ramesh Mangaleshwaran", title: "Advisor", color: "268 28% 36%", highlights: ["Senior Partner Emeritus, McKinsey & Company (30 yrs)", "Co-led Industrials Practice, India & Asia"] },
  { photo: "/Images/team/Vinod%20K%20Dasari.webp", name: "Vinod K. Dasari", title: "Advisor", color: "282 26% 35%", highlights: ["Fmr. MD & CEO, Ashok Leyland & Royal Enfield", "Led global innovation & international expansion"] },
];

const MOATS = [
  { num: "01", color: "275 85% 65%", title: "Sovereign Manufacturing", desc: "Edge AI within national borders: full data sovereignty." },
  { num: "02", color: "272 78% 58%", title: "Extreme Capital Efficiency", desc: "US-level engineering quality at 20% US-level cost." },
  { num: "03", color: "269 70% 52%", title: "The LMM Advantage", desc: "Proprietary AI stack that gets smarter with each job." },
  { num: "04", color: "266 62% 46%", title: "End-to-End Integration", desc: "One partner from design to deployment." },
  { num: "05", color: "263 55% 40%", title: "AI Retrofit for Legacy", desc: "Upgrade existing factories with our AI stack." },
  { num: "06", color: "260 48% 35%", title: "Mid-Market Focus", desc: "Physical AI for the markets enterprise vendors ignore." },
];

const LOGO_ROW1 = [
  { src: "/Images/logos/samsung.webp", label: "Samsung" },
  { src: "/Images/logos/tata.webp", label: "Tata" },
  { src: "/Images/logos/lamborghini.webp", label: "Lamborghini" },
  { src: "/Images/logos/whirlpool.webp", label: "Whirlpool" },
  { src: "/Images/logos/abb.webp", label: "ABB" },
  { src: "/Images/logos/caterpillar.webp", label: "Caterpillar" },
  { src: "/Images/logos/boeing.webp", label: "Boeing" },
  { src: "/Images/logos/ashok-leyland.webp", label: "Ashok Leyland" },
];

const LOGO_ROW2 = [
  { src: "/Images/logos/royal-enfield.webp", label: "Royal Enfield" },
  { src: "/Images/logos/exide.webp", label: "Exide" },
  { src: "/Images/logos/flipkart.webp", label: "Flipkart" },
  { src: "/Images/logos/zomato.webp", label: "Zomato" },
  { src: "/Images/logos/rapido.webp", label: "Rapido" },
  { src: "/Images/logos/tvs-mobility.webp", label: "TVS Mobility" },
  { src: "/Images/logos/mahindra.webp", label: "Mahindra" },
  { src: "/Images/logos/ducati.webp", label: "Ducati" },
];

/* ═══════════════════ SUB-COMPONENTS ═══════════════════ */

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.42v1.56h.05c.48-.91 1.65-1.86 3.4-1.86 3.64 0 4.3 2.4 4.3 5.52v6.23zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.53C0 23.22.79 24 1.77 24h20.45c.98 0 1.77-.78 1.77-1.74V1.73C24 .78 23.21 0 22.22 0z" />
  </svg>
);

const LeaderFlipCard = ({ member }: { member: TeamMember }) => {
  const [hovered, setHovered] = useState(false);
  const parts = member.name.trim().split(/\s+/);
  const last = parts.pop() || "";
  const first = parts.join(" ");

  return (
    <div
      className="w-full cursor-pointer h-[140px] md:h-[170px]"
      style={{ perspective: "1000px", contain: "paint" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transformStyle: "preserve-3d", transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border flex flex-col items-center justify-center px-3 py-3"
          style={{
            backfaceVisibility: "hidden",
            borderColor: `hsl(${member.colorHsl} / 0.3)`,
            background: `linear-gradient(135deg, hsl(${member.colorHsl} / 0.08), hsl(var(--card) / 0.7))`,
          }}
        >
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden mb-1.5 flex-shrink-0"
            style={{ border: `1.5px solid hsl(${member.colorHsl} / 0.45)` }}
          >
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>
          <h3 className="text-[11px] md:text-sm font-semibold text-foreground text-center leading-tight">
            <span className="block">{first || last}</span>
            <span className="block">{first ? last : ""}</span>
          </h3>
          <p className="text-[8px] md:text-[10px] tracking-[0.15em] uppercase font-medium text-center mt-1" style={{ color: `hsl(${member.colorHsl})` }}>
            {member.role}
          </p>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border flex flex-col items-center justify-center p-3 md:p-4"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `hsl(${member.colorHsl} / 0.3)`,
            background: `linear-gradient(135deg, hsl(${member.colorHsl} / 0.1), hsl(var(--card) / 0.85))`,
          }}
        >
          <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: `hsl(${member.colorHsl})` }}>{member.role}</p>
          <p className="text-[9px] md:text-[11px] text-muted-foreground text-center leading-relaxed">{member.desc}</p>
          <a
            href={member.linkedin || "https://www.linkedin.com/company/nemi-ai"}
            target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.15em] opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: `hsl(${member.colorHsl})` }}
          >
            <LinkedInIcon /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */

const AboutUs = () => {
  const scrollProgress = useScrollProgress();

  /* ── Section visibility & animation ── */

  // 1. Hero
  const heroVisible = scrollProgress < 0.08;
  const heroEnter = scrollProgress < 0.005 ? 1 : 1;
  const heroExit = easeOut(rangeProgress(scrollProgress, 0.055, 0.08));
  const heroOp = 1 - heroExit;

  // 2. Solutions
  const solVisible = scrollProgress > 0.06 && scrollProgress < 0.18;
  const solEnter = easeOut(rangeProgress(scrollProgress, 0.065, 0.09));
  const solExit = easeOut(rangeProgress(scrollProgress, 0.155, 0.18));
  const solOp = solEnter * (1 - solExit);

  // 3. Journey
  const jrnVisible = scrollProgress > 0.16 && scrollProgress < 0.31;
  const jrnEnter = easeOut(rangeProgress(scrollProgress, 0.165, 0.20));
  const jrnExit = easeOut(rangeProgress(scrollProgress, 0.285, 0.31));
  const jrnOp = jrnEnter * (1 - jrnExit);
  const jrnCardsP = rangeProgress(scrollProgress, 0.19, 0.27);

  // 4. Our Goal
  const goalVisible = scrollProgress > 0.29 && scrollProgress < 0.38;
  const goalEnter = easeOut(rangeProgress(scrollProgress, 0.295, 0.325));
  const goalExit = easeOut(rangeProgress(scrollProgress, 0.355, 0.38));
  const goalOp = goalEnter * (1 - goalExit);

  // 5. LMM Architecture
  const lmmVisible = scrollProgress > 0.36 && scrollProgress < 0.47;
  const lmmEnter = easeOut(rangeProgress(scrollProgress, 0.365, 0.40));
  const lmmExit = easeOut(rangeProgress(scrollProgress, 0.445, 0.47));
  const lmmOp = lmmEnter * (1 - lmmExit);
  const lmmLayersP = rangeProgress(scrollProgress, 0.38, 0.44);

  // 6. Our Locations
  const locVisible = scrollProgress > 0.45 && scrollProgress < 0.55;
  const locEnter = easeOut(rangeProgress(scrollProgress, 0.455, 0.49));
  const locExit = easeOut(rangeProgress(scrollProgress, 0.525, 0.55));
  const locOp = locEnter * (1 - locExit);
  const locMarkersP = rangeProgress(scrollProgress, 0.475, 0.52);

  // 7. Team (Core + Extended merged)
  const tcVisible = scrollProgress > 0.53 && scrollProgress < 0.69;
  const tcEnter = easeOut(rangeProgress(scrollProgress, 0.535, 0.575));
  const tcExtP = easeOut(rangeProgress(scrollProgress, 0.595, 0.635));
  const tcExit = easeOut(rangeProgress(scrollProgress, 0.665, 0.69));
  const tcOp = tcEnter * (1 - tcExit);

  // 8. Board & Advisors
  const baVisible = scrollProgress > 0.67 && scrollProgress < 0.85;
  const baEnter = easeOut(rangeProgress(scrollProgress, 0.675, 0.72));
  const baExit = easeOut(rangeProgress(scrollProgress, 0.815, 0.85));
  const baOp = baEnter * (1 - baExit);

  // 9. CTA + Footer
  const ctaVisible = scrollProgress > 0.83;
  const ctaEnter = easeOut(rangeProgress(scrollProgress, 0.84, 0.88));

  return (
    <div className="relative" style={{ height: "3350vh" }}>
      <Navbar scrollProgress={scrollProgress} />
      <ConstellationCanvas />

      {/* Purple nebula glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: scrollProgress < 0.08 ? (1 - heroExit) * 0.8 : 0.15,
          background: `
            radial-gradient(ellipse 40% 35% at 50% 45%, hsl(275 80% 40% / 0.25) 0%, transparent 60%),
            radial-gradient(ellipse 55% 45% at 50% 50%, hsl(260 70% 30% / 0.15) 0%, transparent 55%)
          `,
        }}
      />

      {/* ═══ 1. HERO ═══ */}
      {heroVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 10, opacity: heroOp }}
        >
          <div
            className="text-center"
            style={{ transform: `translateY(${heroExit * -80}px)` }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.05] mb-8">
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(275 40% 85%) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px hsl(275 80% 60% / 0.35))",
                }}
              >
                Hardware Remains
              </span>
              <span
                className="block mt-1 md:mt-2"
                style={{
                  background: "linear-gradient(135deg, hsl(275 80% 75%) 0%, hsl(var(--primary)) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 40px hsl(275 80% 60% / 0.5))",
                }}
              >
                Hard.
              </span>
            </h1>
            <div className="w-16 h-px mx-auto mb-6" style={{ background: "linear-gradient(to right, transparent, hsl(275 80% 60% / 0.6), transparent)" }} />
            <p className="text-lg md:text-xl tracking-[0.15em] font-light" style={{ color: "hsl(275 40% 75% / 0.8)" }}>
              We are changing this.
            </p>
          </div>
          {/* Down indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="hsl(275 60% 65%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}

      {/* ═══ 2. SOLUTIONS ═══ */}
      {solVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 20, opacity: solOp, background: "hsl(230 25% 4%)" }}
        >
          <div className="max-w-6xl w-full mx-6 pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HARDWARE_PHASES.map((ph, i) => {
                const cardP = easeOut(Math.min(Math.max((solEnter - i * 0.15) / 0.6, 0), 1));
                return (
                  <div
                    key={ph.label}
                    className="relative rounded-2xl flex flex-col overflow-hidden"
                    style={{
                      opacity: cardP,
                      transform: `translateY(${(1 - cardP) * 40}px)`,
                      border: `1px solid hsl(${ph.color} / 0.15)`,
                      background: "hsl(220 20% 7% / 0.8)",
                    }}
                  >
                    <div className="relative overflow-hidden" style={{ height: "160px", background: "hsl(220 20% 6%)" }}>
                      <img src={ph.image} alt={ph.imageAlt} loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ filter: "brightness(0.7) saturate(0.85)" }} />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, hsl(220 20% 7%) 100%)" }} />
                    </div>
                    <div className="flex flex-col px-5 pb-4 pt-3 gap-2">
                      <span className="text-base tracking-[0.18em] uppercase font-semibold" style={{ color: `hsl(${ph.color})`, lineHeight: 1 }}>{ph.label}</span>
                      <div className="h-px" style={{ background: `hsl(${ph.color} / 0.12)` }} />
                      <ul className="flex flex-col gap-1.5 mt-1">
                        {ph.points.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-sm text-foreground/90">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: `hsl(${ph.color})` }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ 3. JOURNEY ═══ */}
      {jrnVisible && (
        <div
          className="fixed inset-0 flex flex-col pointer-events-none"
          style={{ zIndex: 20, opacity: jrnOp, background: "hsl(230 25% 4%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 50% at 50% 50%, hsl(275 80% 40% / 0.08) 0%, transparent 65%)" }}
          />

          <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-10 relative z-[2] pointer-events-auto">
            {/* Heading */}
            <div className="text-center mb-8 md:mb-12" style={{ opacity: jrnEnter, transform: `translateY(${(1 - jrnEnter) * 25}px)` }}>
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-4" style={{ color: "hsl(275 60% 65%)" }}>Our Journey</p>
              <h2 className="text-2xl md:text-4xl lg:text-[2.8rem] font-extrabold tracking-tight leading-[1.08]">
                We didn't start with Physical AI.
              </h2>
              <p className="text-sm md:text-base text-muted-foreground tracking-wide mt-3 max-w-xl mx-auto">
                We fought our way through the trenches of manufacturing.
              </p>
            </div>

            {/* Process flow — 5 cards, larger, no arrows */}
            <div className="w-full max-w-[1280px] relative hidden md:grid grid-cols-5 gap-4">
              {JOURNEY_STEPS.map((step, i) => {
                const cardDelay = i * 0.08;
                const cardP = easeOut(Math.min(Math.max((jrnCardsP - cardDelay) / 0.35, 0), 1));
                return (
                  <div
                    key={step.tag}
                    className="rounded-2xl px-5 py-6 flex flex-col"
                    style={{
                      opacity: cardP,
                      transform: `translateY(${(1 - cardP) * 25}px)`,
                      background: `linear-gradient(155deg, hsl(${step.accent} / 0.14), hsl(230 22% 8% / 0.95))`,
                      border: `1px solid hsl(${step.accent} / 0.32)`,
                      boxShadow: `0 0 28px hsl(${step.accent} / 0.12), inset 0 1px 0 hsl(0 0% 100% / 0.05)`,
                      minHeight: "230px",
                    }}
                  >
                    <span
                      className="inline-block w-10 h-[3px] mb-4 rounded-full"
                      style={{ background: `hsl(${step.accent})`, boxShadow: `0 0 12px hsl(${step.accent} / 0.6)` }}
                    />
                    <p
                      className="text-[12px] tracking-[0.32em] uppercase font-bold mb-3"
                      style={{ color: `hsl(${step.accent})` }}
                    >
                      {step.tag}
                    </p>
                    <h3 className="text-[18px] lg:text-[20px] font-bold text-foreground leading-tight mb-3">{step.title}</h3>
                    <p className="text-[13px] lg:text-[14px] text-muted-foreground leading-relaxed">{step.sub}</p>
                  </div>
                );
              })}
            </div>

            {/* Mobile: stacked cards, larger, no arrows */}
            <div className="w-full flex md:hidden flex-col gap-3">
              {JOURNEY_STEPS.map((step, i) => {
                const cardDelay = i * 0.1;
                const cardP = easeOut(Math.min(Math.max((jrnCardsP - cardDelay) / 0.35, 0), 1));
                return (
                  <div
                    key={step.tag}
                    className="rounded-xl px-5 py-4"
                    style={{
                      opacity: cardP,
                      transform: `translateX(${(1 - cardP) * -20}px)`,
                      background: `linear-gradient(155deg, hsl(${step.accent} / 0.14), hsl(230 22% 8%))`,
                      border: `1px solid hsl(${step.accent} / 0.28)`,
                    }}
                  >
                    <span
                      className="inline-block w-9 h-[3px] mb-3 rounded-full"
                      style={{ background: `hsl(${step.accent})` }}
                    />
                    <p className="text-[11px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: `hsl(${step.accent})` }}>{step.tag}</p>
                    <h3 className="text-[17px] font-bold text-foreground leading-tight mb-1.5">{step.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{step.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ 4. OUR GOAL ═══ */}
      {goalVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 20, opacity: goalOp, background: "hsl(230 25% 4%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 50% 45% at 50% 50%, hsl(275 80% 40% / 0.1) 0%, transparent 60%)" }}
          />
          <div className="max-w-5xl w-full mx-6 md:mx-auto md:px-6 relative z-[2] pointer-events-auto text-center">
            <div style={{ opacity: goalEnter, transform: `translateY(${(1 - goalEnter) * 20}px)` }}>
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-3" style={{ color: "hsl(275 60% 65%)" }}>
                Our Goal
              </p>
              <h2
                className="text-xl md:text-3xl lg:text-[2rem] font-extrabold tracking-tight leading-[1.15] mb-5"
                style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
              >
                Make manufacturing{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, hsl(275 80% 75%), hsl(var(--primary)))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  compound.
                </span>
              </h2>

              <div className="space-y-3 max-w-3xl mx-auto">
                <p className="text-xs md:text-sm text-muted-foreground/90 leading-relaxed">
                  In software, every line of code compounds — build once, deploy infinitely, and each user makes the product smarter.
                  Manufacturing has never worked this way. More revenue has always meant more machines, more capital, more people — linearly.
                </p>
                <p className="text-xs md:text-sm text-foreground/90 leading-relaxed">
                  We're changing the equation. Our AI stack turns every factory job into training data, every production run into a
                  feedback loop. The more we manufacture, the smarter the system gets — and the faster, cheaper, and better the next job becomes.
                </p>
              </div>

              {/* Compound vs Linear visual */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto text-left">
                <div
                  className="rounded-xl px-4 py-3"
                  style={{
                    background: "hsl(230 20% 8% / 0.6)",
                    border: "1px solid hsl(0 60% 45% / 0.2)",
                  }}
                >
                  <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-1.5" style={{ color: "hsl(0 60% 55%)" }}>Traditional</p>
                  <p className="text-sm md:text-base font-bold text-foreground mb-1">Linear growth</p>
                  <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                    2× revenue requires 2× capital, 2× people, 2× machines. Every project starts from scratch.
                  </p>
                </div>
                <div
                  className="rounded-xl px-4 py-3"
                  style={{
                    background: "linear-gradient(145deg, hsl(275 80% 40% / 0.12), hsl(230 20% 8% / 0.6))",
                    border: "1px solid hsl(275 80% 55% / 0.3)",
                    boxShadow: "0 0 30px hsl(275 80% 55% / 0.06)",
                  }}
                >
                  <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-1.5" style={{ color: "hsl(275 80% 65%)" }}>With NEMI</p>
                  <p className="text-sm md:text-base font-bold text-foreground mb-1">Compounding growth</p>
                  <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
                    Every job trains the LMM. Factories become data engines. Speed and margin improve with each cycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ 5. LMM SYSTEM ARCHITECTURE ═══ */}
      {lmmVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 20, opacity: lmmOp, background: "hsl(230 25% 4%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 50% at 50% 45%, hsl(275 80% 40% / 0.08) 0%, transparent 60%)" }}
          />
          <div className="w-full px-4 md:px-10 lg:px-16 relative z-[2] pointer-events-auto">
            {/* Title */}
            <div className="mb-6" style={{ opacity: lmmEnter, transform: `translateY(${(1 - lmmEnter) * 20}px)` }}>
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-3" style={{ color: "hsl(275 60% 65%)" }}>
                The Stack
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight" style={{ textShadow: "0 0 25px hsl(275 80% 60% / 0.3)" }}>
                LMM System Architecture
              </h2>
            </div>

            {/* Architecture stack */}
            <div className="max-w-[1100px] mx-auto space-y-2" style={{ opacity: lmmEnter }}>
              {/* Layer 1: PARLEY — darkest purple */}
              {(() => {
                const p = easeOut(Math.min(Math.max((lmmLayersP - 0) / 0.2, 0), 1));
                return (
                  <div
                    className="rounded-lg px-5 py-3 text-center"
                    style={{
                      opacity: p,
                      transform: `translateY(${(1 - p) * 15}px)`,
                      background: "linear-gradient(to top, #8E26D9 0%, #4A0E78 60%, #2E0855 100%)",
                      border: "1px solid rgba(180, 100, 240, 0.4)",
                      boxShadow: "0 4px 20px rgba(60, 14, 100, 0.45), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
                    }}
                  >
                    <span className="text-sm md:text-base font-black tracking-wider text-white">PARLEY</span>
                    <span className="text-[11px] md:text-xs text-white/85 ml-3">
                      Universal Interface &nbsp;|&nbsp; Chat · Voice · AR · VR &nbsp;|&nbsp; Multilingual
                    </span>
                  </div>
                );
              })()}

              {/* Layer 2: Three platform columns — slightly lighter purple */}
              {(() => {
                const p = easeOut(Math.min(Math.max((lmmLayersP - 0.08) / 0.25, 0), 1));
                const platforms = [
                  { name: "DESIGN", sub: "Design Platform", color: "#3B82F6", alpha: 0.7, tools: [{ bold: "Lumos", desc: "Ideation" }, { bold: "Manvil", desc: "Mechanical CAD" }, { bold: "Volt", desc: "Electronics CAD" }] },
                  { name: "DEVELOP", sub: "Develop Platform", color: "#EF4444", alpha: 0.7, tools: [{ bold: "Forge", desc: "Digital Twin + MES" }, { bold: "Legion", desc: "Robotics" }, { bold: "Hawkeye", desc: "Vision + Data" }] },
                  { name: "DELIVER", sub: "Deliver Platform", color: "#22C55E", alpha: 0.7, tools: [{ bold: "Quartermaster", desc: "WMS + Fleet" }, { bold: "Exchequer", desc: "Leasing + Finance" }, { bold: "Atom", desc: "IoT" }] },
                ];
                return (
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{
                      opacity: p,
                      transform: `translateY(${(1 - p) * 15}px)`,
                      background: "linear-gradient(180deg, rgba(60, 14, 100, 0.6), rgba(40, 8, 70, 0.55))",
                      border: "1px solid rgba(142, 38, 217, 0.35)",
                      padding: "10px",
                      boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.04)",
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {platforms.map((pl) => (
                        <div
                          key={pl.name}
                          className="rounded-lg px-4 py-4"
                          style={{
                            background: "linear-gradient(to top, #7A1ECC 0%, #3E0B6B 65%, #25064A 100%)",
                            border: "1px solid rgba(170, 90, 230, 0.32)",
                            boxShadow: "0 3px 14px rgba(50, 12, 90, 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
                          }}
                        >
                          <h3 className="text-base md:text-lg font-black tracking-widest text-center mb-0.5" style={{ color: pl.color, textShadow: `0 0 12px ${pl.color}55` }}>{pl.name}</h3>
                          <p className="text-[10px] text-white/80 text-center mb-3">{pl.sub}</p>
                          <ul className="space-y-1.5">
                            {pl.tools.map((t) => (
                              <li key={t.bold} className="text-[12px] text-white">
                                <span className="mr-1.5" style={{ color: pl.color }}>•</span>
                                <span className="font-bold">{t.bold}</span>
                                <span className="text-white/75 ml-1.5">{t.desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Bottom layers: dark with subtle bright accent at bottom — progressively dimmer going down */}
              {[
                { delay: 0.2, label: "6 AGENTS", items: "Taskmaster · Craftsman · Sommelier · Far-Seer · Dispatcher · Trainer", bg: "linear-gradient(to top, #6014A8 0%, #2E0855 70%, #1A0438 100%)", border: "rgba(150, 80, 210, 0.3)" },
                { delay: 0.28, label: "PHYSICAL AI FOUNDATION MODELS (PAFMs)", items: "Geometry FM · Process FM · Vision Models · RL Policy Networks · Reward Model", bg: "linear-gradient(to top, #4A0F85 0%, #220648 70%, #14032D 100%)", border: "rgba(130, 65, 190, 0.26)" },
                { delay: 0.36, label: "DATA INFRASTRUCTURE", items: "Sensor Streams · Data Lake · Feature Store · RL Feedback Loop · Model Registry", bg: "linear-gradient(to top, #350B68 0%, #18043A 70%, #0E0224 100%)", border: "rgba(110, 55, 165, 0.22)" },
                { delay: 0.44, label: "PHYSICAL & EDGE INFRASTRUCTURE", items: "Factory Sensors & Actuators · Edge Compute · Machines & Robots · On-Prem + Cloud Hybrid", bg: "linear-gradient(to top, #25084E 0%, #11032D 70%, #08011B 100%)", border: "rgba(95, 45, 145, 0.2)" },
              ].map((layer) => {
                const p = easeOut(Math.min(Math.max((lmmLayersP - layer.delay) / 0.2, 0), 1));
                return (
                  <div
                    key={layer.label}
                    className="rounded-lg px-5 py-2.5 flex flex-wrap items-center gap-x-3 gap-y-1"
                    style={{
                      opacity: p,
                      transform: `translateY(${(1 - p) * 12}px)`,
                      background: layer.bg,
                      border: `1px solid ${layer.border}`,
                      boxShadow: "0 3px 14px rgba(40, 8, 70, 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
                    }}
                  >
                    <span className="text-[10px] md:text-[11px] font-black tracking-[0.15em] uppercase text-white shrink-0">
                      {layer.label}
                    </span>
                    <span className="text-[10px] md:text-[11px] text-white/85">
                      {layer.items}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ 6. OUR LOCATIONS ═══ */}
      {locVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 20, opacity: locOp, background: "hsl(230 25% 4%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(275 80% 40% / 0.10) 0%, transparent 65%)" }}
          />

          <div className="max-w-5xl w-full mx-6 pointer-events-auto relative z-[2] flex flex-col items-center" style={{ maxHeight: "90vh", marginTop: "40px" }}>
            {/* Heading */}
            <div className="text-center mb-3 md:mb-4" style={{ opacity: locEnter, transform: `translateY(${(1 - locEnter) * 20}px)` }}>
              <h2 className="text-xl md:text-3xl lg:text-[2rem] font-extrabold tracking-tight">
                Our Locations
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground tracking-wide mt-2 max-w-xl mx-auto">
                Manufacturing today from India. Expanding to three new regions in 2026.
              </p>
            </div>

            {/* World map */}
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{
                opacity: locEnter,
                transform: `translateY(${(1 - locEnter) * 20}px)`,
                background: "linear-gradient(180deg, hsl(270 35% 8% / 0.6), hsl(255 30% 6% / 0.6))",
                border: "1px solid hsl(275 40% 30% / 0.25)",
                boxShadow: "0 0 60px hsl(275 80% 40% / 0.12), inset 0 0 40px hsl(275 50% 20% / 0.15)",
                maxHeight: "60vh",
              }}
            >
              {/* World map background image */}
              <img
                src="/Images/world-map.png"
                alt=""
                className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
                style={{
                  opacity: 0.5,
                  filter: "brightness(0) saturate(100%) invert(75%)",
                }}
                draggable={false}
              />
              <svg viewBox="0 0 1280 836" className="relative w-full block" style={{ aspectRatio: "1280 / 836", maxHeight: "60vh" }}>
                <defs>
                  <radialGradient id="loc-active-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(275 90% 70%)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="hsl(275 90% 60%)" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="loc-upcoming-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(200 80% 70%)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="hsl(200 80% 60%)" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* === UPCOMING MARKERS (2026) === */}
                {[
                  { x: 90, y: 190, label: "United States", delay: 0.15 },
                  { x: 680, y: 240, label: "Western Europe", delay: 0.25 },
                  { x: 845, y: 355, label: "Middle East", delay: 0.35 },
                ].map((m) => {
                  const p = easeOut(Math.min(Math.max((locMarkersP - m.delay) / 0.3, 0), 1));
                  return (
                    <g key={m.label} style={{ opacity: p }}>
                      {/* Outer pulse ring */}
                      <circle cx={m.x} cy={m.y} r="22" fill="url(#loc-upcoming-glow)" opacity="0.6">
                        <animate attributeName="r" values="18;30;18" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
                      </circle>
                      {/* Dashed marker */}
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r="11"
                        fill="hsl(230 25% 6%)"
                        stroke="hsl(200 80% 65%)"
                        strokeWidth="2"
                        strokeDasharray="4 2.5"
                      />
                      <circle cx={m.x} cy={m.y} r="3.5" fill="hsl(200 80% 70%)" />
                      {/* Label badge */}
                      <g>
                        <rect
                          x={m.x - 65}
                          y={m.y + 18}
                          width="130"
                          height="34"
                          rx="7"
                          fill="hsl(230 25% 8% / 0.95)"
                          stroke="hsl(200 80% 60% / 0.4)"
                          strokeWidth="0.8"
                        />
                        <text
                          x={m.x}
                          y={m.y + 33}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="700"
                          fill="hsl(200 80% 80%)"
                          letterSpacing="0.5"
                        >
                          {m.label.toUpperCase()}
                        </text>
                        <text
                          x={m.x}
                          y={m.y + 46}
                          textAnchor="middle"
                          fontSize="9"
                          fontWeight="600"
                          fill="hsl(200 60% 70%)"
                          letterSpacing="1.5"
                        >
                          2026
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* === ACTIVE MARKERS (India) === */}
                {[
                  { x: 1037, y: 420, name: "Coimbatore", delay: 0 },
                  { x: 1051, y: 405, name: "Chennai", delay: 0.05 },
                ].map((m) => {
                  const p = easeOut(Math.min(Math.max((locMarkersP - m.delay) / 0.25, 0), 1));
                  return (
                    <g key={m.name} style={{ opacity: p }}>
                      {/* Big glow */}
                      <circle cx={m.x} cy={m.y} r="30" fill="url(#loc-active-glow)" opacity="0.9">
                        <animate attributeName="r" values="24;38;24" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r="9"
                        fill="hsl(275 85% 65%)"
                        stroke="hsl(275 100% 90%)"
                        strokeWidth="2"
                      />
                      <circle cx={m.x} cy={m.y} r="3" fill="hsl(0 0% 100%)" />
                    </g>
                  );
                })}

                {/* India combined label */}
                {(() => {
                  const p = easeOut(Math.min(Math.max((locMarkersP - 0.05) / 0.25, 0), 1));
                  return (
                    <g style={{ opacity: p }}>
                      <line x1="1059" y1="415" x2="1169" y2="455" stroke="hsl(275 80% 65% / 0.7)" strokeWidth="1.5" />
                      <rect
                        x="1169"
                        y="430"
                        width="220"
                        height="58"
                        rx="10"
                        fill="hsl(275 70% 22% / 0.95)"
                        stroke="hsl(275 80% 60%)"
                        strokeWidth="1.4"
                      />
                      <text x="1279" y="453" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(275 80% 80%)" letterSpacing="2.5">
                        INDIA · ACTIVE
                      </text>
                      <text x="1279" y="475" textAnchor="middle" fontSize="14" fontWeight="800" fill="hsl(0 0% 100%)">
                        Coimbatore · Chennai
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Legend — Coming Soon */}
            <div
              className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-4"
              style={{ opacity: locEnter, transform: `translateY(${(1 - locEnter) * 12}px)` }}
            >
              <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: "hsl(200 70% 75%)" }}>
                Coming Soon
              </span>
              <span className="w-6 h-px" style={{ background: "hsl(200 60% 50% / 0.5)" }} />
              {["United States", "Western Europe", "Middle East"].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{
                      border: "1.5px dashed hsl(200 80% 65%)",
                      background: "hsl(230 25% 6%)",
                    }}
                  />
                  <span className="text-xs md:text-sm font-semibold text-foreground/85">{label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ═══ 7. TEAM (Core + Extended) ═══ */}
      {tcVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 20, opacity: tcOp, background: "hsl(230 25% 4%)" }}
        >
          <div className="max-w-6xl w-full mx-6 pointer-events-auto text-center" style={{ maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ opacity: tcEnter, transform: `translateY(${(1 - tcEnter) * 20}px)` }}>
              <p className="text-xs tracking-[0.4em] uppercase text-primary/80 mb-2 font-bold">Who We Are</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-wider mb-2" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>Team</h2>
              <p className="text-xs md:text-sm text-muted-foreground tracking-wide mb-6 max-w-2xl mx-auto">
                Leadership team that built manufacturing at scale and AI systems at scale, now combining both.
              </p>
            </div>

            {/* Core Team grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6">
              {CORE_TEAM.map((m, i) => {
                const cp = easeOut(Math.min(Math.max((tcEnter - i * 0.08) / 0.5, 0), 1));
                return (
                  <div key={m.name} style={{ opacity: cp, transform: `translateY(${(1 - cp) * 25}px)` }}>
                    <LeaderFlipCard member={m} />
                  </div>
                );
              })}
            </div>

            {/* Extended Leadership subheading */}
            <div className="mb-3" style={{ opacity: tcExtP, transform: `translateY(${(1 - tcExtP) * 15}px)` }}>
              <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground font-bold">Extended Leadership</p>
            </div>

            {/* Extended Team grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
              {EXTENDED_TEAM.map((m, i) => {
                const cp = easeOut(Math.min(Math.max((tcExtP - i * 0.08) / 0.5, 0), 1));
                return (
                  <div key={m.name} style={{ opacity: cp, transform: `translateY(${(1 - cp) * 25}px)` }}>
                    <LeaderFlipCard member={m} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ 6. BOARD & ADVISORS ═══ */}
      {baVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 20, opacity: baOp, background: "hsl(230 25% 4%)" }}
        >
          <div className="max-w-5xl w-full mx-6 pointer-events-auto">
            <div className="text-center mb-8" style={{ opacity: baEnter, transform: `translateY(${(1 - baEnter) * 20}px)` }}>
              <p className="text-xs tracking-[0.4em] uppercase text-primary/80 mb-3 font-bold">Who We Are</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-wider mb-2" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>Board & Advisors</h2>
              <p className="text-sm text-muted-foreground">Guided by operators who scaled global enterprises.</p>
            </div>

            {/* Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {BOARD.map((m, i) => {
                const cp = easeOut(Math.min(Math.max((baEnter - i * 0.1) / 0.6, 0), 1));
                return (
                  <div
                    key={m.name}
                    className="rounded-xl p-4 flex items-start gap-4"
                    style={{ opacity: cp, transform: `translateY(${(1 - cp) * 20}px)`, background: "hsl(230 20% 8% / 0.6)", border: `1px solid hsl(${m.color} / 0.2)` }}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: `1px solid hsl(${m.color} / 0.3)` }}>
                      <img src={m.photo} alt={m.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">{m.name}</p>
                      <p className="text-[9px] tracking-[0.12em] uppercase font-semibold mb-1" style={{ color: `hsl(${m.color})` }}>{m.title}</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Advisors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ADVISORS.map((a, i) => {
                const cp = easeOut(Math.min(Math.max((baEnter - (i + 2) * 0.08) / 0.5, 0), 1));
                return (
                  <div
                    key={a.name}
                    className="rounded-xl p-4 flex flex-col"
                    style={{ opacity: cp, transform: `translateY(${(1 - cp) * 20}px)`, background: "hsl(230 20% 8% / 0.6)", border: `1px solid hsl(${a.color} / 0.2)` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ border: `1px solid hsl(${a.color} / 0.3)` }}>
                        <img src={a.photo} alt={a.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-foreground">{a.name}</p>
                        <p className="text-[8px] tracking-[0.12em] uppercase font-semibold" style={{ color: `hsl(${a.color})` }}>{a.title}</p>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-1">
                      {a.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-1.5 text-[10px] text-muted-foreground leading-relaxed">
                          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: `hsl(${a.color})` }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ 9. CTA + FOOTER ═══ */}
      {ctaVisible && (
        <div
          className="fixed inset-0 flex flex-col pointer-events-auto overflow-y-auto"
          style={{ zIndex: 45, opacity: ctaEnter, background: "hsl(230 25% 4%)" }}
        >
          <div className="flex-1 flex flex-col items-center justify-center relative px-6">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 45% 50% at 50% 45%, hsl(275 80% 40% / 0.2) 0%, transparent 60%)" }}
            />

            {/* CTA */}
            <div className="text-center relative z-[2] max-w-2xl">
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-4" style={{ color: "hsl(275 60% 65%)" }}>
                Careers
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6" style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5)" }}>
                Join Our Team.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                We're hiring across engineering, manufacturing and AI. Build the future of Physical AI with us.
              </p>
              <a
                href="/careers"
                className="inline-block font-bold text-sm tracking-[0.2em] uppercase px-12 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-primary-foreground"
                style={{ background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))", boxShadow: "0 4px 30px hsl(275 80% 60% / 0.4)" }}
              >
                View Open Roles
              </a>
              <div className="mt-6">
                <a href="mailto:careers@nemi-ai.com" className="text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors">careers@nemi-ai.com</a>
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      )}

      {/* Crawlable footer for SEO */}
      <footer className="sr-only" aria-label="Site navigation for crawlers">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/technology">Technology</a></li>
            <li><a href="/about">About NEMI AI</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default AboutUs;
