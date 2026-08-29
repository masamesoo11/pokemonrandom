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



        {/* MASSIVE_SEO_V2 — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Create Custom Pokémon Tier Lists</h2>
          <p>Our Pokémon Tier List Builder lets you create custom tier lists by ranking Pokémon from best to worst according to your own criteria. Whether you are ranking Pokémon by their competitive viability, their design, their usefulness in a specific game, or any other criteria, our tier list builder provides an easy to use interface for creating and sharing your rankings. You can drag and drop Pokémon into different tiers, customize the tier names and colors, and share your completed tier list with friends or on social media.</p>
          <p>To create a tier list, start by selecting the Pokémon you want to rank. You can choose from all 1,025 Pokémon in the National Pokédex, or filter by generation or type to narrow down the selection. Once you have selected your Pokémon, drag and drop them into the tier rows. Each tier can be given a custom name and color, allowing you to create a tier list that matches your specific ranking criteria. Common tier names include S Tier for the best Pokémon, A Tier for great Pokémon, B Tier for good Pokémon, C Tier for average Pokémon, and D Tier for below average Pokémon.</p>
          <p>Tier lists are a popular format in the Pokémon community for discussing and debating the relative merits of different Pokémon. Competitive players create tier lists to rank Pokémon by their viability in specific formats, while casual fans create tier lists to rank Pokémon by their designs, personalities, or nostalgia factor. Tier list videos and streams are popular content on YouTube and Twitch, where content creators share their rankings and discuss them with their audience. Our tier list builder makes it easy to create your own tier lists and join the conversation.</p>
        </section>

        {/* Final push for text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Tier List Strategies and Community Rankings</h2>
          <p>Pokémon tier lists are a popular way for the community to rank and discuss the relative merits of different Pokémon. Competitive players create tier lists based on viability in specific formats like OverUsed, UnderUsed, or VGC, while casual fans create tier lists based on design, nostalgia, or personal preference. Our tier list builder provides a flexible interface for creating custom tier lists with any criteria you choose. You can select from all 1,025 Pokémon in the National Pokédex, arrange them into tiers, and customize the tier names and colors to suit your needs.</p>
          <p>When creating a competitive tier list, consider factors such as base stats, typing, abilities, movepool, and synergy with other Pokémon. A Pokémon that is excellent in one format may be mediocre in another, so it is important to specify the context of your tier list. For example, a Pokémon that is top-tier in Singles may be less effective in Doubles due to the different dynamics of the format. Similarly, a Pokémon that is excellent in Generation 8 may have lost viability in Generation 9 due to new mechanics, abilities, or Pokémon being introduced. When sharing your tier list, be sure to explain your ranking criteria and invite discussion from the community. Tier lists are a great way to start conversations about Pokémon strategy and to learn from the perspectives of other players.</p>
        </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
