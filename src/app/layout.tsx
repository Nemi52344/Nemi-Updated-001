import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";
import { liveSocialUrls, CONTACT_INFO } from "@/lib/socialLinks";

// viewport-fit=cover unlocks env(safe-area-inset-*) so the sticky mobile CTA
// bar and footer don't get hidden behind iPhone notch / home-bar areas.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0d1a",
};

// Marketing / analytics IDs — all sourced from env so staging vs prod can differ
// and so marketing tag IDs don't live in source control.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;       // e.g. "G-RLBK1DLVN7"
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;                  // e.g. "GTM-XXXXXXX"
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_VERIFICATION;
const FB_VERIFICATION = process.env.NEXT_PUBLIC_FB_VERIFICATION;
const LINKEDIN_VERIFICATION = process.env.NEXT_PUBLIC_LINKEDIN_VERIFICATION;

// Build the `other` map only with non-empty entries so we don't ship empty
// <meta> tags for platforms that aren't configured yet.
const verificationOther: Record<string, string> = {};
if (BING_VERIFICATION) verificationOther["msvalidate.01"] = BING_VERIFICATION;
if (FB_VERIFICATION) verificationOther["facebook-domain-verification"] = FB_VERIFICATION;
if (LINKEDIN_VERIFICATION) verificationOther["linkedin-verification"] = LINKEDIN_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://nemi-ai.com"),
  authors: [{ name: "NEMI AI" }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  // NEMI infinity mark on brand navy. The ?v=2 query busts the aggressive
  // favicon cache in Chrome/Edge so the old Lovable icon is replaced on reload.
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon-192.png?v=2", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png?v=2", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png?v=2",
  },
  verification: {
    ...(GSC_VERIFICATION ? { google: GSC_VERIFICATION } : {}),
    ...(Object.keys(verificationOther).length > 0 ? { other: verificationOther } : {}),
  },
  openGraph: {
    type: "website",
    siteName: "NEMI AI",
    images: [
      {
        url: "https://nemi-ai.com/Images/nemi%2001.png",
        width: 1200,
        height: 630,
        alt: "NEMI AI, End-to-End Physical AI Platform for Manufacturing",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@NEMIai",
    creator: "@NEMIai",
    images: [
      {
        url: "https://nemi-ai.com/Images/nemi%2001.png",
        alt: "NEMI AI, End-to-End Physical AI Platform for Manufacturing",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://nemi-ai.com/#organization",
    name: "NEMI AI",
    url: "https://nemi-ai.com",
    logo: {
      "@type": "ImageObject",
      url: "https://nemi-ai.com/Images/nemi%2001.png",
      width: 1200,
      height: 630,
    },
    description:
      "NEMI AI is a full-stack, end-to-end manufacturing automation platform powered by Physical AI. Design, manufacture, and deploy physical products under one Large Manufacturing Model (LMM).",
    foundingLocation: { "@type": "Place", name: "Coimbatore, India" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: CONTACT_INFO.email,
        contactType: "customer support",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
        // Telephone is omitted when phonePlaceholder is true so Google's
        // Knowledge Graph doesn't index a fake number.
        ...(CONTACT_INFO.phonePlaceholder ? {} : { telephone: CONTACT_INFO.phoneTel }),
      },
      {
        "@type": "ContactPoint",
        email: CONTACT_INFO.careersEmail,
        contactType: "Human Resources",
        areaServed: "Worldwide",
      },
    ],
    // sameAs only contains *live* social URLs (placeholders are filtered out)
    // so Google's entity graph is never linked to a dead profile.
    sameAs: liveSocialUrls(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "NEMI Manufacturing Services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Design",
          description: "AI-powered product and component design. From idea to production-ready validated design in weeks, not months.",
          url: "https://nemi-ai.com/services",
        },
        {
          "@type": "Offer",
          name: "Manufacture",
          description: "Full-stack manufacturing: tooling, metal parts, battery, motor, electronics, and complex assemblies.",
          url: "https://nemi-ai.com/services",
        },
        {
          "@type": "Offer",
          name: "Deploy",
          description: "Deploy, monitor, and improve every unit. Real-world performance data feeds back into design.",
          url: "https://nemi-ai.com/services",
        },
      ],
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://nemi-ai.com/#website",
    name: "NEMI AI",
    url: "https://nemi-ai.com",
    description:
      "End-to-End Physical AI Platform for Design, Development, and Distribution of physical products.",
    publisher: { "@id": "https://nemi-ai.com/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://nemi-ai.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        {/* Google Tag Manager noscript fallback — must be the first thing
            inside <body> per GTM's install recipe. */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {/*
          <noscript> fallback, shown only when JavaScript is disabled.
          Gives search engines without JS + assistive tools a complete,
          readable summary of NEMI and links to every canonical route.
        */}
        <noscript>
          <div style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "2rem",
            color: "hsl(0 0% 95%)",
            background: "hsl(230 25% 4%)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1.6,
          }}>
            {/* Brand — styled like a heading but kept as <p> so each page's
                real <h1> remains the single top-level heading. */}
            <p style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 0.5rem" }} role="heading" aria-level={1}>NEMI AI</p>
            <p style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 1rem" }}>
              Full-stack, end-to-end manufacturing automation with Physical AI.
            </p>
            <p style={{ margin: "0 0 1.5rem", opacity: 0.85 }}>
              Design, manufacture, and deploy physical products under one Large
              Manufacturing Model (LMM), compressing traditional months of work into
              hours, days, and weeks. Headquartered in Coimbatore, India. AS9100D and
              ISO 9001 certified.
            </p>

            {/* From Months to Hours */}
            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>From Months to Hours</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Sketch, traditional 1 month, NEMI LMM days</li>
              <li>Render, traditional 1 month, NEMI LMM days</li>
              <li>CAD, traditional 6+ months, NEMI LMM weeks</li>
              <li>Simulation, traditional 2+ months, NEMI LMM weeks</li>
              <li>Tooling, traditional 6+ months, NEMI LMM 3 months</li>
              <li>Production, traditional manual orchestration, NEMI LMM AI orchestrated</li>
            </ul>

            {/* Services */}
            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>Manufacturing Services</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Tooling &amp; Fixturing — injection moulding, die casting, press tools, fixtures</li>
              <li>SPMs — special purpose machinery and robotic automation</li>
              <li>Metal Parts Manufacturing — cutting, bending, forming, welding, machining, casting, forging</li>
              <li>Plastics, Rubbers, Composites — injection moulding, extrusion, blow moulding, thermoforming</li>
              <li>Battery Manufacturing — portable chargers to drones to EVs to industrial energy storage</li>
              <li>Motor Manufacturing — BLDC, Axial Flux and other motors</li>
              <li>Electronics Production — PCB assemblies, box builds, system integration and testing</li>
              <li>Speedshop — rapid response production for fast turnaround</li>
              <li>Complex Assemblies — EVs, drones, robotics</li>
            </ul>

            {/* Industries */}
            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>Industries We Serve</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Aerospace &amp; Defense</li>
              <li>Automotive</li>
              <li>Appliance &amp; Consumer Hardware</li>
              <li>Robotics &amp; AI</li>
            </ul>

            {/* Proof points */}
            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>Proof Points</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>300K+ sq ft of owned manufacturing footprint across India.</li>
              <li>2,500+ EV units deployed across India and Africa.</li>
              <li>EV development cycle reduced from 18 months to 9 months (2&times; faster).</li>
              <li>Programs shipped with 2&times; to 10&times; improvements in speed and cost.</li>
            </ul>

            {/* Leadership */}
            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>Leadership</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Anirudh Ravi Narayanan, CEO (BS ECE Rose-Hulman, MBA Yale; ex-McKinsey)</li>
              <li>Gokul Madhavan, CFO (Harvard A.B./PhD, Yale MBA)</li>
              <li>Shreerith Seshadri, CTO (ex-eightfold.AI; CS, UIUC)</li>
              <li>Vinoth Thiruvenkatasamy, COO (20+ years automotive manufacturing)</li>
            </ul>

            {/* Locations */}
            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>Locations</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Active: Coimbatore, Chennai (India)</li>
              <li>Coming Soon (2026): United States, Western Europe, UAE</li>
            </ul>

            {/* Explore */}
            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>Explore</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li><a href="/" style={{ color: "hsl(275 80% 65%)" }}>Home</a></li>
              <li><a href="/about" style={{ color: "hsl(275 80% 65%)" }}>About NEMI AI</a></li>
              <li><a href="/services" style={{ color: "hsl(275 80% 65%)" }}>Services</a></li>
              <li><a href="/careers" style={{ color: "hsl(275 80% 65%)" }}>Careers</a></li>
            </ul>

            {/* Contact */}
            <p style={{ margin: "1.5rem 0 0", opacity: 0.8 }}>
              Certifications: AS9100D &middot; ISO 9001 &middot; DRDO Cleared &middot; ISRO Cleared.
              <br />
              General: <a href="mailto:info@nemi-ai.com" style={{ color: "hsl(275 80% 65%)" }}>info@nemi-ai.com</a>
              {" "}&middot;{" "}
              Careers: <a href="mailto:info@nemi-ai.com" style={{ color: "hsl(275 80% 65%)" }}>info@nemi-ai.com</a>
              <br />
              <a href="https://www.linkedin.com/company/nemi-ai" style={{ color: "hsl(275 80% 65%)" }}>LinkedIn</a>
            </p>
          </div>
        </noscript>

        {/*
          Google Tag Manager — single hook that lets marketing add more tags
          (LinkedIn Insight, Meta Pixel, conversion pixels, etc.) without code
          deploys. Loaded after interactive so it never blocks LCP.
        */}
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}

        {/*
          Google Analytics 4 — loaded directly (in addition to GTM) so we
          continue to receive baseline pageview data even if the GTM container
          is paused or misconfigured. If you migrate GA4 fully into GTM, set
          NEXT_PUBLIC_GA_ID empty to disable this block.
        */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
