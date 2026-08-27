"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchMove,
  getEnglishEffect,
  getEnglishShortEffect,
  formatMoveName,
  formatDamageClass,
  formatTarget,
  getMoveTypeColor,
  getDamageClassColor,
  getDamageClassIcon,
  extractPokemonIdFromUrl,
  formatAilment,
  type Move,
} from "@/lib/move-api";

/**
 * Client-side move detail view. Fetches data from PokeAPI after hydration.
 * The parent page provides SEO metadata based on the slug alone (no API call).
 */
export function MoveDetailView({ slug }: { slug: string }) {
  const [move, setMove] = useState<Move | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchMove(slug);
        if (cancelled) return;
        setMove(result);
      } catch (e) {
        if (!cancelled) setError("Failed to load move data. Please refresh.");
        console.error(`Failed to fetch move ${slug}:`, e);
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

  if (error || !move) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error ?? "Move not found"}</p>
        <Link href="/moves/" className="text-primary hover:underline">
          ← Back to All Moves
        </Link>
      </div>
    );
  }

  const name = formatMoveName(move.name);
  const effect = getEnglishEffect(move);
  const shortEffect = getEnglishShortEffect(move);
  const typeColor = getMoveTypeColor(move.type.name);
  const damageClassColor = getDamageClassColor(move.damage_class.name);
  const damageIcon = getDamageClassIcon(move.damage_class.name);
  const learnedPokemon = move.learned_by_pokemon.slice(0, 48); // limit to first 48 for performance

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-muted-foreground">#{String(move.id).padStart(4, "0")}</span>
            <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
          </div>
          <p className="text-muted-foreground">
            {formatDamageClass(move.damage_class.name)} move ·{" "}
            <Link href={`/type/${move.type.name}/`} className="text-primary hover:underline capitalize">
              {move.type.name} type
            </Link>
            {move.generation && (
              <>
                {" "}· Introduced in {move.generation.name.replace("generation-", "Generation ").toUpperCase()}
              </>
            )}
          </p>
        </div>
      </div>

      {/* Main stats grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Type & Damage Class */}
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-border p-6" style={{ borderColor: typeColor }}>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Type
            </div>
            <Link
              href={`/type/${move.type.name}/`}
              className="inline-flex items-center px-4 py-2 rounded-full text-white text-lg font-semibold capitalize shadow"
              style={{ backgroundColor: typeColor }}
            >
              {move.type.name}
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Damage Class
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{damageIcon}</span>
              <span
                className="px-4 py-1.5 rounded-full text-white font-semibold"
                style={{ backgroundColor: damageClassColor }}
              >
                {formatDamageClass(move.damage_class.name)}
              </span>
            </div>
          </div>

          {/* Effect */}
          {effect && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Effect
              </div>
              <p className="text-sm leading-relaxed">{effect}</p>
              {shortEffect && shortEffect !== effect && (
                <p className="text-xs text-muted-foreground mt-2 italic">{shortEffect}</p>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Move Stats
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatBox label="Power" value={move.power ?? "—"} highlight={move.power !== null} />
              <StatBox label="Accuracy" value={move.accuracy !== null ? `${move.accuracy}%` : "—"} highlight={move.accuracy !== null} />
              <StatBox label="PP" value={move.pp ?? "—"} />
              <StatBox label="Priority" value={String(move.priority)} highlight={move.priority !== 0} />
            </div>
          </div>

          {/* Target & Ailment */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Details
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Target:</span>
                <span className="font-semibold">{formatTarget(move.target.name)}</span>
              </div>
              {move.meta?.ailment && move.meta.ailment.name !== "none" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ailment:</span>
                  <span className="font-semibold capitalize">{formatAilment(move.meta.ailment.name)}</span>
                </div>
              )}
              {move.meta?.ailment_chance && move.meta.ailment_chance > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ailment Chance:</span>
                  <span className="font-semibold">{move.meta.ailment_chance}%</span>
                </div>
              )}
              {move.meta?.flinch_chance && move.meta.flinch_chance > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Flinch Chance:</span>
                  <span className="font-semibold">{move.meta.flinch_chance}%</span>
                </div>
              )}
              {move.meta?.crit_rate && move.meta.crit_rate > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Crit Rate Boost:</span>
                  <span className="font-semibold">+{move.meta.crit_rate}</span>
                </div>
              )}
              {move.meta?.min_hits && move.meta.max_hits && move.meta.max_hits > 1 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hits:</span>
                  <span className="font-semibold">{move.meta.min_hits}-{move.meta.max_hits}</span>
                </div>
              )}
              {move.meta?.drain && move.meta.drain > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HP Drain:</span>
                  <span className="font-semibold text-green-500">+{move.meta.drain}%</span>
                </div>
              )}
              {move.meta?.healing && move.meta.healing > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HP Heal:</span>
                  <span className="font-semibold text-green-500">+{move.meta.healing}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Stat changes */}
          {move.stat_changes && move.stat_changes.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Stat Changes
              </div>
              <div className="space-y-2 text-sm">
                {move.stat_changes.map((sc, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-muted-foreground capitalize">{sc.stat.name.replace(/-/g, " ")}:</span>
                    <span className={`font-semibold ${sc.change > 0 ? "text-green-500" : "text-red-500"}`}>
                      {sc.change > 0 ? "+" : ""}{sc.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pokémon that can learn this move */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Pokémon That Can Learn {name}
          {learnedPokemon.length < move.learned_by_pokemon.length && ` (showing ${learnedPokemon.length} of ${move.learned_by_pokemon.length})`}
        </h2>
        <div className="rounded-2xl border border-border bg-card p-6">
          {learnedPokemon.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No Pokémon can learn this move naturally (it may be available via TM/HM only).
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {learnedPokemon.map((p) => {
                const id = extractPokemonIdFromUrl(p.url);
                if (id === 0) return null;
                return (
                  <Link
                    key={p.name}
                    href={`/pokemon/${id}/`}
                    className="flex flex-col items-center p-3 rounded-xl border border-border bg-card hover:border-primary hover:shadow-sm transition-all"
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                      alt={p.name}
                      className="w-16 h-16 object-contain"
                      loading="lazy"
                    />
                    <span className="text-xs text-muted-foreground mt-1 capitalize">
                      {p.name.replace(/-/g, " ")}
                    </span>
                    <span className="text-xs text-muted-foreground">#{String(id).padStart(4, "0")}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SEO content */}
      <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
        <h2>About {name}</h2>
        <p>
          {name} is a {formatDamageClass(move.damage_class.name).toLowerCase()}{" "}
          <Link href={`/type/${move.type.name}/`} className="text-primary capitalize">{move.type.name}-type</Link>{" "}
          move introduced in {move.generation?.name?.replace("generation-", "Generation ").toUpperCase() ?? "the Pokémon games"}.
          {move.power !== null && ` It has a base power of ${move.power}.`}
          {move.accuracy !== null && ` It has ${move.accuracy}% accuracy.`}
          {move.pp !== null && ` It has ${move.pp} PP (Power Points).`}
          {" "}{shortEffect && shortEffect + " "}
          As a {formatDamageClass(move.damage_class.name).toLowerCase()} move, {name}{" "}
          {move.damage_class.name === "physical"
            ? "uses the user's Attack stat and the target's Defense stat to calculate damage"
            : move.damage_class.name === "special"
            ? "uses the user's Special Attack stat and the target's Special Defense stat to calculate damage"
            : "does not deal direct damage but instead applies status effects or stat changes"}.
        </p>
        <h3>Strategic Use</h3>
        <p>
          {name} targets {formatTarget(move.target.name).toLowerCase()}.
          {move.priority !== 0 && ` It has a priority of ${move.priority}, which means it ${move.priority > 0 ? "moves before most other moves" : "moves after most other moves"}.`}
          {move.meta?.ailment && move.meta.ailment.name !== "none" && ` It can inflict ${formatAilment(move.meta.ailment.name).toLowerCase()} on the target`}
          {move.meta?.ailment_chance && move.meta.ailment_chance > 0 ? ` with a ${move.meta.ailment_chance}% chance.` : "."}
          {move.meta?.flinch_chance && move.meta.flinch_chance > 0 && ` It also has a ${move.meta.flinch_chance}% chance to make the target flinch.`}
          {" "}Use our <Link href="/pokemon-compare/">Pokémon Comparison Tool</Link> to find the best Pokémon for {name}.
        </p>
        <h3>Availability</h3>
        <p>
          {learnedPokemon.length > 0
            ? `${learnedPokemon.length}${move.learned_by_pokemon.length > 48 ? "+" : ""} Pokémon can learn ${name} through leveling up, TMs, or breeding. The list above shows some of the most notable Pokémon that can use this move. Click any Pokémon to view its full Pokédex entry and see how ${name} fits into its moveset.`
            : `${name} may only be available through TMs, HMs, or special events. Check the game-specific availability for more details.`}
        </p>
      </section>

      {/* Related tools CTA */}
      <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-xl font-bold mb-4">Related Pokémon Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <Link href="/moves/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">All Moves</div>
            <div className="text-muted-foreground">Browse 920+ moves</div>
          </Link>
          <Link href="/pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Pokédex</div>
            <div className="text-muted-foreground">All 1,025 Pokémon</div>
          </Link>
          <Link href="/type-chart/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Type Chart</div>
            <div className="text-muted-foreground">Type effectiveness</div>
          </Link>
          <Link href="/pokemon-compare/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Compare Pokémon</div>
            <div className="text-muted-foreground">Side by side</div>
          </Link>
          <Link href={`/type/${move.type.name}/`} className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold capitalize">{move.type.name} Type</div>
            <div className="text-muted-foreground">All {move.type.name} Pokémon</div>
          </Link>
          <Link href="/random-team/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
            <div className="font-semibold">Team Builder</div>
            <div className="text-muted-foreground">Build a team</div>
          </Link>
        </div>
      </section>
    </>
  );
}

function StatBox({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 text-center ${highlight ? "border-primary/50 bg-primary/5" : "border-border"}`}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-bold text-lg">{value}</div>
    </div>
  );
}
