"use client";

import { useState, useCallback, useEffect } from "react";
import { Dices, RotateCw, X, Sparkles, Share2 } from "lucide-react";
import {
  fetchRandomTeam,
  formatPokemonName,
  getTypeClass,
  GENERATIONS,
  type Pokemon,
} from "@/lib/pokemon-api";
import { useSiteStats } from "@/lib/use-local-stats";
import { trackEvent } from "@/lib/site-config";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function PokemonTeamBuilder() {
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genFilter, setGenFilter] = useState<number | "all">("all");
  const { track } = useSiteStats();

  const buildTeam = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let result: Pokemon[];
      if (genFilter === "all") {
        result = await fetchRandomTeam(6, 1, 1025);
      } else {
        const gen = GENERATIONS[genFilter - 1];
        result = await fetchRandomTeam(6, gen.range[0], gen.range[1]);
      }
      setTeam(result);
      track({
        type: "team",
        pokemonIds: result.map((p) => p.id),
      });
      trackEvent("build_team", {
        generation: genFilter,
        pokemon_ids: result.map((p) => p.id).join(","),
      });
    } catch (e) {
      setError("Failed to build team. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [genFilter, track]);

  useEffect(() => {
    buildTeam();
  }, [buildTeam]);

  return (
    <section id="team" className="scroll-mt-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-3">
          <Dices className="h-3.5 w-3.5" />
          TEAM BUILDER
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Random Pokemon Team Generator
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Roll six random Pokemon and instantly build your dream team. Perfect for
          Nuzlocke challenges, draft leagues, or just for fun.
        </p>
      </div>

      {/* Generation filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setGenFilter("all")}
          className={cn(
            "px-3 py-1.5 text-xs font-semibold rounded-full transition-all",
            genFilter === "all"
              ? "bg-purple-600 text-white shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
          )}
        >
          All Gens
        </button>
        {GENERATIONS.map((g, i) => (
          <button
            key={g.name}
            onClick={() => setGenFilter(i + 1)}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-full transition-all",
              genFilter === i + 1
                ? "bg-purple-600 text-white shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
            )}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={buildTeam}
          disabled={loading}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
        >
          <RotateCw className={cn("h-4 w-4", loading && "animate-spin")} />
          {loading ? "Building Team..." : "Roll New Team"}
        </button>
        {team.length > 0 && (
          <button
            onClick={async () => {
              const teamStr = team.map((p) => `#${p.id} ${formatPokemonName(p.name)}`).join("\n");
              const shareUrl = `${window.location.origin}/?team=${team.map((p) => p.id).join(",")}`;
              try {
                if (navigator.share) {
                  await navigator.share({
                    title: "My Random Pokemon Team",
                    text: teamStr,
                    url: shareUrl,
                  });
                } else {
                  await navigator.clipboard.writeText(`${teamStr}\n\n${shareUrl}`);
                  toast.success("Team copied to clipboard!");
                }
                trackEvent("share_team", { pokemon_count: team.length });
              } catch (e) {
                console.debug(e);
              }
            }}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-secondary text-secondary-foreground font-semibold border border-border hover:bg-secondary/70 transition-all"
          >
            <Share2 className="h-4 w-4" /> Share Team
          </button>
        )}
      </div>

      {error && <p className="text-center text-sm text-destructive mb-4">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {loading && team.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-secondary animate-pulse border border-border"
              />
            ))
          : team.map((p, i) => (
              <TeamMember
                key={`${p.id}-${i}`}
                pokemon={p}
                onRemove={() => {
                  setTeam((prev) => prev.filter((_, idx) => idx !== i));
                }}
                index={i}
              />
            ))}
        {team.length < 6 &&
          !loading &&
          Array.from({ length: 6 - team.length }).map((_, i) => (
            <button
              key={`empty-${i}`}
              onClick={buildTeam}
              className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-secondary/30 transition-colors flex flex-col items-center justify-center text-muted-foreground hover:text-primary"
            >
              <Sparkles className="h-6 w-6 mb-1" />
              <span className="text-xs">Add Pokemon</span>
            </button>
          ))}
      </div>
    </section>
  );
}

function TeamMember({
  pokemon,
  onRemove,
  index,
}: {
  pokemon: Pokemon;
  onRemove: () => void;
  index: number;
}) {
  const primaryType = pokemon.types?.[0]?.type?.name ?? "normal";
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div
      className="group relative aspect-square rounded-2xl border-2 border-border bg-card overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-bounce-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-1.5 right-1.5 z-10 h-6 w-6 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"
        aria-label="Remove from team"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {/* Type gradient background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60",
          typeBgClass(primaryType)
        )}
      />

      {/* Sprite */}
      <div className="absolute inset-0 flex items-center justify-center p-2">
        <img
          src={spriteUrl}
          alt={formatPokemonName(pokemon.name)}
          className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform"
          loading="lazy"
        />
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/80">
            #{String(pokemon.id).padStart(4, "0")}
          </span>
          <span
            className={cn(
              "px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white uppercase",
              getTypeClass(primaryType)
            )}
          >
            {primaryType}
          </span>
        </div>
        <p className="text-xs font-bold text-white truncate">
          {formatPokemonName(pokemon.name)}
        </p>
      </div>
    </div>
  );
}

function typeBgClass(type: string): string {
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
