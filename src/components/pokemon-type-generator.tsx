"use client";
import { useState, useCallback } from "react";
import Link from "next/link";

const TYPES = [
  { name: "Normal", color: "#A8A878", strengths: ["Ghost immunity"], weaknesses: ["Fighting"] },
  { name: "Fire", color: "#F08030", strengths: ["Grass", "Bug", "Ice", "Steel"], weaknesses: ["Water", "Ground", "Rock"] },
  { name: "Water", color: "#6890F0", strengths: ["Fire", "Ground", "Rock"], weaknesses: ["Electric", "Grass"] },
  { name: "Grass", color: "#78C850", strengths: ["Water", "Ground", "Rock"], weaknesses: ["Fire", "Ice", "Poison", "Flying", "Bug"] },
  { name: "Electric", color: "#F8D030", strengths: ["Water", "Flying"], weaknesses: ["Ground"] },
  { name: "Ice", color: "#98D8D8", strengths: ["Grass", "Ground", "Flying", "Dragon"], weaknesses: ["Fire", "Fighting", "Rock", "Steel"] },
  { name: "Fighting", color: "#C03028", strengths: ["Normal", "Ice", "Rock", "Dark", "Steel"], weaknesses: ["Flying", "Psychic", "Fairy"] },
  { name: "Poison", color: "#A040A0", strengths: ["Grass", "Fairy"], weaknesses: ["Ground", "Psychic"] },
  { name: "Ground", color: "#E0C068", strengths: ["Fire", "Electric", "Poison", "Rock", "Steel"], weaknesses: ["Water", "Grass", "Ice"] },
  { name: "Flying", color: "#A890F0", strengths: ["Grass", "Fighting", "Bug"], weaknesses: ["Electric", "Ice", "Rock"] },
  { name: "Psychic", color: "#F85888", strengths: ["Fighting", "Poison"], weaknesses: ["Bug", "Ghost", "Dark"] },
  { name: "Bug", color: "#A8B820", strengths: ["Grass", "Psychic", "Dark"], weaknesses: ["Fire", "Flying", "Rock"] },
  { name: "Rock", color: "#B8A038", strengths: ["Fire", "Ice", "Flying", "Bug"], weaknesses: ["Water", "Grass", "Fighting", "Ground", "Steel"] },
  { name: "Ghost", color: "#705898", strengths: ["Psychic", "Ghost"], weaknesses: ["Ghost", "Dark"] },
  { name: "Dragon", color: "#7038F8", strengths: ["Dragon"], weaknesses: ["Ice", "Dragon", "Fairy"] },
  { name: "Dark", color: "#705848", strengths: ["Psychic", "Ghost"], weaknesses: ["Fighting", "Bug", "Fairy"] },
  { name: "Steel", color: "#B8B8D0", strengths: ["Ice", "Rock", "Fairy"], weaknesses: ["Fire", "Fighting", "Ground"] },
  { name: "Fairy", color: "#EE99AC", strengths: ["Fighting", "Dragon", "Dark"], weaknesses: ["Fire", "Poison", "Steel"] },
];

export function PokemonTypeGenerator() {
  const [primaryType, setPrimaryType] = useState<typeof TYPES[0] | null>(null);
  const [secondaryType, setSecondaryType] = useState<typeof TYPES[0] | null>(null);

  const generate = useCallback(() => {
    const primary = TYPES[Math.floor(Math.random() * TYPES.length)];
    let secondary = TYPES[Math.floor(Math.random() * TYPES.length)];
    // 50% chance of dual type, ensure different
    if (Math.random() > 0.5) {
      while (secondary.name === primary.name) {
        secondary = TYPES[Math.floor(Math.random() * TYPES.length)];
      }
      setSecondaryType(secondary);
    } else {
      setSecondaryType(null);
    }
    setPrimaryType(primary);
  }, []);

  // Generate initial type on mount via useEffect-safe trick (only once)
  if (!primaryType) {
    // Set on first render via state initializer pattern
    setTimeout(() => generate(), 0);
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={generate}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
        >
          Generate Random Type
        </button>
      </div>

      {primaryType && (
        <div className="space-y-6">
          <div className="flex justify-center gap-4 flex-wrap">
            <div
              className="px-8 py-6 rounded-xl text-white text-2xl font-bold shadow-lg"
              style={{ backgroundColor: primaryType.color }}
            >
              {primaryType.name}
            </div>
            {secondaryType && (
              <>
                <div className="self-center text-3xl font-bold text-muted-foreground">/</div>
                <div
                  className="px-8 py-6 rounded-xl text-white text-2xl font-bold shadow-lg"
                  style={{ backgroundColor: secondaryType.color }}
                >
                  {secondaryType.name}
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-green-200 bg-green-50">
              <h3 className="font-semibold text-green-900 mb-2">Strong Against</h3>
              <div className="flex flex-wrap gap-2">
                {[...primaryType.strengths, ...(secondaryType?.strengths || [])].map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-green-200 text-green-900 rounded text-sm">{s}</span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg border border-red-200 bg-red-50">
              <h3 className="font-semibold text-red-900 mb-2">Weak Against</h3>
              <div className="flex flex-wrap gap-2">
                {[...primaryType.weaknesses, ...(secondaryType?.weaknesses || [])].map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-red-200 text-red-900 rounded text-sm">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href={`/type/${primaryType.name.toLowerCase()}/`}
              className="text-primary underline text-sm"
            >
              Browse all {primaryType.name}-type Pokémon →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
