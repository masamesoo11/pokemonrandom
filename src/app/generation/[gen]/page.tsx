import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { GENERATIONS, getTypeColor, getSpriteUrl } from "@/lib/pokemon-api";

interface PageProps {
  params: Promise<{ gen: string }>;
}

export async function generateStaticParams() {
  return GENERATIONS.map((_, idx) => ({ gen: String(idx + 1) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { gen: genStr } = await params;
  const genNum = parseInt(genStr, 10);
  if (isNaN(genNum) || genNum < 1 || genNum > 9) return { title: "Generation Not Found" };

  const gen = GENERATIONS[genNum - 1];
  const count = gen.range[1] - gen.range[0] + 1;
  const canonical = `https://pokemonrandom.com/generation/${genNum}/`;
  const title = `Generation ${genNum} (${gen.region}) — ${count} Pokémon List | PokéRandom`;
  const description = `Complete list of all ${count} Generation ${genNum} (${gen.region}) Pokémon. Browse the full ${gen.region} Pokédex with stats, types, and evolution chains.`;

  return {
    title,
    description,
    keywords: [
      `generation ${genNum}`,
      `${gen.region.toLowerCase()} pokemon`,
      `gen ${genNum} pokemon list`,
      `${gen.region.toLowerCase()} pokedex`,
      `pokemon generation ${genNum}`,
    ],
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

const GEN_GAMES: Record<number, string[]> = {
  1: ["Red", "Blue", "Yellow", "FireRed", "LeafGreen", "Let's Go Pikachu/Eevee"],
  2: ["Gold", "Silver", "Crystal", "HeartGold", "SoulSilver"],
  3: ["Ruby", "Sapphire", "Emerald", "Omega Ruby", "Alpha Sapphire"],
  4: ["Diamond", "Pearl", "Platinum", "HeartGold", "SoulSilver", "Brilliant Diamond", "Shining Pearl", "Legends: Arceus"],
  5: ["Black", "White", "Black 2", "White 2"],
  6: ["X", "Y", "Omega Ruby", "Alpha Sapphire"],
  7: ["Sun", "Moon", "Ultra Sun", "Ultra Moon", "Let's Go Pikachu", "Let's Go Eevee"],
  8: ["Sword", "Shield", "Brilliant Diamond", "Shining Pearl", "Legends: Arceus"],
  9: ["Scarlet", "Violet"],
};

const GEN_STORY: Record<number, string> = {
  1: "The Kanto region is where it all began. Players take on the role of a young trainer from Pallet Town, guided by Professor Oak to choose their first Pokémon: Bulbasaur, Charmander, or Squirtle. The journey takes you through eight gyms, culminating in a battle against the Elite Four and your rival. Team Rocket serves as the antagonistic organization, exploiting Pokémon for profit.",
  2: "The Johto region introduced 100 new Pokémon and the concepts of held items, day/night cycles, and Pokémon breeding. Players start in New Bark Town, choosing between Chikorita, Cyndaquil, or Totodile from Professor Elm. The story connects to Kanto, allowing players to travel between both regions after becoming Johto Champion.",
  3: "The Hoenn region brought 135 new Pokémon and double battles. Players choose between Treecko, Torchic, or Mudkip from Professor Birch. The story features Team Aqua and Team Magma, who seek to expand the sea or land respectively, threatening the region's ecological balance.",
  4: "The Sinnoh region introduced 107 new Pokémon and online trading via Nintendo Wi-Fi Connection. Players choose between Turtwig, Chimchar, or Piplup from Professor Rowan. The story involves Team Galactic, who seek to recreate the universe using the legendary Pokémon Dialga, Palkia, or Giratina.",
  5: "The Unova region (based on New York City) introduced 156 new Pokémon, the largest addition to the Pokédex since Generation 1. Players choose between Snivy, Tepig, or Oshawatt. The story features Team Plasma, a controversial organization that claims to liberate Pokémon from trainers, led by the charismatic N and the manipulative Ghetsis.",
  6: "The Kalos region (based on France) introduced 72 new Pokémon and the Fairy type, which rebalanced the type chart by countering Dragon. Players choose between Chespin, Fennekin, or Froakie. The story features Team Flare, who seek to use the ultimate weapon to destroy all life except their own.",
  7: "The Alola region (based on Hawaii) introduced 88 new Pokémon and regional variants, where familiar Pokémon from Kanto took on new forms adapted to the tropical climate. Players choose between Rowlet, Litten, or Popplio. The story replaces traditional gyms with the Island Challenge, and features the Aether Foundation and Team Skull.",
  8: "The Galar region (based on the United Kingdom) introduced 89 new Pokémon and the Dynamax/Gigantamax mechanic, which temporarily enlarges Pokémon. Players choose between Grookey, Scorbunny, or Sobble. The story features Chairman Rose, who seeks to avert an energy crisis by awakening Eternatus, and introduces the Wild Area for open-world exploration.",
  9: "The Paldea region (based on the Iberian Peninsula) introduced 110 new Pokémon and the Terastallize mechanic, which changes a Pokémon's type. Players choose between Sprigatito, Fuecoco, or Quaxly. The story features an open-world structure with three separate storylines: Victory Road, Path of Legends, and Starfall Street, all converging in the post-game Area Zero.",
};

export default async function GenerationPage({ params }: PageProps) {
  const { gen: genStr } = await params;
  const genNum = parseInt(genStr, 10);
  if (isNaN(genNum) || genNum < 1 || genNum > 9) notFound();

  const gen = GENERATIONS[genNum - 1];
  const count = gen.range[1] - gen.range[0] + 1;
  const games = GEN_GAMES[genNum] ?? [];
  const story = GEN_STORY[genNum] ?? "";

  const prevGen = genNum > 1 ? genNum - 1 : null;
  const nextGen = genNum < 9 ? genNum + 1 : null;

  // Build the full list of Pokémon IDs in this generation
  const pokemonIds = Array.from(
    { length: count },
    (_, i) => gen.range[0] + i
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/pokemon/" className="hover:text-foreground">Pokédex</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Generation {genNum}</span>
          </nav>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Generation {genNum} — {gen.region}
              </h1>
              <p className="text-muted-foreground">
                National Pokédex #{gen.range[0]}–#{gen.range[1]} · {count} Pokémon · Games: {games.join(", ")}
              </p>
            </div>
            <div className="flex gap-2">
              {prevGen && (
                <Link
                  href={`/generation/${prevGen}/`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-secondary"
                  title={`Previous: Generation ${prevGen}`}
                >
                  ←
                </Link>
              )}
              {nextGen && (
                <Link
                  href={`/generation/${nextGen}/`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-secondary"
                  title={`Next: Generation ${nextGen}`}
                >
                  →
                </Link>
              )}
            </div>
          </div>

          {/* Story */}
          {story && (
            <section className="mb-10 rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-bold mb-3">About the {gen.region} Region</h2>
              <p className="text-muted-foreground leading-relaxed">{story}</p>
            </section>
          )}

          <InContentAd />

          {/* Pokémon grid */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              All {count} {gen.region} Pokémon
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {pokemonIds.map((id) => (
                <Link
                  key={id}
                  href={`/pokemon/${id}/`}
                  className="flex flex-col items-center p-3 rounded-xl border border-border bg-card hover:border-primary hover:shadow-sm transition-all"
                >
                  <img
                    src={getSpriteUrl(id)}
                    alt={`Pokémon #${id}`}
                    className="w-16 h-16 object-contain"
                    loading="lazy"
                  />
                  <span className="text-xs text-muted-foreground mt-1">#{String(id).padStart(4, "0")}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* SEO content */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Generation {genNum} Pokémon List</h2>
            <p>
              Generation {genNum}, also known as the {gen.region} region, was introduced in the
              Pokémon games {games.join(", ")}. This generation added {count} new Pokémon to the
              National Pokédex, bringing the total from {gen.range[0] - 1} to {gen.range[1]}.
              Each Pokémon in this generation has its own unique stats, types, abilities, and
              evolution chain that you can explore by clicking on any Pokémon above.
            </p>
            <p>
              The {gen.region} region is home to {count} unique Pokémon, including the three
              starter Pokémon that players can choose from at the beginning of their journey.
              This generation also introduced several legendary and mythical Pokémon that
              play key roles in the region&rsquo;s lore and storyline. Use our{" "}
              <Link href="/pokemon-randomizer/">Pokémon Randomizer</Link> to filter by Generation
              {genNum} for Nuzlocke challenges or team building.
            </p>
          </section>

          {/* Related */}
          <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Explore Other Generations</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
              {GENERATIONS.map((g, idx) => {
                const n = idx + 1;
                return (
                  <Link
                    key={n}
                    href={`/generation/${n}/`}
                    className={`block p-3 rounded-lg border text-center text-sm transition-colors ${
                      n === genNum
                        ? "border-primary bg-primary/5 font-semibold"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <div className="font-bold">Gen {n}</div>
                    <div className="text-xs text-muted-foreground">{g.region}</div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
              { "@type": "ListItem", position: 2, name: "Pokédex", item: "https://pokemonrandom.com/pokemon/" },
              { "@type": "ListItem", position: 3, name: `Generation ${genNum}`, item: `https://pokemonrandom.com/generation/${genNum}/` },
            ],
          }),
        }}
      />
    </div>
  );
}
