import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { GENERATIONS, POKEMON_TYPES, getTypeColor } from "@/lib/pokemon-api";

export const metadata: Metadata = {
  title: "Pokémon Database — Complete Pokédex (1,025 Pokémon) | PokéRandom",
  description:
    "Browse all 1,025 Pokémon from Generation 1 to Generation 9. Complete Pokédex with stats, types, abilities, evolution chains, and shiny forms. Free online Pokémon database.",
  keywords: [
    "pokemon database",
    "pokemon pokedex",
    "all pokemon list",
    "pokemon list by generation",
    "complete pokedex",
    "pokemon stats database",
  ],
  alternates: { canonical: "https://pokemonrandom.com/pokemon/" },
  openGraph: {
    title: "Pokémon Database — Complete Pokédex (1,025 Pokémon) | PokéRandom",
    description:
      "Browse all 1,025 Pokémon from Generation 1 to Generation 9. Complete Pokédex with stats, types, abilities, evolution chains, and shiny forms.",
    url: "https://pokemonrandom.com/pokemon/",
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Pokédex", item: "https://pokemonrandom.com/pokemon/" },
  ],
};

export default function PokemonIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Pokédex</span>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight mb-4">Pokémon Database</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Browse all 1,025 Pokémon from Generation 1 (Kanto) to Generation 9 (Paldea).
            Each entry includes base stats, types, abilities, evolution chains, shiny forms,
            and detailed information. Click any Pokémon to view its full Pokédex entry.
          </p>

          <InContentAd />

          {/* Browse by Generation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Generation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GENERATIONS.map((gen, idx) => {
                const genNum = idx + 1;
                const count = gen.range[1] - gen.range[0] + 1;
                return (
                  <Link
                    key={genNum}
                    href={`/generation/${genNum}/`}
                    className="block p-6 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{gen.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {gen.range[0]}–{gen.range[1]}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      {gen.region} Region · {count} Pokémon
                    </div>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((i) => {
                        const sampleId = gen.range[0] + i;
                        if (sampleId > gen.range[1]) return null;
                        return (
                          <img
                            key={i}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sampleId}.png`}
                            alt={`Pokémon #${sampleId}`}
                            className="w-10 h-10 object-contain"
                            loading="lazy"
                          />
                        );
                      })}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Browse by Type */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {POKEMON_TYPES.map((t) => (
                <Link
                  key={t.name}
                  href={`/type/${t.name}/`}
                  className="block p-4 rounded-xl border border-border text-center hover:scale-105 transition-transform"
                  style={{ backgroundColor: `${t.color}22` }}
                >
                  <div
                    className="w-10 h-10 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: t.color }}
                  />
                  <div className="font-semibold capitalize">{t.name}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Pokémon (starters) */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Pokémon</h2>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-3">
                {[1, 4, 7, 25, 133, 150, 151, 384, 658].map((id) => (
                  <Link
                    key={id}
                    href={`/pokemon/${id}/`}
                    className="flex flex-col items-center p-2 rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                      alt={`Pokémon #${id}`}
                      className="w-16 h-16 object-contain"
                      loading="lazy"
                    />
                    <span className="text-xs text-muted-foreground mt-1">#{String(id).padStart(4, "0")}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/pokemon/1/"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Start browsing from #0001 →
                </Link>
              </div>
            </div>
          </section>

          {/* SEO content */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Complete Pokémon Pokédex</h2>
            <p>
              Our Pokémon database contains all 1,025 Pokémon from the main series games,
              spanning nine generations from Kanto (Generation 1) to Paldea (Generation 9).
              Each Pokémon has its own dedicated page with comprehensive information including
              base stats, type effectiveness, abilities (including hidden abilities), evolution
              chains, shiny forms, flavor text from the games, and much more.
            </p>
            <p>
              Whether you are a competitive battler looking for the perfect Pokémon to add to
              your team, a Nuzlocke challenger planning your next run, or a casual fan wanting
              to learn more about your favorite Pokémon, our Pokédex has everything you need.
              Use the generation filter to explore Pokémon from a specific region, or browse
              by type to find Pokémon that match your playstyle.
            </p>
            <p>
              All data is sourced from the official PokéAPI, ensuring accuracy and
              up-to-date information. Our database is updated regularly as new Pokémon games
              are released and new Pokémon are introduced. Bookmark this page and check back
              often for the latest Pokémon information.
            </p>
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
