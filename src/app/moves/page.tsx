import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { fetchMoveList, formatMoveName, extractPokemonIdFromUrl } from "@/lib/move-api";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const canonical = "https://pokemonrandom.com/moves/";
  const title = "Pokémon Moves Database — All 920+ Moves Listed | PokéRandom";
  const description =
    "Complete Pokémon move database with all 920+ moves. Browse by type, power, accuracy, or name. Each move has stats, effects, and Pokémon that can learn it. Free online Pokémon move reference.";

  return {
    title,
    description,
    keywords: [
      "pokemon moves",
      "pokemon move database",
      "pokemon move list",
      "all pokemon moves",
      "pokemon moves by type",
      "pokemon move stats",
      "pokemon move power",
      "pokemon move accuracy",
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
    { "@type": "ListItem", position: 2, name: "Moves", item: "https://pokemonrandom.com/moves/" },
  ],
};

// Group moves by first letter for alphabetical browsing
function groupByLetter(moves: { name: string; url: string }[]): Record<string, { name: string; url: string }[]> {
  const groups: Record<string, { name: string; url: string }[]> = {};
  for (const m of moves) {
    const firstLetter = m.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) groups[firstLetter] = [];
    groups[firstLetter].push(m);
  }
  // Sort each group alphabetically
  for (const key of Object.keys(groups)) {
    groups[key].sort((a, b) => a.name.localeCompare(b.name));
  }
  return groups;
}

export default async function MovesIndexPage() {
  let moves: { name: string; url: string }[] = [];
  try {
    const list = await fetchMoveList(1000);
    moves = list.results;
  } catch (e) {
    console.error("Failed to fetch move list:", e);
  }

  const grouped = groupByLetter(moves);
  const letters = Object.keys(grouped).sort();
  const totalMoves = moves.length;

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
            <span className="text-foreground">Moves</span>
          </nav>

          {/* Header */}
          <h1 className="text-4xl font-bold tracking-tight mb-4">Pokémon Moves Database</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Browse all {totalMoves}+ Pokémon moves from every generation. Each move has its own
            page with power, accuracy, PP, type, effect description, and a complete list of
            Pokémon that can learn it. Click any move to view its full details.
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

          {/* Moves grouped by letter */}
          <div className="space-y-8">
            {letters.map((letter) => (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">
                  {letter} <span className="text-base font-normal text-muted-foreground">({grouped[letter].length} moves)</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {grouped[letter].map((m) => (
                    <Link
                      key={m.name}
                      href={`/moves/${m.name}/`}
                      className="block px-3 py-2 rounded-lg border border-border bg-card hover:border-primary hover:shadow-sm transition-all text-sm"
                    >
                      <span className="font-medium">{formatMoveName(m.name)}</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* SEO content */}
          <section className="mt-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>Complete Pokémon Move Database</h2>
            <p>
              Our Pokémon Moves Database contains all {totalMoves} moves from the main series
              games, spanning all nine generations. Each move has a dedicated page with
              comprehensive information including base power, accuracy, PP (Power Points),
              type, damage class (Physical, Special, or Status), effect description, target,
              priority, and a complete list of Pokémon that can learn the move through
              leveling up, TMs, breeding, or special events.
            </p>
            <p>
              Moves are the attacks and techniques that Pokémon use in battle. There are three
              main categories of moves: <strong>Physical moves</strong> use the attacker&rsquo;s
              Attack stat against the defender&rsquo;s Defense stat; <strong>Special moves</strong>{" "}
              use Special Attack against Special Defense; and <strong>Status moves</strong> do
              not deal direct damage but instead apply status effects, stat changes, or other
              tactical effects. Understanding which moves to teach your Pokémon is crucial for
              building a strong team.
            </p>
            <p>
              When building a competitive team, aim for type coverage — having moves that can
              hit a wide variety of Pokémon types for super effective damage. A common strategy
              is to include at least one STAB (Same Type Attack Bonus) move for each of your
              Pokémon&rsquo;s types, plus coverage moves that handle types your Pokémon would
              otherwise struggle against. Use our{" "}
              <Link href="/type-chart/">Type Chart</Link> to plan your move coverage, and our{" "}
              <Link href="/pokemon-compare/">Pokémon Comparison Tool</Link> to find the best
              Pokémon for each move.
            </p>
            <p>
              All move data is sourced from the official{" "}
              <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer">PokéAPI</a>,
              a community-maintained REST API. Our database is kept up to date with the latest
              Pokémon games and includes moves from Generation 1 (Red/Blue/Yellow) through
              Generation 9 (Scarlet/Violet).
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
                <div className="text-muted-foreground">Build a team of 6</div>
              </Link>
              <Link href="/api-docs/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">API Docs</div>
                <div className="text-muted-foreground">For developers</div>
              </Link>
              <Link href="/blog/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Blog</div>
                <div className="text-muted-foreground">Guides & articles</div>
              </Link>
            </div>

        {/* SEO Content Expanded — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Pokémon Moves Database — All 920+ Moves</h2>
            <h3>The Complete Pokémon Moves Database</h3>
            <p>Our moves database contains all 920+ moves from every generation of the Pokémon franchise. Each move has its own dedicated entry with detailed information including type, category Physical Special or Status, power, accuracy, PP Power Points, and a description of its effect. Moves are the attacks and abilities that Pokémon can use in battle, and understanding the movepool of each Pokémon is essential for building effective teams. You can browse the entire moves list, search for a specific move by name, or filter by type to find moves of a specific type.</p>
            <h3>Physical, Special, and Status Moves</h3>
            <p>Pokémon moves are categorized into three types based on how they interact with the battle stats. Physical moves use the Attack stat of the user and the Defense stat of the target to calculate damage. Examples include Tackle, Earthquake, and Close Combat. Special moves use the Special Attack stat of the user and the Special Defense stat of the target. Examples include Flamethrower, Psychic, and Thunderbolt. Status moves do not deal direct damage but instead apply effects like status conditions Sleep, Paralysis, Burn, Poison, Freeze, stat changes Attack boost, Speed reduction, or weather effects Rain Dance, Sunny Day. Understanding which category a move belongs to is important for team building, as you want to match moves with the appropriate stats of your Pokémon.</p>
            <h3>Move Power and Accuracy</h3>
            <p>Each damaging move has a power value that determines how much damage it deals, and an accuracy value that determines how likely it is to hit. Power values range from 40 weak moves like Tackle to 250 the strongest move, Explosion. Accuracy values range from 0 never hits to 100 always hits. Some moves have variable power or accuracy based on conditions, like Fury Cutter which increases in power with each consecutive hit, or Focus Blast which has high power but low accuracy at 70. When choosing moves for your Pokémon, you should balance power and accuracy, as a powerful move that misses frequently is often less useful than a weaker move that hits reliably.</p>
            <h3>Same Type Attack Bonus STAB</h3>
            <p>Same Type Attack Bonus, or STAB, is a mechanic that gives a 1.5x damage bonus to moves that are the same type as the Pokémon using them. For example, if a Charizard Fire and Flying type uses Flamethrower a Fire type move, the damage is multiplied by 1.5 because Charizard is a Fire type. This encourages players to use moves that match their Pokémon typing and makes type coverage an important consideration in team building. When building a moveset for your Pokémon, you should aim to have at least one STAB move for each of your Pokémon types, plus coverage moves to handle types that your team might struggle against.</p>
            <h3>Status Conditions and Secondary Effects</h3>
            <p>Many moves have secondary effects beyond just dealing damage. Status conditions like Sleep, Paralysis, Burn, Poison, and Freeze can significantly impact the outcome of a battle by disabling a Pokémon, reducing its speed, or dealing damage over time. Some moves have a chance to inflict a status condition as a secondary effect, like Body Slam which has a 30 percent chance to paralyze the target. Other moves have unique effects like stat changes, weather changes, terrain effects, or entry hazards. Understanding the secondary effects of moves is crucial for competitive play, as they can often be more valuable than the raw damage of the move.</p>
            <h3>Move Tutors, TMs, and HMs</h3>
            <p>Pokémon can learn moves through various methods including leveling up, Technical Machines TMs, Hidden Machines HMs, breeding, and move tutors. TMs are consumable items that teach a Pokémon a specific move and have been a staple of the franchise since Generation 1. In Generation 5 and later, TMs became reusable. HMs were similar to TMs but were required to progress through the game as they taught moves that could be used outside of battle, like Surf and Cut. In Generation 7, HMs were replaced by Ride Pokémon. Move tutors are NPCs that teach specific moves, often in exchange for Battle Points or other currencies. Each generation has different move tutors and TMs available, so check our move database to see which Pokémon can learn which moves.</p>
        </section>
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
