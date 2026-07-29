"use client";

import { useState } from "react";
import { Table, GitCompare } from "lucide-react";
import {
  POKEMON_TYPES,
  getTypeColor,
  getTypeClass,
} from "@/lib/pokemon-api";
import { cn } from "@/lib/utils";

/**
 * Type effectiveness chart for Pokemon.
 * Rows = attacking type, Cols = defending type.
 * Cell value: multiplier applied to damage (0, 0.5, 1, 2).
 *
 * Source: official Pokemon type chart. Dual-type defenders multiply values
 * (e.g. Fire→Grass/Bug = 2*2 = 4x).
 */
// Compact format: each row is the attacking type, columns are defending types in POKEMON_TYPES order
// Values: 0 = no effect, 1 = normal, 2 = super effective, 3 = half damage (we store 0.5 as 3)
// We use integers to keep the file small.
const TYPE_CHART: Record<string, number[]> = {
  normal:     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  fire:       [1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
  water:      [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  electric:   [1, 1, 2, 1, 1, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1],
  grass:      [1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
  ice:        [1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1],
  fighting:   [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 0, 1, 1, 2, 1],
  poison:     [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2],
  ground:     [1, 2, 1, 2, 1, 1, 1, 2, 1, 0, 1, 1, 2, 1, 1, 1, 2, 1],
  flying:     [1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
  psychic:    [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  bug:        [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1],
  rock:       [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1],
  ghost:      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1],
  dragon:     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0],
  dark:       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2],
  steel:      [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2],
  fairy:      [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1],
};

function getMultiplierValue(code: number): number {
  if (code === 0) return 0;
  if (code === 3) return 0.5;
  return code;
}

function getCellClass(code: number): string {
  if (code === 0) return "bg-stone-800 text-white"; // no effect
  if (code === 3) return "bg-red-200 text-red-900 dark:bg-red-900/60 dark:text-red-100"; // not very effective
  if (code === 2) return "bg-emerald-400 text-emerald-950"; // super effective
  return "bg-secondary text-muted-foreground";
}

function getCellLabel(code: number): string {
  if (code === 0) return "0×";
  if (code === 3) return "½×";
  if (code === 2) return "2×";
  return "";
}

export function TypeChartSection() {
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  return (
    <section id="type-chart" className="scroll-mt-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300 text-xs font-semibold mb-3">
          <Table className="h-3.5 w-3.5" />
          TYPE CHART
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Pokemon Type Effectiveness Chart
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Complete type matchup chart. Rows are the attacking type, columns are
          the defending type. Hover any row or column to highlight.
        </p>
      </div>

      <div className="rounded-2xl border-2 border-border bg-card p-3 sm:p-5 shadow-md overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 bg-card z-10 p-1 text-center min-w-[60px]">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  Atk \ Def
                </span>
              </th>
              {POKEMON_TYPES.map((t) => (
                <th
                  key={t.name}
                  className="p-1 text-center min-w-[40px]"
                  onMouseEnter={() => setHoveredType(t.name)}
                  onMouseLeave={() => setHoveredType(null)}
                >
                  <div
                    className={cn(
                      "mx-auto h-7 w-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white uppercase transition-transform",
                      hoveredType === t.name && "scale-125 ring-2 ring-foreground"
                    )}
                    style={{ background: t.color }}
                    title={t.name}
                  >
                    {t.name.slice(0, 2)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {POKEMON_TYPES.map((attacker, ai) => (
              <tr key={attacker.name}>
                <td
                  className="sticky left-0 bg-card z-10 p-1"
                  onMouseEnter={() => setHoveredType(attacker.name)}
                  onMouseLeave={() => setHoveredType(null)}
                >
                  <div
                    className={cn(
                      "h-7 min-w-[56px] rounded-full flex items-center justify-center px-2 text-[10px] font-bold text-white uppercase transition-transform",
                      hoveredType === attacker.name && "scale-105 ring-2 ring-foreground"
                    )}
                    style={{ background: attacker.color }}
                  >
                    {attacker.name}
                  </div>
                </td>
                {TYPE_CHART[attacker.name].map((code, di) => {
                  const defender = POKEMON_TYPES[di];
                  const isHighlighted =
                    hoveredType === attacker.name ||
                    hoveredType === defender.name;
                  return (
                    <td key={di} className="p-0.5">
                      <div
                        className={cn(
                          "h-7 w-full rounded-md flex items-center justify-center text-[10px] font-bold transition-all",
                          getCellClass(code),
                          isHighlighted && "ring-2 ring-foreground scale-105"
                        )}
                        title={`${attacker.name} → ${defender.name}: ${getMultiplierValue(code)}×`}
                      >
                        {getCellLabel(code) || "—"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded bg-emerald-400" />
            <span>Super effective (2×)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded bg-red-200 dark:bg-red-900/60" />
            <span>Not very effective (½×)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded bg-stone-800" />
            <span>No effect (0×)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded bg-secondary" />
            <span>Normal (1×)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
