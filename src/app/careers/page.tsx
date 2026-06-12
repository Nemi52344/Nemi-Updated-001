import type { Metadata } from "next";
import Careers from "@/views/Careers";

export const metadata: Metadata = {
  title: "Careers at NEMI AI, Join the Physical AI Revolution",
  description:
    "Build the Physical Internet. Join NEMI AI's world-class engineering team in Coimbatore. Open roles in AI/ML, mechanical design, manufacturing, and operations.",
  alternates: { canonical: "https://nemi-ai.com/careers" },
  openGraph: {
    title: "Careers at NEMI AI, Join the Physical AI Revolution",
    description:
      "Open roles in LMM Research, Mechanical Design, Process Engineering, Fleet Operations and more. Based in Coimbatore.",
    url: "https://nemi-ai.com/careers",
    images: [
      {
        url: "https://nemi-ai.com/Images/nemi%2001.png",
        width: 1200,
        height: 630,
        alt: "NEMI AI, End-to-End Physical AI Platform for Manufacturing",
      },
    ],
  },
  twitter: { card: "summary_large_image",
    title: "Careers at NEMI AI, Join the Physical AI Revolution",
    description:
      "Open roles in LMM Research, Mechanical Design, Process Engineering, Fleet Operations and more. Based in Coimbatore.",
    images: ["https://nemi-ai.com/Images/nemi%2001.png"],
  },
};

export default function CareersPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nemi-ai.com/careers#webpage",
    url: "https://nemi-ai.com/careers",
    name: "Careers at NEMI AI, Join the Physical AI Revolution",
    description:
      "Build the Physical Internet. Join NEMI AI's world-class engineering team in Coimbatore. Open roles in AI/ML, mechanical design, manufacturing, and operations.",
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

      {/*
        sr-only: Visually hidden but fully readable by search engines and AI
        crawlers. The visible Careers view is scroll-progress driven and renders
        empty until JS hydrates — so we mirror the canonical content here for
        indexing (values, roles, application).
      */}
      <div className="sr-only" aria-hidden="false">
        <main>
          <h2>Engineer the Physical Future</h2>
          <p>
            The next era of manufacturing runs on Physical AI. Join NEMI to build the
            full-stack, end-to-end manufacturing automation platform powered by the Large
            Manufacturing Model (LMM). Based in Coimbatore, India.
          </p>

          <section aria-label="Our Values">
            <h2>Our Values</h2>
            <ul>
              <li>
                <strong>First Principles.</strong> We don&rsquo;t accept &ldquo;the way
                it&rsquo;s always been done.&rdquo; Break problems to fundamentals,
                rebuild from the ground up, create lasting advantage.
              </li>
              <li>
                <strong>Ownership.</strong> A place for builders, not bystanders. Take
                responsibility, think long term, act like an owner. Your ideas and work
                shape what we build.
              </li>
              <li>
                <strong>Highest Standards.</strong> Exceptional companies are built
                through exceptional execution. We hold ourselves to a higher bar in
                quality, experience, and rigor.
              </li>
              <li>
                <strong>Build Trust.</strong> Great teams move fast when trust runs deep.
                Honest conversations, clear thinking, mutual respect. Challenge ideas,
                support each other.
              </li>
            </ul>
          </section>

          <section aria-label="Apply">
            <h2>Drop Your Resume</h2>
            <p>
              Join the team building Physical AI for manufacturing. We review every
              resume and reach out when there&rsquo;s a fit.
            </p>
            <p>
              Or send your resume directly to
              {" "}<a href="mailto:info@nemi-ai.com">info@nemi-ai.com</a>.
            </p>
          </section>

          <section aria-label="What we work on">
            <h2>What You&rsquo;ll Work On</h2>
            <ul>
              <li>The Large Manufacturing Model (LMM), a foundation model trained on real CAD geometries, sensor streams, quality outcomes, and process parameters.</li>
              <li>Design platform that compresses concept-to-production cycles from months to weeks.</li>
              <li>Full-stack manufacturing: tooling, CNC, injection moulding, electronics, batteries, motors, complex assemblies.</li>
              <li>Deployment layer: thousands of units operating across India and Africa, with field telemetry feeding back into design and manufacturing.</li>
              <li>NEMI M-OS, the operating system for our factories.</li>
            </ul>
          </section>
        </main>
      </div>

      <Careers />
    </>
  );
}
