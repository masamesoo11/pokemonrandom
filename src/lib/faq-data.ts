// FAQ data - shared between the FaqSection (client) and layout (server) for JSON-LD.
// This file has NO "use client" so it can be imported by the server-side layout.

export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  {
    q: "How does the random Pokemon generator work?",
    a: "Our generator uses the official open-source PokeAPI. Each time you click Generate, we pick a random Pokemon ID between 1 and 1025 (covering every Pokemon from Generation I to Generation IX) and fetch its full data — sprite, types, base stats, abilities, and cry. We never store any of your data, and the picks are completely random each time.",
  },
  {
    q: "Is this random Pokemon generator free to use?",
    a: "Yes, 100% free with no signup, no ads in your way, and no limits. You can generate as many Pokemon as you want, build unlimited teams, spin the type wheel as often as you like, and play the Guess That Pokemon game without any paywall. Pokemon Random is a fan-made tool supported by optional display ads.",
  },
  {
    q: "Can I filter by generation or type?",
    a: "Yes! The main generator lets you pick any single generation (Gen I through Gen IX). For more advanced filtering — multiple generations, multiple types, legendary-only, or exclude legendaries — use the Pokemon Randomizer tool further down the page. It supports every combination of filters you might want.",
  },
  {
    q: "Can I generate a full Pokemon team of 6?",
    a: "Absolutely. The Random Pokemon Team Builder (right below the main generator) rolls six unique Pokemon at once. You can also filter by generation. Click the X on any team member to remove them, then click again to roll a replacement.",
  },
  {
    q: "How does the Guess That Pokemon game work?",
    a: "A random Pokemon appears as a dark silhouette. You have 3 attempts to type its name. If you get stuck, you can request one hint (generation + type + first letter). If you guess correctly, your streak goes up. The game tracks your wins and total rounds played.",
  },
  {
    q: "What is the Pokemon Type Wheel Spinner for?",
    a: "It's a fun way to pick a random Pokemon type — useful for monotype challenges, type-themed draft leagues, or just for inspiration. After the wheel lands on a type, we show you four random Pokemon of that type so you can see what's available.",
  },
  {
    q: "Do you include shiny Pokemon?",
    a: "Yes. In the main generator, click the sparkle icon next to the Generate button to toggle between the normal and shiny artwork for the currently displayed Pokemon. Shiny forms use the official artwork from the PokeAPI sprites repository.",
  },
  {
    q: "Can I hear the Pokemon's cry?",
    a: "Yes — in the main generator, click the speaker icon to play the Pokemon's official cry (sound). We use the open-source PokeAPI/cries audio files. Make sure your device isn't muted.",
  },
  {
    q: "Are all 1025 Pokemon included?",
    a: "Yes, every Pokemon from the National Pokedex (IDs 1 through 1025) is available. That includes all of Generation I (Kanto), Generation II (Johto), Generation III (Hoenn), Generation IV (Sinnoh), Generation V (Unova), Generation VI (Kalos), Generation VII (Alola), Generation VIII (Galar), and Generation IX (Paldea).",
  },
  {
    q: "Is Pokemon Random affiliated with Nintendo or The Pokemon Company?",
    a: "No. Pokemon Random is an independent fan-made tool. Pokemon and all related names are trademarks of Nintendo, Game Freak, and The Pokemon Company. We use the open-source PokeAPI (https://pokeapi.co) for all data and sprites. If you represent Nintendo or TPC and have any concerns, please contact us and we will respond promptly.",
  },
];

// Build the FAQ JSON-LD schema object for server-side rendering
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};
