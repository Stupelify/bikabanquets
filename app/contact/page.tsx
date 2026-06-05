import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { venues } from "@/lib/venues";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact & Enquiries — Book a Venue Visit at Bika Banquets Kolkata",
  description:
    "Enquire about booking a banquet hall at Bika Banquets. Contact us for pricing, date availability or a site visit at Golaghata, Baguiati or Howrah. Call +91 89613 33313.",
};

const faqs = [
  { q: "What is the minimum guest count?", a: "No strict minimum, but our model is per-plate so events from 150 guests upward are ideal. We accommodate up to 700+ floating guests." },
  { q: "Are outside caterers allowed?", a: "Our in-house kitchen maintains quality. Outside catering is generally not permitted; outside decorators may be considered case-by-case." },
  { q: "How much advance is required?", a: "50% of the estimated total confirms your date. Balance is due 3 days before the event. Dates are held only against payment." },
  { q: "What time slots are available?", a: "Morning: 9 AM – 3 PM. Evening: 6 PM – 12 AM. Both available all days including weekends and public holidays." },
  { q: "Is Havan permitted?", a: "Yes — at our Golaghata venue. Let us know in advance so we arrange proper ventilation and fire-safety protocols." },
  { q: "Can we visit before booking?", a: "Absolutely. Call +91 89613 33313 or WhatsApp +91 62303 25532 to schedule a visit between 11 AM and 6 PM any day." },
  { q: "What about date rescheduling?", a: "Date changes are adjustable subject to availability. Contact us at least 30 days before your original event date." },
  { q: "Is alcohol permitted?", a: "In-house alcohol service is not available. External arrangements may be permissible depending on the venue — ask us at booking." },
];

export default function ContactPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Header */}
      <section className="pt-48 pb-16 max-w-6xl mx-auto px-10">
        <Reveal>
          <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium">
            <span className="w-7 h-px bg-gold inline-block" />
            Get In Touch
          </span>
          <h1 className="font-serif font-light text-[clamp(42px,6vw,80px)] leading-[1.02] tracking-[-0.02em] mt-5 mb-6">
            Let&apos;s Plan Your <em className="italic text-gold">Perfect Event</em>
          </h1>
          <p className="text-cream-dim text-lg max-w-xl leading-relaxed">
            Reach out for a site visit, a detailed quotation or to check date availability. Our team typically responds within a few hours.
          </p>
        </Reveal>
      </section>

      {/* Contact grid */}
      <section className="pb-28 max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left: contact info */}
          <div className="lg:col-span-2 space-y-8">
            <Reveal>
              {[
                {
                  icon: (
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.1 6.1l1.27-1.52a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  ),
                  label: "Phone",
                  value: "+91 89613 33313",
                  href: "tel:+918961333313",
                  note: "Call us · 11 AM – 8 PM, all days",
                  external: false,
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-gold fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  ),
                  label: "WhatsApp",
                  value: "+91 62303 25532",
                  href: "https://wa.me/916230325532",
                  note: "Chat with us — usually the quickest reply",
                  external: true,
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  ),
                  label: "Email",
                  value: "contact@bikabanquets.com",
                  href: "mailto:contact@bikabanquets.com",
                  note: "Response within 24 hours",
                  external: false,
                },
              ].map(({ icon, label, value, href, note, external }) => (
                <div key={label} className="flex gap-5 items-start">
                  <div className="w-12 h-12 border border-line-strong rounded-full flex items-center justify-center flex-shrink-0">{icon}</div>
                  <div>
                    <div className="text-[10px] tracking-[2px] uppercase text-cream-dim mb-1">{label}</div>
                    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-lg text-cream hover:text-gold transition-colors">{value}</a>
                    <div className="text-xs text-cream-dim mt-1">{note}</div>
                  </div>
                </div>
              ))}
            </Reveal>

            {/* Venues list */}
            <Reveal delay={1}>
              <h3 className="font-serif font-light text-xl mb-5 pt-4 border-t border-line">Our Venues</h3>
              <div className="space-y-5">
                {venues.map((v) => (
                  <div key={v.slug}>
                    <div className="text-sm text-cream font-normal mb-0.5">{v.displayName}</div>
                    <div className="text-xs text-cream-dim">{v.address}</div>
                    <a href={v.mapUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-gold hover:text-gold-bright transition-colors mt-1 inline-block">Get Directions →</a>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Pricing snapshot */}
            <Reveal delay={2}>
              <div id="pricing" className="scroll-mt-28 border border-line rounded-sm p-6 bg-bg-warm">
                <h3 className="font-serif font-light text-xl mb-5">Indicative Pricing</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-line">
                    <span className="text-cream-dim">Vegetarian menu</span>
                    <span className="font-serif text-gold">from ₹700<span className="text-xs text-cream-dim">/plate</span></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-line">
                    <span className="text-cream-dim">Non-vegetarian menu</span>
                    <span className="font-serif text-gold">from ₹1,300<span className="text-xs text-cream-dim">/plate</span></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-line">
                    <span className="text-cream-dim">Booking advance</span>
                    <span className="font-serif text-gold">50%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-cream-dim">Event slots</span>
                    <span className="text-cream text-xs">9AM–3PM / 6PM–12AM</span>
                  </div>
                </div>
                <p className="text-[11px] text-cream-dim mt-4 italic">Prices exclude GST. Hall hire is bundled into the per-plate rate — no hidden venue fee.</p>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <Reveal>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-bg-warm border-t border-line py-28">
        <div className="max-w-4xl mx-auto px-10">
          <Reveal>
            <span className="inline-flex items-center gap-4 text-[11px] tracking-[4px] uppercase text-gold font-medium">
              <span className="w-7 h-px bg-gold inline-block" />
              Common Questions
            </span>
            <h2 className="font-serif font-light text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] mt-4 mb-14">
              Frequently Asked <em className="italic text-gold">Questions</em>
            </h2>
          </Reveal>

          <div className="divide-y divide-line">
            {faqs.map(({ q, a }) => (
              <Reveal key={q} className="py-7">
                <h3 className="font-serif text-xl font-normal text-cream mb-3">{q}</h3>
                <p className="text-sm text-cream-dim leading-relaxed">{a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
