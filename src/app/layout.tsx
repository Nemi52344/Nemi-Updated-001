import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://nemiholdings.com"),
  authors: [{ name: "NEMI AI" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    siteName: "NEMI AI",
    images: ["https://nemiholdings.com/Images/nemi%2001.png"],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@NEMIai",
    images: ["https://nemiholdings.com/Images/nemi%2001.png"],
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
    name: "NEMI AI",
    url: "https://nemiholdings.com",
    logo: "https://nemiholdings.com/Images/nemi%2001.png",
    description:
      "NEMI AI is an end-to-end Physical AI platform powered by the Large Manufacturing Model (LMM). Design with AKIO, manufacture with HENRY, deploy with SAM.",
    foundingLocation: { "@type": "Place", name: "Bangalore, India" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "NEMI Platform Services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "AKIO — Design Intelligence Suite",
          description:
            "AI-powered product and component design. From idea to production-ready design in weeks, not months.",
        },
        {
          "@type": "Offer",
          name: "HENRY — AI-Driven Manufacturing",
          description:
            "Full-stack manufacturing: tooling, metal parts, battery, motor, electronics, and complex assemblies.",
        },
        {
          "@type": "Offer",
          name: "SAM — Deployment & Lifecycle",
          description:
            "Deploy, monitor, and improve every unit. Real-world performance data feeds back into design.",
        },
      ],
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NEMI AI",
    url: "https://nemiholdings.com",
  };

  return (
    <html lang="en" className="dark">
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
