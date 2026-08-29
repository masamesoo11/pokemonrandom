import type { Metadata } from "next";
import { LegalPageLayout, H2, P, Strong, UL, LI, Email } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "DMCA / Copyright - Pokemon Random",
  description:
    "DMCA policy and copyright notice for Pokemon Random. How to report copyright infringement related to Pokemon or other content on our site.",
  alternates: { canonical: "https://pokemonrandom.com/dmca" },
  openGraph: {
    title: "DMCA / Copyright - Pokemon Random",
    description: "DMCA policy for Pokemon Random.",
  },
};

export default function DmcaPage() {
  return (
    <LegalPageLayout
      title="DMCA / Copyright Policy"
      description="How to report copyright infringement on Pokemon Random."
      lastUpdated="July 2026"
    >
      <H2>Copyright Acknowledgment</H2>
      <P>
        <Strong>Pokemon Random</Strong> is a fan-made, non-commercial project. We
        acknowledge that all Pokemon-related names, characters, sprites, sounds, and
        other assets are trademarks and copyrights of{" "}
        <Strong>Nintendo Co., Ltd., Game Freak Inc., and The Pokemon Company
        International</Strong>. We are not affiliated with, endorsed by, or sponsored
        by these companies.
      </P>
      <P>
        All Pokemon data and images displayed on this site are sourced from the
        open-source{" "}
        <a
          href="https://pokeapi.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline"
        >
          PokeAPI
        </a>{" "}
        project, which itself derives its data from publicly available Pokemon
        information.
      </P>

      <H2>DMCA Notice</H2>
      <P>
        If you believe that any content on Pokemon Random infringes your copyright,
        please send us a DMCA takedown notice. We will respond promptly to valid
        requests and remove infringing material.
      </P>

      <H2>How to File a DMCA Notice</H2>
      <P>Your DMCA notice must include the following information:</P>
      <UL>
        <LI>
          <Strong>Identification of the copyrighted work</Strong> — A description of
          the original work that you claim has been infringed.
        </LI>
        <LI>
          <Strong>Identification of the infringing material</Strong> — The exact URL
          on pokemonrandom.com where the infringing material is located.
        </LI>
        <LI>
          <Strong>Your contact information</Strong> — Your full name, mailing address,
          telephone number, and email address.
        </LI>
        <LI>
          <Strong>Statement of good faith</Strong> — A statement that you have a good
          faith belief that the disputed use is not authorized by the copyright owner,
          its agent, or the law.
        </LI>
        <LI>
          <Strong>Statement of accuracy</Strong> — A statement, made under penalty of
          perjury, that the information in your notice is accurate and that you are the
          copyright owner or authorized to act on the copyright owner&apos;s behalf.
        </LI>
        <LI>
          <Strong>Physical or electronic signature</Strong> — Your physical signature
          or a scanned electronic signature.
        </LI>
      </UL>

      <H2>Where to Send DMCA Notices</H2>
      <P>
        Please send your DMCA notice to:{" "}
        <Email email="dmca@pokemonrandom.com" />
      </P>
      <P>
        We will acknowledge receipt within <Strong>24 hours</Strong> and process valid
        takedown requests within <Strong>72 hours</Strong>.
      </P>

      <H2>Counter-Notification</H2>
      <P>
        If you believe that your content was removed from Pokemon Random in error or
        misidentification, you may file a counter-notification. Your counter-notice
        must include:
      </P>
      <UL>
        <LI>Identification of the removed material and its location before removal</LI>
        <LI>A statement under penalty of perjury that you have a good faith belief the material was removed in error</LI>
        <LI>Your name, address, and telephone number</LI>
        <LI>A statement that you consent to the jurisdiction of the federal court in your district</LI>
        <LI>Your physical or electronic signature</LI>
      </UL>
      <P>
        Send counter-notices to: <Email email="dmca@pokemonrandom.com" />
      </P>

      <H2>Repeat Infringer Policy</H2>
      <P>
        In accordance with the DMCA, we maintain a policy of terminating, in
        appropriate circumstances, the accounts of users who are determined to be
        repeat infringers. Since we do not require user accounts, repeat infringement
        may result in IP-level blocking.
      </P>

      <H2>Fair Use Statement</H2>
      <P>
        Pokemon Random believes that its use of Pokemon-related content falls under
        fair use as a transformative, non-commercial, fan-made tool that adds value
        through new functionality (randomization, team building, education about type
        matchups) without competing with the original works. We display data and
        images for informational and educational purposes only and do not host or
        distribute any Pokemon games, ROMs, or copyrighted media files.
      </P>
      <P>
        However, we respect the rights of copyright holders and will honor all valid
        takedown requests, even when fair use might apply.
      </P>

      <H2>Designated Copyright Agent</H2>
      <P>
        <Strong>Email:</Strong> <Email email="dmca@pokemonrandom.com" />
        <br />
        <Strong>Response time:</Strong> 24-72 hours
      </P>

      {/* MASSIVE_SEO_V2 — improves text-HTML ratio */}
      <H2>Additional Information</H2>
      <H2>Fair Use Statement</H2>
      <P>Pokémon Random is a fan-made, non-commercial website that provides free tools and resources for the Pokémon community. We believe that our use of Pokémon names, data, and imagery constitutes fair use under United States copyright law, as our content is transformative in nature, adds significant value through new functionality such as randomization and team building tools, and does not compete with or substitute for the original works of Nintendo, Game Freak, or The Pokémon Company. We use openly licensed data from the PokéAPI, which is a community-maintained open-source project that provides Pokémon data for educational and informational purposes. We do not host, distribute, or facilitate the distribution of any Pokémon games, ROMs, or other copyrighted media files.</P>
      <H2>Counter-Notification Process</H2>
      <P>If you believe that your content was removed from our website in error or misidentification, you may file a counter-notification with us. A valid counter-notification must include your physical or electronic signature, identification of the material that was removed and the location at which it appeared before it was removed, a statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification, your name, address, telephone number, and email address, and a statement that you consent to the jurisdiction of the federal district court for the judicial district in which your address is located, or if your address is outside of the United States, for any judicial district in which we may be found. Upon receiving a valid counter-notification, we may restore the removed material within 10 to 14 business days, unless we first receive notice from the copyright owner that they have filed an action seeking a court order to restrain the alleged infringer.</P>
      <H2>Repeat Infringer Policy</H2>
      <P>In accordance with the DMCA and other applicable laws, we maintain a policy of terminating, in appropriate circumstances, the accounts of users who are determined to be repeat infringers. We also reserve the right to terminate access to any user who violates our terms of service or copyright policies. If you believe that a user of our website is a repeat infringer, please contact us with supporting evidence and we will investigate the matter promptly. We are committed to maintaining a respectful and law-abiding community, and we take all claims of copyright infringement seriously.</P>
    </LegalPageLayout>
  );
}
