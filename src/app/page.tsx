import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "NEMI AI — End-to-End Physical AI Platform for Manufacturing",
  description:
    "NEMI AI is the world's first end-to-end Physical AI platform. Design, manufacture, and deploy physical products 10× faster at a fraction of Western costs. Powered by the Large Manufacturing Model (LMM).",
  alternates: { canonical: "https://nemi-ai.com/" },
  openGraph: {
    title: "NEMI AI — End-to-End Physical AI Platform for Manufacturing",
    description:
      "Design, manufacture, and deploy physical products 10× faster at a fraction of Western costs. One partner. The full stack.",
    url: "https://nemi-ai.com/",
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
    "@id": "https://nemi-ai.com/#webpage",
    url: "https://nemi-ai.com/",
    name: "NEMI AI — End-to-End Physical AI Platform for Manufacturing",
    description:
      "NEMI AI is the world's first end-to-end Physical AI platform. Design, manufacture, and deploy physical products 10× faster at a fraction of Western costs.",
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
        All scroll-animated sections return null at scrollProgress=0 (SSR state),
        so we render their key text content here for indexing.
        Google explicitly supports sr-only as an accessibility pattern.
      */}
      <div className="sr-only" aria-hidden="false">
        <main>
          <h1>NEMI AI — End-to-End Physical AI Platform for Manufacturing</h1>
          <p>
            NEMI AI is the world's first end-to-end Physical AI platform for design,
            development, and distribution of physical products. Powered by the Large
            Manufacturing Model (LMM), NEMI enables hardware companies to build 10× faster
            at a fraction of Western costs — all from Bangalore, India.
          </p>

          <section aria-label="Hardware challenges">
            <h2>Hardware remains hard</h2>
            <p>
              Building physical products requires navigating design, manufacturing, and
              distribution — three complex domains that few companies master simultaneously.
            </p>
            <h3>DESIGN</h3>
            <ul>
              <li>Ideation</li>
              <li>Rendering</li>
              <li>Engineering Design / Prototyping</li>
              <li>Simulation / Validation</li>
              <li>Release for Production</li>
            </ul>
            <h3>DEVELOP</h3>
            <ul>
              <li>Supply Chain Development</li>
              <li>Tooling / Fixturing / Other Capex</li>
              <li>Part Ordering</li>
              <li>Production</li>
              <li>Final Testing / Dispatch</li>
            </ul>
            <h3>DISTRIBUTE</h3>
            <ul>
              <li>Sales &amp; Marketing</li>
              <li>Shipment (First Mile, Last Mile)</li>
              <li>Warehousing</li>
              <li>Leasing / Financing</li>
              <li>Aftersales / Service</li>
            </ul>
          </section>

          <section aria-label="Why companies choose NEMI">
            <h2>Why Companies Choose NEMI</h2>
            <p>
              In manufacturing, three things matter above all else: Speed to market,
              Cost of goods sold, and Quality at scale. NEMI is built to deliver all three
              simultaneously through an integrated AI platform that removes the gaps between
              design, manufacturing, and deployment.
            </p>
          </section>

          <section aria-label="NEMI AI Products">
            <h2>AKIO — Design Intelligence Suite</h2>
            <p>
              AI-powered product and component design. From idea to production-ready validated
              design in weeks, not months. AKIO handles concept design, CAD generation,
              simulation, prototyping, and PLM integration.
            </p>

            <h2>HENRY — AI-Driven Manufacturing</h2>
            <p>
              Full-stack manufacturing partner. HENRY covers metal parts, CNC machining,
              injection moulding, tooling &amp; fixturing, electronics production, battery
              manufacturing, motor production, and complex assemblies.
            </p>

            <h2>SAM — Deployment &amp; Lifecycle Management</h2>
            <p>
              Fleet deployment, last-mile logistics, leasing, financing, and field monitoring.
              Real-world performance data from SAM feeds back into AKIO for continuous
              improvement of future designs.
            </p>
          </section>

          <section aria-label="Capabilities">
            <h2>Platform Capabilities</h2>
            <h3>Drone Manufacturing</h3>
            <p>
              End-to-end drone manufacturing including titanium alloy frames, electronics,
              battery systems, motors, and complex assemblies.
            </p>
            <h3>Electric Vehicle Manufacturing</h3>
            <p>
              Complete EV development from design to production — battery packs, powertrains,
              mechanical systems, and electronics integration.
            </p>
            <h3>Humanoid Robot Manufacturing</h3>
            <p>
              Humanoid robot component manufacturing covering structural, electronics,
              battery, and motor systems.
            </p>
          </section>

          <section aria-label="Industries served">
            <h2>Industries We Serve</h2>
            <ul>
              <li>Aerospace — Aerospace machined parts and aerospace manufacturing</li>
              <li>Automotive — Automotive components and EV systems</li>
              <li>Electronics — PCB, harnesses, and electronics manufacturing</li>
              <li>Robotics — Humanoid and industrial robot components</li>
            </ul>
          </section>

          <section aria-label="Large Manufacturing Model technology">
            <h2>Large Manufacturing Model (LMM)</h2>
            <p>
              NEMI's proprietary LMM is trained on real manufacturing data: CAD geometries,
              sensor streams, quality inspection outcomes, and process parameters. It predicts
              optimal process parameters, detects quality anomalies in real-time, converts
              designs to production plans automatically, routes work orders across supplier
              networks, and monitors predictive maintenance signals. Every production job
              makes the model smarter.
            </p>
          </section>

          <section aria-label="Case study">
            <h2>Case Study — EV Development</h2>
            <p>
              NEMI reduced EV development time from 18 months to 9 months (2× faster),
              reduced required manpower from 20 to 6 people (70% reduction), cut COGS from
              USD 1400 to USD 1200 (14% reduction), and reduced total development cost from
              $5M to $0.5M total.
            </p>
            <p>Over 2,500 EV units deployed across India and Africa.</p>
          </section>

          <section aria-label="India R&amp;D advantage">
            <h2>India R&amp;D Advantage</h2>
            <p>
              NEMI operates from Bangalore, India — giving clients 10× capital efficiency
              versus Western competitors. Our engineering talent, manufacturing infrastructure,
              and operational costs combine to create an unbeatable cost-quality-speed profile.
            </p>
          </section>

          <section aria-label="Contact">
            <h2>Get in Touch</h2>
            <p>
              Ready to build your next physical product with NEMI AI?
              Contact us at Humans@nemi-ai.com or request a demo at nemi-ai.com.
            </p>
          </section>
        </main>
      </div>

      <Index />
    </>
  );
}
