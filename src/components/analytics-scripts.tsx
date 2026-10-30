"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/**
 * Google Consent Mode v2 — default state.
 *
 * MUST execute before any gtag.js script loads. Rendered as a plain inline
 * script in the SSR HTML (parse time), which always precedes the
 * lazyOnload/afterInteractive scripts below.
 *
 * All consent types start DENIED; the cookie-consent banner flips them to
 * granted via gtag('consent', 'update', ...) when the user accepts. Until
 * then GA4 sends cookieless pings only — no _ga cookies are written.
 */
const CONSENT_DEFAULT_SNIPPET = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 1500
  });
`;

/**
 * Loads Google Analytics 4 (gtag.js) only if GA_ID is configured.
 * Place this component once in the root layout.
 */
export function GoogleAnalytics() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SNIPPET }} />
      {siteConfig.gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">
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
      ) : null}
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
