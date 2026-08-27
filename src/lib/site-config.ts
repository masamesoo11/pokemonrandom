/**
 * Site configuration for analytics, ads, and SEO.
 *
 * All sensitive IDs (Google Analytics, AdSense, Search Console) are read from
 * environment variables so you can deploy the same code to multiple environments
 * without hardcoding. Set them in .env.local or your hosting provider's UI:
 *
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          (Google Analytics 4 measurement ID)
 *   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX  (AdSense publisher ID)
 *   NEXT_PUBLIC_SEARCH_CONSOLE=XXXXXXXXXXXXXXXXXXXXXXXX  (Search Console verification token)
 *   NEXT_PUBLIC_SITE_URL=https://pokemonrandom.com       (canonical site URL)
 *   ADMIN_PASSWORD=changeme                              (admin panel password)
 */

export const siteConfig = {
  name: "Pokemon Random",
  shortName: "PokemonRandom",
  title: "Random Pokemon Generator - Free Online Pokemon Picker | Pokemon Random",
  description:
    "Free random Pokemon generator. Generate random Pokemon by generation, type, or region. Build your team, spin the type wheel, guess that Pokemon, and more. No signup required.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pokemonrandom.com",
  locale: "en_US",
  twitter: "@pokemonrandom",
  // Analytics — set via env var (NEXT_PUBLIC_GA_ID=G-GJ6BBMYYTF)
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  // AdSense
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  // Search Console verification token
  searchConsoleToken:
    process.env.NEXT_PUBLIC_SEARCH_CONSOLE ?? "",
  // Admin
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
};

/**
 * AdSense slot IDs - replace with real slot IDs from your AdSense dashboard.
 * Each slot corresponds to a different ad placement on the page.
 */
export const adSlots = {
  // 728x90 or responsive leaderboard, above the fold
  headerBanner: process.env.NEXT_PUBLIC_AD_SLOT_HEADER ?? "",
  // In-content responsive ad, between sections
  inContent: process.env.NEXT_PUBLIC_AD_SLOT_INCONTENT ?? "",
  // Sidebar / card-style ad (300x250 or responsive)
  sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ?? "",
  // Footer leaderboard
  footer: process.env.NEXT_PUBLIC_AD_SLOT_FOOTER ?? "",
  // Mobile sticky anchor ad (320x50)
  mobileAnchor: process.env.NEXT_PUBLIC_AD_SLOT_MOBILE ?? "",
};

/**
 * Track an analytics event (no-op if GA isn't loaded).
 * Safe to call from any client component.
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag === "function") {
    gtag("event", action, params);
  }
}

/**
 * Track a page view manually (used for SPA-style navigations).
 */
export function trackPageView(url: string) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag === "function") {
    gtag("config", siteConfig.gaId, { page_path: url });
  }
}
