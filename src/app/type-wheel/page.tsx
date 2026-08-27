import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { PokemonTypeWheel } from "@/components/pokemon-type-wheel";


export const metadata: Metadata = {
  title: "Pok\u00e9mon Type Wheel Spinner \u2014 Random Type Generator | Pok\u00e9Random",
  description: "Spin the wheel to get a random Pok\u00e9mon type! Free interactive type wheel with all 18 Pok\u00e9mon types. Perfect for challenges and team building themes.",
  keywords: ["pokemon type wheel", "type wheel spinner", "random type generator", "pokemon type spinner", "type roulette"],
  alternates: { canonical: "https://pokemonrandom.com/type-wheel/" },
  openGraph: {
    title: "Pok\u00e9mon Type Wheel Spinner \u2014 Random Type Generator | Pok\u00e9Random",
    description: "Spin the wheel to get a random Pok\u00e9mon type! Free interactive type wheel with all 18 Pok\u00e9mon types. Perfect for challenges and team building themes.",
    url: "https://pokemonrandom.com/type-wheel/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pok\u00e9mon Type Wheel Spinner \u2014 Random Type Generator | Pok\u00e9Random",
    description: "Spin the wheel to get a random Pok\u00e9mon type! Free interactive type wheel with all 18 Pok\u00e9mon types. Perfect for challenges and team building themes.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Pok\u00e9mon Type Wheel Spinner", item: "https://pokemonrandom.com/type-wheel/" },
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
            <span className="text-foreground">Pokémon Type Wheel Spinner</span>
          </nav>


          <h1 className="text-4xl font-bold tracking-tight mb-4">Pokémon Type Wheel Spinner</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Spin the wheel to get a random Pokémon type! Each of the 18 types has
            an equal chance of being selected. Perfect for challenges, team building
            themes, or just for fun. See example Pokémon of the selected type.
          </p>

          <PokemonTypeWheel />

          <InContentAd />

          <section className="mt-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>How the Type Wheel Works</h2>
            <p>
              Our Pokémon Type Wheel is an interactive SVG-based spinner that randomly
              selects one of the 18 Pokémon types: Normal, Fire, Water, Grass, Electric,
              Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon,
              Dark, Steel, and Fairy. Each type has an equal 1 in 18 chance of being
              selected on each spin.
            </p>
            <p>
              After the wheel lands on a type, we display several example Pokémon of that
              type, drawn from all nine generations. This is a fun way to discover new
              Pokémon or to add randomness to your gameplay. Many players use the type
              wheel for challenge runs, where they must build a team using only Pokémon
              of the spun type.
            </p>
            <p>
              The wheel also keeps a history of your previous spins, so you can review
              which types you&rsquo;ve landed on. Use the wheel alongside our{" "}
              <Link href="/type-chart/" className="text-primary">Type Chart</Link>{" "}
              to learn about each type&rsquo;s strengths and weaknesses, and visit our{" "}
              <Link href="/random-pokemon/" className="text-primary">Random Pokémon Generator</Link>{" "}
              to filter by the spun type.
            </p>
          </section>

          <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <Link href="/random-pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Random Pokémon</div>
                <div className="text-muted-foreground">Generate by type</div>
              </Link>
              <Link href="/type-chart/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Type Chart</div>
                <div className="text-muted-foreground">All 18 types</div>
              </Link>
              <Link href="/pokemon-quiz/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Pokémon Quiz</div>
                <div className="text-muted-foreground">Test your knowledge</div>
              </Link>
            </div>
          </section>


        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
