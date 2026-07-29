import type { Metadata } from "next";
import { LegalPageLayout, H2, P, Strong, UL, LI } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Cookie Policy - Pokemon Random",
  description:
    "Cookie Policy for Pokemon Random. Learn which cookies we and our third-party partners (Google, AdSense) use and how to control them.",
  alternates: { canonical: "https://pokemonrandom.com/cookies" },
  openGraph: {
    title: "Cookie Policy - Pokemon Random",
    description: "Cookie Policy for Pokemon Random.",
  },
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="How Pokemon Random uses cookies and local storage."
      lastUpdated="July 2026"
    >
      <P>
        This Cookie Policy explains how <Strong>Pokemon Random</Strong> uses cookies
        and similar technologies (like localStorage) to operate and improve our website.
      </P>

      <H2>1. What Are Cookies?</H2>
      <P>
        Cookies are small text files stored on your device when you visit a website.
        They allow the site to remember your actions and preferences over time. We use
        cookies sparingly and rely primarily on localStorage for user preferences.
      </P>

      <H2>2. Types of Cookies We Use</H2>

      <H2>A. Essential (First-Party) localStorage</H2>
      <P>
        We use <Strong>localStorage</Strong> (not cookies) to remember your
        preferences. Unlike cookies, localStorage data is never sent to our servers —
        it lives only in your browser.
      </P>
      <UL>
        <LI>
          <Strong>pokegen-theme</Strong> — Remembers your dark/light mode preference
        </LI>
        <LI>
          <Strong>pokegen-favorites</Strong> — Stores Pokemon you&apos;ve starred as
          favorites (max 50)
        </LI>
        <LI>
          <Strong>pokegen-history</Strong> — Stores recently viewed Pokemon (max 30)
        </LI>
        <LI>
          <Strong>pokegen-stats</Strong> — Stores anonymous usage statistics (tool
          usage, top Pokemon)
        </LI>
        <LI>
          <Strong>pokegen-admin-auth</Strong> — Session-only flag for admin login
          (cleared when browser closes)
        </LI>
      </UL>

      <H2>B. Google Analytics Cookies</H2>
      <P>
        Google Analytics 4 uses the following cookies to gather anonymous usage data:
      </P>
      <UL>
        <LI>
          <Strong>_ga</Strong> — Distinguishes unique users (2 years)
        </LI>
        <LI>
          <Strong>_ga_&lt;container-id&gt;</Strong> — Maintains session state (2 years)
        </LI>
      </UL>
      <P>
        These cookies help us understand which pages are popular and how visitors find
        our site. The data is anonymous and aggregated.
      </P>

      <H2>C. Google AdSense Cookies</H2>
      <P>
        If we display ads via Google AdSense, the following cookies may be set:
      </P>
      <UL>
        <LI>
          <Strong>__gads</Strong> — Tracks ad interactions (2 years)
        </LI>
        <LI>
          <Strong>__gpi</Strong> — Persists ad preferences (2 years)
        </LI>
        <LI>
          <Strong>IDE</Strong> — Used by Google for personalized ads (Doubleclick)
        </LI>
        <LI>
          <Strong>NID</Strong> — Remembers preferences for personalized ads
        </LI>
      </UL>

      <H2>3. Third-Party Cookies</H2>
      <P>The following third parties may set cookies when you use our site:</P>
      <UL>
        <LI>
          <Strong>Google Analytics</Strong> — Usage analytics (anonymous)
        </LI>
        <LI>
          <Strong>Google AdSense</Strong> — Advertising
        </LI>
        <LI>
          <Strong>PokeAPI</Strong> — May set cookies if you visit their site directly
          (we don&apos;t control this)
        </LI>
        <LI>
          <Strong>GitHub (raw.githubusercontent.com)</Strong> — For Pokemon sprite
          delivery
        </LI>
      </UL>

      <H2>4. How to Control Cookies</H2>
      <P>You have several options for managing cookies:</P>
      <UL>
        <LI>
          <Strong>Browser settings</Strong> — Most browsers let you block or delete
          cookies in their privacy settings
        </LI>
        <LI>
          <Strong>Incognito/Private mode</Strong> — Browse without saving any data
        </LI>
        <LI>
          <Strong>Google Ads Settings</Strong> —{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Opt out of personalized ads
          </a>
        </LI>
        <LI>
          <Strong>Google Analytics opt-out</Strong> —{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Install the opt-out browser add-on
          </a>
        </LI>
        <LI>
          <Strong>Clear our localStorage</Strong> — Visit our admin dashboard at{" "}
          <code>/admin</code> or clear your browser data
        </LI>
      </UL>

      <H2>5. Do Not Track</H2>
      <P>
        If your browser sends a <Strong>Do Not Track</Strong> signal, we respect it by
        not loading Google Analytics. However, essential functionality (Pokemon
        generation, tools) still works.
      </P>

      <H2>6. Updates to This Policy</H2>
      <P>
        We may update this Cookie Policy as we add new features or as third-party
        services change their practices. The &quot;Last updated&quot; date at the top
        reflects the most recent revision.
      </P>

      <H2>7. More Information</H2>
      <P>
        For more about our privacy practices, see our{" "}
        <a href="/privacy" className="text-primary font-semibold hover:underline">
          Privacy Policy
        </a>
        . For questions about cookies, contact us at{" "}
        <a
          href="mailto:privacy@pokemonrandom.com"
          className="text-primary font-semibold hover:underline"
        >
          privacy@pokemonrandom.com
        </a>
        .
      </P>
    </LegalPageLayout>
  );
}
