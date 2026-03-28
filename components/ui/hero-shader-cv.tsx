"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GlowButton } from "@/components/ui/glow-button"

export function HeroShaderCV() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    renderer: THREE.WebGLRenderer
    uniforms: { time: { value: number }; resolution: { value: THREE.Vector2 } }
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const vertexShader = `void main() { gl_Position = vec4(position, 1.0); }`
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;
        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i = 0; i < 5; i++){
            color[j] += lineWidth * float(i*i) / abs(
              fract(t - 0.01*float(j) + float(i)*0.01) * 5.0
              - length(uv) + mod(uv.x + uv.y, 0.2)
            );
          }
        }
        gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1
    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    scene.add(new THREE.Mesh(geometry, material))

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight)
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height)
    }
    onResize()
    window.addEventListener("resize", onResize)

    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
      if (sceneRef.current) sceneRef.current.animationId = animationId
    }
    sceneRef.current = { camera, renderer, uniforms, animationId: 0 }
    animate()

    return () => {
      window.removeEventListener("resize", onResize)
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
        renderer.dispose(); geometry.dispose(); material.dispose()
      }
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />

      {/* Fixed top-right Download CV */}
      <div className="absolute top-6 right-6 z-20">
        <GlowButton href="/prakhar-bhatia-cv.pdf" download className="flex items-center gap-2 px-5 py-2.5 text-lg">
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download CV
        </GlowButton>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-bold text-white tracking-tight leading-none mb-6">
          Prakhar Bhatia
        </h1>

        <p className="text-xl md:text-2xl text-white tracking-[0.12em] uppercase mb-6">
          Full Stack Developer &nbsp;·&nbsp; Agentic AI &nbsp;·&nbsp; Web3
        </p>

        <div className="flex items-center gap-3 text-white text-xl mb-10">
          <span>Founder</span>
          <span className="text-white">·</span>
          <a href="https://www.nandann.com/" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors underline underline-offset-4 decoration-white/40">
            Nandann Creative Agency
          </a>
        </div>

        <GlowButton href="mailto:prakhar@nandann.com" className="px-12 py-5 text-xl">Let&apos;s Talk</GlowButton>
      </div>

      <button
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-white/60 text-sm uppercase tracking-[0.3em] group-hover:text-white transition-colors">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent group-hover:from-white/60 transition-colors" />
      </button>
    </div>
  )
}

