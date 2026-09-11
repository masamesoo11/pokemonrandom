import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";

export const metadata: Metadata = {
  title: "Shiny Odds Calculator 2026 — Pokémon Shiny Probability",
  description: "Calculate shiny Pokémon encounter odds with our free shiny odds calculator. Base odds, Masuda Method, Shiny Charm, and chain fishing rates for every generation. Free, no signup.",
  keywords: [
    "shiny odds calculator",
    "shiny calculator",
    "shiny pokemon odds",
    "shiny probability",
    "masuda method odds",
    "shiny charm odds",
    "shiny hunting calculator",
    "pokemon shiny rate",
  ],
  alternates: { canonical: "https://pokemonrandom.com/shiny-odds-calculator/" },
  openGraph: {
    title: "Shiny Odds Calculator 2026 — Pokémon Shiny Probability",
    description: "Calculate shiny Pokémon encounter odds. Base odds, Masuda Method, Shiny Charm, chain fishing rates for every generation.",
    url: "https://pokemonrandom.com/shiny-odds-calculator/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiny Odds Calculator 2026 — Pokémon Shiny Probability",
    description: "Calculate shiny Pokémon encounter odds. Free, no signup.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Shiny Odds Calculator", item: "https://pokemonrandom.com/shiny-odds-calculator/" },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Shiny Odds Calculator",
  url: "https://pokemonrandom.com/shiny-odds-calculator/",
  description: "Calculate shiny Pokémon encounter odds with Masuda Method, Shiny Charm, and chain methods.",
  applicationCategory: "GameApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the base odds of finding a shiny Pokémon?",
      acceptedAnswer: { "@type": "Answer", text: "The base odds of finding a shiny Pokémon are 1 in 4,096 (0.0244%) in most games from Generation 6 onward. In Generations 2-5, the odds were 1 in 8,192." },
    },
    {
      "@type": "Question",
      name: "How does the Masuda Method improve shiny odds?",
      acceptedAnswer: { "@type": "Answer", text: "The Masuda Method involves breeding two Pokémon from different language games. It increases shiny odds to 1 in 1,365 (1,024 with Shiny Charm) in Generation 6+." },
    },
    {
      "@type": "Question",
      name: "What does the Shiny Charm do?",
      acceptedAnswer: { "@type": "Answer", text: "The Shiny Charm is a key item obtained by completing the Pokédex. It further increases shiny odds by approximately 2x when combined with other methods." },
    },
    {
      "@type": "Question",
      name: "How do chain fishing shiny odds work?",
      acceptedAnswer: { "@type": "Answer", text: "Chain fishing in Generation 6 increases shiny odds with each consecutive catch. At 20+ chain, the odds reach approximately 1 in 100. Use a Pokémon with Suction Cups to prevent fishing rod pulls." },
    },
  ],
};

const SHINY_METHODS = [
  { method: "Base Rate (Gen 6+)", base: 4096, charm: 1365, details: "Standard wild encounters in Generation 6 and later." },
  { method: "Base Rate (Gen 2-5)", base: 8192, charm: 2731, details: "Standard wild encounters in Generations 2 through 5." },
  { method: "Masuda Method", base: 683, charm: 512, details: "Breed two Pokémon from different language games." },
  { method: "Chain Fishing (Gen 6)", base: 200, charm: 200, details: "Fish consecutively without moving. 20+ chain for best odds." },
  { method: "SOS Battles (Gen 7)", base: 1024, charm: 683, details: "Chain SOS calls in Sun/Moon/Ultra Sun/Ultra Moon." },
  { method: "Dex Nav (Gen 6)", base: 512, charm: 512, details: "Search for Pokémon using the Dex Nav feature in ORAS." },
  { method: "Max Raid (Gen 8)", base: 2048, charm: 1024, details: "Max Raid Battles in Sword and Shield." },
  { method: "Tera Raid (Gen 9)", base: 2048, charm: 1024, details: "Tera Raid Battles in Scarlet and Violet." },
  { method: "Outbreaks (Gen 9)", base: 2048, charm: 1024, details: "Mass Outbreaks in Scarlet and Violet with 60+ defeats." },
  { method: "Masuda + Charm (Gen 6+)", base: 512, charm: 512, details: "Masuda Method combined with Shiny Charm." },
  { method: "Outbreak 60+ + Charm", base: 512, charm: 512, details: "Mass Outbreak with 60+ defeats, Sparkling Power, and Shiny Charm." },
];

function calculateOdds(base: number, hasCharm: boolean, attempts: number) {
  const odds = hasCharm ? Math.floor(base / 2) : base;
  const probability = (1 - Math.pow(1 - 1/odds, attempts)) * 100;
  return { odds, probability };
}

export default function ShinyOddsCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Shiny Odds Calculator</span>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight mb-4">Shiny Odds Calculator</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Calculate your shiny Pokémon encounter odds with our free shiny odds calculator.
            Compare base rates, Masuda Method, Shiny Charm, chain fishing, and more across every generation.
          </p>

          {/* Method Table */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Shiny Hunting Methods & Odds</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold">Method</th>
                    <th className="text-center p-3 font-semibold">Base Odds</th>
                    <th className="text-center p-3 font-semibold">With Charm</th>
                    <th className="text-left p-3 font-semibold hidden sm:table-cell">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {SHINY_METHODS.map((m, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-card/50">
                      <td className="p-3 font-medium">{m.method}</td>
                      <td className="text-center p-3">1 in {m.base.toLocaleString()}</td>
                      <td className="text-center p-3">1 in {m.charm.toLocaleString()}</td>
                      <td className="p-3 text-sm text-muted-foreground hidden sm:table-cell">{m.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <InContentAd />

          {/* Probability Calculator */}
          <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
            <h2>How Shiny Probability Works</h2>
            <p>
              The probability of finding a shiny Pokémon depends on the method you use and the number
              of attempts you make. Each encounter is an independent event, meaning past encounters
              don't affect future ones. The formula is:
            </p>
            <p>
              <strong>Probability = 1 - (1 - 1/odds)<sup>attempts</sup></strong>
            </p>
            <p>
              For example, with base odds of 1 in 4,096 and 1,000 attempts, your probability is
              approximately 21.6%. With 4,096 attempts, it's about 63.2% (but never 100% — you're
              never guaranteed a shiny, just increasingly likely).
            </p>
          </section>

          <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
            <h2>Shiny Hunting Methods Explained</h2>
            <h3>Masuda Method</h3>
            <p>
              The Masuda Method, named after Game Freak director Junichi Masuda, involves breeding
              two Pokémon from games in different languages. This method has been available since
              Generation 4 and reduces the odds from 1/8192 to 1/2048 in Gen 4-5, and from 1/4096
              to 1/683 in Gen 6+. With a Shiny Charm, it drops further to 1/512.
            </p>
            <h3>Shiny Charm</h3>
            <p>
              The Shiny Charm is a key item that increases the odds of encountering shiny Pokémon.
              It's obtained by completing the National Pokédex in most games. When combined with
              other methods like the Masuda Method or Mass Outbreaks, it provides the best odds
              available in the game.
            </p>
            <h3>Chain Fishing</h3>
            <p>
              Available in Generation 6 (X/Y, Omega Ruby/Alpha Sapphire), chain fishing requires
              you to fish consecutively without moving or failing. Each consecutive catch increases
              the shiny odds. Use a Pokémon with the Suction Cups ability in the lead position to
              guarantee a bite. At a 20+ chain, the odds reach approximately 1 in 100.
            </p>
            <h3>SOS Battles</h3>
            <p>
              In Generation 7 (Sun/Moon/Ultra Sun/Ultra Moon), you can chain SOS battles by
              keeping a wild Pokémon calling for help. After a chain of 70+, the odds drop to
              1 in 1024 (or 1 in 683 with Shiny Charm).
            </p>
            <h3>Mass Outbreaks</h3>
            <p>
              In Generation 9 (Scarlet/Violet), Mass Outbreaks provide excellent shiny hunting
              opportunities. Defeating 60+ Pokémon in an outbreak increases the odds to 1 in 512
              with a Shiny Charm and Sparkling Power level 3. This is currently the best method
              available in any Pokémon game.
            </p>
          </section>

          <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Related Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <Link href="/shiny-pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Shiny Checker</div><div className="text-muted-foreground">Browse shiny forms</div></Link>
              <Link href="/random-pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Random Pokémon</div><div className="text-muted-foreground">Generate any</div></Link>
              <Link href="/blog/shiny-hunting-guide/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Shiny Guide</div><div className="text-muted-foreground">Complete tutorial</div></Link>
              <Link href="/type-chart/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Type Chart</div><div className="text-muted-foreground">All 18 types</div></Link>
              <Link href="/pokemon-quiz/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Quiz</div><div className="text-muted-foreground">Test knowledge</div></Link>
              <Link href="/random-team/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors"><div className="font-semibold">Team Builder</div><div className="text-muted-foreground">Build a team</div></Link>
            </div>
          </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
