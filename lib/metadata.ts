// lib/metadata.ts
import type { Metadata } from "next";

const SITE_NAME = "Bika Banquets";
const BASE_URL = "https://bikabanquets.com";
const DEFAULT_OG_IMAGE =
  "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200/MBlLcEqY2yw3y2EF/smp01053-lz0Jo3w4Q9TkR6GT.JPG";

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
