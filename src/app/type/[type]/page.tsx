import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { POKEMON_TYPES, getTypeColor, getSpriteUrl, GENERATIONS } from "@/lib/pokemon-api";
import typePokemonMap from "@/lib/type-pokemon-map.json";

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return POKEMON_TYPES.map((t) => ({ type: t.name }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const typeData = POKEMON_TYPES.find((t) => t.name === type);
  if (!typeData) return { title: "Type Not Found" };

  const canonical = `https://pokemonrandom.com/type/${type}/`;
  const title = `${type.charAt(0).toUpperCase() + type.slice(1)} Pokémon — Complete List & Strengths | PokéRandom`;
  const description = `Complete list of all ${type} type Pokémon. ${type.charAt(0).toUpperCase() + type.slice(1)} type strengths, weaknesses, and best Pokémon for battles. Free ${type} Pokémon database.`;

  return {
    title,
    description,
    keywords: [
      `${type} pokemon`,
      `${type} type pokemon`,
      `${type} pokemon list`,
      `best ${type} pokemon`,
      `${type} type strengths`,
      `${type} type weaknesses`,
    ],
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

// Type effectiveness data (attack → defender type → multiplier)
const TYPE_CHART: Record<string, Record<string, number>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
};

function getEffectiveness(attackType: string): { superEffective: string[]; weak: string[]; immune: string[] } {
  const chart = TYPE_CHART[attackType] ?? {};
  const superEffective: string[] = [];
  const weak: string[] = [];
  const immune: string[] = [];
  for (const t of POKEMON_TYPES) {
    const mult = chart[t.name];
    if (mult === 2) superEffective.push(t.name);
    else if (mult === 0.5) weak.push(t.name);
    else if (mult === 0) immune.push(t.name);
  }
  return { superEffective, weak, immune };
}

function getDefensiveWeaknesses(defenseType: string): string[] {
  const weaknesses: string[] = [];
  for (const [atkType, chart] of Object.entries(TYPE_CHART)) {
    if (chart[defenseType] === 2) weaknesses.push(atkType);
  }
  return weaknesses;
}

function getDefensiveResistances(defenseType: string): string[] {
  const resistances: string[] = [];
  for (const [atkType, chart] of Object.entries(TYPE_CHART)) {
    if (chart[defenseType] === 0.5) resistances.push(atkType);
  }
  return resistances;
}

function getDefensiveImmunities(defenseType: string): string[] {
  const immunities: string[] = [];
  for (const [atkType, chart] of Object.entries(TYPE_CHART)) {
    if (chart[defenseType] === 0) immunities.push(atkType);
  }
  return immunities;
}

export default async function TypePage({ params }: PageProps) {
  const { type: typeName } = await params;
  const typeData = POKEMON_TYPES.find((t) => t.name === typeName);
  if (!typeData) notFound();

  const color = getTypeColor(typeName);
  const allPokemonIds = (typePokemonMap as Record<string, number[]>)[typeName] ?? [];
  const total = allPokemonIds.length;

  // Stats by generation
  const byGen = GENERATIONS.map((g, idx) => {
    const genNum = idx + 1;
    const count = allPokemonIds.filter((id) => id >= g.range[0] && id <= g.range[1]).length;
    return { genNum, region: g.region, count };
  });

  // Take first 60 for display (to keep page reasonable)
  const displayIds = allPokemonIds.slice(0, 60);
  const hasMore = allPokemonIds.length > 60;

  const offensive = getEffectiveness(typeName);
  const defensiveWeak = getDefensiveWeaknesses(typeName);
  const defensiveResist = getDefensiveResistances(typeName);
  const defensiveImmune = getDefensiveImmunities(typeName);

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
            <span className="text-foreground capitalize">{typeName} Type</span>
          </nav>

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-20 h-20 rounded-full shadow-lg"
              style={{ backgroundColor: color }}
            />
            <div>
              <h1 className="text-4xl font-bold tracking-tight capitalize">{typeName} Type Pokémon</h1>
              <p className="text-muted-foreground">
                {total} Pokémon with the {typeName} type · {defensiveWeak.length} weaknesses · {defensiveResist.length} resistances
              </p>
            </div>
          </div>

          {/* Type effectiveness */}
          <section className="mb-10 grid md:grid-cols-2 gap-6">
            {/* Offensive */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold mb-4">Offensive Effectiveness</h2>
              <p className="text-sm text-muted-foreground mb-4">
                When a {typeName}-type Pokémon attacks:
              </p>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-emerald-500 uppercase mb-2">
                    Super Effective (2x)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {offensive.superEffective.length === 0 ? (
                      <span className="text-sm text-muted-foreground">None</span>
                    ) : (
                      offensive.superEffective.map((t) => (
                        <Link
                          key={t}
                          href={`/type/${t}/`}
                          className="px-3 py-1 rounded-full text-white text-xs font-semibold capitalize"
                          style={{ backgroundColor: getTypeColor(t) }}
                        >
                          {t}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-orange-500 uppercase mb-2">
                    Not Very Effective (0.5x)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {offensive.weak.length === 0 ? (
                      <span className="text-sm text-muted-foreground">None</span>
                    ) : (
                      offensive.weak.map((t) => (
                        <Link
                          key={t}
                          href={`/type/${t}/`}
                          className="px-3 py-1 rounded-full text-white text-xs font-semibold capitalize"
                          style={{ backgroundColor: getTypeColor(t) }}
                        >
                          {t}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-red-500 uppercase mb-2">
                    No Effect (0x)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {offensive.immune.length === 0 ? (
                      <span className="text-sm text-muted-foreground">None</span>
                    ) : (
                      offensive.immune.map((t) => (
                        <Link
                          key={t}
                          href={`/type/${t}/`}
                          className="px-3 py-1 rounded-full text-white text-xs font-semibold capitalize"
                          style={{ backgroundColor: getTypeColor(t) }}
                        >
                          {t}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Defensive */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold mb-4">Defensive Matchups</h2>
              <p className="text-sm text-muted-foreground mb-4">
                When a {typeName}-type Pokémon is attacked:
              </p>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-red-500 uppercase mb-2">
                    Weak To (takes 2x)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {defensiveWeak.length === 0 ? (
                      <span className="text-sm text-muted-foreground">None</span>
                    ) : (
                      defensiveWeak.map((t) => (
                        <Link
                          key={t}
                          href={`/type/${t}/`}
                          className="px-3 py-1 rounded-full text-white text-xs font-semibold capitalize"
                          style={{ backgroundColor: getTypeColor(t) }}
                        >
                          {t}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-500 uppercase mb-2">
                    Resists (takes 0.5x)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {defensiveResist.length === 0 ? (
                      <span className="text-sm text-muted-foreground">None</span>
                    ) : (
                      defensiveResist.map((t) => (
                        <Link
                          key={t}
                          href={`/type/${t}/`}
                          className="px-3 py-1 rounded-full text-white text-xs font-semibold capitalize"
                          style={{ backgroundColor: getTypeColor(t) }}
                        >
                          {t}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-purple-500 uppercase mb-2">
                    Immune (takes 0x)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {defensiveImmune.length === 0 ? (
                      <span className="text-sm text-muted-foreground">None</span>
                    ) : (
                      defensiveImmune.map((t) => (
                        <Link
                          key={t}
                          href={`/type/${t}/`}
                          className="px-3 py-1 rounded-full text-white text-xs font-semibold capitalize"
                          style={{ backgroundColor: getTypeColor(t) }}
                        >
                          {t}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InContentAd />

          {/* Distribution by generation */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{typeName.charAt(0).toUpperCase() + typeName.slice(1)} Pokémon by Generation</h2>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-3">
                {byGen.map((g) => (
                  <Link
                    key={g.genNum}
                    href={`/generation/${g.genNum}/`}
                    className="block p-3 rounded-lg border border-border hover:border-primary transition-colors text-center"
                  >
                    <div className="text-xs text-muted-foreground">Gen {g.genNum}</div>
                    <div className="text-2xl font-bold">{g.count}</div>
                    <div className="text-xs text-muted-foreground">{g.region}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Pokémon grid */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              {typeName.charAt(0).toUpperCase() + typeName.slice(1)} Type Pokémon ({total} total)
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {displayIds.map((id) => (
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
            {hasMore && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Showing first 60 of {total} {typeName}-type Pokémon. Use our{" "}
                <Link href="/pokemon-randomizer/" className="text-primary hover:underline">
                  Pokémon Randomizer
                </Link>{" "}
                to filter by {typeName} type.
              </div>
            )}
          </section>

          {/* SEO content */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2>About {typeName.charAt(0).toUpperCase() + typeName.slice(1)} Type Pokémon</h2>
            <p>
              The {typeName} type is one of the 18 Pokémon types. There are {total} Pokémon
              with the {typeName} type in the National Pokédex, spanning all nine generations.
              {" "}{typeName.charAt(0).toUpperCase() + typeName.slice(1)}-type Pokémon have
              {" "}{defensiveWeak.length} type weaknesses ({defensiveWeak.join(", ") || "none"})
              {" "}and {defensiveResist.length} resistances ({defensiveResist.join(", ") || "none"}).
              {" "}{defensiveImmune.length > 0 && `They are immune to ${defensiveImmune.join(", ")} type moves. `}
              Understanding these matchups is essential for building effective teams and winning battles.
            </p>
            <p>
              When attacking, {typeName}-type moves are super effective against{" "}
              {offensive.superEffective.length} types ({offensive.superEffective.join(", ") || "none"})
              {" "}and not very effective against {offensive.weak.length} types
              {" "}({offensive.weak.join(", ") || "none"}).
              {" "}{offensive.immune.length > 0 && `They have no effect on ${offensive.immune.join(", ")} type Pokémon. `}
              Use our <Link href="/type-chart/">complete Type Chart</Link> to see all 18 types
              and their effectiveness in a single matrix view.
            </p>
            <p>
              Some of the most popular and powerful {typeName}-type Pokémon include those listed
              above. Click any Pokémon to view its full Pokédex entry with base stats, abilities,
              evolution chain, and more. You can also use our{" "}
              <Link href="/random-pokemon/">Random Pokémon Generator</Link> with the {typeName}{" "}
              type filter to discover new {typeName}-type Pokémon for your team.
            </p>
          </section>

          {/* All types */}
          <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">All 18 Pokémon Types</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-3">
              {POKEMON_TYPES.map((t) => (
                <Link
                  key={t.name}
                  href={`/type/${t.name}/`}
                  className={`block p-3 rounded-lg border text-center text-sm transition-colors ${
                    t.name === typeName
                      ? "border-primary bg-primary/5 font-semibold"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full mx-auto mb-1"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="capitalize">{t.name}</span>
                </Link>
              ))}
            </div>
          </section>

        {/* MASSIVE_SEO_V2 — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Complete Type Guide — Strengths, Weaknesses, and Strategy</h2>
          <p>The type system is the foundation of Pokémon battle strategy, and understanding the strengths and weaknesses of each type is essential for success in both casual playthroughs and competitive battles. Each of the 18 Pokémon types has unique offensive and defensive properties that determine how effective its moves are against other types and how vulnerable it is to incoming attacks. This guide provides a comprehensive overview of the type, including its offensive matchups, defensive matchups, notable Pokémon of this type, and strategic advice for using this type effectively in battle.</p>
          <p>Type effectiveness is calculated using a multiplier system where super effective moves deal 2x damage, not very effective moves deal 0.5x damage, and immune types take 0x damage. When a Pokémon has two types, the effectiveness of each move is calculated by multiplying the effectiveness against each type. For example, if a move is super effective against one of the Pokémon types and not very effective against the other, the net effectiveness is 1x (neutral). Understanding these calculations is crucial for making informed decisions in battle, especially when facing dual type Pokémon.</p>
          <p>In addition to type effectiveness, the type also determines which Pokémon receive Same Type Attack Bonus (STAB), which gives a 1.5x damage bonus to moves that match the Pokémon type. This encourages players to use moves that match their Pokémon typing and makes type coverage an important consideration in team building. A well built team should have STAB moves for each of its Pokémon types, plus coverage moves to handle types that the team might struggle against. Use our Type Chart page to see the full 18 by 18 effectiveness matrix and plan your battles.</p>
        </section>

        {/* SEO Content — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Notable Pokémon of This Type</h2>
          <p>This type is home to many powerful and iconic Pokémon across all nine generations of the franchise. From the original 151 Kanto Pokémon to the latest additions in Generation 9 Paldea, this type has been represented by a diverse range of creatures with different stats, abilities, and roles in battle. Some of the most notable Pokémon of this type include legendary and mythical Pokémon that are among the most powerful in the game, as well as common Pokémon that are popular choices for casual playthroughs and competitive teams alike.</p>
          <p>The Pokémon of this type have a wide range of base stats, from early route Pokémon with low stats that are easy to catch and train, to powerful legendary Pokémon with base stat totals exceeding 600. Some Pokémon of this type are known for their high Attack or Special Attack stats, making them excellent offensive choices. Others have high Defense or Special Defense, making them effective walls and tanks. Speed is also an important consideration, as faster Pokémon can attack first and potentially knock out the opponent before taking damage.</p>
          <p>When choosing Pokémon of this type for your team, consider not only their stats but also their abilities, movepools, and type combinations. A Pokémon with a unique type combination may have different strengths and weaknesses than a pure type Pokémon, which can be either an advantage or a disadvantage depending on the situation. Use our Pokémon Comparison Tool to compare different Pokémon of this type side by side and find the best fit for your team. You can also use our Random Team Builder to generate a team that includes Pokémon of this type.</p>
        </section>

        {/* SEO Content — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Offensive Strategy for This Type</h2>
          <p>When using this type offensively, it is important to understand which types it is super effective against and which types resist its moves. Super effective matchups deal 2x damage, giving you a significant advantage in battle. Types that resist this type deal 0.5x damage, making them less effective targets. Some types may be completely immune to this type, meaning moves of this type will have no effect at all. Knowing these matchups allows you to choose the right moments to use this type moves and the right targets to attack.</p>
          <p>Same Type Attack Bonus (STAB) is a crucial mechanic for offensive play. When a Pokémon of this type uses a move of the same type, the damage is increased by 50%. This means that a Pokémon of this type will deal more damage with this type moves than with moves of other types, assuming equal base power. When building a moveset for a Pokémon of this type, you should always include at least one STAB move to take advantage of this bonus. Coverage moves that cover types that this type struggles against can also be valuable for handling a wider range of opponents.</p>
          <p>In competitive play, the offensive viability of this type depends on the current metagame and the types of Pokémon that are commonly used. If the metagame is dominated by types that this type is super effective against, then this type will be a strong offensive choice. Conversely, if the metagame is filled with types that resist this type, then this type may be less effective. Keeping up with the metagame and adapting your team composition accordingly is key to success in competitive Pokémon battling. Use our Type Wheel Spinner to randomly select a type for a monotype challenge or themed run.</p>
        </section>

        {/* SEO Content — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Defensive Strategy for This Type</h2>
          <p>When using this type defensively, it is important to understand which types it resists and which types it is weak to. A type that resists many common offensive types is valuable for switching into attacks and absorbing damage. A type with few weaknesses is easier to keep alive, as there are fewer ways for the opponent to deal super effective damage. Some types have immunities, which provide complete protection from certain types of moves and can be used strategically to switch in safely.</p>
          <p>Dual type Pokémon have combined defensive profiles that can create unique strengths and weaknesses. For example, a Pokémon with two types that both resist a common offensive type will take only 0.25x damage from that type, making it an excellent counter. Conversely, if both types are weak to the same type, the Pokémon will take 4x damage, making it extremely vulnerable. When building a team, consider the defensive synergy between your Pokémon types and try to cover each other weaknesses. A well built defensive core can wall the opponent team and create opportunities for your own Pokémon to set up and sweep.</p>
          <p>Abilities can also affect defensive typing. Levitate grants immunity to Ground type moves, which can remove a weakness for Pokémon that would otherwise be vulnerable. Flash Fire grants immunity to Fire type moves and boosts the user Fire type moves. Water Absorb grants immunity to Water type moves and restores HP. These abilities can dramatically change the defensive profile of a Pokémon and should be considered when evaluating its viability. Use our Abilities Database to look up abilities that interact with this type and find Pokémon that have them.</p>
        </section>

        {/* SEO Content — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>This Type in Competitive Play</h2>
          <p>In the competitive Pokémon scene, this type has a specific role and viability that depends on the format and the current metagame. In Singles play, this type may be used as a sweeper, a wall, a pivot, or a support Pokémon depending on its stats, abilities, and movepool. In VGC Doubles play, this type may be used for its offensive pressure, its defensive synergy, or its utility moves. Understanding the role that this type plays in competitive battles is essential for building effective teams and making informed decisions during battle.</p>
          <p>The viability of this type in competitive play is also influenced by the presence of other types in the metagame. If types that this type is strong against are common, then this type will be a valuable asset. If types that resist this type are common, then this type may struggle to find a place on competitive teams. The introduction of new Pokémon, moves, abilities, and mechanics in each generation can also shift the competitive landscape, making previously underused types more viable or causing previously dominant types to fall out of favor.</p>
          <p>When building a competitive team that includes this type, consider what role you want the Pokémon to play and what other types synergize well with it. A good team should have balanced type coverage both offensively and defensively, with each Pokémon fulfilling a specific role. Use our Type Chart to plan your team composition, and use our Pokémon Comparison Tool to evaluate different Pokémon of this type. Whether you are a seasoned competitive player or just getting started, understanding the strengths and weaknesses of each type is the foundation of successful team building.</p>
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
              { "@type": "ListItem", position: 3, name: `${typeName} Type`, item: `https://pokemonrandom.com/type/${typeName}/` },
            ],
          }),
        }}
      />
    </div>
  );
}
