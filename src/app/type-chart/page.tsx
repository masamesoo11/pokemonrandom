import type { Metadata } from "next";
import { TypeChartSection } from "@/components/type-chart-section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";

export const metadata: Metadata = {
  title: "Pok\u00e9mon Type Chart \u2014 Full 18\u00d718 Effectiveness Matrix | Pok\u00e9Random",
  description: "Complete Pok\u00e9mon type chart with all 18 types and their effectiveness. Find out which moves are super effective, weak, or useless against any type.",
  keywords: ["pokemon type chart", "type effectiveness", "pokemon weakness chart", "type matchups", "pokemon type matrix", "super effective chart"],
  alternates: { canonical: "https://pokemonrandom.com/type-chart/" },
  openGraph: {
    title: "Pok\u00e9mon Type Chart \u2014 Full 18\u00d718 Effectiveness Matrix | Pok\u00e9Random",
    description: "Complete Pok\u00e9mon type chart with all 18 types and their effectiveness. Find out which moves are super effective, weak, or useless against any type.",
    url: "https://pokemonrandom.com/type-chart/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pok\u00e9mon Type Chart \u2014 Full 18\u00d718 Effectiveness Matrix | Pok\u00e9Random",
    description: "Complete Pok\u00e9mon type chart with all 18 types and their effectiveness. Find out which moves are super effective, weak, or useless against any type.",
  },
};

const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pokemonrandom.com/"}, {"@type": "ListItem", "position": 2, "name": "Pok\u00e9mon Type Chart \u2014 Full Effectiveness Matrix", "item": "https://pokemonrandom.com/type-chart/"}]};
const faqSchema = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How many types are in Pok\u00e9mon?", "acceptedAnswer": {"@type": "Answer", "text": "There are 18 Pok\u00e9mon types: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, and Fairy."}}, {"@type": "Question", "name": "What does super effective mean?", "acceptedAnswer": {"@type": "Answer", "text": "A super effective move deals 2x damage to the target. If the target is dual-typed and both types are weak to the move, it deals 4x damage."}}, {"@type": "Question", "name": "What is the strongest type defensively?", "acceptedAnswer": {"@type": "Answer", "text": "Steel is widely considered the strongest defensive type, with 10 resistances and 1 immunity. Fairy and Fire are also excellent defensive types."}}, {"@type": "Question", "name": "What is the strongest type offensively?", "acceptedAnswer": {"@type": "Answer", "text": "Offensive strength depends on the meta, but Fairy, Ground, and Fire are consistently strong due to hitting many types for super effective damage."}}, {"@type": "Question", "name": "How does dual typing work?", "acceptedAnswer": {"@type": "Answer", "text": "When a Pok\u00e9mon has two types, the effectiveness of each move is the product of the effectiveness against each type. For example, a Fire move against a Grass/Ice Pok\u00e9mon deals 4x damage (2x \u00d7 2x)."}}]};
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Pok\u00e9mon Type Chart \u2014 Full Effectiveness Matrix", "url": "https://pokemonrandom.com/type-chart/", "description": "Complete Pok\u00e9mon type chart with all 18 types and their effectiveness. Find out which moves are super effective, weak, or useless against any type.", "applicationCategory": "GameApplication", "operatingSystem": "Web Browser", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@type": "Organization", "name": "Pokemon Random", "url": "https://pokemonrandom.com"}};

export default function TypeChartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Pokémon Type Chart — Full Effectiveness Matrix</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">The complete Pokémon type chart covering all 18 types and their effectiveness against each other. Find out which moves are super effective (2x damage), normal (1x), not very effective (0.5x), or useless (0x). Hover over any cell to see the exact multiplier. Essential for competitive battles, Nuzlocke challenges, and team building.</p>

          <TypeChartSection />

          <InContentAd />

                <h2 className="text-2xl font-bold mt-10 mb-4">Understanding Type Effectiveness</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Pokémon battles are decided by type effectiveness. A super effective move deals 2x damage, while a not very effective move deals 0.5x damage. Some type combinations are completely immune to certain moves — for example, Ghost-type Pokémon take zero damage from Normal and Fighting moves. Dual-typed Pokémon multiply these effectiveness values: a Water/Ground Pokémon like Swampert takes 4x damage from Grass moves because both Water and Ground are weak to Grass.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">The 18 Pokémon Types</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">There are 18 Pokémon types in the main series games: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, and Fairy. The first 15 types were introduced in Generation 1, Dark and Steel were added in Generation 2, and Fairy was added in Generation 6 to balance the Dragon type. Each type has its own strengths, weaknesses, and immunities.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Type Strategy for Battles</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">A strong team covers multiple types offensively and defensively. Offensively, aim to have moves that hit at least 6-8 types for super effective damage. Defensively, try to avoid having multiple Pokémon weak to the same type. Common defensive cores include Steel/Fairy (immune to Dragon, resists many types) and Water/Ground (only weak to Grass). Type synergy is more important than raw stats in competitive battles.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Dual Typing and Multipliers</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">When a Pokémon has two types, the effectiveness of a move is the product of the effectiveness against each type. For example, a Bug-type move against a Psychic/Grass Pokémon deals 4x damage (2x for Psychic, 2x for Grass, multiplied together). A Fire-type move against a Water/Dragon Pokémon deals 0.25x damage (0.5x for Water, 0.5x for Dragon). Understanding these multipliers is key to predicting battle outcomes.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Type Chart Changes Across Generations</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">The type chart has evolved over the years. In Generation 1, Bug and Poison were super effective against each other, and Ghost had no effect on Psychic (a bug). Generation 2 introduced Dark and Steel, rebalanced several matchups, and made Ghost effective against Psychic. Generation 6 introduced Fairy, which is super effective against Dragon, Dark, and Fighting, and immune to Dragon. Our chart reflects the current Generation 9 mechanics.</p>


          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">How many types are in Pokémon?</h3>
        <p className="text-muted-foreground leading-relaxed">There are 18 Pokémon types: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, and Fairy.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">What does super effective mean?</h3>
        <p className="text-muted-foreground leading-relaxed">A super effective move deals 2x damage to the target. If the target is dual-typed and both types are weak to the move, it deals 4x damage.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">What is the strongest type defensively?</h3>
        <p className="text-muted-foreground leading-relaxed">Steel is widely considered the strongest defensive type, with 10 resistances and 1 immunity. Fairy and Fire are also excellent defensive types.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">What is the strongest type offensively?</h3>
        <p className="text-muted-foreground leading-relaxed">Offensive strength depends on the meta, but Fairy, Ground, and Fire are consistently strong due to hitting many types for super effective damage.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">How does dual typing work?</h3>
        <p className="text-muted-foreground leading-relaxed">When a Pokémon has two types, the effectiveness of each move is the product of the effectiveness against each type. For example, a Fire move against a Grass/Ice Pokémon deals 4x damage (2x × 2x).</p>
      </div>

          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Pokémon Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="/random-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Pokémon Generator</div>
        <div className="text-sm text-muted-foreground">Generate a Pokémon to test matchups</div>
      </a>
      <a href="/random-team/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Team Builder</div>
        <div className="text-sm text-muted-foreground">Build a type-balanced team</div>
      </a>
      <a href="/pokemon-quiz/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Quiz</div>
        <div className="text-sm text-muted-foreground">Test your Pokémon knowledge</div>
      </a>
      <a href="/universal-pokemon-randomizer/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Universal Pokémon Randomizer</div>
        <div className="text-sm text-muted-foreground">Randomize Pokémon games</div>
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
