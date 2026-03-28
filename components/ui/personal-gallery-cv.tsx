"use client"

import { useEffect } from "react"
import { ZoomParallax } from "@/components/ui/zoom-parallax"
import { Bike, Camera, Mountain } from "lucide-react"

const parallaxImages = [
  { src: "/images/personal/prakhar-ladakh-bike.jpg", alt: "Prakhar with Royal Enfield in Ladakh — desert mountains" },
  { src: "/images/personal/prakhar-sunset.jpg",      alt: "Prakhar at sunset — warm golden silhouette" },
  { src: "/images/personal/prakhar-thunderbird-bw.jpg", alt: "Prakhar with Royal Enfield Thunderbird 500 — B&W" },
  { src: "/images/personal/prakhar-horse-krishna.jpg",  alt: "Prakhar with horse Krishna during mountain travels" },
  { src: "/images/personal/prakhar-goat-forest.jpg",    alt: "Prakhar holding a baby goat in the forest" },
  { src: "/images/personal/prakhar-leh-valley.jpg",     alt: "Prakhar in Leh, Ladakh — mustard jacket against the valley" },
  { src: "/images/personal/prakhar-forest-hat.jpg",     alt: "Prakhar in the forest — hat and striped shirt" },
]

const stripImages = [
  { src: "/images/personal/prakhar-forest-closeup.jpg", caption: "Mountain forests" },
  { src: "/images/personal/prakhar-forest-wall.jpg",    caption: "Stone walls, Himachal" },
  { src: "/images/personal/prakhar-sepia-portrait.jpg", caption: "Delhi, 2013" },
  { src: "/images/personal/prakhar-ladakh-road.jpg",    caption: "Ladakh — the road" },
]

const highlights = [
  {
    icon: Bike,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
    title: "Himalayan Rider",
    description: "Rode to Khardung La Pass at 18,380 ft — one of the world's highest motorable roads. Royal Enfield through Ladakh.",
  },
  {
    icon: Camera,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    title: "Wildlife Photographer",
    description: "Captured tigers, one-horned rhinos, Asiatic lions, sloth bears, leopards and more across India's national parks.",
  },
  {
    icon: Mountain,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    title: "Himalayan Adventurer",
    description: "High-altitude passes, Leh valley, Nubra, mountain forests — chasing roads and golden hour light.",
  },
]

export function PersonalGalleryCV() {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy?: () => void } | null = null
    const initLenis = async () => {
      const { default: Lenis } = await import("lenis")
      lenis = new Lenis()
      const raf = (time: number) => {
        lenis!.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }
    initLenis()
    return () => lenis?.destroy?.()
  }, [])

  return (
    <section className="relative bg-black">
      {/* Header */}
      <div className="relative z-10 pt-24 pb-0 px-6 text-center">
        <p className="text-white text-base uppercase tracking-[0.25em] mb-4">Beyond the Code</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Life in Frames</h2>
        <p className="text-white text-lg max-w-lg mx-auto">Royal Enfield roads, mountain passes, and moments in between.</p>
        <div className="flex flex-col items-center gap-2 mt-8 mb-4">
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          <span className="text-white text-base uppercase tracking-[0.2em]">Scroll</span>
        </div>
      </div>

      {/* Zoom Parallax */}
      <ZoomParallax images={parallaxImages} />

      {/* Scroll strip */}
      <div className="relative z-10 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-white text-base uppercase tracking-[0.2em] mb-6 text-center">More from the road</p>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
            {stripImages.map(photo => (
              <div key={photo.src} className="flex-none w-64 md:w-80 snap-start rounded-2xl overflow-hidden border border-white/8 group relative">
                <img src={photo.src} alt={photo.caption}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-base uppercase tracking-widest">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlight cards */}
      <div className="relative z-10 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-white text-base uppercase tracking-widest">The person behind the screen</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map(item => {
              const Icon = item.icon
              return (
                <div key={item.title}
                  className="p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl ${item.iconBg} mb-4`}>
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-white text-lg leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
          <p className="section-tagline mt-12">© Prakhar Bhatia — Personal collection</p>
        </div>
      </div>
    </section>
  )
}
