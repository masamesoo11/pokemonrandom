"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Gamepad2, RefreshCw, Check, X, Trophy, Eye, Lightbulb } from "lucide-react";
import {
  fetchRandomPokemon,
  formatPokemonName,
  getTypeClass,
  GENERATIONS,
  type Pokemon,
} from "@/lib/pokemon-api";
import { useSiteStats } from "@/lib/use-local-stats";
import { trackEvent } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type GameState = "playing" | "won" | "lost";

export function GuessPokemonGame() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [guess, setGuess] = useState("");
  const [state, setState] = useState<GameState>("playing");
  const [revealed, setRevealed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const { track } = useSiteStats();

  const newRound = useCallback(async () => {
    setLoading(true);
    setState("playing");
    setGuess("");
    setRevealed(false);
    setAttempts(0);
    setHint(null);
    try {
      const p = await fetchRandomPokemon(1, 1025);
      setPokemon(p);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);

  useEffect(() => {
    newRound();
  }, [newRound]);

  const submitGuess = () => {
    if (!pokemon || state !== "playing" || !guess.trim()) return;
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, "")
        .replace(/female/g, "f")
        .replace(/male/g, "m");
    const userGuess = normalize(guess);
    const correct = normalize(pokemon.name);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (userGuess === correct) {
      setState("won");
      setRevealed(true);
      setScore((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
      setStreak((s) => s + 1);
      track({ type: "guess", pokemonIds: [pokemon.id], correct: true });
      trackEvent("guess_correct", {
        pokemon_id: pokemon.id,
        attempts: newAttempts,
      });
    } else if (newAttempts >= 3) {
      setState("lost");
      setRevealed(true);
      setScore((s) => ({ correct: s.correct, total: s.total + 1 }));
      setStreak(0);
      track({ type: "guess", pokemonIds: [pokemon.id], correct: false });
      trackEvent("guess_failed", { pokemon_id: pokemon.id, attempts: 3 });
    } else {
      // Wrong guess — clear input
      setGuess("");
      inputRef.current?.focus();
      trackEvent("guess_wrong", { pokemon_id: pokemon.id, attempt: newAttempts });
    }
  };

  const giveUp = () => {
    if (!pokemon || state !== "playing") return;
    setState("lost");
    setRevealed(true);
    setScore((s) => ({ correct: s.correct, total: s.total + 1 }));
    setStreak(0);
  };

  const showHint = () => {
    if (!pokemon || hint) return;
    const gen = GENERATIONS.find(
      (g) => pokemon.id >= g.range[0] && pokemon.id <= g.range[1]
    );
    const types = pokemon.types.map((t) => t.type.name).join(" / ");
    setHint(
      `Generation: ${gen?.name ?? "?"} (${gen?.region ?? "?"}) · Type: ${types} · First letter: "${pokemon.name[0].toUpperCase()}"`
    );
  };

  const spriteUrl = pokemon
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    : null;

  return (
    <section id="guess" className="scroll-mt-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-3">
          <Gamepad2 className="h-3.5 w-3.5" />
          MINI GAME
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Guess That Pokemon
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          A random Pokemon appears as a dark silhouette. You have 3 attempts to guess its
          name. Build your streak and become a true Pokemon Master!
        </p>
      </div>

      {/* Score bar */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        <div className="px-4 py-2 rounded-full bg-secondary border border-border text-sm">
          <span className="text-muted-foreground">Score: </span>
          <span className="font-bold">
            {score.correct}/{score.total}
          </span>
        </div>
        <div className="px-4 py-2 rounded-full bg-orange-100 border border-orange-200 text-sm">
          <Trophy className="inline h-3.5 w-3.5 text-orange-600 mr-1" />
          <span className="text-muted-foreground">Streak: </span>
          <span className="font-bold text-orange-700">{streak}</span>
        </div>
        {attempts > 0 && state === "playing" && (
          <div className="px-4 py-2 rounded-full bg-red-100 border border-red-200 text-sm">
            <span className="text-muted-foreground">Attempts: </span>
            <span className="font-bold text-red-700">{attempts}/3</span>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="rounded-3xl border-2 border-border bg-card overflow-hidden shadow-xl">
          {/* Silhouette / Reveal area */}
          <div className="relative aspect-[16/9] flex items-center justify-center bg-gradient-to-br from-stone-900 to-stone-800 p-6">
            {loading ? (
              <div className="pokeball-loader" />
            ) : pokemon && spriteUrl ? (
              <div className="relative">
                <img
                  src={spriteUrl}
                  alt={revealed ? formatPokemonName(pokemon.name) : "Mystery Pokemon"}
                  className={cn(
                    "w-44 h-44 sm:w-56 sm:h-56 object-contain transition-all duration-500 drop-shadow-2xl",
                    !revealed &&
                      "brightness-0 invert opacity-95 [filter:brightness(0)_invert(1)]"
                  )}
                />
                {!revealed && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl sm:text-8xl font-black text-white/10 select-none">
                      ?
                    </span>
                  </div>
                )}
              </div>
            ) : null}

            {/* Generation hint badge */}
            {pokemon && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/10 backdrop-blur text-[10px] font-mono text-white/80">
                #
                {String(pokemon.id).padStart(4, "0")} ·{" "}
                {GENERATIONS.find(
                  (g) => pokemon.id >= g.range[0] && pokemon.id <= g.range[1]
                )?.name ?? "?"}
              </div>
            )}
          </div>

          {/* Input / result area */}
          <div className="p-6">
            {state === "playing" ? (
              <>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitGuess()}
                    placeholder="Type your guess..."
                    className="flex-1 h-11 px-4 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={submitGuess}
                    disabled={!guess.trim()}
                    className="inline-flex items-center gap-1.5 h-11 px-5 rounded-full bg-primary text-primary-foreground font-semibold disabled:opacity-50 hover:shadow-md transition-all"
                  >
                    <Check className="h-4 w-4" /> Guess
                  </button>
                </div>

                <div className="mt-4 flex justify-between items-center text-sm">
                  <button
                    onClick={showHint}
                    disabled={!!hint}
                    className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-medium disabled:opacity-50"
                  >
                    <Lightbulb className="h-4 w-4" /> {hint ? "Hint shown" : "Need a hint?"}
                  </button>
                  <button
                    onClick={giveUp}
                    className="inline-flex items-center gap-1.5 text-destructive hover:opacity-80 font-medium"
                  >
                    <X className="h-4 w-4" /> Give up
                  </button>
                </div>

                {hint && (
                  <div className="mt-3 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800 animate-slide-up">
                    {hint}
                  </div>
                )}

                {attempts > 0 && (
                  <p className="mt-3 text-xs text-muted-foreground text-center">
                    Wrong! {3 - attempts} attempt{3 - attempts === 1 ? "" : "s"} left
                  </p>
                )}
              </>
            ) : (
              <div className="text-center animate-slide-up">
                {state === "won" ? (
                  <>
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 mb-3">
                      <Check className="h-7 w-7 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold">Correct!</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      It&apos;s{" "}
                      <span className="font-bold text-foreground">
                        {pokemon && formatPokemonName(pokemon.name)}
                      </span>
                      {attempts > 1 && ` (guessed in ${attempts} attempts)`}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mb-3">
                      <X className="h-7 w-7 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold">Out of attempts</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      The answer was{" "}
                      <span className="font-bold text-foreground">
                        {pokemon && formatPokemonName(pokemon.name)}
                      </span>
                    </p>
                  </>
                )}

                {pokemon && (
                  <div className="mt-4 flex justify-center gap-2">
                    {pokemon.types.map((t) => (
                      <span
                        key={t.type.name}
                        className={cn(
                          "px-3 py-0.5 rounded-full text-xs font-bold text-white uppercase",
                          getTypeClass(t.type.name)
                        )}
                      >
                        {t.type.name}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={newRound}
                  className="mt-5 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
                >
                  <RefreshCw className="h-4 w-4" /> Next Pokemon
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
