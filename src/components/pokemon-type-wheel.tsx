"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Disc, RefreshCw } from "lucide-react";
import {
  POKEMON_TYPES,
  getTypeColor,
  fetchPokemon,
  formatPokemonName,
  getTypeClass,
} from "@/lib/pokemon-api";
import { useSiteStats } from "@/lib/use-local-stats";
import { trackEvent } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const WHEEL_SLICES = POKEMON_TYPES;
const SLICE_ANGLE = 360 / WHEEL_SLICES.length;

// Short labels for wheel slices (3-4 chars max to prevent overlap)
const SHORT_LABELS: Record<string, string> = {
  normal: "NORM",
  fire: "FIRE",
  water: "WATER",
  electric: "ELEC",
  grass: "GRASS",
  ice: "ICE",
  fighting: "FIGHT",
  poison: "POIS",
  ground: "GROUND",
  flying: "FLY",
  psychic: "PSY",
  bug: "BUG",
  rock: "ROCK",
  ghost: "GHOST",
  dragon: "DRAG",
  dark: "DARK",
  steel: "STEEL",
  fairy: "FAIRY",
};

// Precompute SVG geometry: slice paths + label positions along the radial direction
const WHEEL_GEOMETRY = WHEEL_SLICES.map((slice, i) => {
  const startAngle = (i * SLICE_ANGLE - 90) * (Math.PI / 180);
  const endAngle = ((i + 1) * SLICE_ANGLE - 90) * (Math.PI / 180);
  const r = 100;
  const x1 = (100 + r * Math.cos(startAngle)).toFixed(4);
  const y1 = (100 + r * Math.sin(startAngle)).toFixed(4);
  const x2 = (100 + r * Math.cos(endAngle)).toFixed(4);
  const y2 = (100 + r * Math.sin(endAngle)).toFixed(4);
  const largeArc = SLICE_ANGLE > 180 ? 1 : 0;
  const path = `M 100 100 L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

  // Midpoint angle for label
  const midAngle = ((i + 0.5) * SLICE_ANGLE - 90) * (Math.PI / 180);

  // Label position: closer to outer edge (r=72) so labels point outward
  const labelR = 70;
  const lx = (100 + labelR * Math.cos(midAngle)).toFixed(4);
  const ly = (100 + labelR * Math.sin(midAngle)).toFixed(4);

  // Rotation: align label along the radial direction (point outward from center)
  // midAngle in degrees + 90 so text reads outward
  const labelRotation = (i + 0.5) * SLICE_ANGLE;

  return {
    path,
    lx,
    ly,
    labelRotation,
    color: slice.color,
    name: slice.name,
    shortLabel: SHORT_LABELS[slice.name] ?? slice.name.slice(0, 4).toUpperCase(),
  };
});

export function PokemonTypeWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [examplePokemon, setExamplePokemon] = useState<
    { id: number; name: string; sprite: string }[]
  >([]);
  const { track } = useSiteStats();

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setSelectedType(null);
    setExamplePokemon([]);

    const extraTurns = 5 + Math.floor(Math.random() * 4);
    const randomSlice = Math.floor(Math.random() * WHEEL_SLICES.length);
    const targetAngle = 360 - randomSlice * SLICE_ANGLE - SLICE_ANGLE / 2;
    const finalRotation = rotation + extraTurns * 360 + (targetAngle - (rotation % 360));

    setRotation(finalRotation);

    setTimeout(() => {
      const landedSlice = Math.floor(
        ((360 - (finalRotation % 360)) / SLICE_ANGLE) % WHEEL_SLICES.length
      );
      const landed = WHEEL_SLICES[landedSlice].name;
      setSelectedType(landed);
      setSpinning(false);
      setHistory((prev) => [landed, ...prev].slice(0, 8));
      track({ type: "spin" });
      trackEvent("spin_wheel", { landed_type: landed });
    }, 4200);
  }, [rotation, spinning, track]);

  useEffect(() => {
    if (!selectedType) return;
    let cancelled = false;
    (async () => {
      try {
        const map = (await import("@/lib/type-pokemon-map.json")) as Record<
          string,
          number[]
        >;
        if (cancelled) return;
        const ids = map[selectedType] ?? [];
        if (ids.length === 0) {
          setExamplePokemon([]);
          return;
        }
        const sample = [...ids].sort(() => Math.random() - 0.5).slice(0, 4);
        const results = await Promise.all(sample.map((id) => fetchPokemon(id)));
        if (cancelled) return;
        setExamplePokemon(
          results.map((p) => ({
            id: p.id,
            name: formatPokemonName(p.name),
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
          }))
        );
      } catch (e) {
        console.error(e);
        if (!cancelled) setExamplePokemon([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedType]);

  const wheelTransitionStyle = useMemo(
    () =>
      spinning
        ? {
            transform: `rotate(${rotation}deg)`,
            transitionDuration: "4s",
            transitionTimingFunction: "cubic-bezier(0.17, 0.67, 0.12, 0.99)",
          }
        : { transform: `rotate(${rotation}deg)`, transitionDuration: "0s" },
    [rotation, spinning]
  );

  return (
    <section id="wheel" className="scroll-mt-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 text-xs font-semibold mb-3">
          <Disc className="h-3.5 w-3.5" />
          TYPE WHEEL
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Pokemon Type Wheel Spinner
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Spin the wheel to get a random Pokemon type, then see examples of Pokemon of
          that type. Great for type-themed challenges and inspiration.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Wheel */}
        <div className="flex flex-col items-center">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96">
            {/* Pointer */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-foreground drop-shadow-md" />

            {/* Wheel container */}
            <div className="relative w-full h-full rounded-full border-8 border-foreground shadow-2xl overflow-hidden bg-white">
              <div
                className="absolute inset-0 transition-transform"
                style={wheelTransitionStyle}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {WHEEL_GEOMETRY.map((g) => {
                    // Determine if the label is in the bottom half (would be upside down)
                    // and flip it for readability
                    const labelAngle = (g.labelRotation + 360) % 360;
                    const isUpsideDown = labelAngle > 90 && labelAngle < 270;
                    // Adjust rotation so text is always readable
                    const adjustedRotation = isUpsideDown
                      ? g.labelRotation + 180
                      : g.labelRotation;

                    return (
                      <g key={g.name}>
                        <path
                          d={g.path}
                          fill={g.color}
                          stroke="white"
                          strokeWidth="1.5"
                        />
                        <text
                          x={g.lx}
                          y={g.ly}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="8"
                          fontWeight="900"
                          fill="white"
                          transform={`rotate(${adjustedRotation}, ${g.lx}, ${g.ly})`}
                          style={{
                            textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {g.shortLabel}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Center hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-foreground border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white" />
            </div>
          </div>

          <button
            onClick={spin}
            disabled={spinning}
            className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-emerald-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
          >
            <RefreshCw className={cn("h-4 w-4", spinning && "animate-spin")} />
            {spinning ? "Spinning..." : "Spin the Wheel"}
          </button>

          {/* History */}
          {history.length > 0 && (
            <div className="mt-6 w-full max-w-md">
              <p className="text-xs font-semibold text-muted-foreground mb-2 text-center">
                Recent Spins
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {history.map((t, i) => (
                  <span
                    key={`${t}-${i}`}
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase",
                      getTypeClass(t)
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result panel */}
        <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-lg min-h-[24rem]">
          {!selectedType ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-12">
              <Disc className="h-12 w-12 mb-3 opacity-30" />
              <p className="font-medium">Spin the wheel to discover a Pokemon type</p>
              <p className="text-xs mt-1">
                You&apos;ll see 4 random Pokemon of that type
              </p>
            </div>
          ) : (
            <div className="animate-slide-up">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-full shadow-md"
                  style={{ background: getTypeColor(selectedType) }}
                />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                    Result
                  </p>
                  <p className="text-2xl font-extrabold capitalize">{selectedType}</p>
                </div>
              </div>

              <p className="text-sm font-semibold text-muted-foreground mb-3">
                Random {selectedType} Pokemon
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {examplePokemon.length === 0
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-xl bg-secondary animate-pulse"
                      />
                    ))
                  : examplePokemon.map((p) => (
                      <div
                        key={p.id}
                        className="aspect-square rounded-xl border border-border bg-secondary/30 p-2 hover:scale-105 transition-transform"
                      >
                        <img
                          src={p.sprite}
                          alt={p.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                        <p className="text-[10px] font-semibold text-center mt-1 truncate">
                          {p.name}
                        </p>
                      </div>
                    ))}
              </div>

              <div className="mt-5 pt-5 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Tip: Use this for type-themed challenges, mono-type runs, or to learn
                  which Pokemon belong to each type.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
