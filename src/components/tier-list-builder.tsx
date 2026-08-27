"use client";

import { useState, useRef } from "react";
import { Download, RotateCcw } from "lucide-react";
import { GENERATIONS, getSpriteUrl } from "@/lib/pokemon-api";
import { toast } from "sonner";

interface TierSlot {
  id: number;
}

const TIERS = ["S", "A", "B", "C", "D", "F"] as const;
const TIER_COLORS: Record<string, string> = {
  S: "bg-red-500",
  A: "bg-orange-500",
  B: "bg-yellow-500",
  C: "bg-green-500",
  D: "bg-blue-500",
  F: "bg-gray-500",
};

export function TierListBuilder() {
  const [selectedGen, setSelectedGen] = useState<number>(1);
  const [tiers, setTiers] = useState<Record<string, TierSlot[]>>({
    S: [], A: [], B: [], C: [], D: [], F: [],
  });
  const [pool, setPool] = useState<TierSlot[]>([]);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load Pokémon pool when generation changes
  const loadGeneration = (gen: number) => {
    setSelectedGen(gen);
    const g = GENERATIONS[gen - 1];
    const ids = Array.from({ length: g.range[1] - g.range[0] + 1 }, (_, i) => g.range[0] + i);
    // Only show first 30 to keep the UI manageable
    setPool(ids.slice(0, 30).map((id) => ({ id })));
    setTiers({ S: [], A: [], B: [], C: [], D: [], F: [] });
  };

  // Initialize with Gen 1
  useState(() => {
    loadGeneration(1);
  });

  const handleDragStart = (id: number) => setDraggedId(id);
  const handleDrop = (target: string) => {
    if (draggedId === null) return;
    setTiers((prev) => {
      const newTiers = { ...prev };
      // Remove from all tiers
      for (const t of TIERS) {
        newTiers[t] = newTiers[t].filter((s) => s.id !== draggedId);
      }
      // Remove from pool
      setPool((p) => p.filter((s) => s.id !== draggedId));
      // Add to target
      if (target === "pool") {
        setPool((p) => [...p, { id: draggedId }]);
      } else {
        newTiers[target] = [...newTiers[target], { id: draggedId }];
      }
      return newTiers;
    });
    setDraggedId(null);
  };

  const reset = () => {
    loadGeneration(selectedGen);
    toast.success("Tier list reset");
  };

  const exportImage = () => {
    toast.info("Image export coming soon! For now, take a screenshot.");
  };

  return (
    <div className="space-y-6">
      {/* Generation selector */}
      <div className="rounded-2xl border border-border bg-card p-4 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium">Generation:</span>
        <select
          value={selectedGen}
          onChange={(e) => loadGeneration(parseInt(e.target.value, 10))}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
        >
          {GENERATIONS.map((g, idx) => (
            <option key={idx} value={idx + 1}>
              {g.name} ({g.region})
            </option>
          ))}
        </select>
        <div className="ml-auto flex gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-sm hover:bg-secondary transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <button
            onClick={exportImage}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
          >
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Tier rows */}
      <div className="space-y-2">
        {TIERS.map((tier) => (
          <div
            key={tier}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(tier)}
            className="flex items-stretch rounded-lg border border-border overflow-hidden"
          >
            <div
              className={`${TIER_COLORS[tier]} text-white font-bold text-2xl flex items-center justify-center w-16`}
            >
              {tier}
            </div>
            <div className="flex-1 bg-card p-2 min-h-[80px] flex flex-wrap gap-2 items-center">
              {tiers[tier].length === 0 ? (
                <span className="text-xs text-muted-foreground px-2">Drop Pokémon here</span>
              ) : (
                tiers[tier].map((slot) => (
                  <div
                    key={slot.id}
                    draggable
                    onDragStart={() => handleDragStart(slot.id)}
                    className="cursor-move"
                  >
                    <img
                      src={getSpriteUrl(slot.id)}
                      alt={`#${slot.id}`}
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pokémon pool */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop("pool")}
        className="rounded-2xl border border-border bg-card p-4"
      >
        <h3 className="text-sm font-semibold mb-3">Pokémon Pool ({pool.length})</h3>
        {pool.length === 0 ? (
          <p className="text-sm text-muted-foreground">All Pokémon have been assigned to tiers.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {pool.map((slot) => (
              <div
                key={slot.id}
                draggable
                onDragStart={() => handleDragStart(slot.id)}
                className="cursor-move p-1 rounded hover:bg-secondary/50"
              >
                <img
                  src={getSpriteUrl(slot.id)}
                  alt={`#${slot.id}`}
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Drag and drop Pokémon from the pool into tiers. Drag between tiers to rearrange.
        Showing first 30 Pokémon of {GENERATIONS[selectedGen - 1].region}.
      </p>
    </div>
  );
}
