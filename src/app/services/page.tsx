import type { Metadata } from "next";
import Services from "@/views/Services";

export const metadata: Metadata = {
  title: "NEMI Services — AKIO, HENRY & SAM | Physical AI Platform",
  description:
    "Explore NEMI's three integrated AI systems: AKIO for design intelligence, HENRY for full-stack manufacturing, and SAM for deployment and lifecycle management.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "NEMI Services — AKIO, HENRY & SAM",
    description:
      "Three integrated AI systems. One platform. Design with AKIO, manufacture with HENRY, deploy with SAM.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return <Services />;
}
