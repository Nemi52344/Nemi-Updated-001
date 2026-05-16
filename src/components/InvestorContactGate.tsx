"use client";

import { useEffect, useState } from "react";
import InvestorContactModal from "@/components/ContactFormModal";

const isContactHref = (href: string | null): boolean => {
  if (!href) return false;
  // Matches "#contact", "/#contact", "/foo#contact", etc.
  return href === "#contact" || href.endsWith("#contact");
};

/**
 * Listens for the `#contact` URL hash and opens the single investor inquiry
 * modal. Every "Get in Touch", "Reach Out", or "Request a Demo" link on the
 * site points to `#contact`, so this is the only place the form ever mounts.
 *
 * Also intercepts clicks on `#contact` anchors so the modal re-opens even
 * when the hash was already set (closing strips it; clicking again restores).
 */
const InvestorContactGate = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const openIfContact = () => {
      if (window.location.hash === "#contact") setOpen(true);
    };
    openIfContact();
    window.addEventListener("hashchange", openIfContact);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!isContactHref(href)) return;
      // Ignore modifier-clicks / non-left clicks so users can open in new tab.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      // Always ensure hash is #contact so reloads + share links keep working.
      if (window.location.hash !== "#contact") {
        window.history.pushState(null, "", `${window.location.pathname}${window.location.search}#contact`);
      }
      setOpen(true);
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("hashchange", openIfContact);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return <InvestorContactModal open={open} onClose={() => setOpen(false)} />;
};

export default InvestorContactGate;
