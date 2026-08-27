import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { TierListBuilder } from "@/components/tier-list-builder";


export const metadata: Metadata = {
  title: "Pok\u00e9mon Tier List Builder \u2014 Create Custom Tier Lists | Pok\u00e9Random",
  description: "Create your own Pok\u00e9mon tier list with our free drag-and-drop builder. Rank Pok\u00e9mon from S to F tier. Export as image. Build tier lists for any generation or topic.",
  keywords: ["pokemon tier list", "tier list builder", "pokemon ranking", "create tier list", "pokemon tier maker"],
  alternates: { canonical: "https://pokemonrandom.com/tier-lists/" },
  openGraph: {
    title: "Pok\u00e9mon Tier List Builder \u2014 Create Custom Tier Lists | Pok\u00e9Random",
    description: "Create your own Pok\u00e9mon tier list with our free drag-and-drop builder. Rank Pok\u00e9mon from S to F tier. Export as image. Build tier lists for any generation or topic.",
    url: "https://pokemonrandom.com/tier-lists/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pok\u00e9mon Tier List Builder \u2014 Create Custom Tier Lists | Pok\u00e9Random",
    description: "Create your own Pok\u00e9mon tier list with our free drag-and-drop builder. Rank Pok\u00e9mon from S to F tier. Export as image. Build tier lists for any generation or topic.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Pok\u00e9mon Tier List Builder", item: "https://pokemonrandom.com/tier-lists/" },
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
            <span className="text-foreground">Pokémon Tier List Builder</span>
          </nav>


          <h1 className="text-4xl font-bold tracking-tight mb-4">Pokémon Tier List Builder</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Create your own Pokémon tier list! Drag and drop Pokémon into S, A, B, C, D,
            and F tiers. Build tier lists for any generation, type, or competitive format.
            Export your tier list as an image to share with friends.
          </p>

          <TierListBuilder />

          <InContentAd />

          <section className="mt-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>How to Build a Tier List</h2>
            <p>
              Our Pokémon Tier List Builder lets you create custom tier lists by dragging
              and dropping Pokémon into six tiers: S (top), A, B, C, D, and F (bottom).
              Start by selecting a generation or type to populate the Pokémon pool, then
              drag each Pokémon into the tier you think it deserves. You can rearrange
              Pokémon within tiers and across tiers at any time.
            </p>
            <p>
              Tier lists are a popular way for the Pokémon community to rank Pokémon by
              strength, viability, or personal preference. Common tier list topics include
              &ldquo;Best Starters,&rdquo; &ldquo;Strongest Legendaries,&rdquo; &ldquo;Best
              Shiny Designs,&rdquo; and &ldquo;Most Annoying to Fight.&rdquo; Use our builder
              to create your own tier list for any topic you can imagine.
            </p>
            <p>
              Once your tier list is complete, you can export it as an image to share on
              social media, Reddit, Discord, or your blog. The export feature uses the
              HTML Canvas API to generate a PNG image of your tier list. Your tier list
              is saved in your browser&rsquo;s local storage, so you can continue working on
              it later.
            </p>
          </section>

          <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <Link href="/pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Pokédex</div>
                <div className="text-muted-foreground">Browse all 1,025</div>
              </Link>
              <Link href="/pokemon-compare/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Comparison</div>
                <div className="text-muted-foreground">Compare two Pokémon</div>
              </Link>
              <Link href="/random-team/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Team Builder</div>
                <div className="text-muted-foreground">Generate a team</div>
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
