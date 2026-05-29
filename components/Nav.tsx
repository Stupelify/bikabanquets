"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/venues", label: "Venues" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-bg/85 backdrop-blur-md border-b border-line"
            : "py-6"
        }`}
      >
        <Link href="/" className="font-serif text-2xl font-light text-cream tracking-wide">
          Bika <em className="italic text-gold not-italic" style={{ fontStyle: "italic" }}>Banquets</em>
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-10 list-none">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav-link text-xs tracking-widest uppercase font-light transition-colors duration-300 ${
                  pathname === href ? "text-gold" : "text-cream-dim hover:text-cream"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="text-xs tracking-widest uppercase font-medium text-cream border border-line-strong px-6 py-3 rounded-full transition-all duration-300 hover:bg-gold hover:border-gold hover:text-bg"
            >
              Enquire
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="block w-6 h-[1.5px] bg-cream" />
          <span className="block w-6 h-[1.5px] bg-cream" />
          <span className="block w-6 h-[1.5px] bg-cream" />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-bg-warm border-l border-line z-50 flex flex-col pt-24 px-10 pb-10 gap-2 transition-transform duration-500 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-7 right-8 text-cream text-3xl leading-none bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-serif text-2xl text-cream py-4 border-b border-line hover:text-gold transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="font-serif text-2xl text-gold py-4 border-b border-line"
          onClick={() => setMenuOpen(false)}
        >
          Enquire Now
        </Link>
      </div>
    </>
  );
}
