// lib/venues.ts
// Single source of truth for all venue data.
// Import this in any page/component — change here, updates everywhere.

export interface Venue {
  slug: string;
  brand: string; // trade name e.g. "Bika Rythm"
  displayName: string;
  tagline: string;
  city: string; // locality for SEO schema, e.g. "Kolkata" / "Siliguri"
  address: string;
  addressShort: string;
  mapUrl: string;
  phone: string;
  capacity: { seated: number; floating: number; label?: string }[];
  amenities: string[];
  description: string;
  longDescription: string;
  heroImage: { src: string; alt: string };
  galleryImages: { src: string; alt: string; caption?: string }[];
  faqs: { q: string; a: string }[];
  schema: {
    latitude: number;
    longitude: number;
    postalCode: string;
    streetAddress: string;
  };
}

const CDN = "https://assets.zyrosite.com/cdn-cgi/image/format=auto";

export const venues: Venue[] = [
  {
    slug: "golaghata",
    brand: "Bika Banquets",
    displayName: "Bika Banquets — Golaghata",
    tagline: "Flagship Venue",
    city: "Kolkata",
    address: "76 Golaghata Road, Dakshindari, South Dumdum, Kolkata 700048",
    addressShort: "Golaghata, Kolkata",
    mapUrl: "https://maps.google.com/?q=Bika+Banquets+Golaghata+Dakshindari+Kolkata",
    phone: "+918961333313",
    capacity: [
      { seated: 400, floating: 600, label: "Main Hall" },
    ],
    amenities: [
      "Centralised AC",
      "Valet Parking",
      "Changing Rooms",
      "Stage & Projector",
      "Havan Allowed",
      "Power Backup",
      "In-House Catering",
      "In-House Décor",
    ],
    description:
      "Our flagship hall — centrally air-conditioned with stage, projector, dedicated changing rooms and Havan-friendly setup. Ideal for grand weddings and receptions.",
    longDescription:
      "Bika Banquets Golaghata is our original and flagship venue, operating since 2016 in the heart of Dakshindari. The main hall comfortably seats up to 400 guests and handles 600 in a floating arrangement, making it one of the largest banquet spaces in North Kolkata. The fully centralised air-conditioning system, coupled with 100% power backup, ensures a comfortable environment regardless of the season. A dedicated mandap stage, full PA system, projection screen, and LED lighting rig make it equally suited to traditional Bengali wedding ceremonies, reception galas, and corporate functions.",
    heroImage: {
      src: "/images/venues/golaghata/golaghata-hero-19.jpg",
      alt: "Grand decorated banquet hall with chairs and chandeliers at Bika Banquets, Golaghata, Kolkata",
    },
    galleryImages: [
      {
        src: "/images/venues/golaghata/golaghata-hero-16.jpg",
        alt: "Wide banquet hall and wedding stage at Bika Banquets, Golaghata, Kolkata",
        caption: "Stage & Hall",
      },
      {
        src: "/images/venues/golaghata/golaghata-decor-05.jpg",
        alt: "Lounge-style wedding stage with chandelier at Bika Banquets, Golaghata, Kolkata",
        caption: "Lounge Stage",
      },
      {
        src: "/images/venues/golaghata/golaghata-hero-23.jpg",
        alt: "Decorated reception stage at Bika Banquets, Golaghata, Kolkata",
        caption: "Reception Stage",
      },
      {
        src: "/images/venues/golaghata/golaghata-decor-02.jpg",
        alt: "Signature green floral backdrop at Bika Banquets, Golaghata, Kolkata",
        caption: "Signature Floral Backdrop",
      },
      {
        src: "/images/venues/golaghata/golaghata-decor-04.jpg",
        alt: "Floral mandap décor with white pillars at Bika Banquets, Golaghata, Kolkata",
        caption: "Mandap Décor",
      },
      {
        src: "/images/venues/golaghata/golaghata-decor-10.jpg",
        alt: "Floral pillars and centrepiece at Bika Banquets, Golaghata, Kolkata",
        caption: "Floral Pillars",
      },
      {
        src: "/images/venues/golaghata/golaghata-hero-20.jpg",
        alt: "Grand ballroom with gold ceiling and aisle at Bika Banquets, Golaghata, Kolkata",
        caption: "Grand Ballroom",
      },
    ],
    faqs: [
      {
        q: "Is Havan permitted at Golaghata?",
        a: "Yes — Havan is permitted at our Golaghata venue. Inform us in advance so we can arrange proper ventilation and fire-safety setup.",
      },
      {
        q: "Are changing rooms available?",
        a: "Yes, dedicated changing rooms for the bride, groom and family are available at Golaghata.",
      },
      {
        q: "What is the parking capacity?",
        a: "The venue has covered parking for 25+ vehicles with complimentary valet service.",
      },
    ],
    schema: {
      latitude: 22.5965,
      longitude: 88.4037,
      postalCode: "700048",
      streetAddress: "76 Golaghata Road, Dakshindari",
    },
  },
  {
    slug: "baguiati",
    brand: "Bika Rythm",
    displayName: "Bika Rythm — Baguiati",
    tagline: "Indoor Hall + Open Terrace",
    city: "Kolkata",
    address: "2/4 VIP Road, Raghunathpur, Baguiati, Kolkata 700059",
    addressShort: "Baguiati, VIP Road",
    mapUrl: "https://maps.google.com/?q=Bika+Rythm+Baguiati+VIP+Road+Kolkata",
    phone: "+918961333313",
    capacity: [
      { seated: 500, floating: 700, label: "Indoor Hall" },
      { seated: 400, floating: 600, label: "Open Terrace" },
    ],
    amenities: [
      "Indoor AC Hall",
      "Open Terrace",
      "Valet Parking",
      "Near Airport",
      "Power Backup",
      "In-House Catering",
      "In-House Décor",
      "Stage & Lighting",
    ],
    description:
      "A versatile dual-space venue with a large indoor hall and an open terrace — perfect for sangeet nights and receptions under the open sky. Minutes from the airport.",
    longDescription:
      "Bika Rythm at Baguiati is our most versatile venue, offering two distinct event spaces under one roof. The main indoor air-conditioned hall accommodates up to 700 guests in a floating arrangement and is ideal for wedding receptions, corporate dinners and birthday celebrations. The adjoining open terrace adds another dimension — perfect for Sangeet nights, Mehndi ceremonies and sundowner events. Located on VIP Road, Raghunathpur, the venue is easily accessible from the Dum Dum Metro, Netaji Subhas Chandra Bose International Airport and all of North Kolkata.",
    heroImage: {
      src: "/images/venues/baguiati/baguiati-hero-14.jpg",
      alt: "Symmetric floral wedding mandap with orange carpet at Bika Rythm, Baguiati, Kolkata",
    },
    galleryImages: [
      {
        src: "/images/venues/baguiati/baguiati-hero-15.jpg",
        alt: "Golden wedding mandap with floral carpet at Bika Rythm, Baguiati, Kolkata",
        caption: "Wedding Mandap",
      },
      {
        src: "/images/venues/baguiati/baguiati-decor-02.jpg",
        alt: "Rose floral arch with hanging lights at Bika Rythm, Baguiati, Kolkata",
        caption: "Floral Arch",
      },
      {
        src: "/images/venues/baguiati/baguiati-hero-13.jpg",
        alt: "Gold and maroon reception stage at Bika Rythm, Baguiati, Kolkata",
        caption: "Reception Stage",
      },
      {
        src: "/images/venues/baguiati/baguiati-decor-07.jpg",
        alt: "Mandap stage with floral rangoli carpet at Bika Rythm, Baguiati, Kolkata",
        caption: "Mandap & Rangoli",
      },
      {
        src: "/images/venues/baguiati/baguiati-hero-18.jpg",
        alt: "Pink lounge seating with drapes at Bika Rythm, Baguiati, Kolkata",
        caption: "Lounge Seating",
      },
      {
        src: "/images/venues/baguiati/baguiati-hero-21.jpg",
        alt: "Ornate golden wedding mandap at Bika Rythm, Baguiati, Kolkata",
        caption: "Ornate Mandap",
      },
      {
        src: "/images/venues/baguiati/baguiati-decor-08.jpg",
        alt: "Hanging floral strands over the stage at Bika Rythm, Baguiati, Kolkata",
        caption: "Hanging Florals",
      },
    ],
    faqs: [
      {
        q: "Can I use both the indoor hall and the terrace for one event?",
        a: "Yes — we can configure the hall and terrace as one combined space or as separate areas for different parts of the event (e.g., dinner inside, Sangeet on the terrace).",
      },
      {
        q: "How far is Baguiati from the airport?",
        a: "Bika Rythm on VIP Road is approximately 10–15 minutes from NSCBI Airport, making it very convenient for guests travelling from outside Kolkata.",
      },
    ],
    schema: {
      latitude: 22.6262,
      longitude: 88.4311,
      postalCode: "700059",
      streetAddress: "2/4 VIP Road, Raghunathpur",
    },
  },
  {
    slug: "howrah",
    brand: "Bika Rangoli",
    displayName: "Bika Rangoli — Howrah",
    tagline: "Elegant Venue in Belur",
    city: "Howrah",
    address: "Forum Rangoli, 212 Girish Ghosh Road, Belur, Howrah 711202",
    addressShort: "Belur, Howrah",
    mapUrl: "https://maps.google.com/?q=Forum+Rangoli+212+Girish+Ghosh+Road+Belur+Howrah+711202",
    phone: "+918961333313",
    capacity: [
      { seated: 150, floating: 250, label: "Main Hall" },
    ],
    amenities: [
      "AC Hall",
      "Valet Parking",
      "Power Backup",
      "In-House Catering",
      "In-House Décor",
    ],
    description:
      "Our Howrah venue brings the Bika standard across the river — an intimate, elegant setting for weddings, receptions and corporate events on the west bank.",
    longDescription:
      "Bika Rangoli in Howrah extends our footprint to the west bank of the Hooghly, offering the same quality of catering, décor and event management that Bika Banquets is known for in North Kolkata. An intimate venue ideal for close-knit family celebrations, ring ceremonies, anniversaries and smaller corporate gatherings.",
    heroImage: {
      src: "/images/venues/howrah/howrah-hero-06.jpg",
      alt: "Wedding stage with ring backdrop and rows of chairs at Bika Rangoli, Belur, Howrah",
    },
    galleryImages: [
      {
        src: "/images/venues/howrah/howrah-hero-07.jpg",
        alt: "Golden double-arch wedding stage at Bika Rangoli, Belur, Howrah",
        caption: "Golden Stage",
      },
      {
        src: "/images/venues/howrah/howrah-hero-12.jpg",
        alt: "Decorated stage and banquet hall with chairs at Bika Rangoli, Belur, Howrah",
        caption: "Stage & Hall",
      },
      {
        src: "/images/venues/howrah/howrah-hero-22.jpg",
        alt: "Banquet hall set with round dining tables at Bika Rangoli, Belur, Howrah",
        caption: "Banquet Dining",
      },
      {
        src: "/images/venues/howrah/howrah-hero-05.jpg",
        alt: "Air-conditioned banquet hall with chandeliers at Bika Rangoli, Belur, Howrah",
        caption: "Banquet Hall",
      },
      {
        src: "/images/venues/howrah/howrah-hero-18.jpg",
        alt: "Banquet hall with columns, chairs and stage at Bika Rangoli, Belur, Howrah",
        caption: "Hall & Stage",
      },
      {
        src: "/images/venues/howrah/howrah-decor-02.jpg",
        alt: "Golden mandap décor with drapes at Bika Rangoli, Belur, Howrah",
        caption: "Mandap Décor",
      },
      {
        src: "/images/venues/howrah/howrah-hero-13.jpg",
        alt: "Ring-backdrop wedding stage with seating at Bika Rangoli, Belur, Howrah",
        caption: "Ring Stage",
      },
    ],
    faqs: [
      {
        q: "Where exactly is the Howrah venue and how do I reach it?",
        a: "Bika Rangoli (Forum Rangoli) is at 212 Girish Ghosh Road, Belur, Howrah 711202 — close to Belur Math and Bally, on the west bank of the Hooghly. It is easily reached via the Vivekananda Setu (Bally Bridge), Nivedita Setu and Belur railway station.",
      },
    ],
    schema: {
      latitude: 22.6293,
      longitude: 88.3547,
      postalCode: "711202",
      streetAddress: "212 Girish Ghosh Road, Belur",
    },
  },
  {
    slug: "divinity",
    brand: "Divinity Pavilion",
    displayName: "Divinity Pavilion — Lake Town",
    tagline: "Premium Banquet near Sreebhumi",
    city: "Kolkata",
    address: "241 Golaghata Road, Sreebhumi, Lake Town, South Dumdum, Kolkata 700048",
    addressShort: "Lake Town, Kolkata",
    mapUrl: "https://maps.google.com/?q=Divinity+Pavilion+241+Golaghata+Road+Sreebhumi+Lake+Town+Kolkata",
    phone: "+918961333313",
    // TODO: confirm exact capacity & amenities with client (values below are estimates)
    capacity: [
      { seated: 350, floating: 550, label: "Banquet Hall" },
    ],
    amenities: [
      "Centralised AC",
      "Valet Parking",
      "Stage & Lighting",
      "Bridal Room",
      "Power Backup",
      "In-House Catering",
      "In-House Décor",
    ],
    description:
      "A premium banquet pavilion at Sreebhumi, Lake Town — elegant, centrally air-conditioned interiors with bespoke stage and floral décor for weddings, receptions and corporate events.",
    longDescription:
      "Divinity Pavilion brings the Bika standard to Lake Town, moments from the landmark Sreebhumi on Golaghata Road. The centrally air-conditioned hall is designed for grand weddings and receptions, with a versatile stage that our in-house décor team transforms for everything from traditional Bengali ceremonies to contemporary sangeet nights. With in-house catering, full power backup and easy access from VIP Road, the Lake Town Metro corridor and North Kolkata, Divinity Pavilion is a refined choice for celebrations of every scale.",
    heroImage: {
      src: "/images/venues/divinity/divinity-hero-13.jpg",
      alt: "Banquet hall with pink-draped chairs and a gold stage at Divinity Pavilion, Lake Town, Kolkata",
    },
    galleryImages: [
      {
        src: "/images/venues/divinity/divinity-hero-10.jpg",
        alt: "Candle-lit golden wedding mandap at Divinity Pavilion, Lake Town, Kolkata",
        caption: "Candle-lit Mandap",
      },
      {
        src: "/images/venues/divinity/divinity-hero-20.jpg",
        alt: "White and green drape stage with hanging florals at Divinity Pavilion, Lake Town, Kolkata",
        caption: "Drape Stage",
      },
      {
        src: "/images/venues/divinity/divinity-hero-05.jpg",
        alt: "Banquet hall set with chairs and green aisle carpet at Divinity Pavilion, Lake Town, Kolkata",
        caption: "Banquet Hall",
      },
      {
        src: "/images/venues/divinity/divinity-hero-14.jpg",
        alt: "Ornate golden arch wedding mandap at Divinity Pavilion, Lake Town, Kolkata",
        caption: "Golden Arch",
      },
      {
        src: "/images/venues/divinity/divinity-hero-06.jpg",
        alt: "Reception stage with red carpet and floral border at Divinity Pavilion, Lake Town, Kolkata",
        caption: "Reception Stage",
      },
      {
        src: "/images/venues/divinity/divinity-food-02.jpg",
        alt: "In-house catering and live food station at Divinity Pavilion, Lake Town, Kolkata",
        caption: "Catering Station",
      },
      {
        src: "/images/venues/divinity/divinity-hero-23.jpg",
        alt: "Golden double-arch garden stage lit at night at Divinity Pavilion, Lake Town, Kolkata",
        caption: "Garden Stage",
      },
    ],
    faqs: [
      {
        q: "Where is Divinity Pavilion located?",
        a: "Divinity Pavilion is at 241 Golaghata Road, Sreebhumi, Lake Town, Kolkata 700048 — close to the Sreebhumi landmark and easily reached from VIP Road, Ultadanga and the EM Bypass.",
      },
      {
        q: "Is Divinity Pavilion air-conditioned?",
        a: "Yes — the hall is centrally air-conditioned, with full power backup and in-house catering and décor teams.",
      },
    ],
    schema: {
      latitude: 22.6010,
      longitude: 88.4050,
      postalCode: "700048",
      streetAddress: "241 Golaghata Road, Sreebhumi, Lake Town",
    },
  },
  {
    slug: "siliguri",
    brand: "Four Vedas",
    displayName: "Bika Banquets — Four Vedas, Siliguri",
    tagline: "Banquets, Lawn & Resort in North Bengal",
    city: "Siliguri",
    address: "Deep Nagar, Panchkel Guri, Khaprail (Mirik) Road, Matigara, Siliguri 734010",
    addressShort: "Matigara, Siliguri",
    mapUrl: "https://maps.google.com/?q=The+Four+Vedas+Hotel+Resort+Matigara+Siliguri",
    phone: "+918961333313",
    capacity: [
      { seated: 350, floating: 550, label: "Atharvan Hall" },
      { seated: 1200, floating: 1800, label: "Kaiser Bagh Lawn" },
    ],
    amenities: [
      "Grand AC Banquet Halls",
      "1800-Capacity Open Lawn",
      "Multiple Event Spaces",
      "On-Site Resort Rooms",
      "In-House Catering",
      "In-House Décor",
      "Valet Parking",
      "Near Bagdogra Airport",
    ],
    description:
      "Our North Bengal flagship — a resort-style venue in Matigara, Siliguri with the grand Atharvan hall, a sweeping 1,800-guest lawn and on-site accommodation. Made for destination weddings.",
    longDescription:
      "Bika Banquets at The Four Vedas brings our standard of celebration to North Bengal. Set in Matigara on the Khaprail (Mirik) Road, just minutes from Bagdogra Airport, this resort-style venue is purpose-built for large-scale and destination weddings. The flagship 'Atharvan' banquet hall seats up to 550 guests beside a lush green lawn, while the expansive 'Kaiser Bagh Lawn' can host gatherings of up to 1,800 for open-air receptions and sangeet nights. Two further spaces — the 'Tarang' hall (120 guests) overlooking the pool and the 'Presidency Lounge' party hall (60 guests) — make it equally suited to intimate functions. With on-site resort rooms for outstation guests, in-house catering and décor, Four Vedas is the complete wedding destination in Siliguri.",
    // TODO: replace placeholder images below with The Four Vedas photos once uploaded to the CDN
    heroImage: {
      src: `${CDN},w=2000/MBlLcEqY2yw3y2EF/dsc05317-6W1igokk7BwFIn1u.JPG`,
      alt: "Bika Banquets at The Four Vedas — banquet and lawn wedding venue in Matigara, Siliguri, West Bengal",
    },
    galleryImages: [],
    faqs: [
      {
        q: "How far is the Siliguri venue from Bagdogra Airport?",
        a: "The Four Vedas in Matigara is roughly 15–20 minutes (about 7 km) from Bagdogra International Airport, making it very convenient for outstation and destination-wedding guests.",
      },
      {
        q: "Is on-site accommodation available for guests?",
        a: "Yes — the property is a resort with on-site rooms and suites, so your outstation guests can stay where the celebration happens. Ask us about room blocks when you enquire.",
      },
      {
        q: "What is the largest event the Siliguri venue can host?",
        a: "The Kaiser Bagh Lawn accommodates up to 1,800 guests for open-air functions, while the air-conditioned Atharvan hall seats up to 550 — ideal for grand weddings and receptions.",
      },
    ],
    schema: {
      latitude: 26.7060,
      longitude: 88.3953,
      postalCode: "734010",
      streetAddress: "Deep Nagar, Panchkel Guri, Khaprail Road, Matigara",
    },
  },
];

export function getVenueBySlug(slug: string): Venue | undefined {
  return venues.find((v) => v.slug === slug);
}
