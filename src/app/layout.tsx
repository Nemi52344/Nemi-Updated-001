import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";

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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
    foundingLocation: { "@type": "Place", name: "Bangalore, India" },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@nemi-ai.com",
      contactType: "customer support",
    },
    sameAs: ["https://www.linkedin.com/company/nemi-ai"],
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
            maxWidth: "800px",
            margin: "0 auto",
            padding: "2rem",
            color: "hsl(0 0% 95%)",
            background: "hsl(230 25% 4%)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1.6,
          }}>
            <h1 style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>NEMI AI</h1>
            <p style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 1rem" }}>
              Full-stack, end-to-end manufacturing automation with Physical AI.
            </p>
            <p style={{ margin: "0 0 1rem", opacity: 0.85 }}>
              Design, manufacture, and deploy physical products, 10&times; faster,
              at aerospace-grade quality. AS9100D and ISO 9001 certified.
            </p>
            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>Platform</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Full-stack manufacturing automation: design, manufacture, deploy</li>
              <li>Powered by the <strong>Large Manufacturing Model (LMM)</strong></li>
              <li>From months to hours, days, and weeks</li>
            </ul>
            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>Explore</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li><a href="/" style={{ color: "hsl(275 80% 65%)" }}>Home</a></li>
              <li><a href="/about" style={{ color: "hsl(275 80% 65%)" }}>About NEMI AI</a></li>
              <li><a href="/services" style={{ color: "hsl(275 80% 65%)" }}>Services</a></li>
              <li><a href="/careers" style={{ color: "hsl(275 80% 65%)" }}>Careers</a></li>
            </ul>
            <p style={{ margin: "1.5rem 0 0", opacity: 0.8 }}>
              Certifications: AS9100D &middot; ISO 9001.
              <br />
              Contact: <a href="mailto:info@nemi-ai.com" style={{ color: "hsl(275 80% 65%)" }}>info@nemi-ai.com</a>
            </p>
            <p style={{ margin: "1rem 0 0", fontSize: "0.85rem", opacity: 0.6 }}>
              This page uses JavaScript for its interactive scroll experience.
              You can still access the full site via the links above.
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
