"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  venue: string;
  category: string;
  wide?: boolean;
}

const uniq = (xs: string[]) => Array.from(new Set(xs));

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const venues = useMemo(() => ["All", ...uniq(images.map((i) => i.venue))], [images]);
  const categories = useMemo(() => ["All", ...uniq(images.map((i) => i.category))], [images]);

  const [venue, setVenue] = useState("All");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      images.filter(
        (i) => (venue === "All" || i.venue === venue) && (category === "All" || i.category === category),
      ),
    [images, venue, category],
  );

  // Keep the lightbox index valid if the filters change underneath it.
  useEffect(() => {
    if (active !== null && active >= filtered.length) setActive(null);
  }, [filtered.length, active]);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length],
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length],
  );

  // Keyboard control + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  const Chips = ({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] tracking-[2px] uppercase text-cream-dim mr-1">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`text-[11px] tracking-wide uppercase px-3.5 py-1.5 rounded-full border transition-colors duration-300 ${
            value === o
              ? "bg-gold text-white border-gold"
              : "border-line text-cream-dim hover:border-gold hover:text-gold"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );

  const current = active === null ? null : filtered[active];

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col gap-3 mb-10">
        <Chips label="Venue" options={venues} value={venue} onChange={setVenue} />
        <Chips label="Type" options={categories} value={category} onChange={setCategory} />
      </div>

      {/* Masonry grid */}
      {filtered.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {filtered.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Open ${img.caption}`}
              className={`relative w-full overflow-hidden rounded-sm group break-inside-avoid block ${
                img.wide ? "aspect-[16/10]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] tracking-[2px] uppercase text-gold-bright block mb-1">
                  {img.venue} · {img.category}
                </span>
                <span className="text-sm text-white font-light">{img.caption}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center text-cream-dim py-20">No photos match that filter yet.</p>
      )}

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[60] bg-ink/95 flex items-center justify-center p-4 sm:p-10"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-6 text-white/70 hover:text-white text-4xl leading-none"
          >
            ×
          </button>

          {filtered.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </>
          )}

          <figure
            className="relative w-full h-full max-w-5xl max-h-[82vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex-1">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center">
              <span className="text-[10px] tracking-[2px] uppercase text-gold-bright block mb-1">
                {current.venue} · {current.category}
              </span>
              <span className="text-sm text-white/90">{current.caption}</span>
              {filtered.length > 1 && (
                <span className="text-xs text-white/40 ml-3">
                  {active! + 1} / {filtered.length}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
