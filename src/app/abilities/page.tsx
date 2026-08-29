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
          <h1 className="text-4xl font-bold tracking-tight mb-4">All Pokémon Abilities Explained in Detail</h1>
            {/* CONTENT_OPT_V2 — keyword optimization */}
            <p className="text-lg text-muted-foreground mb-6">Browse our complete Pokémon abilities database with all 298+ abilities from every generation. Each Pokémon ability has a detailed description, effect explanation, and a full list of Pokémon that can have it. The Pokémon abilities database is regularly updated to reflect the latest games and is sourced from the official PokéAPI.</p>

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

        {/* SEO Content Expanded — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Pokémon Abilities Database — All 298+ Abilities</h2>
            <h3>The Complete Pokémon Abilities Database</h3>
            <p>Our abilities database contains all 298+ abilities from every generation of the Pokémon franchise. Abilities are passive effects that were introduced in Generation 3 and have become a core mechanic of the franchise. Every Pokémon has at least one ability, and many have multiple possible abilities with one being their standard ability and others being hidden abilities that are rarer and often more powerful. Each ability has its own dedicated entry with a description of its effect and a list of Pokémon that can have it. You can browse the entire abilities list, search for a specific ability by name, or filter by generation to find abilities introduced in a specific generation.</p>
            <h3>How Abilities Work in Battle</h3>
            <p>Abilities are passive effects that are active as long as the Pokémon with the ability is in battle. Some abilities activate automatically when the Pokémon enters the battle, like Intimidate which lowers the opponent Attack stat. Other abilities are triggered by specific conditions, like Flash Fire which boosts the Pokémon Fire type moves when it is hit by a Fire type attack. Some abilities are always active, like Levitate which grants immunity to Ground type moves, or Huge Power which doubles the Pokémon Attack stat. Understanding how each ability works is essential for competitive play, as the right ability can completely change the dynamic of a battle.</p>
            <h3>Hidden Abilities and How to Get Them</h3>
            <p>Hidden abilities are special abilities that are typically rarer than the standard abilities of a Pokémon. They were introduced in Generation 5 and are often more powerful or more situational than the standard abilities. In the main series games, hidden abilities are usually obtained through special methods like Dream World Generation 5, Friend Safari Generation 6, SOS battles Generation 7, Max Raid Battles Generation 8, or Tera Raid Battles Generation 9. Some Pokémon have hidden abilities that are so different from their standard abilities that they completely change how the Pokémon is used in battle. For example, Greninja hidden ability Protean changes its type to match the move it uses, making it a versatile and unpredictable attacker.</p>
            <h3>Ability Interactions and Combinations</h3>
            <p>Some abilities interact with each other in interesting ways, creating powerful combinations that can dominate battles. For example, the ability Drizzle which summons rain pairs well with Swift Swim which doubles Speed in rain, creating a fast and powerful sweeper. The ability Sand Stream which summons a sandstorm pairs well with Sand Rush which doubles Speed in sandstorm and Sand Force which boosts Ground, Rock, and Steel type moves in sandstorm. The ability Harvest has a 50 percent chance to restore a consumed Berry each turn in sunlight, making it useful for situational strategies. Understanding ability interactions is key to building effective competitive teams.</p>
            <h3>Abilities Introduced in Each Generation</h3>
            <p>Abilities were first introduced in Generation 3 with 76 abilities. Generation 4 added 41 new abilities, Generation 5 added 41 more, Generation 6 introduced 27 new abilities, Generation 7 added 24, Generation 8 brought 32 new abilities, and Generation 9 introduced the latest batch. Some abilities have been added to Pokémon from earlier generations in later games, giving them new strategic options. For example, Clefable gained the Magic Guard ability in Generation 4, which made it a top tier competitive Pokémon. Our abilities database lets you filter by generation to see which abilities were introduced in each generation and which Pokémon can have them.</p>
            <h3>Most Powerful Abilities in Competitive Play</h3>
            <p>Some abilities are considered extremely powerful in competitive play and are often seen on top tier Pokémon. Intimidate is one of the most popular abilities, as it lowers the opponent Attack stat when the Pokémon enters battle, making it useful for pivoting and weakening physical attackers. Protean and its counterpart Libero change the Pokémon type to match the move it uses, giving every move STAB and making the Pokémon very versatile. Huge Power and Pure Power double the Pokémon Attack stat, making otherwise weak Pokémon like Azumarill and Medicham into powerful physical attackers. Weather abilities like Drizzle, Drought, Sand Stream, and Snow Warning summon weather conditions that can benefit the entire team. These are just a few examples of the many powerful abilities in the game.</p>
        </section>
            <h3>Weather Abilities and Weather Teams</h3>
          <p>Weather abilities are abilities that summon or benefit from weather conditions, and they are central to weather based team strategies in competitive play. The four primary weather summoning abilities are Drizzle which summons rain, Drought which summons harsh sunlight, Sand Stream which summons a sandstorm, and Snow Warning which summons hail or snow in Generation 9. These abilities are typically found on powerful Pokémon like Pelipper Drizzle, Torkoal Drought, Tyranitar Sand Stream, and Alolan Ninetales Snow Warning. Weather teams are built around these abilities and include Pokémon that benefit from the weather, like Swift Swim users in rain, Chlorophyll users in sun, Sand Rush users in sandstorm, and Slush Rush users in hail. Weather abilities have become less permanent over the generations, with the weather lasting only 5 turns instead of indefinitely starting in Generation 6.</p>
          <h3>Stat Boosting Abilities</h3>
          <p>Stat boosting abilities are abilities that increase the stats of the Pokémon, often doubling a specific stat. Huge Power and Pure Power are the most notable, as they double the Attack stat of the Pokémon, making otherwise weak Pokémon like Azumarill and Medicham into powerful physical attackers. Gorilla Tactics is a Generation 8 ability that boosts Attack by 50 percent but locks the Pokémon into using only one move. Flash Fire boosts Fire type moves by 50 percent when the Pokémon is hit by a Fire type attack. Solar Power boosts Special Attack by 50 percent in harsh sunlight but drains 1/8 of the maximum HP each turn. Intrepid Sword boosts Attack by 1 stage when the Pokémon enters battle, which is useful for physical attackers. These abilities can dramatically change the damage output of a Pokémon and are highly valued in competitive play.</p>
          <h3>Defensive and Tank Abilities</h3>
          <p>Defensive abilities are abilities that help Pokémon survive longer in battle by reducing damage, preventing status conditions, or providing other defensive benefits. Multiscale is an ability that halves damage taken when the Pokémon is at full HP, making it excellent on bulky Pokémon like Dragonite. Filter and Solid Rock reduce super effective damage by 25 percent. Wonder Guard is an ability that makes the Pokémon immune to all damage except super effective damage, which is famously used by Shedinja. Magic Guard prevents the Pokémon from taking damage from anything except direct attacks, including weather, entry hazards, poison, burn, and recoil. Levitate grants immunity to Ground type moves, which is useful for Pokémon that would otherwise be weak to Ground. These abilities are essential for tank and wall Pokémon that need to survive multiple hits in battle.</p>
          <h3>Speed Control Abilities</h3>
          <p>Speed control abilities are abilities that affect the Speed stat of the Pokémon or the opponent, which is crucial for determining turn order in battle. Swift Swim doubles Speed in rain, making weather teams very fast. Chlorophyll doubles Speed in harsh sunlight. Sand Rush doubles Speed in sandstorm. Slush Rush doubles Speed in hail or snow. Surge Surfer doubles Speed when Electric Terrain is active. Quick Feet doubles Speed when the Pokémon has a status condition. Unburden doubles Speed when the Pokémon consumable held item is used up. Speed Boost increases Speed by 1 stage at the end of each turn. These abilities can turn a slow Pokémon into a fast sweeper and are central to many competitive strategies. Priority abilities like Prankster give status moves +1 priority, allowing the Pokémon to use status moves before the opponent can attack.</p>
          <h3>Immunity and Protection Abilities</h3>
          <p>Immunity abilities are abilities that grant the Pokémon immunity to specific types of moves, status conditions, or other effects. Levitate grants immunity to Ground type moves. Flash Fire grants immunity to Fire type moves and boosts the user Fire type moves. Water Absorb grants immunity to Water type moves and restores 25 percent of the maximum HP when hit by a Water type move. Volt Absorb grants immunity to Electric type moves and restores 25 percent of the maximum HP when hit by an Electric type move. Sap Sipper grants immunity to Grass type moves and boosts the user Attack by 1 stage when hit by a Grass type move. Motor Drive grants immunity to Electric type moves and boosts the user Speed by 1 stage when hit by an Electric type move. Storm Drain grants immunity to Water type moves and boosts the user Special Attack by 1 stage when hit by a Water type move, while also redirecting all Water type moves to the Pokémon in double battles.</p>
          <h3>Contact Damage Abilities</h3>
          <p>Contact damage abilities are abilities that punish the opponent for using contact moves against the Pokémon. Rough Skin and Iron Barbs deal 1/8 of the attacker maximum HP in damage when the Pokémon is hit by a contact move. These abilities are commonly found on bulky Pokémon like Ferrothorn Iron Barbs and Garchomp Rough Skin. Effect Spore has a 30 percent chance to inflict Sleep, Paralysis, or Poison on the attacker when the Pokémon is hit by a contact move. Flame Body and Magma Armor have a 30 percent chance to burn the attacker when the Pokémon is hit by a contact move. Poison Point has a 30 percent chance to poison the attacker when the Pokémon is hit by a contact move. Static has a 30 percent chance to paralyze the attacker when the Pokémon is hit by a contact move. Cute Charm has a 30 percent chance to infatuate the attacker when the Pokémon is hit by a contact move. These abilities make the Pokémon dangerous to attack with contact moves and can wear down physical attackers over time.</p>
          <h3>Entry Hazard Abilities</h3>
          <p>Entry hazard abilities are abilities that set up entry hazards when the Pokémon enters the battle. Toxic Debris is a Generation 9 ability that sets up a layer of Toxic Spikes on the opponent side when the Pokémon is hit by a physical move. This ability is found on Clodsire and Toxapex, making them excellent hazard setters. Other abilities interact with entry hazards in different ways. Magic Bounce reflects entry hazard setting moves back at the opponent, preventing hazards from being set. Heavy Duty Boots is a held item not an ability that makes the wearer immune to entry hazard damage, which is essential for Pokémon that are weak to Stealth Rock. Defiant and Competitive boost Attack or Special Attack by 2 stages when the Pokémon has a stat lowered, which can punish Defog users for trying to remove entry hazards.</p>
          <h3>Ability Removal and Suppression</h3>
          <p>Ability removal and suppression are mechanics that can neutralize the abilities of Pokémon in battle. The moves Skill Swap, Role Play, Entrainment, and Simple Beam can change or replace the ability of a Pokémon. The moves Gastro Acid and Core Enforcer can suppress the ability of the target, making it have no effect. The ability Neutralizing Gas is a Generation 8 ability that suppresses the abilities of all other Pokémon on the field while the Pokémon with Neutralizing Gas is in battle. The ability Mummy is an ability that changes the ability of the attacker to Mummy when the Pokémon is hit by a contact move. These mechanics can be used to neutralize powerful abilities like Intimidate, Multiscale, or Wonder Guard, and are important tools in competitive play for dealing with ability based strategies.</p>
        </section>

        {/* MASSIVE_SEO_V2 — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Ability Mechanics and How They Work</h2>
          <p>Abilities are passive effects that were introduced in Generation 3 and have become a core mechanic of the Pokémon franchise. Every Pokémon has at least one ability, and many have multiple possible abilities. When a Pokémon has multiple possible abilities, one is the standard ability and others may be hidden abilities that are rarer and often more powerful. Abilities are active as long as the Pokémon with the ability is in battle, and they can affect the Pokémon itself, the opponent, the field, or the entire battle. Some abilities activate automatically when the Pokémon enters the battle, while others are triggered by specific conditions or events.</p>
          <p>Understanding how abilities work is essential for competitive play, as the right ability can completely change the dynamic of a battle. For example, Intimidate lowers the opponent Attack stat when the Pokémon enters the battle, which can weaken physical attackers and make it easier for your team to switch in. Levitate grants immunity to Ground type moves, which can remove a weakness for Pokémon that would otherwise be vulnerable. Huge Power doubles the Attack stat of the Pokémon, making otherwise weak Pokémon into powerful physical attackers. Some abilities, like Wonder Guard, are unique to specific Pokémon and can define their entire competitive viability.</p>
          <h2>Weather Abilities and Weather Teams</h2>
          <p>Weather abilities are abilities that summon or benefit from weather conditions, and they are central to weather based team strategies in competitive play. The four primary weather summoning abilities are Drizzle, which summons rain, Drought, which summons harsh sunlight, Sand Stream, which summons a sandstorm, and Snow Warning, which summons hail or snow in Generation 9. These abilities are typically found on specific Pokémon like Pelipper (Drizzle), Torkoal (Drought), Tyranitar (Sand Stream), and Alolan Ninetales (Snow Warning). Weather teams are built around these abilities and include Pokémon that benefit from the weather.</p>
          <p>Rain teams use Drizzle to summon rain, which boosts Water type moves by 50 percent and weakens Fire type moves by 50 percent. Rain teams typically include Swift Swim users, whose Speed is doubled in rain, making them very fast sweepers. Sun teams use Drought to summon harsh sunlight, which boosts Fire type moves and weakens Water type moves. Sun teams typically include Chlorophyll users, whose Speed is doubled in sun, and Fire type attackers that benefit from the boosted Fire type moves. Sand teams use Sand Stream to summon a sandstorm, which deals damage to non-Rock, Ground, and Steel type Pokémon and boosts the Special Defense of Rock type Pokémon. Sand teams typically include Sand Rush users, whose Speed is doubled in sandstorm. Weather abilities have become less permanent over the generations, with the weather lasting only 5 turns instead of indefinitely starting in Generation 6, but they remain a powerful strategy in competitive play.</p>
          <h2>Stat Boosting and Stat Reducing Abilities</h2>
          <p>Some abilities directly affect the stats of the Pokémon or the opponent, providing significant advantages in battle. Huge Power and Pure Power are the most notable stat boosting abilities, as they double the Attack stat of the Pokémon, making otherwise weak Pokémon like Azumarill and Medicham into powerful physical attackers. Gorilla Tactics, introduced in Generation 8, boosts Attack by 50 percent but locks the Pokémon into using only the first move it selects. Intrepid Sword, introduced in Generation 8, boosts Attack by 1 stage when the Pokémon enters the battle.</p>
          <p>On the defensive side, abilities like Multiscale halve damage taken when the Pokémon is at full HP, making it excellent on bulky Pokémon like Dragonite. Filter and Solid Rock reduce super effective damage by 25 percent. Wonder Guard makes the Pokémon immune to all damage except super effective damage, which is famously used by Shedinja. Defiant and Competitive boost Attack or Special Attack by 2 stages when the Pokémon has a stat lowered by the opponent, which can punish Intimidate users and Defog users. Speed boosting abilities like Swift Swim (doubles Speed in rain), Chlorophyll (doubles Speed in sun), Sand Rush (doubles Speed in sandstorm), and Slush Rush (doubles Speed in hail) are essential for weather teams. Unburden doubles Speed when the Pokémon consumable item is used up, making it excellent on setup sweepers.</p>
          <h2>Immunity and Protection Abilities</h2>
          <p>Immunity abilities grant the Pokémon immunity to specific types of moves, status conditions, or other effects, providing significant defensive advantages. Levitate grants immunity to Ground type moves, which is useful for Pokémon that would otherwise be weak to Ground type attacks like Earthquake and Spikes. Flash Fire grants immunity to Fire type moves and boosts the user Fire type moves by 50 percent when hit by a Fire type attack. Water Absorb grants immunity to Water type moves and restores 25 percent of the maximum HP when hit by a Water type move. Volt Absorb grants immunity to Electric type moves and restores 25 percent of the maximum HP when hit by an Electric type move.</p>
          <p>Sap Sipper grants immunity to Grass type moves and boosts the user Attack by 1 stage when hit by a Grass type move. Motor Drive grants immunity to Electric type moves and boosts the user Speed by 1 stage when hit by an Electric type move. Storm Drain grants immunity to Water type moves and boosts the user Special Attack by 1 stage when hit by a Water type move, while also redirecting all Water type moves to the Pokémon in double battles. Lightning Rod redirects Electric type moves to the Pokémon in double battles and boosts the user Special Attack by 1 stage when hit by an Electric type move. These immunity abilities can completely nullify the opponent attempts to deal damage with specific types of moves, making them extremely valuable in both singles and doubles play.</p>
          <h2>Contact Damage and Punishment Abilities</h2>
          <p>Contact damage abilities are abilities that punish the opponent for using contact moves against the Pokémon. Contact moves are moves that require the user to make physical contact with the target, such as Tackle, Close Combat, and Earthquake. Rough Skin and Iron Barbs deal damage equal to 1/8 of the attacker maximum HP when the Pokémon is hit by a contact move. These abilities are commonly found on bulky Pokémon like Ferrothorn (Iron Barbs) and Garchomp (Rough Skin), making them dangerous to attack with contact moves.</p>
          <p>Effect Spore has a 30 percent chance to inflict Sleep, Paralysis, or Poison on the attacker when the Pokémon is hit by a contact move. Flame Body and Magma Armor have a 30 percent chance to burn the attacker when the Pokémon is hit by a contact move. Poison Point has a 30 percent chance to poison the attacker. Static has a 30 percent chance to paralyze the attacker. Cute Charm has a 30 percent chance to infatuate the attacker, which prevents the attacker from attacking 50 percent of the time if the attacker is of the opposite gender. These abilities make the Pokémon dangerous to attack with contact moves and can wear down physical attackers over time. In competitive play, these abilities are often paired with recovery moves and defensive stats to create walls that are difficult to take down without taking significant damage in return.</p>
          <h2>Ability Combinations and Synergies</h2>
          <p>Some abilities interact with each other in interesting ways, creating powerful combinations that can dominate battles. The ability Drizzle, which summons rain, pairs well with Swift Swim, which doubles Speed in rain, creating a fast and powerful sweeper. The ability Sand Stream, which summons a sandstorm, pairs well with Sand Rush, which doubles Speed in sandstorm, and Sand Force, which boosts Ground, Rock, and Steel type moves in sandstorm. The ability Grassy Surge, which summons Grassy Terrain, pairs well with Grassy Glide, which gets +1 priority in Grassy Terrain, creating a priority Grass type attacker.</p>
          <p>Other ability synergies include the combination of Beast Boost, which boosts the highest stat when the Pokémon gets a KO, with fast Pokémon that can sweep through weakened teams. The ability Intimidate pairs well with setup sweepers, as it lowers the opponent Attack, making it easier for the sweeper to set up. The ability Regenerator, which restores 1/3 of the maximum HP when the Pokémon switches out, pairs well with pivot moves like U-Turn and Volt Switch, allowing the Pokémon to deal damage, switch out, and recover HP all in one turn. Understanding ability interactions and building teams with good ability synergy is key to success in competitive Pokémon battling.</p>
          <h2>Hidden Abilities and How to Obtain Them</h2>
          <p>Hidden abilities are special abilities that are typically rarer than the standard abilities of a Pokémon. They were introduced in Generation 5 and are often more powerful or more situational than the standard abilities. In the main series games, hidden abilities are usually obtained through special methods. In Generation 5, hidden abilities were obtained through the Dream World, an online feature that allowed players to catch Pokémon with hidden abilities in a special area. In Generation 6, hidden abilities were obtained through the Friend Safari, a special Safari Zone that gave Pokémon with hidden abilities based on the player Friend Codes.</p>
          <p>In Generation 7, hidden abilities were obtained through SOS battles, where chaining Pokémon of the same species would eventually yield one with its hidden ability. In Generation 8, hidden abilities were obtained through Max Raid Battles, where certain raid encounters had a chance of having the hidden ability. In Generation 9, hidden abilities are obtained through Tera Raid Battles, particularly in high-difficulty raids. Some Pokémon have hidden abilities that are so different from their standard abilities that they completely change how the Pokémon is used in battle. For example, Greninja hidden ability Protean changes its type to match the move it uses, making it a versatile and unpredictable attacker. Similarly, Libero on Cinderace has the same effect, making it a top-tier competitive Pokémon.</p>
        </section>
        {/* Final push v3 */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Building a Team Around Abilities</h2>
          <p>When building a competitive Pokémon team, abilities should be one of the first things you consider. A Pokémon with a powerful ability can punch above its weight class, while a Pokémon with a situational ability may underperform even with excellent base stats. Start by identifying the core strategy of your team — whether it is a weather team, a trick room team, a stall team, or an offensive team — and then select Pokémon whose abilities support that strategy. For example, if you are building a rain team, you will want Pokémon with Drizzle to summon rain, Swift Swim to double Speed in rain, and Water type moves that benefit from the 50 percent damage boost. If you are building a defensive team, you will want abilities like Multiscale, Regenerator, and Magic Guard that help your Pokémon survive longer.</p>
          <p>Ability synergy is also important to consider. Some abilities work well together, creating powerful combinations that can dominate battles. For example, Intimidate pairs well with setup sweepers, as it lowers the opponent Attack stat, making it easier for your sweeper to set up safely. Regenerator pairs well with pivot moves like U-Turn and Volt Switch, allowing the Pokémon to deal damage, switch out, and recover HP all in one turn. Weather summoning abilities pair well with weather-boosted abilities like Swift Swim, Chlorophyll, Sand Rush, and Slush Rush. When selecting Pokémon for your team, consider not only individual ability strength but also how abilities interact with each other to create a cohesive team strategy.</p>
          <p>It is also important to be aware of ability suppression and removal mechanics when building a team. The move Gastro Acid can suppress the ability of the target, making it have no effect. The move Skill Swap can swap the abilities of the user and the target. The ability Neutralizing Gas, introduced in Generation 8, suppresses the abilities of all other Pokémon on the field while the Pokémon with Neutralizing Gas is in battle. The ability Mummy changes the ability of the attacker to Mummy when the Pokémon is hit by a contact move. These mechanics can neutralize powerful abilities, so having backup strategies that do not rely entirely on abilities is important for competitive success.</p>
        </section>

        {/* Final push v4 */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Abilities in Casual and Competitive Play</h2>
          <p>Abilities play a crucial role in both casual playthroughs and competitive battling, though their impact is felt differently in each context. In casual playthroughs, abilities can make certain Pokémon particularly useful for navigating the game. For example, Pokémon with the ability Intimidate can make wild encounters easier by lowering the opponent Attack stat, while Pokémon with the ability Pickup can find useful items after battles. Abilities like Run Away make it easier to flee from wild battles, while abilities like illuminate increase the encounter rate, which can be useful when searching for specific Pokémon. In casual play, the specific ability of a Pokémon is often less important than its typing and stats, as the game can be completed with almost any team.</p>
          <p>In competitive play, however, abilities are one of the most important factors in determining a Pokémon viability. A Pokémon with a powerful ability like Intimidate, Protosynthesis, or Hadron Engine can be a top-tier pick even with mediocre base stats, while a Pokémon with a useless ability may struggle to find a place on competitive teams regardless of its stats. The introduction of new abilities in each generation can shift the competitive landscape, making previously underused Pokémon viable or causing previously dominant Pokémon to fall out of favor. For example, the introduction of the ability Regenerator in Generation 5 made Slowking and Tangrowth top-tier defensive Pokémon, while the introduction of Protosynthesis and Hadron Engine in Generation 9 made Koraidon and Miraidon the most powerful Pokémon in the format. Understanding which abilities are powerful and how to use them is essential for success in competitive Pokémon battling, and our abilities database is designed to help you do just that.</p>
        </section>

        {/* CONTENT_OPT_V3 — additional keyword density */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Why the Pokémon Abilities Database Matters</h2>
          <p>Our Pokémon abilities database is the most comprehensive resource for learning about Pokémon abilities online. The Pokémon abilities database covers every ability from every generation, making it easy to find information about any Pokémon ability you are looking for. Whether you are researching Pokémon abilities for competitive team building or just want to learn more about how Pokémon abilities work, our Pokémon abilities database has you covered. Each Pokémon ability entry in the database includes a detailed description, the generation it was introduced, and a complete list of Pokémon that can have that ability. The Pokémon abilities database is updated regularly to reflect the latest games and content.</p>
        </section>

        {/* CONTENT_OPT_V4 */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Pokémon Abilities Reference for Trainers</h2>
          <p>This Pokémon abilities reference is built for trainers who need quick, accurate information about any Pokémon ability. The Pokémon abilities listed in our database include standard abilities, hidden abilities, and signature abilities that are unique to specific Pokémon. Each Pokémon ability has been carefully documented with its exact effect, activation conditions, and interactions with other abilities and moves. The Pokémon abilities database is an essential tool for competitive team building, as understanding Pokémon abilities is crucial for predicting battle outcomes and building effective strategies. Browse the Pokémon abilities list alphabetically or search for a specific Pokémon ability to learn how it works and which Pokémon can have it.</p>
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
