"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Sparkles, Volume2, Star, Share2 } from "lucide-react";
import {
  fetchPokemon,
  formatPokemonName,
  formatHeight,
  formatWeight,
  GENERATIONS,
  getTypeColor,
  type Pokemon,
} from "@/lib/pokemon-api";
import { useFavorites, useHistory, useSiteStats } from "@/lib/use-local-stats";
import { trackEvent } from "@/lib/site-config";
import { toast } from "sonner";

/**
 * RandomPokemonPicker — a minimal, fast, one-click picker.
 * No filters, no settings, just click and get a random Pokémon.
 */
export function RandomPokemonPicker() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showShiny, setShowShiny] = useState(false);
  const { add, remove, isFavorite } = useFavorites();
  const { add: addHistory } = useHistory();
  const { track } = useSiteStats();

  const pick = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const id = Math.floor(Math.random() * 1025) + 1;
      const result = await fetchPokemon(id);
      setPokemon(result);
      setShowShiny(false);
      track({ type: "generate", pokemonIds: [result.id] });
      trackEvent("pick_pokemon", {
        pokemon_id: result.id,
        pokemon_name: result.name,
      });
      addHistory({
        id: result.id,
        name: formatPokemonName(result.name),
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.id}.png`,
        tool: "picker",
      });
    } catch (e) {
      setError("Failed to pick a Pokémon. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [track, addHistory]);

  useEffect(() => {
    pick();
  }, [pick]);

  const artworkUrl = pokemon
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        showShiny ? "shiny/" : ""
      }${pokemon.id}.png`
    : null;

  const primaryType = pokemon?.types?.[0]?.type?.name ?? "normal";
  const typeColor = getTypeColor(primaryType);

  const handleShare = async () => {
    if (!pokemon) return;
    const url = `${window.location.origin}/random-pokemon/?id=${pokemon.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${formatPokemonName(pokemon.name)} — Pokémon`,
          text: `Check out this Pokémon: ${formatPokemonName(pokemon.name)}!`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      }
    } catch {
      // user dismissed share sheet
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
    <div
      className="rounded-3xl border-2 border-border bg-gradient-to-br p-8 transition-all"
      style={{
        background: `linear-gradient(135deg, ${typeColor}22 0%, transparent 60%)`,
      }}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Artwork */}
        <div className="relative aspect-square max-w-md mx-auto w-full">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <RefreshCw className="h-16 w-16 animate-spin text-muted-foreground" />
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
                  Pick Another
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
                      pokemon && isFavorite(pokemon.id)
                        ? "fill-yellow-400 text-yellow-400"
                        : ""
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
  );
}
