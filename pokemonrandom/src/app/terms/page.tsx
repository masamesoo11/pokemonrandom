import type { Metadata } from "next";
import { LegalPageLayout, H2, P, Strong, UL, LI, Email } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms of Service - Pokemon Random",
  description:
    "Terms of Service for Pokemon Random. The rules and conditions for using our free Pokemon tools.",
  alternates: { canonical: "https://pokemonrandom.com/terms" },
  openGraph: {
    title: "Terms of Service - Pokemon Random",
    description: "Terms of Service for Pokemon Random.",
  },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      description="The rules and conditions for using Pokemon Random."
      lastUpdated="July 2026"
    >
      <P>
        Welcome to <Strong>Pokemon Random</Strong>. By accessing or using our website
        at <Strong>pokemonrandom.com</Strong>, you agree to be bound by these Terms of
        Service. If you do not agree with any part of these terms, please do not use
        our website.
      </P>

      <H2>1. Service Description</H2>
      <P>
        Pokemon Random provides free, fan-made online tools for the Pokemon community,
        including a random Pokemon generator, team builder, type wheel, guessing game,
        and Pokemon randomizer with filters. All tools are provided free of charge and
        do not require registration.
      </P>

      <H2>2. Acceptable Use</H2>
      <P>By using our service, you agree to:</P>
      <UL>
        <LI>Use the tools only for personal, non-commercial purposes</LI>
        <LI>Not attempt to overload, crash, or reverse-engineer our systems</LI>
        <LI>Not use automated scripts, bots, or scrapers without permission</LI>
        <LI>Not use our service for any illegal or harmful activity</LI>
        <LI>Respect the intellectual property rights of Nintendo, Game Freak, and The Pokemon Company</LI>
      </UL>

      <H2>3. Intellectual Property</H2>
      <P>
        <Strong> Pokemon Random is a fan-made project.</Strong> All Pokemon names,
        characters, sprites, sounds, and related trademarks are the property of{" "}
        <Strong>Nintendo, Game Freak, and The Pokemon Company</Strong>. We do not claim
        ownership of any Pokemon-related intellectual property.
      </P>
      <P>
        All Pokemon data and sprites displayed on this site are sourced from{" "}
        <a
          href="https://pokeapi.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline"
        >
          PokeAPI
        </a>
        , an open-source community project. We use this data under the terms of the
        PokeAPI license.
      </P>
      <P>
        Our website&apos;s code, design, and original content (excluding Pokemon
        assets) are © {new Date().getFullYear()} Pokemon Random and are licensed under
        the MIT License.
      </P>

      <H2>4. Disclaimer of Warranties</H2>
      <P>
        Our service is provided <Strong>&quot;as is&quot;</Strong> and{" "}
        <Strong>&quot;as available&quot;</Strong>, without warranties of any kind,
        either express or implied. We do not guarantee that:
      </P>
      <UL>
        <LI>The service will be uninterrupted, secure, or error-free</LI>
        <LI>The Pokemon data (stats, types, abilities) is 100% accurate or up-to-date</LI>
        <LI>Any errors or bugs will be corrected</LI>
        <LI>The service will remain free forever (though we currently intend it to be)</LI>
      </UL>

      <H2>5. Limitation of Liability</H2>
      <P>
        To the fullest extent permitted by law, Pokemon Random and its operators shall
        not be liable for any direct, indirect, incidental, consequential, special, or
        exemplary damages resulting from your use of (or inability to use) the service,
        including but not limited to:
      </P>
      <UL>
        <LI>Loss of profits, data, or goodwill</LI>
        <LI>Damage to your device or software</LI>
        <LI>Any decision made based on Pokemon data shown on our site</LI>
        <LI>Any third-party actions (such as ad clicks or external links)</LI>
      </UL>

      <H2>6. Third-Party Services &amp; Links</H2>
      <P>
        Our service uses third-party tools (Google Analytics, Google AdSense, PokeAPI,
        Vercel, Cloudflare) and may contain links to external websites. We are not
        responsible for the content, privacy policies, or practices of any third-party
        sites or services.
      </P>

      <H2>7. Advertisements</H2>
      <P>
        We display ads via Google AdSense to keep our service free. By using our site,
        you acknowledge that:
      </P>
      <UL>
        <LI>Ads are served by Google and its partners, who use cookies to personalize ads</LI>
        <LI>We do not control which specific ads are shown to you</LI>
        <LI>Clicking on ads takes you to third-party websites with their own terms and policies</LI>
        <LI>You can opt out of personalized ads via Google Ads Settings</LI>
      </UL>

      <H2>8. User Content</H2>
      <P>
        We do not require user accounts and do not host user-generated content. Any
        Pokemon teams or favorites you create are stored locally in your browser and
        are not visible to us or other users.
      </P>

      <H2>9. Termination</H2>
      <P>
        We may terminate or suspend access to our service immediately, without prior
        notice or liability, for any reason, including if you breach these Terms. We
        may also modify or discontinue the service at any time without notice.
      </P>

      <H2>10. Governing Law</H2>
      <P>
        These Terms shall be governed by and construed in accordance with applicable
        international laws, without regard to conflict of law provisions. Any disputes
        will be resolved through good-faith communication first.
      </P>

      <H2>11. Changes to These Terms</H2>
      <P>
        We reserve the right to modify these Terms at any time. The &quot;Last
        updated&quot; date at the top reflects the most recent revision. Continued use
        of the service after changes constitutes acceptance of the new Terms.
      </P>

      <H2>12. Contact</H2>
      <P>
        If you have questions about these Terms, please contact us at:{" "}
        <Email email="terms@pokemonrandom.com" />
      </P>
    </LegalPageLayout>
  );
}
