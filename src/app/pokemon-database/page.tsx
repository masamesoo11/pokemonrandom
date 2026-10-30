import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { GENERATIONS, POKEMON_TYPES } from "@/lib/pokemon-api";

export const metadata: Metadata = {
  title: "Pokémon Database — Complete Pokédex of 1,025 Pokémon",
  description: "Browse the complete Pokémon database. Filter by generation, type, or search by name. Detailed stats, abilities, and evolution chains for all 1,025 Pokémon.",
  keywords: ["pokemon database", "pokedex", "pokemon list", "all pokemon", "pokemon index", "pokemon by type", "pokemon by generation"],
  alternates: { canonical: "https://pokemonrandom.com/pokemon-database/" },
  openGraph: {
    title: "Pokémon Database — Complete Pokédex of 1,025 Pokémon",
    description: "Browse the complete Pokémon database. Filter by generation, type, or search by name.",
    url: "https://pokemonrandom.com/pokemon-database/",
    images: [{ url: "https://pokemonrandom.com/og-image.png", width: 1200, height: 630, alt: "Pokémon Database" }],
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Pokémon Database", item: "https://pokemonrandom.com/pokemon-database/" },
  ],
};

const gameMap: Record<string, string> = {
  "Gen I": "Red/Blue/Yellow",
  "Gen II": "Gold/Silver/Crystal",
  "Gen III": "Ruby/Sapphire/Emerald",
  "Gen IV": "Diamond/Pearl/Platinum",
  "Gen V": "Black/White",
  "Gen VI": "X/Y",
  "Gen VII": "Sun/Moon",
  "Gen VIII": "Sword/Shield",
  "Gen IX": "Scarlet/Violet",
};

export default function PokemonDatabasePage() {
  const popular = [
    { name: "Pikachu", id: 25 },
    { name: "Charizard", id: 6 },
    { name: "Mewtwo", id: 150 },
    { name: "Mew", id: 151 },
    { name: "Lucario", id: 448 },
    { name: "Greninja", id: 658 },
    { name: "Garchomp", id: 445 },
    { name: "Rayquaza", id: 384 },
    { name: "Eevee", id: 133 },
    { name: "Snorlax", id: 143 },
    { name: "Gengar", id: 94 },
    { name: "Dragonite", id: 149 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-10">
          <header className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Pokémon Database</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Complete Pokédex of all 1,025 Pokémon across 9 generations. Browse by generation, type, or jump directly to any Pokémon by ID. Each entry includes base stats, abilities, type effectiveness, evolution chains, and official artwork. The Pokémon database is updated through Generation 9 (Paldea).
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Browse by Generation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GENERATIONS.map((gen, idx) => {
                const genNum = idx + 1;
                const count = gen.range[1] - gen.range[0] + 1;
                return (
                  <Link
                    key={gen.name}
                    href={`/generation/${genNum}/`}
                    className="block p-5 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="font-semibold text-lg">{gen.name}</div>
                      <div className="text-sm text-muted-foreground">{count} Pokémon</div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {gen.region} • #{gen.range[0]}–#{gen.range[1]}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <InContentAd />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Browse by Type</h2>
            <p className="text-muted-foreground">
              Each type page lists all Pokémon of that type, with details on type effectiveness, strengths, and weaknesses. Click any type to explore its full roster.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {POKEMON_TYPES.map((type) => (
                <Link
                  key={type.name}
                  href={`/type/${type.name}/`}
                  className="block p-3 rounded-lg border border-border hover:border-primary capitalize text-center transition-colors"
                  style={{ borderLeftWidth: "4px", borderLeftColor: type.color }}
                >
                  <div className="font-semibold">{type.name}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Pokémon Database Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/random-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Random Pokémon Generator</div>
                <div className="text-sm text-muted-foreground">Generate random Pokémon instantly with filters</div>
              </Link>
              <Link href="/pokemon-search/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Pokémon Search</div>
                <div className="text-sm text-muted-foreground">Search by name, type, or stat range</div>
              </Link>
              <Link href="/pokemon-compare/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Pokémon Comparison</div>
                <div className="text-sm text-muted-foreground">Compare two Pokémon side by side</div>
              </Link>
              <Link href="/pokemon-type-generator/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Random Type Generator</div>
                <div className="text-sm text-muted-foreground">Generate a random Pokémon type with strengths</div>
              </Link>
              <Link href="/type-chart/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Type Chart</div>
                <div className="text-sm text-muted-foreground">Full type effectiveness matrix</div>
              </Link>
              <Link href="/tier-lists/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Tier Lists</div>
                <div className="text-sm text-muted-foreground">Competitive Pokémon rankings</div>
              </Link>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">About This Pokémon Database</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Pokémon database on pokemonrandom.com includes all 1,025 Pokémon released by The Pokémon Company through Generation 9 (Pokémon Scarlet and Violet). Data is sourced from the official PokéAPI, a community-maintained REST API. For each Pokémon, you will find: base stats (HP, Attack, Defense, Special Attack, Special Defense, Speed), abilities (including hidden abilities), types and type effectiveness, evolution chain, cry audio, and both normal and shiny official artwork.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The database is organized by generation (Gen 1 Kanto through Gen 9 Paldea) and by type (all 18 types from Normal to Fairy). Whether you are looking for a specific Pokémon by name, browsing by generation to relive nostalgia, or filtering by type to build a themed team, the database provides direct links to every entry. For random discovery, use the <Link href="/random-pokemon/" className="text-primary underline">Random Pokémon Generator</Link> to instantly pull any of the 1,025 Pokémon.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Generation Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-semibold">Generation</th>
                    <th className="text-left py-2 px-3 font-semibold">Region</th>
                    <th className="text-left py-2 px-3 font-semibold">Game</th>
                    <th className="text-right py-2 px-3 font-semibold">Pokémon</th>
                    <th className="text-right py-2 px-3 font-semibold">Range</th>
                  </tr>
                </thead>
                <tbody>
                  {GENERATIONS.map((gen, idx) => {
                    const genNum = idx + 1;
                    const count = gen.range[1] - gen.range[0] + 1;
                    return (
                      <tr key={gen.name} className="border-b border-border">
                        <td className="py-2 px-3">
                          <Link href={`/generation/${genNum}/`} className="text-primary hover:underline">
                            {gen.name}
                          </Link>
                        </td>
                        <td className="py-2 px-3">{gen.region}</td>
                        <td className="py-2 px-3 text-muted-foreground">{gameMap[gen.name] ?? "—"}</td>
                        <td className="py-2 px-3 text-right">{count}</td>
                        <td className="py-2 px-3 text-right text-muted-foreground">#{gen.range[0]}–#{gen.range[1]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Popular Pokémon</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {popular.map((p) => (
                <Link
                  key={p.id}
                  href={`/pokemon/${p.id}/`}
                  className="block p-3 rounded-lg border border-border hover:border-primary transition-colors text-center"
                >
                  <div className="font-semibold">#{p.id} {p.name}</div>
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Browse the full list at <Link href="/pokemon/" className="text-primary underline">/pokemon/</Link> or pick any ID 1–1025.
            </p>
          </section>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
