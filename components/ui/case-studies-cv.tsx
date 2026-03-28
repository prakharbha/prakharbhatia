"use client"

import { GlowCard } from "@/components/ui/spotlight-card"
import { Hotel, TrendingUp, Bot, Building2, ExternalLink, Award, Users, DollarSign, Zap } from "lucide-react"

const caseStudies = [
  {
    id: 1, glowColor: "blue" as const,
    icon: Hotel, iconBg: "bg-blue-500/15", iconColor: "text-blue-400",
    category: "Hospitality · Full Stack", title: "Pillars Hotel & Club", location: "Fort Lauderdale, FL",
    description: "Built the complete hotel website, custom reservation system, and hotel management platform. The property became one of the most awarded boutique hotels in the Americas.",
    awards: [
      "Condé Nast Johansens 2025 — Best Small & Exclusive Hotel, North & South America",
      "Condé Nast Traveler 2024 — #8 Hotel in Florida",
      "Award of Excellence — Best Dining (USA/Mexico/Canada/Caribbean) 2023 & 2024",
    ],
    tags: ["Next.js", "Node.js", "Custom CMS", "Reservation System"],
    link: "https://pillarshotel.com",
  },
  {
    id: 2, glowColor: "green" as const,
    icon: TrendingUp, iconBg: "bg-green-500/15", iconColor: "text-green-400",
    category: "FinTech · Education", title: "Tackle Trading", location: "tackletrading.com",
    description: "Core technical team member from the initial platform build in 2013. Helped architect and scale from zero to the #1 rated trading education platform in the US.",
    stats: [
      { icon: Users, label: "Paying Subscribers", value: "50,000+" },
      { icon: DollarSign, label: "Subscription", value: "$97/mo" },
      { icon: Award, label: "Ranking", value: "#1 Rated" },
    ],
    tags: ["React", "Node.js", "WordPress", "Custom LMS"],
    link: "https://tackletrading.com",
  },
  {
    id: 3, glowColor: "purple" as const,
    icon: Bot, iconBg: "bg-purple-500/15", iconColor: "text-purple-400",
    category: "FinTech · Agentic AI", title: "Hedge Fund AI Dashboards", location: "Multiple Clients · US",
    description: "Built algorithmic trading dashboards and real-time market scanning tools for multiple hedge funds. Later integrated agentic AI systems into daily operations and signal generation.",
    highlights: [
      "Real-time market scanning engines",
      "Algorithmic trading strategy dashboards",
      "Agentic AI for daily workflow automation",
      "Custom data pipelines & visualisations",
    ],
    tags: ["Python", "FastAPI", "React", "Agentic AI", "AWS"],
    link: null,
  },
  {
    id: 4, glowColor: "orange" as const,
    icon: Building2, iconBg: "bg-orange-500/15", iconColor: "text-orange-400",
    category: "Agency · Long-term Partnership", title: "Abstrakt Marketing Group", location: "St. Louis, MO",
    description: "Offshore development team via Nandann Creative Agency for one of the leading US B2B marketing agencies for ~8 years (2017–Oct 2025). Delivered hundreds of client websites and custom integrations.",
    stats: [
      { icon: Zap, label: "Partnership", value: "~8 Years" },
      { icon: Users, label: "Role", value: "Offshore Lead" },
      { icon: Award, label: "Type", value: "B2B Agency" },
    ],
    tags: ["WordPress", "React", "WooCommerce", "Custom Dev"],
    link: "https://abstraktmg.com",
  },
]

export function CaseStudiesCV() {
  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-white text-base uppercase tracking-[0.25em] mb-4">Selected Work</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Case Studies</h2>
          <p className="text-white text-lg max-w-xl mx-auto">Projects that shipped, scaled, and won awards.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map(study => {
            const Icon = study.icon
            return (
              <GlowCard key={study.id} glowColor={study.glowColor} customSize className="min-h-[420px] flex flex-col">
                <div className="flex flex-col gap-5 h-full relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${study.iconBg}`}><Icon className={`w-5 h-5 ${study.iconColor}`} /></div>
                      <div>
                        <div className="text-white text-base uppercase tracking-widest">{study.category}</div>
                        <div className="text-white text-base mt-0.5">{study.location}</div>
                      </div>
                    </div>
                    {study.link && (
                      <a href={study.link} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-white/10 hover:border-white/25 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5 text-white" />
                      </a>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{study.title}</h3>
                    <p className="text-white text-lg leading-relaxed mt-2">{study.description}</p>
                  </div>
                  {study.awards && (
                    <div className="space-y-2">
                      {study.awards.map((award, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Award className="w-3.5 h-3.5 text-yellow-400/70 mt-0.5 shrink-0" />
                          <span className="text-white text-base leading-relaxed">{award}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {study.stats && (
                    <div className="grid grid-cols-3 gap-3">
                      {study.stats.map((stat, i) => {
                        const StatIcon = stat.icon
                        return (
                          <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/8 text-center">
                            <StatIcon className="w-3.5 h-3.5 text-white mx-auto mb-1" />
                            <div className="text-white font-bold text-lg">{stat.value}</div>
                            <div className="text-white text-base mt-0.5">{stat.label}</div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {study.highlights && (
                    <ul className="space-y-1.5">
                      {study.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-white text-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400/80 shrink-0" />{h}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2 border-t border-white/8">
                    {study.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-white/10 border border-white/25 text-white text-base">{tag}</span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            )
          })}
        </div>
        <p className="section-tagline mt-16">Projects that shipped, scaled, and won awards.</p>
      </div>
    </section>
  )
}
