/**
 * Blog content loader - reads post metadata from JSON files at build time.
 *
 * Each post lives at src/lib/blog-posts/<slug>.json with the shape exported
 * by the migrate_blog_posts.py script. The body is raw HTML that we render
 * via dangerouslySetInnerHTML in the [slug]/page.tsx component.
 *
 * This module exposes synchronous loaders because Next.js App Router can
 * import JSON directly via `import` — no FS reads at runtime.
 */

import type { BlogPost, BlogPostSummary } from "./blog-types";

// Import the index (post list without bodies) and all individual posts eagerly.
import indexJson from "./blog-posts/_index.json";
import bestPokemonForNuzlocke from "./blog-posts/best-pokemon-for-nuzlocke.json";
import competitiveTeamBuilding from "./blog-posts/competitive-team-building.json";
import lucarioCompleteGuide from "./blog-posts/lucario-complete-guide.json";
import megaPokemonGuide from "./blog-posts/mega-pokemon-guide.json";
import mewtwoCompleteGuide from "./blog-posts/mewtwo-complete-guide.json";
import newPokemon2026Guide from "./blog-posts/new-pokemon-2026-guide.json";
import pixelmonGuide from "./blog-posts/pixelmon-guide.json";
import pokemonBlackWhiteGuide from "./blog-posts/pokemon-black-white-guide.json";
import pokemonEmeraldGuide from "./blog-posts/pokemon-emerald-guide.json";
import pokemonEvolutionGuide from "./blog-posts/pokemon-evolution-guide.json";
import pokemonFanGamesGuide from "./blog-posts/pokemon-fan-games-guide.json";
import pokemonFireRedGuide from "./blog-posts/pokemon-fire-red-guide.json";
import pokemonGoTipsTricks from "./blog-posts/pokemon-go-tips-tricks.json";
import pokemonLegendsArceusGuide from "./blog-posts/pokemon-legends-arceus-guide.json";
import pokemonMysteryDungeonGuide from "./blog-posts/pokemon-mystery-dungeon-guide.json";
import pokemonScarletVioletGuide from "./blog-posts/pokemon-scarlet-violet-guide.json";
import pokemonTypeChartCompleteGuide from "./blog-posts/pokemon-type-chart-complete-guide.json";
import pokemonUniteGuide from "./blog-posts/pokemon-unite-guide.json";
import rayquazaCompleteGuide from "./blog-posts/rayquaza-complete-guide.json";
import shinyHuntingGuide from "./blog-posts/shiny-hunting-guide.json";

const POSTS: BlogPost[] = [
  bestPokemonForNuzlocke,
  competitiveTeamBuilding,
  lucarioCompleteGuide,
  megaPokemonGuide,
  mewtwoCompleteGuide,
  newPokemon2026Guide,
  pixelmonGuide,
  pokemonBlackWhiteGuide,
  pokemonEmeraldGuide,
  pokemonEvolutionGuide,
  pokemonFanGamesGuide,
  pokemonFireRedGuide,
  pokemonGoTipsTricks,
  pokemonLegendsArceusGuide,
  pokemonMysteryDungeonGuide,
  pokemonScarletVioletGuide,
  pokemonTypeChartCompleteGuide,
  pokemonUniteGuide,
  rayquazaCompleteGuide,
  shinyHuntingGuide,
] as BlogPost[];

const POST_INDEX: BlogPostSummary[] = indexJson as BlogPostSummary[];

/**
 * Get all blog posts (full content). Sorted by published date desc.
 */
export function getAllPosts(): BlogPostSummary[] {
  return [...POST_INDEX].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get a single blog post by slug. Returns undefined if not found.
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/**
 * Get posts by category.
 */
export function getPostsByCategory(category: string): BlogPostSummary[] {
  return POST_INDEX.filter((p) => p.category === category);
}

/**
 * Get related posts (same category, excluding the current slug).
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPostSummary[] {
  const current = POST_INDEX.find((p) => p.slug === slug);
  if (!current) return [];
  return POST_INDEX.filter(
    (p) => p.slug !== slug && p.category === current.category
  ).slice(0, limit);
}
