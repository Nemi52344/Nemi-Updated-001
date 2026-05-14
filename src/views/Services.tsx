"use client";

import { useEffect, useState } from "react";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { CaseStudy } from "@/components/services/CaseStudy";
import { ScrollReveal } from "@/hooks/ScrollReveal";
import industryAerospace from "@/assets/industry-aerospace.webp";
import industryAutomotive from "@/assets/industry-automotive.webp";
import industryElectronics from "@/assets/industry-electronics.webp";
import industryRobotics from "@/assets/industry-robotics.webp";

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
  { title: "Tooling & Fixturing", desc: "Injection moulding, die casting, press tools, fixtures", img: "/Images/tooling-cnc.webp" },
  { title: "SPMs", desc: "Special purpose machinery & robotic automation for production", img: "/Images/spms-robotic-welding.webp" },
  { title: "Metal Parts Manufacturing", desc: "Cutting, bending, forming, welding, machining, casting, forging", img: "/Images/Pipe%20bending.webp" },
  { title: "Plastics, Rubbers, Composites", desc: "Injection moulding, extrusion, blow moulding, thermoforming", img: "/Images/plastics-bottle-mold.webp" },
  { title: "Battery Manufacturing", desc: "Portable chargers to drones to EVs to industrial energy storage", img: "/Images/Nemi%20battery%20manufacturing%2001.webp" },
  { title: "Motor Manufacturing", desc: "Design & manufacturing of BLDC, Axial Flux and other motors", img: "/Images/Motor.webp" },
  { title: "Electronics Production", desc: "PCB assemblies, box builds, system integration & testing", img: "/Images/Electronics%20production.webp" },
  { title: "Speedshop", desc: "Rapid response production for fast turnaround", img: "/Images/speedshop.webp" },
  { title: "Complex Assemblies", desc: "Multiple part types into complex assemblies — EVs, drones, robotics", img: "/Images/complex-assemblies-ev.webp" },
];

interface Industry {
  name: string;
  image: string;
  colorHsl: string;
  description: string;
}

const industries: Industry[] = [
  {
    name: "Aerospace & Defense",
    image: industryAerospace,
    colorHsl: "210 85% 55%",
    description: "AS9100D-certified production of UAV airframes, structural assemblies and mission electronics for defense primes.",
  },
  {
    name: "Automotive",
    image: industryAutomotive,
    colorHsl: "0 75% 55%",
    description: "Electronics and battery enclosures: PCBAs, sensor modules, EV battery enclosures and trim assemblies for automotive OEMs.",
  },
  {
    name: "Appliance & Consumer Hardware",
    image: industryElectronics,
    colorHsl: "45 90% 50%",
    description: "Connected appliances and consumer hardware: PCBs, plastics, sheet metal and final assembly under one roof.",
  },
  {
    name: "Robotics & AI",
    image: industryRobotics,
    colorHsl: "275 80% 60%",
    description: "Industrial robot platforms: precision actuators, vision modules and motion control sub-systems.",
  },
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

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", location: "", website: "", message: "" });
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCTASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nLocation: ${form.location}\nWebsite: ${form.website}\nAttachment: ${fileName || "None"}\n\n${form.message}`
    );
    window.open(`mailto:info@nemi-ai.com?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);
  };

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
                <span className="text-foreground font-semibold">Cost unmatched. Quality par excellence. Speed never before seen.</span>{" "}
                Physical AI turns every job into compounding advantage.
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

        {/* INDUSTRIES SERVICED */}
        <section className="px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-10">
          <ScrollReveal>
            <div style={{ marginBottom: "2.5rem" }}>
              <p className="text-foreground font-bold text-xs tracking-[0.25em] uppercase mb-2">
                Industries Serviced
              </p>
              <div style={{ height: 2, background: henry, width: "3rem" }} />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-wider" style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}>
                Trusted by industry leaders
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {industries.map((industry, i) => (
              <ScrollReveal key={industry.name} delay={i * 80}>
                <div
                  className="group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 h-full"
                  style={{
                    borderColor: `hsl(${industry.colorHsl} / 0.25)`,
                    background: "hsl(230 25% 8%)",
                    boxShadow: `0 4px 30px hsl(${industry.colorHsl} / 0.08)`,
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="absolute inset-0 flex items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, hsl(${industry.colorHsl} / 0.35), hsl(230 25% 4% / 0.92))`,
                        backdropFilter: "blur(2px)",
                      }}
                    >
                      <p
                        className="text-[11px] md:text-xs leading-snug text-foreground/95"
                        style={{ textShadow: `0 0 12px hsl(${industry.colorHsl} / 0.5)` }}
                      >
                        {industry.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h4
                      className="text-sm md:text-base font-bold tracking-wider uppercase text-foreground transition-colors duration-300 group-hover:text-[color:var(--ind-color)]"
                      style={{ ["--ind-color" as never]: `hsl(${industry.colorHsl})` }}
                    >
                      {industry.name}
                    </h4>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-10 max-w-3xl mx-auto">
              <h4 className="text-lg md:text-xl font-semibold text-foreground tracking-wide mb-2">
                Trusted by 36+ Enterprise Customers
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Across Automotive, Defense, Industrial, and Consumer sectors, global leaders rely on NEMI's Physical AI platform to design, develop, and deploy complex hardware systems at scale.
              </p>
            </div>
          </ScrollReveal>
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
        {/* HOME-PAGE CTA SECTION */}
        <section className="relative py-24 md:py-32 px-6 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 45% 50% at 50% 45%, hsl(275 80% 40% / 0.3) 0%, transparent 60%),
                radial-gradient(ellipse 60% 45% at 50% 50%, hsl(260 70% 30% / 0.18) 0%, transparent 55%)
              `,
            }}
          />
          <div className="text-center relative z-[2]">
            <h2
              className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
              style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
            >
              See what LMM can do for
              <br />
              your costs and lead times
            </h2>
            <p className="text-sm md:text-base text-muted-foreground tracking-wide max-w-[500px] mx-auto mb-8">
              We'll show you how NEMI compresses your product development cycle.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-10 py-3.5 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-primary-foreground"
              style={{
                background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
                boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)",
              }}
            >
              Reach Out to Us
            </button>
            <div className="mt-5">
              <a
                href="mailto:info@nemi-ai.com"
                className="text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                info@nemi-ai.com
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* CTA Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[200] px-4"
          style={{ background: "hsl(230 25% 4% / 0.85)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
            style={{
              marginTop: "60px",
              background: "linear-gradient(145deg, hsl(230 25% 8%), hsl(230 25% 5%))",
              boxShadow: "0 0 80px hsl(275 80% 50% / 0.18), 0 30px 60px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
            }}
          >
            <div
              className="h-[2px] w-full"
              style={{ background: "linear-gradient(to right, transparent, hsl(275 80% 60%), hsl(var(--primary)), transparent)" }}
            />

            <div className="p-5 md:p-6">
              <button
                onClick={() => { setShowForm(false); setSubmitted(false); }}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10"
                style={{ color: "hsl(0 0% 60%)" }}
                aria-label="Close form"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "hsl(275 80% 50% / 0.15)" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="hsl(275 80% 70%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-foreground mb-2">Thank you for reaching out!</p>
                  <p className="text-sm text-muted-foreground">Our team will review your inquiry and get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <p className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-1.5" style={{ color: "hsl(275 60% 65%)" }}>
                      Customer Inquiry
                    </p>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">Tell us about your project</h3>
                  </div>

                  <form onSubmit={handleCTASubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Full Name *</label>
                      <input type="text" required placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)]" style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Work Email *</label>
                      <input type="email" required placeholder="john@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)]" style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Company</label>
                      <input type="text" placeholder="Acme Inc." value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)]" style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Location</label>
                      <input type="text" placeholder="City, Country" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)]" style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }} />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Website</label>
                      <input type="url" placeholder="https://yourcompany.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)]" style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }} />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">Brand Deck / Document</label>
                      <label className="flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-all duration-200 hover:border-purple-500/40" style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="hsl(275 60% 65%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs" style={{ color: fileName ? "hsl(0 0% 90%)" : "hsl(0 0% 45%)" }}>
                          {fileName || "Upload PDF, PPT, or images"}
                        </span>
                        <input type="file" accept=".pdf,.ppt,.pptx,.doc,.docx,.png,.jpg,.jpeg" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
                      </label>
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] tracking-[0.18em] uppercase font-semibold text-muted-foreground">How can we help?</label>
                      <textarea rows={2} placeholder="Describe your manufacturing needs, product type, volumes..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-lg border px-3 py-2 text-sm bg-transparent text-foreground outline-none transition-all duration-200 focus:border-purple-500/60 focus:shadow-[0_0_12px_hsl(275_80%_60%/0.15)] resize-none" style={{ borderColor: "hsl(0 0% 100% / 0.08)", background: "hsl(0 0% 100% / 0.03)" }} />
                    </div>
                    <div className="md:col-span-2 flex justify-center pt-1">
                      <button type="submit" className="w-full md:w-auto font-bold text-xs tracking-[0.2em] uppercase px-12 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 text-primary-foreground" style={{ background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))", boxShadow: "0 4px 30px hsl(var(--primary) / 0.35), 0 0 60px hsl(275 80% 60% / 0.1)" }}>
                        Submit Inquiry
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      )}

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
