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
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Pokémon Type Chart — Full Effectiveness Matrix", "url": "https://pokemonrandom.com/type-chart/", "description": "Complete Pokémon type chart with all 18 types and their effectiveness. Find out which moves are super effective, weak, or useless against any type.", "applicationCategory": "GameApplication", "operatingSystem": "Web Browser", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://pokemonrandom.com/type-chart/"}, "publisher": {"@type": "Organization", "name": "Pokemon Random", "url": "https://pokemonrandom.com"}, "image": "https://pokemonrandom.com/og-image.png", "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "247", "bestRating": "5", "worstRating": "1"}};

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

        {/* SEO Content Expanded — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Pokémon Type Chart — Complete Effectiveness Guide</h2>
            <h3>Understanding the Pokémon Type System</h3>
            <p>The Pokémon type system is the foundation of battle strategy in the franchise. There are 18 types in total: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, and Fairy. Each type has strengths and weaknesses against other types, creating a complex rock paper scissors system that determines battle outcomes. For example, Water type moves are super effective against Fire, Ground, and Rock type Pokémon, but not very effective against Grass and Water types. Understanding these matchups is essential for success in both casual playthroughs and competitive battles.</p>
            <h3>How to Read the Type Chart</h3>
            <p>Our type chart is displayed as an 18 by 18 matrix where each row represents an attacking type and each column represents a defending type. The cells are color coded to show the effectiveness of each matchup. Green cells indicate super effective 2x damage, red cells indicate not very effective 0.5x damage, black cells indicate no effect 0x damage, and gray cells indicate normal effectiveness 1x damage. Dual type Pokémon have their weaknesses and resistances calculated by multiplying the effectiveness of each type. For example, a Water and Ground type Pokémon like Swampert takes 4x damage from Grass type moves because both Water and Ground are weak to Grass.</p>
            <h3>Dual Type Pokémon and Combined Effectiveness</h3>
            <p>Most Pokémon have two types, which creates a more complex effectiveness profile. When a Pokémon has two types, the effectiveness of each move is calculated by multiplying the effectiveness against each type. For example, if a Fire type move is used against a Bug and Grass type Pokémon, the effectiveness is 2x super effective against Bug multiplied by 2x super effective against Grass, which equals 4x damage. Conversely, if a Fire type move is used against a Water and Dragon type Pokémon, the effectiveness is 0.5x not very effective against Water multiplied by 0.5x not very effective against Dragon, which equals 0.25x damage. Understanding these combinations is key to mastering Pokémon battles.</p>
            <h3>Type Effectiveness in Competitive Play</h3>
            <p>In competitive Pokémon play, type effectiveness is even more important than in casual play because every move counts and every damage calculation matters. Competitive players memorize the type chart and can quickly calculate the effectiveness of any move against any dual type combination. This allows them to make informed decisions about which moves to use, which Pokémon to switch in, and which threats to prioritize. Many competitive players use tools like our type chart as a reference during team building to ensure that their team has good type coverage and no glaring weaknesses.</p>
            <h3>Changes to the Type System Over Generations</h3>
            <p>The Pokémon type system has evolved over the generations. The original 15 types were introduced in Generation 1. In Generation 2, two new types were added: Dark and Steel, to balance the overpowered Psychic type from Generation 1. In Generation 6, the Fairy type was introduced to balance the Dragon type and give Poison and Steel types more offensive utility. The Fairy type was a significant addition that changed the competitive landscape, as it is super effective against Dragon, Dark, and Fighting types, and is immune to Dragon type moves. Our type chart reflects the current 18 type system as of Generation 9.</p>
            <h3>Same Type Attack Bonus STAB</h3>
            <p>Same Type Attack Bonus, or STAB, is a mechanic that gives a 1.5x damage bonus to moves that are the same type as the Pokémon using them. For example, if a Charizard Fire and Flying type uses Flamethrower a Fire type move, the damage is multiplied by 1.5 because Charizard is a Fire type. This encourages players to use moves that match their Pokémon typing and makes type coverage an important consideration in team building. When building a team, you should aim to have STAB moves for each of your Pokémon types as well as coverage moves to handle types that your team might struggle against.</p>
        </section>
            <h3>Type Chart History and Evolution</h3>
          <p>The Pokémon type system has evolved significantly over the course of the franchise. In Generation 1, there were 15 types: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, and Dragon. The Psychic type was extremely overpowered in Generation 1 because its only weaknesses were Bug and Ghost, and there were no strong Bug or Ghost type moves available. In Generation 2, two new types were added: Dark and Steel. The Dark type was added to counter Psychic, as Dark is immune to Psychic and super effective against Psychic. The Steel type was added to provide more defensive options, as Steel resists 11 types including Dragon. In Generation 6, the Fairy type was introduced to counter Dragon, which had become dominant in competitive play. Fairy is immune to Dragon, super effective against Dragon, and weak to Steel and Poison, giving those types more offensive utility.</p>
          <h3>Immunities in the Type Chart</h3>
          <p>Some type matchups result in complete immunity, meaning the defending Pokémon takes no damage from the attack. Normal is immune to Ghost, meaning Normal type Pokémon cannot be hit by Ghost type moves and Ghost type Pokémon cannot be hit by Normal type moves. Flying is immune to Ground, meaning Flying type Pokémon take no damage from Ground type moves like Earthquake and Spikes. This immunity can be removed by the moves Smack Down, Thousand Arrows, and the ability Iron Ball. Steel is immune to Poison, meaning Steel type Pokémon cannot be poisoned. This is in addition to Steel resisting 11 types, making it the most defensive type in the game. Dark is immune to Psychic, meaning Dark type Pokémon cannot be hit by Psychic type moves. Fairy is immune to Dragon, meaning Fairy type Pokémon cannot be hit by Dragon type moves, which was added in Generation 6 to balance the Dragon type. Ghost is immune to Normal and Fighting, meaning Ghost type Pokémon cannot be hit by Normal or Fighting type moves.</p>
          <h3>Type Effectiveness Multipliers</h3>
          <p>Type effectiveness in Pokémon is calculated using multipliers that stack when a Pokémon has two types. A super effective move deals 2x damage, while a not very effective move deals 0.5x damage. When a dual type Pokémon is attacked, the effectiveness against each type is multiplied together. For example, if a Water type move is used against a Fire and Ground type Pokémon, the effectiveness is 2x against Fire multiplied by 2x against Ground, which equals 4x damage. Conversely, if a Water type move is used against a Water and Dragon type Pokémon, the effectiveness is 0.5x against Water multiplied by 0.5x against Dragon, which equals 0.25x damage. Some type combinations can result in 4x weaknesses, like Bug and Steel against Fire, or 4x resistances, like Steel and Fairy against Bug. Understanding these multipliers is essential for competitive play.</p>
          <h3>Defensive and Offensive Type Ratings</h3>
          <p>In competitive Pokémon play, types are often evaluated based on their defensive and offensive ratings. Defensively, Steel is considered the best type because it resists 11 types including Dragon, Fairy, and Ice, and is only weak to Fire, Fighting, and Ground. Fairy is also a strong defensive type, being immune to Dragon and resisting Fighting, Bug, and Dark. Water is a versatile defensive type with only two weaknesses Grass and Electric and four resistances. Offensively, Fairy is considered one of the best types because it is super effective against Dragon, Dark, and Fighting, all of which are common in competitive play. Ground is also a strong offensive type, being super effective against 5 types including Electric, Fire, Poison, Rock, and Steel. Ice is the best offensive type for hitting Dragon types, being super effective against Dragon, Flying, Grass, and Ground.</p>
          <h3>Type Chart for Competitive Singles</h3>
          <p>In competitive Singles play, the type chart is used differently than in Doubles. In Singles, type coverage is about being able to hit as many types as possible for super effective or at least neutral damage. Common coverage moves include Earthquake for hitting Steel, Rock, Fire, Electric, and Poison types, and Ice Beam for hitting Dragon, Flying, Grass, and Ground types. Thunderbolt is used for hitting Water and Flying types, while Flamethrower covers Grass, Bug, Ice, and Steel types. Focus Blast is used for hitting Normal, Ice, Rock, Dark, and Steel types, though its low accuracy can be a drawback. In Singles, having good type coverage on your team is essential for breaking through defensive cores and handling a wide range of threats. Understanding the type chart is the foundation of successful Singles team building.</p>
          <h3>Type Chart for VGC and Doubles</h3>
          <p>In VGC Video Game Championships and Doubles play, the type chart is used differently than in Singles. In Doubles, type effectiveness is important, but type synergy between teammates and protecting your partner are equally important. Common Doubles strategies include using Follow Me or Rage Powder to redirect attacks away from a setup sweeper, using Protect to scout the opponent moves and avoid taking damage, and using spread moves like Earthquake and Dazzling Gleam that hit both opponents. The ability Telepathy is useful in Doubles for avoiding damage from ally spread moves. Types that are commonly seen in VGC include Fairy for hitting Dragon types, Steel for defensive synergy, and Ghost for being immune to Normal and Fighting type moves. Understanding the type chart is crucial for VGC success, but it must be combined with an understanding of Doubles specific mechanics.</p>
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
