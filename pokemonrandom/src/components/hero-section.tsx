"use client";

import { Sparkles, Zap, ShieldCheck, Heart } from "lucide-react";

const STATS = [
  { value: "1025+", label: "Pokemon" },
  { value: "9", label: "Generations" },
  { value: "18", label: "Types" },
  { value: "100%", label: "Free" },
];

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-red-200/40 blur-3xl" />
        <div className="absolute -top-10 right-0 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-200/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Free · No Signup · 9 Generations
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            Random Pokemon
            <br />
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            Generate random Pokemon, build teams, spin the type wheel, and play Guess
            That Pokemon — all in one place. Powered by the open-source PokeAPI, with
            every Pokemon from Gen I to Gen IX.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#generator"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#generator")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Zap className="h-4 w-4" />
              Start Generating
            </a>
            <a
              href="#guess"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#guess")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-secondary text-secondary-foreground font-semibold border border-border hover:bg-secondary/70 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Play Guess Game
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card/80 backdrop-blur px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Feature pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 backdrop-blur border border-border">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> No data collection
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 backdrop-blur border border-border">
              <Zap className="h-3.5 w-3.5 text-yellow-500" /> Instant results
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 backdrop-blur border border-border">
              <Heart className="h-3.5 w-3.5 text-red-500" /> Made by fans
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
