import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { PokemonDetailView } from "@/components/pokemon-detail-view";
import {
  fetchPokemon,
  fetchSpecies,
  formatPokemonName,
  formatHeight,
  formatWeight,
  getTypeColor,
  isLegendary,
  getEnglishFlavorText,
  getEnglishGenus,
  getGenderRatio,
  getGenerationById,
  GENERATIONS,
  type Pokemon,
  type PokemonSpecies,
} from "@/lib/pokemon-api";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Pre-generate all 1,025 Pokémon pages
export async function generateStaticParams() {
  return Array.from({ length: 1025 }, (_, i) => ({ id: String(i + 1) }));
}

// Fetch real data at build time for unique SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id) || id < 1 || id > 1025) return { title: "Pokémon Not Found" };

  let name = `Pokémon #${String(id).padStart(4, "0")}`;
  let description = `View Pokémon #${String(id).padStart(4, "0")} from the National Pokédex.`;

  try {
    const [pokemon, species] = await Promise.all([
      fetchPokemon(id),
      fetchSpecies(id),
    ]);
    name = formatPokemonName(pokemon.name);
    const gen = getGenerationById(id);
    const genus = getEnglishGenus(species);
    const types = pokemon.types.map((t) => t.type.name).join("/");
    description = `${name} (${genus}) — National Pokédex #${id}. ${types} type from ${gen.region}. Base stats, abilities, evolution chain, shiny form, and more.`;
  } catch {
    // Fallback to generic if API fails
  }

  const gen = getGenerationById(id);
  const canonical = `https://pokemonrandom.com/pokemon/${id}/`;
  const title = `${name} #${String(id).padStart(4, "0")} — Stats, Type & Abilities`;

  return {
    title,
    description,
    keywords: [
      pokemon_name_lower(name),
      `${name} stats`,
      `${name} type`,
      `${name} abilities`,
      `${name} evolution`,
      `${name} shiny`,
      `pokemon ${id}`,
      `${gen.region} pokemon`,
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        width: 475, height: 475,
        alt: `${name} official artwork`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`],
    },
  };
}

function pokemon_name_lower(name: string): string {
  return name.toLowerCase();
}

const breadcrumbSchema = (id: number, name: string, gen: { name: string; region: string; num: number }) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Pokédex", item: "https://pokemonrandom.com/pokemon/" },
    { "@type": "ListItem", position: 3, name: gen.region, item: `https://pokemonrandom.com/generation/${gen.num}/` },
    { "@type": "ListItem", position: 4, name, item: `https://pokemonrandom.com/pokemon/${id}/` },
  ],
});

const pokemonSchema = (pokemon: Pokemon, species: PokemonSpecies, name: string, gen: { name: string; region: string; num: number }) => ({
  "@context": "https://schema.org",
  "@type": "Thing",
  name,
  description: getEnglishFlavorText(species),
  identifier: `#${String(pokemon.id).padStart(4, "0")}`,
  url: `https://pokemonrandom.com/pokemon/${pokemon.id}/`,
  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
  additionalType: pokemon.types.map((t) => t.type.name).join("/"),
  category: getEnglishGenus(species),
  isPartOf: { "@type": "CreativeWork", name: `Generation ${gen.num} (${gen.region})` },
});

export default async function PokemonDetailPage({ params }: PageProps) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id) || id < 1 || id > 1025) notFound();

  const gen = getGenerationById(id);

  // Try to fetch real data for SSR/SSG content
  let pokemon: Pokemon | null = null;
  let species: PokemonSpecies | null = null;
  let name = `Pokémon #${String(id).padStart(4, "0")}`;
  let types: string[] = [];
  let baseStats: { name: string; value: number }[] = [];
  let abilities: string[] = [];
  let height = "";
  let weight = "";
  let flavorText = "";
  let genus = "";
  let legendary = false;
  let mythical = false;
  let genderRatio = "";

  try {
    [pokemon, species] = await Promise.all([
      fetchPokemon(id),
      fetchSpecies(id),
    ]);
    name = formatPokemonName(pokemon.name);
    types = pokemon.types.map((t) => t.type.name);
    baseStats = pokemon.stats.map((s) => ({ name: s.stat.name, value: s.base_stat }));
    abilities = pokemon.abilities.map((a) => a.ability.name);
    height = formatHeight(pokemon.height);
    weight = formatWeight(pokemon.weight);
    flavorText = getEnglishFlavorText(species);
    genus = getEnglishGenus(species);
    legendary = isLegendary(id) || species.is_legendary;
    mythical = species.is_mythical;
    genderRatio = getGenderRatio(species.gender_rate);
  } catch {
    // Fallback: show client-side view
  }

  const baseStatTotal = baseStats.reduce((sum, s) => sum + s.value, 0);
  const primaryType = types[0] || "normal";
  const typeColor = getTypeColor(primaryType);
  const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const shinyUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;

  // If data fetch failed, fall back to client-side view
  if (!pokemon || !species) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <HeaderBannerAd />
        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/pokemon/" className="hover:text-foreground">Pokédex</Link>
              <span className="mx-2">/</span>
              <Link href={`/generation/${gen.num}/`} className="hover:text-foreground">{gen.region}</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">#{String(id).padStart(4, "0")}</span>
            </nav>
            <InContentAd />
            <PokemonDetailView id={id} />
          </div>
        </main>
        <FooterAd />
        <SiteFooter />
        <MobileAnchorAd />
      </div>
    );
  }

  // Full SSG page with real data
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/pokemon/" className="hover:text-foreground">Pokédex</Link>
            <span className="mx-2">/</span>
            <Link href={`/generation/${gen.num}/`} className="hover:text-foreground">{gen.region}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{name}</span>
          </nav>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono text-muted-foreground">#{String(id).padStart(4, "0")}</span>
                <h1 className="text-4xl font-bold tracking-tight">{name} <span className="text-lg text-muted-foreground font-normal">Pokédex Entry &amp; Stats</span></h1>
                {legendary && <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-950 text-xs font-bold">Legendary</span>}
                {mythical && <span className="px-2 py-0.5 rounded-full bg-pink-400 text-pink-950 text-xs font-bold">Mythical</span>}
              </div>
              <p className="text-muted-foreground">
                {genus} · {gen.name} ({gen.region}) ·
                <Link href={`/type/${primaryType}/`} className="text-primary hover:underline capitalize ml-1">{primaryType} type</Link>
              </p>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-4">
              <div className="rounded-3xl border-2 border-border p-8" style={{ background: `linear-gradient(135deg, ${typeColor}22 0%, transparent 60%)` }}>
                <img src={artworkUrl} alt={`${name} official artwork`} className="w-full h-auto drop-shadow-2xl" width={475} height={475} loading="eager" />
              </div>
              <div className="rounded-2xl border border-border p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-yellow-500 mb-2">Shiny Form</div>
                <img src={shinyUrl} alt={`${name} shiny form`} className="w-32 h-32 mx-auto object-contain" loading="lazy" />
              </div>
            </div>

            <div className="space-y-6">
              {flavorText && (
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Pokédex Entry</div>
                  <p className="text-sm leading-relaxed italic">&ldquo;{flavorText}&rdquo;</p>
                </div>
              )}
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Type</div>
                <div className="flex gap-2 flex-wrap">
                  {types.map((t) => (
                    <Link key={t} href={`/type/${t}/`} className="px-4 py-1.5 rounded-full text-white text-sm font-semibold capitalize shadow-sm hover:scale-105 transition-transform" style={{ backgroundColor: getTypeColor(t) }}>{t}</Link>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-border bg-card p-3 text-center"><div className="text-xs text-muted-foreground">Height</div><div className="font-bold text-lg">{height}</div></div>
                <div className="rounded-xl border border-border bg-card p-3 text-center"><div className="text-xs text-muted-foreground">Weight</div><div className="font-bold text-lg">{weight}</div></div>
                <div className="rounded-xl border border-border bg-card p-3 text-center"><div className="text-xs text-muted-foreground">Base Exp</div><div className="font-bold text-lg">{pokemon.base_experience ?? "—"}</div></div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Abilities</div>
                <div className="flex flex-wrap gap-2">
                  {abilities.map((a, i) => (
                    <span key={a} className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${pokemon.abilities[i].is_hidden ? "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100" : "bg-secondary text-secondary-foreground"}`}>
                      {a.replace(/-/g, " ")}{pokemon.abilities[i].is_hidden && <span className="ml-1 text-xs">(Hidden)</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-3"><div className="text-xs text-muted-foreground">Gender</div><div className="font-semibold text-sm">{genderRatio}</div></div>
                <div className="rounded-xl border border-border bg-card p-3"><div className="text-xs text-muted-foreground">Capture Rate</div><div className="font-semibold text-sm">{species.capture_rate}/255</div></div>
              </div>
            </div>
          </div>

          {/* Base Stats */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Base Stats</h2>
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              {baseStats.map((s) => {
                const labels: Record<string, string> = { hp: "HP", attack: "Attack", defense: "Defense", "special-attack": "Sp. Atk", "special-defense": "Sp. Def", speed: "Speed" };
                const colors: Record<string, string> = { hp: "bg-red-500", attack: "bg-orange-500", defense: "bg-yellow-500", "special-attack": "bg-purple-500", "special-defense": "bg-green-500", speed: "bg-pink-500" };
                const label = labels[s.name] ?? s.name;
                const color = colors[s.name] ?? "bg-gray-500";
                const percent = (s.value / 255) * 100;
                return (
                  <div key={s.name} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-semibold">{label}</div>
                    <div className="w-12 text-sm font-mono text-right">{s.value}</div>
                    <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden"><div className={`h-full ${color} transition-all`} style={{ width: `${percent}%` }} /></div>
                  </div>
                );
              })}
              <div className="flex items-center gap-4 pt-3 border-t border-border">
                <div className="w-20 text-sm font-semibold">Total</div>
                <div className="w-12 text-sm font-mono text-right font-bold">{baseStatTotal}</div>
                <div className="flex-1 text-xs text-muted-foreground">Average: {Math.round(baseStatTotal / 6)} per stat</div>
              </div>
            </div>
          </section>

          <InContentAd />

          {/* SEO Content — expanded with detailed, useful text for users and search engines */}
          <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
            <h2>About {name}</h2>
            <p>{name} is a {genus.toLowerCase()} introduced in Generation {gen.num} ({gen.region} region). It is National Pokédex number {id} and has the {primaryType} type{types.length > 1 ? ` combined with ${types[1]}` : ""}.{legendary && " It is classified as a Legendary Pokémon, meaning it possesses exceptional power and plays a significant role in the lore of the Pokémon world."}{mythical && " It is classified as a Mythical Pokémon, an extremely rare creature that is typically only obtainable through special events or distributions."} With a base stat total of {baseStatTotal}, {name} {baseStatTotal > 500 ? "is a powerful Pokémon that can hold its own in battles against most opponents" : "has balanced stats suitable for various roles in casual play"}. The {genus.toLowerCase()} measures {height} tall and weighs {weight}, placing it in a specific ecological niche within the {gen.region} region.</p>

            <h3>Type Effectiveness and Battle Strategy</h3>
            <p>As a {types.join("/")} type Pokémon, {name} has specific strengths and weaknesses that determine its effectiveness in battle. {types.length > 1 ? `The dual ${types.join("/")} typing gives ${name} a unique defensive profile that can surprise opponents who are not familiar with the matchup. ` : ""}Understanding type matchups is essential for getting the most out of {name} in both casual playthroughs and competitive battles. {primaryType.charAt(0).toUpperCase() + primaryType.slice(1)} type moves deal increased damage to certain types while being resisted by others. To master the full type effectiveness chart and plan your battles, check our comprehensive <Link href="/type-chart/">Type Chart</Link> page which shows all 18 type interactions in an easy to read matrix.</p>

            <h3>Abilities and How to Use Them</h3>
            <p>{name} can have the following abilities: {abilities.map((a, i) => <span key={a}><strong>{a.replace(/-/g, " ")}</strong>{pokemon.abilities[i].is_hidden && " (Hidden Ability)"}{i < abilities.length - 1 ? ", " : "."}</span>)} Each ability alters how {name} performs in battle, and choosing the right one can be the difference between winning and losing a close match. Hidden abilities are typically rarer and often more powerful than the standard ones, making them highly sought after by trainers who want to maximize their Pokémon potential. Use our <Link href="/random-team/">Team Builder</Link> tool to find teammates that synergize well with {name} ability and typing.</p>

            <h3>Base Stats Analysis</h3>
            <p>The base stat total of {baseStatTotal} is distributed across six categories: HP, Attack, Defense, Special Attack, Special Defense, and Speed. {name} highest base stat is {baseStats.length > 0 ? baseStats.reduce((a, b) => a.value > b.value ? a : b).name.replace(/-/g, " ") : "unknown"} with a value of {baseStats.length > 0 ? baseStats.reduce((a, b) => a.value > b.value ? a : b).value : 0}, which {baseStatTotal > 500 ? "makes it a strong choice for battles that favor that stat" : "is decent but not exceptional"}. The average per stat is {Math.round(baseStatTotal / 6)}, which gives a quick overview of the overall power level. Trainers who want to optimize {name} for competitive play should focus on EV training and movesets that complement its strongest stats.</p>

            <h3>Where to Find {name}</h3>
            <p>{name} was first introduced in the {gen.name} games set in the {gen.region} region. In the original games, {name} could be found in specific locations such as grass patches, caves, or water routes depending on its habitat. {legendary || mythical ? `As a ${legendary ? "Legendary" : "Mythical"} Pokémon, ${name} is typically encountered in a special location or event, and there is usually only one available per save file.` : `It is one of the ${gen.num === 1 ? "151" : "common"} Pokémon that trainers can catch during their journey through ${gen.region}.`} The capture rate of {species.capture_rate} out of 255 means {species.capture_rate > 100 ? "it is relatively easy to catch with standard Poké Balls" : "you may need to use stronger Poké Balls or status effects to increase your chances"}. Use our <Link href="/pokemon-search/">Pokémon Search</Link> tool to look up more details about where to find specific Pokémon.</p>

            <h3>Shiny Form and Collectibility</h3>
            <p>Like every Pokémon, {name} has a shiny form with alternate coloring that is extremely rare to encounter in the wild. The shiny version of {name} is shown above for reference. Shiny hunting has become a popular activity in the Pokémon community, with players spending hours using methods like the Masuda Method, chain fishing, or SOS battles to increase their odds of finding a shiny {name}. If you are interested in seeing all shiny forms, our <Link href="/shiny-pokemon/">Shiny Pokémon Checker</Link> lets you browse every shiny variant across all nine generations in one place.</p>

            <h3>Using {name} in Nuzlocke Challenges</h3>
            <p>Nuzlocke challenges are a popular way to add difficulty to Pokémon games by enforcing rules like only catching the first Pokémon encountered in each route and releasing any Pokémon that faints. {name} {baseStatTotal > 450 ? "is a solid choice for Nuzlocke runs thanks to its strong base stats and reliable movepool" : "can be a useful team member in Nuzlocke runs, especially in the early to mid game"}, though its effectiveness depends heavily on the moves it learns and the matchups it faces. If you are planning a Nuzlocke run and want to randomize your encounters, our <Link href="/pokemon-randomizer/">Pokémon Randomizer</Link> tool supports advanced filtering by generation, type, and legendary status.</p>

            <h3>Trivia and Fun Facts</h3>
            <p>{name} is Pokémon number {id} in the National Pokédex, which {id <= 151 ? "places it among the original 151 Kanto Pokémon that started the franchise in 1996" : id <= 251 ? "was introduced in Generation 2 Johto region" : id <= 386 ? "was introduced in Generation 3 Hoenn region" : id <= 493 ? "was introduced in Generation 4 Sinnoh region" : id <= 649 ? "was introduced in Generation 5 Unova region" : id <= 721 ? "was introduced in Generation 6 Kalos region" : id <= 809 ? "was introduced in Generation 7 Alola region" : id <= 905 ? "was introduced in Generation 8 Galar region" : "was introduced in Generation 9 Paldea region"}. The {genus.toLowerCase()} has appeared in multiple Pokémon games, the animated series, trading cards, and merchandise. Its design draws inspiration from real world animals, mythology, or concepts that reflect the region it comes from. Fans of the franchise often debate the best designs, strongest battle strategies, and most memorable appearances of each Pokémon across the various media.</p>

            <h3>Related Pokémon and Evolution</h3>
            <p>{name} may be part of an evolution chain, meaning it can evolve into or from another Pokémon when certain conditions are met. Evolution can occur through leveling up, using evolution stones, trading, friendship, or special location based methods. To explore the full evolution tree and discover related Pokémon, browse our complete <Link href="/pokemon/">Pokédex</Link> with all 1,025 Pokémon across all nine generations. You can also use the <Link href="/pokemon-compare/">Pokémon Comparison Tool</Link> to compare {name} side by side with any other Pokémon to see which one has better stats, typing, or abilities for your specific needs.</p>

            <h3>Moves and Movepool</h3>
            <p>{name} can learn a variety of moves through leveling up, Technical Machines (TMs), Hidden Machines (HMs), breeding, and move tutors. The movepool of a Pokémon determines its versatility in battle, as a wider movepool allows it to handle more situations and counter more opponents. {primaryType.charAt(0).toUpperCase() + primaryType.slice(1)} type moves will receive a Same Type Attack Bonus (STAB) of 1.5x damage when used by {name}, making them the primary source of damage output. Status moves like Thunder Wave, Toxic, and Sleep Powder can also be valuable for controlling the pace of battle. To browse all 920+ moves available in the franchise and see which Pokémon can learn each one, visit our <Link href="/moves/">moves database</Link>.</p>

            <h3>Competitive Viability</h3>
            <p>In the competitive Pokémon scene, {name} {baseStatTotal > 550 ? "is highly valued for its exceptional stats and is commonly seen in higher tier play. Its versatility makes it a popular choice for teams that need a reliable" : baseStatTotal > 400 ? "has a niche in mid tier play where its specific strengths can be leveraged against the right opponents. While it may not be a top tier pick, skilled trainers can find success with" : "is considered a lower tier Pokémon that is rarely used in serious competitive play. However, in the hands of a skilled trainer, even lower tier Pokémon can surprise opponents"} {types.length > 1 ? `${types.join(" and ")} type` : `${primaryType} type`} attacker. Competitive battling involves understanding not just individual Pokémon strength but also team synergy, item selection, ability interactions, and move prediction. Many competitive players use tools like Pokémon Showdown to test their teams before committing to official tournaments.</p>

            <h3>In the Anime and Trading Card Game</h3>
            <p>{name} has appeared in the Pokémon animated series and the Pokémon Trading Card Game (TCG), expanding its presence beyond the video games. The anime often features {name} in episodes that highlight its personality, abilities, and relationship with trainers. In the TCG, {name} has been printed on multiple cards with different attacks, HP values, and rarities, making some versions highly sought after by collectors. The cross media presence of Pokémon like {name} is a key reason the franchise has remained popular for over 25 years, with each new generation introducing fresh Pokémon while maintaining the classics that fans love. {legendary || mythical ? `As a ${legendary ? "Legendary" : "Mythical"} Pokémon, ${name} has often been featured prominently in movies and special episodes, playing a central role in storylines that emphasize its rarity and power.` : ""}</p>

            <h3>Tips for Catching and Training</h3>
            <p>If you are trying to catch {name} in the games, there are a few tips that can improve your chances. First, lower its HP to the red zone using moves like False Swipe, which will always leave the target with at least 1 HP. Second, inflict a status condition like Sleep or Paralysis, which significantly increases the catch rate. Third, use the appropriate Poké Ball for the situation: Ultra Balls have a higher catch rate than standard Poké Balls, Dusk Balls work better in caves and at night, and Quick Balls are effective on the first turn of battle. Once you have caught {name}, you can train it by battling wild Pokémon to gain Experience Points (EXP) and level up. EV training, which involves battling specific Pokémon to boost particular stats, is essential for competitive play. The {genus.toLowerCase()} can also be taught new moves via TMs, move tutors, and breeding.</p>

            <h3>Fun Facts and Trivia</h3>
            <p>Here are some interesting facts about {name}: it is Pokémon number {id} in the National Pokédex, {id <= 151 ? "making it one of the original 151 Kanto Pokémon that have been part of the franchise since 1996" : `introduced in Generation ${gen.num}`}. Its design was created by the team at Game Freak, the studio behind the mainline Pokémon games, and is based on real world animals, mythological creatures, or concepts that reflect the region it comes from. The name {name} is a portmanteau or reference that often relates to its appearance, type, or behavior. Pokémon names vary across different languages, with each localization team adapting the name to fit the cultural context while maintaining the spirit of the original. The {genus.toLowerCase()} has been featured in various Pokémon media including the games, anime, manga, and merchandise, contributing to its recognition among fans worldwide.</p>
          </section>

          <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <Link href="/random-pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Random Pokémon</div><div className="text-muted-foreground">Generate any</div></Link>
              <Link href="/random-team/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Team Builder</div><div className="text-muted-foreground">Build a team</div></Link>
              <Link href="/pokemon-quiz/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Quiz</div><div className="text-muted-foreground">Test knowledge</div></Link>
              <Link href="/type-chart/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Type Chart</div><div className="text-muted-foreground">All 18 types</div></Link>
              <Link href="/shiny-pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Shiny Checker</div><div className="text-muted-foreground">Browse shiny</div></Link>
              <Link href="/pokemon-randomizer/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Randomizer</div><div className="text-muted-foreground">Nuzlocke</div></Link>
            </div>
          </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(id, name, gen)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pokemonSchema(pokemon, species, name, gen)) }} />
    </div>
  );
}
