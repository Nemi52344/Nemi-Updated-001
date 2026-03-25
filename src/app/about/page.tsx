import type { Metadata } from "next";
import AboutUs from "@/views/AboutUs";

export const metadata: Metadata = {
  title: "About NEMI AI — Building the Future of Manufacturing",
  description:
    "Learn about NEMI AI — the team, mission, and technology behind the world's first end-to-end Physical AI manufacturing platform. Led from Bangalore, India.",
  alternates: { canonical: "https://nemiholdings.com/about" },
  openGraph: {
    title: "About NEMI AI — Building the Future of Manufacturing",
    description:
      "Meet the team behind NEMI — combining Physical AI, deep manufacturing know-how, and Bangalore's engineering advantage to reshape global manufacturing.",
    url: "https://nemiholdings.com/about",
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
    "@id": "https://nemiholdings.com/about#webpage",
    url: "https://nemiholdings.com/about",
    name: "About NEMI AI — Building the Future of Manufacturing",
    description:
      "Learn about NEMI AI — the team, mission, and technology behind the world's first end-to-end Physical AI manufacturing platform.",
    isPartOf: { "@id": "https://nemiholdings.com/#website" },
    about: { "@id": "https://nemiholdings.com/#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemiholdings.com/" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://nemiholdings.com/about" },
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
