"use client";

import { useState, useEffect, useCallback } from "react";
import { Dices } from "lucide-react";
import {
  fetchPokemon,
  formatPokemonName,
  getTypeClass,
  type Pokemon,
} from "@/lib/pokemon-api";
import { cn } from "@/lib/utils";

/**
 * Standalone random Pokémon generator used by the /embed/random-pokemon/
 * iframe widget. Deliberately minimal: no site header/footer, no ads,
 * no cookie banner (hidden via CSS in the embed page).
 */
export function EmbedRandomGenerator() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const generate = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const id = 1 + Math.floor(Math.random() * 1025);
      const p = await fetchPokemon(id);
      setPokemon(p);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <div className="p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-lg font-extrabold tracking-tight">
          Random Pokémon Generator
        </h1>
        <button
          type="button"
          onClick={generate}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm px-4 py-2.5 disabled:opacity-60 transition-opacity"
        >
          <Dices className="h-4 w-4" />
          {loading ? "Rolling…" : "Generate"}
        </button>
      </div>

      {error ? (
        <p className="text-muted-foreground py-10 text-center">
          Connection error. Please try again.
        </p>
      ) : !pokemon ? (
        <div className="flex justify-center py-10">
          <div className="pokeball-loader" />
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-5">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-secondary/60 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={formatPokemonName(pokemon.name)}
              width={112}
              height={112}
              className="w-28 h-28 object-contain"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <a
              href={`https://pokemonrandom.com/pokemon/${pokemon.id}/`}
              target="_blank"
              rel="noopener"
              className="text-2xl font-extrabold tracking-tight hover:underline underline-offset-4"
            >
              {formatPokemonName(pokemon.name)}
            </a>
            <p className="text-xs font-mono text-muted-foreground mt-0.5 mb-3">
              #{String(pokemon.id).padStart(4, "0")}
            </p>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className={cn(
                    "px-3 py-1 rounded-full text-[11px] font-bold text-white uppercase tracking-wide",
                    getTypeClass(t.type.name)
                  )}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-right text-[11px] text-muted-foreground mt-4">
        <a
          href="https://pokemonrandom.com/widgets/"
          target="_blank"
          rel="noopener"
          className="underline underline-offset-2"
        >
          Get this widget
        </a>
      </p>
    </div>
  );
}
