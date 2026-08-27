"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Download, Upload, Plus, Calendar } from "lucide-react";
import { formatPokemonName } from "@/lib/pokemon-api";
import { toast } from "sonner";

interface SavedTeam {
  id: string;
  name: string;
  pokemonIds: number[];
  createdAt: string;
}

const STORAGE_KEY = "pokemonrandom_saved_teams";

function loadTeams(): SavedTeam[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as SavedTeam[]) : [];
  } catch {
    return [];
  }
}

function saveTeams(teams: SavedTeam[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
}

export function SavedTeamsManager() {
  const [teams, setTeams] = useState<SavedTeam[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTeams(loadTeams());
    setMounted(true);
  }, []);

  const deleteTeam = (id: string) => {
    const updated = teams.filter((t) => t.id !== id);
    setTeams(updated);
    saveTeams(updated);
    toast.success("Team deleted");
  };

  const exportTeams = () => {
    const blob = new Blob([JSON.stringify(teams, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pokemon-teams-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Teams exported");
  };

  const importTeams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target?.result as string) as SavedTeam[];
        if (!Array.isArray(imported)) throw new Error("Invalid format");
        const merged = [...teams, ...imported];
        setTeams(merged);
        saveTeams(merged);
        toast.success(`Imported ${imported.length} teams`);
      } catch {
        toast.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  if (!mounted) {
    return <div className="py-12 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/random-team/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow hover:shadow-md transition-all"
        >
          <Plus className="h-4 w-4" /> Build New Team
        </Link>
        <button
          onClick={exportTeams}
          disabled={teams.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-semibold hover:bg-secondary transition-colors disabled:opacity-50"
        >
          <Download className="h-4 w-4" /> Export All
        </button>
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-semibold hover:bg-secondary transition-colors cursor-pointer">
          <Upload className="h-4 w-4" /> Import
          <input type="file" accept=".json" onChange={importTeams} className="hidden" />
        </label>
      </div>

      {/* Teams list */}
      {teams.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground mb-4">You have no saved teams yet.</p>
          <Link
            href="/random-team/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow"
          >
            <Plus className="h-4 w-4" /> Build Your First Team
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{team.name}</h3>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(team.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <button
                  onClick={() => deleteTeam(team.id)}
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-red-500 transition-colors"
                  title="Delete team"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {team.pokemonIds.map((id, idx) => (
                  <Link
                    key={idx}
                    href={`/pokemon/${id}/`}
                    className="flex flex-col items-center p-2 rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                      alt={`Pokémon #${id}`}
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                    />
                    <span className="text-xs text-muted-foreground mt-1">#{String(id).padStart(4, "0")}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
