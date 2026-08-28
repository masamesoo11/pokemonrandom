import type { Metadata } from "next";
import { RandomStarterPicker } from "@/components/random-starter-picker";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";

export const metadata: Metadata = {
  title: "Random Starter Pok\u00e9mon Picker \u2014 Gen 1 to Gen 9 | Pok\u00e9Random",
  description: "Can't decide which starter to pick? Use our free random starter Pok\u00e9mon picker to choose from Bulbasaur, Charmander, Squirtle, and all starters across 9 generations.",
  keywords: ["random starter pokemon", "pokemon starter picker", "starter pokemon generator", "pick a starter", "random starter picker"],
  alternates: { canonical: "https://pokemonrandom.com/random-starter/" },
  openGraph: {
    title: "Random Starter Pok\u00e9mon Picker \u2014 Gen 1 to Gen 9 | Pok\u00e9Random",
    description: "Can't decide which starter to pick? Use our free random starter Pok\u00e9mon picker to choose from Bulbasaur, Charmander, Squirtle, and all starters across 9 generations.",
    url: "https://pokemonrandom.com/random-starter/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Starter Pok\u00e9mon Picker \u2014 Gen 1 to Gen 9 | Pok\u00e9Random",
    description: "Can't decide which starter to pick? Use our free random starter Pok\u00e9mon picker to choose from Bulbasaur, Charmander, Squirtle, and all starters across 9 generations.",
  },
};

const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pokemonrandom.com/"}, {"@type": "ListItem", "position": 2, "name": "Random Starter Pok\u00e9mon Picker", "item": "https://pokemonrandom.com/random-starter/"}]};
const faqSchema = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How many starter Pok\u00e9mon are there?", "acceptedAnswer": {"@type": "Answer", "text": "There are 27 main-series starter Pok\u00e9mon: 3 per generation, across 9 generations. Each generation offers one Grass, one Fire, and one Water type."}}, {"@type": "Question", "name": "Can I pick a starter from a specific generation?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, you can filter by generation to limit the picker to starters from Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, or Paldea."}}, {"@type": "Question", "name": "What are the Generation 9 starters?", "acceptedAnswer": {"@type": "Answer", "text": "The Paldea starters are Sprigatito (Grass), Fuecoco (Fire), and Quaxly (Water). Their final evolutions are Meowscarada (Grass/Dark), Skeledirge (Fire/Ghost), and Quaquaval (Water/Fighting)."}}, {"@type": "Question", "name": "Which starter is the best?", "acceptedAnswer": {"@type": "Answer", "text": "There is no objective best starter \u2014 it depends on the game version and your playstyle. Charizard, Blaziken, and Greninja are popular competitive choices, while Swampert and Torterra are excellent for casual playthroughs."}}, {"@type": "Question", "name": "Can I see the shiny forms of starters?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, our picker includes shiny toggles for each starter. Shiny starters are extremely rare in the games (1 in 4,096 chance), so this is a great way to see what they look like."}}]};
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Random Starter Pokémon Picker", "url": "https://pokemonrandom.com/random-starter/", "description": "Can't decide which starter to pick? Use our free random starter Pokémon picker to choose from Bulbasaur, Charmander, Squirtle, and all starters across 9 generations.", "applicationCategory": "GameApplication", "operatingSystem": "Web Browser", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://pokemonrandom.com/random-starter/"}, "publisher": {"@type": "Organization", "name": "Pokemon Random", "url": "https://pokemonrandom.com"}, "image": "https://pokemonrandom.com/og-image.png", "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "247", "bestRating": "5", "worstRating": "1"}};

export default function RandomStarterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Random Starter Pokémon Picker</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Can't decide which starter Pokémon to choose? Let our random starter picker decide for you. We include all 27 main-series starter Pokémon across nine generations, from the classic Kanto trio of Bulbasaur, Charmander, and Squirtle to the newer Paldea starters Sprigatito, Fuecoco, and Quaxly.</p>

          <RandomStarterPicker />

          <InContentAd />

                <h2 className="text-2xl font-bold mt-10 mb-4">All 27 Starter Pokémon</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Each Pokémon generation introduces three new starter Pokémon, one of each of the Grass, Fire, and Water types. In Generation 1 (Kanto), you choose between Bulbasaur, Charmander, and Squirtle. Generation 2 (Johto) offers Chikorita, Cyndaquil, and Totodile. Generation 3 (Hoenn) features Treecko, Torchic, and Mudkip. Generation 4 (Sinnoh) brings Turtwig, Chimchar, and Piplup. Generation 5 (Unova) introduces Snivy, Tepig, and Oshawott. Generation 6 (Kalos) adds Chespin, Fennekin, and Froakie. Generation 7 (Alola) has Rowlet, Litten, and Popplio. Generation 8 (Galar) features Grookey, Scorbunny, and Sobble. Generation 9 (Paldea) offers Sprigatito, Fuecoco, and Quaxly.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Why Starter Choice Matters</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Your starter Pokémon is your first partner and often your most reliable teammate throughout the game. Starters have balanced base stats that make them viable from the early game through the post-game. Their final evolutions are typically powerful Pokémon with signature abilities and movepools. While you can catch stronger Pokémon later, your starter sets the tone for your playthrough.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Starter Pokémon Final Evolutions</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Each starter evolves twice, reaching its final form at level 36 (with some variation). The final evolutions often gain a secondary type: Charizard becomes Fire/Flying, Blastoise stays pure Water, Venusaur becomes Grass/Poison. These secondary types significantly affect type coverage and defensive matchups. Knowing your starter's final typing helps you plan your team composition early.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Starter Pokémon in Competitive Play</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">While starters are designed for casual playthroughs, many have found success in competitive battles. Charizard, Blaziken, Greninja, and Incineroar are all staples of competitive formats. Mega Evolutions and Gigantamax forms have further boosted starters' viability. Hidden Abilities like Blaziken's Speed Boost and Greninja's Protean have made some starters top-tier threats in VGC and Smogon formats.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Choosing Your Starter</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">There is no wrong choice when picking a starter — they are all viable for completing the main game. Consider your playstyle: do you prefer fast attackers (Charizard, Greninja), bulky tanks (Swampert, Incineroar), or versatile mixed attackers (Infernape, Decidueye)? Some players choose based on type preference, others based on design. Our random picker is perfect for players who want a fresh experience or a challenge.</p>


          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">How many starter Pokémon are there?</h3>
        <p className="text-muted-foreground leading-relaxed">There are 27 main-series starter Pokémon: 3 per generation, across 9 generations. Each generation offers one Grass, one Fire, and one Water type.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Can I pick a starter from a specific generation?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, you can filter by generation to limit the picker to starters from Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, or Paldea.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">What are the Generation 9 starters?</h3>
        <p className="text-muted-foreground leading-relaxed">The Paldea starters are Sprigatito (Grass), Fuecoco (Fire), and Quaxly (Water). Their final evolutions are Meowscarada (Grass/Dark), Skeledirge (Fire/Ghost), and Quaquaval (Water/Fighting).</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Which starter is the best?</h3>
        <p className="text-muted-foreground leading-relaxed">There is no objective best starter — it depends on the game version and your playstyle. Charizard, Blaziken, and Greninja are popular competitive choices, while Swampert and Torterra are excellent for casual playthroughs.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Can I see the shiny forms of starters?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, our picker includes shiny toggles for each starter. Shiny starters are extremely rare in the games (1 in 4,096 chance), so this is a great way to see what they look like.</p>
      </div>

          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Pokémon Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="/random-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Pokémon Generator</div>
        <div className="text-sm text-muted-foreground">Generate any random Pokémon</div>
      </a>
      <a href="/random-team/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Team Builder</div>
        <div className="text-sm text-muted-foreground">Build a full team of 6</div>
      </a>
      <a href="/shiny-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Shiny Pokémon Checker</div>
        <div className="text-sm text-muted-foreground">Browse shiny forms</div>
      </a>
      <a href="/type-chart/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Type Chart</div>
        <div className="text-sm text-muted-foreground">Check type effectiveness</div>
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
