import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { venues } from "@/lib/venues";

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
  { q: "Can we visit before booking?", a: "Absolutely. Call or WhatsApp +91 89613 33313 to schedule a visit between 11 AM and 6 PM any day." },
  { q: "What about date rescheduling?", a: "Date changes are adjustable subject to availability. Contact us at least 30 days before your original event date." },
  { q: "Is alcohol permitted?", a: "In-house alcohol service is not available. External arrangements may be permissible depending on the venue — ask us at booking." },
];

export default function ContactPage() {
  return (
    <>
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
                  label: "Phone & WhatsApp",
                  value: "+91 89613 33313",
                  href: "tel:+918961333313",
                  note: "Available 11 AM – 8 PM, all days",
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  ),
                  label: "Email",
                  value: "contact@bikabanquets.com",
                  href: "mailto:contact@bikabanquets.com",
                  note: "Response within 24 hours",
                },
              ].map(({ icon, label, value, href, note }) => (
                <div key={label} className="flex gap-5 items-start">
                  <div className="w-12 h-12 border border-line-strong rounded-full flex items-center justify-center flex-shrink-0">{icon}</div>
                  <div>
                    <div className="text-[10px] tracking-[2px] uppercase text-cream-dim mb-1">{label}</div>
                    <a href={href} className="text-lg text-cream hover:text-gold transition-colors">{value}</a>
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
              <div className="border border-line rounded-sm p-6 bg-bg-warm">
                <h3 className="font-serif font-light text-xl mb-5">Indicative Pricing</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-line">
                    <span className="text-cream-dim">Vegetarian menu</span>
                    <span className="font-serif text-gold-bright">from ₹700<span className="text-xs text-cream-dim">/plate</span></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-line">
                    <span className="text-cream-dim">Non-vegetarian menu</span>
                    <span className="font-serif text-gold-bright">from ₹1,300<span className="text-xs text-cream-dim">/plate</span></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-line">
                    <span className="text-cream-dim">Booking advance</span>
                    <span className="font-serif text-gold-bright">50%</span>
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
              <div className="border border-line bg-bg-warm rounded-sm p-10">
                <h2 className="font-serif font-light text-3xl mb-8">Send an Enquiry</h2>
                <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-[10px] tracking-[2px] uppercase text-cream-dim mb-2">Full Name *</label>
                      <input id="name" name="name" type="text" required placeholder="Your full name" autoComplete="name"
                        className="w-full bg-bg border border-line px-4 py-3.5 text-cream text-sm rounded-sm outline-none focus:border-gold transition-colors placeholder:text-cream-dim/40" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-[10px] tracking-[2px] uppercase text-cream-dim mb-2">Phone Number *</label>
                      <input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" autoComplete="tel"
                        className="w-full bg-bg border border-line px-4 py-3.5 text-cream text-sm rounded-sm outline-none focus:border-gold transition-colors placeholder:text-cream-dim/40" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="event_type" className="block text-[10px] tracking-[2px] uppercase text-cream-dim mb-2">Event Type *</label>
                    <select id="event_type" name="event_type" required
                      className="w-full bg-bg border border-line px-4 py-3.5 text-cream text-sm rounded-sm outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                      <option value="" disabled>Select event type</option>
                      <option>Wedding</option>
                      <option>Reception</option>
                      <option>Engagement / Ring Ceremony</option>
                      <option>Sangeet / Mehndi</option>
                      <option>Birthday / Anniversary</option>
                      <option>Corporate Event</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="event_date" className="block text-[10px] tracking-[2px] uppercase text-cream-dim mb-2">Event Date</label>
                      <input id="event_date" name="event_date" type="date"
                        className="w-full bg-bg border border-line px-4 py-3.5 text-cream text-sm rounded-sm outline-none focus:border-gold transition-colors [color-scheme:dark]" />
                    </div>
                    <div>
                      <label htmlFor="guests" className="block text-[10px] tracking-[2px] uppercase text-cream-dim mb-2">Expected Guests</label>
                      <select id="guests" name="guests"
                        className="w-full bg-bg border border-line px-4 py-3.5 text-cream text-sm rounded-sm outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                        <option value="" disabled>Select guest count</option>
                        <option>150–200</option>
                        <option>200–350</option>
                        <option>350–500</option>
                        <option>500–700</option>
                        <option>700+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="venue" className="block text-[10px] tracking-[2px] uppercase text-cream-dim mb-2">Preferred Venue</label>
                    <select id="venue" name="venue"
                      className="w-full bg-bg border border-line px-4 py-3.5 text-cream text-sm rounded-sm outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                      <option value="" disabled>Select venue preference</option>
                      {venues.map((v) => (
                        <option key={v.slug} value={v.slug}>{v.displayName}</option>
                      ))}
                      <option value="any">No preference</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[10px] tracking-[2px] uppercase text-cream-dim mb-2">Additional Details</label>
                    <textarea id="message" name="message" rows={4} placeholder="Special requirements, theme preferences, dietary needs..."
                      className="w-full bg-bg border border-line px-4 py-3.5 text-cream text-sm rounded-sm outline-none focus:border-gold transition-colors placeholder:text-cream-dim/40 resize-none" />
                  </div>

                  <button type="submit"
                    className="w-full bg-gold text-bg py-4 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-all duration-300 hover:-translate-y-0.5">
                    Send Enquiry →
                  </button>

                  <p className="text-[11px] text-cream-dim text-center">
                    Or reach us directly:{" "}
                    <a href="tel:+918961333313" className="text-gold hover:text-gold-bright transition-colors">+91 89613 33313</a>
                    {" "}· 11 AM – 8 PM, all days
                  </p>
                </form>
              </div>
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
