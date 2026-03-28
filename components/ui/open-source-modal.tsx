"use client"

import { useState, useEffect } from "react"
import { X, ExternalLink } from "lucide-react"
import { GlowButton } from "@/components/ui/glow-button"

const wpPlugins = [
  {
    name: "Bhairav Scheduled Cloud Backup",
    url: "https://wordpress.org/plugins/bhairav-scheduled-cloud-backup/",
    desc: "Automated scheduled backups to cloud storage",
  },
  {
    name: "Core Web Vitals – Real User Monitoring",
    url: "https://wordpress.org/plugins/core-web-vitals-real-user-monitoring-rum/",
    desc: "RUM analytics for CWV scores in real-time",
  },
  {
    name: "Hungry Resource Monitor",
    url: "https://wordpress.org/plugins/hungry-resource-monitor/",
    desc: "Monitor PHP memory, CPU and server resources",
  },
  {
    name: "Hungry REST API Monitor",
    url: "https://wordpress.org/plugins/hungry-rest-api-monitor/",
    desc: "Log and audit all REST API calls on your site",
  },
  {
    name: "Nandann AI Smart 404 Redirects",
    url: "https://wordpress.org/plugins/nandann-ai-smart-404-redirect/",
    desc: "Auto-fix broken links and typos with AI",
  },
  {
    name: "Reset File and Folder Permissions",
    url: "https://wordpress.org/plugins/reset-file-and-folder-permissions/",
    desc: "One-click permission reset for files & folders",
  },
  {
    name: "TG Live Chat",
    url: "https://wordpress.org/plugins/tg-live-chat/",
    desc: "Embed Telegram live chat on any WordPress site",
  },
]

const npmPackages = [
  {
    name: "nextjs16-migrator",
    url: "https://www.npmjs.com/package/nextjs16-migrator",
    desc: "CLI tool that automates Next.js 16 migration tasks",
  },
]

type ModalType = "wp" | "npm" | null

interface OpenSourceModalProps {
  type: ModalType
  onClose: () => void
}

function Modal({ type, onClose }: OpenSourceModalProps) {
  const isWP = type === "wp"
  const items = isWP ? wpPlugins : npmPackages
  const title = isWP ? "7 WordPress Plugins" : "npm Packages"
  const linkLabel = isWP ? "wordpress.org" : "npmjs.com"

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-lg bg-[#0d0d14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Open Source</p>
            <h3 className="text-white text-xl font-semibold">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* List */}
        <ul className="divide-y divide-white/5">
          {items.map((item, i) => (
            <li key={i} className="group">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <span className="shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 text-xs mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-snug group-hover:text-white/90">
                    {item.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                </div>
                <ExternalLink size={13} className="shrink-0 mt-1 text-white/20 group-hover:text-white/60 transition-colors" />
              </a>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <a
            href={isWP ? "https://profiles.wordpress.org/prakharb88/" : "https://www.npmjs.com/~prakharb88"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors flex items-center gap-1"
          >
            View all on {linkLabel} <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Trigger buttons used inside skill pills ──────────────────────────────────

export function WPPluginsTrigger() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
          text-sm font-medium cursor-pointer select-none
          border border-white/80 bg-white/75 text-[#0a0a1a]
          hover:bg-white transition-colors duration-150
        "
      >
        7 plugins on wordpress.org
        <ExternalLink size={11} />
      </button>
      {open && <Modal type="wp" onClose={() => setOpen(false)} />}
    </>
  )
}

export function NpmPackagesTrigger() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
          text-sm font-medium cursor-pointer select-none
          border border-white/80 bg-white/75 text-[#0a0a1a]
          hover:bg-white transition-colors duration-150
        "
      >
        npm packages
        <ExternalLink size={11} />
      </button>
      {open && <Modal type="npm" onClose={() => setOpen(false)} />}
    </>
  )
}

// ── Standalone "View All" button for services section ────────────────────────

export function ViewAllPluginsButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          inline-flex items-center gap-1 text-white/60 hover:text-white
          text-sm underline underline-offset-4 transition-colors
        "
      >
        View all 7 plugins ↗
      </button>
      {open && <Modal type="wp" onClose={() => setOpen(false)} />}
    </>
  )
}
