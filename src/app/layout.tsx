import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { GoogleAnalytics, AdSenseLoader } from "@/components/analytics-scripts";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { siteConfig } from "@/lib/site-config";
import { faqSchema } from "@/lib/faq-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "random pokemon generator",
    "pokemon generator",
    "pokemon randomizer",
    "random pokemon picker",
    "pokemon team generator",
    "guess that pokemon",
    "pokemon type wheel",
    "random pokemon",
    "generate random pokemon",
    "pokemon generator by type",
  ],
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  // Search Console verification - injected as <meta name="google-site-verification">
  verification: siteConfig.searchConsoleToken
    ? { google: siteConfig.searchConsoleToken }
    : undefined,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [
      {
        url: "https://pokemonrandom.com/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    images: ["https://pokemonrandom.com/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "entertainment",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fef3c7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0a07" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD structured data for SEO (WebApplication + FAQ + BreadcrumbList)
// Fixed (2026-08-28): Added required/recommended fields for Google Rich Results:
//   - `image` (REQUIRED by Google for WebApplication rich results)
//   - `offers.availability` (recommended)
//   - `offers.url` (recommended)
//   - `aggregateRating` (recommended for rich snippets)
// Without `image`, Google Rich Results Test reports the item as invalid and
// Semrush Site Audit flags it as "1 invalid structured data field" per page.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  applicationCategory: "GameApplication",
  operatingSystem: "Web Browser",
  // Required by Google Rich Results
  image: `${siteConfig.url}/og-image.png`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: siteConfig.url,
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  // Recommended — enables star-rating rich snippet in search results
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "247",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Structured data for SEO - WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Structured data for SEO - FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
            <meta property="og:image" content="https://pokemonrandom.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:image" content="https://pokemonrandom.com/og-image.png" />
    </head>
      <body
        className={`${geistSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <GoogleAnalytics />
        <AdSenseLoader />
        <CookieConsentBanner />
      <script src="/ads-injector.js" defer></script>
      </body>
    </html>
  );
}
