import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { venues } from "@/lib/venues";

export const metadata: Metadata = {
  title: "Bika Banquets | Luxury Wedding & Event Venues in Kolkata — Golaghata, Baguiati, Howrah",
  description:
    "Bika Banquets offers premium wedding and event venues across Kolkata — Golaghata, Baguiati & Howrah. In-house catering from ₹700/plate, décor, valet parking for 150–700 guests. Book now.",
};


const services = [
  { num: "01", name: "Weddings & Receptions", desc: "Full-day packages with mandap, floral décor, bridal entry and multi-cuisine buffet — Bengali, Marwari and North Indian traditions welcomed.", tags: ["Bengali Weddings", "Marwari", "Reception"] },
  { num: "02", name: "Pre-Wedding Ceremonies", desc: "Dedicated setups for Sangeet, Mehndi, Tilak, Haldi and Engagement with thematic décor and live music.", tags: ["Sangeet", "Mehndi", "Engagement"] },
  { num: "03", name: "Corporate Events", desc: "Conference-ready halls with projector, screens and PA system — ideal for seminars, product launches and AGMs.", tags: ["Seminars", "Conferences", "Dinners"] },
  { num: "04", name: "Birthdays & Anniversaries", desc: "From intimate 50-guest dinners to grand 500-guest celebrations with customised layout, menu and décor.", tags: ["Birthdays", "Anniversaries", "Baby Shower"] },
  { num: "05", name: "In-House Catering", desc: "Our kitchen handles Bengali spreads, Mughlai cuisine, continental and Jain menus — all prepared fresh on the day.", tags: ["Veg from ₹700/plate", "Non-Veg ₹1,300+"] },
  { num: "06", name: "Décor & Florals", desc: "Bespoke floral installations, stage backdrops, LED lighting rigs and themed entryways — no outside decorators needed.", tags: ["Floral Mandap", "LED Lighting", "Entry Arch"] },
];

const stats = [
  { val: "700+", label: "Max Guests" },
  { val: "3",    label: "Locations" },
  { val: "1000+",label: "Events Hosted" },
  { val: `${new Date().getFullYear() - 2016}+`, label: "Years of Excellence" },
];

const galleryImages = [
  { src: "/images/venues/baguiati/baguiati-hero-14.jpg", alt: "Symmetric floral wedding mandap at Bika Rythm, Baguiati, Kolkata", caption: "Wedding Mandap · Baguiati", cls: "col-span-5 row-span-2" },
  { src: "/images/venues/golaghata/golaghata-decor-02.jpg", alt: "Signature green floral backdrop at Bika Banquets, Golaghata, Kolkata", caption: "Signature Décor · Golaghata", cls: "col-span-4 row-span-2" },
  { src: "/images/venues/howrah/howrah-hero-07.jpg", alt: "Golden double-arch wedding stage at Bika Rangoli, Belur, Howrah", caption: "Golden Stage · Howrah", cls: "col-span-3 row-span-2" },
  { src: "/images/venues/divinity/divinity-hero-10.jpg", alt: "Candle-lit golden mandap at Divinity Pavilion, Lake Town, Kolkata", caption: "Candle-lit Mandap · Lake Town", cls: "col-span-4" },
  { src: "/images/venues/golaghata/golaghata-hero-19.jpg", alt: "Grand banquet hall with chandeliers at Bika Banquets, Golaghata, Kolkata", caption: "Grand Hall · Golaghata", cls: "col-span-4" },
  { src: "/images/venues/howrah/howrah-hero-22.jpg", alt: "Banquet hall set with round dining tables at Bika Rangoli, Belur, Howrah", caption: "Banquet Dining · Howrah", cls: "col-span-4" },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Elegant banquet hall at Bika Banquets, Golaghata, Kolkata — decorated for a grand wedding reception"
            fill
            priority
            className="object-cover animate-slow-zoom"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />
        </div>

        <div className="relative z-10 w-full pb-20 max-w-6xl mx-auto px-10">
          <span
            className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="w-7 h-px bg-gold inline-block" />
            Premier Event Venues · Kolkata · Since 2016
          </span>

          <h1 className="font-serif font-light text-[clamp(52px,9vw,120px)] leading-[0.98] tracking-[-0.02em] mt-6 mb-7 max-w-[14ch] text-white">
            <span className="line-mask block">
              <span className="block animate-line-up" style={{ animationDelay: "0.4s" }}>
                Where Every
              </span>
            </span>
            <span className="line-mask block">
              <span className="block animate-line-up italic text-gold-bright" style={{ animationDelay: "0.55s" }}>
                Celebration
              </span>
            </span>
            <span className="line-mask block">
              <span className="block animate-line-up" style={{ animationDelay: "0.7s" }}>
                Becomes Legend
              </span>
            </span>
          </h1>

          <p
            className="text-[clamp(15px,1.6vw,18px)] text-white/85 max-w-lg mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.9s" }}
          >
            Luxury wedding and event venues across Kolkata — Golaghata, Baguiati &amp; Howrah — with in-house catering, bespoke décor and valet parking for 150 to 700 guests.
          </p>

          <div
            className="flex gap-4 flex-wrap animate-fade-up"
            style={{ animationDelay: "1.05s" }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gold text-white px-8 py-4 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(201,162,75,0.3)]"
            >
              Book a Venue Visit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link
              href="/venues"
              className="inline-flex items-center gap-3 border border-white/40 text-white px-8 py-4 rounded-full text-xs tracking-widest uppercase font-light hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              Explore Venues
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-9 right-10 z-10 hidden md:flex items-center gap-3 text-[10px] tracking-[2px] uppercase text-white/70 animate-fade-up"
          style={{ animationDelay: "1.4s" }}
        >
          <span>Scroll</span>
          <span className="scroll-bar" />
        </div>
      </section>

      {/* ── STAT BAR ── */}
      <div className="border-y border-line bg-bg-warm">
        <div className="grid grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">
          {stats.map(({ val, label }, i) => (
            <div
              key={i}
              className={`py-11 px-8 text-center ${i < 3 ? "border-r border-line" : ""} ${i >= 2 ? "border-t md:border-t-0 border-line" : ""}`}
            >
              <div className="font-serif text-[clamp(36px,5vw,52px)] font-light text-gold leading-none">{val}</div>
              <div className="text-[11px] tracking-[2px] uppercase text-cream-dim mt-3">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="py-36 max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal className="relative">
            <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden">
              <Image
                src="/images/venues/golaghata/golaghata-decor-04.jpg"
                alt="Floral mandap décor with white pillars at Bika Banquets, Golaghata, Kolkata"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute bottom-[-40px] left-[-40px] w-[52%] aspect-square overflow-hidden border-[8px] border-bg shadow-2xl rounded-sm hidden md:block">
              <Image
                src="/images/venues/baguiati/baguiati-decor-07.jpg"
                alt="Wedding mandap with floral rangoli carpet at Bika Rythm, Baguiati, Kolkata"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div className="absolute top-7 right-[-20px] bg-burgundy text-white px-6 py-5 rounded-sm shadow-xl hidden md:block">
              <div className="font-serif text-4xl font-light leading-none">2016</div>
              <div className="text-[10px] tracking-[1.5px] uppercase opacity-80 mt-1">Est.</div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium">
              <span className="w-7 h-px bg-gold inline-block" />
              About Bika Banquets
            </span>
            <h2 className="font-serif font-light text-[clamp(34px,4vw,56px)] leading-[1.05] tracking-[-0.02em] mt-6 mb-6">
              Kolkata&apos;s Trusted Partner for <em className="italic text-gold">Unforgettable</em> Occasions
            </h2>
            <p className="text-cream-dim text-base leading-[1.9] mb-5">
              Since 2016, <strong className="text-cream font-normal">Bika Banquets</strong> has hosted thousands of weddings, receptions, corporate gatherings and family celebrations across three purpose-built venues in Golaghata, Baguiati and Howrah.
            </p>
            <p className="text-cream-dim text-base leading-[1.9] mb-8">
              What sets us apart is complete in-house control — <strong className="text-cream font-normal">our own kitchen, our own decorators, our own event team</strong> — so every detail stays consistent and accountable, from first enquiry to final farewell.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🍽", title: "In-House Catering", desc: "Multi-cuisine, veg & non-veg" },
                { icon: "💐", title: "Bespoke Décor", desc: "Custom floral & thematic setups" },
                { icon: "🚗", title: "Free Valet Parking", desc: "Covered parking at all venues" },
                { icon: "❄️", title: "Centralised AC", desc: "Fully air-conditioned halls" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 border border-line rounded-sm hover:border-line-strong hover:bg-cream/[0.02] transition-all duration-300">
                  <span className="text-xl mt-0.5">{icon}</span>
                  <div>
                    <div className="text-sm text-cream font-normal">{title}</div>
                    <div className="text-xs text-cream-dim mt-0.5 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VENUES PREVIEW ── */}
      <section className="bg-bg-warm py-36">
        <div className="max-w-6xl mx-auto px-10">
          <Reveal>
            <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium">
              <span className="w-7 h-px bg-gold inline-block" />
              Our Locations
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4 mb-14">
              <h2 className="font-serif font-light text-[clamp(34px,4.5vw,60px)] leading-[1.05] tracking-[-0.02em]">
                Three Venues, One <em className="italic text-gold">Standard</em>
              </h2>
              <Link href="/venues" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gold font-medium hover:gap-4 transition-all duration-300 flex-shrink-0 mb-2">
                View All Venues
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </Reveal>

          <div className="space-y-px">
            {venues.map((v, i) => (
              <Reveal key={v.slug} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <Link href={`/venues/${v.slug}`} className="group grid grid-cols-1 md:grid-cols-2 border border-line hover:border-line-strong transition-colors duration-300 block">
                  <div className="relative overflow-hidden min-h-[280px]">
                    <Image
                      src={v.heroImage.src.replace("w=2000", "w=800")}
                      alt={v.heroImage.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
                    <div className="absolute top-6 left-6 font-serif text-lg text-white bg-ink/50 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center border border-line-strong">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <span className="text-[11px] tracking-[3px] uppercase text-gold mb-3">{v.tagline}</span>
                    <h3 className="font-serif font-light text-[clamp(26px,3vw,38px)] leading-[1.1] mb-3">{v.displayName}</h3>
                    <p className="text-sm text-cream-dim flex items-center gap-2 mb-5">
                      <svg className="w-3 h-3 text-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {v.address}
                    </p>
                    <p className="text-sm text-cream-dim leading-relaxed mb-6">{v.description}</p>
                    <div className="flex gap-8 pt-5 border-t border-line">
                      {v.capacity.map((c) => (
                        <div key={c.label}>
                          <div className="font-serif text-2xl text-gold font-light leading-none">{c.floating}</div>
                          <div className="text-[10px] tracking-[1.5px] uppercase text-cream-dim mt-1.5">{c.label} Floating</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-36 max-w-6xl mx-auto px-10">
        <Reveal>
          <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium">
            <span className="w-7 h-px bg-gold inline-block" />
            What We Do
          </span>
          <h2 className="font-serif font-light text-[clamp(34px,4.5vw,60px)] leading-[1.05] tracking-[-0.02em] mt-4 mb-14">
            Every Event, <em className="italic text-gold">Flawlessly</em> Managed
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {services.map(({ num, name, desc, tags }, i) => (
            <Reveal key={num} delay={((i % 3) as 0 | 1 | 2)} className="bg-bg p-12 hover:bg-bg-warm transition-colors duration-300 group relative">
              <div className="font-serif text-5xl text-line font-light leading-none mb-6 group-hover:text-burgundy/20 transition-colors duration-300">{num}</div>
              <h3 className="font-serif text-2xl font-normal mb-3">{name}</h3>
              <p className="text-sm text-cream-dim leading-[1.8] mb-5">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t} className="text-[10px] tracking-[1.5px] uppercase text-burgundy-bright bg-burgundy/10 px-3 py-1 rounded-sm">{t}</span>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-burgundy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
      <section className="py-36 bg-bg-warm">
        <div className="max-w-6xl mx-auto px-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium">
                  <span className="w-7 h-px bg-gold inline-block" />
                  Gallery
                </span>
                <h2 className="font-serif font-light text-[clamp(34px,4.5vw,60px)] leading-[1.05] tracking-[-0.02em] mt-4">
                  Moments We&apos;ve Made <em className="italic text-gold">Unforgettable</em>
                </h2>
              </div>
              <Link href="/gallery" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gold font-medium hover:gap-4 transition-all duration-300 flex-shrink-0 mb-2">
                View Full Gallery
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-12 auto-rows-[180px] gap-3">
              {galleryImages.map(({ src, alt, caption, cls }, i) => (
                <div key={i} className={`${cls} relative overflow-hidden rounded-sm group cursor-pointer`}>
                  <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {caption && (
                    <span className="absolute bottom-4 left-4 text-xs tracking-wider text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">{caption}</span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CATERING BANNER ── */}
      <section className="relative py-0">
        <div className="relative min-h-[520px] flex items-center overflow-hidden">
          <Image
            src="/images/venues/divinity/divinity-food-02.jpg"
            alt="In-house catering and live food station at Bika Banquets, Kolkata"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/25 md:to-transparent" />
          <div className="relative z-10 max-w-6xl mx-auto px-10 py-24">
            <Reveal className="max-w-lg">
              <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium">
                <span className="w-7 h-px bg-gold inline-block" />
                In-House Kitchen
              </span>
              <h2 className="font-serif font-light text-[clamp(34px,4vw,56px)] leading-[1.05] tracking-[-0.02em] mt-4 mb-5 text-white">
                Cuisine That <em className="italic text-gold-bright">Lingers</em> in Memory
              </h2>
              <p className="text-white/80 text-base leading-[1.85] mb-8">
                From authentic Bengali fish preparations and rich Mughlai biryanis to continental live counters and pure-veg Jain thalis — our chefs prepare every dish fresh on the day. No outsourced catering, no compromise.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-white px-8 py-4 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-all duration-300 hover:-translate-y-0.5">
                Request a Menu &amp; Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-36 max-w-6xl mx-auto px-10">
        <Reveal>
          <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium">
            <span className="w-7 h-px bg-gold inline-block" />
            Simple Process
          </span>
          <h2 className="font-serif font-light text-[clamp(34px,4.5vw,60px)] leading-[1.05] tracking-[-0.02em] mt-4 mb-16">
            How Booking <em className="italic text-gold">Works</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-line">
          {[
            {
              step: "01",
              title: "Send an Enquiry",
              desc: "Fill out our contact form or WhatsApp us with your event type, date and approximate guest count.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              ),
            },
            {
              step: "02",
              title: "Tour the Venue",
              desc: "Visit us at your preferred location — we walk you through the hall, catering options and décor packages.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              ),
            },
            {
              step: "03",
              title: "Confirm Your Date",
              desc: "Lock in your date with a 50% advance. We finalise menus, layout and décor details in a follow-up call.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ),
            },
            {
              step: "04",
              title: "Celebrate, We Handle Everything",
              desc: "On the day, our team manages setup, service and breakdown — you and your guests simply celebrate.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
              ),
            },
          ].map(({ step, title, desc, icon }, i) => (
            <Reveal key={step} delay={(i % 4) as 0 | 1 | 2 | 3} className={`relative p-12 group hover:bg-bg-warm transition-colors duration-300 ${i < 3 ? "border-r border-line" : ""}`}>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="w-12 h-12 rounded-full border border-line group-hover:border-gold/60 flex items-center justify-center text-gold mb-8 transition-colors duration-300">
                {icon}
              </div>
              <div className="font-serif text-[64px] text-line/60 font-light leading-none absolute top-6 right-8 select-none group-hover:text-burgundy/10 transition-colors duration-300">{step}</div>
              <h3 className="font-serif text-xl font-normal mb-3 leading-snug">{title}</h3>
              <p className="text-sm text-cream-dim leading-[1.8]">{desc}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 text-center">
            <Link href="/contact" className="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-gold font-medium hover:gap-5 transition-all duration-300">
              Start your enquiry today
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-28 max-w-6xl mx-auto px-10 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium justify-center">
            <span className="w-7 h-px bg-gold inline-block" />
            Ready to Begin?
          </span>
          <h2 className="font-serif font-light text-[clamp(34px,5vw,72px)] leading-[1.05] tracking-[-0.02em] mt-4 mb-6">
            Let&apos;s Plan Your <em className="italic text-gold">Perfect Day</em>
          </h2>
          <p className="text-cream-dim text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Get in touch for a site visit, a detailed quotation or just to check date availability. We respond within a few hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-gold text-white px-10 py-4 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(201,162,75,0.3)]">
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
