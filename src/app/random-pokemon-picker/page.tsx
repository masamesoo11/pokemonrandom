import type { Metadata } from "next";
import { RandomPokemonPicker } from "@/components/random-pokemon-picker";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";

export const metadata: Metadata = {
  title: "Random Pok\u00e9mon Picker \u2014 Quick One-Click Decision | Pok\u00e9Random",
  description: "Quick one-click random Pok\u00e9mon picker. No filters, no setup \u2014 just click and get a random Pok\u00e9mon. Perfect for quick decisions and casual fun.",
  keywords: ["random pokemon picker", "pick a random pokemon", "pokemon picker", "random pokemon selector", "quick pokemon picker"],
  alternates: { canonical: "https://pokemonrandom.com/random-pokemon-picker/" },
  openGraph: {
    title: "Random Pok\u00e9mon Picker \u2014 Quick One-Click Decision | Pok\u00e9Random",
    description: "Quick one-click random Pok\u00e9mon picker. No filters, no setup \u2014 just click and get a random Pok\u00e9mon. Perfect for quick decisions and casual fun.",
    url: "https://pokemonrandom.com/random-pokemon-picker/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Pok\u00e9mon Picker \u2014 Quick One-Click Decision | Pok\u00e9Random",
    description: "Quick one-click random Pok\u00e9mon picker. No filters, no setup \u2014 just click and get a random Pok\u00e9mon. Perfect for quick decisions and casual fun.",
  },
};

const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pokemonrandom.com/"}, {"@type": "ListItem", "position": 2, "name": "Random Pok\u00e9mon Picker \u2014 Quick Decision Tool", "item": "https://pokemonrandom.com/random-pokemon-picker/"}]};
const faqSchema = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is the picker truly random?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, we use JavaScript's Math.random() function, which provides a uniform distribution across all 1,025 Pok\u00e9mon IDs. Every Pok\u00e9mon has an equal 1 in 1,025 chance of being selected."}}, {"@type": "Question", "name": "Can I get the same Pok\u00e9mon twice in a row?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, since each pick is independent, it is possible (though unlikely) to get the same Pok\u00e9mon twice in a row. The probability is 1 in 1,025 (about 0.1%)."}}, {"@type": "Question", "name": "Does the picker include legendary Pok\u00e9mon?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, all legendary and mythical Pok\u00e9mon are included in the picker pool. If you want to exclude them, use our advanced Pok\u00e9mon Randomizer instead."}}, {"@type": "Question", "name": "How fast is the picker?", "acceptedAnswer": {"@type": "Answer", "text": "Very fast. After the initial page load, each pick is nearly instant because we cache the Pok\u00e9mon data. You can generate dozens of Pok\u00e9mon per minute without any delays."}}, {"@type": "Question", "name": "Can I use the picker on mobile?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, the picker is fully responsive and works perfectly on phones, tablets, and desktops. The button is large enough to tap easily on touchscreens."}}]};
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Random Pokémon Picker — Quick Decision Tool", "url": "https://pokemonrandom.com/random-pokemon-picker/", "description": "Quick one-click random Pokémon picker. No filters, no setup — just click and get a random Pokémon. Perfect for quick decisions and casual fun.", "applicationCategory": "GameApplication", "operatingSystem": "Web Browser", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://pokemonrandom.com/random-pokemon-picker/"}, "publisher": {"@type": "Organization", "name": "Pokemon Random", "url": "https://pokemonrandom.com"}, "image": "https://pokemonrandom.com/og-image.png", "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "247", "bestRating": "5", "worstRating": "1"}};

export default function RandomPokemonPickerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Random Pokémon Picker — Quick Decision Tool</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">A simple, fast, one-click random Pokémon picker. No filters, no setup, no configuration — just click the button and get a random Pokémon from all 1,025 creatures across nine generations. Perfect for quick decisions, casual fun, or when you just want to discover a Pokémon you have never seen before.</p>

          <RandomPokemonPicker />

          <InContentAd />

                <h2 className="text-2xl font-bold mt-10 mb-4">When to Use a Quick Picker</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Our random Pokémon picker is designed for moments when you need a fast, no-fuss decision. Use it to choose which Pokémon to draw, which one to research next, which one to add to your collection, or which one to play with in a fan game. Unlike our advanced randomizer, this tool skips the configuration step and just gives you a result instantly.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">All 1,025 Pokémon Included</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">The picker draws from the complete National Pokédex, including every Pokémon from Generation 1 Kanto through Generation 9 Paldea. You might get a classic like Pikachu or Charizard, or you might discover a lesser-known Pokémon like Tinkaton or Ceruledge. Every Pokémon has an equal chance of being selected, ensuring true randomness.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">How Is This Different From the Generator?</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Our main Random Pokémon Generator offers filters for generation, type, and rarity. The Picker skips those options for maximum speed. Use the Generator when you want specific criteria; use the Picker when you want pure randomness. Both tools pull from the same complete Pokédex and use the same official artwork from the PokeAPI.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Random Selection Algorithm</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Our picker uses the Math.random() function in JavaScript, which produces a uniform distribution across the entire range of 1,025 Pokémon IDs. Each click generates a new random ID, fetches the corresponding Pokémon from the cached Pokédex, and displays it with full stats, type, abilities, and artwork. The algorithm ensures no Pokémon is more likely than any other.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Fun Ways to Use the Picker</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Use the picker to challenge yourself: generate a random Pokémon and try to draw it from memory. Use it to pick a Pokémon for a fan fiction story. Use it to choose which shiny to hunt next. Use it to pick a Pokémon for a tabletop Pokémon RPG. Use it to decide which Pokémon to feature in a YouTube video or blog post. The possibilities are endless.</p>


          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Is the picker truly random?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, we use JavaScript's Math.random() function, which provides a uniform distribution across all 1,025 Pokémon IDs. Every Pokémon has an equal 1 in 1,025 chance of being selected.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Can I get the same Pokémon twice in a row?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, since each pick is independent, it is possible (though unlikely) to get the same Pokémon twice in a row. The probability is 1 in 1,025 (about 0.1%).</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Does the picker include legendary Pokémon?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, all legendary and mythical Pokémon are included in the picker pool. If you want to exclude them, use our advanced Pokémon Randomizer instead.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">How fast is the picker?</h3>
        <p className="text-muted-foreground leading-relaxed">Very fast. After the initial page load, each pick is nearly instant because we cache the Pokémon data. You can generate dozens of Pokémon per minute without any delays.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Can I use the picker on mobile?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, the picker is fully responsive and works perfectly on phones, tablets, and desktops. The button is large enough to tap easily on touchscreens.</p>
      </div>

          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Pokémon Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="/random-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Pokémon Generator</div>
        <div className="text-sm text-muted-foreground">Generate with filters</div>
      </a>
      <a href="/pokemon-randomizer/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Randomizer</div>
        <div className="text-sm text-muted-foreground">Advanced multi-filter randomizer</div>
      </a>
      <a href="/random-team/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Team Builder</div>
        <div className="text-sm text-muted-foreground">Generate a full team</div>
      </a>
      <a href="/random-starter/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Starter Picker</div>
        <div className="text-sm text-muted-foreground">Pick a random starter</div>
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
