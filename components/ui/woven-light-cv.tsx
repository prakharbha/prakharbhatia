"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import * as THREE from "three"
import { GlowPill } from "@/components/ui/glow-button"
import { SplineScene } from "@/components/ui/spline-scene"
import { Spotlight } from "@/components/ui/spotlight"
import { WPPluginsTrigger, NpmPackagesTrigger } from "@/components/ui/open-source-modal"

const skillGroups = [
  { category: "AI / Agentic",        skills: ["Agentic Systems", "Agentic Voice", "LLM Integration", "AI Automation"] },
  { category: "Web3",                skills: ["Smart Contracts", "DeFi", "Token Platforms", "Web3.js / Ethers.js"] },
  { category: "Frontend",            skills: ["React", "Next.js", "Vite", "HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS"] },
  { category: "Backend",             skills: ["Node.js", "FastAPI", "Python", "Rust", "REST APIs", "GraphQL"] },
  { category: "CMS / E-commerce",    skills: ["WordPress", "WooCommerce"] },
  { category: "Salesforce",          skills: ["APEX Development", "Custom Salesforce Development", "Salesforce Administration"] },
  { category: "Cloud & Infra",       skills: ["AWS", "Linux/Unix Admin", "HP-UX", "RHEL"] },
  { category: "Mainframe",           skills: ["z/OS", "JCL", "Batch Processing", "CICS"] },
  { category: "Open Source",         skills: ["7 WordPress plugins", "npm packages"] },
]

export function WovenLightCV() {
  const textControls = useAnimation()
  const fadeControls = useAnimation()
  const robotPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    textControls.start(i => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.06 + 0.4, duration: 1, ease: [0.2, 0.65, 0.3, 0.9] },
    }))
    fadeControls.start({ opacity: 1, transition: { delay: 1, duration: 1 } })
  }, [textControls, fadeControls])

  // Use a native window listener so React's synthetic event batching can't
  // interfere. Spline/Three.js listens for PointerEvent('pointermove') on the
  // canvas — dispatch that whenever the cursor is outside the robot panel.
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const panel = robotPanelRef.current
      if (!panel) return
      // If the cursor is already over the robot panel, Spline receives it natively
      if (panel.contains(e.target as Node)) return
      const canvas = panel.querySelector('canvas')
      if (!canvas) return
      canvas.dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
          screenX: e.screenX,
          screenY: e.screenY,
          movementX: e.movementX,
          movementY: e.movementY,
          pointerType: 'mouse',
          isPrimary: true,
        })
      )
    }
    window.addEventListener('pointermove', handler, { passive: true })
    return () => window.removeEventListener('pointermove', handler)
  }, [])

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-black overflow-hidden">

      {/* ── Woven particle canvas (desktop only — stays left half) ── */}
      <div className="hidden md:block absolute inset-0 md:right-1/2 z-0 pointer-events-none">
        <WovenCanvas />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* ── Mobile background (full width particle) ── */}
      <div className="md:hidden absolute inset-0 z-0 pointer-events-none">
        <WovenCanvas />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* ── "Skills" heading — centered across full width ── */}
      <div className="relative z-10 pt-16 md:pt-24 pb-6 text-center pointer-events-none">
        <h2
          className="text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight"
          style={{ textShadow: "0 0 60px rgba(255,255,255,0.3)" }}
        >
          {"Skills".split("").map((char, ci) => (
            <motion.span
              key={ci}
              custom={ci}
              initial={{ opacity: 0, y: 60 }}
              animate={textControls}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </h2>
      </div>

      {/* ── Two-column body ── */}
      <div className="relative flex flex-col md:flex-row flex-1">

        {/* ─────────────────────────────────────────────────────────────
            ROBOT PANEL
            • Mobile:  compact banner (50vh), order-first
            • md+:     right half, full height, order-last
            z-20 so arms can visually bleed over the skills panel
            ───────────────────────────────────────────────────────────── */}
        <div
          ref={robotPanelRef}
          className="
            relative z-20 order-first md:order-last
            h-[50vh] md:h-auto
            md:w-1/2 lg:w-[48%]
            bg-black/[0.96]
            flex flex-col overflow-visible
          "
        >
          {/* Spotlight glow that follows cursor */}
          <Spotlight size={400} />

          {/* Spline 3D robot */}
          <SplineScene
            scene="/spline-scene.splinecode"
            className="w-full h-full"
          />

          {/* Mobile hint label */}
          <p className="
            md:hidden
            absolute bottom-3 left-0 right-0 text-center
            text-white/40 text-xs uppercase tracking-[0.2em]
            pointer-events-none
          ">
            drag to interact
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SKILLS PANEL
            • Mobile:  full width, order-last (below robot)
            • md+:     left half
            ───────────────────────────────────────────────────────────── */}
        <div className="
          relative z-10 order-last md:order-first
          md:w-1/2 lg:w-[52%]
          flex flex-col justify-center
          px-6 md:px-10 lg:px-16
          py-10 md:py-16
        ">
          {/* Skill groups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={fadeControls}
            className="w-full mb-10"
          >
            <div className="flex flex-col gap-5">
              {skillGroups.map(group => (
                <div key={group.category} className="flex flex-col gap-2">
                  <span className="text-white text-sm font-semibold uppercase tracking-widest">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.category === "Open Source" ? (
                      <>
                        <WPPluginsTrigger />
                        <NpmPackagesTrigger />
                      </>
                    ) : (
                      group.skills.map(skill => (
                        <GlowPill key={skill}>{skill}</GlowPill>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
            </motion.div>

          {/* Founder link */}
          <motion.div initial={{ opacity: 0 }} animate={fadeControls}>
            <a
              href="https://www.nandann.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors text-base tracking-wider"
            >
              Founder · Nandann Creative Agency →
            </a>
          </motion.div>
        </div>

      </div>{/* end two-column body */}
    </div>
  )
}

function WovenCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 5
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    const mouse = new THREE.Vector2()
    const clock = new THREE.Clock()
    const N = 50000
    const pos = new Float32Array(N * 3)
    const origPos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    const vel = new Float32Array(N * 3)
    const geo = new THREE.BufferGeometry()
    const tkGeo = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32)

    for (let i = 0; i < N; i++) {
      const vi = i % tkGeo.attributes.position.count
      const x = tkGeo.attributes.position.getX(vi)
      const y = tkGeo.attributes.position.getY(vi)
      const z = tkGeo.attributes.position.getZ(vi)
      pos[i*3] = origPos[i*3] = x
      pos[i*3+1] = origPos[i*3+1] = y
      pos[i*3+2] = origPos[i*3+2] = z
      const c = new THREE.Color().setHSL(Math.random(), 0.8, 0.6)
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", onMouseMove)

    let rafId: number
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const mw = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0)
      for (let i = 0; i < N; i++) {
        const ix = i*3, iy = i*3+1, iz = i*3+2
        const cur = new THREE.Vector3(pos[ix], pos[iy], pos[iz])
        const orig = new THREE.Vector3(origPos[ix], origPos[iy], origPos[iz])
        const v = new THREE.Vector3(vel[ix], vel[iy], vel[iz])
        const dist = cur.distanceTo(mw)
        if (dist < 1.5) v.add(cur.clone().sub(mw).normalize().multiplyScalar((1.5 - dist) * 0.012))
        v.add(orig.clone().sub(cur).multiplyScalar(0.001)).multiplyScalar(0.95)
        pos[ix] += v.x; pos[iy] += v.y; pos[iz] += v.z
        vel[ix] = v.x; vel[iy] = v.y; vel[iz] = v.z
      }
      geo.attributes.position.needsUpdate = true
      points.rotation.y = t * 0.05
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      geo.dispose(); mat.dispose(); tkGeo.dispose(); renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 z-0" />
}
