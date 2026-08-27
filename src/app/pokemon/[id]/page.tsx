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
                <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
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

          {/* SEO Content */}
          <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
            <h2>About {name}</h2>
            <p>{name} is a {genus.toLowerCase()} introduced in Generation {gen.num} ({gen.region} region). It is National Pokédex number {id} and has the {primaryType} type{types.length > 1 ? ` combined with ${types[1]}` : ""}.{legendary && " It is classified as a Legendary Pokémon."}{mythical && " It is classified as a Mythical Pokémon."} With a base stat total of {baseStatTotal}, {name} {baseStatTotal > 500 ? "is a powerful Pokémon" : "has balanced stats suitable for various roles"}.</p>
            <h3>Type and Weaknesses</h3>
            <p>As a {types.join("/")} type Pokémon, {name} has specific strengths and weaknesses. Check the full type effectiveness chart on our <Link href="/type-chart/">Type Chart</Link> page.</p>
            <h3>Abilities</h3>
            <p>{name} can have: {abilities.map((a, i) => <span key={a}><strong>{a.replace(/-/g, " ")}</strong>{pokemon.abilities[i].is_hidden && " (Hidden)"}{i < abilities.length - 1 ? ", " : "."}</span>)} Use our <Link href="/random-team/">Team Builder</Link> to find teammates.</p>
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
