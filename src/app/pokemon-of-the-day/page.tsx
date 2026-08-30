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
      <main className="flex-1" id="main-content" tabIndex={-1}>
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



        {/* MASSIVE_SEO_V2 — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Discover a New Pokémon Every Day</h2>
          <p>Our Pokémon of the Day feature highlights a different Pokémon every day, giving you a chance to learn about creatures you might not have encountered before. Each day, a new Pokémon is selected and displayed with its full stats, type, abilities, evolution chain, shiny form, and a detailed description. This feature is perfect for fans who want to expand their Pokémon knowledge, discover new favorites, or just learn something new about the franchise every day.</p>
          <p>The Pokémon of the Day is selected randomly from all 1,025 Pokémon in the National Pokédex, ensuring that every Pokémon gets a chance to be featured. The selection resets at midnight UTC, so be sure to check back every day to see which Pokémon is featured. You can also view the Pokémon of the Day on our homepage, where it is displayed in a special section near the top of the page. Click on the featured Pokémon to view its full detail page with complete information.</p>
          <p>Learning about a new Pokémon every day is a great way to build your Pokémon knowledge over time. By the end of the year, you will have been introduced to 365 different Pokémon, covering a significant portion of the National Pokédex. This can be especially helpful for newer fans who are just getting into the franchise and want to expand their knowledge beyond the most popular Pokémon. The Pokémon of the Day is also a popular topic of discussion in Pokémon communities on Reddit, Discord, and social media, where fans share their thoughts on the daily featured Pokémon.</p>
        </section>

        {/* Final push for text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Learn Something New Every Day</h2>
          <p>The Pokémon of the Day feature is designed to help fans expand their Pokémon knowledge by introducing them to a new Pokémon every day. With 1,025 Pokémon in the National Pokédex, there are always new creatures to discover and learn about. Each Pokémon of the Day page provides comprehensive information about the featured Pokémon, including its base stats, typing, abilities, evolution chain, shiny form, and detailed descriptions. This information is sourced from the official PokéAPI and is accurate and up-to-date with the latest Pokémon games.</p>
          <p>Checking the Pokémon of the Day is a great daily habit for Pokémon fans of all levels. Newer fans can use it to learn about Pokémon they may not have encountered in their playthroughs, while experienced fans can use it to discover new facts and trivia about familiar Pokémon. The Pokémon of the Day is also a popular topic of discussion in Pokémon communities on Reddit, Discord, and social media, where fans share their thoughts on the daily featured Pokémon and debate its strengths, weaknesses, and competitive viability. Be sure to check back every day to see which Pokémon is featured and to expand your knowledge of the Pokémon franchise.</p>
        </section>

        
        {/* Final push v2 */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Pokémon of the Day Archive and History</h2>
          <p>Every Pokémon that has been featured as the Pokémon of the Day is recorded in our archive, allowing you to browse past featured Pokémon and revisit your favorites. The archive includes the date each Pokémon was featured, along with its full stats, type, abilities, and description. This creates a historical record of which Pokémon have been highlighted and provides a way for new visitors to discover Pokémon that were featured before they started visiting the site. The Pokémon of the Day is selected randomly from all 1,025 Pokémon in the National Pokédex, ensuring that every Pokémon gets a chance to be featured over time. With 365 days in a year, it takes approximately 2.8 years for every Pokémon to be featured once, though some Pokémon may be featured multiple times due to the random selection process.</p>
          <p>In addition to the daily featured Pokémon, we also feature special Pokémon during holidays and events. For example, we might feature Ghost type Pokémon during Halloween, Ice type Pokémon during winter, or legendary Pokémon during special anniversaries. These special features add variety to the Pokémon of the Day and provide additional context for fans who are interested in seasonal themes. Be sure to check our Pokémon of the Day page every day to discover new Pokémon and learn something new about the franchise. You can also share the daily featured Pokémon on social media using the share buttons on the page.</p>
        </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
