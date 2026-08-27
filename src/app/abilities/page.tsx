import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { fetchAbilityList, formatAbilityName } from "@/lib/ability-api";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const canonical = "https://pokemonrandom.com/abilities/";
  const title = "Pokémon Abilities Database — All 298+ Abilities Listed | PokéRandom";
  const description =
    "Complete Pokémon ability database with all 298+ abilities. Browse by name or generation. Each ability has its effect, flavor text, and Pokémon that can have it. Free online Pokémon ability reference.";

  return {
    title,
    description,
    keywords: [
      "pokemon abilities",
      "pokemon ability database",
      "pokemon ability list",
      "all pokemon abilities",
      "pokemon abilities by generation",
      "pokemon ability effects",
      "hidden abilities",
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Abilities", item: "https://pokemonrandom.com/abilities/" },
  ],
};

function groupByLetter(abilities: { name: string; url: string }[]): Record<string, { name: string; url: string }[]> {
  const groups: Record<string, { name: string; url: string }[]> = {};
  for (const a of abilities) {
    const firstLetter = a.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) groups[firstLetter] = [];
    groups[firstLetter].push(a);
  }
  for (const key of Object.keys(groups)) {
    groups[key].sort((a, b) => a.name.localeCompare(b.name));
  }
  return groups;
}

export default async function AbilitiesIndexPage() {
  let abilities: { name: string; url: string }[] = [];
  try {
    const list = await fetchAbilityList(500);
    abilities = list.results;
  } catch (e) {
    console.error("Failed to fetch ability list:", e);
  }

  const grouped = groupByLetter(abilities);
  const letters = Object.keys(grouped).sort();
  const totalAbilities = abilities.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Abilities</span>
          </nav>

          {/* Header */}
          <h1 className="text-4xl font-bold tracking-tight mb-4">Pokémon Abilities Database</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Browse all {totalAbilities}+ Pokémon abilities from every generation. Each ability has
            its own page with effect description, flavor text, and a complete list of Pokémon
            that can have it as a regular or hidden ability. Click any ability to view full details.
          </p>

          {/* Alphabet navigation */}
          <div className="mb-8 flex flex-wrap gap-2">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors font-semibold"
              >
                {letter}
              </a>
            ))}
          </div>

          <InContentAd />

          {/* Abilities grouped by letter */}
          <div className="space-y-8">
            {letters.map((letter) => (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">
                  {letter} <span className="text-base font-normal text-muted-foreground">({grouped[letter].length} abilities)</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {grouped[letter].map((a) => (
                    <Link
                      key={a.name}
                      href={`/abilities/${a.name}/`}
                      className="block px-3 py-2 rounded-lg border border-border bg-card hover:border-primary hover:shadow-sm transition-all text-sm"
                    >
                      <span className="font-medium">{formatAbilityName(a.name)}</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* SEO content */}
          <section className="mt-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>Complete Pokémon Ability Database</h2>
            <p>
              Our Pokémon Abilities Database contains all {totalAbilities}+ abilities from the main
              series games and some spin-offs. Each ability has a dedicated page with its full
              effect description, flavor text from the games, the generation it was introduced in,
              and a complete list of Pokémon that can have the ability — split into regular
              abilities and rarer hidden abilities.
            </p>
            <p>
              Abilities are passive effects that influence battles and the overworld without
              consuming a turn. They were introduced in Generation 3 (Ruby/Sapphire/Emerald) and
              have become a core mechanic of competitive Pokémon battles. Each Pokémon species has
              1-3 possible abilities, with hidden abilities typically being rarer and more powerful.
              Some abilities, like Intimidate, Levitate, and Speed Boost, are so impactful that they
              define entire team archetypes in competitive play.
            </p>
            <p>
              When building a team, abilities are just as important as typing and stats. A Pokémon
              with a strong ability can punch above its weight class, while a weak ability can hold
              back an otherwise strong Pokémon. Use our ability database to research the best
              abilities for your team, and check out our{" "}
              <Link href="/pokemon-compare/">Pokémon Comparison Tool</Link> to compare Pokémon
              based on their abilities. For a complete moveset reference, browse our{" "}
              <Link href="/moves/">Pokémon Moves Database</Link>.
            </p>
            <p>
              All ability data is sourced from the official{" "}
              <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer">PokéAPI</a>,
              a community-maintained REST API. Our database is kept up to date with the latest
              Pokémon games and includes abilities from Generation 3 through Generation 9.
            </p>
          </section>

          {/* Related tools */}
          <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Related Pokémon Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <Link href="/pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Pokédex</div>
                <div className="text-muted-foreground">All 1,025 Pokémon</div>
              </Link>
              <Link href="/moves/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Moves Database</div>
                <div className="text-muted-foreground">920+ moves</div>
              </Link>
              <Link href="/type-chart/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Type Chart</div>
                <div className="text-muted-foreground">Type effectiveness</div>
              </Link>
              <Link href="/pokemon-compare/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Compare Pokémon</div>
                <div className="text-muted-foreground">Side by side</div>
              </Link>
              <Link href="/random-team/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Team Builder</div>
                <div className="text-muted-foreground">Build a team</div>
              </Link>
              <Link href="/api-docs/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">API Docs</div>
                <div className="text-muted-foreground">For developers</div>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
