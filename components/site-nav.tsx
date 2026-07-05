"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "@/app/cinematic.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "https://nandann.com", label: "Nandann ↗", external: true },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="cinematic-page">
      <nav className="cine-hud">
        <Link className="cine-hud-brand" href="/">
          <b>PB</b>&nbsp;&nbsp;PRAKHAR BHATIA
        </Link>

        {/* Desktop links */}
        <span className="cine-hud-right cine-hud-desktop">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            )
          )}
        </span>

        {/* Hamburger button — mobile only */}
        <button
          className="cine-hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`cine-bar cine-bar-top${open ? " open" : ""}`} />
          <span className={`cine-bar cine-bar-mid${open ? " open" : ""}`} />
          <span className={`cine-bar cine-bar-bot${open ? " open" : ""}`} />
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div className={`cine-mobile-overlay${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav className="cine-mobile-nav">
          {NAV_LINKS.map((link, i) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cine-mobile-link"
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="cine-mobile-link"
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Decorative brand watermark */}
        <span className="cine-mobile-watermark">PB</span>
      </div>
    </div>
  );
}
