"use client"

import { useEffect, useRef, useState, FormEvent } from "react"
import { Mail, Link, Globe, Code2, ArrowUpRight, Send } from "lucide-react"
import { GlowSubmitButton } from "@/components/ui/glow-button"

/* ── Globe canvas ────────────────────────────────────────────────────────── */
function GlobeMini() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const W = 340, dpr = window.devicePixelRatio || 1
    canvas.width = W * dpr; canvas.height = W * dpr
    canvas.style.width = `${W}px`; canvas.style.height = `${W}px`
    ctx.scale(dpr, dpr)

    const rotation = [0, -20]
    let allDots: { lng: number; lat: number }[] = []
    let timer: { stop: () => void } | null = null

    // ── drag state ──
    let dragging = false
    let lastX = 0, lastY = 0

    const onPointerDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX; lastY = e.clientY
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = "grabbing"
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      rotation[0] += dx * 0.4
      rotation[1] = Math.max(-90, Math.min(90, rotation[1] - dy * 0.4))
      lastX = e.clientX; lastY = e.clientY
    }
    const onPointerUp = () => {
      dragging = false
      canvas.style.cursor = "grab"
    }
    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("pointermove", onPointerMove)
    canvas.addEventListener("pointerup", onPointerUp)
    canvas.addEventListener("pointercancel", onPointerUp)
    canvas.style.cursor = "grab"

    const pip = (pt: [number, number], poly: number[][]): boolean => {
      let inside = false
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i], [xj, yj] = poly[j]
        if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) inside = !inside
      }
      return inside
    }
    const pointInFeature = (pt: [number, number], feature: GeoJSON.Feature): boolean => {
      const g = feature.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon
      if (g.type === "Polygon") {
        if (!pip(pt, g.coordinates[0] as number[][])) return false
        for (let i = 1; i < g.coordinates.length; i++) if (pip(pt, g.coordinates[i] as number[][])) return false
        return true
      }
      if (g.type === "MultiPolygon") {
        for (const poly of g.coordinates as unknown as number[][][][]) {
          if (pip(pt, poly[0])) {
            let inHole = false
            for (let i = 1; i < poly.length; i++) if (pip(pt, poly[i])) { inHole = true; break }
            if (!inHole) return true
          }
        }
      }
      return false
    }

    const load = async () => {
      const d3mod = await import("d3")
      try {
        const res = await fetch("https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json")
        const land = await res.json() as { features: GeoJSON.Feature[] }
        land.features.forEach(feature => {
          const [[mnLng, mnLat], [mxLng, mxLat]] = d3mod.geoBounds(feature as GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>)
          for (let lng = mnLng; lng <= mxLng; lng += 1.4)
            for (let lat = mnLat; lat <= mxLat; lat += 1.4)
              if (pointInFeature([lng, lat], feature)) allDots.push({ lng, lat })
        })
        setReady(true)
        timer = d3mod.timer(() => {
          if (!dragging) rotation[0] += 0.25
          const radius = W / 2.3
          const proj = d3mod.geoOrthographic().scale(radius).translate([W/2, W/2]).clipAngle(90).rotate(rotation as [number, number])
          ctx.clearRect(0, 0, W, W)
          ctx.beginPath(); ctx.arc(W/2, W/2, radius, 0, 2 * Math.PI)
          ctx.fillStyle = "#080810"; ctx.fill()
          ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1; ctx.stroke()
          const path = d3mod.geoPath().projection(proj).context(ctx)
          ctx.beginPath(); path(d3mod.geoGraticule()())
          ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.lineWidth = 0.4; ctx.stroke()
          allDots.forEach(dot => {
            const p = proj([dot.lng, dot.lat])
            if (p && p[0] >= 0 && p[0] <= W && p[1] >= 0 && p[1] <= W) {
              ctx.beginPath(); ctx.arc(p[0], p[1], 1.1, 0, 2 * Math.PI)
              ctx.fillStyle = "rgba(120,180,255,0.65)"; ctx.fill()
            }
          })
        })
      } catch { /* silent */ }
    }
    load()
    return () => {
      timer?.stop()
      canvas.removeEventListener("pointerdown", onPointerDown)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerup", onPointerUp)
      canvas.removeEventListener("pointercancel", onPointerUp)
    }
  }, [])

  return (
    <div className="relative inline-block">
      <canvas ref={canvasRef} className="rounded-full opacity-90" />
      {!ready && <div className="absolute inset-0 flex items-center justify-center"><div className="w-8 h-8 border-2 border-white/20 border-t-white/50 rounded-full animate-spin" /></div>}
    </div>
  )
}

/* ── Contact form state ──────────────────────────────────────────────────── */
function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      setFields({ name: "", email: "", subject: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  const inputClass = "bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-base focus:outline-none focus:border-blue-500/60 focus:bg-blue-500/5 transition-all"

  return (
    <form className="relative z-10" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input type="text" placeholder="Your name" value={fields.name} onChange={set("name")} required className={inputClass} />
        <input type="email" placeholder="Your email" value={fields.email} onChange={set("email")} required className={inputClass} />
      </div>
      <input type="text" placeholder="What are you building? (The more unusual, the better)" value={fields.subject} onChange={set("subject")} className={`w-full ${inputClass} mb-3`} />
      <textarea rows={4} placeholder="Project details, timeline, budget, dreams, fears..." value={fields.message} onChange={set("message")} required className={`w-full ${inputClass} resize-none mb-4`} />

      {status === "success" && (
        <p className="text-green-400 text-sm mb-3">Message sent! I&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm mb-3">Something went wrong. Please try emailing me directly.</p>
      )}

      <GlowSubmitButton className="py-4 text-lg w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Message →"}
      </GlowSubmitButton>
    </form>
  )
}

/* ── Main component ──────────────────────────────────────────────────────── */
export function ContactGlobeCV() {
  return (
    <section className="relative bg-black overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-24">

        {/* ── HEADER ── */}
        <div className="text-center mb-16">
          {/* Availability pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm tracking-wide mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for new projects — yes, that includes yours
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-5 leading-tight">
            Got a project?<br />
            <span className="text-white/60">Let&apos;s talk.</span>
          </h2>

          <p className="text-white/50 text-lg max-w-lg mx-auto leading-relaxed">
            20 years of code. Zero unsolved problems.{" "}
            <span className="text-white/30 italic">(Statistically, at least.)</span>
          </p>
        </div>

        {/* ── TWO-COLUMN: BUTTONS LEFT · GLOBE RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6 items-center">

          {/* Left — 5 stacked buttons */}
          <div className="flex flex-col gap-3">
            <a href="mailto:prakhar@nandann.com"
              className="group flex items-center gap-5 p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0 group-hover:bg-blue-500/25 transition-colors">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xl font-semibold">Email Me</p>
                <p className="text-white/40 text-sm truncate">prakhar@nandann.com</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            <a href="https://linkedin.com/in/prakharbhatia" target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-5 p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-sky-500/15 flex items-center justify-center shrink-0 group-hover:bg-sky-500/25 transition-colors">
                <Link className="w-6 h-6 text-sky-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xl font-semibold">LinkedIn</p>
                <p className="text-white/40 text-sm">No recruiters please 🙏</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            <a href="https://www.nandann.com/" target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-5 p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0 group-hover:bg-orange-500/25 transition-colors">
                <Globe className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xl font-semibold">Nandann Creative Agency</p>
                <p className="text-white/40 text-sm">Where the real magic happens</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            <a href="https://profiles.wordpress.org/prakharb88/" target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-5 p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center shrink-0 group-hover:bg-purple-500/25 transition-colors">
                <Code2 className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xl font-semibold">WordPress.org</p>
                <p className="text-white/40 text-sm">7 plugins. Still updating them.</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>
          </div>

          {/* Right — Globe + quote */}
          <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl border border-white/8 bg-white/3 min-h-[440px]">
            <GlobeMini />
            <div className="text-center">
              <p className="text-white text-2xl font-bold leading-snug mb-2" style={{ fontFamily: "serif" }}>
                निष्ठा धृतिः सत्यम्
              </p>
              <p className="text-white text-base tracking-widest uppercase">Dedication, Steadfastness, and Truth</p>
            </div>
          </div>

        </div>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-white/8" />
          <p className="text-white text-lg font-medium">Or drop me a message below</p>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* ── CONTACT FORM ── */}
        <div className="relative rounded-2xl p-[1px]"
          style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.4) 0%, rgba(124,58,237,0.4) 50%, rgba(37,99,235,0.2) 100%)" }}>
          <div className="relative rounded-2xl bg-[#0d0d1a] p-8 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-600/8 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-purple-600/8 blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <p className="text-blue-400/70 text-xs uppercase tracking-[0.2em] mb-1">Start a conversation</p>
                <h3 className="text-white text-2xl font-bold">Tell me what you&apos;re building</h3>
              </div>
              <Send className="w-6 h-6 text-white/20 mt-1 shrink-0" />
            </div>

            <ContactForm />
          </div>
        </div>

        {/* ── FOOTER TAGLINE ── */}
        <p className="section-tagline mt-16">Let&apos;s build something great together.</p>

      </div>
    </section>
  )
}
