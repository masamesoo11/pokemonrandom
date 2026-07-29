"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/**
 * Loads Google Analytics 4 (gtag.js) only if GA_ID is configured.
 * Place this component once in the root layout.
 */
export function GoogleAnalytics() {
  if (!siteConfig.gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

/**
 * Loads Google AdSense loader script only if ADSENSE_CLIENT is configured.
 * Place this component once in the root layout.
 */
export function AdSenseLoader() {
  if (!siteConfig.adsenseClient) return null;

  return (
    <Script
      id="adsense-init"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
      crossOrigin="anonymous"
    />
  );
}
