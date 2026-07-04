import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CtaFooter } from "@/components/cta-footer";
import { ContactGlobeCV } from "@/components/ui/contact-globe-cv";

export const metadata: Metadata = {
  title: "Contact — Prakhar Bhatia",
  description:
    "Get in touch with Prakhar Bhatia — full-stack, agentic AI and Web3. Email prakhar@nandann.com or reach out through the contact form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="bg-black">
      <SiteNav />
      <ContactGlobeCV />
      <CtaFooter />
    </main>
  );
}
