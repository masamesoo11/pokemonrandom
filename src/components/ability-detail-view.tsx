"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchAbility,
  getEnglishEffect,
  getEnglishShortEffect,
  getEnglishFlavorText,
  formatAbilityName,
  formatGenerationName,
  extractPokemonIdFromUrl,
  getAbilityColor,
  type Ability,
} from "@/lib/ability-api";

/**
 * Client-side ability detail view. Fetches data from PokeAPI after hydration.
 */
export function AbilityDetailView({ slug }: { slug: string }) {
  const [ability, setAbility] = useState<Ability | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchAbility(slug);
        if (cancelled) return;
        setAbility(result);
      } catch (e) {
        if (!cancelled) setError("Failed to load ability data. Please refresh.");
        console.error(`Failed to fetch ability ${slug}:`, e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !ability) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error ?? "Ability not found"}</p>
        <Link href="/abilities/" className="text-primary hover:underline">
          ← Back to All Abilities
        </Link>
      </div>
    );
  }

  const name = formatAbilityName(ability.name);
  const effect = getEnglishEffect(ability);
  const shortEffect = getEnglishShortEffect(ability);
  const flavorText = getEnglishFlavorText(ability);
  const color = getAbilityColor(ability);
  const gen = formatGenerationName(ability.generation?.name ?? "");

  // Split Pokémon into those with this as a regular ability vs hidden ability
  const regularPokemon = ability.pokemon.filter((p) => !p.is_hidden).slice(0, 36);
  const hiddenPokemon = ability.pokemon.filter((p) => p.is_hidden).slice(0, 24);
  const totalWithAbility = ability.pokemon.length;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-muted-foreground">#{String(ability.id).padStart(4, "0")}</span>
            <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
              title="Ability classification"
            />
          </div>
          <p className="text-muted-foreground">
            Pokémon Ability · Introduced in {gen}
            {ability.is_main_series ? " · Main Series" : " · Spin-off"}
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Effect */}
        <div className="space-y-6">
          {flavorText && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Flavor Text
              </div>
              <p className="text-sm leading-relaxed italic">&ldquo;{flavorText}&rdquo;</p>
            </div>
          )}

          {effect && (
            <div className="rounded-2xl border-2 border-border p-6" style={{ borderColor: color }}>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Effect
              </div>
              <p className="text-sm leading-relaxed">{effect}</p>
              {shortEffect && shortEffect !== effect && (
                <p className="text-xs text-muted-foreground mt-2 italic">{shortEffect}</p>
              )}
            </div>
          )}

          {/* Quick stats */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Quick Stats
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border p-3 text-center">
                <div className="text-xs text-muted-foreground">Pokémon with Ability</div>
                <div className="font-bold text-lg">{totalWithAbility}</div>
              </div>
              <div className="rounded-xl border border-border p-3 text-center">
                <div className="text-xs text-muted-foreground">Hidden Ability Users</div>
                <div className="font-bold text-lg">{hiddenPokemon.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pokémon lists */}
        <div className="space-y-6">
          {regularPokemon.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Pokémon with {name} (Regular Ability)
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {regularPokemon.map((p) => {
                  const id = extractPokemonIdFromUrl(p.pokemon.url);
                  if (id === 0) return null;
                  return (
                    <Link
                      key={p.pokemon.name}
                      href={`/pokemon/${id}/`}
                      className="flex flex-col items-center p-2 rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        alt={p.pokemon.name}
                        className="w-12 h-12 object-contain"
                        loading="lazy"
                      />
                      <span className="text-[10px] text-muted-foreground mt-0.5 capitalize">
                        {p.pokemon.name.replace(/-/g, " ")}
                      </span>
                    </Link>
                  );
                })}
              </div>
              {totalWithAbility > regularPokemon.length + hiddenPokemon.length && (
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Showing {regularPokemon.length} of {totalWithAbility - hiddenPokemon.length} regular ability users
                </p>
              )}
            </div>
          )}

          {hiddenPokemon.length > 0 && (
            <div className="rounded-2xl border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/30 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">
                ✨ Pokémon with {name} (Hidden Ability)
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {hiddenPokemon.map((p) => {
                  const id = extractPokemonIdFromUrl(p.pokemon.url);
                  if (id === 0) return null;
                  return (
                    <Link
                      key={p.pokemon.name}
                      href={`/pokemon/${id}/`}
                      className="flex flex-col items-center p-2 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-500 transition-colors"
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        alt={p.pokemon.name}
                        className="w-12 h-12 object-contain"
                        loading="lazy"
                      />
                      <span className="text-[10px] text-muted-foreground mt-0.5 capitalize">
                        {p.pokemon.name.replace(/-/g, " ")}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEO content */}
      <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
        <h2>About {name}</h2>
        <p>
          {name} is a Pokémon ability introduced in {gen}.{" "}
          {ability.is_main_series ? "It is a main-series ability, meaning it appears in the core Pokémon games (Red/Blue through Scarlet/Violet)." : "It is a spin-off ability, appearing only in side games."}
          {" "}{shortEffect && shortEffect + " "}
          Abilities are passive effects that influence battle and overworld mechanics without consuming a turn.
          Each Pokémon can have one or two possible regular abilities and, in many cases, a rarer hidden ability.
          {totalWithAbility > 0 && ` Currently, ${totalWithAbility} Pokémon can have ${name} as either their regular or hidden ability.`}
        </p>
        <h3>Strategic Use</h3>
        <p>
          {name} can significantly impact battle strategy. Some abilities are highly competitive
          and define a Pokémon&rsquo;s role, while others are more situational. When building a team,
          consider how {name} interacts with your Pokémon&rsquo;s typing, stats, and moveset.
          Hidden abilities are often more powerful than regular abilities but are harder to obtain
          in-game, typically requiring special events, breeding chains, or specific encounter methods.
        </p>
        <h3>How Abilities Work</h3>
        <p>
          Each Pokémon species has 1-3 possible abilities. When you catch or hatch a Pokémon,
          it will have one of its regular abilities (or rarely its hidden ability). The ability
          is shown on the Pokémon&rsquo;s summary screen and cannot be changed in battle unless a
          move like Skill Swap, Worry Seed, or Entrainment is used. Some abilities activate
          automatically when specific conditions are met (e.g., Intimidate lowers the foe&rsquo;s
          Attack on entry), while others provide passive effects throughout the battle
          (e.g., Levitate grants immunity to Ground-type moves).
        </p>
        <p>
          To find Pokémon that work well with {name}, use our{" "}
          <Link href="/pokemon-search/">Pokémon Search</Link> or browse our complete{" "}
          <Link href="/pokemon/">Pokédex</Link>. You can also use our{" "}
          <Link href="/pokemon-compare/">Pokémon Comparison Tool</Link> to compare potential
          team members and their abilities side by side.
        </p>
      </section>

      {/* Related tools CTA */}
      <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-xl font-bold mb-4">Related Pokémon Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <Link href="/abilities/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">All Abilities</div>
            <div className="text-muted-foreground">Browse 298+ abilities</div>
          </Link>
          <Link href="/pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Pokédex</div>
            <div className="text-muted-foreground">All 1,025 Pokémon</div>
          </Link>
          <Link href="/moves/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Move Database</div>
            <div className="text-muted-foreground">920+ moves</div>
          </Link>
          <Link href="/pokemon-compare/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Compare Pokémon</div>
            <div className="text-muted-foreground">Side by side</div>
          </Link>
          <Link href="/random-team/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Team Builder</div>
            <div className="text-muted-foreground">Build a team</div>
          </Link>
          <Link href="/type-chart/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Type Chart</div>
            <div className="text-muted-foreground">Type effectiveness</div>
          </Link>
        </div>
      </section>
    </>
  );
}
