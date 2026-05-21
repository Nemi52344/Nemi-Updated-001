/**
 * Tiny event-tracking helper that pushes to GTM's dataLayer (which then
 * forwards to GA4, LinkedIn Insight, Meta Pixel, or any other tag wired up
 * inside Google Tag Manager).
 *
 * Usage:
 *   import { track } from "@/lib/analytics";
 *   track("contact_form_submit");
 *   track("resume_submit", { role: "Engineer", department: "AI" });
 *
 * Safe to call from anywhere — no-ops on the server, no-ops if GTM hasn't
 * loaded yet (the dataLayer array buffers events until GTM picks them up).
 */

type TrackParams = Record<string, unknown>;

interface DataLayerWindow extends Window {
  dataLayer?: Array<Record<string, unknown>>;
}

export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
