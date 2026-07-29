"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "pokegen-favorites";
const HISTORY_KEY = "pokegen-history";
const STATS_KEY = "pokegen-stats";

export interface FavoritePokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  addedAt: number;
}

export interface HistoryEntry {
  id: number;
  name: string;
  sprite: string;
  viewedAt: number;
  tool: string;
}

export interface SiteStats {
  totalGenerated: number;
  totalTeams: number;
  totalGuesses: number;
  correctGuesses: number;
  totalSpins: number;
  toolUsage: Record<string, number>;
  topPokemon: Record<string, number>; // pokemon id -> count
  lastVisit: number;
  visitCount: number;
}

const defaultStats: SiteStats = {
  totalGenerated: 0,
  totalTeams: 0,
  totalGuesses: 0,
  correctGuesses: 0,
  totalSpins: 0,
  toolUsage: {},
  topPokemon: {},
  lastVisit: Date.now(),
  visitCount: 0,
};

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.debug("Failed to write to localStorage:", e);
  }
}

/**
 * Favorites hook - lets users save Pokemon they like.
 * Stored in localStorage so they persist across sessions.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFavorites(readJSON<FavoritePokemon[]>(FAVORITES_KEY, []));
    setLoaded(true);
  }, []);

  const add = useCallback(
    (p: Omit<FavoritePokemon, "addedAt">) => {
      setFavorites((prev) => {
        if (prev.some((f) => f.id === p.id)) return prev;
        const next = [{ ...p, addedAt: Date.now() }, ...prev].slice(0, 50);
        writeJSON(FAVORITES_KEY, next);
        return next;
      });
    },
    []
  );

  const remove = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.id !== id);
      writeJSON(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setFavorites([]);
    writeJSON(FAVORITES_KEY, []);
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((f) => f.id === id),
    [favorites]
  );

  return { favorites, add, remove, clear, isFavorite, loaded };
}

/**
 * History hook - records recently viewed Pokemon.
 */
export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(readJSON<HistoryEntry[]>(HISTORY_KEY, []));
  }, []);

  const add = useCallback((entry: Omit<HistoryEntry, "viewedAt">) => {
    setHistory((prev) => {
      // Remove duplicates of the same id+tool combination
      const filtered = prev.filter(
        (h) => !(h.id === entry.id && h.tool === entry.tool)
      );
      const next = [{ ...entry, viewedAt: Date.now() }, ...filtered].slice(0, 30);
      writeJSON(HISTORY_KEY, next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setHistory([]);
    writeJSON(HISTORY_KEY, []);
  }, []);

  return { history, add, clear };
}

/**
 * Site stats hook - aggregates usage data for the admin dashboard.
 * Data is stored locally per browser, but the admin can see aggregate
 * trends by combining multiple users (in a real backend setup).
 */
export function useSiteStats() {
  const [stats, setStats] = useState<SiteStats>(defaultStats);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = readJSON<SiteStats>(STATS_KEY, defaultStats);
    // Track visit
    const today = new Date().toDateString();
    const lastVisitDate = new Date(stored.lastVisit).toDateString();
    const newVisitCount =
      today === lastVisitDate ? stored.visitCount : stored.visitCount + 1;
    const updated = {
      ...stored,
      lastVisit: Date.now(),
      visitCount: newVisitCount,
    };
    setStats(updated);
    writeJSON(STATS_KEY, updated);
    setLoaded(true);
  }, []);

  const track = useCallback(
    (event: {
      type: "generate" | "team" | "guess" | "spin" | "randomize" | "compare";
      pokemonIds?: number[];
      correct?: boolean;
    }) => {
      setStats((prev) => {
        const next: SiteStats = {
          ...prev,
          toolUsage: { ...prev.toolUsage },
          topPokemon: { ...prev.topPokemon },
        };
        switch (event.type) {
          case "generate":
            next.totalGenerated += 1;
            next.toolUsage.generator = (next.toolUsage.generator ?? 0) + 1;
            break;
          case "team":
            next.totalTeams += 1;
            next.toolUsage.team = (next.toolUsage.team ?? 0) + 1;
            break;
          case "guess":
            next.totalGuesses += 1;
            if (event.correct) next.correctGuesses += 1;
            next.toolUsage.guess = (next.toolUsage.guess ?? 0) + 1;
            break;
          case "spin":
            next.totalSpins += 1;
            next.toolUsage.wheel = (next.toolUsage.wheel ?? 0) + 1;
            break;
          case "randomize":
            next.totalGenerated += 1;
            next.toolUsage.randomizer = (next.toolUsage.randomizer ?? 0) + 1;
            break;
          case "compare":
            next.toolUsage.compare = (next.toolUsage.compare ?? 0) + 1;
            break;
        }
        if (event.pokemonIds) {
          event.pokemonIds.forEach((id) => {
            next.topPokemon[String(id)] = (next.topPokemon[String(id)] ?? 0) + 1;
          });
        }
        writeJSON(STATS_KEY, next);
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    setStats(defaultStats);
    writeJSON(STATS_KEY, defaultStats);
  }, []);

  return { stats, track, reset, loaded };
}
