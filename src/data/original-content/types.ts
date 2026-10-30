/**
 * Original editorial content for high-value Pokémon pages.
 *
 * The Pokémon detail template renders data-driven sections for all 1,025
 * entries. Pages listed here additionally receive hand-written, unique
 * editorial copy (tagline, overview, battle guide, trivia) so that the most
 * searched Pokémon stand out in search results instead of sharing the same
 * boilerplate prose as every other entry.
 */

export interface PokemonOriginalEntry {
  /** Display name — kept in sync with the National Pokédex entry. */
  name: string;
  /** Short editorial hook shown under the H1 and in the meta description. */
  tagline: string;
  /** 2 paragraphs of original editorial copy. */
  overview: [string, string];
  /** Concrete, battle-tested advice: abilities, moves, items, formats. */
  battleGuide: string;
  /** 5 specific, verifiable facts. */
  trivia: [string, string, string, string, string];
}
