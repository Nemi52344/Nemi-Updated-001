import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "NEMI AI — End-to-End Physical AI Platform for Manufacturing",
  description:
    "NEMI AI is the world's first end-to-end Physical AI platform. Design, manufacture, and deploy physical products 10× faster at a fraction of Western costs. Powered by the Large Manufacturing Model (LMM).",
  alternates: { canonical: "https://nemiholdings.com/" },
  openGraph: {
    title: "NEMI AI — End-to-End Physical AI Platform for Manufacturing",
    description:
      "Design, manufacture, and deploy physical products 10× faster at a fraction of Western costs. One partner. The full stack.",
    url: "https://nemiholdings.com/",
  },
  twitter: {
    title: "NEMI AI — End-to-End Physical AI Platform for Manufacturing",
    description:
      "Design, manufacture, and deploy physical products 10× faster at a fraction of Western costs. One partner. The full stack.",
  },
};

export default function HomePage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nemiholdings.com/#webpage",
    url: "https://nemiholdings.com/",
    name: "NEMI AI — End-to-End Physical AI Platform for Manufacturing",
    description:
      "NEMI AI is the world's first end-to-end Physical AI platform. Design, manufacture, and deploy physical products 10× faster at a fraction of Western costs.",
    isPartOf: { "@id": "https://nemiholdings.com/#website" },
    about: { "@id": "https://nemiholdings.com/#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemiholdings.com/" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Index />
    </>
  );
}
