"use client";

import { useState, useCallback, useEffect } from "react";
import { SlidersHorizontal, Dices, X } from "lucide-react";
import {
  fetchPokemon,
  formatPokemonName,
  formatHeight,
  formatWeight,
  getTypeClass,
  GENERATIONS,
  POKEMON_TYPES,
  pickRandomId,
  isLegendary,
  type Pokemon,
} from "@/lib/pokemon-api";
import { useSiteStats } from "@/lib/use-local-stats";
import { trackEvent } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type LegendaryFilter = "any" | "only" | "exclude";

export function PokemonRandomizer() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { track } = useSiteStats();

  // Filters
  const [selectedGens, setSelectedGens] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [legendaryFilter, setLegendaryFilter] = useState<LegendaryFilter>("any");

  const toggleGen = (gen: number) => {
    setSelectedGens((prev) =>
      prev.includes(gen) ? prev.filter((g) => g !== gen) : [...prev, gen]
    );
  };

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const resetFilters = () => {
    setSelectedGens([]);
    setSelectedTypes([]);
    setLegendaryFilter("any");
  };

  const randomize = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try multiple times in case the random pool is small
      let id: number | null = null;
      for (let attempt = 0; attempt < 10; attempt++) {
        id = pickRandomId({
          generations: selectedGens.length > 0 ? selectedGens : undefined,
          types: selectedTypes.length > 0 ? selectedTypes : undefined,
          legendaryOnly: legendaryFilter === "only",
          excludeLegendary: legendaryFilter === "exclude",
        });
        if (id !== null) break;
      }
      if (id === null) {
        setError(
          "No Pokemon matches these filters. Try removing some filters."
        );
        setLoading(false);
        return;
      }
      const p = await fetchPokemon(id);
      setPokemon(p);
      track({ type: "randomize", pokemonIds: [p.id] });
      trackEvent("randomize_pokemon", {
        pokemon_id: p.id,
        generations: selectedGens.join(",") || "all",
        types: selectedTypes.join(",") || "any",
        legendary: legendaryFilter,
      });
    } catch (e) {
      setError("Failed to generate Pokemon. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [selectedGens, selectedTypes, legendaryFilter, track]);

  useEffect(() => {
    randomize();
  }, [randomize]);

  const activeFilterCount =
    selectedGens.length +
    selectedTypes.length +
    (legendaryFilter !== "any" ? 1 : 0);

  return (
    <section id="randomizer" className="scroll-mt-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          ADVANCED FILTERS
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Pokemon Randomizer
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Filter by generation, type, and legendary status to get a truly custom random
          Pokemon. Perfect for challenges like monotype runs or legendary-only drafts.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-6">
        {/* Filters panel */}
        <div className="rounded-2xl border-2 border-border bg-card p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>

          {/* Generations */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Generation
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {GENERATIONS.map((g, i) => (
                <button
                  key={g.name}
                  onClick={() => toggleGen(i + 1)}
                  className={cn(
                    "px-2 py-1.5 text-[11px] font-semibold rounded-md transition-all border",
                    selectedGens.includes(i + 1)
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-secondary border-border hover:bg-secondary/70"
                  )}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {/* Types */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Type (must match ALL selected)
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {POKEMON_TYPES.map((t) => (
                <button
                  key={t.name}
                  onClick={() => toggleType(t.name)}
                  className={cn(
                    "px-2 py-1.5 text-[10px] font-bold rounded-md transition-all uppercase text-white border-2",
                    selectedTypes.includes(t.name)
                      ? "border-foreground shadow-md scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                  style={{ background: t.color }}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Legendary */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Legendary / Mythical
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {(
                [
                  { value: "any", label: "Any" },
                  { value: "only", label: "Only" },
                  { value: "exclude", label: "Exclude" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setLegendaryFilter(opt.value)}
                  className={cn(
                    "px-2 py-1.5 text-[11px] font-semibold rounded-md transition-all border",
                    legendaryFilter === opt.value
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-secondary border-border hover:bg-secondary/70"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result panel */}
        <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
          {error ? (
            <div className="aspect-square flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-3">🚫</div>
              <p className="text-sm font-medium text-destructive">{error}</p>
              <button
                onClick={resetFilters}
                className="mt-4 text-sm text-primary font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : pokemon ? (
            <RandomizerResult pokemon={pokemon} loading={loading} onReroll={randomize} />
          ) : (
            <div className="aspect-square flex items-center justify-center">
              <div className="pokeball-loader" />
            </div>
          )}

          <div className="p-4 border-t border-border bg-secondary/30">
            <button
              onClick={randomize}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-full bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              <Dices className={cn("h-4 w-4", loading && "animate-spin")} />
              {loading ? "Randomizing..." : "Randomize Again"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RandomizerResult({
  pokemon,
  loading,
  onReroll,
}: {
  pokemon: Pokemon;
  loading: boolean;
  onReroll: () => void;
}) {
  const primaryType = pokemon.types?.[0]?.type?.name ?? "normal";
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const legendary = isLegendary(pokemon.id);
  const gen = GENERATIONS.find(
    (g) => pokemon.id >= g.range[0] && pokemon.id <= g.range[1]
  );

  return (
    <div className="relative">
      <div
        className={cn(
          "aspect-square flex items-center justify-center p-6 bg-gradient-to-br",
          typeBg(primaryType)
        )}
      >
        {loading ? (
          <div className="pokeball-loader" />
        ) : (
          <img
            key={pokemon.id}
            src={spriteUrl}
            alt={formatPokemonName(pokemon.name)}
            className="w-44 h-44 sm:w-56 sm:h-56 object-contain drop-shadow-2xl animate-bounce-in"
          />
        )}

        {legendary && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-yellow-400 text-yellow-900 text-[10px] font-bold flex items-center gap-1 shadow-md">
            ⭐ LEGENDARY
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-mono text-muted-foreground">
              #{String(pokemon.id).padStart(4, "0")} · {gen?.name} {gen?.region}
            </p>
            <h3 className="text-2xl font-extrabold tracking-tight">
              {formatPokemonName(pokemon.name)}
            </h3>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-bold text-white uppercase",
                getTypeClass(t.type.name)
              )}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="rounded-lg bg-secondary/50 px-3 py-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase">Height</p>
            <p className="text-sm font-bold">{formatHeight(pokemon.height)}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 px-3 py-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase">Weight</p>
            <p className="text-sm font-bold">{formatWeight(pokemon.weight)}</p>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1.5">
            Top Stats
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[...pokemon.stats]
              .sort((a, b) => b.base_stat - a.base_stat)
              .slice(0, 3)
              .map((s) => {
                const statName = s.stat.name.replace("special-", "sp. ");
                const label = statName.replace(/\b\w/g, (c) => c.toUpperCase());
                return (
                  <span
                    key={s.stat.name}
                    className="px-2 py-1 rounded-md bg-secondary text-xs font-medium"
                  >
                    {label}: <span className="font-bold">{s.base_stat}</span>
                  </span>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

function typeBg(type: string): string {
  const map: Record<string, string> = {
    fire: "from-orange-200 to-red-100",
    water: "from-blue-200 to-cyan-100",
    grass: "from-green-200 to-emerald-100",
    electric: "from-yellow-200 to-amber-100",
    psychic: "from-pink-200 to-rose-100",
    ice: "from-cyan-200 to-sky-100",
    dragon: "from-purple-200 to-violet-100",
    dark: "from-stone-300 to-gray-200",
    fairy: "from-pink-200 to-fuchsia-100",
    normal: "from-stone-200 to-amber-50",
    fighting: "from-red-200 to-orange-100",
    flying: "from-indigo-200 to-sky-100",
    poison: "from-purple-200 to-fuchsia-100",
    ground: "from-amber-200 to-yellow-100",
    rock: "from-yellow-200 to-stone-100",
    bug: "from-lime-200 to-green-100",
    ghost: "from-violet-200 to-purple-100",
    steel: "from-slate-200 to-zinc-100",
  };
  return map[type] ?? "from-stone-100 to-amber-50";
}
