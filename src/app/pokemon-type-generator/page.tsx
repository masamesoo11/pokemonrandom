import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { PokemonTypeGenerator } from "@/components/pokemon-type-generator";

export const metadata: Metadata = {
  title: "Random Pokémon Type Generator — Free Tool (18 Types)",
  description: "Generate a random Pokémon type instantly. See type strengths and weaknesses. Free online random Pokémon type generator with all 18 types. No signup required.",
  keywords: ["random pokemon type generator", "pokemon type generator", "random type generator", "pokemon type randomizer", "pokemon type picker"],
  alternates: { canonical: "https://pokemonrandom.com/pokemon-type-generator/" },
  openGraph: {
    title: "Random Pokémon Type Generator — Free Tool (18 Types)",
    description: "Generate a random Pokémon type instantly. See type strengths and weaknesses. Free online random Pokémon type generator.",
    url: "https://pokemonrandom.com/pokemon-type-generator/",
    images: [{ url: "https://pokemonrandom.com/og-image.png", width: 1200, height: 630, alt: "Random Pokémon Type Generator" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Pokémon Type Generator — Free Tool (18 Types)",
    description: "Generate a random Pokémon type instantly. See type strengths and weaknesses.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Random Pokémon Type Generator", item: "https://pokemonrandom.com/pokemon-type-generator/" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many Pokémon types are there?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are 18 Pokémon types in total: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, and Fairy. The Fairy type was introduced in Generation 6.",
      },
    },
    {
      "@type": "Question",
      name: "Can the generator produce dual-type combinations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our random type generator has a 50% chance of producing a single-type Pokémon and a 50% chance of producing a dual-type combination. This mirrors how the official Pokémon games distribute types.",
      },
    },
    {
      "@type": "Question",
      name: "What is the rarest Pokémon type?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ice and Steel are among the rarest types, with the fewest Pokémon of those types in the Pokédex. Ghost and Dragon are also relatively rare compared to Water, Normal, and Bug which have the most representatives.",
      },
    },
    {
      "@type": "Question",
      name: "Is this random type generator free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free. No login, no signup, no payment required. Generate as many random types as you want, as often as you want.",
      },
    },
  ],
};

export default function PokemonTypeGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-8">
          <header className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Random Pokémon Type Generator</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Generate a random Pokémon type with one click. See type strengths, weaknesses, and dual-type combinations. Perfect for building themed teams, Nuzlocke challenges, or learning type effectiveness. Covers all 18 Pokémon types.
            </p>
          </header>

          <PokemonTypeGenerator />

          <InContentAd />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">How the Random Type Generator Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              The random Pokémon type generator uses a uniform distribution across all 18 types. When you click Generate, the tool picks a random primary type from the full list. There is also a 50% chance it will pick a secondary type, creating a dual-type combination. Dual types are common in the Pokémon games — for example, Charizard is Fire/Flying, Bulbasaur is Grass/Poison, and Gengar is Ghost/Poison. The generator mirrors this distribution so you get realistic type combinations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              After generating a type, you will see a panel showing the strengths (which types this type is super effective against) and weaknesses (which types hit this type super effectively). Use this information to plan your team composition or to learn type effectiveness for battles. You can also click through to the full type page to see all Pokémon of that type.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">All 18 Pokémon Types</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Pokémon type system has 18 types total. Each type has its own strengths, weaknesses, immunities, and resistances. Below is the complete list, with each type linked to its full roster page:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison",
                "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark",
                "Steel", "Fairy",
              ].map((type) => (
                <Link
                  key={type}
                  href={`/type/${type.toLowerCase()}/`}
                  className="block p-3 rounded-lg border border-border hover:border-primary transition-colors text-center"
                >
                  <div className="font-semibold">{type}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Why Use a Random Type Generator?</h2>
            <p className="text-muted-foreground leading-relaxed">
              A random type generator is useful in several Pokémon scenarios. For Nuzlocke challenges, you can use it to restrict your team to a single type or to randomly select the type of Pokémon you are allowed to catch on each route. For team building, you can generate a random type and then build a team around that type. For content creators and streamers, the random type generator provides an engaging way to interact with your audience — let chat pick the seed and build a team around the result.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The generator is also a learning tool. If you are new to Pokémon, generating random types and studying their strengths and weaknesses is a fast way to internalize the type chart. Each generation shows you which types are super effective against the generated type, and which types the generated type is weak to — this is the foundation of competitive Pokémon battling.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Related Pokémon Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/random-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Random Pokémon Generator</div>
                <div className="text-sm text-muted-foreground">Generate a random Pokémon by name, not just type</div>
              </Link>
              <Link href="/type-chart/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Full Type Chart</div>
                <div className="text-sm text-muted-foreground">Complete type effectiveness matrix</div>
              </Link>
              <Link href="/random-team/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Random Team Builder</div>
                <div className="text-sm text-muted-foreground">Generate a balanced team of 6 Pokémon</div>
              </Link>
              <Link href="/pokemon-database/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Pokémon Database</div>
                <div className="text-sm text-muted-foreground">Browse all 1,025 Pokémon by generation or type</div>
              </Link>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-border pb-4">
                <h3 className="font-semibold text-lg mb-2">How many Pokémon types are there?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  There are 18 Pokémon types in total: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, and Fairy. The Fairy type was introduced in Generation 6 (Pokémon X and Y) to balance the type chart.
                </p>
              </div>
              <div className="border-b border-border pb-4">
                <h3 className="font-semibold text-lg mb-2">Can the generator produce dual-type combinations?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes. Our random type generator has a 50% chance of producing a single-type Pokémon and a 50% chance of producing a dual-type combination. This mirrors how the official Pokémon games distribute types.
                </p>
              </div>
              <div className="border-b border-border pb-4">
                <h3 className="font-semibold text-lg mb-2">What is the rarest Pokémon type?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ice and Steel are among the rarest types, with the fewest Pokémon of those types in the Pokédex. Ghost and Dragon are also relatively rare compared to Water, Normal, and Bug which have the most representatives.
                </p>
              </div>
              <div className="border-b border-border pb-4">
                <h3 className="font-semibold text-lg mb-2">Is this random type generator free to use?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes, completely free. No login, no signup, no payment required. Generate as many random types as you want, as often as you want.
                </p>
              </div>
            </div>
          </section>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
