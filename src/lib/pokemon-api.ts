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

/**
 * Species data (from /pokemon-species endpoint) — used for flavor text,
 * evolution chain, generation, color, etc.
 */
export interface PokemonSpecies {
  id: number;
  name: string;
  base_happiness: number;
  capture_rate: number;
  color: { name: string };
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }[];
  gender_rate: number; // -1 = genderless, 0 = always male, 8 = always female
  generation: { name: string };
  genera: { genus: string; language: { name: string } }[];
  growth_rate: { name: string };
  habitat: { name: string } | null;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  evolution_chain: { url: string };
}

/**
 * Fetch species data for a given Pokémon ID. Cached for 24h.
 */
export async function fetchSpecies(id: number): Promise<PokemonSpecies> {
  const res = await fetch(`${POKEAPI_BASE}/pokemon-species/${id}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Failed to fetch species #${id}`);
  return res.json();
}

/**
 * Evolution chain data — used to show the full evolution tree.
 */
export interface EvolutionChain {
  id: number;
  chain: {
    species: { name: string; url: string };
    evolves_to: {
      species: { name: string; url: string };
      evolution_details: {
        min_level: number | null;
        item: { name: string } | null;
        trigger: { name: string } | null;
        time_of_day: string;
      }[];
      evolves_to: {
        species: { name: string; url: string };
        evolution_details: {
          min_level: number | null;
          item: { name: string } | null;
          trigger: { name: string } | null;
          time_of_day: string;
        }[];
      }[];
    }[];
  };
}

/**
 * Fetch the evolution chain for a Pokémon species URL.
 */
export async function fetchEvolutionChain(url: string): Promise<EvolutionChain> {
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`Failed to fetch evolution chain`);
  return res.json();
}

/**
 * Extract a clean English flavor text from species data.
 * Removes line breaks and special characters that appear in the raw API response.
 */
export function getEnglishFlavorText(species: PokemonSpecies): string {
  const entry = species.flavor_text_entries.find((e) => e.language.name === "en");
  if (!entry) return "";
  return entry.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ").replace(/\r/g, " ").replace(/‌/g, "").trim();
}

/**
 * Get the English genus (e.g., "Seed Pokémon") from species data.
 */
export function getEnglishGenus(species: PokemonSpecies): string {
  const entry = species.genera.find((g) => g.language.name === "en");
  return entry?.genus ?? "";
}

/**
 * Get the generation number from the generation name (e.g., "generation-i" → 1).
 */
export function getGenerationNumber(genName: string): number {
  const match = genName.match(/generation-([ivx]+)/i);
  if (!match) return 1;
  const roman = match[1].toLowerCase();
  const map: Record<string, number> = {
    i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9,
  };
  return map[roman] ?? 1;
}

/**
 * Get the gender ratio as a readable string.
 * gender_rate: -1 = genderless, 0 = 100% male, 8 = 100% female
 */
export function getGenderRatio(genderRate: number): string {
  if (genderRate === -1) return "Genderless";
  const femalePercent = (genderRate / 8) * 100;
  const malePercent = 100 - femalePercent;
  return `${malePercent}% Male, ${femalePercent}% Female`;
}

/**
 * Extract the Pokémon ID from a species URL (e.g., "https://pokeapi.co/api/v2/pokemon-species/25/" → 25).
 */
export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Get the generation for a Pokémon ID based on its National Pokédex number.
 */
export function getGenerationById(id: number): { name: string; region: string; num: number } {
  for (let i = 0; i < GENERATIONS.length; i++) {
    const g = GENERATIONS[i];
    if (id >= g.range[0] && id <= g.range[1]) {
      return { name: g.name, region: g.region, num: i + 1 };
    }
  }
  return { name: "Gen I", region: "Kanto", num: 1 };
}

/**
 * All Natures in Pokémon (Adamant, Modest, etc.) with their stat effects.
 * Used by the Random Pokémon Generator's Nature filter.
 */
export interface Nature {
  name: string;
  increasedStat: string | null;
  decreasedStat: string | null;
}

export const NATURES: Nature[] = [
  { name: "Hardy", increasedStat: null, decreasedStat: null },
  { name: "Lonely", increasedStat: "Attack", decreasedStat: "Defense" },
  { name: "Brave", increasedStat: "Attack", decreasedStat: "Speed" },
  { name: "Adamant", increasedStat: "Attack", decreasedStat: "Sp. Atk" },
  { name: "Naughty", increasedStat: "Attack", decreasedStat: "Sp. Def" },
  { name: "Bold", increasedStat: "Defense", decreasedStat: "Attack" },
  { name: "Docile", increasedStat: null, decreasedStat: null },
  { name: "Relaxed", increasedStat: "Defense", decreasedStat: "Speed" },
  { name: "Impish", increasedStat: "Defense", decreasedStat: "Sp. Atk" },
  { name: "Lax", increasedStat: "Defense", decreasedStat: "Sp. Def" },
  { name: "Timid", increasedStat: "Speed", decreasedStat: "Attack" },
  { name: "Hasty", increasedStat: "Speed", decreasedStat: "Defense" },
  { name: "Serious", increasedStat: null, decreasedStat: null },
  { name: "Jolly", increasedStat: "Speed", decreasedStat: "Sp. Atk" },
  { name: "Naive", increasedStat: "Speed", decreasedStat: "Sp. Def" },
  { name: "Modest", increasedStat: "Sp. Atk", decreasedStat: "Attack" },
  { name: "Mild", increasedStat: "Sp. Atk", decreasedStat: "Defense" },
  { name: "Quiet", increasedStat: "Sp. Atk", decreasedStat: "Speed" },
  { name: "Bashful", increasedStat: null, decreasedStat: null },
  { name: "Rash", increasedStat: "Sp. Atk", decreasedStat: "Sp. Def" },
  { name: "Calm", increasedStat: "Sp. Def", decreasedStat: "Attack" },
  { name: "Gentle", increasedStat: "Sp. Def", decreasedStat: "Defense" },
  { name: "Sassy", increasedStat: "Sp. Def", decreasedStat: "Speed" },
  { name: "Careful", increasedStat: "Sp. Def", decreasedStat: "Sp. Atk" },
  { name: "Quirky", increasedStat: null, decreasedStat: null },
];

/**
 * Get the evolution stage (Basic, Stage 1, Stage 2) for a Pokémon ID.
 * This is a simplified heuristic based on the species URL position in the evolution chain.
 * For accurate data, fetch the evolution chain.
 */
export function getEvolutionStage(id: number): "Basic" | "Stage 1" | "Stage 2" {
  // Heuristic: well-known basic Pokémon (starters' first forms, common early-game Pokémon)
  const basicIds = new Set<number>([
    // Gen 1 starters + common basics
    1, 4, 7, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 83, 84, 86, 88, 90, 92, 96, 98, 100, 102, 104, 109, 111, 114, 116, 118, 120, 122, 123, 127, 128, 129, 132, 133, 138, 140, 142, 143, 147,
    // Gen 2 starters + basics
    152, 155, 158, 161, 163, 165, 167, 170, 173, 174, 177, 179, 183, 187, 190, 191, 193, 194, 198, 200, 202, 203, 204, 206, 209, 211, 213, 214, 216, 218, 220, 222, 223, 225, 226, 227, 228, 231, 234, 235, 238, 239, 240, 246,
    // Gen 3 starters + basics
    252, 255, 258, 261, 263, 265, 270, 273, 276, 278, 280, 283, 285, 287, 290, 293, 296, 298, 300, 302, 303, 304, 307, 309, 311, 312, 313, 314, 315, 316, 318, 320, 322, 324, 325, 327, 328, 331, 333, 335, 336, 337, 338, 339, 341, 343, 345, 347, 349, 351, 352, 353, 354, 355, 357, 358, 359, 360, 361, 363, 366, 369, 370, 371, 374, 377, 378, 379, 385, 386,
    // Gen 4 starters + basics
    387, 390, 393, 396, 399, 401, 403, 406, 412, 415, 417, 418, 420, 422, 425, 427, 431, 433, 434, 436, 438, 439, 440, 441, 442, 443, 446, 447, 449, 451, 453, 455, 456, 458, 459, 461, 464, 465, 466, 469, 470, 471, 474, 477, 478, 479, 480, 481, 482, 489, 490, 492,
    // Gen 5 starters + basics
    495, 498, 501, 504, 506, 509, 511, 513, 515, 517, 519, 522, 524, 529, 532, 535, 538, 539, 540, 543, 545, 546, 548, 550, 551, 554, 557, 559, 561, 562, 564, 566, 568, 570, 572, 574, 576, 577, 579, 582, 585, 587, 588, 590, 592, 594, 596, 597, 599, 601, 602, 605, 607, 610, 613, 616, 618, 619, 621, 622, 624, 626, 627, 629, 631, 632, 633, 636, 638, 639, 640, 643, 644, 645, 646, 647, 648, 649,
    // Gen 6 starters + basics
    650, 653, 656, 661, 664, 667, 669, 672, 674, 676, 677, 679, 682, 684, 686, 688, 690, 692, 694, 696, 700, 701, 702, 703, 704, 707, 708, 710, 712, 714, 716, 717, 718, 719, 720, 721,
    // Gen 7 starters + basics
    722, 725, 728, 731, 734, 736, 739, 741, 742, 744, 746, 747, 749, 751, 753, 755, 757, 759, 761, 764, 766, 769, 771, 772, 774, 776, 778, 779, 780, 781, 782, 785, 786, 787, 788, 789, 790, 791, 792, 793, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809,
    // Gen 8 starters + basics
    810, 813, 816, 819, 821, 822, 824, 828, 829, 831, 833, 835, 837, 840, 843, 845, 847, 849, 851, 854, 859, 862, 864, 866, 868, 870, 871, 872, 873, 874, 877, 879, 882, 884, 885, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 905,
    // Gen 9 starters + basics
    906, 909, 912, 915, 917, 919, 922, 924, 928, 931, 934, 936, 938, 940, 943, 946, 948, 950, 952, 954, 956, 958, 961, 962, 963, 966, 968, 970, 972, 974, 976, 979, 980, 982, 983, 984, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 998, 999, 1000, 1001, 1003, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025,
  ]);

  if (basicIds.has(id)) return "Basic";

  // Stage 2 = final evolutions of 3-stage lines (heuristic: ~middle of each gen range)
  // This is simplified; for true accuracy we'd fetch evolution chains.
  // For most non-basic Pokémon, default to "Stage 1" (single evolution).
  return "Stage 1";
}
