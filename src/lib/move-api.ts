/**
 * Move API helpers — uses PokeAPI /move endpoint.
 * Same pattern as pokemon-api.ts: client-side fetching with in-memory cache.
 */

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

// In-memory cache to avoid refetching the same move
const moveCache = new Map<string, Move>();
const moveListCache = new Map<string, MoveListResult>();

export interface Move {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number | null;
  priority: number;
  power: number | null;
  damage_class: { name: string; url: string };
  effect_entries: {
    effect: string;
    short_effect: string;
    language: { name: string };
  }[];
  learned_by_pokemon: { name: string; url: string }[];
  machines: { machine: { url: string }; version_group: { name: string; url: string } }[];
  meta: {
    min_hits: number | null;
    max_hits: number | null;
    min_turns: number | null;
    max_turns: number | null;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
    ailment: { name: string; url: string };
    category: { name: string; url: string };
  };
  names: { name: string; language: { name: string } }[];
  stat_changes: { change: number; stat: { name: string; url: string } }[];
  target: { name: string; url: string };
  type: { name: string; url: string };
  generation: { name: string; url: string };
  contest_type: { name: string; url: string } | null;
}

export interface MoveListResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

/**
 * Fetch a single move by name or ID. Cached for 24h.
 */
export async function fetchMove(nameOrId: string | number): Promise<Move> {
  const key = String(nameOrId).toLowerCase();
  if (moveCache.has(key)) return moveCache.get(key)!;

  const res = await fetch(`${POKEAPI_BASE}/move/${key}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Failed to fetch move ${nameOrId}`);
  const data: Move = await res.json();
  moveCache.set(key, data);
  moveCache.set(String(data.id), data); // also cache by ID
  return data;
}

/**
 * Fetch the full list of moves. Cached in memory after first call.
 */
export async function fetchMoveList(limit = 1000): Promise<MoveListResult> {
  const cacheKey = String(limit);
  if (moveListCache.has(cacheKey)) return moveListCache.get(cacheKey)!;

  const res = await fetch(`${POKEAPI_BASE}/move?limit=${limit}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to fetch move list");
  const data: MoveListResult = await res.json();
  moveListCache.set(cacheKey, data);
  return data;
}

/**
 * Get a clean English effect text from move data.
 * Replaces $effect_chance with the actual percentage.
 */
export function getEnglishEffect(move: Move): string {
  const entry = move.effect_entries.find((e) => e.language.name === "en");
  if (!entry) return "";
  let text = entry.effect;
  if (move.effect_chance) {
    text = text.replace(/\$effect_chance/g, String(move.effect_chance));
  }
  return text;
}

export function getEnglishShortEffect(move: Move): string {
  const entry = move.effect_entries.find((e) => e.language.name === "en");
  if (!entry) return "";
  let text = entry.short_effect;
  if (move.effect_chance) {
    text = text.replace(/\$effect_chance/g, String(move.effect_chance));
  }
  return text;
}

/**
 * Format a move name (e.g., "thunderbolt" → "Thunderbolt", "hidden-power" → "Hidden Power")
 */
export function formatMoveName(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/**
 * Format a damage class name (e.g., "special" → "Special")
 */
export function formatDamageClass(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Format a target name (e.g., "selected-pokemon" → "Selected Pokémon")
 */
export function formatTarget(name: string): string {
  return name
    .split("-")
    .map((part) => {
      if (part === "pokemon") return "Pokémon";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

/**
 * Get the type color for a move (matches Pokemon type colors).
 */
export function getMoveTypeColor(typeName: string): string {
  const colors: Record<string, string> = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };
  return colors[typeName] ?? "#777";
}

/**
 * Get the damage class color (Physical=orange, Special=blue, Status=gray)
 */
export function getDamageClassColor(className: string): string {
  if (className === "physical") return "#C22E28";
  if (className === "special") return "#6390F0";
  return "#777"; // status
}

/**
 * Get the damage class icon emoji
 */
export function getDamageClassIcon(className: string): string {
  if (className === "physical") return "💥";
  if (className === "special") return "✨";
  return "📊";
}

/**
 * Extract the Pokémon ID from a species URL.
 */
export function extractPokemonIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Format an ailment name (e.g., "paralysis" → "Paralysis", "sleep" → "Sleep")
 */
export function formatAilment(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/**
 * All 18 Pokémon types (re-exported from pokemon-api for convenience).
 */
export const MOVE_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

/**
 * Check if a move is a Z-move (typically high power, ends with -z in some formats).
 * Note: PokeAPI doesn't have a direct flag; we use a heuristic based on name patterns.
 */
export function isZMove(name: string): boolean {
  // Z-moves in PokeAPI have names like "breakneck-blitz--physical" or similar
  return name.includes("--");
}
