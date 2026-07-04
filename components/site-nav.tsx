import Link from "next/link";
import "@/app/cinematic.css";

export function SiteNav() {
  return (
    <div className="cinematic-page">
      <nav className="cine-hud">
        <Link className="cine-hud-brand" href="/"><b>PB</b>&nbsp;&nbsp;PRAKHAR BHATIA</Link>
        <span className="cine-hud-right">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
          <a href="https://nandann.com" target="_blank" rel="noopener noreferrer">Nandann ↗</a>
        </span>
      </nav>
    </div>
  );
}
