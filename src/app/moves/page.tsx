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
          <h1 className="text-4xl font-bold tracking-tight mb-4">Every Pokémon Move with Stats and Effects</h1>
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
            <h3>Move Categories and Damage Calculation</h3>
          <p>Understanding how damage is calculated in Pokémon battles is essential for both casual and competitive play. The damage formula takes into account the move power, the attacker Attack or Special Attack stat, the defender Defense or Special Defense stat, type effectiveness, STAB Same Type Attack Bonus, critical hits, weather effects, terrain effects, held items, abilities, and random variance. The base damage is calculated as (((2 * Level / 5 + 2) * Power * A / D) / 50 + 2) * Modifiers, where Level is the attacker level, Power is the move power, A is the attacker Attack or Special Attack, D is the defender Defense or Special Defense, and Modifiers include type effectiveness, STAB, critical hits, weather, burn, and random variance between 0.85 and 1.00. This complex formula means that even small changes in stats or type effectiveness can have a big impact on the final damage dealt.</p>
          <h3>Move Priority and Speed</h3>
          <p>Move priority is a mechanic that determines the order in which moves are executed in battle, regardless of the Pokémon Speed stat. Most moves have a priority of 0, which means they are executed in order of Speed. However, some moves have increased priority, like Quick Attack +1, Extreme Speed +2, Sucker Punch +1, and Bullet Punch +1, which allow slower Pokémon to attack first. Other moves have decreased priority, like Focus Punch -3, Counter -4, and Circle Throw -6, which are executed after most other moves. The move Avalanche and Revenge have priority -4 but deal double damage if the user was hit first. Understanding move priority is crucial for competitive play, as priority moves can be used to pick off weakened opponents or to break through Focus Sashes and Sturdy abilities.</p>
          <h3>Status Moves and Their Effects</h3>
          <p>Status moves are a category of moves that do not deal direct damage but instead apply various effects to the battle. Status moves can inflict status conditions like Sleep, Paralysis, Burn, Poison, and Freeze, which can cripple an opponent Pokémon. Sleep prevents the Pokémon from taking action for 1 to 3 turns. Paralysis reduces Speed by 50 percent and has a 25 percent chance to prevent the Pokémon from moving. Burn reduces Attack by 50 percent and deals 1/8 of the maximum HP in damage each turn. Poison deals 1/8 of the maximum HP in damage each turn, and the badly poisoned condition increases the damage by 1/16 each turn. Freeze prevents the Pokémon from taking action until it thaws, which has a 20 percent chance each turn or can be accelerated by Fire type moves. Status moves can also change stats like Swords Dance which boosts Attack by 2 stages, or Calm Mind which boosts Special Attack and Special Defense by 1 stage each.</p>
          <h3>Entry Hazards and Hazard Control</h3>
          <p>Entry hazards are status moves that affect Pokémon as they switch into battle. The most common entry hazards are Spikes, which deals damage to the opposing Pokémon when they switch in, with up to 3 layers for increasing damage. Toxic Spikes poisons the opposing Pokémon when they switch in, with 2 layers causing badly poisoned status. Stealth Rock deals Rock type damage to the opposing Pokémon when they switch in, with the damage based on the type weakness of the Pokémon. Sticky Web lowers the Speed of the opposing Pokémon by 1 stage when they switch in. Entry hazard control moves include Rapid Spin which removes entry hazards from the user side and deals damage, and Defog which removes entry hazards from both sides and lowers the target evasion. Managing entry hazards is a key skill in competitive play, as they can wear down a team over time and force unfavorable switches.</p>
          <h3>Weather and Terrain Moves</h3>
          <p>Weather and terrain moves are status moves that change the battle environment, affecting all Pokémon on the field. Weather moves include Rain Dance which summons rain for 5 turns, Sunny Day which summons harsh sunlight for 5 turns, Sandstorm which summons a sandstorm for 5 turns, and Hail which summons hail for 5 turns. Rain boosts Water type moves by 50 percent, weakens Fire type moves by 50 percent, and makes Thunder and Hurricane have 100 percent accuracy. Harsh sunlight boosts Fire type moves by 50 percent, weakens Water type moves by 50 percent, and makes Solar Beam not require a charging turn. Sandstorm deals 1/16 of the maximum HP in damage to all Pokémon that are not Rock, Ground, or Steel type, and boosts the Special Defense of Rock type Pokémon by 50 percent. Hail deals 1/16 of the maximum HP in damage to all Pokémon that are not Ice type. Terrain moves include Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain, each with different effects on the Pokémon on the ground.</p>
          <h3>Recovery and Healing Moves</h3>
          <p>Recovery moves are status moves that restore the user HP, allowing them to stay in battle longer. The most common recovery move is Recover, which restores 50 percent of the user maximum HP. Other recovery moves include Soft Boiled, Milk Drink, Slack Off, Roost, and Heal Order, all of which restore 50 percent of the maximum HP. Roost has the additional effect of removing the Flying type from the user for one turn, which can change type effectiveness. Leech Seed is a status move that plants a seed on the target, draining 1/8 of the target maximum HP each turn and restoring it to the user. Giga Drain and Drain Punch are attacking moves that also restore the user HP by 50 percent of the damage dealt. Ingestion moves like Rest put the user to sleep for 2 turns but restore all HP and cure status conditions. Wish is a delayed recovery move that heals the Pokémon on the field 2 turns after it is used.</p>
          <h3>Setup Moves and Sweepers</h3>
          <p>Setup moves are status moves that boost the user stats, preparing them to sweep the opponent team. The most popular setup moves include Swords Dance which boosts Attack by 2 stages, Nasty Plot which boosts Special Attack by 2 stages, Dragon Dance which boosts Attack and Speed by 1 stage each, Calm Mind which boosts Special Attack and Special Defense by 1 stage each, and Quiver Dance which boosts Special Attack, Special Defense, and Speed by 1 stage each. A sweeper is a Pokémon that uses setup moves to boost its stats and then attempts to defeat the entire opponent team in succession. Physical sweepers use Attack boosting moves like Swords Dance, while special sweepers use Special Attack boosting moves like Nasty Plot. Setup sweepers are powerful but can be countered by priority moves, status conditions, and phazing moves like Roar and Whirlwind which force the Pokémon to switch out.</p>
          <h3>Pivot Moves and Switching</h3>
          <p>Pivot moves are moves that allow the user to switch out to another Pokémon after attacking, maintaining momentum and allowing for favorable matchups. The most common pivot moves are U Turn and Volt Switch, which deal damage and then switch the user out. Flip Turn is a Water type pivot move introduced in Generation 8. Parting Shot is a pivot move that lowers the target Attack and Special Attack before switching the user out. Baton Pass is a unique pivot move that passes all stat changes to the Pokémon that switches in, which can be used to pass setup boosts to a sweeper. Teleport was changed in Generation 8 to have priority -6, allowing the user to switch out last and bring in a teammate safely. Pivot moves are essential in competitive play for maintaining momentum and bringing in the right Pokémon for each situation.</p>
          <h3>Protect and Detection Moves</h3>
          <p>Protect and Detect are status moves that protect the user from all effects of the opponent move for one turn, including damage and secondary effects. Protect has 10 PP and 100 percent accuracy on the first use, but the success rate halves with each consecutive use. Detect is functionally identical to Protect but has only 8 PP. Other variants include Spiky Shield which also damages the attacker by 1/8 of their maximum HP, Baneful Bunker which also poisons the attacker, King Shield which lowers the attacker Attack by 1 stage if they use a contact move, and Obstruct which lowers the attacker Defense by 2 stages if they use a contact move. Protect is one of the most widely used moves in competitive play, as it allows the user to scout the opponent moves, waste their PP, protect a teammate in double battles, and stall out weather or terrain effects.</p>
          <h3>Z Moves and Max Moves</h3>
          <p>Z Moves and Max Moves are special move categories introduced in Generation 7 and 8 respectively. Z Moves are powerful single use moves that require a Z Crystal held by the Pokémon. Each type has a corresponding Z Crystal, and each Pokémon can use one Z Move per battle. Z Moves are based on the type of the move they replace, with physical Z Moves using the Attack stat and special Z Moves using the Special Attack stat. Status Z Moves have additional effects, like Z Splash boosting Attack by 3 stages. Max Moves are used by Dynamax Pokémon in Generation 8 and are based on the type of the move they replace. Max Moves always hit and have secondary effects based on their type, like Max Flare setting up harsh sunlight or Max Airstream boosting the user Speed. Each Pokémon can Dynamax for 3 turns per battle, during which their Max Moves are available.</p>
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
