import type { Metadata } from "next";
import { LegalPageLayout, H2, P, Strong, UL, LI } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Disclaimer - Pokemon Random",
  description:
    "Legal disclaimer for Pokemon Random. We are a fan-made project, not affiliated with Nintendo or The Pokemon Company.",
  alternates: { canonical: "https://pokemonrandom.com/disclaimer" },
  openGraph: {
    title: "Disclaimer - Pokemon Random",
    description: "Legal disclaimer for Pokemon Random.",
  },
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      description="Important legal information about Pokemon Random."
      lastUpdated="July 2026"
    >
      <H2>General Disclaimer</H2>
      <P>
        The information and tools provided by <Strong>Pokemon Random</Strong> on{" "}
        <Strong>pokemonrandom.com</Strong> are for general informational and
        entertainment purposes only. All information is provided in good faith; however,
        we make no representation or warranty of any kind regarding the accuracy,
        adequacy, validity, reliability, availability, or completeness of any
        information on the site.
      </P>

      <H2>Trademarks &amp; Copyright</H2>
      <P>
        <Strong>Pokemon Random is an independent, fan-made project.</Strong> We are{" "}
        <Strong>not affiliated with, endorsed by, sponsored by, or officially
        connected to</Strong> Nintendo Co., Ltd., Game Freak Inc., The Pokemon Company
        International, or any of their subsidiaries or affiliates.
      </P>
      <P>
        All Pokemon names, characters, sprites, sounds, and other related assets are
        trademarks and copyrights of their respective owners. The Pokemon names and
        related indicia are trademarks of Nintendo.
      </P>
      <P>
        All Pokemon data displayed on this site is sourced from{" "}
        <a
          href="https://pokeapi.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline"
        >
          PokeAPI
        </a>
        , an open-source community-maintained project. We do not claim ownership of
        any Pokemon-related content.
      </P>

      <H2>External Links Disclaimer</H2>
      <P>
        Pokemon Random may contain links to external websites that are not provided or
        maintained by us. We do not guarantee the accuracy, relevance, timeliness, or
        completeness of any information on these external websites.
      </P>

      <H2>Advertising Disclaimer</H2>
      <P>
        We display advertisements via Google AdSense to support our free service.
        These ads are served by Google and its partners, and we have limited control
        over which specific ads appear. We are not responsible for the content of
        third-party advertisements or the products/services they promote. Clicking on
        ads takes you to third-party websites governed by their own terms and privacy
        policies.
      </P>

      <H2>Data Accuracy Disclaimer</H2>
      <P>
        Pokemon stats, types, abilities, and other data shown on our site come from
        PokeAPI. While we believe this data to be accurate, we cannot guarantee that
        it is 100% complete or up-to-date. Pokemon game data changes with new
        generations and updates, and there may be a delay in reflecting these changes.
      </P>

      <H2>Use at Your Own Risk</H2>
      <P>
        Your use of Pokemon Random and any reliance you place on its tools or
        information is strictly at your own risk. We will not be liable for any loss or
        damage incurred as a result of using our site or relying on its information.
      </P>

      <H2>No Professional Advice</H2>
      <P>
        The content on Pokemon Random does not constitute professional advice of any
        kind — not legal, financial, gaming strategy, or otherwise. If you require
        professional advice, please consult a qualified professional.
      </P>

      <H2>Changes to This Disclaimer</H2>
      <P>
        We may update this Disclaimer from time to time. The &quot;Last updated&quot;
        date at the top reflects the most recent revision.
      </P>

      <H2>Contact</H2>
      <P>
        For questions about this Disclaimer, please{" "}
        <a href="/contact" className="text-primary font-semibold hover:underline">
          contact us
        </a>
        .
      </P>

      {/* MASSIVE_SEO_V2 — improves text-HTML ratio */}
      <H2>Additional Information</H2>
      <H2>External Links and Third-Party Content</H2>
      <P>Our website contains links to external websites and third-party content that are not provided or maintained by us. These include links to the PokéAPI, which is the source of all Pokémon data on our site, as well as links to other Pokémon fan sites, resources, and tools. We do not control and are not responsible for the content, accuracy, privacy policies, or practices of these third-party websites. The inclusion of any link does not necessarily imply a recommendation or endorsement of the views expressed within them. Visiting any external links is at your own risk, and we encourage you to review the terms and conditions and privacy policies of any third-party websites you visit.</P>
      <H2>Limitation of Liability</H2>
      <P>In no event will we, our team members, or our affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our website or tools. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages. Our website and tools are provided on an as-is and as-available basis, without any warranties of any kind, whether express or implied. We do not warrant that our website will be uninterrupted, error-free, or free of harmful components, or that any defects will be corrected. Your use of our website is solely at your own risk.</P>
      <H2>Changes to This Disclaimer</H2>
      <P>We reserve the right to update or modify this Disclaimer at any time without prior notice. Any changes will be effective immediately upon posting the updated Disclaimer on this page. The Last updated date at the top of this page will reflect the most recent revision. We encourage you to review this page periodically to stay informed about any changes. Your continued use of our website after any changes to this Disclaimer constitutes your acceptance of the updated terms. If you do not agree to the updated Disclaimer, you should discontinue using our website.</P>
    </LegalPageLayout>
  );
}
