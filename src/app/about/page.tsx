import type { Metadata } from "next";
import AboutUs from "@/views/AboutUs";

export const metadata: Metadata = {
  title: "About NEMI AI — Building the Future of Manufacturing",
  description:
    "Learn about NEMI AI — the team, mission, and technology behind the world's first end-to-end Physical AI manufacturing platform. Led from Bangalore, India.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About NEMI AI — Building the Future of Manufacturing",
    description:
      "Meet the team behind NEMI — combining Physical AI, deep manufacturing know-how, and Bangalore's engineering advantage to reshape global manufacturing.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutUs />;
}
