import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { PokemonSearch } from "@/components/pokemon-search";


export const metadata: Metadata = {
  title: "Pok\u00e9mon Search \u2014 Find Any Pok\u00e9mon by Name or Number | Pok\u00e9Random",
  description: "Search all 1,025 Pok\u00e9mon by name or Pok\u00e9dex number. Live results with sprites and links to full entries. Free Pok\u00e9mon search engine.",
  keywords: ["pokemon search", "find pokemon", "pokemon name search", "pokemon database search", "search pokemon by name"],
  alternates: { canonical: "https://pokemonrandom.com/pokemon-search/" },
  openGraph: {
    title: "Pok\u00e9mon Search \u2014 Find Any Pok\u00e9mon by Name or Number | Pok\u00e9Random",
    description: "Search all 1,025 Pok\u00e9mon by name or Pok\u00e9dex number. Live results with sprites and links to full entries. Free Pok\u00e9mon search engine.",
    url: "https://pokemonrandom.com/pokemon-search/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pok\u00e9mon Search \u2014 Find Any Pok\u00e9mon by Name or Number | Pok\u00e9Random",
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
      <main className="flex-1">
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


        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
