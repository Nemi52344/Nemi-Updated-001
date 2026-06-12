"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, ArrowRight } from "lucide-react";

/**
 * Sticky "Talk to Us" bar pinned to the bottom of the viewport on mobile only
 * (<md). Tapping it triggers the global #contact modal (handled by
 * InvestorContactGate). Hidden on /contact (already a contact page) and on the
 * Careers Drop Resume form view (its own focused flow).
 *
 * Respects iOS safe-area-inset-bottom via env() so it sits above the home bar.
 * Mounted globally in app/providers.tsx.
 */
// /contact is already a contact page; /careers has its own focused conversion
// flow (Drop Resume form + Shape the Future CTA) — the floating bar was
// overlapping the form's Submit button there.
const HIDDEN_PATHS = ["/contact", "/careers"];

const MobileStickyCTA = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  // Visibility rules (all must pass):
  //  1. Past the hero (scrollY > 120) — keeps the first paint clean.
  //  2. Not near the end of the document — the last stretch is the page's own
  //     CTA + footer, and the bar was covering the footer links there.
  //  3. Scrolling UP (or paused after scrolling up). While the user scrolls
  //     down they're reading — the scroll-driven pages render content in
  //     full-viewport fixed overlays, so a permanently floating bar would sit
  //     on top of the bottom row of every section (e.g. the Services card
  //     grid). Scroll-up intent = "looking for something" — right moment to
  //     offer contact.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const goingUp = y < lastY - 2; // small dead-zone so micro-jitter doesn't flash the bar
      const goingDown = y > lastY + 2;
      lastY = y;
      const remaining = document.documentElement.scrollHeight - window.innerHeight - y;
      if (y <= 120 || remaining <= 400) {
        setShow(false);
      } else if (goingUp) {
        setShow(true);
      } else if (goingDown) {
        setShow(false);
      }
      // No direction change → keep current state
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide entirely on pages where the CTA is redundant
  if (HIDDEN_PATHS.includes(pathname)) return null;

  return (
    <div
      className="md:hidden fixed left-0 right-0 z-[80] pointer-events-none transition-all duration-300"
      style={{
        bottom: 0,
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
        paddingRight: "max(0.75rem, env(safe-area-inset-right))",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(120%)",
      }}
      aria-hidden={!show}
    >
      <a
        href="#contact"
        className="pointer-events-auto flex items-center justify-between gap-3 px-5 py-3.5 rounded-full text-white font-bold text-xs tracking-[0.18em] uppercase shadow-2xl"
        style={{
          background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
          boxShadow:
            "0 8px 24px hsl(275 80% 50% / 0.35), 0 0 0 1px hsl(275 80% 70% / 0.3) inset",
          minHeight: 48,
        }}
      >
        <span className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" aria-hidden />
          <span>Talk to Us</span>
        </span>
        <ArrowRight className="w-4 h-4" aria-hidden />
      </a>
    </div>
  );
};

export default MobileStickyCTA;
