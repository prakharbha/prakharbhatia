import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CtaFooter } from "@/components/cta-footer";
import { WovenLightCV } from "@/components/ui/woven-light-cv";
import { ServicesCV } from "@/components/ui/services-cv";

export const metadata: Metadata = {
  title: "Services — Prakhar Bhatia",
  description:
    "Full-stack development, agentic AI systems, Salesforce & APEX, Web3 & DeFi, trading & FinTech, and WordPress. 20+ years across every layer of the stack.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="bg-black">
      <SiteNav />
      <WovenLightCV />
      <ServicesCV />
      <CtaFooter />
    </main>
  );
}
