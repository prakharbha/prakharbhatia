"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react"

interface WildlifePhoto {
  src: string
  alt: string
  caption: string
  animal: string
  span?: "tall" | "wide" | "normal"
}

const wildlifePhotos: WildlifePhoto[] = [
  {
    src: "/images/wildlife/tiger-road-walk.jpg",
    alt: "Bengal tiger walking toward camera on dirt road",
    caption: "On the Hunt",
    animal: "Tiger",
    span: "wide",
  },
  {
    src: "/images/wildlife/tiger-forest-walk.jpg",
    alt: "Bengal tiger walking through forest in dappled light",
    caption: "Forest Walk",
    animal: "Tiger",
    span: "tall",
  },
  {
    src: "/images/wildlife/tiger-grass-stare.jpg",
    alt: "Bengal tiger in dry grass looking directly at camera",
    caption: "Golden Hour",
    animal: "Tiger",
    span: "normal",
  },
  {
    src: "/images/wildlife/rhino-grassland.jpg",
    alt: "One-horned rhinoceros in tall grassland",
    caption: "The Armoured One",
    animal: "Rhino",
    span: "wide",
  },
  {
    src: "/images/wildlife/tiger-road-stand.jpg",
    alt: "Bengal tiger standing full body on jungle road",
    caption: "Road Block",
    animal: "Tiger",
    span: "normal",
  },
  {
    src: "/images/wildlife/tiger-tree.jpg",
    alt: "Bengal tiger by a tree, tail raised, direct gaze",
    caption: "Territory",
    animal: "Tiger",
    span: "tall",
  },
  {
    src: "/images/wildlife/lioness-resting.jpg",
    alt: "Asiatic lioness resting",
    caption: "Gir Queen",
    animal: "Lion",
    span: "normal",
  },
  {
    src: "/images/wildlife/sloth-bear.jpg",
    alt: "Sloth bear walking through forest",
    caption: "Night Wanderer",
    animal: "Bear",
    span: "normal",
  },
  {
    src: "/images/wildlife/spotted-deer.jpg",
    alt: "Spotted deer in grassland",
    caption: "Chital",
    animal: "Deer",
    span: "normal",
  },
  {
    src: "/images/wildlife/gaur-closeup.jpg",
    alt: "Indian Gaur close-up portrait",
    caption: "Indian Bison",
    animal: "Gaur",
    span: "normal",
  },
  {
    src: "/images/wildlife/jackal.jpg",
    alt: "Indian jackal in dry grass",
    caption: "The Trickster",
    animal: "Jackal",
    span: "normal",
  },
  {
    src: "/images/wildlife/squirrel-macro.jpg",
    alt: "Indian palm squirrel macro shot",
    caption: "Macro World",
    animal: "Squirrel",
    span: "normal",
  },
  {
    src: "/images/wildlife/rhino-mating.jpg",
    alt: "One-horned rhinoceros pair — breeding behaviour, Kaziranga",
    caption: "Circle of Life",
    animal: "Rhino",
    span: "wide",
  },
  {
    src: "/images/wildlife/langur-mother-baby.jpg",
    alt: "Grey Langur mother with newborn baby — national park, India",
    caption: "First Days",
    animal: "Langur",
    span: "tall",
  },
]

const FILTERS = ["All", "Tiger", "Rhino", "Lion", "Bear", "Deer", "Gaur", "Langur", "Jackal", "Squirrel"]

export function WildlifeGalleryCV() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeFilter === "All"
    ? wildlifePhotos
    : wildlifePhotos.filter(p => p.animal === activeFilter)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
  }, [lightboxIndex, filtered.length])

  const next = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filtered.length)
  }, [lightboxIndex, filtered.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxIndex, prev, next])

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [lightboxIndex])

  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-4 h-4 text-orange-400/70" />
            <p className="text-white text-base uppercase tracking-[0.25em]">Wildlife Photography</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Through the Lens</h2>
          <p className="text-white text-lg max-w-xl mx-auto">
            Bengal tigers, one-horned rhinos, Asiatic lions and more — photographed across India&apos;s national parks.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTERS.map(f => (
            <button key={f} onClick={() => { setActiveFilter(f); setLightboxIndex(null) }}
              className={`px-4 py-1.5 rounded-full text-base uppercase tracking-widest border transition-all duration-200
                ${activeFilter === f
                  ? "bg-white text-black border-white"
                  : "border-white/40 text-white hover:border-white hover:bg-white/10"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px] [grid-auto-flow:dense]">
          {filtered.map((photo, index) => (
            <div key={photo.src} onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-xl cursor-pointer group border border-white/5 hover:border-white/20 transition-all duration-500
                ${photo.span === "wide" ? "col-span-2" : ""}
                ${photo.span === "tall" ? "row-span-2" : ""}`}>
              <img src={photo.src} alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 inset-x-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-semibold text-lg">{photo.caption}</p>
                <p className="text-white text-base uppercase tracking-widest">{photo.animal}</p>
              </div>
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <p className="section-tagline mt-12">
          © Prakhar Bhatia — All photographs taken in the wild · Click to view full screen
        </p>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/96 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}>
          <button onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 border border-white/15">
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-base font-mono tracking-widest z-10">
            {String(lightboxIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
          </div>
          <button onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 border border-white/15">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="relative max-w-5xl max-h-[85vh] w-full mx-16 md:mx-24" onClick={e => e.stopPropagation()}>
            <img src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].alt}
              className="w-full h-full object-contain rounded-xl max-h-[78vh]" />
            <div className="text-center mt-4">
              <p className="text-white font-semibold">{filtered[lightboxIndex].caption}</p>
              <p className="text-white text-lg mt-1">{filtered[lightboxIndex].alt}</p>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 border border-white/15">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {filtered.map((photo, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setLightboxIndex(i) }}
                className={`w-10 h-7 rounded-md overflow-hidden border-2 transition-all duration-200
                  ${i === lightboxIndex ? "border-white scale-110" : "border-white/20 opacity-40 hover:opacity-70"}`}>
                <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
