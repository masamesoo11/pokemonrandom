"use client";

import { useState, useEffect } from "react";
import { Star, Calendar } from "lucide-react";
import {
  fetchPokemon,
  formatPokemonName,
  getTypeClass,
  GENERATIONS,
  type Pokemon,
} from "@/lib/pokemon-api";
import { cn } from "@/lib/utils";

/**
 * Deterministic "Pokemon of the Day" - same for every visitor on the same date.
 * Uses a seeded PRNG (mulberry32) based on the date so the result is stable.
 */
function seededRandom(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getDailySeed(): number {
  const today = new Date();
  return (
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate()
  );
}

function getDailyPokemonId(): number {
  const seed = getDailySeed();
  const rand = seededRandom(seed);
  return Math.floor(rand() * 1025) + 1;
}

export function PokemonOfDay() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const id = getDailyPokemonId();
        const p = await fetchPokemon(id);
        if (!cancelled) {
          setPokemon(p);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const sprite = pokemon
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    : null;

  const gen = pokemon
    ? GENERATIONS.find(
        (g) => pokemon.id >= g.range[0] && pokemon.id <= g.range[1]
      )
    : null;

  return (
    <section className="scroll-mt-20" id="potd">
      <div className="rounded-3xl overflow-hidden border-2 border-yellow-400/60 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-950/30 dark:via-orange-950/30 dark:to-red-950/30 shadow-xl">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-0">
          {/* Left: Image */}
          <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-yellow-200/60 to-orange-200/60 dark:from-yellow-900/40 dark:to-orange-900/40 flex items-center justify-center p-8">
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold shadow-md">
              <Calendar className="h-3.5 w-3.5" />
              POKEMON OF THE DAY
            </div>
            {loading ? (
              <div className="pokeball-loader" />
            ) : pokemon && sprite ? (
              <img
                src={sprite}
                alt={formatPokemonName(pokemon.name)}
                className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl animate-float"
              />
            ) : (
              <p className="text-sm text-muted-foreground">Failed to load.</p>
            )}
            <div className="absolute bottom-4 right-4 text-5xl font-black text-yellow-700/20 dark:text-yellow-300/10 select-none pointer-events-none">
              ★
            </div>
          </div>

          {/* Right: Info */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
              {today}
            </p>
            {pokemon ? (
              <>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  {formatPokemonName(pokemon.name)}
                </h3>
                <p className="text-sm font-mono text-muted-foreground mb-3">
                  #{String(pokemon.id).padStart(4, "0")} · {gen?.name} ·{" "}
                  {gen?.region}
                </p>

                <div className="flex gap-2 mb-4">
                  {pokemon.types.map((t) => (
                    <span
                      key={t.type.name}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold text-white uppercase",
                        getTypeClass(t.type.name)
                      )}
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>

                {/* Top 3 stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[...pokemon.stats]
                    .sort((a, b) => b.base_stat - a.base_stat)
                    .slice(0, 3)
                    .map((s) => (
                      <div
                        key={s.stat.name}
                        className="rounded-lg bg-white/60 dark:bg-white/5 px-3 py-2 backdrop-blur"
                      >
                        <p className="text-[10px] uppercase font-semibold text-muted-foreground">
                          {s.stat.name
                            .replace("special-", "sp. ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </p>
                        <p className="text-lg font-extrabold">{s.base_stat}</p>
                      </div>
                    ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  <Star className="inline h-3.5 w-3.5 text-yellow-500 mr-1" />
                  Featured today — come back tomorrow for a new Pokemon!
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Loading today&apos;s pick…</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
