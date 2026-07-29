import type { Metadata } from "next";
import { LegalPageLayout, H2, P, Strong, UL, LI, Email } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy - Pokemon Random",
  description:
    "Privacy Policy for Pokemon Random. Learn what data we collect, how we use cookies, and how Google AdSense and Analytics affect your privacy.",
  alternates: { canonical: "https://pokemonrandom.com/privacy" },
  openGraph: {
    title: "Privacy Policy - Pokemon Random",
    description: "Privacy Policy for Pokemon Random.",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="How Pokemon Random handles your data."
      lastUpdated="July 2026"
    >
      <P>
        At <Strong>Pokemon Random</Strong>, accessible from{" "}
        <Strong>pokemonrandom.com</Strong>, your privacy is important to us. This
        Privacy Policy explains what information we collect, how we use it, and what
        choices you have.
      </P>

      <H2>1. Information We Collect</H2>
      <P>
        <Strong>We do not require you to create an account or provide any personal
        information</Strong> to use our tools. You can generate Pokemon, build teams,
        spin the wheel, and play our games without telling us who you are.
      </P>
      <P>We collect the following anonymous data automatically:</P>
      <UL>
        <LI>
          <Strong>Anonymous usage statistics</Strong> — Which tools you use, how often,
          and which Pokemon you generate. This data is stored locally in your browser
          (localStorage) and is not sent to us. You can clear it anytime by clearing
          your browser data.
        </LI>
        <LI>
          <Strong>Favorites &amp; history</Strong> — Pokemon you star as favorites or
          recently viewed Pokemon. This is also stored only in your browser.
        </LI>
        <LI>
          <Strong>Server logs</Strong> — Our hosting provider (Vercel) may
          automatically log standard request data such as IP address, user agent, and
          timestamps for security and abuse prevention. These logs are retained for a
          limited time and are not associated with your identity.
        </LI>
      </UL>

      <H2>2. Cookies &amp; Local Storage</H2>
      <P>
        We use <Strong>localStorage</Strong> (not cookies) to remember your preferences
        on your device. This includes your theme preference (dark/light mode), saved
        favorites, and recent activity. localStorage data never leaves your device.
      </P>
      <P>
        Third-party services we use (described below) may set their own cookies. See
        our <a href="/cookies" className="text-primary font-semibold hover:underline">Cookie Policy</a>{" "}
        for details.
      </P>

      <H2>3. Google Analytics</H2>
      <P>
        We use <Strong>Google Analytics 4</Strong> to understand how visitors use our
        site so we can improve it. Google Analytics collects anonymous data such as:
      </P>
      <UL>
        <LI>Pages you visit and how long you stay</LI>
        <LI>General geographic region (country/city level — not precise location)</LI>
        <LI>Device type, browser, and screen size</LI>
        <LI>How you arrived at our site (referrer)</LI>
        <LI>Anonymous events (button clicks, Pokemon generations)</LI>
      </UL>
      <P>
        Google Analytics uses cookies to gather this data. You can opt out using{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline"
        >
          Google&apos;s opt-out browser add-on
        </a>
        , by enabling &quot;Do Not Track&quot; in your browser, or by using a privacy
        extension.
      </P>

      <H2>4. Google AdSense</H2>
      <P>
        We use <Strong>Google AdSense</Strong> to display ads and support this free
        website. AdSense and its partners may use cookies to serve ads based on your
        prior visits to this and other websites.
      </P>
      <UL>
        <LI>
          Google&apos;s use of advertising cookies enables it and its partners to serve
          ads based on your visit to our site and/or other sites on the internet.
        </LI>
        <LI>
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Google Ads Settings
          </a>
          .
        </LI>
        <LI>
          For more information about how Google uses data when you use our site, see{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Google&apos;s Privacy &amp; Terms
          </a>
          .
        </LI>
        <LI>
          Third-party vendors, including Google, use cookies to serve ads based on a
          user&apos;s previous visits to our website or other websites.
        </LI>
      </UL>

      <H2>5. Third-Party Services</H2>
      <P>
        In addition to Google Analytics and AdSense, we use the following third-party
        services:
      </P>
      <UL>
        <LI>
          <Strong>PokeAPI (pokeapi.co)</Strong> — Provides all Pokemon data (sprites,
          stats, types, cries). When you generate a Pokemon, your browser makes a
          direct request to PokeAPI&apos;s servers. They may log your IP address.
        </LI>
        <LI>
          <Strong>GitHub raw content</Strong> — Pokemon sprites are loaded from
          GitHub&apos;s raw content CDN. Your IP may be logged by GitHub.
        </LI>
        <LI>
          <Strong>Vercel</Strong> — Our hosting provider. Vercel may log server request
          data for security.
        </LI>
        <LI>
          <Strong>Cloudflare</Strong> — Used for DNS and DDoS protection. Cloudflare
          may log request metadata.
        </LI>
      </UL>

      <H2>6. Children&apos;s Privacy</H2>
      <P>
        Our service is suitable for users of all ages, including children. We do not
        knowingly collect any personal information from anyone, including children under
        13. If you are a parent or guardian and believe your child has provided us with
        personal information, please contact us and we will promptly delete it.
      </P>

      <H2>7. Your Rights</H2>
      <P>
        Since we do not collect personal information, there is no personal data to
        access, correct, or delete. To clear all data we&apos;ve stored about your
        usage:
      </P>
      <UL>
        <LI>Clear your browser&apos;s localStorage and cookies for our domain</LI>
        <LI>Use your browser&apos;s &quot;Clear browsing data&quot; feature</LI>
        <LI>Visit our admin dashboard at <code>/admin</code> to view local data</LI>
      </UL>
      <P>
        If you are a resident of the European Economic Area (EEA), United Kingdom, or
        California, you have additional rights under GDPR and CCPA respectively. Since
        we don&apos;t collect personal data, these rights are largely already
        satisfied, but you may still contact us with any concerns.
      </P>

      <H2>8. Data Security</H2>
      <P>
        We protect our site with HTTPS encryption (provided automatically by Vercel).
        Our admin panel is protected by a password. However, no method of transmission
        over the internet is 100% secure.
      </P>

      <H2>9. Changes to This Policy</H2>
      <P>
        We may update this Privacy Policy from time to time. The &quot;Last
        updated&quot; date at the top reflects the most recent revision. We encourage
        you to review this page periodically.
      </P>

      <H2>10. Contact Us</H2>
      <P>
        If you have questions about this Privacy Policy, please contact us at:{" "}
        <Email email="privacy@pokemonrandom.com" />
      </P>
    </LegalPageLayout>
  );
}
