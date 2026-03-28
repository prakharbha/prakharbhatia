"use client"

import { GlowCard } from "@/components/ui/spotlight-card"
import { Layers, Bot, Globe, Cloud, BarChart3, Cpu, CheckCircle2 } from "lucide-react"
import { ViewAllPluginsButton } from "@/components/ui/open-source-modal"

const services = [
  {
    glowColor: "blue" as const, icon: Layers, iconBg: "bg-blue-500/15", iconColor: "text-blue-400",
    title: "Full Stack Development", tagline: "End-to-end. Production-ready.",
    description: "From pixel-perfect frontends to scalable backends. React, Next.js, Node.js, Python — whatever the stack needs.",
    features: ["Custom web applications", "E-commerce (WooCommerce, custom)", "API design & integration", "Performance & Core Web Vitals", "Same-day website delivery"],
    tech: ["React", "Next.js", "Node.js", "Python", "Vite", "Tailwind"],
  },
  {
    glowColor: "purple" as const, icon: Bot, iconBg: "bg-purple-500/15", iconColor: "text-purple-400",
    title: "Agentic AI Systems", tagline: "The next layer of automation.",
    description: "Building agentic workflows and voice AI systems that handle customer calls, automate operations, and make businesses faster.",
    features: ["Agentic workflow automation", "Voice AI for customer care", "LLM integration & fine-tuning", "AI-powered chat systems", "Enterprise AI pipelines"],
    tech: ["Python", "FastAPI", "LLMs", "Voice AI", "AWS"],
    badge: "Current Focus", badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    glowColor: "orange" as const, icon: Cloud, iconBg: "bg-orange-500/15", iconColor: "text-orange-400",
    title: "Salesforce & APEX", tagline: "100+ clients served.",
    description: "Custom Salesforce development, APEX code, and full administration. Built for businesses that need CRM that works the way they do.",
    features: ["Custom APEX development", "Salesforce administration", "CRM workflow automation", "Third-party integrations", "Data migration & cleanup"],
    tech: ["Salesforce", "APEX", "REST APIs", "SOQL", "Lightning"],
  },
  {
    glowColor: "green" as const, icon: Globe, iconBg: "bg-green-500/15", iconColor: "text-green-400",
    title: "Web3 & DeFi", tagline: "On-chain and off-chain.",
    description: "Smart contracts, token platforms, DeFi dashboards, and Web3-integrated web applications built for the decentralised web.",
    features: ["Smart contract development", "DeFi protocol integrations", "Token launch platforms", "Web3 wallet connections", "On-chain data dashboards"],
    tech: ["Solidity", "Web3.js", "Ethers.js", "React", "Node.js"],
  },
  {
    glowColor: "red" as const, icon: BarChart3, iconBg: "bg-red-500/15", iconColor: "text-red-400",
    title: "Trading & FinTech", tagline: "Where precision is everything.",
    description: "Algorithmic trading dashboards, market scanning engines, and agentic systems built for hedge funds and trading platforms.",
    features: ["Algorithmic trading dashboards", "Real-time market scanners", "Agentic AI trading workflows", "Data visualisation & BI", "Trading education platforms"],
    tech: ["Python", "React", "FastAPI", "WebSockets", "AWS"],
  },
  {
    glowColor: "blue" as const, icon: Cpu, iconBg: "bg-cyan-500/15", iconColor: "text-cyan-400",
    title: "WordPress & Open Source", tagline: "7 plugins. 5,000+ projects.",
    description: "Deep WordPress expertise — custom plugins, WooCommerce, performance optimisation, and open-source tools used by thousands.",
    features: ["Custom plugin development", "WooCommerce solutions", "Core Web Vitals optimisation", "WordPress performance audits", "7 published plugins on wordpress.org"],
    tech: ["WordPress", "PHP", "WooCommerce", "REST API", "MySQL"],
  },
]

export function ServicesCV() {
  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-white text-base uppercase tracking-[0.25em] mb-4">What I Build</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Services</h2>
          <p className="text-white text-lg max-w-xl mx-auto">20+ years across every layer of the stack.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(service => {
            const Icon = service.icon
            return (
              <GlowCard key={service.title} glowColor={service.glowColor} customSize className="min-h-[380px] flex flex-col">
                <div className="flex flex-col gap-4 h-full relative z-10">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${service.iconBg}`}><Icon className={`w-5 h-5 ${service.iconColor}`} /></div>
                    {service.badge && (
                      <span className={`px-2.5 py-1 rounded-full border text-base font-medium ${service.badgeColor}`}>{service.badge}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <p className={`text-base mt-0.5 ${service.iconColor} opacity-80`}>{service.tagline}</p>
                  </div>
                  <p className="text-white text-lg leading-relaxed">{service.description}</p>
                  <ul className="space-y-1.5 flex-1">
                    {service.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-white text-lg">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                        {f}
                        {f.includes("wordpress.org") && (
                          <span className="ml-1"><ViewAllPluginsButton /></span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/8">
                    {service.tech.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-white/10 border border-white/25 text-white text-base">{t}</span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            )
          })}
        </div>
        <p className="section-tagline mt-16">Full stack. Every layer. Production-ready.</p>
      </div>
    </section>
  )
}
