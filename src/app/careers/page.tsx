import type { Metadata } from "next";
import Careers from "@/views/Careers";

export const metadata: Metadata = {
  title: "Careers at NEMI AI — Join the Physical AI Revolution",
  description:
    "Build the Physical Internet. Join NEMI AI's world-class engineering team in Bangalore. Open roles in AI/ML, mechanical design, manufacturing, and operations.",
  alternates: { canonical: "https://nemi-ai.com/careers" },
  openGraph: {
    title: "Careers at NEMI AI — Join the Physical AI Revolution",
    description:
      "Open roles in LMM Research, Mechanical Design, Process Engineering, Fleet Operations and more. Based in Bangalore.",
    url: "https://nemi-ai.com/careers",
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
    "@id": "https://nemi-ai.com/careers#webpage",
    url: "https://nemi-ai.com/careers",
    name: "Careers at NEMI AI — Join the Physical AI Revolution",
    description:
      "Build the Physical Internet. Join NEMI AI's world-class engineering team in Bangalore. Open roles in AI/ML, mechanical design, manufacturing, and operations.",
    isPartOf: { "@id": "https://nemi-ai.com/#website" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemi-ai.com/" },
        { "@type": "ListItem", position: 2, name: "Careers", item: "https://nemi-ai.com/careers" },
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
