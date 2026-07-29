"use client";

import { useState, useEffect, useCallback } from "react";
import {
  RefreshCw,
  Volume2,
  Sparkles,
  Zap,
  Shield,
  Sword,
  Heart,
  Footprints,
  Brain,
  Eye,
  ChevronDown,
  ChevronUp,
  Star,
  Share2,
} from "lucide-react";
import {
  fetchPokemon,
  fetchRandomPokemon,
  formatPokemonName,
  formatHeight,
  formatWeight,
  getTypeClass,
  GENERATIONS,
  type Pokemon,
} from "@/lib/pokemon-api";
import { useFavorites, useHistory, useSiteStats } from "@/lib/use-local-stats";
import { trackEvent } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  hp: Heart,
  attack: Sword,
  defense: Shield,
  "special-attack": Zap,
  "special-defense": Brain,
  speed: Footprints,
};

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

export function RandomPokemonGenerator() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showShiny, setShowShiny] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [genFilter, setGenFilter] = useState<number | "all">("all");
  const [cryPlaying, setCryPlaying] = useState(false);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
  const { add, remove, isFavorite } = useFavorites();
  const { add: addHistory } = useHistory();
  const { track } = useSiteStats();

  const generate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setShowDetails(false);
    try {
      let result: Pokemon;
      if (genFilter === "all") {
        result = await fetchRandomPokemon(1, 1025);
      } else {
        const gen = GENERATIONS[genFilter - 1];
        result = await fetchRandomPokemon(gen.range[0], gen.range[1]);
      }
      setPokemon(result);
      setShowShiny(false);
      // Track analytics
      track({ type: "generate", pokemonIds: [result.id] });
      trackEvent("generate_pokemon", {
        pokemon_id: result.id,
        pokemon_name: result.name,
        generation: genFilter,
      });
      addHistory({
        id: result.id,
        name: formatPokemonName(result.name),
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.id}.png`,
        tool: "generator",
      });
    } catch (e) {
      setError("Failed to generate Pokemon. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [genFilter, track, addHistory]);

  // Generate one on first mount
  useEffect(() => {
    generate();
  }, [generate]);

  // Stop audio on unmount or when pokemon changes
  useEffect(() => {
    return () => {
      audioEl?.pause();
      setCryPlaying(false);
    };
  }, [audioEl, pokemon?.id]);

  const playCry = async () => {
    if (!pokemon) return;
    try {
      // Use the latest cry URL format
      const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;
      const el = new Audio(cryUrl);
      setAudioEl(el);
      setCryPlaying(true);
      el.volume = 0.4;
      await el.play();
      el.addEventListener("ended", () => setCryPlaying(false));
      el.addEventListener("error", () => setCryPlaying(false));
    } catch (e) {
      console.error("Failed to play cry:", e);
      setCryPlaying(false);
    }
  };

  const artworkUrl = pokemon
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        showShiny ? "shiny/" : ""
      }${pokemon.id}.png`
    : null;

  const primaryType = pokemon?.types?.[0]?.type?.name ?? "normal";

  // Type gradient background based on primary type
  const typeGradients: Record<string, string> = {
    fire: "from-orange-200 via-red-100 to-yellow-100",
    water: "from-blue-200 via-cyan-100 to-sky-100",
    grass: "from-green-200 via-emerald-100 to-lime-100",
    electric: "from-yellow-200 via-amber-100 to-orange-100",
    psychic: "from-pink-200 via-rose-100 to-fuchsia-100",
    ice: "from-cyan-200 via-sky-100 to-blue-100",
    dragon: "from-purple-200 via-violet-100 to-indigo-100",
    dark: "from-stone-300 via-gray-200 to-zinc-200",
    fairy: "from-pink-200 via-fuchsia-100 to-rose-100",
    normal: "from-stone-200 via-amber-50 to-stone-100",
    fighting: "from-red-200 via-orange-100 to-amber-100",
    flying: "from-indigo-200 via-sky-100 to-cyan-100",
    poison: "from-purple-200 via-fuchsia-100 to-pink-100",
    ground: "from-amber-200 via-yellow-100 to-orange-100",
    rock: "from-yellow-200 via-stone-100 to-amber-100",
    bug: "from-lime-200 via-green-100 to-emerald-100",
    ghost: "from-violet-200 via-purple-100 to-fuchsia-100",
    steel: "from-slate-200 via-zinc-100 to-gray-100",
  };

  return (
    <section id="generator" className="scroll-mt-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          MOST POPULAR TOOL
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Random Pokemon Generator
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Click the button to generate a random Pokemon from any generation. See its
          stats, type, abilities, hear its cry, and discover its shiny form — all free,
          no signup.
        </p>
      </div>

      {/* Generation filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setGenFilter("all")}
          className={cn(
            "px-3 py-1.5 text-xs font-semibold rounded-full transition-all",
            genFilter === "all"
              ? "bg-primary text-primary-foreground shadow-md"
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
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
            )}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* Main card */}
      <div className="relative mx-auto max-w-3xl">
        <div
          className={cn(
            "absolute -inset-2 rounded-3xl bg-gradient-to-br blur-2xl opacity-30 transition-all duration-700",
            pokemon ? typeGradients[primaryType] : "from-stone-200 to-amber-100"
          )}
        />

        <div className="relative rounded-3xl border-2 border-border bg-card overflow-hidden shadow-xl">
          {/* Top bar with ID */}
          <div className="flex items-center justify-between px-6 py-3 bg-secondary/50 border-b border-border">
            <span className="text-xs font-mono text-muted-foreground">
              {pokemon ? `#${String(pokemon.id).padStart(4, "0")}` : "----"}
            </span>
            <span className="text-xs text-muted-foreground">
              {pokemon
                ? GENERATIONS.find((g) =>
                    pokemon.id >= g.range[0] && pokemon.id <= g.range[1]
                  )?.region ?? "Unknown"
                : "—"}
            </span>
          </div>

          {/* Sprite area */}
          <div
            className={cn(
              "relative aspect-[4/3] sm:aspect-[16/9] flex items-center justify-center p-6 bg-gradient-to-br transition-all duration-700",
              pokemon ? typeGradients[primaryType] : "from-stone-100 to-amber-50"
            )}
          >
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="pokeball-loader" />
                <p className="text-sm font-medium text-foreground/70">
                  Generating...
                </p>
              </div>
            ) : pokemon && artworkUrl ? (
              <div className="relative flex flex-col items-center">
                <img
                  key={`${pokemon.id}-${showShiny}`}
                  src={artworkUrl}
                  alt={formatPokemonName(pokemon.name)}
                  className="w-48 h-48 sm:w-64 sm:h-64 object-contain drop-shadow-2xl animate-bounce-in"
                  loading="eager"
                />
                {/* Floating sparkles for shiny */}
                {showShiny && (
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900 text-[10px] font-bold flex items-center gap-1 animate-wiggle">
                    <Sparkles className="h-3 w-3" /> SHINY
                  </div>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground">Click generate to start</div>
            )}

            {/* Background pokedex pattern */}
            <div className="absolute top-4 right-4 text-[120px] font-black text-foreground/5 select-none pointer-events-none leading-none">
              {pokemon ? String(pokemon.id).padStart(3, "0") : ""}
            </div>
          </div>

          {/* Name + types + actions */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">
                  {pokemon ? formatPokemonName(pokemon.name) : "—"}
                </h3>
                {pokemon && (
                  <div className="flex gap-2 mt-2">
                    {pokemon.types.map((t) => (
                      <span
                        key={t.type.name}
                        className={cn(
                          "px-3 py-0.5 rounded-full text-xs font-bold text-white uppercase tracking-wide",
                          getTypeClass(t.type.name)
                        )}
                      >
                        {t.type.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {pokemon && (
                  <>
                    <button
                      onClick={() => {
                        if (isFavorite(pokemon.id)) {
                          remove(pokemon.id);
                          toast.success(`Removed ${formatPokemonName(pokemon.name)} from favorites`);
                        } else {
                          add({
                            id: pokemon.id,
                            name: formatPokemonName(pokemon.name),
                            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
                            types: pokemon.types.map((t) => t.type.name),
                          });
                          toast.success(`Added ${formatPokemonName(pokemon.name)} to favorites!`);
                        }
                        trackEvent("toggle_favorite", {
                          pokemon_id: pokemon.id,
                          action: isFavorite(pokemon.id) ? "remove" : "add",
                        });
                      }}
                      title={isFavorite(pokemon.id) ? "Remove from favorites" : "Add to favorites"}
                      className={cn(
                        "inline-flex items-center justify-center h-10 w-10 rounded-full border transition-colors",
                        isFavorite(pokemon.id)
                          ? "bg-yellow-400 border-yellow-400 text-yellow-900"
                          : "border-border hover:bg-secondary"
                      )}
                    >
                      <Star className={cn("h-4 w-4", isFavorite(pokemon.id) && "fill-current")} />
                    </button>
                    <button
                      onClick={async () => {
                        const shareUrl = `${window.location.origin}/?pokemon=${pokemon.id}`;
                        try {
                          if (navigator.share) {
                            await navigator.share({
                              title: `Check out ${formatPokemonName(pokemon.name)}!`,
                              text: `I generated ${formatPokemonName(pokemon.name)} (#${pokemon.id}) on Pokemon Random`,
                              url: shareUrl,
                            });
                            trackEvent("share_pokemon", { method: "native", pokemon_id: pokemon.id });
                          } else {
                            await navigator.clipboard.writeText(shareUrl);
                            toast.success("Link copied to clipboard!");
                            trackEvent("share_pokemon", { method: "clipboard", pokemon_id: pokemon.id });
                          }
                        } catch (e) {
                          console.debug(e);
                        }
                      }}
                      title="Share this Pokemon"
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border hover:bg-secondary transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={playCry}
                      disabled={cryPlaying}
                      title="Play cry"
                      className={cn(
                        "inline-flex items-center justify-center h-10 w-10 rounded-full border border-border hover:bg-secondary transition-colors",
                        cryPlaying && "animate-pulse"
                      )}
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowShiny(!showShiny)}
                      title="Toggle shiny"
                      className={cn(
                        "inline-flex items-center justify-center h-10 w-10 rounded-full border border-border hover:bg-secondary transition-colors",
                        showShiny && "bg-yellow-100 border-yellow-400"
                      )}
                    >
                      <Sparkles className={cn("h-4 w-4", showShiny && "text-yellow-600")} />
                    </button>
                  </>
                )}
                <button
                  onClick={generate}
                  disabled={loading}
                  className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
                >
                  <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                  Generate
                </button>
              </div>
            </div>

            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

            {/* Quick facts */}
            {pokemon && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                <Fact label="Height" value={formatHeight(pokemon.height)} icon={Eye} />
                <Fact label="Weight" value={formatWeight(pokemon.weight)} icon={Shield} />
                <Fact
                  label="Base XP"
                  value={String(pokemon.base_experience ?? 0)}
                  icon={Zap}
                />
                <Fact
                  label="Abilities"
                  value={String(pokemon.abilities.length)}
                  icon={Brain}
                />
              </div>
            )}

            {/* Stats (collapsible) */}
            {pokemon && (
              <div className="mt-5">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-semibold"
                >
                  <span>Base Stats &amp; Abilities</span>
                  {showDetails ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {showDetails && (
                  <div className="mt-3 space-y-3 animate-slide-up">
                    {pokemon.stats.map((s) => {
                      const statName = s.stat.name;
                      const Icon = STAT_ICONS[statName] ?? Eye;
                      const percent = Math.min(100, (s.base_stat / 255) * 100);
                      return (
                        <div key={statName} className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 w-28 shrink-0">
                            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs font-semibold text-muted-foreground">
                              {STAT_LABELS[statName] ?? statName}
                            </span>
                          </div>
                          <div className="w-10 text-sm font-bold text-right">
                            {s.base_stat}
                          </div>
                          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all duration-700",
                                STAT_COLORS[statName] ?? "bg-primary"
                              )}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    <div className="pt-2 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        ABILITIES
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {pokemon.abilities.map((a) => (
                          <span
                            key={a.ability.name}
                            className={cn(
                              "px-2.5 py-1 rounded-md text-xs font-medium border",
                              a.is_hidden
                                ? "border-dashed border-yellow-400 bg-yellow-50 text-yellow-700"
                                : "border-border bg-secondary"
                            )}
                          >
                            {formatPokemonName(a.ability.name)}
                            {a.is_hidden && (
                              <span className="ml-1.5 text-[10px] uppercase">
                                Hidden
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/30 px-3 py-2">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className="text-sm font-bold mt-0.5">{value}</div>
    </div>
  );
}
