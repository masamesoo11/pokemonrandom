"use client";

import { useState, useCallback } from "react";
import { GitCompare, X, Search, Loader2 } from "lucide-react";
import {
  fetchPokemon,
  fetchRandomPokemon,
  formatPokemonName,
  formatHeight,
  formatWeight,
  getTypeClass,
  isLegendary,
  GENERATIONS,
  type Pokemon,
} from "@/lib/pokemon-api";
import { cn } from "@/lib/utils";

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

export function PokemonComparison() {
  const [pokemonA, setPokemonA] = useState<Pokemon | null>(null);
  const [pokemonB, setPokemonB] = useState<Pokemon | null>(null);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  const loadA = useCallback(async (random: boolean = false, id?: number) => {
    setLoadingA(true);
    try {
      const p = id
        ? await fetchPokemon(id)
        : random
          ? await fetchRandomPokemon(1, 1025)
          : null;
      if (p) setPokemonA(p);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingA(false);
    }
  }, []);

  const loadB = useCallback(async (random: boolean = false, id?: number) => {
    setLoadingB(true);
    try {
      const p = id
        ? await fetchPokemon(id)
        : random
          ? await fetchRandomPokemon(1, 1025)
          : null;
      if (p) setPokemonB(p);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingB(false);
    }
  }, []);

  return (
    <section id="compare" className="scroll-mt-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 text-xs font-semibold mb-3">
          <GitCompare className="h-3.5 w-3.5" />
          COMPARISON TOOL
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Pokemon Comparison Tool
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Pick two Pokemon and compare their stats side-by-side. Find out which
          one is stronger, faster, or tankier.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ComparisonSlot
          label="Pokemon A"
          pokemon={pokemonA}
          loading={loadingA}
          onLoadRandom={() => loadA(true)}
          onClear={() => setPokemonA(null)}
          accentColor="from-red-500 to-orange-500"
        />
        <ComparisonSlot
          label="Pokemon B"
          pokemon={pokemonB}
          loading={loadingB}
          onLoadRandom={() => loadB(true)}
          onClear={() => setPokemonB(null)}
          accentColor="from-blue-500 to-cyan-500"
        />
      </div>

      {/* VS divider */}
      {pokemonA && pokemonB && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-foreground text-background font-black text-lg shadow-lg">
            VS
          </div>
        </div>
      )}

      {/* Comparison table */}
      {pokemonA && pokemonB && (
        <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md animate-slide-up">
          <ComparisonTable a={pokemonA} b={pokemonB} />
        </div>
      )}

      {!pokemonA || !pokemonB ? (
        <div className="rounded-2xl border-2 border-dashed border-border bg-secondary/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            👆 Click <strong>Load Random</strong> on both cards to start comparing.
          </p>
        </div>
      ) : null}
    </section>
  );
}

function ComparisonSlot({
  label,
  pokemon,
  loading,
  onLoadRandom,
  onClear,
  accentColor,
}: {
  label: string;
  pokemon: Pokemon | null;
  loading: boolean;
  onLoadRandom: () => void;
  onClear: () => void;
  accentColor: string;
}) {
  const sprite = pokemon
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    : null;
  const gen = pokemon
    ? GENERATIONS.find(
        (g) => pokemon.id >= g.range[0] && pokemon.id <= g.range[1]
      )
    : null;

  return (
    <div className="rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md">
      <div
        className={cn(
          "relative aspect-[4/3] flex items-center justify-center bg-gradient-to-br p-4",
          accentColor,
          "opacity-90"
        )}
      >
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase">
          {label}
        </span>
        {pokemon && (
          <button
            onClick={onClear}
            className="absolute top-3 right-3 h-7 w-7 rounded-full bg-white/20 backdrop-blur hover:bg-white/40 transition-colors flex items-center justify-center text-white"
            aria-label="Clear"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {loading ? (
          <Loader2 className="h-10 w-10 animate-spin text-white" />
        ) : pokemon && sprite ? (
          <img
            src={sprite}
            alt={formatPokemonName(pokemon.name)}
            className="w-32 h-32 object-contain drop-shadow-2xl animate-bounce-in"
          />
        ) : (
          <div className="text-white/80 text-sm">Empty slot</div>
        )}
      </div>
      <div className="p-4">
        {pokemon ? (
          <>
            <p className="text-xs font-mono text-muted-foreground">
              #{String(pokemon.id).padStart(4, "0")} · {gen?.name} {gen?.region}
              {isLegendary(pokemon.id) && " · ⭐ Legendary"}
            </p>
            <h3 className="text-xl font-extrabold tracking-tight">
              {formatPokemonName(pokemon.name)}
            </h3>
            <div className="flex gap-1.5 mt-2">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase",
                    getTypeClass(t.type.name)
                  )}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No Pokemon loaded.</p>
        )}
        <button
          onClick={onLoadRandom}
          disabled={loading}
          className="mt-3 w-full inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/70 transition-colors disabled:opacity-50"
        >
          <Search className="h-3.5 w-3.5" />
          {pokemon ? "Swap with new random" : "Load Random Pokemon"}
        </button>
      </div>
    </div>
  );
}

function ComparisonTable({ a, b }: { a: Pokemon; b: Pokemon }) {
  const totalA = a.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const totalB = b.stats.reduce((sum, s) => sum + s.base_stat, 0);

  const rows = [
    { label: "Height", valueA: formatHeight(a.height), valueB: formatHeight(b.height), isNumeric: false },
    { label: "Weight", valueA: formatWeight(a.weight), valueB: formatWeight(b.weight), isNumeric: false },
    { label: "Base XP", valueA: a.base_experience ?? 0, valueB: b.base_experience ?? 0, isNumeric: true },
    ...a.stats.map((s, i) => ({
      label: STAT_LABELS[s.stat.name] ?? s.stat.name,
      valueA: s.base_stat,
      valueB: b.stats[i].base_stat,
      isNumeric: true,
    })),
    { label: "Total Stats", valueA: totalA, valueB: totalB, isNumeric: true },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border bg-secondary/30">
          <th className="text-left p-3 text-xs uppercase tracking-wide text-muted-foreground font-bold">
            Stat
          </th>
          <th className="text-center p-3 text-xs uppercase tracking-wide text-muted-foreground font-bold">
            {formatPokemonName(a.name)}
          </th>
          <th className="text-center p-3 text-xs uppercase tracking-wide text-muted-foreground font-bold">
            {formatPokemonName(b.name)}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const aWins =
            row.isNumeric && typeof row.valueA === "number" && typeof row.valueB === "number"
              ? row.valueA > row.valueB
              : false;
          const bWins =
            row.isNumeric && typeof row.valueA === "number" && typeof row.valueB === "number"
              ? row.valueB > row.valueA
              : false;
          return (
            <tr key={row.label} className="border-b border-border last:border-0">
              <td className="p-3 text-sm font-semibold">{row.label}</td>
              <td
                className={cn(
                  "p-3 text-center text-sm font-bold",
                  aWins && "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                )}
              >
                {row.valueA}
                {aWins && <span className="ml-1 text-xs">▲</span>}
              </td>
              <td
                className={cn(
                  "p-3 text-center text-sm font-bold",
                  bWins && "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                )}
              >
                {row.valueB}
                {bWins && <span className="ml-1 text-xs">▲</span>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
