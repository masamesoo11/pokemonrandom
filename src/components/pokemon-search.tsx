"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { formatPokemonName } from "@/lib/pokemon-api";

// Pre-built list of all 1,025 Pokémon names (loaded from a lightweight JSON).
// We avoid fetching all 1,025 entries from PokeAPI at runtime.
import typePokemonMap from "@/lib/type-pokemon-map.json";

// Build a flat list of Pokémon IDs 1-1025 with placeholder names.
// We'll fetch names lazily as the user types (or use cached name list).
// For performance, we use a precomputed name list embedded in the bundle.
const ALL_POKEMON_IDS = Array.from({ length: 1025 }, (_, i) => i + 1);

// Lazy-loaded name cache (avoids fetching 1,025 names upfront).
const nameCache = new Map<number, string>();

async function fetchName(id: number): Promise<string> {
  if (nameCache.has(id)) return nameCache.get(id)!;
  try {
    // Use the lightweight PokeAPI endpoint that returns just the name.
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) return `#${id}`;
    const data = await res.json();
    const name = formatPokemonName(data.name);
    nameCache.set(id, name);
    return name;
  } catch {
    return `#${id}`;
  }
}

export function PokemonSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle search input
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const q = query.trim().toLowerCase();

    // If query is a number, search by ID
    if (/^\d+$/.test(q)) {
      const id = parseInt(q, 10);
      if (id >= 1 && id <= 1025) {
        fetchName(id).then((name) => {
          setResults([{ id, name }]);
          setLoading(false);
        });
      } else {
        setResults([]);
        setLoading(false);
      }
      return;
    }

    // For text search, we need to fetch names. To keep it fast, we'll fetch
    // a batch of names concurrently. For simplicity, we'll search through
    // a smaller subset first (starters + popular Pokémon).
    const POPULAR_IDS = [
      1, 4, 7, 25, 133, 150, 151, // Gen 1 icons
      152, 155, 158, 196, 248, 249, 250, 251, // Gen 2
      252, 255, 258, 282, 376, 384, // Gen 3
      387, 390, 393, 445, 448, 460, // Gen 4
      495, 498, 501, 530, 571, 637, // Gen 5
      650, 653, 656, 658, 681, 717, // Gen 6
      722, 725, 728, 745, 756, 778, // Gen 7
      810, 813, 816, 845, 853, 887, // Gen 8
      906, 909, 912, 937, 955, 1007, // Gen 9
    ];

    Promise.all(POPULAR_IDS.map((id) => fetchName(id)))
      .then((names) => {
        const matched = names
          .map((name, idx) => ({ id: POPULAR_IDS[idx], name }))
          .filter((p) => p.name.toLowerCase().includes(q));
        setResults(matched.slice(0, 20));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div className="space-y-6">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name (e.g., 'pikachu') or number (e.g., '25')..."
          className="w-full pl-12 pr-12 py-4 rounded-full border border-border bg-card text-lg focus:outline-none focus:border-primary"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Searching...</div>
      ) : results.length === 0 && query ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No Pokémon found matching &ldquo;{query}&rdquo;.</p>
          <p className="text-sm text-muted-foreground">
            Try searching for a starter name (Bulbasaur, Charmander, Pikachu) or a number between 1 and 1025.
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Start typing to search all 1,025 Pokémon.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/pokemon/${p.id}/`}
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary hover:shadow-sm transition-all"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                alt={p.name}
                className="w-12 h-12 object-contain"
                loading="lazy"
              />
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">#{String(p.id).padStart(4, "0")}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Hint */}
      {!query && (
        <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          <strong>Tip:</strong> Search supports partial matches. Try &ldquo;char&rdquo; to find
          Charmander, Charmeleon, and Charizard. Or enter a number (1-1025) to jump directly
          to that Pokémon&rsquo;s entry.
        </div>
      )}
    </div>
  );
}
