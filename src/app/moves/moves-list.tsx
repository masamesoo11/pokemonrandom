"use client";

import { useState } from "react";
import Link from "next/link";

interface MoveItem {
  name: string;
  url: string;
}

interface MovesListProps {
  grouped: Record<string, MoveItem[]>;
  letters: string[];
  formatMoveName: (name: string) => string;
}

export function MovesList({ grouped, letters, formatMoveName }: MovesListProps) {
  // Show first 3 letters expanded by default, rest collapsed
  const [expandedLetters, setExpandedLetters] = useState<Set<string>>(
    new Set(letters.slice(0, 3))
  );

  const toggleLetter = (letter: string) => {
    setExpandedLetters((prev) => {
      const next = new Set(prev);
      if (next.has(letter)) {
        next.delete(letter);
      } else {
        next.add(letter);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedLetters(new Set(letters));
  };

  const collapseAll = () => {
    setExpandedLetters(new Set());
  };

  return (
    <>
      {/* Expand/Collapse all buttons */}
      <div className="mb-6 flex gap-3 flex-wrap">
        <button
          onClick={expandAll}
          className="px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium"
        >
          Expand All ({letters.length} letters)
        </button>
        <button
          onClick={collapseAll}
          className="px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium"
        >
          Collapse All
        </button>
      </div>

      {/* Moves grouped by letter */}
      <div className="space-y-4">
        {letters.map((letter) => {
          const isExpanded = expandedLetters.has(letter);
          const moveCount = grouped[letter].length;
          return (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-20">
              <button
                onClick={() => toggleLetter(letter)}
                className="w-full text-left flex items-center justify-between mb-2 pb-2 border-b border-border"
                aria-expanded={isExpanded}
                aria-controls={`content-${letter}`}
              >
                <h2 className="text-2xl font-bold">
                  {letter}{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    ({moveCount} moves)
                  </span>
                </h2>
                <span className="text-2xl text-muted-foreground">
                  {isExpanded ? "−" : "+"}
                </span>
              </button>
              {isExpanded && (
                <div
                  id={`content-${letter}`}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pb-4"
                >
                  {grouped[letter].map((m) => (
                    <Link
                      key={m.name}
                      href={`/moves/${m.name}/`}
                      className="block px-3 py-2 rounded-lg border border-border bg-card hover:border-primary hover:shadow-sm transition-all text-sm"
                    >
                      <span className="font-medium">{formatMoveName(m.name)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
