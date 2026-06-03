"use client";

import { useEffect, useRef, useState } from "react";
import { venues } from "@/lib/venues";

// WhatsApp-only number (calls go to the separate phone line shown alongside).
const WHATSAPP_NUMBER = "916230325532";

type Status = "idle" | "submitting" | "success" | "error";

const fieldCls =
  "w-full bg-bg border border-line px-4 py-3.5 text-cream text-sm rounded-sm outline-none focus:border-gold transition-colors";

export default function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Preselect the venue when arriving from /contact?venue=slug. Read client-side
  // so the contact page stays statically rendered (no useSearchParams dependency).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("venue");
    if (!slug) return;
    const sel = formRef.current?.elements.namedItem("venue") as HTMLSelectElement | null;
    if (sel && venues.some((v) => v.slug === slug)) sel.value = slug;
  }, []);

  function values(): Record<string, string> {
    const out: Record<string, string> = {};
    if (!formRef.current) return out;
    new FormData(formRef.current).forEach((v, k) => {
      out[k] = String(v);
    });
    return out;
  }

  function whatsappURL(d: Record<string, string>): string {
    const venueName = venues.find((v) => v.slug === d.venue)?.displayName ?? d.venue;
    const msg = [
      "Hi Bika Banquets, I'd like to enquire about an event.",
      d.name && `• Name: ${d.name}`,
      d.phone && `• Phone: ${d.phone}`,
      d.event_type && `• Event: ${d.event_type}`,
      d.event_date && `• Date: ${d.event_date}`,
      d.guests && `• Guests: ${d.guests}`,
      d.venue && d.venue !== "any" && `• Venue: ${venueName}`,
      d.message && `• Details: ${d.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  function sendWhatsApp() {
    window.open(whatsappURL(values()), "_blank", "noopener,noreferrer");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = values();
    if (d.company) {
      // Honeypot filled in → bot. Pretend success and silently drop.
      setStatus("success");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(j?.error || "We couldn't send your enquiry.");
      }
      formRef.current?.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold/30 bg-bg-warm rounded-sm p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h2 className="font-serif font-light text-3xl mb-3">Enquiry Sent</h2>
        <p className="text-cream-dim text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Thank you — we&apos;ve received your enquiry and will get back to you within a few hours. For anything urgent, reach us directly:
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#25D366]/40 text-[#25D366] px-6 py-3 rounded-full text-xs tracking-widest uppercase font-medium hover:bg-[#25D366]/10 transition-all duration-300">
            WhatsApp Us
          </a>
          <a href="tel:+918961333313" className="inline-flex items-center gap-2 border border-line-strong text-cream px-6 py-3 rounded-full text-xs tracking-widest uppercase font-light hover:border-gold hover:text-gold transition-all duration-300">
            Call +91 89613 33313
          </a>
        </div>
        <button type="button" onClick={() => setStatus("idle")} className="mt-7 text-[11px] tracking-[2px] uppercase text-cream-dim hover:text-gold transition-colors">
          Send another enquiry
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <div className="border border-line bg-bg-warm rounded-sm p-10">
      <h2 className="font-serif font-light text-3xl mb-8">Send an Enquiry</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-[10px] tracking-[2px] uppercase text-cream-dim mb-2">Full Name *</label>
            <input id="name" name="name" type="text" required placeholder="Your full name" autoComplete="name"
              className={`${fieldCls} placeholder:text-cream-dim/50`} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-[10px] tracking-[2px] uppercase text-cream-dim mb-2">Phone Number *</label>
            <input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" autoComplete="tel"
              className={`${fieldCls} placeholder:text-cream-dim/50`} />
          </div>
        </div>

        <div>
          <label htmlFor="event_type" className="block text-[10px] tracking-[2px] uppercase text-cream-dim mb-2">Event Type *</label>
          <select id="event_type" name="event_type" required defaultValue=""
            className={`${fieldCls} appearance-none cursor-pointer`}>
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
              className={`${fieldCls} [color-scheme:light]`} />
          </div>
          <div>
            <label htmlFor="guests" className="block text-[10px] tracking-[2px] uppercase text-cream-dim mb-2">Expected Guests</label>
            <select id="guests" name="guests" defaultValue=""
              className={`${fieldCls} appearance-none cursor-pointer`}>
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
          <select id="venue" name="venue" defaultValue=""
            className={`${fieldCls} appearance-none cursor-pointer`}>
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
            className={`${fieldCls} placeholder:text-cream-dim/50 resize-none`} />
        </div>

        {/* Honeypot — hidden from humans; bots that fill it are dropped. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {status === "error" && (
          <p className="text-sm text-burgundy-bright leading-relaxed">
            {error} Please try WhatsApp below, or call us.
          </p>
        )}

        <button type="submit" disabled={submitting}
          className="w-full bg-gold text-white py-4 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
          {submitting ? "Sending…" : "Send Enquiry →"}
        </button>

        <div className="flex items-center gap-4 text-[10px] tracking-[2px] uppercase text-cream-dim/60">
          <span className="h-px flex-1 bg-line" />
          or
          <span className="h-px flex-1 bg-line" />
        </div>

        <button type="button" onClick={sendWhatsApp}
          className="flex items-center justify-center gap-2 w-full border border-[#25D366]/50 text-[#25D366] py-4 rounded-full text-xs tracking-widest uppercase font-medium hover:bg-[#25D366]/10 transition-all duration-300">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          Send on WhatsApp instead
        </button>

        <p className="text-[11px] text-cream-dim text-center">
          Prefer to call?{" "}
          <a href="tel:+918961333313" className="text-gold hover:text-gold-bright transition-colors">+91 89613 33313</a>
          {" "}· 11 AM – 8 PM, all days
        </p>
      </form>
    </div>
  );
}
