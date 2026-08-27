import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { PokemonComparison } from "@/components/pokemon-comparison";


export const metadata: Metadata = {
  title: "Pok\u00e9mon Comparison Tool \u2014 Compare Two Pok\u00e9mon Side by Side | Pok\u00e9Random",
  description: "Compare any two Pok\u00e9mon side by side. View base stats, types, abilities, and weaknesses in one view. Free Pok\u00e9mon comparison tool for competitive team building.",
  keywords: ["pokemon comparison", "compare pokemon", "pokemon stats comparison", "pokemon vs pokemon", "which pokemon is better"],
  alternates: { canonical: "https://pokemonrandom.com/pokemon-compare/" },
  openGraph: {
    title: "Pok\u00e9mon Comparison Tool \u2014 Compare Two Pok\u00e9mon Side by Side | Pok\u00e9Random",
    description: "Compare any two Pok\u00e9mon side by side. View base stats, types, abilities, and weaknesses in one view. Free Pok\u00e9mon comparison tool for competitive team building.",
    url: "https://pokemonrandom.com/pokemon-compare/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pok\u00e9mon Comparison Tool \u2014 Compare Two Pok\u00e9mon Side by Side | Pok\u00e9Random",
    description: "Compare any two Pok\u00e9mon side by side. View base stats, types, abilities, and weaknesses in one view. Free Pok\u00e9mon comparison tool for competitive team building.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Pok\u00e9mon Comparison Tool", item: "https://pokemonrandom.com/pokemon-compare/" },
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
            <span className="text-foreground">Pokémon Comparison Tool</span>
          </nav>


          <h1 className="text-4xl font-bold tracking-tight mb-4">Pokémon Comparison Tool</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Compare two Pokémon side by side to see which is better for your team.
            View base stats, types, abilities, and weaknesses in a single view.
            Perfect for competitive team building and Nuzlocke planning.
          </p>

          <PokemonComparison />

          <InContentAd />

          <section className="mt-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>How to Compare Pokémon</h2>
            <p>
              Our Pokémon Comparison Tool lets you select any two Pokémon from the complete
              1,025-creature Pokédex and view their stats side by side. The comparison
              highlights which Pokémon has higher values in each base stat (HP, Attack,
              Defense, Special Attack, Special Defense, and Speed), making it easy to
              identify the stronger contender in each category.
            </p>
            <p>
              Beyond raw stats, the comparison also shows each Pokémon&rsquo;s types, which
              determine their offensive and defensive effectiveness. A Pokémon with better
              type coverage may be more valuable than one with higher stats, depending on
              your team&rsquo;s needs. Use the comparison tool alongside our{" "}
              <Link href="/type-chart/" className="text-primary">Type Chart</Link>{" "}
              to make informed decisions about which Pokémon to add to your team.
            </p>
            <p>
              For competitive players, the comparison tool is invaluable for evaluating
              counter-picks. If you&rsquo;re facing a specific threat in the meta, compare
              potential answers to find the Pokémon that best handles that threat while
              fitting your team&rsquo;s composition. The tool works for any two Pokémon,
              including legendaries, mythicals, and starters.
            </p>
          </section>

          <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <Link href="/random-pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Random Pokémon</div>
                <div className="text-muted-foreground">Generate any Pokémon</div>
              </Link>
              <Link href="/random-team/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Team Builder</div>
                <div className="text-muted-foreground">Build a team of 6</div>
              </Link>
              <Link href="/pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Pokédex</div>
                <div className="text-muted-foreground">All 1,025 Pokémon</div>
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
