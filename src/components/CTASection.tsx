import SiteFooter from "@/components/SiteFooter";

interface CTASectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const CTASection = ({ scrollProgress }: CTASectionProps) => {
  const sectionVisible = scrollProgress > 0.992;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.993, 1.0));

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col pointer-events-auto"
      style={{ zIndex: 45, opacity: enterP, background: "hsl(230 25% 4%)" }}
    >
      {/* CTA, centered */}
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
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase mb-3"
            style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
          >
            Ready to Build?
          </h2>
          <p className="text-xs md:text-base text-muted-foreground mb-5 tracking-wide max-w-[450px] mx-auto">
            See what Physical AI can do for your products.
          </p>
          <a
            href="mailto:info@nemi-ai.com?subject=Book%20a%20Walkthrough"
            className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-primary-foreground mb-4"
            style={{
              background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
              boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)",
            }}
          >
            Book a Walkthrough
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-2">
            <a
              href="mailto:info@nemi-ai.com"
              className="text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              info@nemi-ai.com
            </a>
          </div>
        </div>
      </div>

      {/* Site-wide footer (matches About / Services / etc.) */}
      <SiteFooter />
    </div>
  );
};

export default CTASection;
