"use client";

import { useEffect } from "react";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { CaseStudy } from "@/components/services/CaseStudy";
import { ScrollReveal } from "@/hooks/ScrollReveal";

const akio = "hsl(0, 72%, 52%)";
const henry = "hsl(217, 91%, 60%)";
const sam = "hsl(142, 71%, 45%)";

interface ServiceItem {
  title: string;
  desc: string;
  img: string;
}

interface VerticalCfg {
  id: string;
  name: string;
  subtitle: string;
  paragraph: string;
  bullets: string[];
  bannerImg: string;
  color: string;
  services: ServiceItem[];
}

const akioServices: ServiceItem[] = [
  { title: "Product Design", desc: "Rapidly design and engineer your products.", img: "/Images/Design%20and%20Development.webp" },
  { title: "Component Design", desc: "Design specific components (e.g., battery, electronics) that go into your products.", img: "/Images/Parts%20Manufacturing.webp" },
  { title: "Prototyping & Validation", desc: "Physically build out or simulate and validate your design before production.", img: "/Images/Validation.webp" },
];

const henryServices: ServiceItem[] = [
  { title: "Tooling & Fixturing", desc: "Injection molding tools, Die casting tools, Press tools, Machining, Welding, and Assembly fixtures", img: "/Images/Tooling%20and%20fixturing.webp" },
  { title: "SPMs", desc: "Special purpose machinery and robotic automation to automate production of various parts", img: "/Images/Electronics%20production.webp" },
  { title: "Metal Parts Manufacturing", desc: "Cutting, bending, forming, welding, machining, pipe metal, casting, forging", img: "/Images/Pipe%20bending.webp" },
  { title: "Plastics, Rubbers, Composites", desc: "Injection moulding, extrusion, blow molding, thermoforming, compression molding", img: "/Images/Injection%20modling%20.webp" },
  { title: "Battery Manufacturing", desc: "From portable chargers to drones to EVs to industrial energy storage", img: "/Images/Battery%20manufacturing.webp" },
  { title: "Motor Manufacturing", desc: "Design and manufacturing of BLDC, Axial Flux and other motors", img: "/Images/Motor.webp" },
  { title: "Electronics Production", desc: "PCB assemblies, box builds / system integration, and testing", img: "/Images/Electronics%20production.webp" },
  { title: "Speedshop", desc: "Rapid response production for fast turnaround", img: "/Images/speedshop.webp" },
  { title: "Complex Assemblies", desc: "Combining multiple different types of parts into complex assemblies, e.g., EVs, drones, industrial robotics", img: "/Images/Titanium-Alloys-for-Drone-Frames.webp" },
];

const samServices: ServiceItem[] = [
  { title: "Last Mile Delivery", desc: "SAM manages deployment and delivery of products to real-world environments. Supporting 2500+ EV fleet and consumer vehicles across India and Africa.", img: "/Images/Last%20mile%20Delivery%20.webp" },
  { title: "Usage Tracking", desc: "Once products are deployed, SAM continuously monitors their performance and feeds data back into AKIO and Henry.", img: "/Images/Usage%20tracking.webp" },
  { title: "Predictive Maintenance", desc: "SAM enables proactive maintenance using operational data, reducing downtime and improving product reliability.", img: "/Images/Predictive%20Maintenance.webp" },
];

const verticals: VerticalCfg[] = [
  {
    id: "akio",
    name: "AKIO",
    subtitle: "Design Studio",
    paragraph: "Tell us what you need built. AKIO's AI-driven design engine handles the engineering, CAD, simulation, prototyping, so you get a validated, production-ready design without the 6-month wait or the $200k bill.",
    bullets: [
      "Concept visualization in hours instead of months",
      "Faster iterations for every design feedback cycle",
      "Reduced engineering effort and cost",
      "Integrates prototyping, simulation & PLM",
    ],
    bannerImg: "/Images/Akio%2002.png",
    color: akio,
    services: akioServices,
  },
  {
    id: "henry",
    name: "HENRY",
    subtitle: "Development Engine",
    paragraph: "You've designed it. Now it needs to be built, at the right quality, the right cost, on time. HENRY is your one-stop AI-powered manufacturing partner: from raw tooling to finished assemblies, no supply chain juggling required.",
    bullets: [
      "Integrated with AKIO design workflows",
      "AI-assisted supply chain development",
      "AI-assisted tooling & capex design",
      "Full-stack manufacturing capabilities",
    ],
    bannerImg: "/Images/Henry%2002.png",
    color: henry,
    services: henryServices,
  },
  {
    id: "sam",
    name: "SAM",
    subtitle: "Deployment Planner",
    paragraph: "Your product leaving the factory is just the beginning. SAM gets it to your customers, tracks every unit in the field, and feeds real performance data back into your next design, so each generation is better than the last.",
    bullets: [
      "Deliver products to end users",
      "Support leasing & financing",
      "Monitor real-world product performance",
      "Improve products using operational data",
    ],
    bannerImg: "/Images/Sam%2002.png",
    color: sam,
    services: samServices,
  },
];

const VerticalSection = ({ v }: { v: VerticalCfg }) => {
  const gridCols = v.services.length >= 6 ? "repeat(3, 1fr)" : "repeat(3, 1fr)";

  return (
    <section id={v.id} className="px-6 md:px-12 lg:px-16 pt-16 md:pt-24 pb-8">
      {/* Intro banner: text left, big colored image right */}
      <ScrollReveal>
        <div className="services-tab-hero-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <div className="flex flex-col justify-center">
            <div
              className="font-bold text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider mb-2"
              style={{ color: v.color }}
            >
              {v.name}
            </div>
            <div className="font-semibold text-muted-foreground text-sm md:text-base uppercase tracking-[0.25em] mb-5">
              {v.subtitle}
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-[1.8] mb-8 max-w-[500px] tracking-wide">
              {v.paragraph}
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                padding: 0,
              }}
            >
              {v.bullets.map((b) => (
                <li
                  key={b}
                  className="text-muted-foreground text-sm tracking-wide"
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}
                >
                  <span className="font-bold text-xs shrink-0 mt-0.5" style={{ color: v.color }}>
                    →
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-stretch">
            <ScrollReveal variant="scale" repeat delay={100} className="w-full flex">
              <div
                className="bg-card rounded-lg overflow-hidden w-full flex relative"
                style={{ borderTop: `2px solid ${v.color}`, minHeight: 320 }}
              >
                <img
                  src={v.bannerImg}
                  alt={`${v.name} ${v.subtitle}`}
                  className="w-full h-full object-cover"
                  style={{ minHeight: 320 }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      {/* Services grid */}
      <div className="services-grid-wrapper pb-4 pt-4">
        <ScrollReveal>
          <p
            className="font-bold text-xl md:text-2xl tracking-wider uppercase mb-10"
            style={{ color: v.color }}
          >
            {v.name} Services
          </p>
        </ScrollReveal>
        <div
          className="services-card-grid border border-border"
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: "1px",
            background: "hsl(var(--border))",
          }}
        >
          {v.services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 80}>
              <div
                className="bg-background hover:bg-card transition-colors duration-300 cursor-default h-full"
                style={{ padding: "2rem" }}
              >
                <div
                  className="bg-card"
                  style={{
                    height: 140,
                    marginBottom: "1.5rem",
                    overflow: "hidden",
                    borderLeft: `2px solid ${v.color}`,
                    padding: 0,
                  }}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.65,
                      transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    className="hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div
                  style={{
                    width: "3rem",
                    height: 2,
                    background: v.color,
                    marginBottom: "1.2rem",
                  }}
                />
                <h3 className="text-foreground font-bold text-base md:text-lg tracking-wider uppercase mb-3">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-[1.7] tracking-wide">
                  {s.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background text-foreground font-['Montserrat',sans-serif] font-light min-h-screen relative">
      {/* CONSTELLATION + GLOW BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <ConstellationCanvas />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, hsl(var(--accent) / 0.18) 0%, transparent 65%)",
          }}
        />
      </div>

      <Navbar />

      <div className="relative z-[2]">
        {/* LANDING HERO - full viewport, vertically centered */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 text-center">
          <div className="max-w-5xl mx-auto w-full pt-16">
            <ScrollReveal delay={100}>
              <p className="text-[10px] md:text-xs tracking-[0.45em] uppercase text-muted-foreground font-semibold mb-6 md:mb-8">
                Services
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <h1
                className="font-extrabold uppercase leading-[1.02] tracking-tight mb-2 md:mb-3 text-foreground"
                style={{ fontSize: "clamp(2rem, 6vw, 4.25rem)" }}
              >
                We deliver on what matters.
              </h1>
              <p
                className="font-extrabold uppercase leading-[1.05] tracking-tight mb-8 md:mb-10"
                style={{ fontSize: "clamp(2.25rem, 7vw, 5rem)" }}
              >
                <span style={{ color: akio }}>Cost</span>
                <span className="text-muted-foreground/50">{" · "}</span>
                <span style={{ color: henry }}>Quality</span>
                <span className="text-muted-foreground/50">{" · "}</span>
                <span style={{ color: sam }}>Speed</span>
                <span className="text-foreground">.</span>
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-[1.8] max-w-2xl mx-auto tracking-wide">
                From idea to product in the field - design with AKIO,
                manufacture with HENRY, deploy with SAM. One stack, one partner,
                one outcome.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* 9 Henry services grid */}
        <section className="px-6 md:px-12 lg:px-16 pt-8 pb-8">
          <ScrollReveal>
            <div style={{ marginBottom: "2.5rem" }}>
              <p className="text-foreground font-bold text-xs tracking-[0.25em] uppercase mb-2">
                Services
              </p>
              <div style={{ height: 2, background: henry, width: "3rem" }} />
            </div>
          </ScrollReveal>
          <div
            className="services-card-grid border border-border"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: "hsl(var(--border))",
            }}
          >
            {henryServices.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 80}>
                <div
                  className="bg-background hover:bg-card transition-colors duration-300 cursor-default h-full"
                  style={{ padding: "2rem" }}
                >
                  <div
                    className="bg-card"
                    style={{
                      height: 140,
                      marginBottom: "1.5rem",
                      overflow: "hidden",
                      borderLeft: `2px solid ${henry}`,
                      padding: 0,
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.65,
                        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                      }}
                      className="hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div
                    style={{
                      width: "3rem",
                      height: 2,
                      background: henry,
                      marginBottom: "1.2rem",
                    }}
                  />
                  <h3 className="text-foreground font-bold text-base md:text-lg tracking-wider uppercase mb-3">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-[1.7] tracking-wide">
                    {s.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CASE STUDIES - 3 best */}
        <div className="px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-10">
          <ScrollReveal>
            <div style={{ display: "inline-block" }}>
              <p className="text-foreground font-bold text-xs tracking-[0.25em] uppercase mb-2">
                Case Studies
              </p>
              <div style={{ height: 2, background: henry, width: "100%" }} />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <CaseStudy
            title="Electric Motorcycle for Africa"
            context="Ruggedised electric motorcycle design required for African road conditions and bike taxi use cases."
            outcome="PRD to production-ready in 6 months, delivering full CAD and component designs. Tooling and fixture designs, and supplier base all delivered in additional 3 months."
            color={akio}
            imageSrc="/Images/Messenger.webp"
            imageAlt="Electric Motorcycle for Africa"
            metrics={[
              { label: "Design time", before: "24 months", after: "9 months", barPercent: 37, color: akio },
              { label: "Development cost", before: "Baseline", after: "1/10th", barPercent: 10, color: akio },
            ]}
          />
        </ScrollReveal>

        <ScrollReveal>
          <CaseStudy
            title="Aerospace Machined Parts"
            context="Mass production of aluminium 6061-T651 machined parts with tight tolerances < 2 micron."
            outcome="Created fixturing and innovative methods to manufacture part in standard 3-axis instead of 5-axis."
            color={henry}
            imageSrc="/Images/aerospace-manufacturing.webp"
            imageAlt="Aerospace Machined Parts"
            imageFirst={false}
            metrics={[
              { label: "Machining time", before: "9 hrs/part", after: "3 hrs/part", barPercent: 33, color: henry },
              { label: "Cost reduction", before: "Baseline", after: ">50%", barPercent: 50, color: henry },
            ]}
          />
        </ScrollReveal>

        <ScrollReveal style={{ marginBottom: "5rem" }}>
          <CaseStudy
            title="Complex Assembly Production"
            context="Mass production of automated coffee machine."
            outcome="End-to-end manufacturing from fabrication, machining, electronics, wiring harnesses to complete assembly."
            color={henry}
            imageSrc="/Images/COffee%20mfg.webp"
            imageAlt="Complex Assembly Production"
            metrics={[
              { label: "Initial setup lead time", before: "Benchmark", after: "<6 weeks", barPercent: 40, color: henry },
              { label: "Cost reduction", before: "Baseline", after: ">30%", barPercent: 70, color: henry },
            ]}
          />
        </ScrollReveal>
      </div>

      <SiteFooter />

      <style>{`
        @media (max-width: 900px) {
          .services-tab-hero-grid { grid-template-columns: 1fr !important; }
          .services-card-grid { grid-template-columns: 1fr !important; }
          .services-grid-wrapper { padding-left: 0 !important; padding-right: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default Services;
