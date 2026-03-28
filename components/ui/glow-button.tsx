"use client"

import { useRef, useState } from "react"

const GLOW_STYLE = (x: number) => ({
  background: `radial-gradient(circle 90px at ${x}% 50%, rgba(255,255,255,1) 0%, rgba(220,225,235,0.98) 50%, rgb(195,200,215) 100%)`,
  color: "#0a0a1a",
  transition: "background 0.06s linear",
})

const REST_STYLE = {
  background: "rgb(195, 200, 215)",
  color: "#0a0a1a",
  transition: "background 0.06s linear",
}

function useGlow() {
  const ref = useRef<HTMLElement>(null)
  const [pos, setPos] = useState(50)
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos(((e.clientX - r.left) / r.width) * 100)
  }

  return { ref, pos, hovered, onMove, setHovered }
}

function OuterGlow({ pos, hovered }: { pos: number; hovered: boolean }) {
  return (
    <div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        opacity: hovered ? 1 : 0,
        background: `radial-gradient(circle at ${pos}% 50%, rgba(255,255,255,0.9), transparent 65%)`,
        filter: "blur(20px)",
        transform: "scale(1.15)",
        transition: "opacity 0.3s",
      }}
    />
  )
}

// Link version (Download CV, Let's Talk)
export function GlowButton({
  href,
  download,
  children,
  className = "",
}: {
  href: string
  download?: boolean
  children: React.ReactNode
  className?: string
}) {
  const { ref, pos, hovered, onMove, setHovered } = useGlow()

  return (
    <div className="relative inline-block">
      <OuterGlow pos={pos} hovered={hovered} />
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative block rounded-full font-semibold tracking-[0.15em] uppercase select-none ${className}`}
        style={hovered ? GLOW_STYLE(pos) : REST_STYLE}
      >
        {children}
      </a>
    </div>
  )
}

// Submit button version (Send Message)
export function GlowSubmitButton({
  children,
  className = "",
  disabled = false,
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}) {
  const { ref, pos, hovered, onMove, setHovered } = useGlow()

  return (
    <div className="relative">
      <OuterGlow pos={pos} hovered={hovered && !disabled} />
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type="submit"
        disabled={disabled}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative w-full rounded-xl font-semibold tracking-[0.1em] uppercase select-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        style={hovered && !disabled ? GLOW_STYLE(pos) : REST_STYLE}
      >
        {children}
      </button>
    </div>
  )
}

// Pill version (skill tags)
export function GlowPill({ children }: { children: React.ReactNode }) {
  const { ref, pos, hovered, onMove, setHovered } = useGlow()

  return (
    <div className="relative inline-block">
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${pos}% 50%, rgba(255,255,255,0.7), transparent 70%)`,
          filter: "blur(10px)",
          transform: "scale(1.2)",
          transition: "opacity 0.3s",
        }}
      />
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative block px-3 py-1 rounded-full tracking-wide text-base cursor-default select-none"
        style={
          hovered
            ? {
                background: `radial-gradient(circle 50px at ${pos}% 50%, rgba(255,255,255,1) 0%, rgba(220,225,235,0.95) 55%, rgb(195,200,215) 100%)`,
                color: "#0a0a1a",
                border: "1px solid rgba(255,255,255,0.5)",
                transition: "background 0.06s linear",
              }
            : {
                background: "rgba(255,255,255,0.75)",
                color: "#0a0a1a",
                border: "1px solid rgba(255,255,255,0.8)",
                transition: "background 0.06s linear",
              }
        }
      >
        {children}
      </span>
    </div>
  )
}
