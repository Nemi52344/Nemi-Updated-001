import type { Metadata } from "next";
import Careers from "@/views/Careers";

export const metadata: Metadata = {
  title: "Careers at NEMI AI — Join the Physical AI Revolution",
  description:
    "Build the Physical Internet. Join NEMI AI's world-class engineering team in Bangalore. Open roles in AI/ML, mechanical design, manufacturing, and operations.",
  alternates: { canonical: "https://nemiholdings.com/careers" },
  openGraph: {
    title: "Careers at NEMI AI — Join the Physical AI Revolution",
    description:
      "Open roles in LMM Research, Mechanical Design, Process Engineering, Fleet Operations and more. Based in Bangalore.",
    url: "https://nemiholdings.com/careers",
  },
  twitter: {
    title: "Careers at NEMI AI — Join the Physical AI Revolution",
    description:
      "Open roles in LMM Research, Mechanical Design, Process Engineering, Fleet Operations and more. Based in Bangalore.",
  },
};

export default function CareersPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nemiholdings.com/careers#webpage",
    url: "https://nemiholdings.com/careers",
    name: "Careers at NEMI AI — Join the Physical AI Revolution",
    description:
      "Build the Physical Internet. Join NEMI AI's world-class engineering team in Bangalore. Open roles in AI/ML, mechanical design, manufacturing, and operations.",
    isPartOf: { "@id": "https://nemiholdings.com/#website" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemiholdings.com/" },
        { "@type": "ListItem", position: 2, name: "Careers", item: "https://nemiholdings.com/careers" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Careers />
    </>
  );
}
