import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/blog-content-loader";
import { GENERATIONS, POKEMON_TYPES } from "@/lib/pokemon-api";
import { fetchMoveList } from "@/lib/move-api";
import { fetchAbilityList } from "@/lib/ability-api";
import { SITEMAP_DATES } from "@/lib/sitemap-dates";

export const dynamic = "force-static";

// Honest lastmod: dates come from git history per section (scripts/generate-sitemap-dates.mjs).
// A deploy that does not change a section's content no longer refreshes its lastmod —
// previously every deploy stamped all 2,412 URLs with the build time, which Google
// treats as an unreliable (eventually ignored) signal.
const sectionDate = (key: keyof typeof SITEMAP_DATES | string): Date =>
  new Date(SITEMAP_DATES[key as string] ?? SITEMAP_DATES.home);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  // Homepage
  const homepage = [{ path: "/", priority: 1.0, freq: "daily" as const, section: "home" }];

  // Tool pages
  const toolPages = [
    { path: "/random-pokemon/", priority: 0.9, freq: "weekly" as const },
    { path: "/pokemon-randomizer/", priority: 0.9, freq: "weekly" as const },
    { path: "/random-pokemon-picker/", priority: 0.9, freq: "weekly" as const },
    { path: "/universal-pokemon-randomizer/", priority: 0.9, freq: "weekly" as const },
    { path: "/random-team/", priority: 0.9, freq: "weekly" as const },
    { path: "/shiny-pokemon/", priority: 0.9, freq: "weekly" as const },
    { path: "/pokemon-quiz/", priority: 0.9, freq: "weekly" as const },
    { path: "/type-chart/", priority: 0.9, freq: "weekly" as const },
    { path: "/random-starter/", priority: 0.9, freq: "weekly" as const },
    { path: "/pokemon-of-the-day/", priority: 0.8, freq: "daily" as const },
    { path: "/pokemon-compare/", priority: 0.8, freq: "weekly" as const },
    { path: "/type-wheel/", priority: 0.8, freq: "weekly" as const },
    { path: "/shiny-odds-calculator/", priority: 0.9, freq: "weekly" as const },
    { path: "/pokemon-search/", priority: 0.8, freq: "weekly" as const },
    { path: "/saved-teams/", priority: 0.6, freq: "weekly" as const },
    { path: "/tier-lists/", priority: 0.7, freq: "weekly" as const },
    { path: "/api-docs/", priority: 0.5, freq: "monthly" as const },
  ].map((p) => ({ ...p, section: "tools" }));

  // Pokédex
  const pokedexPages = [
    { path: "/pokemon/", priority: 0.9, freq: "weekly" as const, section: "pokedex" },
  ];

  // All 1,025 Pokémon pages
  const pokemonPages = Array.from({ length: 1025 }, (_, i) => ({
    path: `/pokemon/${i + 1}/`,
    priority: 0.7,
    freq: "monthly" as const,
    section: "pokedex",
  }));

  // All 9 generation pages
  const generationPages = GENERATIONS.map((_, idx) => ({
    path: `/generation/${idx + 1}/`,
    priority: 0.8,
    freq: "monthly" as const,
    section: "generations",
  }));

  // All 18 type pages
  const typePages = POKEMON_TYPES.map((t) => ({
    path: `/type/${t.name}/`,
    priority: 0.8,
    freq: "monthly" as const,
    section: "types",
  }));

  // Moves index + all ~920 move pages
  const movesIndex = [{ path: "/moves/", priority: 0.9, freq: "weekly" as const, section: "moves" }];
  let movePages: { path: string; priority: number; freq: "monthly"; section: string }[] = [];
  try {
    const moveList = await fetchMoveList(1000);
    movePages = moveList.results.map((m) => ({
      path: `/moves/${m.name}/`,
      priority: 0.6,
      freq: "monthly" as const,
      section: "moves",
    }));
  } catch (e) {
    console.error("Failed to fetch move list for sitemap:", e);
  }

  // Abilities index + all ~298 ability pages
  const abilitiesIndex = [{ path: "/abilities/", priority: 0.9, freq: "weekly" as const, section: "abilities" }];
  let abilityPages: { path: string; priority: number; freq: "monthly"; section: string }[] = [];
  try {
    const abilityList = await fetchAbilityList(500);
    abilityPages = abilityList.results.map((a) => ({
      path: `/abilities/${a.name}/`,
      priority: 0.6,
      freq: "monthly" as const,
      section: "abilities",
    }));
  } catch (e) {
    console.error("Failed to fetch ability list for sitemap:", e);
  }

  // Blog index
  const blogIndex = [{ path: "/blog/", priority: 0.8, freq: "weekly" as const, section: "blog" }];

  // Blog posts
  const posts = getAllPosts();
  const blogPosts = posts.map((p) => ({
    path: `/blog/${p.slug}/`,
    priority: 0.8,
    freq: "monthly" as const,
    lastModified: new Date(p.modifiedAt),
    section: "blog",
  }));

  // Legal & info pages
  const infoPages = [
    { path: "/about/", priority: 0.5, freq: "monthly" as const },
    { path: "/contact/", priority: 0.5, freq: "monthly" as const },
    { path: "/privacy/", priority: 0.4, freq: "yearly" as const },
    { path: "/terms/", priority: 0.4, freq: "yearly" as const },
    { path: "/cookies/", priority: 0.4, freq: "yearly" as const },
    { path: "/disclaimer/", priority: 0.4, freq: "yearly" as const },
    { path: "/dmca/", priority: 0.4, freq: "yearly" as const },
  ].map((p) => ({ ...p, section: "info" }));

  return [
    ...homepage,
    ...toolPages,
    ...pokedexPages,
    ...pokemonPages,
    ...generationPages,
    ...typePages,
    ...movesIndex,
    ...movePages,
    ...abilitiesIndex,
    ...abilityPages,
    ...blogIndex,
    ...blogPosts,
    ...infoPages,
  ].map((page) => ({
    url: `${base}${page.path}`,
    lastModified:
      (page as { lastModified?: Date }).lastModified ??
      sectionDate((page as { section?: string }).section ?? "home"),
    changeFrequency: page.freq,
    priority: page.priority,
  }));
}
