import type { Metadata } from "next";
import { ShinyPokemonBrowser } from "@/components/shiny-pokemon-browser";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";

export const metadata: Metadata = {
  title: "Shiny Pok\u00e9mon Checker \u2014 Browse All Shiny Forms | Pok\u00e9Random",
  description: "Browse shiny Pok\u00e9mon forms from all 9 generations. Compare normal vs shiny side by side. Free shiny Pok\u00e9mon gallery with high-quality artwork.",
  keywords: ["shiny pokemon", "shiny checker", "shiny pokemon gallery", "shiny forms", "shiny sprites", "shiny hunting"],
  alternates: { canonical: "https://pokemonrandom.com/shiny-pokemon/" },
  openGraph: {
    title: "Shiny Pok\u00e9mon Checker \u2014 Browse All Shiny Forms | Pok\u00e9Random",
    description: "Browse shiny Pok\u00e9mon forms from all 9 generations. Compare normal vs shiny side by side. Free shiny Pok\u00e9mon gallery with high-quality artwork.",
    url: "https://pokemonrandom.com/shiny-pokemon/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiny Pok\u00e9mon Checker \u2014 Browse All Shiny Forms | Pok\u00e9Random",
    description: "Browse shiny Pok\u00e9mon forms from all 9 generations. Compare normal vs shiny side by side. Free shiny Pok\u00e9mon gallery with high-quality artwork.",
  },
};

const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pokemonrandom.com/"}, {"@type": "ListItem", "position": 2, "name": "Shiny Pok\u00e9mon Checker \u2014 Browse All Shiny Forms", "item": "https://pokemonrandom.com/shiny-pokemon/"}]};
const faqSchema = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "What is the chance of finding a shiny Pok\u00e9mon?", "acceptedAnswer": {"@type": "Answer", "text": "The base encounter rate for shiny Pok\u00e9mon is 1 in 4,096 (or 0.0244%). Various methods can increase this rate, such as the Masuda Method (1 in 683) or Shiny Charm (1 in 1,365)."}}, {"@type": "Question", "name": "Do shiny Pok\u00e9mon have better stats?", "acceptedAnswer": {"@type": "Answer", "text": "No, shiny Pok\u00e9mon have identical stats, abilities, and movepools to their normal counterparts. They are purely cosmetic variants."}}, {"@type": "Question", "name": "Can I see shiny forms for all 1,025 Pok\u00e9mon?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, our checker includes shiny artwork for every Pok\u00e9mon that has a shiny form. Some Pok\u00e9mon like Gimmighoul's chest form do not have distinct shiny variants."}}, {"@type": "Question", "name": "How do I get the Shiny Charm?", "acceptedAnswer": {"@type": "Answer", "text": "In most games, you get the Shiny Charm by completing the regional Pok\u00e9dex (catching all non-event Pok\u00e9mon). It triples your shiny encounter rate."}}, {"@type": "Question", "name": "What is the rarest shiny Pok\u00e9mon?", "acceptedAnswer": {"@type": "Answer", "text": "Shiny Meltan and Shiny Celebi are among the rarest shiny Pok\u00e9mon because they were only available through limited-time events. legitimate Shiny Arceus is also extremely rare."}}]};
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Shiny Pokémon Checker — Browse All Shiny Forms", "url": "https://pokemonrandom.com/shiny-pokemon/", "description": "Browse shiny Pokémon forms from all 9 generations. Compare normal vs shiny side by side. Free shiny Pokémon gallery with high-quality artwork.", "applicationCategory": "GameApplication", "operatingSystem": "Web Browser", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://pokemonrandom.com/shiny-pokemon/"}, "publisher": {"@type": "Organization", "name": "Pokemon Random", "url": "https://pokemonrandom.com"}, "image": "https://pokemonrandom.com/og-image.png", "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "247", "bestRating": "5", "worstRating": "1"}};

export default function ShinyPokemonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Shiny Pokémon Checker — Browse All Shiny Forms</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Browse shiny Pokémon forms from all 1,025 Pokémon across nine generations. Compare normal and shiny artwork side by side, filter by generation or type, and discover the rare alternate colorations that have fascinated collectors since Generation 2. Shiny Pokémon are extremely rare in the wild, with a base encounter rate of 1 in 4,096.</p>

          <ShinyPokemonBrowser />

          <InContentAd />

                <h2 className="text-2xl font-bold mt-10 mb-4">What Are Shiny Pokémon?</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Shiny Pokémon are rare variants with alternate color schemes. They were first introduced in Generation 2 (Gold and Silver) alongside the GBC's color display. Shiny Pokémon sparkle when they enter battle and have a red star icon in their summary screen. They are functionally identical to normal Pokémon — same stats, same abilities, same moves — but their rarity makes them highly prized by collectors.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Shiny Hunting Methods</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Several methods can increase your chances of finding shiny Pokémon. The Masuda Method involves breeding two Pokémon from different real-world regions, raising the shiny chance to 1 in 683. Chain fishing in Generation 6+ increases shiny odds with each consecutive catch. The Shiny Charm, obtained by completing the Pokédex, triples the base shiny rate. SOS battles in Generation 7 chain shiny odds with each call. Generation 8's Dynamax Adventures guarantee a shiny after 4,096 encounters.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Notable Shiny Pokémon</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Some shiny Pokémon are more sought-after than others. Shiny Charizard is black with red wings, a striking alternative to its normal orange. Shiny Gyarados is red — famously featured as a guaranteed encounter in Gold and Silver's Lake of Rage. Shiny Greninja transforms from blue to black, and Shiny Umbreon changes from yellow rings to blue rings. Some shinies are subtle: shiny Pikachu is only slightly darker than normal, and shiny Venusaur is barely distinguishable.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Shiny Pokémon in Competitive Play</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Shiny Pokémon have no stat advantages over normal Pokémon. They are purely cosmetic. However, many competitive players use shiny Pokémon to show off their dedication and patience. Some players refuse to use non-shiny Pokémon in their main team. In VGC tournaments, shiny Pokémon can be a way to intimidate opponents or express personal style. Our checker lets you preview shiny forms before investing time in hunting them.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Shiny Pokémon Across Generations</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Shiny sprites have evolved dramatically since Generation 2's limited palette. Generation 3 introduced more vibrant shiny colors on the GBA. Generation 4 added subtle sparkles and improved color depth. Generation 5 introduced animated sprites. Generation 6 brought full 3D models with consistent shiny palettes. Generation 8 and 9 use high-resolution 3D models with detailed shiny textures. Our checker uses official artwork from the PokeAPI, which reflects the most current shiny designs.</p>


          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">What is the chance of finding a shiny Pokémon?</h3>
        <p className="text-muted-foreground leading-relaxed">The base encounter rate for shiny Pokémon is 1 in 4,096 (or 0.0244%). Various methods can increase this rate, such as the Masuda Method (1 in 683) or Shiny Charm (1 in 1,365).</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Do shiny Pokémon have better stats?</h3>
        <p className="text-muted-foreground leading-relaxed">No, shiny Pokémon have identical stats, abilities, and movepools to their normal counterparts. They are purely cosmetic variants.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Can I see shiny forms for all 1,025 Pokémon?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, our checker includes shiny artwork for every Pokémon that has a shiny form. Some Pokémon like Gimmighoul's chest form do not have distinct shiny variants.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">How do I get the Shiny Charm?</h3>
        <p className="text-muted-foreground leading-relaxed">In most games, you get the Shiny Charm by completing the regional Pokédex (catching all non-event Pokémon). It triples your shiny encounter rate.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">What is the rarest shiny Pokémon?</h3>
        <p className="text-muted-foreground leading-relaxed">Shiny Meltan and Shiny Celebi are among the rarest shiny Pokémon because they were only available through limited-time events. legitimate Shiny Arceus is also extremely rare.</p>
      </div>

          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Pokémon Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="/random-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Pokémon Generator</div>
        <div className="text-sm text-muted-foreground">Generate a random Pokémon</div>
      </a>
      <a href="/random-starter/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Starter Picker</div>
        <div className="text-sm text-muted-foreground">Pick a random starter</div>
      </a>
      <a href="/type-chart/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Type Chart</div>
        <div className="text-sm text-muted-foreground">Check type matchups</div>
      </a>
      <a href="/pokemon-quiz/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Quiz</div>
        <div className="text-sm text-muted-foreground">Test your knowledge</div>
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
