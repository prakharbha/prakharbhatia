import type { Metadata } from "next";
import "./cinematic.css";
import CinematicHome from "@/components/cinematic-home";

export const metadata: Metadata = {
  title: "Prakhar Bhatia — Full-Stack Developer · Agentic AI · Web3",
  description:
    "Prakhar Bhatia builds full-stack products with AI, Rust, Python, Node.js, React and Next.js. 20+ years across the stack, agentic AI systems, Web3 and FinTech. Founder of Nandann Creative Agency.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Prakhar Bhatia — Full-Stack · Agentic AI · Web3",
    description:
      "Full-stack products with AI, Rust, Python & the modern web. 20+ years, agentic AI systems, Web3, FinTech.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return <CinematicHome />;
}
