"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Sparkles, Volume2, Star, Share2, Shuffle } from "lucide-react";
import {
  fetchPokemon,
  formatPokemonName,
  formatHeight,
  formatWeight,
  getTypeColor,
  type Pokemon,
} from "@/lib/pokemon-api";
import { useFavorites, useHistory, useSiteStats } from "@/lib/use-local-stats";
import { trackEvent } from "@/lib/site-config";
import { toast } from "sonner";

/**
 * RandomStarterPicker — pick a random starter Pokémon from any generation.
 * Starters are the Grass/Fire/Water trio each generation gives the player.
 */
const STARTER_IDS = [
  // Gen 1 — Kanto
  1, 4, 7,
  // Gen 2 — Johto
  152, 155, 158,
  // Gen 3 — Hoenn
  252, 255, 258,
  // Gen 4 — Sinnoh
  387, 390, 393,
  // Gen 5 — Unova
  495, 498, 501,
  // Gen 6 — Kalos
  650, 653, 656,
  // Gen 7 — Alola
  722, 725, 728,
  // Gen 8 — Galar
  810, 813, 816,
  // Gen 9 — Paldea
  906, 909, 912,
];

const STARTER_GENERATIONS = [
  { gen: 1, region: "Kanto", ids: [1, 4, 7], names: ["Bulbasaur", "Charmander", "Squirtle"] },
  { gen: 2, region: "Johto", ids: [152, 155, 158], names: ["Chikorita", "Cyndaquil", "Totodile"] },
  { gen: 3, region: "Hoenn", ids: [252, 255, 258], names: ["Treecko", "Torchic", "Mudkip"] },
  { gen: 4, region: "Sinnoh", ids: [387, 390, 393], names: ["Turtwig", "Chimchar", "Piplup"] },
  { gen: 5, region: "Unova", ids: [495, 498, 501], names: ["Snivy", "Tepig", "Oshawott"] },
  { gen: 6, region: "Kalos", ids: [650, 653, 656], names: ["Chespin", "Fennekin", "Froakie"] },
  { gen: 7, region: "Alola", ids: [722, 725, 728], names: ["Rowlet", "Litten", "Popplio"] },
  { gen: 8, region: "Galar", ids: [810, 813, 816], names: ["Grookey", "Scorbunny", "Sobble"] },
  { gen: 9, region: "Paldea", ids: [906, 909, 912], names: ["Sprigatito", "Fuecoco", "Quaxly"] },
];

export function RandomStarterPicker() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showShiny, setShowShiny] = useState(false);
  const [selectedGen, setSelectedGen] = useState<number | "all">("all");
  const { add, remove, isFavorite } = useFavorites();
  const { add: addHistory } = useHistory();
  const { track } = useSiteStats();

  const pick = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let pool = STARTER_IDS;
      if (selectedGen !== "all") {
        const genData = STARTER_GENERATIONS.find((g) => g.gen === selectedGen);
        if (genData) pool = genData.ids;
      }
      const id = pool[Math.floor(Math.random() * pool.length)];
      const result = await fetchPokemon(id);
      setPokemon(result);
      setShowShiny(false);
      track({ type: "generate", pokemonIds: [result.id] });
      trackEvent("pick_starter", {
        pokemon_id: result.id,
        pokemon_name: result.name,
        generation: selectedGen,
      });
      addHistory({
        id: result.id,
        name: formatPokemonName(result.name),
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.id}.png`,
        tool: "starter-picker",
      });
    } catch (e) {
      setError("Failed to pick a starter. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [selectedGen, track, addHistory]);

  useEffect(() => {
    pick();
  }, [pick]);

  const artworkUrl = pokemon
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        showShiny ? "shiny/" : ""
      }${pokemon.id}.png`
    : null;

  const primaryType = pokemon?.types?.[0]?.type?.name ?? "normal";

  const playCry = async () => {
    if (!pokemon) return;
    try {
      const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;
      const el = new Audio(cryUrl);
      el.volume = 0.4;
      await el.play();
    } catch (e) {
      console.error("Failed to play cry:", e);
      toast.error("Could not play cry");
    }
  };

  const handleShare = async () => {
    if (!pokemon) return;
    const url = `${window.location.origin}/random-starter/?id=${pokemon.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${formatPokemonName(pokemon.name)} — Starter Pokémon`,
          text: `I got ${formatPokemonName(pokemon.name)} as my starter!`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      }
    } catch {
      // user dismissed
    }
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

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={pick}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Generation filter */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="text-sm font-medium mb-3">Filter by Generation</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGen("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              selectedGen === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border hover:border-primary"
            }`}
          >
            All Gens
          </button>
          {STARTER_GENERATIONS.map((g) => (
            <button
              key={g.gen}
              onClick={() => setSelectedGen(g.gen)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selectedGen === g.gen
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary"
              }`}
            >
              Gen {g.gen} ({g.region})
            </button>
          ))}
        </div>
      </div>

      {/* Result card */}
      <div
        className="rounded-3xl border-2 border-border bg-gradient-to-br p-8 transition-all"
        style={{
          background: `linear-gradient(135deg, ${getTypeColor(primaryType)}22 0%, transparent 60%)`,
        }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Artwork */}
          <div className="relative aspect-square max-w-md mx-auto w-full">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Shuffle className="h-16 w-16 animate-pulse text-muted-foreground" />
              </div>
            ) : (
              artworkUrl && (
                <>
                  <img
                    src={artworkUrl}
                    alt={pokemon ? formatPokemonName(pokemon.name) : "Pokémon"}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    loading="eager"
                  />
                  <button
                    onClick={() => setShowShiny(!showShiny)}
                    className="absolute top-0 right-0 px-3 py-1.5 rounded-full bg-yellow-400 text-yellow-950 text-xs font-bold shadow-md hover:scale-105 transition-transform"
                  >
                    {showShiny ? "✨ Shiny" : "Normal"}
                  </button>
                </>
              )
            )}
          </div>

          {/* Info */}
          <div className="space-y-4">
            {pokemon && (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground">
                    #{pokemon.id.toString().padStart(4, "0")}
                  </span>
                  <h2 className="text-3xl font-bold">
                    {formatPokemonName(pokemon.name)}
                  </h2>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {pokemon.types.map((t) => (
                    <span
                      key={t.type.name}
                      className="px-3 py-1 rounded-full text-white text-sm font-semibold shadow-sm"
                      style={{ backgroundColor: getTypeColor(t.type.name) }}
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="text-muted-foreground">Height</div>
                    <div className="font-semibold">{formatHeight(pokemon.height)}</div>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="text-muted-foreground">Weight</div>
                    <div className="font-semibold">{formatWeight(pokemon.weight)}</div>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={pick}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4" />
                    Pick Another Starter
                  </button>
                  <button
                    onClick={playCry}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-3 hover:bg-secondary transition-colors"
                    title="Play cry"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={toggleFavorite}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-3 hover:bg-secondary transition-colors"
                    title="Add to favorites"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        isFavorite(pokemon.id) ? "fill-yellow-400 text-yellow-400" : ""
                      }`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-3 hover:bg-secondary transition-colors"
                    title="Share"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* All starters grid */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">All 27 Starter Pokémon</h3>
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-3">
          {STARTER_GENERATIONS.flatMap((g) =>
            g.ids.map((id, idx) => (
              <button
                key={id}
                onClick={() => {
                  setSelectedGen(g.gen);
                  // Force pick this specific starter
                  setLoading(true);
                  fetchPokemon(id)
                    .then((p) => {
                      setPokemon(p);
                      setShowShiny(false);
                      track({ type: "generate", pokemonIds: [p.id] });
                    })
                    .finally(() => setLoading(false));
                }}
                className="aspect-square rounded-lg border border-border hover:border-primary transition-colors overflow-hidden bg-background"
                title={`${g.names[idx]} (Gen ${g.gen})`}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={g.names[idx]}
                  className="w-full h-full object-contain p-1"
                  loading="lazy"
                />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
