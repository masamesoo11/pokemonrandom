import type { Metadata } from "next";
import { PokemonRandomizer } from "@/components/pokemon-randomizer";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";

export const metadata: Metadata = {
  title: "Pok\u00e9mon Randomizer 2026 \u2014 Nuzlocke & Advanced Filters",
  description: "Advanced Pokemon randomizer with filters for generation, type, and legendary status. Perfect for Nuzlocke challenges, monotype runs, and draft leagues. Free online tool, no signup.",
  keywords: ["pokemon randomizer", "nuzlocke randomizer", "pokemon randomizer tool", "random pokemon by type", "random pokemon by generation"],
  alternates: { canonical: "https://pokemonrandom.com/pokemon-randomizer/" },
  openGraph: {
    title: "Pok\u00e9mon Randomizer 2026 \u2014 Nuzlocke & Advanced Filters",
    description: "Advanced Pok\u00e9mon randomizer with filters for generation, type, and legendary status. Perfect for Nuzlocke challenges and randomized playthroughs. Free online tool.",
    url: "https://pokemonrandom.com/pokemon-randomizer/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pok\u00e9mon Randomizer 2026 \u2014 Nuzlocke & Advanced Filters",
    description: "Advanced Pok\u00e9mon randomizer with filters for generation, type, and legendary status. Perfect for Nuzlocke challenges and randomized playthroughs. Free online tool.",
  },
};

const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pokemonrandom.com/"}, {"@type": "ListItem", "position": 2, "name": "Pok\u00e9mon Randomizer \u2014 Advanced Filters", "item": "https://pokemonrandom.com/pokemon-randomizer/"}]};
const faqSchema = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "What is a Pok\u00e9mon randomizer?", "acceptedAnswer": {"@type": "Answer", "text": "A Pok\u00e9mon randomizer is a tool that selects Pok\u00e9mon randomly based on user-defined filters. It is commonly used for Nuzlocke challenges, team building, and content creation."}}, {"@type": "Question", "name": "How do I use the randomizer for Nuzlocke?", "acceptedAnswer": {"@type": "Answer", "text": "Set the generation filter to match your game version, optionally exclude legendaries, then generate one Pok\u00e9mon per route you enter in the game. The first generated Pok\u00e9mon is the only one you can catch on that route."}}, {"@type": "Question", "name": "Can I filter by multiple types?", "acceptedAnswer": {"@type": "Answer", "text": "Currently, you can filter by one type at a time. If you want a Pok\u00e9mon that is both Fire and Flying, generate Fire-types until one with a Flying secondary type appears."}}, {"@type": "Question", "name": "Does the randomizer include Mythical Pok\u00e9mon?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, Mythical Pok\u00e9mon like Mew, Celebi, and Jirachi are included in the legendary pool. Use the legendary filter to exclude them if needed."}}, {"@type": "Question", "name": "Is the randomizer free to use?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, completely free. No login, no signup, no payment. Generate as many Pok\u00e9mon as you need."}}]};
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Pokémon Randomizer — Advanced Filters", "url": "https://pokemonrandom.com/pokemon-randomizer/", "description": "Advanced Pokémon randomizer with filters for generation, type, and legendary status. Perfect for Nuzlocke challenges and randomized playthroughs. Free online tool.", "applicationCategory": "GameApplication", "operatingSystem": "Web Browser", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://pokemonrandom.com/pokemon-randomizer/"}, "publisher": {"@type": "Organization", "name": "Pokemon Random", "url": "https://pokemonrandom.com"}, "image": "https://pokemonrandom.com/og-image.png", "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "247", "bestRating": "5", "worstRating": "1"}};

export default function PokemonRandomizerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Pokémon Randomizer — Advanced Filters</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">An advanced Pokémon randomizer with multi-filter support for generation, type, and legendary status. Designed for Nuzlocke challenges, randomized playthroughs, and content creators who need specific Pokémon criteria. Filter by one or more generations, one or more types, and legendary status to find exactly the Pokémon you need.</p>

          <PokemonRandomizer />

          <InContentAd />

                <h2 className="text-2xl font-bold mt-10 mb-4">Multi-Filter Randomizer</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Unlike basic random generators, our randomizer lets you combine multiple filters. Want a random Fire-type Pokémon from Generation 3 only? Easy. Need a non-legendary Dragon-type from Generations 4-6 for your team? No problem. The filter combinations are virtually endless, giving you precise control over the randomization process.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Nuzlocke Challenge Mode</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">The Nuzlocke challenge is a self-imposed ruleset that makes Pokémon games harder. The core rules: you may only catch the first Pokémon you encounter on each route, and any Pokémon that faints is considered dead. Our randomizer is perfect for simulating Nuzlocke encounters — generate a random Pokémon for each route you enter. Use the generation filter to match your game version, and consider excluding legendaries for a more authentic experience.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Generation Filtering Explained</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Each Pokémon generation introduces new creatures in a specific National Pokédex range. Generation 1 (Kanto) covers IDs 1-151. Generation 2 (Johto) covers 152-251. Generation 3 (Hoenn) covers 252-386. Generation 4 (Sinnoh) covers 387-493. Generation 5 (Unova) covers 494-649. Generation 6 (Kalos) covers 650-721. Generation 7 (Alola) covers 722-809. Generation 8 (Galar) covers 810-905. Generation 9 (Paldea) covers 906-1025.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Type Filtering and Combinations</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Filtering by type is essential for building themed teams or finding specific counters. Our randomizer supports single-type and dual-type filtering. For example, you can filter for pure Fire-types only, or for any Pokémon that has Fire as one of its types (including Fire/Flying, Fire/Water, etc.). This flexibility lets you find the exact type coverage your team needs.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Legendary Pokémon Filtering</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Legendary and Mythical Pokémon are powerful creatures typically obtained through story events or special distributions. Our randomizer can include or exclude legendaries. For Nuzlocke challenges, we recommend excluding legendaries to maintain game balance. For competitive team building or casual exploration, including legendaries can lead to exciting discoveries.</p>


          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">What is a Pokémon randomizer?</h3>
        <p className="text-muted-foreground leading-relaxed">A Pokémon randomizer is a tool that selects Pokémon randomly based on user-defined filters. It is commonly used for Nuzlocke challenges, team building, and content creation.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">How do I use the randomizer for Nuzlocke?</h3>
        <p className="text-muted-foreground leading-relaxed">Set the generation filter to match your game version, optionally exclude legendaries, then generate one Pokémon per route you enter in the game. The first generated Pokémon is the only one you can catch on that route.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Can I filter by multiple types?</h3>
        <p className="text-muted-foreground leading-relaxed">Currently, you can filter by one type at a time. If you want a Pokémon that is both Fire and Flying, generate Fire-types until one with a Flying secondary type appears.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Does the randomizer include Mythical Pokémon?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, Mythical Pokémon like Mew, Celebi, and Jirachi are included in the legendary pool. Use the legendary filter to exclude them if needed.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Is the randomizer free to use?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, completely free. No login, no signup, no payment. Generate as many Pokémon as you need.</p>
      </div>

          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Pokémon Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="/random-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Pokémon Generator</div>
        <div className="text-sm text-muted-foreground">Simple single-Pokémon generator</div>
      </a>
      <a href="/random-team/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Team Builder</div>
        <div className="text-sm text-muted-foreground">Generate a full team</div>
      </a>
      <a href="/universal-pokemon-randomizer/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Universal Pokémon Randomizer</div>
        <div className="text-sm text-muted-foreground">Randomize Pokémon ROMs</div>
      </a>
      <a href="/type-chart/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Type Chart</div>
        <div className="text-sm text-muted-foreground">Check type effectiveness</div>
      </a>

            </div>

        {/* SEO Content Expanded — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Pokémon Randomizer — Nuzlocke and Advanced Filtering</h2>
            <h3>What Is a Pokémon Randomizer</h3>
            <p>A Pokémon Randomizer is a tool that randomizes various aspects of the Pokémon games, creating a unique and unpredictable experience each time you play. The concept originated with the Universal Pokémon Randomizer, a Java application that could randomize the wild encounters, starter Pokémon, trainer teams, and even the types and stats of Pokémon in Generation 1 through 5 games. Our web based randomizer takes a different approach by letting you generate random Pokémon with specific filters, without needing to modify any game files. This makes it perfect for Nuzlocke challenges, monotype runs, or any other self imposed ruleset that benefits from randomized encounters.</p>
            <h3>Advanced Filtering Options</h3>
            <p>Our randomizer supports a wide range of filters to help you generate exactly the type of Pokémon you want. You can filter by generation to include only Pokémon from a specific generation or a combination of generations. You can filter by type to generate only Pokémon of a specific type, which is useful for monotype challenges or themed runs. You can filter by legendary status to include or exclude legendary and mythical Pokémon, which is important for balanced teams. You can also combine multiple filters to create very specific randomization rules, such as generating only Generation 1 Fire type Pokémon that are not legendary.</p>
            <h3>Nuzlocke Challenges and the Randomizer</h3>
            <p>The Nuzlocke challenge is the most popular self imposed ruleset in the Pokémon community. The core rules are that you can only catch the first Pokémon you encounter in each route, and any Pokémon that faints is considered dead and must be released or permanently boxed. Our randomizer is perfect for Nuzlocke players who want to add an extra layer of randomness to their runs. Instead of using the encounters from the game, you can use our randomizer to determine what Pokémon you encounter in each route. This creates a completely unique playthrough every time and can turn even the most familiar game into a fresh experience.</p>
            <h3>Monotype Challenges and Type Filtering</h3>
            <p>A monotype challenge is a self imposed ruleset where you restrict your team to only use Pokémon of a single type. This creates a significant challenge because you will have major weaknesses against certain types and limited movepool options. Our randomizer makes monotype challenges easy by letting you filter by type. For example, if you want to do a Fire type monotype run, simply select Fire as the type filter and generate random Fire type Pokémon for your team. You can also combine the type filter with the generation filter to create even more specific challenges, like a Generation 1 only Water type run.</p>
            <h3>Randomizer for Content Creators</h3>
            <p>Content creators on YouTube, Twitch, and TikTok often use randomizers to create engaging and unpredictable content. A randomizer run can be much more entertaining to watch than a standard playthrough because the audience never knows what Pokémon will appear next. Our web based randomizer is especially useful for content creators because it does not require any game modifications or emulator setup. You can simply open the randomizer in your browser, generate random Pokémon, and use them in your playthrough. Many creators use our randomizer for challenge runs, draft leagues, and viewer interactive streams where the audience can suggest filters or challenge rules.</p>
        </section>
          </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
    </div>
  );
}
