import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { venues, getVenueBySlug } from "@/lib/venues";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVenueBySlug(slug);
  if (!v) return {};

  const maxCap = Math.max(...v.capacity.map((c) => c.floating));

  return {
    title: `${v.displayName} — Banquet Hall in ${v.addressShort} | Up to ${maxCap} Guests`,
    description: `${v.displayName}: ${v.description} ${v.amenities.slice(0, 4).join(", ")}. Book a site visit or call +91 89613 33313.`,
    alternates: { canonical: `https://bikabanquets.com/venues/${slug}` },
    openGraph: {
      title: `${v.displayName} | Bika Banquets`,
      description: v.description,
      url: `https://bikabanquets.com/venues/${slug}`,
      images: [{ url: v.heroImage.src, width: 1200, height: 630, alt: v.heroImage.alt }],
    },
  };
}

export default async function VenuePage({ params }: Props) {
  const { slug } = await params;
  const v = getVenueBySlug(slug);
  if (!v) notFound();

  const maxCap = Math.max(...v.capacity.map((c) => c.floating));

  // JSON-LD schema specific to this venue
  const venueSchema = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: v.displayName,
    description: v.longDescription,
    url: `https://bikabanquets.com/venues/${v.slug}`,
    telephone: v.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: v.schema.streetAddress,
      addressLocality: v.city,
      addressRegion: "West Bengal",
      postalCode: v.schema.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: v.schema.latitude,
      longitude: v.schema.longitude,
    },
    maximumAttendeeCapacity: maxCap,
    amenityFeature: v.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
    image: v.heroImage.src,
    hasMap: v.mapUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bikabanquets.com" },
      { "@type": "ListItem", position: 2, name: "Venues", item: "https://bikabanquets.com/venues" },
      { "@type": "ListItem", position: 3, name: v.brand, item: `https://bikabanquets.com/venues/${v.slug}` },
    ],
  };

  const faqSchema =
    v.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: v.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const otherVenues = venues.filter((x) => x.slug !== v.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(venueSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src={v.heroImage.src}
          alt={v.heroImage.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/65 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-10 pb-16 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-white/70 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold-bright transition-colors text-white/70">Home</Link>
            <span className="opacity-40">/</span>
            <Link href="/venues" className="hover:text-gold-bright transition-colors text-white/70">Venues</Link>
            <span className="opacity-40">/</span>
            <span className="text-gold-bright">{v.brand}</span>
          </nav>

          <span className="text-[11px] tracking-[3px] uppercase text-gold mb-3 block">{v.tagline}</span>
          <h1 className="font-serif font-light text-[clamp(44px,7vw,96px)] leading-[0.98] tracking-[-0.02em] mb-5 text-white">
            {v.displayName}
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed">{v.description}</p>
        </div>
      </section>

      {/* Quick facts bar */}
      <div className="bg-bg-warm border-y border-line">
        <div className="max-w-6xl mx-auto px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
            {v.capacity.map((c) => (
              <div key={c.label} className="py-8 px-6 text-center">
                <div className="font-serif text-4xl text-gold font-light leading-none">{c.floating}</div>
                <div className="text-[10px] tracking-[1.5px] uppercase text-cream-dim mt-2">{c.label} (floating)</div>
              </div>
            ))}
            <div className="py-8 px-6 text-center">
              <div className="font-serif text-4xl text-gold font-light leading-none">
                {v.capacity.reduce((s, c) => s + c.seated, 0)}
              </div>
              <div className="text-[10px] tracking-[1.5px] uppercase text-cream-dim mt-2">Total Seated</div>
            </div>
            <div className="py-8 px-6 text-center">
              <div className="font-serif text-4xl text-gold font-light leading-none">{v.amenities.length}</div>
              <div className="text-[10px] tracking-[1.5px] uppercase text-cream-dim mt-2">Amenities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-28 max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: about + amenities + faqs */}
          <div className="lg:col-span-2 space-y-16">
            <Reveal>
              <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium">
                <span className="w-7 h-px bg-gold inline-block" />
                About This Venue
              </span>
              <p className="text-cream-dim text-base leading-[1.9] mt-6">{v.longDescription}</p>
            </Reveal>

            {/* Amenities */}
            <Reveal>
              <h2 className="font-serif font-light text-3xl mb-6">Amenities &amp; Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {v.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3 p-4 border border-line rounded-sm hover:border-line-strong transition-colors">
                    <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-sm text-cream-dim">{a}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Gallery */}
            {v.galleryImages.length > 0 && (
              <Reveal>
                <h2 className="font-serif font-light text-3xl mb-6">Venue Gallery</h2>
                <div className={`grid gap-3 ${v.galleryImages.length >= 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2"}`}>
                  {v.galleryImages.map((img, i) => (
                    <div
                      key={img.src}
                      className={`relative overflow-hidden rounded-sm group ${i === 0 && v.galleryImages.length >= 3 ? "row-span-2" : ""}`}
                      style={{ aspectRatio: i === 0 && v.galleryImages.length >= 3 ? "3/4" : "4/3" }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      {img.caption && (
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-xs tracking-wider text-white">{img.caption}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* FAQs */}
            {v.faqs.length > 0 && (
              <Reveal>
                <h2 className="font-serif font-light text-3xl mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {v.faqs.map(({ q, a }) => (
                    <div key={q} className="border border-line p-6 rounded-sm">
                      <h3 className="font-serif text-lg font-normal text-cream mb-2">{q}</h3>
                      <p className="text-sm text-cream-dim leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Right: sticky enquiry sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              <Reveal>
                <div className="border border-gold/30 bg-bg-warm p-8 rounded-sm">
                  <h3 className="font-serif font-light text-2xl mb-6">Enquire about<br /><em className="italic text-gold">{v.brand}</em></h3>
                  <div className="space-y-4 mb-8 text-sm">
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span className="text-cream-dim">{v.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.1 6.1l1.27-1.52a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                      <a href={`tel:${v.phone}`} className="text-cream hover:text-gold transition-colors">{v.phone}</a>
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-line">
                      <span className="text-[10px] tracking-[2px] uppercase text-cream-dim">Max capacity</span>
                      <span className="font-serif text-xl text-gold">{maxCap}</span>
                    </div>
                  </div>

                  <Link
                    href={`/contact?venue=${v.slug}`}
                    className="block w-full text-center bg-gold text-white py-4 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-all duration-300 hover:-translate-y-0.5 mb-3"
                  >
                    Send Enquiry
                  </Link>
                  <a
                    href={`https://wa.me/916230325532?text=Hi%2C%20I%27m%20interested%20in%20booking%20${encodeURIComponent(v.displayName)}.%20Can%20you%20share%20availability%20and%20pricing%3F`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full border border-[#25D366]/40 text-[#25D366] py-4 rounded-full text-xs tracking-widest uppercase font-medium hover:bg-[#25D366]/10 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Us
                  </a>
                  <a
                    href={v.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center border border-line text-cream-dim py-4 rounded-full text-xs tracking-widest uppercase font-light hover:border-line-strong hover:text-cream transition-all duration-300 mt-3"
                  >
                    Get Directions
                  </a>
                </div>
              </Reveal>

              {/* Other venues */}
              <Reveal delay={1}>
                <div className="border border-line p-6 rounded-sm">
                  <h4 className="text-[11px] tracking-[3px] uppercase text-cream-dim mb-5">Other Venues</h4>
                  <div className="space-y-3">
                    {otherVenues.map((ov) => (
                      <Link
                        key={ov.slug}
                        href={`/venues/${ov.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="relative w-14 h-12 rounded-sm overflow-hidden flex-shrink-0">
                          <Image
                            src={ov.heroImage.src.replace("w=2000", "w=200")}
                            alt={ov.brand}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="56px"
                          />
                        </div>
                        <div>
                          <div className="text-sm text-cream group-hover:text-gold transition-colors">{ov.brand}</div>
                          <div className="text-xs text-cream-dim">{ov.addressShort}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
