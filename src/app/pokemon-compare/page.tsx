import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { PokemonComparison } from "@/components/pokemon-comparison";


export const metadata: Metadata = {
  title: "Pok\u00e9mon Comparison Tool 2026 \u2014 Compare Stats Side by Side",
  description: "Compare two Pokemon side by side. See base stats, types, abilities, and evolution differences. Free online comparison tool for competitive team building. No signup required.",
  keywords: ["pokemon comparison", "compare pokemon", "pokemon stats comparison", "pokemon vs pokemon", "which pokemon is better"],
  alternates: { canonical: "https://pokemonrandom.com/pokemon-compare/" },
  openGraph: {
    title: "Pok\u00e9mon Comparison Tool 2026 \u2014 Compare Stats Side by Side",
    description: "Compare any two Pok\u00e9mon side by side. View base stats, types, abilities, and weaknesses in one view. Free Pok\u00e9mon comparison tool for competitive team building.",
    url: "https://pokemonrandom.com/pokemon-compare/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pok\u00e9mon Comparison Tool 2026 \u2014 Compare Stats Side by Side",
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
      <main className="flex-1" id="main-content" tabIndex={-1}>
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



        {/* MASSIVE_SEO_V2 — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>How to Compare Pokémon Effectively</h2>
          <p>Our Pokémon Comparison Tool lets you evaluate two Pokémon side by side, comparing their base stats, types, abilities, and other attributes to help you decide which one is the better choice for your team. Whether you are trying to choose between two similar Pokémon for a competitive team, deciding which Pokémon to use in a Nuzlocke challenge, or just curious about how two Pokémon stack up against each other, our comparison tool provides a clear and detailed breakdown of the differences and similarities between any two Pokémon in the National Pokédex.</p>
          <p>To use the comparison tool, simply select two Pokémon from the dropdown menus or search for them by name. The tool will display a side by side comparison of their base stats, including HP, Attack, Defense, Special Attack, Special Defense, and Speed. You will also see their types, abilities, height, weight, and official artwork. The comparison highlights the stronger stat in each category, making it easy to see at a glance which Pokémon has the overall stat advantage. You can also see the base stat total for each Pokémon, which gives a quick overview of their overall power level.</p>
          <p>When comparing Pokémon, it is important to consider not just their base stats but also their typing, abilities, and movepools. A Pokémon with higher stats may not always be the better choice if its typing creates weaknesses that the opponent can exploit. Similarly, a Pokémon with a powerful ability may be more valuable than one with higher stats but a less useful ability. Use our comparison tool in conjunction with our Type Chart and Abilities Database to make informed decisions about which Pokémon to add to your team. For random team building, try our Random Team Builder which can generate a balanced team of 6 Pokémon with optional generation filtering.</p>
        </section>

        {/* Final push for text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Advanced Comparison Tips</h2>
          <p>When comparing two Pokémon, there are several factors to consider beyond just base stats. Type effectiveness plays a crucial role in determining how well a Pokémon will perform in battle, as a Pokémon with a favorable type matchup can often defeat a statistically superior opponent. Abilities can also dramatically change a Pokémon's viability, as some abilities like Intimidate, Huge Power, and Levitate can transform an otherwise average Pokémon into a top-tier competitor. Movepool is another important consideration, as a Pokémon with a wider movepool has more options for coverage and can handle a greater variety of threats. Finally, consider the Pokémon's role on your team: a Pokémon with lower stats but the right typing and abilities for a specific role may be more valuable than a statistically superior Pokémon that doesn't fit your team's needs.</p>
          <p>Our comparison tool also highlights the base stat total for each Pokémon, which gives a quick overview of their overall power level. Pokémon with base stat totals above 500 are generally considered strong, while those below 300 are considered weak. However, base stat total alone does not determine viability, as the distribution of stats is often more important than the total. A Pokémon with high Speed and Attack but low defensive stats may be an excellent sweeper but a poor wall, while a Pokémon with balanced stats may be versatile but not exceptional in any role. Use our comparison tool to evaluate not just the raw stats but also the stat distribution, typing, and abilities of each Pokémon to make informed decisions about which one is the better choice for your team.</p>
        </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
