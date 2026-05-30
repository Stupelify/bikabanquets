import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bika Banquets | Luxury Wedding & Event Venues in Kolkata",
    template: "%s | Bika Banquets",
  },
  description:
    "Bika Banquets — premier wedding and event venues across Kolkata. In-house catering, bespoke décor and valet parking for 150–700 guests at Golaghata, Baguiati & Howrah.",
  metadataBase: new URL("https://bikabanquets.com"),
  keywords: ["banquet hall Kolkata","wedding venue Kolkata","banquet hall Baguiati","banquet hall Golaghata","banquet hall Howrah","marriage hall Kolkata","Bika Banquets","Bika Rythm"],
  openGraph: { siteName: "Bika Banquets", locale: "en_IN", type: "website" },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Bika Banquets",
  url: "https://bikabanquets.com",
  telephone: "+918961333313",
  email: "contact@bikabanquets.com",
  openingHours: "Mo-Su 11:00-20:00",
  priceRange: "₹₹",
  servesCuisine: ["Indian","Bengali","Mughlai","Multi-Cuisine"],
  address: { "@type": "PostalAddress", streetAddress: "76/1 Golaghata Road, Dakshindari", addressLocality: "Kolkata", addressRegion: "West Bengal", postalCode: "700048", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 22.5965, longitude: 88.4037 },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "200" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body className="antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsApp />
      </body>
    </html>
  );
}
