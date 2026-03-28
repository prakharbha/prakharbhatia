import { HeroShaderCV } from "@/components/ui/hero-shader-cv"
import { WovenLightCV } from "@/components/ui/woven-light-cv"
// import { CaseStudiesCV } from "@/components/ui/case-studies-cv"  // temporarily hidden
import { ServicesCV } from "@/components/ui/services-cv"
import { PersonalGalleryCV } from "@/components/ui/personal-gallery-cv"
import { WildlifeGalleryCV } from "@/components/ui/wildlife-gallery-cv"
import { ContactGlobeCV } from "@/components/ui/contact-globe-cv"

export default function Home() {
  return (
    <main className="bg-black">
      <HeroShaderCV />
      <WovenLightCV />
      <ServicesCV />
      <PersonalGalleryCV />
      <WildlifeGalleryCV />
      <ContactGlobeCV />
    </main>
  )
}
