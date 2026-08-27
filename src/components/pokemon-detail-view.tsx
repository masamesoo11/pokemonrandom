"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchPokemon,
  fetchSpecies,
  fetchEvolutionChain,
  formatPokemonName,
  formatHeight,
  formatWeight,
  getTypeColor,
  isLegendary,
  getEnglishFlavorText,
  getEnglishGenus,
  getGenderRatio,
  getGenerationById,
  extractIdFromUrl,
  type Pokemon,
  type PokemonSpecies,
  type EvolutionChain,
} from "@/lib/pokemon-api";

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const STAT_COLORS: Record<string, string> = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-yellow-500",
  "special-attack": "bg-purple-500",
  "special-defense": "bg-green-500",
  speed: "bg-pink-500",
};

/**
 * Client-side Pokémon detail view. Fetches data from PokeAPI after hydration.
 * The parent page provides SEO metadata based on the ID alone (no API call).
 */
export function PokemonDetailView({ id }: { id: number }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [p, s] = await Promise.all([
          fetchPokemon(id),
          fetchSpecies(id),
        ]);
        if (cancelled) return;
        setPokemon(p);
        setSpecies(s);
        // Fetch evolution chain in the background (non-blocking)
        fetchEvolutionChain(s.evolution_chain.url)
          .then((ec) => !cancelled && setEvolutionChain(ec))
          .catch(() => {});
      } catch (e) {
        if (!cancelled) setError("Failed to load Pokémon data. Please refresh.");
        console.error(`Failed to fetch Pokémon #${id}:`, e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !pokemon || !species) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error ?? "Pokémon not found"}</p>
        <Link href="/pokemon/" className="text-primary hover:underline">
          ← Back to Pokédex
        </Link>
      </div>
    );
  }

  const name = formatPokemonName(pokemon.name);
  const genus = getEnglishGenus(species);
  const gen = getGenerationById(id);
  const flavorText = getEnglishFlavorText(species);
  const genderRatio = getGenderRatio(species.gender_rate);
  const legendary = isLegendary(id) || species.is_legendary;
  const mythical = species.is_mythical;
  const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const shinyUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`;
  const baseStatTotal = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const maxStat = 255;
  const primaryType = pokemon.types[0]?.type.name ?? "normal";

  // Build evolution list (flattened)
  type EvoNode = { species: { name: string; url: string }; isCurrent: boolean };
  const evolutionList: EvoNode[] = [];
  function traverseEvolutions(node: EvolutionChain["chain"] | null) {
    if (!node) return;
    evolutionList.push({
      species: node.species,
      isCurrent: node.species.name === pokemon.name,
    });
    if ("evolves_to" in node && Array.isArray(node.evolves_to)) {
      for (const evo of node.evolves_to) {
        traverseEvolutions(evo as EvolutionChain["chain"]);
      }
    }
  }
  traverseEvolutions(evolutionChain?.chain ?? null);

  const prevId = id > 1 ? id - 1 : null;
  const nextId = id < 1025 ? id + 1 : null;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-muted-foreground">
              #{String(id).padStart(4, "0")}
            </span>
            <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
            {legendary && (
              <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-950 text-xs font-bold">
                Legendary
              </span>
            )}
            {mythical && (
              <span className="px-2 py-0.5 rounded-full bg-pink-400 text-pink-950 text-xs font-bold">
                Mythical
              </span>
            )}
          </div>
          <p className="text-muted-foreground">
            {genus} · {gen.name} ({gen.region}) ·{" "}
            <Link href={`/type/${primaryType}/`} className="text-primary hover:underline capitalize">
              {primaryType} type
            </Link>
          </p>
        </div>
        <div className="flex gap-2">
          {prevId && (
            <Link
              href={`/pokemon/${prevId}/`}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-secondary transition-colors"
              title={`Previous: #${String(prevId).padStart(4, "0")}`}
            >
              ←
            </Link>
          )}
          {nextId && (
            <Link
              href={`/pokemon/${nextId}/`}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-secondary transition-colors"
              title={`Next: #${String(nextId).padStart(4, "0")}`}
            >
              →
            </Link>
          )}
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-4">
          <div
            className="rounded-3xl border-2 border-border p-8"
            style={{
              background: `linear-gradient(135deg, ${getTypeColor(primaryType)}22 0%, transparent 60%)`,
            }}
          >
            <img
              src={artworkUrl}
              alt={`${name} official artwork`}
              className="w-full h-auto drop-shadow-2xl"
              width={475}
              height={475}
              loading="eager"
            />
          </div>
          <div className="rounded-2xl border border-border p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-yellow-500 mb-2">
              ✨ Shiny Form
            </div>
            <img
              src={shinyUrl}
              alt={`${name} shiny form`}
              className="w-32 h-32 mx-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <div className="space-y-6">
          {flavorText && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Pokédex Entry
              </div>
              <p className="text-sm leading-relaxed italic">&ldquo;{flavorText}&rdquo;</p>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Type
            </div>
            <div className="flex gap-2 flex-wrap">
              {pokemon.types.map((t) => (
                <Link
                  key={t.type.name}
                  href={`/type/${t.type.name}/`}
                  className="px-4 py-1.5 rounded-full text-white text-sm font-semibold capitalize shadow-sm hover:scale-105 transition-transform"
                  style={{ backgroundColor: getTypeColor(t.type.name) }}
                >
                  {t.type.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <div className="text-xs text-muted-foreground">Height</div>
              <div className="font-bold text-lg">{formatHeight(pokemon.height)}</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <div className="text-xs text-muted-foreground">Weight</div>
              <div className="font-bold text-lg">{formatWeight(pokemon.weight)}</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <div className="text-xs text-muted-foreground">Base Exp</div>
              <div className="font-bold text-lg">{pokemon.base_experience ?? "—"}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Abilities
            </div>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((a) => (
                <span
                  key={a.ability.name}
                  className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                    a.is_hidden
                      ? "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {a.ability.name.replace(/-/g, " ")}
                  {a.is_hidden && <span className="ml-1 text-xs">(Hidden)</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-card p-3">
              <div className="text-xs text-muted-foreground">Gender</div>
              <div className="font-semibold text-sm">{genderRatio}</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-3">
              <div className="text-xs text-muted-foreground">Capture Rate</div>
              <div className="font-semibold text-sm">{species.capture_rate}/255</div>
            </div>
          </div>
        </div>
      </div>

      {/* Base Stats */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Base Stats</h2>
        <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
          {pokemon.stats.map((s) => {
            const label = STAT_LABELS[s.stat.name] ?? s.stat.name;
            const color = STAT_COLORS[s.stat.name] ?? "bg-gray-500";
            const percent = (s.base_stat / maxStat) * 100;
            return (
              <div key={s.stat.name} className="flex items-center gap-4">
                <div className="w-20 text-sm font-semibold">{label}</div>
                <div className="w-12 text-sm font-mono text-right">{s.base_stat}</div>
                <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full ${color} transition-all`} style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
          <div className="flex items-center gap-4 pt-3 border-t border-border">
            <div className="w-20 text-sm font-semibold">Total</div>
            <div className="w-12 text-sm font-mono text-right font-bold">{baseStatTotal}</div>
            <div className="flex-1 text-xs text-muted-foreground">
              Average: {Math.round(baseStatTotal / 6)} per stat
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Chain */}
      {evolutionList.length > 1 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Evolution Chain</h2>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {evolutionList.map((evo, idx) => {
                const evoId = extractIdFromUrl(evo.species.url);
                const evoName = formatPokemonName(evo.species.name);
                return (
                  <div key={evo.species.name} className="flex items-center gap-4">
                    {idx > 0 && <span className="text-2xl text-muted-foreground">→</span>}
                    <Link
                      href={`/pokemon/${evoId}/`}
                      className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                        evo.isCurrent ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                      }`}
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`}
                        alt={evoName}
                        className="w-20 h-20 object-contain"
                        loading="lazy"
                      />
                      <span className="text-sm font-semibold mt-1">{evoName}</span>
                      <span className="text-xs text-muted-foreground">#{String(evoId).padStart(4, "0")}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Pokémon */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Explore More Pokémon</h2>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[id - 3, id - 2, id - 1, id + 1, id + 2, id + 3]
              .filter((nid) => nid >= 1 && nid <= 1025 && nid !== id)
              .slice(0, 6)
              .map((nid) => (
                <Link
                  key={nid}
                  href={`/pokemon/${nid}/`}
                  className="flex flex-col items-center p-2 rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nid}.png`}
                    alt={`Pokémon #${nid}`}
                    className="w-16 h-16 object-contain"
                    loading="lazy"
                  />
                  <span className="text-xs text-muted-foreground mt-1">#{String(nid).padStart(4, "0")}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
        <h2>About {name}</h2>
        <p>
          {name} is a {genus.toLowerCase()} introduced in Generation {gen.num} ({gen.region} region).
          It is National Pokédex number {id} and has the {primaryType} type
          {pokemon.types.length > 1 ? ` combined with ${pokemon.types[1].type.name}` : ""}.
          {legendary && " It is classified as a Legendary Pokémon."}
          {mythical && " It is classified as a Mythical Pokémon."}
          {" "}With a base stat total of {baseStatTotal}, {name}{" "}
          {baseStatTotal > 500 ? "is a powerful Pokémon that can hold its own in battle" : "has balanced stats suitable for various roles"}.
        </p>
        <h3>Type and Weaknesses</h3>
        <p>
          As a {pokemon.types.map((t) => t.type.name).join("/")} type Pokémon, {name} has specific strengths and weaknesses in battle.
          {" "}Check the full type effectiveness chart on our{" "}
          <Link href="/type-chart/">Pokémon Type Chart</Link> page.
        </p>
        <h3>Abilities</h3>
        <p>
          {name} can have the following abilities:{" "}
          {pokemon.abilities.map((a, i) => (
            <span key={a.ability.name}>
              {i > 0 && ", "}
              <strong>{a.ability.name.replace(/-/g, " ")}</strong>
              {a.is_hidden && " (Hidden Ability)"}
            </span>
          ))}
          {". "}Use our <Link href="/random-team/">Random Team Builder</Link> to find teammates that complement {name}.
        </p>
      </section>

      {/* Related tools CTA */}
      <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-xl font-bold mb-4">Try Our Free Pokémon Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <Link href="/random-pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Random Pokémon</div>
            <div className="text-muted-foreground">Generate any Pokémon</div>
          </Link>
          <Link href="/random-team/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Team Builder</div>
            <div className="text-muted-foreground">Build a team of 6</div>
          </Link>
          <Link href="/pokemon-quiz/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Pokémon Quiz</div>
            <div className="text-muted-foreground">Test your knowledge</div>
          </Link>
        </div>
      </section>
    </>
  );
}
