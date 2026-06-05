import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Events Gallery — Weddings, Receptions & Celebrations at Bika Banquets Kolkata",
  description:
    "Browse our gallery of weddings, receptions, sangeet nights, corporate events and birthday celebrations hosted at Bika Banquets across Golaghata, Baguiati and Howrah, Kolkata.",
};

const images = [
  // Golaghata
  { src: "/images/venues/golaghata/golaghata-hero-19.jpg", alt: "Grand banquet hall with chandeliers at Bika Banquets, Golaghata, Kolkata", caption: "Grand Hall", venue: "Golaghata", category: "Venues", wide: true },
  { src: "/images/venues/golaghata/golaghata-decor-02.jpg", alt: "Signature green floral backdrop at Bika Banquets, Golaghata, Kolkata", caption: "Signature Backdrop", venue: "Golaghata", category: "Décor", wide: false },
  { src: "/images/venues/golaghata/golaghata-hero-23.jpg", alt: "Decorated reception stage at Bika Banquets, Golaghata, Kolkata", caption: "Reception Stage", venue: "Golaghata", category: "Weddings", wide: false },
  { src: "/images/venues/golaghata/golaghata-decor-10.jpg", alt: "Floral pillars and centrepiece at Bika Banquets, Golaghata, Kolkata", caption: "Floral Pillars", venue: "Golaghata", category: "Décor", wide: false },
  // Baguiati
  { src: "/images/venues/baguiati/baguiati-hero-14.jpg", alt: "Symmetric floral wedding mandap at Bika Rythm, Baguiati, Kolkata", caption: "Wedding Mandap", venue: "Baguiati", category: "Weddings", wide: true },
  { src: "/images/venues/baguiati/baguiati-decor-02.jpg", alt: "Rose floral arch with hanging lights at Bika Rythm, Baguiati, Kolkata", caption: "Floral Arch", venue: "Baguiati", category: "Décor", wide: false },
  { src: "/images/venues/baguiati/baguiati-hero-18.jpg", alt: "Pink lounge seating with drapes at Bika Rythm, Baguiati, Kolkata", caption: "Lounge Seating", venue: "Baguiati", category: "Venues", wide: false },
  { src: "/images/venues/baguiati/baguiati-hero-21.jpg", alt: "Ornate golden wedding mandap at Bika Rythm, Baguiati, Kolkata", caption: "Ornate Mandap", venue: "Baguiati", category: "Weddings", wide: false },
  // Howrah
  { src: "/images/venues/howrah/howrah-hero-07.jpg", alt: "Golden double-arch wedding stage at Bika Rangoli, Belur, Howrah", caption: "Golden Stage", venue: "Howrah", category: "Weddings", wide: false },
  { src: "/images/venues/howrah/howrah-hero-22.jpg", alt: "Banquet hall set with round dining tables at Bika Rangoli, Belur, Howrah", caption: "Banquet Dining", venue: "Howrah", category: "Venues", wide: true },
  { src: "/images/venues/howrah/howrah-hero-05.jpg", alt: "Air-conditioned banquet hall with chandeliers at Bika Rangoli, Belur, Howrah", caption: "Banquet Hall", venue: "Howrah", category: "Venues", wide: false },
  { src: "/images/venues/howrah/howrah-decor-02.jpg", alt: "Golden mandap décor with drapes at Bika Rangoli, Belur, Howrah", caption: "Mandap Décor", venue: "Howrah", category: "Décor", wide: false },
  // Divinity Pavilion
  { src: "/images/venues/divinity/divinity-hero-13.jpg", alt: "Banquet hall with pink-draped chairs and gold stage at Divinity Pavilion, Lake Town, Kolkata", caption: "Banquet Hall", venue: "Divinity", category: "Venues", wide: false },
  { src: "/images/venues/divinity/divinity-hero-10.jpg", alt: "Candle-lit golden mandap at Divinity Pavilion, Lake Town, Kolkata", caption: "Candle-lit Mandap", venue: "Divinity", category: "Weddings", wide: false },
  { src: "/images/venues/divinity/divinity-food-02.jpg", alt: "In-house catering and live food station at Divinity Pavilion, Lake Town, Kolkata", caption: "Catering Station", venue: "Divinity", category: "Catering", wide: true },
  { src: "/images/venues/divinity/divinity-hero-20.jpg", alt: "White and green drape stage with hanging florals at Divinity Pavilion, Lake Town, Kolkata", caption: "Drape Stage", venue: "Divinity", category: "Décor", wide: false },
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

      {/* Masonry-style gallery with filters + lightbox */}
      <section className="pb-36 max-w-6xl mx-auto px-10">
        <Reveal>
          <GalleryGrid images={images} />
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
