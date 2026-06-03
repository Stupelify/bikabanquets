import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Events Gallery — Weddings, Receptions & Celebrations at Bika Banquets Kolkata",
  description:
    "Browse our gallery of weddings, receptions, sangeet nights, corporate events and birthday celebrations hosted at Bika Banquets across Golaghata, Baguiati and Howrah, Kolkata.",
};

const CDN = "https://assets.zyrosite.com/cdn-cgi/image/format=auto";

const images = [
  { src: `${CDN},w=1100/MBlLcEqY2yw3y2EF/dsc03314-4jZHMRzDhNKgTfVR.JPG`, alt: "Decorated wedding stage and reception setup at Bika Banquets Golaghata Kolkata", caption: "Wedding Reception", venue: "Golaghata", category: "Weddings", wide: true },
  { src: `${CDN},w=900/MBlLcEqY2yw3y2EF/dsc05317-6W1igokk7BwFIn1u.JPG`,   alt: "Elegant floral décor at a celebration hosted at Bika Banquets Kolkata", caption: "Floral Décor Setup", venue: "Golaghata", category: "Décor", wide: false },
  { src: `${CDN},w=800/MBlLcEqY2yw3y2EF/dsc00049-fYweGYuBJPDT148v.JPG`,   alt: "Banquet hall arrangement for a reception at Bika Rythm Baguiati", caption: "Hall Setup", venue: "Baguiati", category: "Venues", wide: false },
  { src: `${CDN},w=900/MBlLcEqY2yw3y2EF/1-126-mklv3kpxZeF8CDys.JPG`,     alt: "Live celebration and event in progress at Bika Banquets", caption: "Live Celebration", venue: "Golaghata", category: "Events", wide: false },
  { src: `${CDN},w=900/MBlLcEqY2yw3y2EF/dsc00169-HvbTjGsoDPzlAoxy.JPG`,  alt: "Interior view of Bika Rythm banquet hall, VIP Road, Baguiati, Kolkata", caption: "Bika Rythm Interior", venue: "Baguiati", category: "Venues", wide: true },
  { src: `${CDN},w=900/MBlLcEqY2yw3y2EF/115a6487-ovJFGLVkQmHn96bH.JPG`,  alt: "Grand banquet hall at Bika Banquets Golaghata Dakshindari Kolkata", caption: "Grand Hall", venue: "Golaghata", category: "Venues", wide: false },
  { src: `${CDN},w=1100/MBlLcEqY2yw3y2EF/dsc03447-Qouqi7rehbd1q8Pg.JPG`, alt: "Event reception setup at Bika Rangoli Howrah West Bengal", caption: "Bika Rangoli Setup", venue: "Howrah", category: "Events", wide: false },
  { src: `${CDN},w=1100/MBlLcEqY2yw3y2EF/dsc03288-WRXbWDLxQ61W4dfF.JPG`, alt: "Dining hall set with tables and chairs at Bika Banquets Kolkata", caption: "Dining Setup", venue: "Golaghata", category: "Venues", wide: false },
  { src: `${CDN},w=1100/MBlLcEqY2yw3y2EF/dsc03268-rXHN2kHdCDZJ77Vn.JPG`, alt: "Décor and catering arrangement at Bika Banquets", caption: "Catering & Décor", venue: "Golaghata", category: "Catering", wide: true },
];

export default function GalleryPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-48 pb-20 max-w-6xl mx-auto px-10">
        <Reveal>
          <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium">
            <span className="w-7 h-px bg-gold inline-block" />
            Our Work
          </span>
          <h1 className="font-serif font-light text-[clamp(42px,6vw,80px)] leading-[1.02] tracking-[-0.02em] mt-5 mb-6">
            Moments We&apos;ve Made <em className="italic text-gold">Unforgettable</em>
          </h1>
          <p className="text-cream-dim text-lg max-w-2xl leading-relaxed">
            A glimpse into the weddings, receptions, sangeet nights and celebrations we have had the privilege of hosting across our venues in Kolkata.
          </p>
        </Reveal>
      </section>

      {/* Masonry-style gallery */}
      <section className="pb-36 max-w-6xl mx-auto px-10">
        <Reveal>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-sm group cursor-pointer break-inside-avoid ${img.wide ? "aspect-[16/10]" : "aspect-[4/3]"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <span className="text-[10px] tracking-[2px] uppercase text-gold-bright block mb-1">{img.venue} · {img.category}</span>
                  <span className="text-sm text-white font-light">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Note about more photos */}
        <Reveal>
          <div className="mt-16 text-center border border-line rounded-sm p-10">
            <p className="text-cream-dim text-base leading-relaxed mb-6">
              This gallery shows a small selection of events we&apos;ve hosted. To see photos from a specific type of event or venue, or to arrange a live site visit, get in touch with our team.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-white px-8 py-4 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-all duration-300">
                Book a Site Visit
              </Link>
              <a
                href="https://wa.me/916230325532?text=Hi%20Bika%20Banquets%2C%20can%20you%20share%20more%20photos%20of%20your%20venue%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-line-strong text-ink px-8 py-4 rounded-full text-xs tracking-widest uppercase font-light hover:border-gold hover:text-gold transition-all duration-300"
              >
                Request More Photos on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
