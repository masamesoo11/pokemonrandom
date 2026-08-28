import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { GENERATIONS, POKEMON_TYPES, getTypeColor } from "@/lib/pokemon-api";

export const metadata: Metadata = {
  title: "Pokémon Database — Complete Pokédex (1,025 Pokémon) | PokéRandom",
  description:
    "Browse all 1,025 Pokémon from Generation 1 to Generation 9. Complete Pokédex with stats, types, abilities, evolution chains, and shiny forms. Free online Pokémon database.",
  keywords: [
    "pokemon database",
    "pokemon pokedex",
    "all pokemon list",
    "pokemon list by generation",
    "complete pokedex",
    "pokemon stats database",
  ],
  alternates: { canonical: "https://pokemonrandom.com/pokemon/" },
  openGraph: {
    title: "Pokémon Database — Complete Pokédex (1,025 Pokémon) | PokéRandom",
    description:
      "Browse all 1,025 Pokémon from Generation 1 to Generation 9. Complete Pokédex with stats, types, abilities, evolution chains, and shiny forms.",
    url: "https://pokemonrandom.com/pokemon/",
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Pokédex", item: "https://pokemonrandom.com/pokemon/" },
  ],
};

export default function PokemonIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Pokédex</span>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight mb-4">Pokémon Database</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Browse all 1,025 Pokémon from Generation 1 (Kanto) to Generation 9 (Paldea).
            Each entry includes base stats, types, abilities, evolution chains, shiny forms,
            and detailed information. Click any Pokémon to view its full Pokédex entry.
          </p>

          <InContentAd />

          {/* Browse by Generation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Generation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GENERATIONS.map((gen, idx) => {
                const genNum = idx + 1;
                const count = gen.range[1] - gen.range[0] + 1;
                return (
                  <Link
                    key={genNum}
                    href={`/generation/${genNum}/`}
                    className="block p-6 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{gen.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {gen.range[0]}–{gen.range[1]}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      {gen.region} Region · {count} Pokémon
                    </div>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((i) => {
                        const sampleId = gen.range[0] + i;
                        if (sampleId > gen.range[1]) return null;
                        return (
                          <img
                            key={i}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sampleId}.png`}
                            alt={`Pokémon #${sampleId}`}
                            className="w-10 h-10 object-contain"
                            loading="lazy"
                          />
                        );
                      })}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Browse by Type */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {POKEMON_TYPES.map((t) => (
                <Link
                  key={t.name}
                  href={`/type/${t.name}/`}
                  className="block p-4 rounded-xl border border-border text-center hover:scale-105 transition-transform"
                  style={{ backgroundColor: `${t.color}22` }}
                >
                  <div
                    className="w-10 h-10 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: t.color }}
                  />
                  <div className="font-semibold capitalize">{t.name}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Pokémon (starters) */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Pokémon</h2>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-3">
                {[1, 4, 7, 25, 133, 150, 151, 384, 658].map((id) => (
                  <Link
                    key={id}
                    href={`/pokemon/${id}/`}
                    className="flex flex-col items-center p-2 rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                      alt={`Pokémon #${id}`}
                      className="w-16 h-16 object-contain"
                      loading="lazy"
                    />
                    <span className="text-xs text-muted-foreground mt-1">#{String(id).padStart(4, "0")}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/pokemon/1/"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Start browsing from #0001 →
                </Link>
              </div>
            </div>
          </section>

          {/* SEO content */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Complete Pokémon Pokédex</h2>
            <p>
              Our Pokémon database contains all 1,025 Pokémon from the main series games,
              spanning nine generations from Kanto (Generation 1) to Paldea (Generation 9).
              Each Pokémon has its own dedicated page with comprehensive information including
              base stats, type effectiveness, abilities (including hidden abilities), evolution
              chains, shiny forms, flavor text from the games, and much more.
            </p>
            <p>
              Whether you are a competitive battler looking for the perfect Pokémon to add to
              your team, a Nuzlocke challenger planning your next run, or a casual fan wanting
              to learn more about your favorite Pokémon, our Pokédex has everything you need.
              Use the generation filter to explore Pokémon from a specific region, or browse
              by type to find Pokémon that match your playstyle.
            </p>
            <p>
              All data is sourced from the official PokéAPI, ensuring accuracy and
              up-to-date information. Our database is updated regularly as new Pokémon games
              are released and new Pokémon are introduced. Bookmark this page and check back
              often for the latest Pokémon information.
            </p>

        {/* SEO Content Expanded — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Complete Pokédex — All 1,025 Pokémon Database</h2>
            <h3>The Complete National Pokédex</h3>
            <p>Our Pokédex contains all 1,025 Pokémon from every generation of the franchise, from Generation 1 Kanto with the original 151 Pokémon to Generation 9 Paldea with the most recent 110 additions. Each Pokémon has its own dedicated page with detailed information including base stats, types, abilities, height, weight, official artwork, shiny form, flavor text, and more. The Pokédex is organized by National Pokédex number, which is the official numbering system used across all Pokémon media. You can browse the entire list, search for a specific Pokémon by name or number, or filter by generation to see only Pokémon from a specific region.</p>
            <h3>Browsing Pokémon by Generation</h3>
            <p>Each generation of Pokémon corresponds to a specific region and a set of main series games. Generation 1 Kanto features the original 151 Pokémon from Pokémon Red, Blue, and Green. Generation 2 Johto added 100 new Pokémon in Pokémon Gold, Silver, and Crystal. Generation 3 Hoenn brought 135 Pokémon in Pokémon Ruby, Sapphire, and Emerald. Generation 4 Sinnoh introduced 107 Pokémon in Pokémon Diamond, Pearl, and Platinum. Generation 5 Unova added 156 Pokémon in Pokémon Black and White. Generation 6 Kalos brought 72 Pokémon in Pokémon X and Y. Generation 7 Alola introduced 88 Pokémon in Pokémon Sun and Moon. Generation 8 Galar added 89 Pokémon in Pokémon Sword and Shield. Generation 9 Paldea introduced 110 Pokémon in Pokémon Scarlet and Violet.</p>
            <h3>Pokémon Base Stats Explained</h3>
            <p>Every Pokémon has six base stats that determine its battle capabilities. HP Hit Points determines how much damage a Pokémon can take before fainting. Attack determines the power of physical moves like Tackle and Earthquake. Defense reduces damage from physical attacks. Special Attack determines the power of special moves like Flamethrower and Psychic. Special Defense reduces damage from special attacks. Speed determines which Pokémon moves first in battle. The base stat total is the sum of all six stats and gives a quick overview of the Pokémon overall power. Pokémon with a base stat total above 500 are generally considered strong, while those below 300 are considered weak. The highest base stat total belongs to Mega Rayquaza and Mega Mewtwo X and Y at 780.</p>
            <h3>Pokémon Types and Combinations</h3>
            <p>There are 18 Pokémon types, and most Pokémon have either one or two types. Dual type Pokémon have a combined effectiveness profile that can create unique strengths and weaknesses. For example, Water and Ground type Pokémon like Swampert are immune to Electric type moves and only weak to Grass type moves 4x weakness. Some type combinations are very common, like Normal and Flying used by many bird Pokémon, while others are unique to a single Pokémon, like Fire and Water used only by Volcanion. Browsing our Pokédex by type can help you discover Pokémon of specific types that you might want to use in your team.</p>
            <h3>Using the Pokédex for Team Building</h3>
            <p>Our Pokédex is a valuable resource for team building, whether you are playing casually or competitively. You can browse the Pokédex to find Pokémon with specific types, stats, or abilities that fit your team needs. Each Pokémon page includes detailed information about its base stats, abilities, and type effectiveness, which can help you make informed decisions about which Pokémon to add to your team. You can also use our Pokémon Comparison Tool to compare two Pokémon side by side and see which one has better stats, typing, or abilities for your specific needs. For random team building, use our Random Team Builder which can generate a balanced team of 6 Pokémon with optional generation filtering.</p>
            <h3>Pokémon Evolution and Families</h3>
            <p>Many Pokémon evolve into other Pokémon when certain conditions are met, creating evolution families that span multiple Pokédex entries. Evolution can occur through leveling up, using evolution stones, trading, friendship, or special location based methods. Some Pokémon have branching evolution paths, like Eevee which can evolve into 8 different Pokémon Vaporeon, Jolteon, Flareon, Espeon, Umbreon, Leafeon, Glaceon, and Sylveon. Other Pokémon have mega evolutions or gigantamax forms that are temporary transformations used in battle. Understanding evolution chains is important for completing your Pokédex and for team building, as you may want to use a pre evolution for its different stats or abilities.</p>
        </section>
            <h3>Legendary Pokémon in the Pokédex</h3>
          <p>Legendary Pokémon are a special class of Pokémon that are typically very rare, very powerful, and play a significant role in the lore of the Pokémon world. There are currently over 60 Legendary Pokémon in the National Pokédex, spread across all nine generations. Some of the most iconic Legendary Pokémon include Mewtwo Generation 1, Lugia and Ho Oh Generation 2, Rayquaza, Kyogre, and Groudon Generation 3, Dialga, Palkia, and Giratina Generation 4, Reshiram and Zekrom Generation 5, Xerneas and Yveltal Generation 6, Solgaleo and Lunala Generation 7, Zacian and Zamazenta Generation 8, and Koraidon and Miraidon Generation 9. Legendary Pokémon typically have base stat totals of 580 or higher, with some like Mewtwo and Rayquaza having base stat totals of 680. Many Legendary Pokémon also have signature moves and unique abilities that are not available to any other Pokémon.</p>
          <h3>Mythical Pokémon and Event Distributions</h3>
          <p>Mythical Pokémon are a subset of Legendary Pokémon that are typically only obtainable through special events or distributions, rather than being encountered in the main game. The most famous Mythical Pokémon is Mew, which was the first Mythical Pokémon introduced in Generation 1 and was originally only obtainable through a special distribution event. Other notable Mythical Pokémon include Celebi Generation 2, Jirachi Generation 3, Deoxys Generation 3, Manaphy Generation 4, Darkrai Generation 4, Shaymin Generation 4, Arceus Generation 4, Victini Generation 5, Keldeo Generation 5, Meloetta Generation 5, Genesect Generation 5, Diancie Generation 6, Hoopa Generation 6, Volcanion Generation 6, Magearna Generation 7, Marshadow Generation 7, Zeraora Generation 7, Meltan and Melmetal Generation 8, Zarude Generation 8, and Pecharunt Generation 9. Mythical Pokémon are highly sought after by collectors and are often featured in Pokémon movies.</p>
          <h3>Shiny Pokémon in the Pokédex</h3>
          <p>Every Pokémon in the National Pokédex has a shiny form, which is an alternate color scheme that is extremely rare in the main games. The base odds of encountering a shiny Pokémon are 1 in 4,096, but various methods can improve these odds. The Masuda Method, which involves breeding two Pokémon from different language games, increases the odds to 1 in 1,365. The Shiny Charm, which is obtained by completing the National Pokédex, further increases the odds of encountering shiny Pokémon. Some shiny Pokémon have dramatic color differences, like the red Gyarados or the black Charizard, while others have very subtle changes. Browsing our Pokédex, you can see both the normal and shiny forms of each Pokémon, making it easy to decide which shiny forms are worth hunting for.</p>
          <h3>Pokémon by Type and Type Combinations</h3>
          <p>With 18 Pokémon types and the ability for most Pokémon to have two types, there are 324 possible type combinations, though not all of them are used in the franchise. The most common type combination is Normal and Flying, used by many bird Pokémon like Pidgey, Spearow, and Starly. Other common combinations include Water and Ground, used by Pokémon like Quagsire and Swampert, and Bug and Poison, used by Pokémon like Weedle and Venonat. Some type combinations are unique to a single Pokémon, like Fire and Water used only by Volcanion, or Electric and Fire used only by Rotom Heat. Browsing our Pokédex by type can help you discover Pokémon of specific types and explore the diverse type combinations that exist in the franchise.</p>
          <h3>Pokémon Height and Weight</h3>
          <p>Each Pokémon has a specific height and weight that are recorded in the Pokédex. The smallest Pokémon is Cosmog, which is 0.2 meters tall, while the largest Pokémon is Eternatus Eternamax form, which is 100 meters tall. The lightest Pokémon is Gastly and Haunter, which weigh 0.1 kg, while the heaviest Pokémon is Cosmoem, which weighs 999.9 kg. Height and weight are not just cosmetic, as they affect certain moves and abilities. Low Kick and Grass Knot deal more damage to heavier Pokémon. Heavy Slam deals more damage to lighter Pokémon. The ability Light Metal halves the Pokémon weight, while the ability Heavy Metal doubles it. The move Sky Drop cannot be used on very heavy Pokémon. Understanding height and weight can be important for competitive play when these moves and abilities are involved.</p>
          <h3>Pokémon Cry and Sound Design</h3>
          <p>Each Pokémon has a unique cry that plays when it is encountered or sent into battle. The cries were originally generated using the Game Boy sound chip in Generation 1 and 2, giving them a distinctive electronic sound. In Generation 3 and later, the cries were updated to use more advanced audio technology, but they retained their recognizable melodies. Some Pokémon cries are iconic, like the cry of Pikachu which is the only cry that uses the Pokémon name, or the cry of Mewtwo which sounds ominous and powerful. In our Pokédex, you can listen to the cry of each Pokémon by clicking the speaker icon on the Pokémon detail page. The cries are sourced from the official PokéAPI and match the sounds used in the main series games.</p>
        </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
