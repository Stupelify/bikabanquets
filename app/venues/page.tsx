import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { venues } from "@/lib/venues";

export const metadata: Metadata = {
  title: "Wedding & Event Venues — Kolkata, Howrah & Siliguri | Bika Banquets",
  description:
    "Explore Bika Banquets' venues across Kolkata, Howrah and Siliguri — Golaghata (400–600 guests), Baguiati VIP Road (700 guests, open terrace), Howrah, and our Four Vedas resort in Siliguri (lawn up to 1,800). In-house catering & décor at every location.",
};

export default function VenuesPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-48 pb-24 max-w-6xl mx-auto px-10">
        <Reveal>
          <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium">
            <span className="w-7 h-px bg-gold inline-block" />
            Our Locations
          </span>
          <h1 className="font-serif font-light text-[clamp(42px,6vw,80px)] leading-[1.02] tracking-[-0.02em] mt-5 mb-6">
            Our Venues,<br />One <em className="italic text-gold">Standard of Excellence</em>
          </h1>
          <p className="text-cream-dim text-lg max-w-2xl leading-relaxed">
            Each Bika venue is independently equipped with its own kitchen, décor team and event staff — the same quality of celebration across Kolkata, Howrah and Siliguri.
          </p>
        </Reveal>
      </section>

      {/* Venue rows */}
      {venues.map((v, i) => (
        <section
          key={v.slug}
          id={v.slug}
          className={`${i % 2 === 0 ? "bg-bg" : "bg-bg-warm"} border-t border-line`}
        >
          <div className={`max-w-6xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-0 ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}>
            {/* Image */}
            <Reveal className={`relative min-h-[500px] lg:min-h-[640px] overflow-hidden ${i % 2 !== 0 ? "[direction:ltr]" : ""}`}>
              <Image
                src={v.heroImage.src}
                alt={v.heroImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
              <div className="absolute top-8 left-8 font-serif text-xl text-white bg-ink/50 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center border border-line-strong">
                {String(i + 1).padStart(2, "0")}
              </div>
            </Reveal>

            {/* Info */}
            <Reveal delay={1} className={`py-20 px-12 flex flex-col justify-center ${i % 2 !== 0 ? "[direction:ltr]" : ""}`}>
              <span className="text-[11px] tracking-[3px] uppercase text-gold mb-3">{v.tagline}</span>
              <h2 className="font-serif font-light text-[clamp(32px,3.5vw,52px)] leading-[1.05] mb-4">{v.displayName}</h2>

              <a
                href={v.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream-dim flex items-center gap-2 mb-6 hover:text-gold transition-colors group"
              >
                <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {v.address}
                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </a>

              <p className="text-cream-dim text-sm leading-[1.85] mb-8">{v.longDescription}</p>

              {/* Capacity */}
              <div className="flex gap-10 py-6 border-y border-line mb-8">
                {v.capacity.map((c) => (
                  <div key={c.label}>
                    <div className="font-serif text-3xl text-gold font-light leading-none">{c.floating}</div>
                    <div className="text-[10px] tracking-[1.5px] uppercase text-cream-dim mt-2">{c.label ?? "Max"} Floating</div>
                    <div className="font-serif text-lg text-cream font-light mt-1">{c.seated} seated</div>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-10">
                {v.amenities.map((a) => (
                  <span key={a} className="text-[11px] tracking-wide uppercase text-cream-dim border border-line px-3 py-1.5 rounded-full">
                    {a}
                  </span>
                ))}
              </div>

              {/* Venue FAQs */}
              {v.faqs.length > 0 && (
                <div className="mb-10 space-y-4">
                  {v.faqs.map(({ q, a }) => (
                    <div key={q} className="border-l-2 border-gold pl-4">
                      <p className="text-sm text-cream font-normal mb-1">{q}</p>
                      <p className="text-sm text-cream-dim leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-gold text-white px-7 py-3.5 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-all duration-300 hover:-translate-y-0.5"
                >
                  Enquire about this Venue
                </Link>
                <a
                  href={v.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-line-strong text-cream-dim px-7 py-3.5 rounded-full text-xs tracking-widest uppercase font-light hover:border-gold hover:text-gold transition-all duration-300"
                >
                  Get Directions
                </a>
              </div>
            </Reveal>
          </div>

          {/* Gallery strip for this venue */}
          {v.galleryImages.length > 1 && (
            <div className="max-w-6xl mx-auto px-10 pb-16">
              <div className={`grid gap-3 ${v.galleryImages.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                {v.galleryImages.map((img) => (
                  <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-sm group">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                    {img.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-xs tracking-wider text-white">{img.caption}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-28 text-center max-w-3xl mx-auto px-10">
        <Reveal>
          <h2 className="font-serif font-light text-[clamp(30px,4vw,54px)] leading-[1.1] tracking-[-0.02em] mb-6">
            Not Sure Which Venue is <em className="italic text-gold">Right for You?</em>
          </h2>
          <p className="text-cream-dim text-base leading-relaxed mb-10">
            Our team will help you choose based on guest count, event type and date. Call us or send an enquiry — we respond within a few hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-white px-10 py-4 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-all duration-300">
              Enquire Now
            </Link>
            <a href="tel:+918961333313" className="inline-flex items-center gap-3 border border-line-strong text-ink px-10 py-4 rounded-full text-xs tracking-widest uppercase font-light hover:border-gold hover:text-gold transition-all duration-300">
              +91 89613 33313
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
