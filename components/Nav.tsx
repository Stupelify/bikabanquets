"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/venues", label: "Venues" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact#pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Only the homepage and individual venue pages have a dark hero image behind
  // the nav. /venues, /gallery and /contact open on the light ivory background,
  // so they must use dark nav text — otherwise the white logo/links disappear.
  const overHero = pathname === "/" || (pathname?.startsWith("/venues/") ?? false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // light text when transparent over hero, dark text when scrolled (light bg)
  const light = overHero && !scrolled;
  const logoColor = light ? "text-white" : "text-ink";
  const logoAccent = light ? "text-gold-bright" : "text-gold";
  const linkColor = light ? "text-white/80 hover:text-white" : "text-ink-soft hover:text-ink";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
          scrolled ? "py-3 bg-bg/90 backdrop-blur-md border-b border-line shadow-[0_2px_20px_rgba(43,38,32,0.06)]" : "py-5 md:py-6"
        }`}
      >
        <Link href="/" aria-label="Bika Banquets — Home" className="flex items-center">
          <Image
            src="/images/bika-logo.png"
            alt="Bika Banquets"
            width={480}
            height={286}
            priority
            className={`h-12 w-auto object-contain transition-all duration-300 ${light ? "brightness-0 invert" : ""}`}
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-10 list-none">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={`nav-link text-xs tracking-widest uppercase font-normal transition-colors duration-300 ${pathname === href ? (light ? "text-gold-bright" : "text-gold") : linkColor}`}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className={`text-xs tracking-widest uppercase font-medium px-6 py-3 rounded-full transition-all duration-300 ${light ? "border border-white/40 text-white hover:bg-white hover:text-ink" : "bg-gold text-white hover:bg-burgundy"}`}>
              Enquire
            </Link>
          </li>
        </ul>

        <button className="lg:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span className={`block w-6 h-[1.5px] transition-colors ${light ? "bg-white" : "bg-ink"}`} />
          <span className={`block w-6 h-[1.5px] transition-colors ${light ? "bg-white" : "bg-ink"}`} />
          <span className={`block w-6 h-[1.5px] transition-colors ${light ? "bg-white" : "bg-ink"}`} />
        </button>
      </nav>

      {menuOpen && <div className="fixed inset-0 bg-ink/40 z-50 lg:hidden" onClick={() => setMenuOpen(false)} />}

      <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-bg border-l border-line z-50 flex flex-col pt-24 px-10 pb-10 gap-2 transition-transform duration-500 lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button className="absolute top-7 right-8 text-ink text-3xl leading-none bg-transparent border-none cursor-pointer" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className="font-serif text-2xl text-ink py-4 border-b border-line hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
        <Link href="/contact" className="font-serif text-2xl text-gold py-4" onClick={() => setMenuOpen(false)}>Enquire Now</Link>
      </div>
    </>
  );
}
