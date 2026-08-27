import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { PokemonOfDay } from "@/components/pokemon-of-day";


export const metadata: Metadata = {
  title: "Pok\u00e9mon of the Day \u2014 Daily Featured Pok\u00e9mon | Pok\u00e9Random",
  description: "Discover a new Pok\u00e9mon every day! Our Pok\u00e9mon of the Day features a different creature from all 1,025 Pok\u00e9mon. Come back daily to explore the Pok\u00e9dex.",
  keywords: ["pokemon of the day", "daily pokemon", "featured pokemon", "pokemon daily", "todays pokemon"],
  alternates: { canonical: "https://pokemonrandom.com/pokemon-of-the-day/" },
  openGraph: {
    title: "Pok\u00e9mon of the Day \u2014 Daily Featured Pok\u00e9mon | Pok\u00e9Random",
    description: "Discover a new Pok\u00e9mon every day! Our Pok\u00e9mon of the Day features a different creature from all 1,025 Pok\u00e9mon. Come back daily to explore the Pok\u00e9dex.",
    url: "https://pokemonrandom.com/pokemon-of-the-day/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pok\u00e9mon of the Day \u2014 Daily Featured Pok\u00e9mon | Pok\u00e9Random",
    description: "Discover a new Pok\u00e9mon every day! Our Pok\u00e9mon of the Day features a different creature from all 1,025 Pok\u00e9mon. Come back daily to explore the Pok\u00e9dex.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Pok\u00e9mon of the Day", item: "https://pokemonrandom.com/pokemon-of-the-day/" },
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
            <span className="text-foreground">Pokémon of the Day</span>
          </nav>


          <h1 className="text-4xl font-bold tracking-tight mb-4">Pokémon of the Day</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover a new Pokémon every day! Our Pokémon of the Day is selected
            deterministically based on today&rsquo;s date, so every visitor sees the same
            Pokémon. Come back tomorrow for a new featured creature from our complete
            Pokédex of 1,025 Pokémon.
          </p>

          <PokemonOfDay />

          <InContentAd />

          <section className="mt-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>What Is Pokémon of the Day?</h2>
            <p>
              Our Pokémon of the Day feature showcases a different Pokémon every 24 hours,
              selected from all 1,025 creatures across nine generations. The selection is
              deterministic, meaning every visitor around the world sees the same Pokémon
              on any given day. This creates a shared experience for the Pokémon community
              and encourages daily visits to discover new creatures.
            </p>
            <p>
              Each Pokémon of the Day includes the creature&rsquo;s official artwork, base stats,
              type, abilities, and a link to its full Pokédex entry. Use this feature to
              discover Pokémon you may not have encountered before, learn about their stats
              and abilities, and decide whether to add them to your team. The daily rotation
              ensures you&rsquo;ll see over 365 different Pokémon throughout the year.
            </p>
            <p>
              Want to explore more Pokémon? Visit our complete{" "}
              <Link href="/pokemon/" className="text-primary">Pokémon Database</Link>{" "}
              to browse all 1,025 creatures, or use our{" "}
              <Link href="/random-pokemon/" className="text-primary">Random Pokémon Generator</Link>{" "}
              to get a random Pokémon on demand.
            </p>
          </section>

          <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <Link href="/random-pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Random Pokémon</div>
                <div className="text-muted-foreground">Generate any Pokémon</div>
              </Link>
              <Link href="/pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Pokédex</div>
                <div className="text-muted-foreground">Browse all 1,025</div>
              </Link>
              <Link href="/random-team/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Team Builder</div>
                <div className="text-muted-foreground">Build a team of 6</div>
              </Link>
            </div>
          </section>


        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
