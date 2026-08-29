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

        {/* MASSIVE_SEO_V2 — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Complete Generation Guide — Region, Games, and Pokémon</h2>
          <p>This generation introduced players to a brand new region filled with unique Pokémon, challenging gym leaders, and an engaging storyline. The games in this generation brought significant innovations to the Pokémon franchise, including new gameplay mechanics, battle features, and quality of life improvements that would shape future titles. Whether you are a returning player revisiting this generation for nostalgia or a newcomer experiencing it for the first time, our comprehensive guide covers everything you need to know about the Pokémon, characters, and mechanics that define this era of the franchise.</p>
          <p>The region in this generation is based on a real world location, with geography, culture, and mythology that influence the design of the Pokémon and the story. Each town and city has its own unique atmosphere, from quiet rural villages to bustling metropolises. The routes connecting these locations are filled with wild Pokémon, trainers to battle, and hidden items to discover. As you journey through the region, you will encounter rival trainers, battle against evil teams, uncover legendary Pokémon, and ultimately challenge the Pokémon League to become the champion. The story often touches on themes of friendship, perseverance, and the relationship between humans and Pokémon.</p>
          <p>The starter Pokémon in this generation follow the traditional Grass, Fire, and Water type triangle, giving players a meaningful choice that affects their early game experience. Each starter has unique stats, abilities, and evolution lines that make them viable throughout the entire playthrough. The final evolutions of the starters are often powerful and iconic, making them popular choices for both casual and competitive play. In addition to the starters, this generation introduced many memorable Pokémon including legendaries that play central roles in the game story, as well as common Pokémon that fill out the regional ecosystem and provide variety for team building.</p>
        </section>

        {/* SEO Content — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Notable Pokémon Introduced in This Generation</h2>
          <p>This generation added a significant number of new Pokémon to the National Pokédex, expanding the total count and introducing new type combinations, abilities, and battle mechanics. Among the most notable additions are the legendary and mythical Pokémon, which are often central to the game story and are among the most powerful creatures in the franchise. These legendary Pokémon typically have base stat totals of 580 or higher, with some reaching 680 or even 720. They often have signature moves and unique abilities that are not available to any other Pokémon, making them highly sought after by collectors and competitive players alike.</p>
          <p>In addition to legendaries, this generation introduced many common Pokémon that have become fan favorites. These include early route Pokémon like birds and rodents that are easy to catch and useful in the early game, as well as more powerful Pokémon that require specific conditions to evolve or are found in remote locations. Some Pokémon introduced in this generation have unique type combinations that were not seen before, creating new strategic possibilities for team building. The designs of these Pokémon draw inspiration from real world animals, mythological creatures, and cultural references, giving each one a distinct personality and backstory.</p>
          <p>The Pokémon introduced in this generation have appeared in subsequent games, the animated series, trading card game, and merchandise, cementing their place in Pokémon history. Some have received new forms, Mega Evolutions, or Gigantamax forms in later generations, giving them renewed relevance in the competitive scene. Whether you are completing your National Pokédex, building a competitive team, or just exploring the variety of Pokémon available, this generation offers a rich selection of creatures to discover and use.</p>
        </section>

        {/* SEO Content — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Game Mechanics and Features Introduced</h2>
          <p>Each generation of Pokémon games introduces new mechanics that change how battles work and how players interact with the world. This generation was no exception, bringing several innovations that would become staples of the franchise. These mechanics include new battle formats, new ways to catch and train Pokémon, new items and held effects, and new ways to interact with other players. Understanding these mechanics is essential for getting the most out of your playthrough and for competitive battling.</p>
          <p>One of the most significant additions in this generation was the introduction of new battle mechanics that added depth to Pokémon battles. These include new move categories, new status effects, new weather conditions, and new abilities that can dramatically change the flow of battle. The physical and special split, which was introduced in Generation 4, changed how moves are categorized, making previously underused Pokémon viable and creating new strategic possibilities. Other mechanics like Mega Evolution, Z-Moves, Dynamax, and Terastallize were introduced in later generations and have each had a significant impact on the competitive scene.</p>
          <p>In addition to battle mechanics, this generation also introduced new ways to explore the world and interact with Pokémon. Features like the day and night cycle, weather effects, and seasonal changes affect which Pokémon appear in the wild and how battles play out. Breeding mechanics allow players to create Pokémon with specific IVs, natures, and egg moves, which is essential for competitive play. Online features like trading, battling, and the Global Trade System (GTS) have evolved over the generations, making it easier than ever to connect with other players around the world.</p>
        </section>

        {/* SEO Content — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Competitive Pokémon in This Generation</h2>
          <p>The Pokémon introduced in this generation have had a significant impact on the competitive battling scene. Some Pokémon immediately became top tier picks in competitive play thanks to their high base stats, versatile movepools, and powerful abilities. Others found niches in lower tiers where their specific strengths could be leveraged against the right opponents. Understanding which Pokémon from this generation are viable in competitive play, and how to use them effectively, is key to building a successful competitive team.</p>
          <p>Competitive Pokémon battling is organized into tiers by communities like Smogon University, which maintains tier lists and rule sets for each format. The main tiers are OverUsed (OU), UnderUsed (UU), RarelyUsed (RU), NeverUsed (NU), and PU, with Pokémon being placed in tiers based on their usage and viability. Some legendary and mythical Pokémon are placed in the Uber tier because they are too powerful for standard play. The VGC (Video Game Championships) format, which is the official competitive format endorsed by The Pokémon Company, uses double battles and has its own set of rules and restrictions.</p>
          <p>When building a competitive team using Pokémon from this generation, it is important to consider type synergy, role distribution, and move coverage. A well built team typically includes a mix of physical and special attackers, defensive walls or tanks, and support Pokémon that can set up entry hazards, inflict status conditions, or provide healing. Pokémon from this generation can fill many of these roles, and understanding their strengths and weaknesses is key to using them effectively in battle. Use our Pokémon Comparison Tool to evaluate different Pokémon and find the best fit for your team.</p>
        </section>

        {/* SEO Content — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Tips for Playing Through This Generation</h2>
          <p>If you are playing through this generation for the first time, or revisiting it for a Nuzlocke challenge, here are some tips to help you get the most out of your experience. First, take your time to explore each route and city thoroughly, as there are often hidden items, rare Pokémon, and side quests that are easy to miss. Talk to every NPC you encounter, as many of them will give you useful items, information, or even Pokémon. Second, build a balanced team that covers multiple types for both offense and defense, as this will make your journey much smoother and will prepare you for the Pokémon League challenge.</p>
          <p>When catching Pokémon, consider using different types of Poké Balls for different situations. Ultra Balls have a higher catch rate than standard Poké Balls and are useful for catching stronger Pokémon. Dusk Balls are more effective in caves and at night. Quick Balls have a high catch rate on the first turn of battle. For legendary Pokémon, you may need to use Timer Balls, which become more effective the longer the battle goes on, or Master Balls, which catch any Pokémon without fail. Stock up on healing items like Potions, Super Potions, and Hyper Potions, as well as status healing items like Antidotes, Paralyze Heals, and Awakenings.</p>
          <p>For Nuzlocke challenges, the rules are simple but brutal: you can only catch the first Pokémon you encounter in each route, and any Pokémon that faints is considered dead and must be released or permanently boxed. This adds a significant layer of difficulty to the game, as you cannot simply grind to overpower your opponents. Some tips for Nuzlocke challenges include catching every Pokémon you can, even if you do not plan to use them immediately, as they may be needed later. Keep your team at similar levels to avoid being underleveled for important battles. Use status moves like Thunder Wave and Toxic to weaken strong opponents. And most importantly, do not get too attached to any single Pokémon, as any Pokémon can fall in battle at any time.</p>
        </section>

        {/* SEO Content — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>This Generation in the Pokémon Community</h2>
          <p>The Pokémon community has embraced this generation with enthusiasm, creating a wealth of fan content including fan art, fan fiction, videos, and competitive analyses. Content creators on YouTube, Twitch, and TikTok have produced countless videos about this generation, including playthroughs, Nuzlocke challenges, competitive team building guides, and shiny hunting streams. The community has also created tools and resources like damage calculators, team builders, and strategy guides that help players get the most out of their experience.</p>
          <p>Online communities on Reddit, Discord, and forums provide spaces for fans to discuss this generation, share their experiences, and connect with other players. These communities often host events like tournaments, draft leagues, and shiny hunting competitions that bring fans together. The trading community is also very active, with players trading Pokémon from this generation for rare Pokémon from other generations, event Pokémon, and competitively bred Pokémon with perfect IVs and optimal natures.</p>
          <p>This generation has also had a significant impact on the Pokémon Trading Card Game, with many Pokémon from this generation being featured on popular and valuable cards. The card art often showcases the unique designs and personalities of these Pokémon, making them collectible items for fans. Whether you are a competitive player, a casual fan, or a collector, this generation offers something for everyone, and our tools and guides are designed to help you explore everything it has to offer. Use our Random Pokémon Generator to discover Pokémon from this generation, or browse our complete Pokédex to learn more about each one.</p>
        </section>

        {/* Final push v3 */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Pokémon List and Stats Overview</h2>
          <p>The Pokémon introduced in this generation cover a wide range of types, stats, and abilities, providing diverse options for team building. From common early-route Pokémon that are easy to catch and train, to rare and powerful legendary Pokémon that require specific conditions to encounter, this generation offers something for every type of trainer. The base stat totals of the Pokémon in this generation range from around 200 for the weakest unevolved Pokémon to over 600 for the most powerful legendaries. Understanding the stat distribution of each Pokémon is key to using them effectively in battle, as a Pokémon with high Attack should be used as a physical attacker, while a Pokémon with high Special Defense should be used as a special wall.</p>
          <p>When browsing the Pokémon list for this generation, pay attention to the type combinations, as dual-type Pokémon have unique strengths and weaknesses that can create interesting strategic possibilities. Some type combinations are very common, like Normal and Flying, while others are unique to a single Pokémon. The abilities of each Pokémon are also important to consider, as some abilities can dramatically change how a Pokémon performs in battle. For example, a Pokémon with the ability Intimidate can lower the opponent Attack stat when it enters battle, making it an excellent lead or pivot. A Pokémon with the ability Swift Swim can double its Speed in rain, making it a fast and powerful sweeper on rain teams.</p>
          <p>The Pokémon in this generation have appeared in multiple subsequent games, sometimes receiving new forms, Mega Evolutions, or Gigantamax forms that give them renewed relevance in the competitive scene. Some Pokémon from this generation have become iconic representatives of the franchise, appearing in the animated series, trading card game, and merchandise. Whether you are completing your National Pokédex, building a competitive team, or just exploring the variety of Pokémon available, the Pokémon introduced in this generation offer a rich selection of creatures to discover and use. Use our Random Pokémon Generator to randomly select a Pokémon from this generation, or browse our complete Pokédex to find specific Pokémon by type, ability, or stat distribution.</p>
          <h2>Starter Pokémon and Early Game Choices</h2>
          <p>The starter Pokémon in this generation follow the traditional Grass, Fire, and Water type triangle, giving players a meaningful choice that affects their early game experience. Each starter has unique stats, abilities, and evolution lines that make them viable throughout the entire playthrough. The Grass type starter typically has balanced stats and access to status moves like Leech Seed and Sleep Powder, making it a versatile choice for both offense and support. The Fire type starter typically has high Attack or Special Attack and access to powerful Fire type moves, making it an excellent offensive choice. The Water type starter typically has balanced stats and good defensive typing, making it a reliable choice for any playthrough. The final evolutions of the starters are often powerful and iconic, making them popular choices for both casual and competitive play.</p>
          <p>In addition to the starters, the early routes of this generation are filled with common Pokémon that are easy to catch and useful in the early game. These include bird Pokémon like Pidgey and Starly that are useful for their Fly HM move, rodent Pokémon like Rattata and Bidoof that are useful for their HM moves, and bug Pokémon like Caterpie and Weedle that evolve quickly and can be useful in the early gyms. As you progress through the region, you will encounter more powerful Pokémon that require specific conditions to catch, such as Pokémon that only appear at certain times of day, in certain weather conditions, or in specific locations like caves, water routes, and grass patches. Exploring each area thoroughly will help you build a diverse and powerful team.</p>
          <h2>Gym Leaders and Pokémon League</h2>
          <p>The gym leaders in this generation specialize in specific types of Pokémon, challenging players to build a well-rounded team that can handle a variety of type matchups. Each gym leader has a team of Pokémon that are typically around the same level as the player, ensuring that the battles are challenging but fair. Defeating a gym leader rewards the player with a gym badge, which may unlock new HM moves, increase the obedience level of traded Pokémon, or provide other benefits. The gym leaders often have distinct personalities and backstories that add depth to the game narrative, and some gym leaders appear in subsequent games or the animated series.</p>
          <p>After collecting all gym badges, the player can challenge the Pokémon League, which consists of the Elite Four and the Champion. The Elite Four are four powerful trainers who each specialize in a specific type, similar to gym leaders but with much stronger teams. The Champion is the final boss of the game and typically has a diverse team of powerful Pokémon with no specific type specialization. Defeating the Champion makes the player the new Champion of the region and unlocks post-game content, which may include new areas to explore, new Pokémon to catch, and new challenges to overcome. The Pokémon League challenge is the ultimate test of the player team building and battling skills, and preparing for it requires careful planning and strategy.</p>
        </section>

        {/* Final push v4 */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Post-Game Content and Completion</h2>
          <p>After completing the main story and becoming the champion of the region, a wealth of post-game content becomes available for players to enjoy. This typically includes new areas to explore that were previously inaccessible, new Pokémon to catch that were not available during the main story, and new challenges to overcome like the Battle Tower or Battle Frontier. The post-game also often includes side quests, legendary Pokémon encounters, and events that expand on the game story and lore. For completionists, the post-game is where the real challenge begins, as players work to complete their Pokédex, collect all the items, and battle against the toughest trainers in the game.</p>
          <p>The Battle Tower or equivalent battle facility is a staple of the post-game in Pokémon games, offering players the chance to test their skills against increasingly difficult opponents in a format that restricts the use of items and often levels the playing field by setting all Pokémon to the same level. These facilities often have their own ranking system, with players earning Battle Points that can be exchanged for rare items, TMs, and other rewards. Some generations also feature a Battle Frontier, which includes multiple battle facilities with different rules and formats, providing even more variety and challenge for players who want to test their team building and battling skills. Completing the post-game content can take dozens of additional hours and is a major part of the Pokémon experience for many players.</p>
          <p>For players who enjoy breeding and competitive team building, the post-game is also when most of the tools and resources for these activities become available. IV checking, EV training items, and move tutors are often locked behind post-game progression. This means that players who want to build competitively viable teams will need to complete the main story first before they can access all the tools they need. Once these tools are available, players can breed Pokémon with perfect IVs, train them with specific EV spreads, and teach them moves from move tutors to create the perfect competitive team. Our tools, including the Random Team Builder and Pokémon Comparison Tool, can help you plan and optimize your team throughout this process.</p>
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
