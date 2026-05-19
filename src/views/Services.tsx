"use client";

import { useEffect } from "react";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { CaseStudy } from "@/components/services/CaseStudy";
import useScrollProgress from "@/hooks/useScrollProgress";
import industryAerospace from "@/assets/industry-aerospace.webp";
import industryAutomotive from "@/assets/industry-automotive.webp";
import industryElectronics from "@/assets/industry-electronics.webp";
import industryRobotics from "@/assets/industry-robotics.webp";

const akio = "hsl(275, 80%, 65%)";
const henry = "hsl(275, 80%, 65%)";
const sam = "hsl(275, 80%, 65%)";

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface ServiceItem {
  title: string;
  desc: string;
  img: string;
}

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
  { name: "Aerospace & Defense", image: industryAerospace, colorHsl: "210 85% 55%", description: "AS9100D-certified production of UAV airframes, structural assemblies and mission electronics for defense primes." },
  { name: "Automotive", image: industryAutomotive, colorHsl: "0 75% 55%", description: "Electronics and battery enclosures: PCBAs, sensor modules, EV battery enclosures and trim assemblies for automotive OEMs." },
  { name: "Appliance & Consumer Hardware", image: industryElectronics, colorHsl: "45 90% 50%", description: "Connected appliances and consumer hardware: PCBs, plastics, sheet metal and final assembly under one roof." },
  { name: "Robotics & AI", image: industryRobotics, colorHsl: "275 80% 60%", description: "Industrial robot platforms: precision actuators, vision modules and motion control sub-systems." },
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollProgress = useScrollProgress();

  // 7 panels evenly distributed across the scroll: hero, grid, industries, CS1, CS2, CS3, CTA
  // Step ~ 0.143 each
  // Hero
  const heroVisible = scrollProgress < 0.16;
  const heroExit = easeOut(rangeProgress(scrollProgress, 0.12, 0.16));
  const heroOp = 1 - heroExit;

  // Services grid
  const gridVisible = scrollProgress > 0.13 && scrollProgress < 0.30;
  const gridEnter = easeOut(rangeProgress(scrollProgress, 0.14, 0.18));
  const gridExit = easeOut(rangeProgress(scrollProgress, 0.26, 0.30));
  const gridOp = gridEnter * (1 - gridExit);

  // Industries
  const indVisible = scrollProgress > 0.28 && scrollProgress < 0.45;
  const indEnter = easeOut(rangeProgress(scrollProgress, 0.29, 0.33));
  const indExit = easeOut(rangeProgress(scrollProgress, 0.41, 0.45));
  const indOp = indEnter * (1 - indExit);

  // Case Study 1
  const cs1Visible = scrollProgress > 0.43 && scrollProgress < 0.59;
  const cs1Enter = easeOut(rangeProgress(scrollProgress, 0.44, 0.48));
  const cs1Exit = easeOut(rangeProgress(scrollProgress, 0.55, 0.59));
  const cs1Op = cs1Enter * (1 - cs1Exit);

  // Case Study 2
  const cs2Visible = scrollProgress > 0.57 && scrollProgress < 0.73;
  const cs2Enter = easeOut(rangeProgress(scrollProgress, 0.58, 0.62));
  const cs2Exit = easeOut(rangeProgress(scrollProgress, 0.69, 0.73));
  const cs2Op = cs2Enter * (1 - cs2Exit);

  // Case Study 3
  const cs3Visible = scrollProgress > 0.71 && scrollProgress < 0.87;
  const cs3Enter = easeOut(rangeProgress(scrollProgress, 0.72, 0.76));
  const cs3Exit = easeOut(rangeProgress(scrollProgress, 0.83, 0.87));
  const cs3Op = cs3Enter * (1 - cs3Exit);

  // CTA + Footer
  const ctaVisible = scrollProgress > 0.85;
  const ctaEnter = easeOut(rangeProgress(scrollProgress, 0.86, 0.92));

  return (
    <div className="bg-background text-foreground font-['Montserrat',sans-serif] font-light relative" style={{ height: "1100vh" }}>
      {/* Background */}
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

      {/* ── 1. HERO ── */}
      {heroVisible && (
        <div
          className="fixed inset-0 z-[10] flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 text-center services-hero ls-allow-scroll"
          style={{ opacity: heroOp }}
        >
          <div className="max-w-5xl mx-auto w-full pt-16">
            <h1
              className="font-extrabold uppercase leading-[1.02] tracking-tight mb-2 md:mb-3 text-foreground"
              style={{ fontSize: "clamp(2rem, 6vw, 4.25rem)" }}
            >
              We deliver on what matters.
            </h1>
            <p
              className="font-extrabold uppercase leading-[1.05] tracking-tight mb-6 md:mb-10 whitespace-nowrap"
              style={{ fontSize: "clamp(1.4rem, 7vw, 5rem)" }}
            >
              <span style={{ color: akio }}>Cost</span>
              <span className="text-muted-foreground/50">{" · "}</span>
              <span style={{ color: henry }}>Quality</span>
              <span className="text-muted-foreground/50">{" · "}</span>
              <span style={{ color: sam }}>Speed</span>
            </p>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-[1.8] max-w-2xl mx-auto tracking-wide">
              <span className="text-foreground font-semibold">Cost unmatched. Quality par excellence. Speed never before seen.</span>{" "}
              Physical AI turns every job into compounding advantage.
            </p>
          </div>
        </div>
      )}

      {/* ── 2. SERVICES GRID ── */}
      {gridVisible && (() => {
        const renderCard = (s: ServiceItem, i: number) => {
          const cardP = easeOut(Math.min(Math.max((gridEnter - i * 0.08) / 0.5, 0), 1));
          return (
            <div
              key={s.title}
              className="bg-background transition-colors duration-300 cursor-default h-full services-card"
              style={{ padding: "0.75rem", opacity: cardP, transform: `translateY(${(1 - cardP) * 24}px)` }}
            >
              <div
                className="bg-card services-card-img-wrap"
                style={{ height: 75, marginBottom: "0.6rem", overflow: "hidden", borderLeft: `2px solid ${henry}` }}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div style={{ width: "2rem", height: 2, background: henry, marginBottom: "0.6rem" }} className="services-card-rule" />
              <h3 className="text-foreground font-bold text-xs md:text-sm tracking-wider uppercase mb-1.5">{s.title}</h3>
              <p className="text-muted-foreground text-[11px] md:text-xs leading-[1.5] tracking-wide">{s.desc}</p>
            </div>
          );
        };

        // On mobile we split into 3 distinct sub-pages (3 + 3 + 3) driven by raw section progress:
        // sub-progress is divided in thirds.
        const mobileSubProgress = rangeProgress(scrollProgress, 0.16, 0.28);
        const mobilePageIndex = mobileSubProgress < 1 / 3 ? 0 : mobileSubProgress < 2 / 3 ? 1 : 2;
        const mobileCards = henryServices.slice(mobilePageIndex * 3, mobilePageIndex * 3 + 3);
        const mobilePageLabel = `${mobilePageIndex + 1} / 3`;

        return (
          <div
            className="fixed inset-0 z-[10] flex flex-col justify-center overflow-y-auto pt-20 pb-6 lg:pt-24 lg:pb-6 services-grid-section"
            style={{ opacity: gridOp }}
          >
            <div className="w-full mx-auto px-6 md:px-10 lg:px-12 xl:px-14" style={{ maxWidth: "1680px" }}>
              <div className="mb-4 md:mb-5 flex items-end justify-between">
                <div>
                  <p className="font-bold text-sm md:text-base tracking-[0.35em] uppercase mb-2" style={{ color: henry, textShadow: `0 0 18px ${henry}55` }}>
                    Services
                  </p>
                  <div style={{ height: 2, background: henry, width: "4rem" }} />
                </div>
                <span className="md:hidden text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: henry }}>
                  {mobilePageLabel}
                </span>
              </div>

              {/* Mobile: single column of 3 cards, paginated 3 pages by scroll progress.
                  NOTE: no inline `display` style here — that would override `md:hidden`. */}
              <div
                className="services-card-grid grid md:!hidden border border-border"
                style={{
                  gridTemplateColumns: "1fr",
                  gap: "1px",
                  background: "hsl(var(--border))",
                }}
              >
                {mobileCards.map((s, i) => renderCard(s, i))}
              </div>

              {/* Desktop / tablet: full 3-col grid showing all 9 services. */}
              <div
                className="services-card-grid hidden md:grid border border-border"
                style={{
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1px",
                  background: "hsl(var(--border))",
                }}
              >
                {henryServices.map((s, i) => renderCard(s, i))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── 3. INDUSTRIES ── */}
      {indVisible && (
        <div
          className="fixed inset-0 z-[10] flex flex-col justify-center items-center px-6 md:px-12 lg:px-16 overflow-y-auto pt-20 pb-8 lg:py-0 industries-section"
          style={{ opacity: indOp }}
        >
          <div className="w-full mx-auto lg:pt-16 px-0 md:px-10 industries-inner" style={{ maxWidth: "1280px" }}>
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-wider" style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}>
                Industries we serve
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 w-full mx-auto" style={{ maxWidth: "1600px" }}>
              {industries.map((industry, i) => {
                const cardP = easeOut(Math.min(Math.max((indEnter - i * 0.1) / 0.5, 0), 1));
                return (
                <div
                  key={industry.name}
                  className="group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 h-full"
                  style={{
                    borderColor: `hsl(${industry.colorHsl} / 0.25)`,
                    background: "hsl(230 25% 8%)",
                    boxShadow: `0 4px 30px hsl(${industry.colorHsl} / 0.08)`,
                    opacity: cardP,
                    transform: `translateY(${(1 - cardP) * 28}px)`,
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
                      <p className="text-[11px] md:text-xs leading-snug text-foreground/95" style={{ textShadow: `0 0 12px hsl(${industry.colorHsl} / 0.5)` }}>
                        {industry.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 text-center">
                    <h4
                      className="text-xs md:text-sm font-bold tracking-wider uppercase text-foreground transition-colors duration-300 group-hover:text-[color:var(--ind-color)]"
                      style={{ ["--ind-color" as never]: `hsl(${industry.colorHsl})` }}
                    >
                      {industry.name}
                    </h4>
                  </div>
                </div>
                );
              })}
            </div>
            <div className="text-center mt-6 max-w-3xl mx-auto">
              <h4 className="text-base md:text-lg font-semibold text-foreground tracking-wide mb-1">
                Built for the industries that build the world
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                From aerospace and automotive to consumer hardware and robotics, NEMI partners with manufacturers across every sector that demands precision, scale, and speed. We design, develop, and deliver complex hardware end-to-end.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. CASE STUDY 1 ── */}
      {cs1Visible && (
        <div className="fixed inset-0 z-[10] flex flex-col justify-center overflow-y-auto py-16 lg:py-0 lg:pt-[29px] case-study-section cs-1" style={{ opacity: cs1Op }}>
          <div className="w-full px-6 md:px-12 lg:px-16 mb-4">
            <p className="text-foreground font-bold text-xs tracking-[0.25em] uppercase mb-2">NEMI&rsquo;s LMM in Real World Application</p>
            <div style={{ height: 2, background: akio, width: "3rem" }} />
          </div>
          <div className="w-full">
            <CaseStudy
              title="Electric Motorcycle for Africa"
              context="Ruggedised electric motorcycle design required for African road conditions and bike taxi use cases."
              outcome="PRD to production-ready in 6 months, delivering full CAD and component designs. Tooling and fixture designs, and supplier base all delivered in additional 3 months."
              color={akio}
              imageSrc="/Images/Messenger.webp"
              imageAlt="Electric Motorcycle for Africa"
              metrics={[
                { label: "Design time", before: "24 months", beforeDetail: "Traditional CAD-to-production cycle", after: "9 months", afterDetail: "Concept to production-ready with NEMI", barPercent: 37, color: akio },
                { label: "Development cost", before: "Baseline", beforeDetail: "Industry-standard tooling + supplier spend", after: "1/10th", afterDetail: "Integrated stack, no supply chain juggling", barPercent: 10, color: akio },
              ]}
            />
          </div>
        </div>
      )}

      {/* ── 5. CASE STUDY 2 ── */}
      {cs2Visible && (
        <div className="fixed inset-0 z-[10] flex flex-col justify-center overflow-y-auto py-16 lg:py-0 lg:pt-[29px] case-study-section cs-2" style={{ opacity: cs2Op }}>
          <div className="w-full px-6 md:px-12 lg:px-16 mb-4">
            <p className="text-foreground font-bold text-xs tracking-[0.25em] uppercase mb-2">NEMI&rsquo;s LMM in Real World Application</p>
            <div style={{ height: 2, background: henry, width: "3rem" }} />
          </div>
          <div className="w-full">
            <CaseStudy
              title="Aerospace Machined Parts"
              context="Mass production of aluminium 6061-T651 machined parts with tight tolerances < 2 micron."
              outcome="Created fixturing and innovative methods to manufacture part in standard 3-axis instead of 5-axis."
              color={henry}
              imageSrc="/Images/Aerospace%20machined%20parts.png"
              imageAlt="Aerospace Machined Parts"
              imageFirst={false}
              metrics={[
                { label: "Machining time", before: "9 hrs/part", beforeDetail: "5-axis precision setup per part", after: "3 hrs/part", afterDetail: "Standard 3-axis with custom fixturing", barPercent: 33, color: henry },
                { label: "Cost reduction", before: "Baseline", beforeDetail: "Industry-standard aerospace machining cost", after: ">50%", afterDetail: "Lower tooling + faster cycle time", barPercent: 50, color: henry },
              ]}
            />
          </div>
        </div>
      )}

      {/* ── 6. CASE STUDY 3 ── */}
      {cs3Visible && (
        <div className="fixed inset-0 z-[10] flex flex-col justify-center overflow-y-auto py-16 lg:py-0 lg:pt-[29px] case-study-section cs-3" style={{ opacity: cs3Op }}>
          <div className="w-full px-6 md:px-12 lg:px-16 mb-4">
            <p className="text-foreground font-bold text-xs tracking-[0.25em] uppercase mb-2">NEMI&rsquo;s LMM in Real World Application</p>
            <div style={{ height: 2, background: henry, width: "3rem" }} />
          </div>
          <div className="w-full">
            <CaseStudy
              title="Complex Assembly Production"
              context="Mass production of automated coffee machine."
              outcome="End-to-end manufacturing from fabrication, machining, electronics, wiring harnesses to complete assembly."
              color={henry}
              imageSrc="/Images/COffee%20mfg.webp"
              imageAlt="Complex Assembly Production"
              metrics={[
                { label: "Initial setup lead time", before: "Benchmark", beforeDetail: "Typical multi-supplier coordination cycle", after: "<6 weeks", afterDetail: "End-to-end NEMI setup with in-house tooling", barPercent: 40, color: henry },
                { label: "Cost reduction", before: "Baseline", beforeDetail: "Traditional outsourced assembly cost", after: ">30%", afterDetail: "Vertically integrated machining + assembly", barPercent: 70, color: henry },
              ]}
            />
          </div>
        </div>
      )}

      {/* ── 7. CTA + FOOTER ── */}
      {ctaVisible && (
        <div className="fixed inset-0 z-[10] flex flex-col services-cta-section" style={{ opacity: ctaEnter }}>
        <section className="relative z-[5] flex-1 flex items-center justify-center py-16 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 45% 50% at 50% 45%, hsl(275 80% 40% / 0.3) 0%, transparent 60%),
              radial-gradient(ellipse 60% 45% at 50% 50%, hsl(260 70% 30% / 0.18) 0%, transparent 55%)
            `,
          }}
        />
        <div className="text-center relative z-[2] max-w-3xl">
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
          <a
            href="#contact"
            className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-10 py-3.5 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-primary-foreground"
            style={{
              background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
              boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)",
            }}
          >
            Get in Touch
          </a>
          <div className="mt-5">
            <a href="mailto:info@nemi-ai.com" className="text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors">
              info@nemi-ai.com
            </a>
          </div>
        </div>
        </section>
        <SiteFooter />
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .services-card-grid { grid-template-columns: 1fr !important; }
          .services-card-grid .services-card { padding: 0.75rem !important; }
          .services-card-grid .services-card-img-wrap { height: 130px !important; margin-bottom: 0.55rem !important; }
          .services-card-grid .services-card-img-wrap img { opacity: 0.95 !important; }
          .services-card-grid h3 { font-size: 14px !important; margin-bottom: 0.25rem !important; }
          .services-card-grid p { font-size: 11.5px !important; line-height: 1.45 !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          /* Phone landscape / small tablet: keep 3-col desktop layout but compact */
          .services-card-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .services-card-grid .services-card { padding: 0.5rem !important; }
          .services-card-grid .services-card-img-wrap { height: 60px !important; margin-bottom: 0.4rem !important; }
          .services-card-grid h3 { font-size: 10.5px !important; margin-bottom: 0.2rem !important; }
          .services-card-grid p { font-size: 9.5px !important; line-height: 1.3 !important; }
        }
        /* Landscape phone — image + title only, descriptions hidden so 3×3 fits */
        @media (max-width: 900px) and (orientation: landscape),
               (max-height: 700px) and (orientation: landscape) {
          .services-card-grid { grid-template-columns: repeat(3, 1fr) !important; display: grid !important; }
          .services-card-grid .services-card { padding: 0.5rem !important; }
          .services-card-grid .services-card-img-wrap { height: 55px !important; min-height: 0 !important; margin-bottom: 0.4rem !important; }
          .services-card-grid .services-card-rule { width: 1.5rem !important; height: 2px !important; margin-bottom: 0.35rem !important; display: block !important; }
          .services-card-grid h3 { font-size: 10px !important; margin-bottom: 0 !important; line-height: 1.15 !important; letter-spacing: 0.05em !important; font-weight: 700 !important; }
          .services-card-grid p { display: none !important; }
          .services-card-grid[class*="md:!hidden"] { display: none !important; }
          .services-card-grid[class*="md:grid"] { display: grid !important; }
        }
      `}</style>
    </div>
  );
};

export default Services;
