import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-bg-warm border-t border-line pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=300/MBlLcEqY2yw3y2EF/1-2-removebg-scaled-e1752152009924-7iV2qZXAcVUCou9o.png"
              alt="Bika Banquets"
              width={150}
              height={44}
              className="h-10 w-auto object-contain"
            />
            <p className="text-sm text-cream-dim leading-relaxed mt-4 max-w-xs">
              Premier event venues and catering since 2016.
              Creating unforgettable celebrations across Kolkata, Howrah and Siliguri.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://wa.me/916230325532"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 border border-line rounded-full flex items-center justify-center hover:border-gold hover:bg-gold group transition-all duration-300"
              >
                <svg className="w-4 h-4 text-cream-dim group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="tel:+918961333313"
                aria-label="Call"
                className="w-9 h-9 border border-line rounded-full flex items-center justify-center hover:border-gold hover:bg-gold group transition-all duration-300"
              >
                <svg className="w-4 h-4 text-cream-dim group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.1 6.1l1.27-1.52a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Venues */}
          <div>
            <h4 className="text-[10px] tracking-[3px] uppercase text-cream-dim mb-5 font-medium">Venues</h4>
            <ul className="space-y-3 list-none">
              {[
                { href: "/venues/golaghata", label: "Golaghata" },
                { href: "/venues/baguiati", label: "Baguiati · Bika Rythm" },
                { href: "/venues/howrah", label: "Howrah · Bika Rangoli" },
                { href: "/venues/divinity", label: "Lake Town · Divinity Pavilion" },
                { href: "/venues/siliguri", label: "Siliguri · Four Vedas" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-cream-dim hover:text-gold transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="text-[10px] tracking-[3px] uppercase text-cream-dim mb-5 font-medium">Events</h4>
            <ul className="space-y-3 list-none">
              {["Weddings", "Engagements", "Sangeet & Mehndi", "Corporate Events", "Birthdays"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-cream-dim">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-[3px] uppercase text-cream-dim mb-5 font-medium">Quick Info</h4>
            <ul className="space-y-3 list-none">
              <li><a href="tel:+918961333313" className="text-sm text-cream-dim hover:text-gold transition-colors">+91 89613 33313</a></li>
              <li><a href="mailto:contact@bikabanquets.com" className="text-sm text-cream-dim hover:text-gold transition-colors">contact@bikabanquets.com</a></li>
              <li><Link href="/contact" className="text-sm text-cream-dim hover:text-gold transition-colors">Book a Site Visit</Link></li>
              <li><Link href="/contact#faq" className="text-sm text-cream-dim hover:text-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream-dim/50">© {new Date().getFullYear()} Bika Banquets. All rights reserved.</p>
          <p className="text-xs text-cream-dim/50">Golaghata · Baguiati · Howrah · Siliguri — West Bengal</p>
        </div>
      </div>
    </footer>
  );
}
