"use client";

import { useEffect } from "react";
import { Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

const Contact = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "hsl(230 25% 4%)" }}>
      <Navbar scrollProgress={1} />

      {/* ───────────── HERO ───────────── */}
      <header className="min-h-screen flex flex-col items-center justify-center pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 25%, hsl(275 80% 40% / 0.20) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-4"
            style={{ color: "hsl(275 60% 70%)" }}
          >
            Contact
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-5"
            style={{ color: "hsl(0 0% 98%)", textShadow: "0 0 32px hsl(275 80% 60% / 0.35)" }}
          >
            Let&rsquo;s build together.
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you&rsquo;re scoping a program, hiring talent, or just curious about the
            Large Manufacturing Model &mdash; the right team will get back to you within one
            business day.
          </p>

          {/* Primary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 font-bold text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-xl text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
                boxShadow: "0 4px 24px hsl(275 80% 55% / 0.3)",
                minHeight: 48,
              }}
            >
              Send Us a Message
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="mailto:info@nemi-ai.com"
              className="inline-flex items-center font-semibold text-xs tracking-[0.2em] uppercase px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                color: "hsl(0 0% 95%)",
                border: "1px solid hsl(275 80% 60% / 0.4)",
                background: "hsl(275 80% 30% / 0.08)",
                minHeight: 48,
              }}
            >
              Or Email Directly
            </a>
          </div>

          {/* Trust indicator */}
          <div className="mt-7 flex justify-center">
            <span
              className="inline-flex items-center gap-2 text-[11px] md:text-xs tracking-wide text-muted-foreground px-4 py-1.5 rounded-full"
              style={{ border: "1px solid hsl(275 80% 60% / 0.18)", background: "hsl(275 80% 55% / 0.05)" }}
            >
              <Clock className="w-3.5 h-3.5" style={{ color: "hsl(275 60% 70%)" }} />
              Typical response &mdash; within one business day
            </span>
          </div>
        </div>
      </header>

      <SiteFooter />
    </div>
  );
};

export default Contact;
