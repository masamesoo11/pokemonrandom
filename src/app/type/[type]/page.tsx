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
