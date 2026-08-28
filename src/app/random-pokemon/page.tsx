import type { Metadata } from "next";
import { RandomPokemonGenerator } from "@/components/random-pokemon-generator";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";

export const metadata: Metadata = {
  title: "Random Pok\u00e9mon Generator \u2014 Free Online Tool | Pok\u00e9Random",
  description: "Generate random Pok\u00e9mon instantly. Filter by generation, type, or rarity. Free online random Pok\u00e9mon generator with high-quality artwork. No login required.",
  keywords: ["random pokemon generator", "generate random pokemon", "pokemon generator online", "free pokemon generator", "random pokemon picker"],
  alternates: { canonical: "https://pokemonrandom.com/random-pokemon/" },
  openGraph: {
    title: "Random Pok\u00e9mon Generator \u2014 Free Online Tool | Pok\u00e9Random",
    description: "Generate random Pok\u00e9mon instantly. Filter by generation, type, or rarity. Free online random Pok\u00e9mon generator with high-quality artwork. No login required.",
    url: "https://pokemonrandom.com/random-pokemon/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Pok\u00e9mon Generator \u2014 Free Online Tool | Pok\u00e9Random",
    description: "Generate random Pok\u00e9mon instantly. Filter by generation, type, or rarity. Free online random Pok\u00e9mon generator with high-quality artwork. No login required.",
  },
};

const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pokemonrandom.com/"}, {"@type": "ListItem", "position": 2, "name": "Random Pok\u00e9mon Generator", "item": "https://pokemonrandom.com/random-pokemon/"}]};
const faqSchema = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How many Pok\u00e9mon can I generate?", "acceptedAnswer": {"@type": "Answer", "text": "Our tool includes all 1,025 Pok\u00e9mon from Generation 1 through Generation 9. You can generate any of them at random, or filter by generation, type, or rarity to narrow down your results."}}, {"@type": "Question", "name": "Is this random Pok\u00e9mon generator free to use?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, completely free. No login, no signup, no payment required. You can generate as many Pok\u00e9mon as you want, as often as you want."}}, {"@type": "Question", "name": "Can I generate shiny Pok\u00e9mon?", "acceptedAnswer": {"@type": "Answer", "text": "Yes! Each generated Pok\u00e9mon has a toggle to switch between its normal and shiny form. Shiny Pok\u00e9mon are rare alternate colorations that are highly sought after by collectors."}}, {"@type": "Question", "name": "Does the generator work on mobile?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, our tool is fully responsive and works perfectly on smartphones, tablets, and desktops. The interface adapts to your screen size for the best experience."}}, {"@type": "Question", "name": "Where does the Pok\u00e9mon data come from?", "acceptedAnswer": {"@type": "Answer", "text": "We use the official Pok\u00e9API, a community-maintained REST API that provides accurate data about every Pok\u00e9mon, including stats, abilities, types, and official artwork."}}]};
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Random Pokémon Generator", "url": "https://pokemonrandom.com/random-pokemon/", "description": "Generate random Pokémon instantly. Filter by generation, type, or rarity. Free online random Pokémon generator with high-quality artwork. No login required.", "applicationCategory": "GameApplication", "operatingSystem": "Web Browser", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://pokemonrandom.com/random-pokemon/"}, "publisher": {"@type": "Organization", "name": "Pokemon Random", "url": "https://pokemonrandom.com"}, "image": "https://pokemonrandom.com/og-image.png", "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "247", "bestRating": "5", "worstRating": "1"}};

export default function RandomPokemonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Random Pokémon Generator</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Generate random Pokémon instantly with our free online tool. Filter by generation, type, or rarity to discover Pokémon you have never used before. Our random Pokémon generator pulls real-time data from the PokéAPI to give you accurate information about every Pokémon, including base stats, abilities, types, and official artwork.</p>

          <RandomPokemonGenerator />

          <InContentAd />

                <h2 className="text-2xl font-bold mt-10 mb-4">How to Use the Random Pokémon Generator</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Using our random Pokémon generator is simple and intuitive. Click the Generate button to get a random Pokémon instantly. You can narrow down your results by selecting specific generations from Gen 1 Kanto to Gen 9 Paldea, or by choosing a specific type like Fire, Water, Grass, Electric, Psychic, Fighting, Dark, Steel, Dragon, or Fairy. Each generated Pokémon comes with its full stat block, including HP, Attack, Defense, Special Attack, Special Defense, and Speed, along with abilities and type effectiveness.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">All 1,025 Pokémon Across 9 Generations</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Our generator includes every Pokémon from all nine generations of the franchise. Whether you are feeling nostalgic for the original 151 Kanto Pokémon from Generation 1, exploring the 100 new creatures in Generation 2 Johto, braving the 135 Pokémon in Generation 3 Hoenn, or discovering the 156 Pokémon in Generation 5 Unova, our tool covers them all. Generation 6 Kalos introduced 72 new Pokémon and the Fairy type. Generation 7 Alola added 88 new Pokémon and regional variants. Generation 8 Galar brought 89 new Pokémon and Dynamax forms. Generation 9 Paldea added 110 new Pokémon and Terastallize.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Filter by Pokémon Type</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Pokémon types determine strengths and weaknesses in battle. There are 18 different Pokémon types: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, and Fairy. Our generator lets you filter by type, so you can generate a random Fire-type Pokémon, a random Water-type, or any other type you are interested in. You can also filter by dual types to find Pokémon with specific type combinations, like Fire/Flying or Water/Dragon.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Why Use a Random Pokémon Generator?</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Random Pokémon generators have become essential tools for Pokémon fans, content creators, and competitive players. They are perfect for Nuzlocke challenges, where the rules state you may only catch the first Pokémon you encounter on each route. They help build balanced teams for casual playthroughs or competitive battles. They inspire creativity by introducing you to Pokémon you might never have considered using. They are also great for educational purposes, helping new players learn about the vast world of Pokémon.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Pokémon Stats and Abilities Explained</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Every Pokémon has six base stats that define its battle capabilities: HP (Hit Points) determines how much damage a Pokémon can take before fainting. Attack determines the power of physical moves like Tackle and Earthquake. Defense reduces damage from physical attacks. Special Attack determines the power of special moves like Flamethrower and Psychic. Special Defense reduces damage from special attacks. Speed determines which Pokémon moves first in battle. Our generator displays all six stats with color-coded progress bars, along with abilities that can turn the tide of battle.</p>


          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">How many Pokémon can I generate?</h3>
        <p className="text-muted-foreground leading-relaxed">Our tool includes all 1,025 Pokémon from Generation 1 through Generation 9. You can generate any of them at random, or filter by generation, type, or rarity to narrow down your results.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Is this random Pokémon generator free to use?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, completely free. No login, no signup, no payment required. You can generate as many Pokémon as you want, as often as you want.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Can I generate shiny Pokémon?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes! Each generated Pokémon has a toggle to switch between its normal and shiny form. Shiny Pokémon are rare alternate colorations that are highly sought after by collectors.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Does the generator work on mobile?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, our tool is fully responsive and works perfectly on smartphones, tablets, and desktops. The interface adapts to your screen size for the best experience.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Where does the Pokémon data come from?</h3>
        <p className="text-muted-foreground leading-relaxed">We use the official PokéAPI, a community-maintained REST API that provides accurate data about every Pokémon, including stats, abilities, types, and official artwork.</p>
      </div>

          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Pokémon Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="/random-team/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Team Builder</div>
        <div className="text-sm text-muted-foreground">Generate a balanced team of 6 random Pokémon</div>
      </a>
      <a href="/pokemon-randomizer/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Randomizer</div>
        <div className="text-sm text-muted-foreground">Advanced filters for Nuzlocke challenges</div>
      </a>
      <a href="/shiny-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Shiny Pokémon Checker</div>
        <div className="text-sm text-muted-foreground">Browse all shiny Pokémon forms</div>
      </a>
      <a href="/type-chart/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Type Chart</div>
        <div className="text-sm text-muted-foreground">Full 18x18 type effectiveness matrix</div>
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
