"use client";

import { useState } from "react";

interface LeadershipSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface CoreMember {
  name: string;
  photo?: string;
  initials?: string;
  role: string;
  desc: string;
  colorHsl: string;
  linkedin?: string;
}

interface CompactMember {
  name: string;
  photo?: string;
  initials: string;
  role: string;
  desc: string;
  color: string;
}

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.42v1.56h.05c.48-.91 1.65-1.86 3.4-1.86 3.64 0 4.3 2.4 4.3 5.52v6.23zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.53C0 23.22.79 24 1.77 24h20.45c.98 0 1.77-.78 1.77-1.74V1.73C24 .78 23.21 0 22.22 0z" />
  </svg>
);

const CoreCard = ({ member }: { member: CoreMember }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full cursor-pointer"
      style={{ perspective: "1000px", height: "245px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transformStyle: "preserve-3d", transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border flex flex-col items-center pt-3 pb-3 px-2"
          style={{
            backfaceVisibility: "hidden",
            borderColor: `hsl(${member.colorHsl} / 0.3)`,
            background: `linear-gradient(135deg, hsl(${member.colorHsl} / 0.08), hsl(var(--card) / 0.7))`,
          }}
        >
          <div
            className="rounded-full mb-2 flex items-center justify-center shrink-0"
            style={{ width: "4.2rem", height: "4.2rem", background: `radial-gradient(circle, hsl(${member.colorHsl} / 0.2) 50%, transparent 72%)` }}
          >
            <div
              className="rounded-full overflow-hidden flex items-center justify-center"
              style={{ width: "3.4rem", height: "3.4rem", border: `1.5px solid hsl(${member.colorHsl} / 0.45)`, background: member.photo ? "transparent" : `hsl(${member.colorHsl} / 0.15)` }}
            >
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              ) : (
                <span className="font-black text-base" style={{ color: `hsl(${member.colorHsl})` }}>{member.initials}</span>
              )}
            </div>
          </div>
          <h3
            className="text-sm font-semibold text-foreground tracking-wide text-center leading-tight"
            style={{ textShadow: `0 0 12px hsl(${member.colorHsl} / 0.4)` }}
          >
            {member.name}
          </h3>
          <p
            className="text-[10px] tracking-[0.15em] uppercase font-medium text-center mt-1"
            style={{ color: `hsl(${member.colorHsl})`, lineHeight: "1.4" }}
          >
            {member.role}
          </p>
          <p className="text-[11px] leading-snug text-muted-foreground text-center mt-2 px-1 line-clamp-4">
            {member.desc}
          </p>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border flex flex-col items-center justify-center p-3"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `hsl(${member.colorHsl} / 0.3)`,
            background: `linear-gradient(135deg, hsl(${member.colorHsl} / 0.1), hsl(var(--card) / 0.85))`,
          }}
        >
          <p className="text-[10px] mb-1.5 tracking-[0.2em] uppercase font-medium" style={{ color: `hsl(${member.colorHsl})` }}>{member.role}</p>
          <p className="text-[11px] leading-snug text-muted-foreground text-center">{member.desc}</p>
          <a
            href={member.linkedin || "https://www.linkedin.com/company/nemi-ai"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 inline-flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.15em] opacity-80 hover:opacity-100"
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

const CompactCard = ({ member }: { member: CompactMember }) => (
  <div
    className="rounded-lg border p-3 flex gap-2.5 items-start"
    style={{
      borderColor: `hsl(${member.color} / 0.25)`,
      background: `linear-gradient(135deg, hsl(${member.color} / 0.06), hsl(var(--card) / 0.6))`,
    }}
  >
    <div
      className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
      style={{ background: `hsl(${member.color} / 0.12)`, border: `1px solid hsl(${member.color} / 0.3)` }}
    >
      {member.photo ? (
        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      ) : (
        <span className="font-black text-xs" style={{ color: `hsl(${member.color})` }}>{member.initials}</span>
      )}
    </div>
    <div className="min-w-0">
      <p className="font-bold text-[13px] tracking-wide text-foreground leading-tight">{member.name}</p>
      <p className="text-[10px] tracking-[0.12em] uppercase font-semibold mt-1" style={{ color: `hsl(${member.color})` }}>{member.role}</p>
      <p className="text-[11px] text-muted-foreground leading-snug mt-1.5">{member.desc}</p>
    </div>
  </div>
);

const CORE_TEAM: CoreMember[] = [
  {
    name: "Anirudh Ravi Narayanan",
    photo: "/Images/team/Anirudh%20Ravi%20Narayanan.webp",
    role: "Chief Executive Officer",
    desc: "Built Nemi from a garage to 300k sq ft and $15M ARR. Led 10+ recovery and margin transformations at McKinsey. BS ECE Rose-Hulman, MBA Yale.",
    colorHsl: "275 85% 65%",
    linkedin: "https://www.linkedin.com/in/anirudh-narayanan-26b0a121/",
  },
  {
    name: "Gokul Madhavan",
    photo: "/Images/team/Gokul%20Madhavan.webp",
    role: "Chief Financial Officer",
    desc: "Supported M&A integrations, built digital finance ops, led digital transformations. A.B., PhD Harvard, MBA Yale.",
    colorHsl: "268 82% 62%",
  },
  {
    name: "Vinoth Thiruvenkatasamy",
    photo: "/Images/team/Vinoth%20Thiruvenkatasamy.webp",
    role: "Chief Operating Officer",
    desc: "20+ years in automotive manufacturing. Scaled production lines from pilot to 100K+ units multiple times.",
    colorHsl: "272 80% 58%",
  },
  {
    name: "Shreerith Seshadri",
    photo: "/Images/team/Sreeridh%20Seshahri.webp",
    role: "Chief Technology Officer",
    desc: "Deployed AI systems used by 100M+ users. Shaped early architecture and infrastructure at eightfold.AI. CS, UIUC.",
    colorHsl: "282 78% 60%",
  },
];

const EXTENDED: CompactMember[] = [
  {
    initials: "SR",
    photo: "/Images/team/Subramanian%20R.webp",
    name: "Subramanian Rangaswamy",
    role: "CFO, India",
    desc: "Chartered & Cost Accountant with 27+ years across auto, industrial, and consumer goods sectors.",
    color: "275 65% 60%",
  },
  {
    initials: "VR",
    photo: "/Images/team/Vijay%20Ragavalu.webp",
    name: "Vijay Ragavalu",
    role: "President, AKIO Suite",
    desc: "30+ years in manufacturing leadership, automation, and operational optimization.",
    color: "268 60% 55%",
  },
  {
    initials: "SB",
    photo: "/Images/team/Sadasivam%20Balasubramanian.webp",
    name: "Sadasivam Balasubramaniam",
    role: "President, AKIO Suite",
    desc: "20 years in electronics development across telematics, defense, aerospace, and factory automation.",
    color: "272 60% 50%",
  },
  {
    initials: "VK",
    photo: "/Images/team/Vijay%20RamaKrishnan.webp",
    name: "Vijay Ramakrishnan",
    role: "President, SAM",
    desc: "15+ years in sales & marketing. Built and led 100+ person sales teams across automotive and finance.",
    color: "282 58% 52%",
  },
];

const BOARD: CompactMember[] = [
  {
    initials: "SS",
    photo: "/Images/team/Sam%20Swaminathan.webp",
    name: "Sam Swaminathan",
    role: "Non-Executive Board Member",
    desc: "General Partner, De La Crème Ventures. Ex-SVP Fractal Analytics. IIT Madras alumnus.",
    color: "282 38% 45%",
  },
  {
    initials: "NN",
    photo: "/Images/team/Naoya%20Nishimura.webp",
    name: "Naoya Nishimura",
    role: "Non-Executive Board Member",
    desc: "CEO, Musashi Auto Parts India. Leads EV expansion for Musashi Seimitsu in India & Africa.",
    color: "272 36% 42%",
  },
];


const LeadershipSection = ({ scrollProgress }: LeadershipSectionProps) => {
  // Section: 0.945–0.975
  const sectionVisible = scrollProgress > 0.820 && scrollProgress < 0.895;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.828, 0.845));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.880, 0.893));
  const opacity = Math.min(enterP, 1 - exitP);

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 42, opacity, background: "hsl(230 25% 4%)" }}
      aria-label="Leadership and Board"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 40%, hsl(275 80% 40% / 0.15) 0%, transparent 65%),
            radial-gradient(ellipse 80% 60% at 50% 70%, hsl(260 70% 30% / 0.08) 0%, transparent 70%)
          `,
        }}
      />

      <div
        className="relative z-[2] w-full max-w-[1380px] mx-auto px-3 md:px-6 py-3 pointer-events-auto overflow-y-auto max-h-screen"
        style={{ opacity: enterP, transform: `translateY(${(1 - enterP) * 16}px)` }}
      >
        {/* Header */}
        <div className="text-center mb-3 md:mb-4">
          <p className="text-[0.6rem] md:text-[0.7rem] tracking-[0.3em] uppercase text-primary font-semibold mb-1">
            Who We Are
          </p>
          <h2
            className="text-xl md:text-3xl lg:text-4xl font-extrabold tracking-tight"
            style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4), 0 0 60px hsl(270 70% 50% / 0.2)" }}
          >
            Leadership &amp; Board
          </h2>
        </div>

        {/* Core team */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3 mb-4">
          {CORE_TEAM.map((m) => <CoreCard key={m.name} member={m} />)}
        </div>

        {/* Extended Leadership */}
        <div className="mb-3">
          <p className="text-[0.7rem] tracking-[0.3em] uppercase text-primary mb-2 font-bold">Extended Leadership</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {EXTENDED.map((m) => <CompactCard key={m.name} member={m} />)}
          </div>
        </div>

        {/* Board of Directors */}
        <div>
          <p className="text-[0.7rem] tracking-[0.3em] uppercase text-primary mb-2 font-bold">Board of Directors</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BOARD.map((m) => <CompactCard key={m.name} member={m} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipSection;
