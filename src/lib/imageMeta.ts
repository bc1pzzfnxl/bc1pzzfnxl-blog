export const imageMetaMap: Record<string, { width: number; height: number }> = {
  "/images/psaume-91-ombre.webp": { width: 358, height: 257 },
  "/images/zakarid-armenia-1200.webp": { width: 1280, height: 752 },
  "/images/torah-613.webp": { width: 900, height: 595 },
  "/images/psaume-91.jpg": { width: 1200, height: 971 },
  "/images/armanio-bible-1856.webp": { width: 496, height: 594 },
  "/images/kurds-and-orthodox-priest-1873-1788598994581.webp": { width: 960, height: 1090 },
  "/images/psaume-91.webp": { width: 900, height: 728 },
  "/images/church-of-the-east-10c.webp": { width: 1280, height: 908 },
  "/images/torah-613.jpg": { width: 1140, height: 754 },
  "/images/psaume-91-melchisedek.webp": { width: 1000, height: 75 },
  "/images/default-cover.webp": { width: 1200, height: 900 },
  "/images/psaume-91-abram.webp": { width: 1000, height: 45 },
  "/images/default-cover.jpg": { width: 1200, height: 900 },
  "/images/psaume-91-abris.webp": { width: 853, height: 99 },
  "/images/kiteba-piroz-2004.webp": { width: 600, height: 450 },
  "/images/barabbas.webp": { width: 900, height: 691 },
  "/images/barabbas.jpg": { width: 1200, height: 921 },
};

export function getImageDimensions(src?: string): { width?: number; height?: number } {
  if (!src) return {};
  try {
    const pathname = src.startsWith("http") ? new URL(src).pathname : src;
    return imageMetaMap[pathname] || {};
  } catch {
    return imageMetaMap[src] || {};
  }
}
