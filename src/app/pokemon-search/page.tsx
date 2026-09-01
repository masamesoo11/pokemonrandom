import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { PokemonSearch } from "@/components/pokemon-search";


export const metadata: Metadata = {
  title: "Pok\u00e9mon Search 2026 \u2014 Find Any Pok\u00e9mon Free",
  description: "Search any Pokemon by name or National Pokedex number. All 1,025 Pokemon from Gen 1 to Gen 9. Free online search tool with detailed stats and information. No signup required.",
  keywords: ["pokemon search", "find pokemon", "pokemon name search", "pokemon database search", "search pokemon by name"],
  alternates: { canonical: "https://pokemonrandom.com/pokemon-search/" },
  openGraph: {
    title: "Pok\u00e9mon Search 2026 \u2014 Find Any Pok\u00e9mon Free",
    description: "Search all 1,025 Pok\u00e9mon by name or Pok\u00e9dex number. Live results with sprites and links to full entries. Free Pok\u00e9mon search engine.",
    url: "https://pokemonrandom.com/pokemon-search/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pok\u00e9mon Search 2026 \u2014 Find Any Pok\u00e9mon Free",
    description: "Search all 1,025 Pok\u00e9mon by name or Pok\u00e9dex number. Live results with sprites and links to full entries. Free Pok\u00e9mon search engine.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Pok\u00e9mon Search", item: "https://pokemonrandom.com/pokemon-search/" },
  ],
};

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Pokémon Search</span>
          </nav>


          <h1 className="text-4xl font-bold tracking-tight mb-4">Pokémon Search</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Search all 1,025 Pokémon by name or National Pokédex number. Live results
            as you type, with sprites and quick links to full Pokédex entries.
            Find any Pokémon instantly.
          </p>

          <PokemonSearch />

          <InContentAd />

          <section className="mt-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>How to Search Pokémon</h2>
            <p>
              Our Pokémon Search lets you find any of the 1,025 Pokémon in the National
              Pokédex by typing its name or National Pokédex number. As you type, the
              search results update instantly, showing matching Pokémon with their sprites
              and numbers. Click any result to view the full Pokédex entry with base stats,
              types, abilities, evolution chain, and shiny form.
            </p>
            <p>
              The search supports partial matches, so typing &ldquo;char&rdquo; will find
              Charmander, Charmeleon, Charizard, and any other Pokémon with &ldquo;char&rdquo;
              in its name. You can also search by number — typing &ldquo;25&rdquo; will find
              Pikachu (National Pokédex #25). The search is case-insensitive and works
              with both English and romanized Japanese names.
            </p>
            <p>
              If you&rsquo;re looking for Pokémon of a specific type, visit our{" "}
              <Link href="/pokemon/" className="text-primary">Pokédex</Link>{" "}
              to browse by type or generation. For random discovery, use our{" "}
              <Link href="/random-pokemon/" className="text-primary">Random Pokémon Generator</Link>.
            </p>
          </section>



        {/* MASSIVE_SEO_V2 — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>How to Find Any Pokémon in Our Database</h2>
          <p>Our Pokémon Search tool makes it easy to find any Pokémon in our complete Pokédex of 1,025 creatures from all nine generations of the franchise. You can search by name, by National Pokédex number, or by type to quickly locate the Pokémon you are looking for. The search results display the Pokémon name, number, type, and official artwork, making it easy to identify the Pokémon at a glance. Click on any Pokémon in the search results to view its detailed page with full stats, abilities, evolution chain, shiny form, and more.</p>
          <p>The search tool supports both English and Japanese Pokémon names, as well as common misspellings and alternative names. If you are not sure of the exact spelling of a Pokémon name, simply type the first few letters and the search tool will show all matching results. You can also filter the search results by generation to narrow down the list to Pokémon from a specific generation. This is useful if you are playing through a specific game and want to find Pokémon that are native to that region.</p>
          <p>In addition to searching for specific Pokémon, you can also browse our complete Pokédex by visiting the Pokémon Database page. The Pokédex is organized by National Pokédex number, starting with Bulbasaur at number 1 and ending with the most recent Pokémon at number 1,025. You can filter the Pokédex by generation, by type, or by legendary status to find specific types of Pokémon. For random discovery, use our Random Pokémon Generator which picks a random Pokémon from the National Pokédex each time you click the generate button.</p>
        </section>

        {/* Final push for text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Advanced Search Tips</h2>
          <p>Our Pokémon search tool supports a variety of search methods to help you find any Pokémon in our database of 1,025 creatures. You can search by the full Pokémon name, by partial name, or by National Pokédex number. The search is case-insensitive and supports common alternative spellings and romanizations. If you are searching for a Pokémon by its Japanese name, simply type the romanized version and the search tool will find it. You can also filter search results by generation, type, or legendary status to narrow down the list to specific categories of Pokémon.</p>
          <p>For competitive players, the search tool is a valuable resource for finding Pokémon with specific types or abilities. If you need a Fire type Pokémon for your team, simply search for Fire type Pokémon and browse the results. If you need a Pokémon with a specific ability like Intimidate or Swift Swim, you can search for Pokémon by type and then check their abilities on the detail page. The search tool is also useful for completing your National Pokédex, as you can quickly find any Pokémon by number or name and view its detailed information. For random discovery, use our Random Pokémon Generator which picks a random Pokémon each time you click.</p>
        </section>

        
        {/* Final push v2 */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Pokémon Search Use Cases</h2>
          <p>Our search tool is designed to serve a wide range of use cases for Pokémon fans. Competitive players use it to find Pokémon with specific types and abilities for their teams. Casual players use it to look up Pokémon they encountered in their playthroughs. Collectors use it to find Pokémon for their living Pokédex. Content creators use it to research Pokémon for their videos and streams. Nuzlocke players use it to look up Pokémon they have caught to learn about their stats and movesets. Whatever your Pokémon needs, our search tool provides quick and easy access to the complete National Pokédex with detailed information about every Pokémon from Generation 1 through Generation 9.</p>
        </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
