"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";
import SiteFooter from "@/components/SiteFooter";
import nemiLogo from "@/assets/nemi-logo.webp";

// ─── Flip card for factory images ───────────────────────────────────────────
const factoryImages = [
  { src: "/Images/Injection%20modling%20.webp",                title: "Press and Molds",          description: "Injection moulding, compression moulding and high-tonnage press operations across plastics and metals." },
  { src: "/Images/Pipe%20bending.webp",                        title: "Fabrication",               description: "Cutting, bending, forming, welding, machining, casting and forging of sheet metal and structural components." },
  { src: "/Images/Nemi%20battery%20manufacturing%2001.webp",   title: "Battery Manufacturing",     description: "End-to-end Li-ion cell ageing and pack assembly, from portable chargers to EVs and industrial energy storage." },
  { src: "/Images/Tooling%20and%20fixturing.webp",             title: "Tools, Dies, and Fixtures",  description: "Injection moulding tools, die-casting tools, press tools, welding fixtures and assembly jigs designed and built in-house." },
  { src: "/Images/Electronics%20production.webp",              title: "Electronic Manufacturing",  description: "PCB assemblies, box builds, system integration and end-of-line functional testing." },
  { src: "/Images/Nemi%20stores.webp",                         title: "Inventory and Warehouse",   description: "On-site stores, kitting and line-side replenishment with connected inventory management for every program." },
  { src: "/Images/Nemi%20Testing%20components.webp",           title: "Testing and Validation",    description: "Component, sub-system and full-system testing across mechanical, electrical and environmental regimes." },
  { src: "/Images/Nemi%20parking.webp",                        title: "NEMI Facilities",           description: "300,000+ sq ft of owned manufacturing footprint across India, engineering, tooling and assembly under one roof." },
];

const FactoryFlipCard = ({ item }: { item: typeof factoryImages[0] }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="cursor-pointer w-full h-36 md:h-44"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{ transformStyle: "preserve-3d", transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="absolute inset-0 rounded-xl overflow-hidden border" style={{ backfaceVisibility: "hidden", borderColor: "hsl(275 80% 60% / 0.15)" }}>
          <img src={item.src} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border flex flex-col items-start justify-center p-4"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderColor: "hsl(275 80% 60% / 0.4)", background: "linear-gradient(135deg, hsl(275 80% 30% / 0.35), hsl(230 25% 6% / 0.95))" }}
        >
          <h4 className="text-sm font-semibold tracking-wide mb-1" style={{ color: "hsl(275 80% 80%)" }}>{item.title}</h4>
          <p className="text-xs text-foreground/80 leading-snug">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Shared placeholder for empty sections ──────────────────────────────────
const EmptySection = ({ number, title }: { number: string; title: string }) => (
  <section className="py-32 px-6 md:px-12 lg:px-16 border-t border-border/20 relative z-[1]">
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <p className="text-xs tracking-[0.4em] uppercase text-primary/50 mb-4 font-bold">Section {number}</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-wider text-foreground/20 mb-6">{title}</h2>
        <div className="w-16 h-0.5 bg-primary/20 mb-8" />
        <p className="text-sm text-muted-foreground/40 tracking-widest uppercase">Content coming soon</p>
      </ScrollReveal>
    </div>
  </section>
);

// ─── Main component ──────────────────────────────────────────────────────────
const StreamlinedHome = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div className="fixed inset-0 z-0">
        <ConstellationCanvas />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 45%, hsl(var(--accent) / 0.15) 0%, transparent 65%)" }} />
      </div>

      <Navbar scrollProgress={1} />

      {/* ── 01 NEMI HAND SECTION ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <source src="/videos/HQ_updated_2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(to bottom, hsl(230 25% 4% / 0.3), hsl(230 25% 4% / 0.6))" }} />
        <div className="relative z-[2] flex flex-col items-center text-center px-6">
          <img
            src={nemiLogo}
            alt="NEMI AI"
            className="w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 object-contain mb-4"
            style={{ filter: "drop-shadow(0 0 30px hsl(275 80% 60% / 0.5)) drop-shadow(0 0 60px hsl(270 70% 50% / 0.3))" }}
          />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.3em] text-foreground mb-6" style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5)" }}>
            NEMI AI
          </h1>
          <p className="text-sm md:text-lg font-light text-muted-foreground tracking-[0.25em] uppercase max-w-lg leading-[1.6]">
            Full-stack, end-to-end manufacturing automation
            <br />with Physical AI
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-foreground/40 animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
        </div>
      </section>

      {/* ── 02 INDUSTRIAL REVOLUTION ─────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-16 border-t border-border/20 relative z-[1]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase mb-4 font-bold" style={{ color: "hsl(0 65% 55%)" }}>
              The Next Industrial Revolution
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
              Manufacturing is being
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}>
                reimagined with AI.
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Physical AI is transforming how products are designed, built and deployed. NEMI sits at the intersection of deep manufacturing expertise and frontier AI, making the next generation of physical products possible.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { label: "Design Time", value: "9 mo", sub: "vs 24 mo industry avg" },
              { label: "Cost Efficiency", value: "10×", sub: "vs Western competitors" },
              { label: "Facility", value: "300K", sub: "sq ft owned manufacturing" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 80}>
                <div className="rounded-xl border border-border/30 p-6" style={{ background: "hsl(var(--card) / 0.4)" }}>
                  <p className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1" style={{ color: "hsl(275 80% 70%)" }}>{stat.value}</p>
                  <p className="text-sm font-semibold text-foreground mb-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 PROBLEM ───────────────────────────────────────────────────── */}
      <EmptySection number="03" title="Problem" />

      {/* ── 04 SOLUTION — LMM ────────────────────────────────────────────── */}
      <EmptySection number="04" title="Solution — LMM" />

      {/* ── 05 FULL STACK MAAS ───────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-16 border-t border-border/20 relative z-[1]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase mb-4 font-bold" style={{ color: "hsl(0 65% 55%)" }}>Full-Stack MaaS</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">Every component,<br />manufactured end-to-end.</h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="text-base text-muted-foreground mb-14 max-w-xl">Battery + Motor + Mechanical Parts + Electrical &amp; Electronics = Complex Assemblies</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 justify-items-center">
            {[
              { label: "Drone",       src: "/Images/Titanium-Alloys-for-Drone-Frames.webp" },
              { label: "Vehicle",     src: "/Images/freepik__remove-the-person-in-left-__22404.webp" },
              { label: "Robotic Arm", src: "/Images/For%20robotic%20arm/complex%20assembly%20.webp" },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 80}>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-44 h-44 md:w-56 md:h-56 flex items-center justify-center">
                    <img src={item.src} alt={item.label} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                  </div>
                  <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{item.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 HOW WE ARE APPLYING ───────────────────────────────────────── */}
      <EmptySection number="06" title="How We Are Applying" />

      {/* ── 07 FORTRESS FACTORY ──────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-16 border-t border-border/20 relative z-[1]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase mb-4 font-bold" style={{ color: "hsl(275 80% 70%)" }}>Why We Will Win</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">Nemi's Fortress Factory</h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="text-base text-muted-foreground mb-12 max-w-xl">300,000 sq ft of AI-powered manufacturing, across 8 capability domains.</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {factoryImages.map((item, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <FactoryFlipCard item={item} />
              </ScrollReveal>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-14 pt-10 border-t border-border/20">
            {[
              { value: "300K", unit: "sq ft", label: "Facility" },
              { value: "40+",  unit: "",      label: "Patents" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold" style={{ color: "hsl(275 80% 70%)" }}>{s.value}<span className="text-base ml-1 font-semibold opacity-70">{s.unit}</span></p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
            {[
              { src: "/Images/certifications/as9100-certification.png", alt: "AS9100 Certified",      h: 60 },
              { src: "/Images/certifications/iso-9001.png",             alt: "ISO 9001:2015 Certified", h: 40 },
            ].map((cert) => (
              <div key={cert.alt} className="flex items-center justify-center" style={{ height: 60 }}>
                <img src={cert.src} alt={cert.alt} style={{ height: cert.h, width: "auto", filter: "drop-shadow(0 0 12px hsl(275 80% 60% / 0.4))" }} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08 WHY WE ARE DOING IT NOW ───────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-16 border-t border-border/20 relative z-[1]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase text-primary/80 mb-4 font-bold">Timing</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">Why We Are Doing It Now</h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="text-base text-muted-foreground mb-16 max-w-xl">A once in a 30-year shift is underway in manufacturing.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal variant="scale">
              <div className="flex justify-center items-center min-h-[380px]">
                <div className="relative" style={{ width: "100%", maxWidth: "400px", height: "360px" }}>
                  {[
                    { label: "Sovereign Manufacturing", sub: "$3T of global trade at risk due to reshoring push",   style: { top: 0, left: "50%", marginLeft: "-115px" } },
                    { label: "Physical AI",              sub: "Starting to transform manufacturing",                  style: { bottom: 0, left: 0 } },
                    { label: "High ROI Automation",      sub: "Driving immediate value from M&A",                    style: { bottom: 0, right: 0 } },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="absolute rounded-full flex items-center justify-center text-center px-6"
                      style={{ width: 230, height: 230, background: "linear-gradient(135deg, hsl(275 80% 22% / 0.85), hsl(275 80% 60% / 0.55))", border: "1px solid hsl(275 80% 65% / 0.35)", ...c.style }}
                    >
                      <div>
                        <span className="text-sm font-bold text-foreground block mb-1">{c.label}</span>
                        <span className="text-[0.65rem] text-muted-foreground leading-snug">{c.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <div className="flex flex-col gap-5">
              {[
                { title: "24-48 mo window", body: "Physical AI reaches massive commercial deployment, reshoring driven by geopolitics reframes manufacturing." },
                { title: "Once every ~30 years", body: "This type of shift happens once in a generation. Previous examples: the rise of IT, Toyota Production System." },
                { title: "Early leaders become the default", body: "Capture data, market share, and permanence. NEMI is building the infrastructure to win this shift." },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 120}>
                  <div className="rounded-xl px-5 py-4" style={{ background: "hsl(230 20% 8% / 0.5)", borderLeft: "3px solid hsl(275 80% 55% / 0.5)" }}>
                    <p className="text-sm md:text-base font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 09 WHO WE ARE — LEADERSHIP & BOARD ──────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-16 border-t border-border/20 relative z-[1]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase text-primary/80 mb-4 font-bold">Who We Are</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">Leadership &amp; Board</h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="text-base text-muted-foreground mb-14 max-w-xl">Built manufacturing at scale and AI systems at scale, now combining both.</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
            {[
              { name: "Anirudh Ravi Narayanan", role: "CEO",  photo: "/Images/team/Anirudh%20Ravi%20Narayanan.webp", color: "275 85% 65%" },
              { name: "Gokul Madhavan",          role: "CFO",  photo: "/Images/team/Gokul%20Madhavan.webp",          color: "268 82% 62%" },
              { name: "Shreerith Seshadri",       role: "CTO",  photo: "/Images/team/Sreeridh%20Seshahri.webp",       color: "282 78% 60%" },
              { name: "Vinoth Thiruvenkatasamy",  role: "COO",  photo: "/Images/team/Vinoth%20Thiruvenkatasamy.webp", color: "272 80% 58%" },
            ].map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 70}>
                <div className="flex flex-col items-center text-center rounded-xl border border-border/20 p-5" style={{ background: `linear-gradient(135deg, hsl(${m.color} / 0.07), hsl(var(--card) / 0.5))` }}>
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border" style={{ borderColor: `hsl(${m.color} / 0.4)` }}>
                    <img src={m.photo} alt={m.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <p className="text-xs font-bold text-foreground leading-snug mb-1">{m.name}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: `hsl(${m.color})` }}>{m.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6 font-bold">Board &amp; Advisors</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { name: "Sam Swaminathan",      role: "Board Member", photo: "/Images/team/Sam%20Swaminathan.webp",          color: "282 38% 41%" },
              { name: "Naoya Nishimura",       role: "Board Member", photo: "/Images/team/Naoya%20Nishimura.webp",          color: "272 36% 39%" },
              { name: "Ramesh Mangaleshwaran", role: "Advisor",      photo: "/Images/team/Ramesh%20Mangaleshwaran.webp",     color: "268 28% 36%" },
              { name: "Vinod K. Dasari",       role: "Advisor",      photo: "/Images/team/Vinod%20K%20Dasari.webp",          color: "282 26% 35%" },
            ].map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 70}>
                <div className="flex flex-col items-center text-center rounded-xl border border-border/20 p-5" style={{ background: `linear-gradient(135deg, hsl(${m.color} / 0.07), hsl(var(--card) / 0.5))` }}>
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border" style={{ borderColor: `hsl(${m.color} / 0.35)` }}>
                    <img src={m.photo} alt={m.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <p className="text-xs font-bold text-foreground leading-snug mb-1">{m.name}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: `hsl(${m.color})` }}>{m.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 WHO ALL TRUST US ──────────────────────────────────────────── */}
      <section className="py-20 border-t border-border/20 relative z-[1] overflow-hidden">
        <ScrollReveal>
          <p className="text-center text-xs tracking-[0.4em] uppercase text-muted-foreground mb-12">Trusted By</p>
        </ScrollReveal>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] mb-4">
          <div className="flex" style={{ animation: "partner-scroll-left 40s linear infinite" }}>
            {[0, 1].map((set) => (
              <div key={set} className="flex items-center gap-4 shrink-0 pr-4" aria-hidden={set === 1 ? true : undefined}>
                {[
                  { src: "/Images/logos/samsung.webp",      label: "Samsung" },
                  { src: "/Images/logos/tata.webp",         label: "Tata" },
                  { src: "/Images/logos/lamborghini.webp",  label: "Lamborghini" },
                  { src: "/Images/logos/whirlpool.webp",    label: "Whirlpool" },
                  { src: "/Images/logos/abb.webp",          label: "ABB" },
                  { src: "/Images/logos/caterpillar.webp",  label: "Caterpillar" },
                  { src: "/Images/logos/boeing.webp",       label: "Boeing" },
                  { src: "/Images/logos/ashok-leyland.webp",label: "Ashok Leyland" },
                ].map((logo) => (
                  <div key={logo.label + set} className="flex items-center justify-center shrink-0 rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm" style={{ width: 160, height: 80 }}>
                    <img src={logo.src} alt={logo.label} style={{ height: 40, width: "auto", maxWidth: 120, objectFit: "contain" }} loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex" style={{ animation: "partner-scroll-right 38s linear infinite" }}>
            {[0, 1].map((set) => (
              <div key={set} className="flex items-center gap-4 shrink-0 pr-4" aria-hidden={set === 1 ? true : undefined}>
                {[
                  { src: "/Images/logos/royal-enfield.webp", label: "Royal Enfield" },
                  { src: "/Images/logos/exide.webp",         label: "Exide" },
                  { src: "/Images/logos/flipkart.webp",      label: "Flipkart" },
                  { src: "/Images/logos/zomato.webp",        label: "Zomato" },
                  { src: "/Images/logos/rapido.webp",        label: "Rapido" },
                  { src: "/Images/logos/tvs-mobility.webp",  label: "TVS Mobility" },
                  { src: "/Images/logos/mahindra.webp",      label: "Mahindra" },
                  { src: "/Images/logos/ducati.webp",        label: "Ducati" },
                ].map((logo) => (
                  <div key={logo.label + set} className="flex items-center justify-center shrink-0 rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm" style={{ width: 160, height: 80 }}>
                    <img src={logo.src} alt={logo.label} style={{ height: 40, width: "auto", maxWidth: 120, objectFit: "contain" }} loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11 BOOK FOR A DEMO ───────────────────────────────────────────── */}
      <PageCTAFooter
        headline="Book a Demo."
        tagline="See what NEMI AI can do for your manufacturing operations."
        buttonText="Get Started"
        buttonHref="/services"
      />
      <SiteFooter />
    </div>
  );
};

export default StreamlinedHome;
