"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { SiteNav } from "@/components/site-nav";
import { CtaFooter } from "@/components/cta-footer";

type ScrubCfg = {
  section: string;
  frameCount: number;
  framePath: (i: number) => string;
};

const SCRUBS: ScrubCfg[] = [
  { section: "#hero", frameCount: 193, framePath: (i) => `/frames/hero/frame_${String(i).padStart(4, "0")}.jpg` },
  { section: "#engineer", frameCount: 145, framePath: (i) => `/frames/engineer/frame_${String(i).padStart(4, "0")}.jpg` },
  { section: "#aibuilder", frameCount: 145, framePath: (i) => `/frames/aibuilder/frame_${String(i).padStart(4, "0")}.jpg` },
  { section: "#conference", frameCount: 120, framePath: (i) => `/frames/conference/frame_${String(i).padStart(4, "0")}.jpg` },
  { section: "#closer", frameCount: 145, framePath: (i) => `/frames/closer/frame_${String(i).padStart(4, "0")}.jpg` },
];

export default function CinematicHome() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    function initScrub(cfg: ScrubCfg) {
      const section = document.querySelector<HTMLElement>(cfg.section);
      if (!section) return null;
      const canvas = section.querySelector("canvas")!;
      const ctx = canvas.getContext("2d", { alpha: false })!;
      const lines = [...section.querySelectorAll<HTMLElement>(".reveal-line")];
      const images: HTMLImageElement[] = [];
      let firstDrawn = false;
      for (let i = 0; i < cfg.frameCount; i++) {
        const img = new Image();
        img.src = cfg.framePath(i + 1);
        img.onload = () => { if (!firstDrawn) { firstDrawn = true; draw(0); } };
        images[i] = img;
      }
      let current = -1;
      function draw(index: number) {
        const img = images[index];
        if (!img || !img.complete || !img.naturalWidth) return;
        const cw = canvas.clientWidth, ch = canvas.clientHeight;
        const ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
        let dw, dh, dx, dy;
        if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
        else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
        ctx.fillStyle = "#000"; ctx.fillRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
      }
      function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw(current < 0 ? 0 : current);
      }
      function update() {
        const rect = section!.getBoundingClientRect();
        if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight) return;
        const scrollable = rect.height - window.innerHeight;
        const p = Math.min(Math.max(-rect.top / scrollable, 0), 1);
        const idx = Math.min(cfg.frameCount - 1, Math.floor(p * (cfg.frameCount - 1)));
        if (idx !== current) { current = idx; draw(idx); }
        for (const el of lines) {
          const a = parseFloat(el.dataset.in!), b = parseFloat(el.dataset.out!);
          const span = b - a;
          const fade = Math.min(0.1, span * 0.28);
          let o;
          if (p <= a || p >= b) o = 0;
          else if (p < a + fade) o = (p - a) / fade;
          else if (p > b - fade) o = (b - p) / fade;
          else o = 1;
          o = Math.max(0, Math.min(1, o));
          el.style.opacity = o.toFixed(3);
          el.style.transform = `translateY(${(1 - o) * 24}px)`;
        }
      }
      window.addEventListener("resize", resize);
      resize();
      return { update, resize };
    }

    function animateCount(el: HTMLElement) {
      const target = parseFloat(el.dataset.count!), suffix = el.dataset.suffix || "";
      const dur = 1500, t0 = performance.now();
      function step(t: number) {
        const k = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - k, 3);
        el.textContent = (target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1)).toLocaleString() + suffix;
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const scrubs = SCRUBS.map(initScrub).filter(Boolean) as { update: () => void; resize: () => void }[];

    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenisRef.current = lenis;
    let rafId = 0;
    function raf(t: number) { lenis.raf(t); scrubs.forEach((s) => s.update()); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.classList.contains("stat-num")) animateCount(e.target as HTMLElement);
        io.unobserve(e.target);
      });
    }, { threshold: 0.25 });
    document.querySelectorAll(".cinematic-page .reveal, .cinematic-page .stat-num").forEach((el) => io.observe(el));

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      io.disconnect();
    };
  }, []);

  const scrollToContent = () => {
    const el = document.getElementById("stats-start");
    if (lenisRef.current && el) lenisRef.current.scrollTo(el, { duration: 1.1 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="cinematic-page">
      <div className="cine-grain" />

      <SiteNav />

      {/* HERO */}
      <section className="cinematic" id="hero" style={{ height: "300vh" }}>
        <div className="sticky">
          <canvas />
          <div className="vignette" />
          <div className="overlay">
            <h1 className="reveal-line display h-title" data-in="0.00" data-out="0.34">PRAKHAR<br />BHATIA</h1>
            <p className="reveal-line h-sub" data-in="0.36" data-out="0.66">I build full-stack products with <span className="amber">AI, Rust, Python</span> &amp; the modern web.</p>
            <p className="reveal-line kicker" data-in="0.70" data-out="0.98">Full-Stack · Agentic AI · Web3 · 20+ Years</p>
          </div>
          <button className="scroll-btn" aria-label="Scroll to content" onClick={scrollToContent}>
            <span>Scroll</span><span className="scroll-btn-arrow">▾</span>
          </button>
        </div>
      </section>

      {/* STATS */}
      <div className="stats" id="stats-start">
        <div className="stat"><span className="stat-num" data-count="20" data-suffix="+">0</span><span className="stat-lbl">Years Full-Stack</span></div>
        <div className="stat"><span className="stat-num" data-count="100" data-suffix="+">0</span><span className="stat-lbl">Salesforce Clients</span></div>
        <div className="stat"><span className="stat-num" data-count="5000" data-suffix="+">0</span><span className="stat-lbl">WordPress Projects</span></div>
        <div className="stat"><span className="stat-num" data-count="7" data-suffix="">0</span><span className="stat-lbl">Published Plugins</span></div>
      </div>

      {/* MARQUEE */}
      <div className="marquee"><div>
        {Array.from({ length: 2 }).map((_, k) => (
          <span key={k}>
            <span>Rust</span><span className="dot">·</span><span>Python</span><span className="dot">·</span><span>Node.js</span><span className="dot">·</span><span>React</span><span className="dot">·</span><span>Next.js</span><span className="dot">·</span><span>Agentic AI</span><span className="dot">·</span><span>Web3</span><span className="dot">·</span><span>FastAPI</span><span className="dot">·</span><span>Solidity</span><span className="dot">·</span>
          </span>
        ))}
      </div></div>

      {/* ENGINEER */}
      <section className="cinematic" id="engineer" style={{ height: "420vh" }}>
        <div className="sticky">
          <canvas /><div className="vignette" />
          <div className="overlay">
            <div className="reveal-line title-group" data-in="0.06" data-out="0.52">
              <p className="kicker">01 — The Engineer</p>
              <h2 className="display sec-label">FULL STACK,<br />END TO END.</h2>
            </div>
            <p className="reveal-line sec-desc" data-in="0.60" data-out="0.96">React · Next.js · Node.js · Python · Rust — whatever the stack needs, shipped to production.</p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="panel">
        <p className="eyebrow reveal">What I do</p>
        <h2 className="big reveal">Three ways I build.</h2>
        <div className="pillars" style={{ marginTop: 44 }}>
          <div className="pillar reveal"><div className="no">01</div><h3>The Engineer</h3><p>Full-stack, end to end — React, Next.js, Node.js, Python and Rust. Pixel-perfect frontends to scalable backends.</p></div>
          <div className="pillar reveal"><div className="no">02</div><h3>The AI Builder</h3><p>Agentic AI systems, LLM integration and voice AI that automate real operations and make businesses faster.</p></div>
          <div className="pillar reveal"><div className="no">03</div><h3>The Founder</h3><p>Founder of Nandann Creative Agency — Web3/DeFi, Salesforce and FinTech built for real businesses.</p></div>
        </div>
      </section>

      {/* AI BUILDER */}
      <section className="cinematic" id="aibuilder" style={{ height: "420vh" }}>
        <div className="sticky">
          <canvas /><div className="vignette" />
          <div className="overlay">
            <div className="reveal-line title-group" data-in="0.06" data-out="0.52">
              <p className="kicker">02 — The AI Builder</p>
              <h2 className="display sec-label">AGENTIC AI,<br />SHIPPED.</h2>
            </div>
            <p className="reveal-line sec-desc" data-in="0.60" data-out="0.96">Agentic workflows, LLM integration and voice AI — the next layer of automation, in production.</p>
          </div>
        </div>
      </section>

      {/* CONFERENCE */}
      <section className="cinematic" id="conference" style={{ height: "460vh" }}>
        <div className="sticky">
          <canvas /><div className="vignette" />
          <div className="overlay">
            <div className="reveal-line title-group" data-in="0.06" data-out="0.54">
              <p className="kicker">On stage</p>
              <h2 className="display sec-label">SHARING<br />WHAT I BUILD.</h2>
            </div>
            <p className="reveal-line sec-desc" data-in="0.62" data-out="0.96">Speaking on AI, Rust and modern engineering to rooms that build the future.</p>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="panel" id="work">
        <p className="eyebrow reveal">Selected work</p>
        <h2 className="big reveal">Things I&apos;ve built.</h2>
        <p className="lead reveal">Two decades across every layer of the stack — from agentic AI systems to trading engines to open-source tools used by thousands.</p>
        <div className="work">
          <div className="card reveal"><h4>Agentic &amp; Voice AI</h4><p>Agentic workflows and voice AI systems that handle customer calls, automate operations and make businesses faster.</p><div className="tech">Python · FastAPI · LLMs</div></div>
          <div className="card reveal"><h4>Trading &amp; FinTech</h4><p>Algorithmic trading dashboards, real-time market scanners and agentic systems for hedge funds and trading platforms.</p><div className="tech">Python · Rust · WebSockets</div></div>
          <div className="card reveal"><h4>Open Source · WordPress</h4><p>7 published plugins and 5,000+ WordPress projects — custom plugins, WooCommerce and performance tooling used by thousands.</p><div className="tech">PHP · JS · Open Source</div></div>
        </div>
      </section>

      {/* CLOSER */}
      <section className="cinematic" id="closer" style={{ height: "420vh" }}>
        <div className="sticky">
          <canvas /><div className="vignette" />
          <div className="overlay">
            <h2 className="reveal-line display sec-label" data-in="0.05" data-out="0.45">LET&apos;S BUILD<br />SOMETHING.</h2>
            <p className="reveal-line sec-desc" data-in="0.50" data-out="0.95">Ambitious products, agentic AI and systems that work the way your business does.</p>
          </div>
        </div>
      </section>

      {/* FINALE + FOOTER */}
      <CtaFooter />
    </div>
  );
}
