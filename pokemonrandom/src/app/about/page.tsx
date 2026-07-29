import type { Metadata } from "next";
import { LegalPageLayout, H2, P, Strong, UL, LI } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "About Us - Pokemon Random",
  description:
    "Learn about Pokemon Random — a free fan-made collection of Pokemon tools including random generator, team builder, type wheel, and more.",
  alternates: { canonical: "https://pokemonrandom.com/about" },
  openGraph: {
    title: "About Us - Pokemon Random",
    description:
      "Learn about Pokemon Random — a free fan-made collection of Pokemon tools.",
  },
};

export default function AboutPage() {
  return (
    <LegalPageLayout
      title="About Pokemon Random"
      description="A free fan-made platform for Pokemon trainers, builders, and dreamers."
      lastUpdated="2026"
    >
      <H2>Our Mission</H2>
      <P>
        <Strong>Pokemon Random</Strong> is a free, fan-made collection of Pokemon tools
        built for trainers, content creators, and competitive players. Our mission is
        simple: give the Pokemon community a fast, clean, no-nonsense way to generate
        random Pokemon, build teams, and explore every generation — without pop-ups,
        without signups, and without paywalls.
      </P>

      <H2>What We Offer</H2>
      <P>Our platform includes five core tools, all completely free to use:</P>
      <UL>
        <LI>
          <Strong>Random Pokemon Generator</Strong> — Pick a random Pokemon from any of
          the 9 generations, with sprites, types, base stats, abilities, cries, and
          shiny forms.
        </LI>
        <LI>
          <Strong>Pokemon Team Builder</Strong> — Roll six random Pokemon at once for
          Nuzlocke challenges, draft leagues, or casual fun.
        </LI>
        <LI>
          <Strong>Type Wheel Spinner</Strong> — Spin a colorful wheel of all 18 Pokemon
          types and discover Pokemon of that type.
        </LI>
        <LI>
          <Strong>Guess That Pokemon</Strong> — A mini-game where you identify a
          mystery Pokemon from its silhouette in 3 attempts.
        </LI>
        <LI>
          <Strong>Pokemon Randomizer</Strong> — Advanced filters for generations, types,
          and legendary status to find exactly the Pokemon you want.
        </LI>
      </UL>

      <H2>Our Story</H2>
      <P>
        Pokemon Random started as a personal project — we were frustrated with how
        cluttered and ad-heavy most existing Pokemon tools had become. We wanted
        something fast, beautiful, and respectful of the user. So we built our own,
        using modern web technologies (Next.js 16, React 19, Tailwind CSS 4) and the
        open-source PokeAPI for all Pokemon data.
      </P>
      <P>
        Today, Pokemon Random serves thousands of trainers every month from over 50
        countries. We&apos;re proud to remain 100% free, with no account required and
        no data collection beyond basic anonymous analytics.
      </P>

      <H2>Technology &amp; Data</H2>
      <P>
        All Pokemon data — sprites, stats, types, abilities, cries — comes from{" "}
        <a
          href="https://pokeapi.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline"
        >
          PokeAPI
        </a>
        , a free, open-source, community-maintained Pokemon database. We are deeply
        grateful to the PokeAPI team for their work. Our site is 100% client-side, which
        means your Pokemon generation happens in your browser — nothing is sent to our
        servers.
      </P>

      <H2>Legal Disclaimer</H2>
      <P>
        Pokemon Random is an independent, fan-made project. We are{" "}
        <Strong>not affiliated with, endorsed by, or sponsored by</Strong> Nintendo,
        Game Freak, The Pokemon Company, or any of their affiliates. Pokemon and all
        related names, characters, and images are trademarks of Nintendo, Game Freak,
        and The Pokemon Company.
      </P>
      <P>
        This site is built by fans, for fans. If you represent any of the trademark
        holders and have concerns, please see our{" "}
        <a href="/dmca" className="text-primary font-semibold hover:underline">
          DMCA page
        </a>{" "}
        or contact us directly.
      </P>

      <H2>Contact Us</H2>
      <P>
        Have feedback, found a bug, or want to suggest a new feature? We&apos;d love to
        hear from you. Visit our{" "}
        <a href="/contact" className="text-primary font-semibold hover:underline">
          contact page
        </a>{" "}
        to send us a message.
      </P>
    </LegalPageLayout>
  );
}
