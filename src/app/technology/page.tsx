import type { Metadata } from "next";
import Technology from "@/views/Technology";

export const metadata: Metadata = {
  title: "NEMI LMM Technology — Large Manufacturing Model | NEMI AI",
  description:
    "NEMI's proprietary Large Manufacturing Model (LMM) is trained on real CAD, sensor, and production data. Discover the AI architecture powering the Physical AI revolution.",
  alternates: { canonical: "/technology" },
  openGraph: {
    title: "NEMI LMM Technology — Large Manufacturing Model",
    description:
      "The LMM is trained on real manufacturing data — CAD, sensors, quality outcomes — creating an AI that gets smarter with every production job.",
    url: "/technology",
  },
};

export default function TechnologyPage() {
  return <Technology />;
}
