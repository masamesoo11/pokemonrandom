// Pokemon API helpers - using PokeAPI (https://pokeapi.co) - free, no auth required

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface PokemonAbility {
  ability: { name: string; url: string };
  is_hidden: boolean;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number; // decimetres
  weight: number; // hectograms
  base_experience: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
        front_shiny: string | null;
      };
      dream_world: {
        front_default: string | null;
      };
    };
  };
  cries?: {
    latest?: string;
    legacy?: string;
  };
}

export interface PokemonListResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

// Cache to avoid refetching the same Pokemon
const pokemonCache = new Map<number, Pokemon>();
const listCache = new Map<string, PokemonListResult>();

/**
 * Fetch a single Pokemon by its pokedex ID (1-1025)
 */
export async function fetchPokemon(id: number): Promise<Pokemon> {
  if (pokemonCache.has(id)) return pokemonCache.get(id)!;

  const res = await fetch(`${POKEAPI_BASE}/pokemon/${id}`, {
    next: { revalidate: 86400 }, // cache for 24h
  });
  if (!res.ok) throw new Error(`Failed to fetch Pokemon #${id}`);
  const data: Pokemon = await res.json();
  pokemonCache.set(id, data);
  return data;
}

/**
 * Fetch a random Pokemon from a range (defaults to 1-1025, all generations)
 */
export async function fetchRandomPokemon(
  minId = 1,
  maxId = 1025
): Promise<Pokemon> {
  const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  return fetchPokemon(id);
}

/**
 * Fetch multiple random unique Pokemon (for team builder etc.)
 */
export async function fetchRandomTeam(
  count = 6,
  minId = 1,
  maxId = 1025
): Promise<Pokemon[]> {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * (maxId - minId + 1)) + minId);
  }
  return Promise.all([...ids].map((id) => fetchPokemon(id)));
}

/**
 * Get the official artwork URL for a Pokemon ID (no API call needed)
 */
export function getArtworkUrl(id: number, shiny = false): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
    shiny ? "shiny/" : ""
  }${id}.png`;
}

/**
 * Get the sprite URL for a Pokemon ID (smaller, faster load)
 */
export function getSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

/**
 * Get the animated cry (sound) URL for a Pokemon ID
 */
export function getCryUrl(id: number): string {
  return `${POKEAPI_BASE}/pokemon/${id}`;
}

/**
 * Fetch the full list of Pokemon (used to populate a search index)
 * Cached in memory after first call.
 */
export async function fetchPokemonList(
  limit = 1025,
  offset = 0
): Promise<PokemonListResult> {
  const cacheKey = `${limit}-${offset}`;
  if (listCache.has(cacheKey)) return listCache.get(cacheKey)!;

  const res = await fetch(
    `${POKEAPI_BASE}/pokemon?limit=${limit}&offset=${offset}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Pokemon list");
  const data: PokemonListResult = await res.json();
  listCache.set(cacheKey, data);
  return data;
}

/**
 * Format a Pokemon name (e.g. "nidoran-f" -> "Nidoran ♀")
 */
export function formatPokemonName(name: string): string {
  return name
    .split("-")
    .map((part) => {
      if (part === "f") return "♀";
      if (part === "m") return "♂";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

/**
 * Format height (decimetres -> metres)
 */
export function formatHeight(decimetres: number): string {
  return `${(decimetres / 10).toFixed(1)} m`;
}

/**
 * Format weight (hectograms -> kilograms)
 */
export function formatWeight(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1)} kg`;
}

/**
 * Generation ranges (National Pokedex IDs)
 */
export const GENERATIONS: { name: string; range: [number, number]; region: string }[] = [
  { name: "Gen I", range: [1, 151], region: "Kanto" },
  { name: "Gen II", range: [152, 251], region: "Johto" },
  { name: "Gen III", range: [252, 386], region: "Hoenn" },
  { name: "Gen IV", range: [387, 493], region: "Sinnoh" },
  { name: "Gen V", range: [494, 649], region: "Unova" },
  { name: "Gen VI", range: [650, 721], region: "Kalos" },
  { name: "Gen VII", range: [722, 809], region: "Alola" },
  { name: "Gen VIII", range: [810, 905], region: "Galar" },
  { name: "Gen IX", range: [906, 1025], region: "Paldea" },
];

/**
 * Legendary and Mythical Pokemon IDs (subset — added manually for filtering)
 * Note: this list is approximate; PokeAPI provides `is_legendary`/`is_mythical` on the species endpoint,
 * but to avoid extra fetches we maintain a static list of well-known legendaries.
 */
export const LEGENDARY_IDS = new Set<number>([
  // Gen I - legendary birds + Mewtwo
  144, 145, 146, 150, 151,
  // Gen II - beasts + Lugia/Ho-Oh/Celebi
  243, 244, 245, 249, 250, 251,
  // Gen III - regis, weather, eon, Lati@s
  377, 378, 379, 380, 381, 382, 383, 384, 385, 386,
  // Gen IV
  480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494,
  // Gen V
  638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649,
  // Gen VI
  716, 717, 718, 719, 720, 721,
  // Gen VII
  772, 773, 785, 786, 787, 788, 789, 790, 791, 792, 793, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809,
  // Gen VIII
  888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 905,
  // Gen IX
  906, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025,
]);

export function isLegendary(id: number): boolean {
  return LEGENDARY_IDS.has(id);
}

/**
 * All Pokemon types with display names + colors
 */
export const POKEMON_TYPES: { name: string; color: string }[] = [
  { name: "normal", color: "#A8A77A" },
  { name: "fire", color: "#EE8130" },
  { name: "water", color: "#6390F0" },
  { name: "electric", color: "#F7D02C" },
  { name: "grass", color: "#7AC74C" },
  { name: "ice", color: "#96D9D6" },
  { name: "fighting", color: "#C22E28" },
  { name: "poison", color: "#A33EA1" },
  { name: "ground", color: "#E2BF65" },
  { name: "flying", color: "#A98FF3" },
  { name: "psychic", color: "#F95587" },
  { name: "bug", color: "#A6B91A" },
  { name: "rock", color: "#B6A136" },
  { name: "ghost", color: "#735797" },
  { name: "dragon", color: "#6F35FC" },
  { name: "dark", color: "#705746" },
  { name: "steel", color: "#B7B7CE" },
  { name: "fairy", color: "#D685AD" },
];

export function getTypeColor(typeName: string): string {
  return POKEMON_TYPES.find((t) => t.name === typeName)?.color ?? "#777";
}

export function getTypeClass(typeName: string): string {
  return `type-${typeName}`;
}

/**
 * Filter Pokemon IDs by type. We use a curated map to avoid extra network calls.
 * Map built from PokeAPI /type endpoint data.
 */
import TYPE_POKEMON_MAP from "./type-pokemon-map.json";

export function getIdsByType(typeName: string): number[] {
  const map = TYPE_POKEMON_MAP as Record<string, number[]>;
  return map[typeName] ?? [];
}

/**
 * Get a random Pokemon ID that matches the given filters.
 * Returns null if no Pokemon matches all filters.
 */
export function pickRandomId(opts: {
  generations?: number[]; // 1-9
  types?: string[]; // empty = any
  legendaryOnly?: boolean;
  excludeLegendary?: boolean;
}): number | null {
  // Build candidate pool
  let pool: number[] = [];

  if (opts.generations && opts.generations.length > 0) {
    opts.generations.forEach((gen) => {
      const g = GENERATIONS[gen - 1];
      if (g) {
        for (let i = g.range[0]; i <= g.range[1]; i++) pool.push(i);
      }
    });
  } else {
    for (let i = 1; i <= 1025; i++) pool.push(i);
  }

  // Filter by type (must match ALL specified types — typically one)
  if (opts.types && opts.types.length > 0) {
    const typeSets = opts.types.map((t) => new Set(getIdsByType(t)));
    pool = pool.filter((id) => typeSets.every((s) => s.has(id)));
  }

  // Filter by legendary status
  if (opts.legendaryOnly) {
    pool = pool.filter((id) => isLegendary(id));
  } else if (opts.excludeLegendary) {
    pool = pool.filter((id) => !isLegendary(id));
  }

  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
