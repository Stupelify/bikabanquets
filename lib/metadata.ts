// lib/metadata.ts
import type { Metadata } from "next";

const SITE_NAME = "Bika Banquets";
const BASE_URL = "https://bikabanquets.com";
const DEFAULT_OG_IMAGE = "/images/hero.jpg";

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}
