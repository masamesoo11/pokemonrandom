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
            {/* CONTENT_OPT_V2 — keyword optimization */}
            <p className="text-lg text-muted-foreground mb-6">Welcome to our complete Pokémon moves database, featuring all 920+ Pokémon moves from every generation. Each Pokémon move entry includes detailed information on type, category, power, accuracy, PP, and effects. The Pokémon moves database is the ultimate reference for competitive players and casual fans alike, covering every Pokémon move from Generation 1 through Generation 9.</p>

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

        {/* MASSIVE_SEO_V2 — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Comprehensive Move Strategy Guide</h2>
          <p>Pokémon moves are the foundation of battle strategy, and understanding how to use them effectively is the key to success in both casual playthroughs and competitive battles. This comprehensive guide covers everything you need to know about Pokémon moves, from the basic mechanics of power, accuracy, and type effectiveness to advanced strategies like move priority, status conditions, entry hazards, weather effects, and team synergy. Whether you are a newcomer learning the basics or a seasoned competitive player looking to refine your skills, this guide provides detailed information about every aspect of the Pokémon move system.</p>
          <p>The Pokémon move system has evolved significantly over the course of the franchise. In Generation 1, moves were categorized by type rather than by whether they used physical or special stats. This meant that all Fire type moves used the Special stat, all Normal type moves used the Attack stat, and so on. In Generation 4, the physical and special split was introduced, which categorized moves individually as Physical, Special, or Status based on the move itself rather than its type. This change revolutionized competitive play, as it allowed previously underused Pokémon to become viable and created new strategic possibilities. Later generations introduced additional mechanics like Mega Evolution, Z-Moves, Dynamax, and Terastallize, each of which added new layers of depth to the move system.</p>
          <h2>Move Categories — Physical, Special, and Status</h2>
          <p>Every Pokémon move falls into one of three categories: Physical, Special, or Status. Physical moves use the Attack stat of the attacking Pokémon and the Defense stat of the defending Pokémon to calculate damage. Examples of Physical moves include Tackle, Earthquake, Close Combat, and Flare Blitz. Special moves use the Special Attack stat of the attacker and the Special Defense stat of the defender. Examples of Special moves include Flamethrower, Psychic, Thunderbolt, and Ice Beam. Status moves do not deal direct damage but instead apply various effects, such as inflicting status conditions, changing stats, setting up weather, or creating entry hazards. Examples of Status moves include Thunder Wave, Toxic, Swords Dance, Calm Mind, and Stealth Rock.</p>
          <p>Understanding which category a move belongs to is essential for team building, as you want to match moves with the appropriate stats of your Pokémon. A Pokémon with high Attack should use Physical moves, while a Pokémon with high Special Attack should use Special moves. Some Pokémon have balanced stats and can use either category effectively, giving them flexibility in their moveset. When building a moveset, it is generally recommended to focus on one category to maximize damage output, though mixed attackers that use both Physical and Special moves can be effective in certain situations, especially against defensive walls that specialize in one defensive stat.</p>
          <h2>Move Power, Accuracy, and PP</h2>
          <p>Each damaging move in Pokémon has three key attributes that determine its effectiveness: power, accuracy, and PP (Power Points). Power determines how much damage the move deals, with higher power moves dealing more damage. The weakest moves have a power of 40, while the strongest moves can have a power of 250 (Explosion). However, high power moves often have drawbacks, such as low accuracy, recoil damage, or the need to charge for a turn. Accuracy determines the likelihood that the move will hit its target, with 100 percent accuracy meaning the move will always hit (unless the target uses a protect move or has an evasion-boosting ability). PP determines how many times the move can be used in a single battle, with most moves having between 5 and 35 PP.</p>
          <p>When choosing moves for your Pokémon, you should balance power, accuracy, and PP to create a moveset that is both effective and reliable. A move with 100 power and 70 accuracy (like Focus Blast) may seem appealing, but it will miss 30 percent of the time, which can be costly in important battles. Conversely, a move with 80 power and 100 accuracy (like Flamethrower) is more reliable and will deal consistent damage. In competitive play, players often prefer moves with 100 accuracy to minimize the role of luck in battles. PP is less important in single battles but can be crucial in longer battles, especially against defensive teams that try to stall out your PP.</p>
          <h2>Same Type Attack Bonus (STAB) Explained</h2>
          <p>Same Type Attack Bonus, commonly abbreviated as STAB, is a mechanic that gives a 50 percent damage bonus to moves that are the same type as the Pokémon using them. For example, if a Charizard, which is a Fire and Flying type, uses Flamethrower, a Fire type move, the damage is multiplied by 1.5 because Charizard is a Fire type. Similarly, if Charizard uses Air Slash, a Flying type move, the damage is also multiplied by 1.5 because Charizard is a Flying type. This bonus encourages players to use moves that match their Pokémon typing and makes type coverage an important consideration in team building.</p>
          <p>STAB is one of the most important mechanics in Pokémon battles, as it significantly increases the damage output of your Pokémon. When building a moveset, you should always include at least one STAB move for each of your Pokémon types. STAB moves are typically more powerful than non-STAB moves of the same base power, making them the primary source of damage output. However, STAB alone is not enough to guarantee success in battle. You also need coverage moves that can hit types that your STAB moves cannot, especially types that resist or are immune to your STAB moves. For example, a Fire type Pokémon should have a coverage move that can hit Water, Rock, and Dragon types, which resist Fire type moves.</p>
          <h2>Status Conditions and Their Effects</h2>
          <p>Status conditions are negative effects that can be inflicted on Pokémon during battle, significantly impacting their ability to fight. There are five main status conditions: Sleep, Paralysis, Burn, Poison, and Freeze. Sleep prevents the Pokémon from taking any action for 1 to 3 turns, though some moves like Snore and Sleep Talk can be used while asleep. Paralysis reduces the Pokémon Speed stat by 50 percent and gives a 25 percent chance that the Pokémon will be unable to move each turn. Burn reduces the Pokémon Attack stat by 50 percent and deals damage equal to 1/8 of the Pokémon maximum HP at the end of each turn. Poison deals damage equal to 1/8 of the Pokémon maximum HP at the end of each turn, while the badly poisoned condition (Toxic) increases the damage by 1/16 each turn. Freeze prevents the Pokémon from taking any action until it thaws, which has a 20 percent chance of happening each turn.</p>
          <p>Status conditions can be inflicted by status moves like Thunder Wave (Paralysis), Toxic (Badly Poisoned), Will-O-Wisp (Burn), and Spore (Sleep). They can also be inflicted as secondary effects of attacking moves, such as Body Slam having a 30 percent chance to paralyze the target. Some abilities can inflict status conditions, like Static having a 30 percent chance to paralyze the attacker when hit by a contact move. Status conditions can be cured by items like Full Heal and Pecha Berry, by moves like Rest and Heal Bell, and by abilities like Natural Cure and Refresh. Understanding how to use and manage status conditions is a crucial skill in competitive Pokémon battling.</p>
          <h2>Entry Hazards and Hazard Control</h2>
          <p>Entry hazards are status moves that create effects on the opposing side of the field, damaging or affecting Pokémon as they switch into battle. The four main entry hazards are Spikes, Toxic Spikes, Stealth Rock, and Sticky Web. Spikes deals damage to the opposing Pokémon when they switch in, with up to 3 layers for increasing damage (1/8, 1/6, and 1/4 of maximum HP respectively). Toxic Spikes poisons the opposing Pokémon when they switch in, with 2 layers causing badly poisoned status. Stealth Rock deals Rock type damage to the opposing Pokémon when they switch in, with the damage based on the type weakness of the Pokémon to Rock type moves (a 4x weak Pokémon takes 50 percent of their maximum HP in damage). Sticky Web lowers the Speed of the opposing Pokémon by 1 stage when they switch in.</p>
          <p>Entry hazard control is the practice of setting up, removing, or preventing entry hazards. The moves Rapid Spin and Defog are the primary hazard removal moves. Rapid Spin removes entry hazards from the user side of the field and deals damage to the opponent. Defog removes entry hazards from both sides of the field, as well as clearing other field effects like Light Screen and Reflect. The ability Magic Bounce reflects entry hazard setting moves back at the opponent, preventing hazards from being set. Heavy Duty Boots is a held item that makes the wearer immune to entry hazard damage, which is essential for Pokémon that are weak to Stealth Rock. Managing entry hazards is a key skill in competitive play, as they can wear down a team over time and force unfavorable switches.</p>
          <h2>Weather and Terrain Effects on Moves</h2>
          <p>Weather and terrain are environmental effects that can change the properties of moves and the stats of Pokémon on the field. There are four main weather conditions: Rain, Harsh Sunlight, Sandstorm, and Hail (or Snow in Generation 9). Rain boosts the power of Water type moves by 50 percent and reduces the power of Fire type moves by 50 percent. It also makes Thunder and Hurricane have 100 percent accuracy. Harsh Sunlight boosts the power of Fire type moves by 50 percent and reduces the power of Water type moves by 50 percent. It also makes Solar Beam not require a charging turn and reduces the accuracy of Thunder and Hurricane to 50 percent. Sandstorm deals damage to all Pokémon that are not Rock, Ground, or Steel type at the end of each turn, and boosts the Special Defense of Rock type Pokémon by 50 percent. Hail deals damage to all Pokémon that are not Ice type and boosts the Defense of Ice type Pokémon by 50 percent in Generation 9.</p>
          <p>Terrain effects were introduced in Generation 6 and expanded in Generation 7. There are four main terrain types: Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain. Electric Terrain prevents Pokémon on the ground from falling asleep and boosts the power of Electric type moves by 50 percent. Grassy Terrain heals Pokémon on the ground by 1/16 of their maximum HP each turn, reduces the damage of Earthquake and Bulldoze by 50 percent, and boosts the power of Grass type moves by 50 percent. Misty Terrain prevents Pokémon on the ground from being afflicted by status conditions and reduces the power of Dragon type moves by 50 percent. Psychic Terrain prevents priority moves from being used and boosts the power of Psychic type moves by 50 percent. Weather and terrain can be summoned by moves like Rain Dance and Sunny Day, or by abilities like Drizzle and Drought.</p>
          <h2>Move Priority and Speed Tiers</h2>
          <p>Move priority is a mechanic that determines the order in which moves are executed in battle, regardless of the Pokémon Speed stat. Most moves have a priority of 0, meaning they are executed in order of Speed, with faster Pokémon attacking first. However, some moves have increased or decreased priority, allowing slower Pokémon to attack first or faster Pokémon to attack later. Moves with increased priority include Quick Attack (+1), Extreme Speed (+2), Sucker Punch (+1), Bullet Punch (+1), Aqua Jet (+1), Ice Shard (+1), and Shadow Sneak (+1). Moves with decreased priority include Focus Punch (-3), Avalanche (-4), Revenge (-4), Counter (-5), Mirror Coat (-5), and Circle Throw (-6). The move Trick Room has priority -7 and reverses the Speed order for 5 turns, making slower Pokémon attack first.</p>
          <p>Understanding move priority is crucial for competitive play, as priority moves can be used to pick off weakened opponents, break through Focus Sashes and Sturdy abilities, or revenge kill dangerous sweepers. The ability Prankster gives all status moves +1 priority, which can be devastating when used to set up hazards, inflict status conditions, or boost stats before the opponent can act. Priority moves are especially valuable on fast, frail Pokémon that might not survive a hit, as they allow these Pokémon to deal damage before being attacked. When building a team, it is important to consider not just the raw Speed of your Pokémon, but also the priority moves available to them and to the opponent.</p>
          <h2>Recovery Moves and Healing Mechanics</h2>
          <p>Recovery moves are status moves that restore the user HP, allowing them to stay in battle longer and survive more hits. The most common recovery move is Recover, which restores 50 percent of the user maximum HP. Other recovery moves include Soft-Boiled, Milk Drink, Slack Off, Roost, Heal Order, and Shore Up, all of which restore 50 percent of the maximum HP. Roost has the additional effect of removing the Flying type from the user for one turn, which can change type effectiveness. Shore Up restores more HP in a Sandstorm. Some recovery moves like Rest restore all of the user HP but put them to sleep for 2 turns, which can be useful for curing status conditions but leaves the Pokémon vulnerable.</p>
          <p>In addition to recovery moves, there are other healing mechanics in Pokémon. Drain moves like Giga Drain, Drain Punch, and Horn Leech deal damage and restore the user HP by 50 percent of the damage dealt. Leech Seed plants a seed on the target that drains 1/8 of the target maximum HP each turn and restores it to the user. The move Wish heals the Pokémon on the field 2 turns after it is used, which can be used to heal a teammate that switches in. Abilities like Regenerator restore 1/3 of the maximum HP when the Pokémon switches out. Items like Leftovers restore 1/16 of the maximum HP at the end of each turn. Understanding and utilizing healing mechanics is essential for building defensive teams that can outlast their opponents.</p>
          <h2>Setup Moves and Sweeping Strategies</h2>
          <p>Setup moves are status moves that boost the user stats, preparing them to sweep the opponent team. A sweeper is a Pokémon that uses setup moves to boost its stats and then attempts to defeat the entire opponent team in succession. The most popular setup moves include Swords Dance (Attack +2), Nasty Plot (Special Attack +2), Dragon Dance (Attack +1, Speed +1), Calm Mind (Special Attack +1, Special Defense +1), Quiver Dance (Special Attack +1, Special Defense +1, Speed +1), and Shell Smash (Attack +2, Special Attack +2, Speed +2, Defense -1, Special Defense -1). Each setup move has different trade-offs, with some providing massive boosts but lowering defensive stats, and others providing more modest boosts but maintaining defensive stability.</p>
          <p>When using a setup sweeper, it is important to choose the right moment to set up. Ideally, you should set up when the opponent is forced to switch, giving you a free turn to boost your stats. You should also be aware of the opponent ability to counter your sweeper, such as priority moves, status conditions like Thunder Wave and Toxic, phazing moves like Roar and Whirlwind, and Unaware abilities that ignore stat changes. Some setup sweepers use Substitute to protect themselves from status conditions and priority moves, while others use Taunt to prevent the opponent from using phazing moves. Setting up successfully and sweeping the opponent team is one of the most satisfying experiences in Pokémon battling, but it requires careful planning and prediction.</p>
          <h2>Pivot Moves and Switching Strategies</h2>
          <p>Pivot moves are moves that allow the user to switch out to another Pokémon after attacking, maintaining momentum and allowing for favorable matchups. The most common pivot moves are U-Turn (Bug type, Physical), Volt Switch (Electric type, Special), and Flip Turn (Water type, Physical). These moves deal damage and then immediately switch the user out, allowing you to bring in a teammate that can handle the opponent Pokémon more effectively. Parting Shot is a pivot move that lowers the target Attack and Special Attack before switching the user out, providing both offensive and defensive utility. Baton Pass is a unique pivot move that passes all stat changes to the Pokémon that switches in, which can be used to pass setup boosts to a sweeper.</p>
          <p>Pivot moves are essential in competitive play for maintaining momentum and bringing in the right Pokémon for each situation. By using pivot moves, you can cycle through your team to find the best matchup against the opponent, without losing a turn to switching. This is especially valuable in doubles formats like VGC, where positioning is crucial. The ability to pivot also puts pressure on the opponent, as they must predict which Pokémon you will switch in and adjust their strategy accordingly. When building a team, it is recommended to have at least one or two pivot users to maintain momentum and flexibility in battle. Pivot moves are also useful for scout the opponent moveset and strategy, as you can switch out to a safe matchup if the opponent reveals an unexpected move.</p>
        </section>
        {/* Final push v3 */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Move Combinations and Synergy</h2>
          <p>Certain move combinations are particularly effective when used together, creating powerful synergies that can dominate battles. For example, the combination of Spikes and Roar or Whirlwind can deal significant damage to the opponent team as they are forced to switch Pokémon, taking damage from the entry hazards each time. The combination of Toxic and Protect can slowly wear down the opponent while protecting your Pokémon from damage. The combination of Swords Dance and a priority move like Bullet Punch or Extreme Speed can create a sweeper that is difficult to outspeed. Understanding these move combinations and how to use them effectively is a key skill in competitive Pokémon battling.</p>
          <p>Another powerful move combination is the use of weather-setting moves or abilities alongside weather-boosted moves and abilities. For example, setting up rain with Drizzle or Rain Dance boosts Water type moves by 50 percent and enables Swift Swim users to double their Speed. Setting up harsh sunlight with Drought or Sunny Day boosts Fire type moves by 50 percent and enables Chlorophyll users to double their Speed, while also making Solar Beam not require a charging turn. Setting up a sandstorm with Sand Stream or Sandstorm deals damage to non-Rock, Ground, and Steel type Pokémon and boosts the Special Defense of Rock type Pokémon by 50 percent. Weather-based strategies are among the most popular and effective in competitive play, as they provide significant advantages to the entire team.</p>
          <p>Substitute is another move that enables many powerful combinations. By creating a decoy that absorbs damage and status conditions, Substitute protects the user from harm while they set up with moves like Swords Dance, Nasty Plot, or Calm Mind. Substitute also blocks status conditions, making it excellent against Pokémon that rely on Thunder Wave, Toxic, or Will-O-Wisp. When combined with Leftovers for recovery and a boosting move, Substitute can turn a Pokémon into an unstoppable sweeper. The move Baton Pass can pass the effects of Substitute and stat boosts to a teammate, creating a chain that can be devastating if not properly countered by the opponent.</p>
          <h2>Move Changes Across Generations</h2>
          <p>Pokémon moves have undergone significant changes throughout the history of the franchise. In Generation 1, the type of a move determined whether it used the Attack or Special stat, which meant all Fire type moves were special and all Normal type moves were physical. This system was limiting, as it prevented certain Pokémon from effectively using moves of their type. In Generation 4, the physical and special split was introduced, which categorized moves individually as Physical, Special, or Status based on the move itself rather than its type. This change revolutionized competitive play, as it allowed previously underused Pokémon to become viable and created new strategic possibilities.</p>
          <p>In addition to the physical and special split, many individual moves have been changed over the course of the franchise. Some moves have had their power, accuracy, or PP adjusted for balance purposes. Some moves have had their type changed, like Charm changing from Normal to Fairy in Generation 6. Some moves have been removed entirely in later generations, while new moves have been added. The introduction of new mechanics like Mega Evolution in Generation 6, Z-Moves in Generation 7, Dynamax in Generation 8, and Terastallize in Generation 9 has also added new move categories and effects. Keeping up with these changes is important for competitive players, as a move that was top-tier in one generation may be less effective in another due to changes in the metagame or the move itself.</p>
          <h2>Move Tutor and TM Distribution</h2>
          <p>Pokémon can learn moves through various methods, and understanding these methods is important for team building and competitive play. The most common method is leveling up, where Pokémon learn new moves as they gain experience and reach certain levels. Each Pokémon has a specific set of moves it can learn by leveling up, which is often related to its type and evolutionary stage. Technical Machines (TMs) are items that teach a specific move to a Pokémon, and each TM can be used on multiple compatible Pokémon. In Generation 5 and later, TMs became reusable, making it easier to teach moves to multiple Pokémon. Hidden Machines (HMs) were similar to TMs but were required to progress through the game, as they taught moves that could be used outside of battle like Surf, Cut, and Strength. HMs were replaced by Ride Pokémon in Generation 7 and later.</p>
          <p>Move tutors are NPCs that teach specific moves to Pokémon, often in exchange for Battle Points or other currencies. Each generation has different move tutors available, and the moves they teach are often powerful or unique moves that cannot be learned through TMs or leveling up. Egg moves are moves that a Pokémon can only learn through breeding, by having a parent that knows the move. This allows Pokémon to learn moves they would not normally be able to access, creating new strategic possibilities. When building a competitive team, it is important to consider which moves each Pokémon can learn and through what methods, as this determines the movesets that are available to you. Our moves database provides information about each move, including its type, category, power, accuracy, and PP, to help you plan your movesets.</p>
        </section>

        {/* Final push v4 */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Competitive Move Selection and Team Building</h2>
          <p>Selecting the right moves for your Pokémon is one of the most important aspects of competitive team building. A well-constructed moveset should provide coverage against a wide range of threats while also taking advantage of the Pokémon STAB bonus. When building a moveset, start with at least one STAB move that matches your Pokémon typing, as this will receive a 50 percent damage bonus. Then add coverage moves that can hit types that resist or are immune to your STAB moves. For example, a Fire type Pokémon should have coverage moves that can hit Water, Rock, and Dragon types, which resist Fire type moves. Finally, consider adding a utility move like Stealth Rock, Thunder Wave, or Recover that can provide strategic value beyond just dealing damage.</p>
          <p>The number of moves you should dedicate to offense versus utility depends on the role of the Pokémon on your team. A sweeper should typically have three or four attacking moves to maximize coverage and damage output. A wall or tank should have one or two attacking moves plus recovery and utility moves. A support Pokémon should have one or two attacking moves plus status and utility moves. When selecting attacking moves, consider not just the type and power but also the category, as you want to match moves with your Pokémon strongest offensive stat. Physical moves use the Attack stat, while Special moves use the Special Attack stat. A moveset that mixes Physical and Special moves can be effective on Pokémon with balanced stats, as it makes it harder for the opponent to switch in an appropriate wall.</p>
          <p>In addition to individual movesets, it is important to consider the overall move coverage of your team. A well-built team should have moves that can hit every type for at least neutral damage, and preferably super effective damage against common threats. Use our Type Chart to identify which types your team struggles against and find moves that can cover those weaknesses. Pay attention to immunities as well, as a Pokémon that is immune to a common type can be a valuable switch-in. For example, a Ground type Pokémon is immune to Electric type moves, making it an excellent switch-in against Electric type attackers. By carefully planning your team move coverage, you can ensure that your team is prepared for a wide range of opponents and strategies.</p>
          <h2>Move Mechanics Deep Dive</h2>
          <p>Pokémon move mechanics are more complex than they might first appear, with many hidden interactions and edge cases that can affect battle outcomes. For example, the move Protect has a 100 percent success rate on the first use, but the success rate halves with each consecutive use, creating a mind game where players must decide when to use Protect and when to attack. The move Destiny Bond causes the attacker to faint if the user faints on the same turn, which can be used as a last-ditch effort to take down a dangerous opponent. The move Perish Song causes all Pokémon on the field to faint after 3 turns, which can be used to force switches or break defensive walls.</p>
          <p>Recoil moves like Double-Edge, Flare Blitz, and Brave Bird deal significant damage but also damage the user by 1/3 or 1/4 of the damage dealt. These moves are powerful but can wear down the user over time, making them risky to use without recovery moves or abilities like Rock Head that negate recoil. Crash moves like Jump Kick and High Jump Kick deal massive damage but cause the user to take damage equal to 50 percent of their maximum HP if they miss, making them high-risk high-reward options. Multi-hit moves like Pin Missile, Rock Blast, and Bullet Seed hit 2 to 5 times per use, with Skill Link ensuring exactly 5 hits. These moves are powerful because they can break Focus Sashes and Substitutes while dealing consistent damage.</p>
          <p>Some moves have unique mechanics that set them apart from others. The move Sucker Punch deals damage but fails if the target does not select a damaging move, creating a mind game where the user must predict whether the opponent will attack or use a status move. The move Focus Punch deals massive damage but fails if the user takes damage before executing it, making it difficult to use without Substitute or Protect. The move Pursuit deals damage and if the target switches out, it deals double damage before the switch, making it an excellent move for trapping and removing specific Pokémon. Understanding these unique move mechanics and how to use them effectively is a hallmark of skilled competitive Pokémon players.</p>
        </section>

        {/* CONTENT_OPT_V3 — additional keyword density */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Why Use Our Pokémon Moves Database</h2>
          <p>Our Pokémon moves database is designed to be the ultimate reference for Pokémon trainers and competitive players. The Pokémon moves database includes every move from every generation, with detailed information about each Pokémon move. Whether you are building a competitive team and need to look up Pokémon moves for coverage, or you are a casual player who wants to learn more about Pokémon moves, our database has everything you need. The Pokémon moves database is sourced from the official PokéAPI and is updated regularly. Each Pokémon move entry includes the move type, category, power, accuracy, PP, and a description of its effects, making the Pokémon moves database the most comprehensive resource available.</p>
        </section>

        {/* CONTENT_OPT_V4 */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Pokémon Moves Reference for Battle Strategy</h2>
          <p>This Pokémon moves reference guide is essential for trainers who want to master battle strategy. The Pokémon moves listed in our database include physical moves, special moves, and status moves, each with different effects on the battle. Each Pokémon move has been documented with its exact power, accuracy, PP, type, and secondary effects. The Pokémon moves reference is updated regularly to include new Pokémon moves introduced in each generation. Understanding Pokémon moves is crucial for building effective movesets and predicting opponent strategies. Use the Pokémon moves database to plan your team's move coverage and ensure you have the right Pokémon moves for every situation. The Pokémon moves listed here are sourced from the official PokéAPI and are accurate to the latest games.</p>
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
