import Link from "next/link";
import "@/app/cinematic.css";

export function CtaFooter() {
  return (
    <div className="cinematic-page">
      <section className="finale">
        <h2>Want to build<br />something ambitious?</h2>
        <p>Full-stack, AI and Web3 — let&apos;s talk.</p>
        <div className="cta">
          <Link className="btn btn-primary" href="/contact">Get in touch</Link>
          <a className="btn btn-ghost" href="https://nandann.com" target="_blank" rel="noopener noreferrer">See my agency ↗</a>
        </div>
      </section>
      <footer className="cine-foot">
        <span>© {new Date().getFullYear()} Prakhar Bhatia — Full-Stack · Agentic AI · Web3</span>
        <span>
          <a href="https://github.com/prakharbha" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/prakharbhatia" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://nandann.com" target="_blank" rel="noopener noreferrer">nandann.com</a>
        </span>
      </footer>
    </div>
  );
}
