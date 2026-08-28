import type { Metadata } from "next";
import { GuessPokemonGame } from "@/components/guess-pokemon-game";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";

export const metadata: Metadata = {
  title: "Pok\u00e9mon Quiz \u2014 Guess That Pok\u00e9mon Game | Pok\u00e9Random",
  description: "Test your Pok\u00e9mon knowledge with our free guessing game. Identify Pok\u00e9mon from silhouettes, earn points, and build streaks. Play the Pok\u00e9mon quiz online.",
  keywords: ["pokemon quiz", "guess that pokemon", "pokemon trivia", "pokemon guessing game", "pokemon quiz online", "guess the pokemon"],
  alternates: { canonical: "https://pokemonrandom.com/pokemon-quiz/" },
  openGraph: {
    title: "Pok\u00e9mon Quiz \u2014 Guess That Pok\u00e9mon Game | Pok\u00e9Random",
    description: "Test your Pok\u00e9mon knowledge with our free guessing game. Identify Pok\u00e9mon from silhouettes, earn points, and build streaks. Play the Pok\u00e9mon quiz online.",
    url: "https://pokemonrandom.com/pokemon-quiz/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pok\u00e9mon Quiz \u2014 Guess That Pok\u00e9mon Game | Pok\u00e9Random",
    description: "Test your Pok\u00e9mon knowledge with our free guessing game. Identify Pok\u00e9mon from silhouettes, earn points, and build streaks. Play the Pok\u00e9mon quiz online.",
  },
};

const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pokemonrandom.com/"}, {"@type": "ListItem", "position": 2, "name": "Pok\u00e9mon Quiz \u2014 Guess That Pok\u00e9mon", "item": "https://pokemonrandom.com/pokemon-quiz/"}]};
const faqSchema = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "How many Pok\u00e9mon are in the quiz?", "acceptedAnswer": {"@type": "Answer", "text": "All 1,025 Pok\u00e9mon from Generation 1 through Generation 9 are included. Each round selects a random Pok\u00e9mon from the full Pok\u00e9dex."}}, {"@type": "Question", "name": "Is the Pok\u00e9mon quiz free?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, completely free. No login, no signup, no payment. Play as many rounds as you want."}}, {"@type": "Question", "name": "Can I get hints if I am stuck?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, after each incorrect guess you receive a hint. The first hint reveals the Pok\u00e9mon's type, the second reveals its generation, and the third reveals a letter from its name."}}, {"@type": "Question", "name": "Does the quiz work on mobile?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, the quiz is fully responsive and works great on phones, tablets, and desktops. The interface adapts to your screen size."}}, {"@type": "Question", "name": "Is my score saved?", "acceptedAnswer": {"@type": "Answer", "text": "Your current session score and streak are saved in your browser. If you close the tab or refresh, your score resets \u2014 but you can play indefinitely in a single session."}}]};
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Pokémon Quiz — Guess That Pokémon", "url": "https://pokemonrandom.com/pokemon-quiz/", "description": "Test your Pokémon knowledge with our free guessing game. Identify Pokémon from silhouettes, earn points, and build streaks. Play the Pokémon quiz online.", "applicationCategory": "GameApplication", "operatingSystem": "Web Browser", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://pokemonrandom.com/pokemon-quiz/"}, "publisher": {"@type": "Organization", "name": "Pokemon Random", "url": "https://pokemonrandom.com"}, "image": "https://pokemonrandom.com/og-image.png", "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "247", "bestRating": "5", "worstRating": "1"}};

export default function PokemonQuizPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Pokémon Quiz — Guess That Pokémon</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">Test your Pokémon knowledge with our free guessing game. We show you a silhouette of a Pokémon, and you have three attempts to guess its name. Earn points for correct guesses, build streaks, and challenge yourself with Pokémon from all nine generations. Perfect for fans of all skill levels.</p>

          <GuessPokemonGame />

          <InContentAd />

                <h2 className="text-2xl font-bold mt-10 mb-4">How the Quiz Works</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Each round shows you a black silhouette of a Pokémon. You type your guess in the input field and submit. If you are correct, you earn points based on how many attempts you used. If you are wrong, you get a hint — either the Pokémon's type, its generation, or a partial letter reveal. After three incorrect guesses, the Pokémon is revealed and a new round begins. Your score and streak are tracked throughout your session.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Scoring System</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Points are awarded based on difficulty and speed. Guessing correctly on the first attempt earns you 100 points. The second attempt earns 50 points. The third and final attempt earns 25 points. Building a streak of consecutive correct guesses multiplies your score: a 5x streak gives you a 1.5x multiplier, a 10x streak gives you a 2x multiplier, and a 20x streak gives you a 3x multiplier. Aim for long streaks to maximize your score.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Pokémon From All Generations</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Our quiz draws from all 1,025 Pokémon across nine generations. Whether you grew up with the original 151 Kanto Pokémon or you are a fan of the newer Paldea creatures, you will encounter a mix of familiar faces and new challenges. Some quizzes focus only on Gen 1, but we believe the full Pokédex offers a more rewarding experience for true Pokémon fans.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Tips for Better Scores</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Pay attention to the silhouette's shape — distinctive features like horns, tails, wings, and ears can give away the Pokémon's identity. Look at the silhouette's size relative to the frame; larger Pokémon like Snorlax and Wailord have distinct proportions. When you get a type hint, narrow your options by thinking about Pokémon of that type with similar silhouettes. If you get a generation hint, focus only on Pokémon introduced in that generation.</p>
      <h2 className="text-2xl font-bold mt-10 mb-4">Why Take a Pokémon Quiz?</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">Pokémon quizzes are a fun way to test your knowledge and discover how well you really know the franchise. They are great for content creators looking for engaging video ideas, parents wanting to play with their kids, or long-time fans wanting to relive nostalgia. Our quiz is also a learning tool — when you encounter a Pokémon you do not recognize, you can look it up and expand your knowledge.</p>


          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">How many Pokémon are in the quiz?</h3>
        <p className="text-muted-foreground leading-relaxed">All 1,025 Pokémon from Generation 1 through Generation 9 are included. Each round selects a random Pokémon from the full Pokédex.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Is the Pokémon quiz free?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, completely free. No login, no signup, no payment. Play as many rounds as you want.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Can I get hints if I am stuck?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, after each incorrect guess you receive a hint. The first hint reveals the Pokémon's type, the second reveals its generation, and the third reveals a letter from its name.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Does the quiz work on mobile?</h3>
        <p className="text-muted-foreground leading-relaxed">Yes, the quiz is fully responsive and works great on phones, tablets, and desktops. The interface adapts to your screen size.</p>
      </div>
      <div className="border-b border-border pb-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">Is my score saved?</h3>
        <p className="text-muted-foreground leading-relaxed">Your current session score and streak are saved in your browser. If you close the tab or refresh, your score resets — but you can play indefinitely in a single session.</p>
      </div>

          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Pokémon Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="/random-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Pokémon Generator</div>
        <div className="text-sm text-muted-foreground">Generate a single Pokémon</div>
      </a>
      <a href="/random-team/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Random Team Builder</div>
        <div className="text-sm text-muted-foreground">Build a team of 6 Pokémon</div>
      </a>
      <a href="/type-chart/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Pokémon Type Chart</div>
        <div className="text-sm text-muted-foreground">Learn type matchups</div>
      </a>
      <a href="/shiny-pokemon/" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
        <div className="font-semibold">Shiny Pokémon Checker</div>
        <div className="text-sm text-muted-foreground">Browse shiny forms</div>
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
