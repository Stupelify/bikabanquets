import type { MetadataRoute } from "next";
import { venues } from "@/lib/venues";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bikabanquets.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/venues`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const venueRoutes: MetadataRoute.Sitemap = venues.map((v) => ({
    url: `${base}/venues/${v.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.95, // venue pages are highest-value SEO pages
  }));

  return [...staticRoutes, ...venueRoutes];
}
