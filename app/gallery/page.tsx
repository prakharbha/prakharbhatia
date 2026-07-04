import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { CtaFooter } from "@/components/cta-footer";
import { PersonalGalleryCV } from "@/components/ui/personal-gallery-cv";
import { WildlifeGalleryCV } from "@/components/ui/wildlife-gallery-cv";

export const metadata: Metadata = {
  title: "Gallery — Prakhar Bhatia",
  description:
    "Beyond code — Himalayan rider, wildlife photographer and adventurer. A gallery of personal and wildlife photography by Prakhar Bhatia.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main className="bg-black">
      <SiteNav />
      <PersonalGalleryCV />
      <WildlifeGalleryCV />
      <CtaFooter />
    </main>
  );
}
