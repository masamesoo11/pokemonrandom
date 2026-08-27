"use client";

import { useState, useCallback } from "react";
import { RefreshCw, Sparkles, Filter, X } from "lucide-react";
import {
  fetchPokemon,
  formatPokemonName,
  formatHeight,
  formatWeight,
  GENERATIONS,
  POKEMON_TYPES,
  getTypeColor,
  isLegendary,
  pickRandomId,
  type Pokemon,
} from "@/lib/pokemon-api";
import { trackEvent } from "@/lib/site-config";
import { toast } from "sonner";

/**
 * UniversalPokemonRandomizer — information + interactive demo for the
 * Universal Pokémon Randomizer concept. Combines multiple filters
 * (generation + type + legendary status) for advanced randomization.
 *
 * Note: this is a web-based simulation, not the actual Java-based
 * Universal Pokémon Randomizer tool that randomizes game ROMs.
 */
export function UniversalPokemonRandomizer() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [selectedGens, setSelectedGens] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [legendaryMode, setLegendaryMode] = useState<"any" | "only" | "exclude">("any");

  const toggleGen = (gen: number) => {
    setSelectedGens((prev) =>
      prev.includes(gen) ? prev.filter((g) => g !== gen) : [...prev, gen]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const randomize = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const id = pickRandomId({
        generations: selectedGens,
        types: selectedTypes,
        legendaryOnly: legendaryMode === "only",
        excludeLegendary: legendaryMode === "exclude",
      });

      if (id === null) {
        setError("No Pokémon matches your filters. Try removing some filters.");
        setLoading(false);
        return;
      }

      const result = await fetchPokemon(id);
      setPokemon(result);
      trackEvent("universal_randomize", {
        pokemon_id: result.id,
        pokemon_name: result.name,
        generations: selectedGens.join(","),
        types: selectedTypes.join(","),
        legendary_mode: legendaryMode,
      });
    } catch (e) {
      setError("Failed to randomize. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [selectedGens, selectedTypes, legendaryMode]);

  const artworkUrl = pokemon
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    : null;

  const clearFilters = () => {
    setSelectedGens([]);
    setSelectedTypes([]);
    setLegendaryMode("any");
    setError(null);
  };

  const hasFilters = selectedGens.length > 0 || selectedTypes.length > 0 || legendaryMode !== "any";

  return (
    <div className="space-y-6">
      {/* Disclaimer banner */}
      <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/30 p-4 text-sm">
        <strong>Note:</strong> This is a web-based randomizer that simulates the
        Universal Pokémon Randomizer concept. To randomize actual Pokémon game
        ROMs, download the official Universal Pokémon Randomizer Java tool
        from its GitHub repository (requires your own legally-dumped ROM).
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" /> Randomizer Filters
          </h3>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Clear all
            </button>
          )}
        </div>

        {/* Generation filter */}
        <div>
          <div className="text-sm font-medium mb-2">Generations</div>
          <div className="flex flex-wrap gap-2">
            {GENERATIONS.map((g, idx) => {
              const genNum = idx + 1;
              const active = selectedGens.includes(genNum);
              return (
                <button
                  key={genNum}
                  onClick={() => toggleGen(genNum)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary"
                  }`}
                >
                  {g.name} ({g.region})
                </button>
              );
            })}
          </div>
        </div>

        {/* Type filter */}
        <div>
          <div className="text-sm font-medium mb-2">Types (match any)</div>
          <div className="flex flex-wrap gap-2">
            {POKEMON_TYPES.map((t) => {
              const active = selectedTypes.includes(t.name);
              return (
                <button
                  key={t.name}
                  onClick={() => toggleType(t.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize border transition-all ${
                    active ? "text-white border-transparent" : "bg-background border-border hover:border-primary"
                  }`}
                  style={active ? { backgroundColor: t.color } : {}}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legendary filter */}
        <div>
          <div className="text-sm font-medium mb-2">Legendary Status</div>
          <div className="flex gap-2">
            {(["any", "only", "exclude"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setLegendaryMode(mode)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border capitalize transition-all ${
                  legendaryMode === mode
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-primary"
                }`}
              >
                {mode === "any" ? "Any" : mode === "only" ? "Legendary only" : "Exclude legendary"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl border-2 border-border bg-card overflow-hidden">
        {error ? (
          <div className="p-8 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={randomize}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-semibold"
            >
              <RefreshCw className="h-4 w-4" /> Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="p-12 flex items-center justify-center">
            <RefreshCw className="h-12 w-12 animate-spin text-muted-foreground" />
          </div>
        ) : pokemon ? (
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="aspect-square max-w-xs mx-auto w-full">
              {artworkUrl && (
                <img
                  src={artworkUrl}
                  alt={formatPokemonName(pokemon.name)}
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              )}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-muted-foreground">
                  #{pokemon.id.toString().padStart(4, "0")}
                </span>
                <h3 className="text-2xl font-bold">
                  {formatPokemonName(pokemon.name)}
                </h3>
                {isLegendary(pokemon.id) && (
                  <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-950 text-xs font-bold">
                    Legendary
                  </span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                    style={{ backgroundColor: getTypeColor(t.type.name) }}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-secondary/50 p-2">
                  <div className="text-muted-foreground">Height</div>
                  <div className="font-semibold">{formatHeight(pokemon.height)}</div>
                </div>
                <div className="rounded-lg bg-secondary/50 p-2">
                  <div className="text-muted-foreground">Weight</div>
                  <div className="font-semibold">{formatWeight(pokemon.weight)}</div>
                </div>
              </div>
              <button
                onClick={randomize}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                <Sparkles className="h-4 w-4" /> Randomize Again
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <button
              onClick={randomize}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              <Sparkles className="h-5 w-5" /> Start Randomizing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
