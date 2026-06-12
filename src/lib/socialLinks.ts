/**
 * Single source of truth for all external social media + contact links used
 * across the website. Swap placeholder URLs here as each social account goes
 * live — every component (footer, contact page, JSON-LD, sticky CTA) imports
 * from this file, so one edit propagates everywhere.
 *
 * When a placeholder is updated to a real URL, also remove the
 * `placeholder: true` flag so JSON-LD includes the live URL in sameAs.
 */
export interface SocialLink {
  label: string;
  href: string;
  /** True until the real account URL replaces the placeholder. */
  placeholder?: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nemi-ai/",
    // Live
  },
  {
    label: "X",
    href: "https://x.com/Nemi_ai_india",
    // Live
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nemi_ai_/",
    // Live
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590674342019",
    // Live
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCd2rETRVgkA1WIWZ0epPpqQ",
    // Live
  },
];

/**
 * Contact info. Replace dummy phone with real number when ready.
 */
export const CONTACT_INFO = {
  email: "info@nemi-ai.com",
  careersEmail: "info@nemi-ai.com",
  phoneDisplay: "+91 99403 26856",
  phoneTel: "+919940326856",
  phonePlaceholder: false,
  city: "Coimbatore, India",
};

/**
 * Returns only the social URLs that are NOT placeholders, for use in JSON-LD
 * `sameAs` (so Google's Knowledge Graph only links to real accounts).
 */
export const liveSocialUrls = (): string[] =>
  SOCIAL_LINKS.filter((s) => !s.placeholder).map((s) => s.href);
