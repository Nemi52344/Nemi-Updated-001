import { useRef, useEffect, useCallback, lazy, Suspense } from "react";
import nemiLogo from "@/assets/nemi-logo.png";
import nemiNavLogo from "@/assets/nemi-nav-logo.png";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import Navbar from "@/components/Navbar";
import ScrollTransition from "@/components/ScrollTransition";
import useScrollProgress from "@/hooks/useScrollProgress";

const ProblemSection = lazy(() => import("@/components/ProblemSection"));
const CoreTechSection = lazy(() => import("@/components/CoreTechSection"));
const CapabilitiesSection = lazy(() => import("@/components/CapabilitiesSection"));
const CompetitorsSection = lazy(() => import("@/components/CompetitorsSection"));
const IndustriesSection = lazy(() => import("@/components/IndustriesSection"));
const CaseStudyEVSection = lazy(() => import("@/components/CaseStudyEVSection"));
const CTASection = lazy(() => import("@/components/CTASection"));

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const Index = () => {
  const scrollProgress = useScrollProgress();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync video playback to scroll progress (hands come closer)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const setTime = () => {
      if (video.duration && isFinite(video.duration)) {
        const targetTime = scrollProgress * Math.min(video.duration, 10);
        video.currentTime = targetTime;
      }
    };
    if (video.readyState >= 1) {
      setTime();
    } else {
      video.addEventListener("loadedmetadata", setTime, { once: true });
    }
  }, [scrollProgress]);

  // Hero logo+text: fades out and moves up (extended for smoother feel)
  const heroP = rangeProgress(scrollProgress, 0.008, 0.035);
  const heroOpacity = 1 - heroP;
  const heroTranslateY = -heroP * 120;

  // Hands video: starts zoomed in, scales down as you scroll
  const handsZoom = rangeProgress(scrollProgress, 0, 0.05);
  const handsScale = 1.5 - handsZoom * 0.5; // 1.5x → 1x
  const handsFade = rangeProgress(scrollProgress, 0.055, 0.075);
  const handsOpacity = 1 - handsFade;



  // Reduce overlay so hands are more visible
  const overlayOpacity = scrollProgress < 0.04 ? 0.15
    : scrollProgress < 0.07 ? 0.15 + (scrollProgress - 0.04) / 0.03 * 0.5
    : 0.65 - (scrollProgress - 0.07) / 0.93 * 0.15;

  return (
    <div ref={containerRef} className="relative" style={{ height: "1200vh" }}>
      {/* Navbar */}
      <Navbar scrollProgress={scrollProgress} />

      {/* Scroll-synced video background — hands zoom toward viewer */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        className="fixed inset-0 w-full h-full pointer-events-none object-contain md:object-cover"
        style={{
          zIndex: 0,
          opacity: handsOpacity,
          transform: `scale(${handsScale})`,
          objectPosition: "center 60%",
          transition: "transform 0.05s linear",
        }}
      >
        <source src="/videos/HQ_updated_2.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — lighter so hands are prominent */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `linear-gradient(to bottom, hsl(230 25% 4% / ${overlayOpacity}), hsl(230 25% 4% / ${overlayOpacity + 0.1}))`,
        }}
      />


      <ConstellationCanvas />
      <Suspense fallback={null}>
        <ProblemSection scrollProgress={scrollProgress} />
        <CoreTechSection scrollProgress={scrollProgress} />
        <CapabilitiesSection scrollProgress={scrollProgress} />
        <CompetitorsSection scrollProgress={scrollProgress} />
        <IndustriesSection scrollProgress={scrollProgress} />
        <CaseStudyEVSection scrollProgress={scrollProgress} />
        <CTASection scrollProgress={scrollProgress} />
      </Suspense>

      {/* Transition dividers between sections */}
      <ScrollTransition scrollProgress={scrollProgress} at={0.08} />
      <ScrollTransition scrollProgress={scrollProgress} at={0.25} />
      <ScrollTransition scrollProgress={scrollProgress} at={0.45} />
      <ScrollTransition scrollProgress={scrollProgress} at={0.62} />
      <ScrollTransition scrollProgress={scrollProgress} at={0.74} />
      <ScrollTransition scrollProgress={scrollProgress} at={0.84} />
      <ScrollTransition scrollProgress={scrollProgress} at={0.93} />

      {/* Purple nebula glow behind logo */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          opacity: heroOpacity,
          background: `
            radial-gradient(ellipse 35% 35% at 50% 45%, hsl(275 80% 40% / 0.35) 0%, transparent 60%),
            radial-gradient(ellipse 50% 45% at 50% 50%, hsl(260 70% 30% / 0.25) 0%, transparent 55%),
            radial-gradient(ellipse 65% 55% at 50% 50%, hsl(280 60% 20% / 0.18) 0%, transparent 50%)
          `,
          animation: "nebula-breathe 4s ease-in-out infinite",
          transition: "opacity 0.05s linear",
        }}
      />

      {/* Hero */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{
          zIndex: 10,
          opacity: heroOpacity,
          transform: `translateY(${heroTranslateY}px)`,
          transition: "transform 0.05s linear, opacity 0.05s linear",
        }}
      >
        <img
          src={nemiLogo}
          alt="NEMI infinity logo"
          className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 object-contain"
          style={{
            filter: `
              drop-shadow(0 0 30px hsl(275 80% 60% / 0.5))
              drop-shadow(0 0 60px hsl(270 70% 50% / 0.3))
              drop-shadow(0 0 100px hsl(280 80% 45% / 0.15))
            `,
          }}
        />
        <h1
          className="mt-0 text-5xl md:text-7xl font-bold tracking-[0.3em] text-foreground"
          style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
        >
          NEMI AI
        </h1>
        <p
          className="mt-4 text-sm md:text-lg lg:text-xl font-light text-center text-muted-foreground leading-relaxed tracking-[0.15em] uppercase max-w-3xl mx-4"
          style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.4), 0 0 40px hsl(270 70% 50% / 0.2)" }}
        >
          End-to-end Physical AI Platform for Design, Development, and Distribution
        </p>
      </div>


    </div>
  );
};

export default Index;
