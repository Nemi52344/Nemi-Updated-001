"use client";

const SiteFooter = () => {
  return (
    <footer
      className="pt-6 pb-4 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]"
      aria-labelledby="site-footer-heading"
    >
      <h2 id="site-footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Brand band */}
        <div>
          <p className="font-bold text-base tracking-[0.15em] uppercase text-foreground mb-1">
            NEMI AI
          </p>
          <p className="text-[11px] md:text-xs text-muted-foreground max-w-xl leading-relaxed">
            Full-stack, end-to-end manufacturing automation with Physical AI.
          </p>
        </div>

        {/* Contact */}
        <div className="md:text-right">
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-1.5">
            Contact
          </p>
          <a
            href="mailto:info@nemi-ai.com"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors block"
          >
            info@nemi-ai.com
          </a>
          <a
            href="https://www.linkedin.com/company/nemi-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-block mt-1"
          >
            LinkedIn &rarr;
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-4 pt-3 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[11px] text-muted-foreground">
          &copy; 2026 NEMI AI. All rights reserved.
        </p>
        <p className="text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground/60">
          AS9100D · ISO 9001
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
