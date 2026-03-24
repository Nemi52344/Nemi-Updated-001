import nemiNavLogo from "@/assets/nemi-nav-logo.png";
import { Mail } from "lucide-react";

interface CTASectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const CTASection = ({ scrollProgress }: CTASectionProps) => {
  const sectionVisible = scrollProgress > 0.88;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.89, 0.92));

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 pointer-events-auto"
      style={{ zIndex: 40, opacity: enterP }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-16">
        {/* Top row: logo + tagline | email */}
        <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 py-5 md:py-10">
          <div className="flex flex-col items-start gap-1.5">
            <img
              src={nemiNavLogo}
              alt="NEMI"
              className="h-5 md:h-7 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 8px hsl(275 80% 60% / 0.4))" }}
            />
            <span className="text-xs md:text-base tracking-[0.3em] uppercase text-muted-foreground text-left">
              Physical AI Platform
            </span>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1.5">
            <span className="text-xs md:text-base text-muted-foreground">
              Get in touch with us at
            </span>
            <a
              href="mailto:Humans@nemiholdings.com"
              className="flex items-center gap-2 text-xs md:text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" />
              Humans@nemiholdings.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border/40" />

        {/* Bottom row: copyright | services */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-4 md:py-8">
          <p className="text-[10px] md:text-sm text-muted-foreground/60">
            © 2026 NEMI. All rights reserved.
          </p>
          <p className="text-[10px] md:text-sm text-muted-foreground/60 tracking-wide">
            Design · Development · Distribution
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
