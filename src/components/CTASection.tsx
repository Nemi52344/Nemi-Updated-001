import nemiNavLogo from "@/assets/nemi-nav-logo.webp";
import { Mail } from "lucide-react";

interface CTASectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const CTASection = ({ scrollProgress }: CTASectionProps) => {
  const sectionVisible = scrollProgress > 0.92;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.93, 0.96));

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col pointer-events-auto"
      style={{ zIndex: 45, opacity: enterP, background: "hsl(230 25% 4%)" }}
    >
      {/* CTA — centered */}
      <div className="flex-1 flex items-center justify-center relative px-6">
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
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase mb-5"
            style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
          >
            Ready to Build?
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground mb-8 tracking-wide max-w-[450px] mx-auto">
            See what Physical AI can do for your products.
          </p>
          <a
            href="mailto:Humans@nemiholdings.com"
            className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-10 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-primary-foreground"
            style={{
              background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
              boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)",
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/30 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
          <div className="flex items-center gap-3">
            <img
              src={nemiNavLogo}
              alt="NEMI"
              className="h-5 md:h-6 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 8px hsl(275 80% 60% / 0.4))" }} decoding="async"
            />
            <span className="text-[0.6rem] md:text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Physical AI Platform
            </span>
          </div>
          <a
            href="mailto:Humans@nemiholdings.com"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-primary" />
            Humans@nemiholdings.com
          </a>
          <p className="text-[10px] md:text-xs text-muted-foreground/60">
            © 2026 NEMI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
