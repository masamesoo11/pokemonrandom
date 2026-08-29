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
      {/* MASSIVE_SEO_V2 */}
      <H2>Our History and Vision</H2>
      <P>
        Pokémon Random was launched in 2026 as a passion project by a team of Pokémon fans who wanted to create a better, faster, and more accessible set of Pokémon tools for the community. We noticed that many existing Pokémon websites were cluttered with ads, required unnecessary signups, or were slow and difficult to use on mobile devices. We set out to build a different kind of Pokémon website — one that puts the user experience first, loads instantly on any device, and provides accurate, up-to-date information sourced from the official PokéAPI. Our vision is to become the go-to destination for Pokémon fans who need quick, reliable tools and information without any hassle.
      </P>
      <H2>Technology and Performance</H2>
      <P>
        Our website is built using Next.js, a modern React framework that enables server-side rendering and static site generation. This means that our pages are pre-built at deploy time, allowing them to load instantly in your browser without any client-side API calls. We use the PokéAPI for all Pokémon data, which is a community-maintained open-source API that provides comprehensive data about every Pokémon, move, ability, and type in the franchise. Our site is deployed on Cloudflare Pages, which provides a global content delivery network that ensures fast loading times for users around the world. We also use various performance optimization techniques like image optimization, code splitting, and caching to provide the best possible user experience.
      </P>
      <H2>Community and Future Plans</H2>
      <P>
        We are committed to continuously improving our tools and adding new features based on user feedback. Some of the features we are planning for the future include a damage calculator, a team weakness analyzer, a breeding IV calculator, and a trade simulator. We also plan to expand our blog with more in-depth guides, strategy articles, and game walkthroughs. If you have suggestions for new features or content, please contact us through our contact page. We read every message and do our best to respond promptly. You can also follow us on social media for updates, news, and announcements about new features and tools. Thank you for using Pokémon Random, and we hope you enjoy our tools as much as we enjoy building them.
      </P>

    </LegalPageLayout>
  );
}
