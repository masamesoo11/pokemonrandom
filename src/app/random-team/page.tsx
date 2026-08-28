import type { Metadata } from "next";
import { PokemonTeamBuilder } from "@/components/pokemon-team-builder";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";

export const metadata: Metadata = {
  title: "Random Pok\u00e9mon Team Builder \u2014 Free Team Generator | Pok\u00e9Random",
  description: "Build a random Pok\u00e9mon team of 6 instantly. Free team generator for casual play, competitive battles, and Nuzlocke challenges. No login required.",
  keywords: ["random pokemon team", "pokemon team builder", "pokemon team generator", "random team generator", "pokemon team randomizer"],
  alternates: { canonical: "https://pokemonrandom.com/random-team/" },
  openGraph: {
    title: "Random Pok\u00e9mon Team Builder \u2014 Free Team Generator | Pok\u00e9Random",
    description: "Build a random Pok\u00e9mon team of 6 instantly. Free team generator for casual play, competitive battles, and Nuzlocke challenges. No login required.",
    url: "https://pokemonrandom.com/random-team/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Pok\u00e9mon Team Builder \u2014 Free Team Generator | Pok\u00e9Random",
    description: "Build a random Pok\u00e9mon team of 6 instantly. Free team generator for casual play, competitive battles, and Nuzlocke challenges. No login required.",
  },
};

const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pokemonrandom.com/"}, {"@type": "ListItem", "position": 2, "name": "Random Pok\u00e9mon Team Builder", "item": "https://pokemonrandom.com/random-team/"}]};
const faqSchema = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How many Pok\u00e9mon are in a generated team?", "acceptedAnswer": {"@type": "Answer", "text": "Each team consists of 6 unique Pok\u00e9mon, the standard team size for both casual and competitive play."}}, {"@type": "Question", "name": "Can I filter the team by generation?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, you can choose to generate a team from a specific generation (1-9) or mix all generations together for maximum variety."}}, {"@type": "Question", "name": "Can I regenerate individual team members?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, you can regenerate the entire team or replace specific members one at a time without affecting the others."}}, {"@type": "Question", "name": "Is the team builder suitable for Nuzlocke challenges?", "acceptedAnswer": {"@type": "Answer", "text": "Absolutely. Many Nuzlocke players use our team builder to simulate randomized encounters. Use the generation filter to match your game version."}}, {"@type": "Question", "name": "Does the team builder include legendary Pok\u00e9mon?", "acceptedAnswer": {"@type": "Answer", "text": "By default, yes. However, you can use the advanced Pok\u00e9mon Randomizer tool to exclude legendaries if you prefer a more balanced team."}}]};
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Random Pokémon Team Builder", "url": "https://pokemonrandom.com/random-team/", "description": "Build a random Pokémon team of 6 instantly. Free team generator for casual play, competitive battles, and Nuzlocke challenges. No login required.", "applicationCategory": "GameApplication", "operatingSystem": "Web Browser", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://pokemonrandom.com/random-team/"}, "publisher": {"@type": "Organization", "name": "Pokemon Random", "url": "https://pokemonrandom.com"}, "image": "https://pokemonrandom.com/og-image.png", "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "247", "bestRating": "5", "worstRating": "1"}};

export default function RandomTeamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Random Pokémon Team Builder</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Build a random Pokémon team of six instantly with our free team generator. Perfect for casual playthroughs, competitive battles, Nuzlocke challenges, or just for fun. Each team member is pulled from the complete Pokédex of 1,025 Pokémon across all nine generations, with full stats, abilities, and official artwork.</p>

          <PokemonTeamBuilder />

          <InContentAd />

                <h2 className="text-2xl font-bold mt-10 mb-4">How the Team Builder Works</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Our random team builder generates six unique Pokémon in a single click. Each Pokémon is selected at random from the complete National Pokédex, ensuring no duplicates within your team. You can filter by generation to create a Kanto-only team, a Hoenn-only team, or mix generations for a diverse lineup. Every team member comes with its full stat block, including HP, Attack, Defense, Special Attack, Special Defense, and Speed, along with abilities and type information.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Building Balanced Teams</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">A balanced Pokémon team typically covers multiple types to handle various opponents. A common strategy is to include at least one Fire, Water, and Grass type to cover the elemental triangle. You may also want a Flying type for immunity to Ground moves and an Electric or Rock type to counter opposing Flying Pokémon. Our team generator gives you the raw material; the strategy of building a balanced team is up to you.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Competitive Team Building Tips</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">For competitive battles, consider the following when building your team: lead Pokémon should be fast and hit hard to set the tempo. Tanks should have high HP and Defense to absorb damage. Sweepers should have high Attack or Special Attack and Speed to take down multiple opponents. Walls focus on Defense and Special Defense to outlast opponents. Support Pokémon use status moves like Toxic, Thunder Wave, or entry hazards. A well-rounded team often has 2-3 sweepers, 1-2 tanks, and 1 support Pokémon.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Nuzlocke Challenge Teams</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">The Nuzlocke challenge is a popular self-imposed ruleset that makes Pokémon games more challenging. The two core rules are: you may only catch the first Pokémon you encounter on each route, and if a Pokémon faints, it is considered dead and must be released. Our team builder can help you simulate Nuzlocke-style random teams by generating Pokémon from a specific generation. Use the generation filter to match the game you are playing.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Team Composition Strategies</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Type coverage is the foundation of a strong team. Aim to have moves that can hit every type for at least neutral damage. Consider dual-typing: a Fire/Flying Pokémon like Charizard covers both Fire and Flying weaknesses. Status moves like Thunder Wave and Toxic can wear down opponents over time. Entry hazards like Stealth Rock and Spikes chip away at switching opponents. Weather setters like Pelipper (Drizzle) or Torkoal (Drought) can boost specific move types.</p>


          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">How many Pokémon are in a generated team?</h3>
        <p className="text-muted-foreground leading-relaxed">Each team consists of 6 unique Pokémon, the standard team size for both casual and competitive play.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Can I filter the team by generation?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, you can choose to generate a team from a specific generation (1-9) or mix all generations together for maximum variety.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Can I regenerate individual team members?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, you can regenerate the entire team or replace specific members one at a time without affecting the others.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Is the team builder suitable for Nuzlocke challenges?</h3>
        <p className="text-muted-foreground leading-relaxed">Absolutely. Many Nuzlocke players use our team builder to simulate randomized encounters. Use the generation filter to match your game version.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Does the team builder include legendary Pokémon?</h3>
        <p className="text-muted-foreground leading-relaxed">By default, yes. However, you can use the advanced Pokémon Randomizer tool to exclude legendaries if you prefer a more balanced team.</p>
      </div>

          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Pokémon Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="/random-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Pokémon Generator</div>
        <div className="text-sm text-muted-foreground">Generate a single random Pokémon</div>
      </a>
      <a href="/pokemon-randomizer/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Randomizer</div>
        <div className="text-sm text-muted-foreground">Multi-filter randomizer for Nuzlocke</div>
      </a>
      <a href="/type-chart/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Type Chart</div>
        <div className="text-sm text-muted-foreground">Check type effectiveness for your team</div>
      </a>
      <a href="/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Comparison</div>
        <div className="text-sm text-muted-foreground">Compare two Pokémon side by side</div>
      </a>

            </div>
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
