import type { PokemonOriginalEntry } from "./types";
import { kantoClassics } from "./kanto-classics";
import { kantoFavorites } from "./kanto-favorites";
import { kantoLegends } from "./kanto-legends";
import { johto } from "./johto";
import { hoenn } from "./hoenn";
import { sinnoh } from "./sinnoh";
import { unovaKalos } from "./unova-kalos";
import { alolaGalar } from "./alola-galar";
import { paldea } from "./paldea";

/**
 * Hand-written editorial content for the 65 most-searched Pokémon pages.
 * Roughly 400 unique words per entry: tagline + 2-paragraph overview,
 * a concrete battle guide, and five verified trivia facts.
 */
export const pokemonOriginalContent: Record<number, PokemonOriginalEntry> = {
  ...kantoClassics,
  ...kantoFavorites,
  ...kantoLegends,
  ...johto,
  ...hoenn,
  ...sinnoh,
  ...unovaKalos,
  ...alolaGalar,
  ...paldea,
};

export const originalContentCount = Object.keys(pokemonOriginalContent).length;

export function getPokemonOriginalContent(
  id: number,
): PokemonOriginalEntry | undefined {
  return pokemonOriginalContent[id];
}
