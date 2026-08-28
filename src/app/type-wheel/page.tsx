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



        {/* SEO Content Expanded — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Pokémon Type Wheel Spinner — Complete Guide</h2>
            <h3>What Is the Type Wheel Spinner</h3>
            <p>Our Pokémon Type Wheel Spinner is a fun interactive tool that randomly selects one of the 18 Pokémon types when you spin the wheel. The wheel is divided into 18 equal sections, each representing a different type with its corresponding color. When you click the spin button, the wheel rotates and lands on a random type. After the wheel lands, we show you four random Pokémon of that type so you can see what is available. The type wheel is perfect for monotype challenges, type themed draft leagues, or just for inspiration when you cannot decide what type of Pokémon to use.</p>
            <h3>Using the Wheel for Monotype Challenges</h3>
            <p>A monotype challenge is a self imposed ruleset where you restrict your team to only use Pokémon of a single type. This creates a significant challenge because you will have major weaknesses against certain types and limited movepool options. Our type wheel is a great way to randomly select which type you will use for your monotype run, adding an extra layer of unpredictability to the challenge. Simply spin the wheel, see which type you get, and then build your team using only Pokémon of that type. You can use our random team builder with the type filter to quickly generate a team of the selected type.</p>
            <h3>Type Themed Draft Leagues</h3>
            <p>Draft leagues are a popular format in the Pokémon community where participants take turns drafting Pokémon for their team from a shared pool. Type themed draft leagues add an extra restriction where each participant is assigned a type and can only draft Pokémon of that type. Our type wheel is a perfect tool for assigning types in a draft league, as it ensures a random and fair distribution of types among the participants. Each participant spins the wheel to determine their type, and then they draft Pokémon of that type to build their team. This format creates interesting strategic decisions and can lead to some very creative team compositions.</p>
            <h3>All 18 Pokémon Types</h3>
            <p>There are 18 Pokémon types in total, each with its own strengths, weaknesses, and characteristics. Normal is a versatile type with no major strengths or weaknesses. Fire is strong against Grass, Ice, Bug, and Steel. Water is strong against Fire, Ground, and Rock. Grass is strong against Water, Ground, and Rock. Electric is strong against Water and Flying. Ice is strong against Grass, Ground, Flying, and Dragon. Fighting is strong against Normal, Ice, Rock, Dark, and Steel. Poison is strong against Grass and Fairy. Ground is strong against Fire, Electric, Poison, Rock, and Steel. Flying is strong against Grass, Fighting, and Bug. Psychic is strong against Fighting and Poison. Bug is strong against Grass, Psychic, and Dark. Rock is strong against Fire, Ice, Flying, and Bug. Ghost is strong against Psychic and Ghost. Dragon is strong against Dragon. Dark is strong against Psychic and Ghost. Steel is strong against Ice, Rock, and Fairy. Fairy is strong against Fighting, Dragon, and Dark.</p>
            <h3>Random Type Generation for Content Creators</h3>
            <p>Content creators on YouTube, Twitch, and TikTok often use random type generation to create engaging and unpredictable content. A random type challenge video, where the creator has to build a team and battle using only Pokémon of a randomly selected type, can be very entertaining for viewers. Our type wheel makes it easy to generate a random type for these challenges, and the visual spinning animation adds an element of suspense that is perfect for video content. Many creators also use the wheel for viewer interactive streams, where the audience can suggest challenges or rules based on the type that the wheel lands on.</p>
          <h3>Type Wheel for Random Challenges</h3>
          <p>Random type challenges are a popular way to add variety and difficulty to Pokémon games. Instead of choosing your team composition, you let chance decide which type you will use throughout your playthrough. Our type wheel makes this easy by randomly selecting one of the 18 Pokémon types with a single click. Once you have your type, you can use our random team builder with the type filter to generate a team of Pokémon that match your selected type. Some types are easier to play with than others. Water and Normal types have many Pokémon to choose from and good type coverage, making them relatively easy. Ice and Dragon types have fewer Pokémon and more weaknesses, making them more challenging. Fairy and Steel types are defensively strong but may have limited options in earlier generations.</p>
          <h3>Pokémon Types and Their Characteristics</h3>
          <p>Each of the 18 Pokémon types has unique characteristics that define the Pokémon of that type. Normal type Pokémon are versatile and have no major strengths or weaknesses, with only one immunity to Ghost. Fire type Pokémon are aggressive attackers with high Attack or Special Attack, but they are fragile and weak to Water, Ground, and Rock. Water type Pokémon are adaptable and can fill many roles, with good defensive typing and access to moves like Surf and Waterfall. Grass type Pokémon are often support oriented with moves like Leech Seed and Sleep Powder, but they have many weaknesses. Electric type Pokémon are fast and have high Special Attack, with only one weakness to Ground. Ice type Pokémon are powerful offensively but fragile defensively, with weaknesses to Fire, Fighting, Rock, and Steel. Fighting type Pokémon are physical attackers with high Attack, strong against Normal, Ice, Rock, Dark, and Steel. Poison type Pokémon are defensive and use status conditions like Toxic to wear down opponents. Ground type Pokémon are powerful physical attackers with immunity to Electric. Flying type Pokémon are fast and have immunity to Ground, making them versatile. Psychic type Pokémon are special attackers with high Special Attack. Bug type Pokémon are often found early in games and have unique type combinations. Rock type Pokémon are defensive with high Defense but many weaknesses. Ghost type Pokémon are tricky and have immunity to Normal and Fighting. Dragon type Pokémon are powerful and have high stats, but are weak to Ice, Dragon, and Fairy. Dark type Pokémon are immune to Psychic and strong against Ghost and Psychic. Steel type Pokémon are the most defensive type, resisting 11 types. Fairy type Pokémon are immune to Dragon and strong against Dragon, Dark, and Fighting.</p>
        </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
