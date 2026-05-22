import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "NEMI AI, Full-Stack Manufacturing Automation with Physical AI",
  description:
    "NEMI AI is a full-stack, end-to-end manufacturing automation platform powered by Physical AI. Design, manufacture, and deploy physical products under one Large Manufacturing Model (LMM), compressing months of work into hours, days, and weeks.",
  alternates: { canonical: "https://nemi-ai.com/" },
  openGraph: {
    title: "NEMI AI, Full-Stack Manufacturing Automation with Physical AI",
    description:
      "Full-stack, end-to-end manufacturing automation. Design, manufacture, and deploy physical products under one Large Manufacturing Model. From months to hours.",
    url: "https://nemi-ai.com/",
  },
  twitter: {
    title: "NEMI AI, Full-Stack Manufacturing Automation with Physical AI",
    description:
      "Full-stack, end-to-end manufacturing automation. Design, manufacture, and deploy physical products under one Large Manufacturing Model. From months to hours.",
  },
};

export default function HomePage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nemi-ai.com/#webpage",
    url: "https://nemi-ai.com/",
    name: "NEMI AI, Full-Stack Manufacturing Automation with Physical AI",
    description:
      "Full-stack, end-to-end manufacturing automation with Physical AI. Design, manufacture, and deploy physical products under one Large Manufacturing Model (LMM).",
    isPartOf: { "@id": "https://nemi-ai.com/#website" },
    about: { "@id": "https://nemi-ai.com/#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemi-ai.com/" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      {/*
        sr-only: Visually hidden but fully readable by search engines and AI crawlers.
        The visible page uses scroll-driven animation, so canonical text content is
        mirrored here for indexing. Content matches the live UI.
      */}
      <div className="sr-only" aria-hidden="false">
        <main>
          <h1>NEMI AI, Full-Stack Manufacturing Automation with Physical AI</h1>
          <p>
            NEMI AI is a full-stack, end-to-end manufacturing automation platform powered by
            Physical AI. Design, manufacture, and deploy physical products under one
            Large Manufacturing Model (LMM), compressing months of traditional work into
            hours, days, and weeks.
          </p>

          <section aria-label="From Months to Hours">
            <h2>From Months to Hours</h2>
            <p>
              A unified manufacturing system that learns faster every cycle, connecting every
              stage from design to delivery. Six stages, traditionally taking months, now
              compressed by the NEMI LMM:
            </p>
            <ul>
              <li>Sketch, traditional 1 month, NEMI LMM days</li>
              <li>Render, traditional 1 month, NEMI LMM days</li>
              <li>CAD, traditional 6+ months, NEMI LMM weeks</li>
              <li>Simulation, traditional 2+ months, NEMI LMM weeks</li>
              <li>Tooling, traditional 6+ months, NEMI LMM 3 months</li>
              <li>Production, traditional manual orchestration, NEMI LMM AI orchestrated</li>
            </ul>
            <p>
              Every cycle compounds knowledge, precision, speed, and cost reduction.
            </p>
          </section>

          <section aria-label="Large Manufacturing Model technology">
            <h2>Large Manufacturing Model (LMM)</h2>
            <p>
              NEMI&rsquo;s proprietary Large Manufacturing Model is trained on real
              manufacturing data, CAD geometries, sensor streams, quality outcomes, and
              process parameters. It connects design, development, and distribution into a
              single learning loop where every job makes the model smarter.
            </p>
          </section>

          <section aria-label="Contact">
            <h2>Get in Touch</h2>
            <p>
              See what the LMM can do for your costs and lead times. Email
              {" "}<a href="mailto:info@nemi-ai.com">info@nemi-ai.com</a>.
            </p>
          </section>
        </main>
      </div>

      <Index />
    </>
  );
}
