import type { Metadata } from "next";
import AboutUs from "@/views/AboutUs";

export const metadata: Metadata = {
  title: "About NEMI AI — Building the Future of Manufacturing",
  description:
    "Learn about NEMI AI — the team, mission, and technology behind the end-to-end Physical AI manufacturing platform. Led from Bangalore, India.",
  alternates: { canonical: "https://nemi-ai.com/about" },
  openGraph: {
    title: "About NEMI AI — Building the Future of Manufacturing",
    description:
      "Meet the team behind NEMI — combining Physical AI, deep manufacturing know-how, and Bangalore's engineering advantage to reshape global manufacturing.",
    url: "https://nemi-ai.com/about",
  },
  twitter: {
    title: "About NEMI AI — Building the Future of Manufacturing",
    description:
      "Meet the team behind NEMI — combining Physical AI, deep manufacturing know-how, and Bangalore's engineering advantage to reshape global manufacturing.",
  },
};

export default function AboutPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://nemi-ai.com/about#webpage",
    url: "https://nemi-ai.com/about",
    name: "About NEMI AI — Building the Future of Manufacturing",
    description:
      "Learn about NEMI AI — the team, mission, and technology behind the end-to-end Physical AI manufacturing platform.",
    isPartOf: { "@id": "https://nemi-ai.com/#website" },
    about: { "@id": "https://nemi-ai.com/#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemi-ai.com/" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://nemi-ai.com/about" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <AboutUs />
    </>
  );
}
