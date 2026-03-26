"use client";

import { useState } from "react";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
const factoryImg1 = "/Images/nemi%2001.png";
const factoryImg2 = "/Images/Nemi%2002.jpeg";
import anirudhImg from "@/assets/anirudh.png";
import gokulImg from "@/assets/gokul.png";
import shreerithImg from "@/assets/shreerith.png";

interface LeaderMember {
  name: string;
  photo?: string;
  initials?: string;
  role: string;
  desc: string;
  colorHsl: string;
}

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
        {/* FRONT — Photo/Initials + Name + Role */}
        <div
          className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden border flex flex-col items-center justify-center p-2 md:p-6 lg:p-8 transition-shadow duration-500"
          style={{
            backfaceVisibility: "hidden",
            borderColor: `hsl(${member.colorHsl} / 0.3)`,
            boxShadow: `0 0 20px hsl(${member.colorHsl} / 0.1), 0 4px 20px hsl(230 25% 4% / 0.4)`,
            background: `linear-gradient(135deg, hsl(${member.colorHsl} / 0.08), hsl(var(--card) / 0.7))`,
          }}
        >
          {/* Outer glow ring */}
          <div
            className="rounded-full mb-2 md:mb-4 relative z-10 flex items-center justify-center"
            style={{
              width: "8rem",
              height: "8rem",
              background: `radial-gradient(circle, hsl(${member.colorHsl} / 0.2) 50%, hsl(${member.colorHsl} / 0.05) 65%, transparent 72%)`,
            }}
          >
            <div
              className="rounded-full overflow-hidden flex items-center justify-center"
              style={{
                width: "6.5rem",
                height: "6.5rem",
                border: `1.5px solid hsl(${member.colorHsl} / 0.45)`,
                boxShadow: `0 0 10px hsl(${member.colorHsl} / 0.2), inset 0 0 8px hsl(${member.colorHsl} / 0.08)`,
                background: member.photo ? "transparent" : `hsl(${member.colorHsl} / 0.15)`,
              }}
            >
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-black text-xl tracking-widest" style={{ color: `hsl(${member.colorHsl})` }}>
                  {member.initials}
                </span>
              )}
            </div>
          </div>
          {/* Ambient glow blob */}
          <div
            className="absolute w-20 h-20 md:w-44 md:h-44 rounded-full blur-2xl opacity-20"
            style={{
              background: `radial-gradient(circle, hsl(${member.colorHsl} / 0.4), transparent)`,
              top: "10%",
            }}
          />

          <h3
            className="text-xs md:text-xl font-semibold text-foreground tracking-wider mb-0 md:mb-1"
            style={{
              textShadow: `0 0 12px hsl(${member.colorHsl} / 0.4)`,
              animation: "text-glow-pulse 3s ease-in-out infinite",
            }}
          >
            {member.name}
          </h3>
          <p
            className="text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.3em] uppercase font-medium"
            style={{
              color: `hsl(${member.colorHsl})`,
              animation: "fade-in 0.6s ease-out both",
            }}
          >
            {member.role}
          </p>
        </div>

        {/* BACK — Bio text */}
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
          <p
            className="text-[10px] mb-2 md:text-sm md:mb-4 tracking-[0.2em] md:tracking-[0.3em] uppercase font-medium"
            style={{ color: `hsl(${member.colorHsl})` }}
          >
            {member.role}
          </p>
          <p className="text-[10px] leading-relaxed md:text-sm text-muted-foreground text-center">
            {member.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

const strategySteps = [
  { num: "01", code: "ACQ", title: "Acquire Manufacturing Companies", body: "NEMI acquires or partners with established manufacturing businesses — companies with real machines, real customers, and years of accumulated process data. These are not greenfield builds; they are proven operations with untapped AI potential." },
  { num: "02", code: "RFT", title: "Retrofit with the LMM Stack", body: "We overlay the LMM stack onto these acquired operations — connecting machines to sensors, digitizing process parameters, and deploying AI-driven scheduling, quality prediction, and process optimization. Legacy assets become intelligent ones." },
  { num: "03", code: "STR", title: "Data Captured Strengthens LMM", body: "Every production run generates ground-truth manufacturing data — process parameters, quality outcomes, sensor readings. This data flows back into the LMM, making it progressively more accurate and capable. Each acquisition makes the whole platform smarter." },
];

const AboutUs = () => {
  const galleryVideoRef = useVideoAutoplay();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* CONSTELLATION + GLOW BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <ConstellationCanvas />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 45%, hsl(var(--accent) / 0.18) 0%, transparent 65%)",
          }}
        />
      </div>

      <Navbar scrollProgress={1} />

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center relative z-[1] overflow-hidden pt-32 pb-16 px-6 md:px-12 lg:px-16">
        <div className="text-center relative z-[3] w-full">
          <ScrollReveal>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase text-foreground mb-6"
              style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
            >
              Building the Future
              <br />
              of{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary-foreground) / 0.9))",
                }}
              >
                Manufacturing
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p
              className="text-sm md:text-lg font-light text-center text-muted-foreground leading-relaxed tracking-[0.15em] uppercase max-w-[680px] mx-auto"
              style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.4), 0 0 40px hsl(270 70% 50% / 0.2)" }}
            >
              We bring Physical AI into the heart of manufacturing — so complex industrial processes become
              intelligent, scalable systems.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-28 px-6 md:px-12 lg:px-16 bg-card/80 backdrop-blur-sm border-t border-b border-border/30 relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal variant="scale">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border/40">
              <img
                src={factoryImg1}
                alt="AI-powered manufacturing technology"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div>
              <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-4" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>
                About NEMI
              </p>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.2] mb-6">
                Manufacturing Hasn't Kept Pace With Software.{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                  }}
                >
                  We're changing that.
                </span>
              </h2>
              <p className="text-sm md:text-lg leading-[1.75] text-muted-foreground max-w-[640px] tracking-wide">
                NEMI is an end-to-end Physical AI platform that rethinks how products go from concept to
                production to delivery. We blend artificial intelligence, automation, and deep manufacturing
                know-how to help businesses cut inefficiencies, shorten iteration cycles, and get to market
                faster than ever.
              </p>
              <div className="mt-10 p-6 rounded-r-xl border-l-[3px] border-primary" style={{ background: "hsl(var(--primary) / 0.05)" }}>
                <p className="text-sm md:text-base font-medium leading-[1.6] italic tracking-wide" style={{ color: "hsl(var(--primary) / 0.85)" }}>
                  We're not here to tweak what already exists. We re-architect manufacturing processes from
                  the ground up — designed around intelligence.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="py-28 px-6 md:px-12 lg:px-16 relative z-[1]">
        <div className="text-center">
          <ScrollReveal>
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-4" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>
              Leadership Team
            </p>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.2] mb-14">
              Meet the Team Behind{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                }}
              >
                NEMI
              </span>
            </h2>
          </ScrollReveal>

          {/* Top row — Core Leadership (3 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
            {[
              {
                name: "Anirudh Ravi Narayanan",
                photo: anirudhImg,
                role: "Chief Executive Officer",
                desc: "Ex-McKinsey (D.C. & Boston). Advised Fortune 500s on strategy, growth & product development. Yale MBA; Harvard Ph.D. & B.A. in Mathematics.",
                colorHsl: "0 85% 55%",
              },
              {
                name: "Gokul Madhavan",
                photo: gokulImg,
                role: "Chief Strategy Officer",
                desc: "Ex-McKinsey (Silicon Valley). Led turnarounds delivering $100M+ margin gains for Fortune 500s. Yale MBA; B.S. Electrical & Computer Engineering, Rose-Hulman.",
                colorHsl: "220 85% 55%",
              },
              {
                name: "Shreerith Seshadri",
                photo: shreerithImg,
                role: "Chief Technology Officer",
                desc: "Designs the Physical AI architecture at the core of NEMI — the technology layer that powers next-generation industrial transformation.",
                colorHsl: "145 75% 45%",
              },
            ].map((member, i) => (
              <ScrollReveal key={member.name} variant="scale" delay={i * 100}>
                <LeaderFlipCard member={member} />
              </ScrollReveal>
            ))}
          </div>

          {/* Subsidiary Leadership heading */}
          <ScrollReveal>
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-4 text-center" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>
              Subsidiary Leadership
            </p>
          </ScrollReveal>

          {/* Subsidiary row — 5 members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Subramanian R",
                photo: "/Images/team/image14.png",
                role: "India CFO",
                desc: "Chartered & Cost Accountant with 27+ years in manufacturing across auto, industrial, and consumer goods. Expert in greenfield projects and financial systems.",
                colorHsl: "38 90% 55%",
              },
              {
                name: "Vinoth Thiruvenkatasamy",
                photo: "/Images/team/image13.png",
                role: "President — HENRY Suite",
                desc: "20+ years in automotive design & development. R&D at Nissan Technical Center Japan and Ford Engineering Services India, with full product development cycle expertise.",
                colorHsl: "220 85% 55%",
              },
              {
                name: "Vijay Ragavalu",
                photo: "/Images/team/image18.png",
                role: "President — AKIO Suite (Mechanical)",
                desc: "30+ years in manufacturing leadership — automation, operational optimization, sustainable engineering, vendor negotiations, and large-scale team management.",
                colorHsl: "160 70% 45%",
              },
              {
                name: "Sadasivam B",
                photo: "/Images/team/image20.png",
                role: "President — AKIO Suite (Electrical)",
                desc: "20 years in electronics product development across telematics, defence, aerospace, and factory automation. Leads 100+ engineers in electrical/electronic manufacturing.",
                colorHsl: "265 75% 60%",
              },
              {
                name: "Vijay Ramakrishnan",
                photo: "/Images/team/image19.png",
                role: "President — SAM",
                desc: "15+ years in Sales & Marketing across automotive, finance, and tourism. Previously at Greaves Electric, HDFC, Thomas Cook, and MakeMyTrip. Built and led 100+ person sales teams.",
                colorHsl: "190 80% 50%",
              },
            ].map((member, i) => (
              <ScrollReveal key={member.name} variant="scale" delay={i * 100}>
                <LeaderFlipCard member={member} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOARD OF DIRECTORS ── */}
      <section className="py-20 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-4" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>
            Governance
          </p>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.2] mb-10">
            Board of Directors
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30">
          {[
            {
              initials: "ARN",
              photo: "/Images/team/image12.png",
              name: "Anirudh Ravi Narayanan",
              title: "Executive Director & CEO",
              tag: "Executive",
              color: "0 85% 55%",
              desc: "Ex-McKinsey. Yale MBA; Harvard Ph.D.",
            },
            {
              initials: "VT",
              photo: "/Images/team/image13.png",
              name: "Vinoth Thiruvenkatasamy",
              title: "Executive Board Member",
              tag: "Executive",
              color: "265 75% 60%",
              desc: "President — BNC Group. 20+ yrs automotive R&D, Nissan & Ford.",
            },
            {
              initials: "SS",
              photo: "/Images/team/image54.png",
              name: "Sam Swaminathan",
              title: "Non-Executive Board Member",
              tag: "Non-Executive",
              color: "220 85% 55%",
              desc: "General Partner, De La Crème Ventures. Ex-SVP Fractal Analytics. IIT Madras & Missouri University alumnus.",
            },
            {
              initials: "NN",
              photo: "/Images/team/image53.jpeg",
              name: "Naoya Nishimura",
              title: "Non-Executive Board Member",
              tag: "Non-Executive",
              color: "190 80% 50%",
              desc: "CEO, Musashi Auto Parts India. 20+ yrs across Japan & North America. Leads EV expansion for Musashi Seimitsu in India & Africa.",
            },
          ].map((member, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-background p-6 h-full flex flex-col" style={{ borderTop: `2px solid hsl(${member.color} / 0.5)` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{ background: `hsl(${member.color} / 0.12)`, border: `1px solid hsl(${member.color} / 0.3)` }}
                  >
                    {(member as { photo?: string }).photo ? (
                      <img src={(member as { photo?: string }).photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-black text-xs" style={{ color: `hsl(${member.color})` }}>{member.initials}</span>
                    )}</div>
                  <span className="text-[0.55rem] tracking-[0.15em] uppercase font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: `hsl(${member.color})`, background: `hsl(${member.color} / 0.1)` }}>
                    {member.tag}
                  </span>
                </div>
                <p className="font-bold text-sm tracking-[0.05em] uppercase text-foreground mb-1">{member.name}</p>
                <p className="font-semibold text-[0.58rem] tracking-[0.12em] uppercase mb-3" style={{ color: `hsl(${member.color})` }}>{member.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-auto">{member.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── ADVISORS ── */}
      <section className="py-20 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-4" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>
            Strategic Counsel
          </p>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.2] mb-10">
            Advisors
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              initials: "SR",
              photo: "/Images/team/image55.png",
              name: "Dr. Sampath Ravinarayanan",
              title: "Board Advisor",
              color: "38 90% 55%",
              highlights: ["Founder, Microcon — India's automotive testing pioneer", "Chairman & MD, Axis CADES", "Fmr. Board: Air India, Airbus India, KPTCL", "Frost & Sullivan CEO Award | Honorary Doctorate, NIT Kurukshetra"],
            },
            {
              initials: "RM",
              photo: "/Images/team/image58.png",
              name: "Ramesh Mangaleshwaran",
              title: "Advisor",
              color: "265 75% 60%",
              highlights: ["Senior Partner Emeritus, McKinsey & Company (30 yrs)", "Founded McKinsey's Chennai & Bangalore offices", "Co-led McKinsey Industrials Practice, India & Asia", "Head of Automotive Practice"],
            },
            {
              initials: "VD",
              photo: "/Images/team/image56.jpeg",
              name: "Vinod K. Dasari",
              title: "Advisor",
              color: "145 75% 45%",
              highlights: ["Fmr. MD & CEO — Ashok Leyland & Royal Enfield", "Led global innovation, modernization & international expansion", "Deep expertise in manufacturing, mobility & operational excellence"],
            },
          ].map((advisor, i) => (
            <ScrollReveal key={advisor.name} delay={i * 120}>
              <div
                className="rounded-xl border p-6 h-full flex flex-col"
                style={{
                  borderColor: `hsl(${advisor.color} / 0.25)`,
                  background: `linear-gradient(135deg, hsl(${advisor.color} / 0.06), hsl(var(--card) / 0.7))`,
                }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{ background: `hsl(${advisor.color} / 0.15)`, border: `1.5px solid hsl(${advisor.color} / 0.4)` }}
                  >
                    {(advisor as { photo?: string }).photo ? (
                      <img src={(advisor as { photo?: string }).photo} alt={advisor.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-black text-sm" style={{ color: `hsl(${advisor.color})` }}>{advisor.initials}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm tracking-wide text-foreground">{advisor.name}</p>
                    <p className="text-[0.6rem] tracking-[0.15em] uppercase font-semibold" style={{ color: `hsl(${advisor.color})` }}>{advisor.title}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-2 mt-auto">
                  {advisor.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: `hsl(${advisor.color})` }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── HEADS OF BUSINESS ── */}
      <section className="py-20 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.2] mb-10">
            Heads of Business —{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
            >
              AI Subsidiary Leadership
            </span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
          {[
            { color: "0 85% 55%", label: "AKIO", name: "Head of Design Intelligence", title: "AKIO Division Lead", desc: "Overseeing AKIO's product design, component engineering, and prototyping & validation capabilities." },
            { color: "220 85% 55%", label: "HENRY", name: "Head of Manufacturing", title: "HENRY Division Lead", desc: "Leading HENRY's full-stack manufacturing operations across tooling, metal parts, electronics, battery, motor, and complex assembly production." },
            { color: "145 75% 45%", label: "SAM", name: "Head of Deployment", title: "SAM Division Lead", desc: "Driving SAM's product deployment, leasing, financing, and real-world performance monitoring operations across India and Africa." },
          ].map((sub, i) => (
            <ScrollReveal key={sub.label} delay={i * 150}>
              <div className="bg-background p-6 h-full" style={{ borderTop: `2px solid hsl(${sub.color})` }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: `hsl(${sub.color})` }} />
                  <span className="font-black text-[0.65rem] tracking-[0.2em] uppercase" style={{ color: `hsl(${sub.color})` }}>{sub.label}</span>
                </div>
                <p className="font-bold text-sm tracking-[0.05em] uppercase text-foreground mb-1">{sub.name}</p>
                <p className="font-semibold text-[0.58rem] tracking-[0.12em] uppercase text-muted-foreground mb-3">{sub.title}</p>
                <p className="text-xs text-muted-foreground leading-[1.6]">{sub.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── GEOGRAPHICAL ADVANTAGE ── */}
      <section className="py-20 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <div className="rounded-xl border border-border/40 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" style={{ background: "hsl(var(--card) / 0.7)" }}>
            <div>
              <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-4" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>
                Geographical Advantage
              </p>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.2]">
                Coimbatore —<br />An Automotive Hub
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { bold: "India's manufacturing powerhouse:", text: "25,000+ SME manufacturers, dense supplier ecosystem." },
                { bold: "Deep, underrated talent pool:", text: "Hands-on engineering graduates rare in metro hubs." },
                { bold: "10× capital efficiency:", text: "Same output as Silicon Valley, fraction of cost." },
                { bold: "Gateway to emerging markets:", text: "Port access to South Asia, Southeast Asia, Africa." },
              ].map((point) => (
                <div key={point.bold} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  <p className="text-sm text-muted-foreground leading-[1.7]">
                    <strong className="text-foreground font-bold">{point.bold}</strong> {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── STRATEGIC MOATS ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
            <div>
              <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-3" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>
                Competitive Advantage
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
                Strategic{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
                >
                  Moats
                </span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-sm leading-[1.7] tracking-wide lg:text-right">
              Building the foundation of national manufacturing resilience through technical and capital superiority.
            </p>
          </div>
        </ScrollReveal>

        {/* Moat rows */}
        <div className="flex flex-col">
          {[
            {
              num: "01",
              color: "220 85% 55%",
              tag: "RESILIENCE-AS-A-SERVICE",
              title: "Sovereign Manufacturing",
              desc: "By keeping AI processing at the edge within national borders, we ensure industrial data sovereignty. NEMI's LMM empowers nations to reshore manufacturing without the labor dependency of the 20th century.",
              flag: null,
            },
            {
              num: "02",
              color: "145 75% 45%",
              tag: "WORLD-CLASS ENGINEERING · LOCALIZED COSTS",
              title: "Extreme Capital Efficiency",
              desc: "Our Coimbatore-based operations hub lets us operate at 1/5th the cost of US-based competitors — delivering the same engineering quality at a fraction of the spend, accelerating R&D velocity per dollar invested.",
              flag: "🇮🇳",
            },
            {
              num: "03",
              color: "275 80% 60%",
              tag: "PROPRIETARY AI",
              title: "The LMM Advantage",
              desc: "Our Large Manufacturing Model is trained on real manufacturing data — CAD, sensors, quality outcomes, process parameters — creating an AI that grows smarter with every production job we run.",
              flag: null,
            },
            {
              num: "04",
              color: "0 85% 55%",
              tag: "ONE PARTNER · FULL STACK",
              title: "End-to-End Integration",
              desc: "Unlike point solutions, NEMI owns the entire value chain — from concept design through manufacturing to deployment and lifecycle monitoring. One partner. Full accountability. No integration gaps.",
              flag: null,
            },
            {
              num: "05",
              color: "35 95% 55%",
              tag: "RETROFIT · NOT REPLACE",
              title: "AI Retrofit for Legacy Assets",
              desc: "We upgrade existing manufacturing operations with the LMM stack — turning legacy factories into intelligent production facilities without the capital expenditure of building from scratch.",
              flag: null,
            },
            {
              num: "06",
              color: "190 80% 50%",
              tag: "ACCESSIBLE PHYSICAL AI",
              title: "Mid-Market Focus",
              desc: "While competitors chase Fortune 50 contracts, NEMI unlocks Physical AI for the global mid-market — companies with real manufacturing needs but without the budget for enterprise robotics incumbents.",
              flag: null,
            },
          ].map((moat, i) => (
            <ScrollReveal key={moat.num} delay={i * 80}>
              <div
                className="group grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr_1fr] lg:grid-cols-[6rem_1fr_1.2fr] gap-6 md:gap-10 items-start py-8 border-t border-border/20 transition-all duration-300 hover:border-border/50"
              >
                {/* Number */}
                <div
                  className="font-black text-2xl md:text-4xl lg:text-5xl leading-none tabular-nums transition-all duration-300 group-hover:scale-110 origin-left"
                  style={{ color: `hsl(${moat.color} / 0.25)`, fontVariantNumeric: "tabular-nums" }}
                >
                  {moat.num}
                </div>

                {/* Title + tag */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight leading-[1.15] text-foreground group-hover:text-primary transition-colors duration-300">
                    {moat.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: `hsl(${moat.color})` }}
                    />
                    <span
                      className="text-[0.6rem] font-bold tracking-[0.2em] uppercase"
                      style={{ color: `hsl(${moat.color})` }}
                    >
                      {moat.flag && <span className="mr-1">{moat.flag}</span>}
                      {moat.tag}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="col-span-2 md:col-span-1 text-sm md:text-base leading-[1.75] text-muted-foreground tracking-wide pl-[3.5rem] md:pl-0">
                  {moat.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom border close */}
        <div className="border-t border-border/20 mt-0" />
      </section>

      {/* ── STRATEGY (from Technology) ── */}
      <section className="py-20 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-4" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>
            Our Strategy
          </p>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.1] mb-10">
            Acquire. Retrofit. Strengthen.
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30 auto-rows-fr">
          {strategySteps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 150} className="h-full">
              <div className="bg-background p-8 md:p-10 relative h-full">
                <span className="absolute top-4 right-6 font-black text-5xl md:text-6xl text-foreground/[0.04] leading-none">{step.num}</span>
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6 border-l-2 border-primary"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <span className="font-black text-[0.65rem] tracking-[0.1em] text-primary">{step.code}</span>
                </div>
                <h3 className="font-bold text-xs md:text-sm tracking-[0.15em] uppercase text-foreground mb-3">{step.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-[1.8]">{step.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── WHY NEMI ── */}
      <section className="py-28 px-6 md:px-12 lg:px-16 bg-card/80 backdrop-blur-sm border-t border-border/30 relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.2] mb-6">
                Why Companies Choose{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                  }}
                >
                  NEMI
                </span>
              </h2>
              <p className="text-sm md:text-lg leading-[1.7] text-muted-foreground mt-4 tracking-wide">
                In manufacturing, three things matter above all else.
              </p>

              <ul className="mt-8 flex flex-col gap-4">
                {[
                  { label: "Cost", detail: "10× capital efficiency, fraction of cost." },
                  { label: "Quality", detail: "AI-driven, zero-defect manufacturing output." },
                  { label: "Speed", detail: "60% faster design-to-production cycles." },
                ].map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start gap-4 py-5 px-5 rounded-xl border border-border/30 transition-all duration-300 hover:translate-x-1.5 hover:border-primary/20"
                    style={{ background: "hsl(var(--primary) / 0.03)" }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "hsl(var(--primary) / 0.12)" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm md:text-base font-bold text-foreground tracking-wide uppercase">{item.label}</span>
                      <p className="text-xs md:text-sm text-muted-foreground leading-[1.7] mt-1">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-5 rounded-r-xl border-l-[3px] border-accent" style={{ background: "hsl(var(--accent) / 0.05)" }}>
                <p className="text-sm md:text-base font-medium leading-[1.6] italic tracking-wide" style={{ color: "hsl(var(--accent) / 0.85)" }}>
                  We deliver all three.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale">
            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-border/30 relative">
              <img
                src={factoryImg2}
                alt="Modern automated manufacturing facility"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 z-[1]"
                style={{
                  background: "linear-gradient(180deg, transparent 50%, hsl(var(--background) / 0.5) 100%)",
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── A LOOK INSIDE OUR WORLD ── */}
      <section className="py-28 px-6 md:px-12 lg:px-16 border-t border-b border-border/30 relative z-[1]">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-4" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>
              Life at NEMI
            </p>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.2] mb-6">
              A Look Inside{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                }}
              >
                Our World
              </span>
            </h2>
            <p className="text-sm md:text-lg leading-[1.75] text-muted-foreground max-w-[640px] mx-auto tracking-wide">
              From our workspaces to the factory floor — here's where ideas become intelligent systems.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Video */}
        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden border border-border/30" style={{ background: "hsl(var(--card) / 0.5)" }}>
            <video
              ref={galleryVideoRef}
              src="/videos/Factory%20Video%20(1).mp4"
              controls
              muted
              playsInline
              preload="metadata"
              className="w-full"
              style={{ maxHeight: 620, objectFit: "cover" }}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 md:px-12 lg:px-16 text-center relative overflow-hidden z-[1]">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--nemi-nebula) / 0.12), transparent 65%)",
          }}
        />
        <div className="relative z-[2]">
          <ScrollReveal>
            <h2
              className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider mb-5"
              style={{ textShadow: "0 0 30px hsl(275 80% 60% / 0.4)" }}
            >
              Ready to{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                }}
              >
                rethink
              </span>{" "}
              how you manufacture?
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground mb-10 max-w-[500px] mx-auto leading-[1.7] tracking-wide">
              We'd love to show you what's possible. Talk to our team and see how NEMI can fit into your
              operations.
            </p>
            <Link
              href="/services"
              className="inline-block px-8 py-3.5 rounded-lg text-sm md:text-base font-semibold text-primary-foreground tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
                boxShadow: "0 4px 20px hsl(var(--primary) / 0.25)",
              }}
            >
              Get Started
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 md:px-12 lg:px-16 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-[1]">
        <span className="font-bold text-xl tracking-[0.1em] uppercase text-muted-foreground">NEMI</span>
        <ul className="flex gap-8 list-none">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">&copy; 2026 NEMI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
