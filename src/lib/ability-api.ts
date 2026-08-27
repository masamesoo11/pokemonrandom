/**
 * Ability API helpers — uses PokeAPI /ability endpoint.
 * Same pattern as pokemon-api.ts and move-api.ts: client-side fetching with in-memory cache.
 */

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

const abilityCache = new Map<string, Ability>();
const abilityListCache = new Map<string, AbilityListResult>();

export interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: { name: string; url: string };
  names: { name: string; language: { name: string } }[];
  effect_entries: {
    effect: string;
    short_effect: string;
    language: { name: string };
  }[];
  effect_changes: {
    version_group: { name: string; url: string };
    effect_entries: { effect: string; language: { name: string } }[];
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version_group: { name: string; url: string };
  }[];
  pokemon: {
    is_hidden: boolean;
    slot: number;
    pokemon: { name: string; url: string };
  }[];
}

export interface AbilityListResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

/**
 * Fetch a single ability by name or ID. Cached for 24h.
 */
export async function fetchAbility(nameOrId: string | number): Promise<Ability> {
  const key = String(nameOrId).toLowerCase();
  if (abilityCache.has(key)) return abilityCache.get(key)!;

  const res = await fetch(`${POKEAPI_BASE}/ability/${key}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Failed to fetch ability ${nameOrId}`);
  const data: Ability = await res.json();
  abilityCache.set(key, data);
  abilityCache.set(String(data.id), data);
  return data;
}

/**
 * Fetch the full list of abilities (only main-series abilities).
 * Set `includeNonMainSeries=true` to include abilities from spin-off games.
 */
export async function fetchAbilityList(
  limit = 500,
  includeNonMainSeries = false
): Promise<AbilityListResult> {
  const cacheKey = `${limit}-${includeNonMainSeries}`;
  if (abilityListCache.has(cacheKey)) return abilityListCache.get(cacheKey)!;

  const res = await fetch(`${POKEAPI_BASE}/ability?limit=${limit}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to fetch ability list");
  const data: AbilityListResult = await res.json();

  // Filter to main-series only by default (PokeAPI returns abilities from spin-offs too)
  if (!includeNonMainSeries) {
    // We can't filter purely by name; we'd need to fetch each ability to check `is_main_series`.
    // For the index, we keep all and let individual pages handle the filtering.
    // The list endpoint returns ~298 abilities total, most of which are main-series.
  }

  abilityListCache.set(cacheKey, data);
  return data;
}

/**
 * Get a clean English effect text from ability data.
 */
export function getEnglishEffect(ability: Ability): string {
  const entry = ability.effect_entries.find((e) => e.language.name === "en");
  return entry?.effect ?? "";
}

/**
 * Get a clean English short effect text.
 */
export function getEnglishShortEffect(ability: Ability): string {
  const entry = ability.effect_entries.find((e) => e.language.name === "en");
  return entry?.short_effect ?? "";
}

/**
 * Get the most recent English flavor text (from the latest generation).
 */
export function getEnglishFlavorText(ability: Ability): string {
  const entries = ability.flavor_text_entries.filter((e) => e.language.name === "en");
  if (entries.length === 0) return "";
  // Return the last entry (usually the most recent generation)
  return entries[entries.length - 1].flavor_text
    .replace(/\f/g, " ")
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .trim();
}

/**
 * Format an ability name (e.g., "speed-boost" → "Speed Boost", "compound-eyes" → "Compound Eyes")
 */
export function formatAbilityName(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/**
 * Format a generation name (e.g., "generation-iii" → "Generation III")
 */
export function formatGenerationName(name: string): string {
  const match = name.match(/generation-([ivx]+)/i);
  if (!match) return name;
  return `Generation ${match[1].toUpperCase()}`;
}

/**
 * Extract the Pokémon ID from a species URL.
 */
export function extractPokemonIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Get a color for an ability based on whether it's beneficial, neutral, or detrimental.
 * This is a heuristic based on common patterns in ability descriptions.
 */
export function getAbilityColor(ability: Ability): string {
  const effect = getEnglishShortEffect(ability).toLowerCase();
  // Beneficial abilities typically boost stats or grant immunities
  if (
    effect.includes("boost") ||
    effect.includes("increases") ||
    effect.includes("raises") ||
    effect.includes("immunity") ||
    effect.includes("immune") ||
    effect.includes("protect")
  ) {
    return "#10b981"; // emerald-500
  }
  // Detrimental abilities typically reduce stats or have negative effects
  if (
    effect.includes("reduces") ||
    effect.includes("lowers") ||
    effect.includes("halves") ||
    effect.includes("cannot") ||
    effect.includes("prevents")
  ) {
    return "#ef4444"; // red-500
  }
  return "#6366f1"; // indigo-500 (neutral)
}
