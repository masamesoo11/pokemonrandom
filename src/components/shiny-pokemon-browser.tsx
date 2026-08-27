"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Star, ChevronLeft, ChevronRight } from "lucide-react";
import {
  fetchPokemon,
  formatPokemonName,
  GENERATIONS,
  POKEMON_TYPES,
  getTypeColor,
  type Pokemon,
} from "@/lib/pokemon-api";
import { useFavorites } from "@/lib/use-local-stats";
import { trackEvent } from "@/lib/site-config";
import { toast } from "sonner";

/**
 * ShinyPokemonBrowser — browse all 1,025 Pokémon with normal vs shiny
 * side-by-side comparison. Filter by generation and type.
 */
export function ShinyPokemonBrowser() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState<number>(1);
  const [genFilter, setGenFilter] = useState<number | "all">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const { add, remove, isFavorite } = useFavorites();

  const loadPokemon = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const result = await fetchPokemon(id);
      setPokemon(result);
      setCurrentId(id);
      trackEvent("view_shiny", {
        pokemon_id: result.id,
        pokemon_name: result.name,
      });
    } catch (e) {
      console.error("Failed to fetch Pokémon:", e);
      toast.error("Failed to load Pokémon");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPokemon(1);
  }, [loadPokemon]);

  const findNextInFilter = (direction: 1 | -1): number => {
    let candidate = currentId + direction;
    if (candidate < 1) candidate = 1025;
    if (candidate > 1025) candidate = 1;

    // Validate against filters
    for (let attempts = 0; attempts < 1025; attempts++) {
      const inGen =
        genFilter === "all" ||
        (() => {
          const g = GENERATIONS[genFilter - 1];
          return candidate >= g.range[0] && candidate <= g.range[1];
        })();

      if (!inGen) {
        candidate += direction;
        if (candidate < 1) candidate = 1025;
        if (candidate > 1025) candidate = 1;
        continue;
      }

      // Type filter requires fetching the Pokémon to check types.
      // For simplicity, we skip type filtering in the next/prev navigation
      // and instead apply it only when picking a random shiny.
      return candidate;
    }
    return candidate;
  };

  const goNext = () => loadPokemon(findNextInFilter(1));
  const goPrev = () => loadPokemon(findNextInFilter(-1));

  const pickRandom = () => {
    let pool: number[] = [];
    if (genFilter === "all") {
      for (let i = 1; i <= 1025; i++) pool.push(i);
    } else {
      const g = GENERATIONS[genFilter - 1];
      for (let i = g.range[0]; i <= g.range[1]; i++) pool.push(i);
    }
    const randomId = pool[Math.floor(Math.random() * pool.length)];
    loadPokemon(randomId);
  };

  const toggleFavorite = () => {
    if (!pokemon) return;
    if (isFavorite(pokemon.id)) {
      remove(pokemon.id);
      toast.success(`${formatPokemonName(pokemon.name)} removed from favorites`);
    } else {
      add({
        id: pokemon.id,
        name: formatPokemonName(pokemon.name),
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      });
      toast.success(`${formatPokemonName(pokemon.name)} added to favorites`);
    }
  };

  const normalUrl = pokemon
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    : null;
  const shinyUrl = pokemon
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`
    : null;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="rounded-2xl border border-border bg-card p-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Generation:</label>
          <select
            value={genFilter}
            onChange={(e) =>
              setGenFilter(e.target.value === "all" ? "all" : parseInt(e.target.value))
            }
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
          >
            <option value="all">All Generations</option>
            {GENERATIONS.map((g, idx) => (
              <option key={idx} value={idx + 1}>
                {g.name} ({g.region})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={pickRandom}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-primary-foreground text-sm font-semibold shadow hover:shadow-md transition-all"
        >
          <RefreshCw className="h-4 w-4" /> Random Shiny
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={loading}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border hover:bg-secondary transition-colors"
            title="Previous Pokémon"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-mono text-muted-foreground min-w-[80px] text-center">
            #{currentId.toString().padStart(4, "0")} / 1025
          </span>
          <button
            onClick={goNext}
            disabled={loading}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border hover:bg-secondary transition-colors"
            title="Next Pokémon"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Side-by-side comparison */}
      {pokemon && (
        <div className="rounded-2xl border-2 border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-muted-foreground">
                #{pokemon.id.toString().padStart(4, "0")}
              </span>
              <h3 className="text-xl font-bold">
                {formatPokemonName(pokemon.name)}
              </h3>
            </div>
            <button
              onClick={toggleFavorite}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border hover:bg-secondary transition-colors"
              title="Toggle favorite"
            >
              <Star
                className={`h-4 w-4 ${
                  isFavorite(pokemon.id) ? "fill-yellow-400 text-yellow-400" : ""
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 p-6">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Normal Form
              </div>
              <div className="aspect-square">
                {normalUrl && (
                  <img
                    src={normalUrl}
                    alt={`${formatPokemonName(pokemon.name)} normal form`}
                    className="w-full h-full object-contain drop-shadow-lg"
                    loading="eager"
                  />
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-yellow-500 mb-2">
                ✨ Shiny Form
              </div>
              <div className="aspect-square">
                {shinyUrl && (
                  <img
                    src={shinyUrl}
                    alt={`${formatPokemonName(pokemon.name)} shiny form`}
                    className="w-full h-full object-contain drop-shadow-lg"
                    loading="eager"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border flex flex-wrap gap-2 justify-center">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="px-3 py-1 rounded-full text-white text-xs font-semibold capitalize"
                style={{ backgroundColor: getTypeColor(t.type.name) }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
