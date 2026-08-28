import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Dices,
  Gamepad2,
  BarChart3,
  Star,
  Shuffle,
  GitCompare,
  Calendar,
  Search,
  ListOrdered,
  Database,
  Swords,
  Target,
  ChevronRight,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PokemonOfDay } from "@/components/pokemon-of-day";
import { FaqSection } from "@/components/faq-section";
import {
  HeaderBannerAd,
  InContentAd,
  FooterAd,
  MobileAnchorAd,
} from "@/components/ad-slot";
import { getAllPosts } from "@/lib/blog-content-loader";

export const metadata: Metadata = {
  title: "Pokémon Random — Free Generator, Team Builder & Pokédex",
  description:
    "Free Pokémon tools: random generator, team builder, shiny checker, type chart, quiz, and complete Pokédex with all 1,025 Pokémon. No signup required.",
  alternates: { canonical: "https://pokemonrandom.com/" },
  openGraph: {
    title: "Pokémon Random — Free Generator, Team Builder & Pokédex",
    description:
      "Free Pokémon tools: random generator, team builder, shiny checker, type chart, quiz, and complete Pokédex with all 1,025 Pokémon. No signup required.",
    url: "https://pokemonrandom.com/",
    type: "website",
    
    
    siteName: "Pokémon Random",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokémon Random — Free Generator, Team Builder & Pokédex",
    description:
      "Free Pokémon tools: random generator, team builder, shiny checker, type chart, quiz, and complete Pokédex with all 1,025 Pokémon.",
  },
  other: {
    "article:published_time": "2026-07-31T00:00:00+00:00",
    "article:modified_time": "2026-08-22T00:00:00+00:00",
  },
};

const TOOLS = [
  {
    href: "/random-pokemon/",
    icon: Sparkles,
    title: "Random Pokémon Generator",
    description: "Generate any Pokémon from all 9 generations. See stats, types, abilities, cries, and shiny forms.",
    color: "from-red-500 to-orange-500",
  },
  {
    href: "/random-team/",
    icon: Dices,
    title: "Random Team Builder",
    description: "Roll a balanced team of 6 Pokémon. Perfect for Nuzlocke challenges and casual playthroughs.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/pokemon-quiz/",
    icon: Gamepad2,
    title: "Guess That Pokémon",
    description: "Test your Pokémon knowledge. Identify Pokémon from silhouettes and build your streak.",
    color: "from-purple-500 to-pink-500",
  },
  {
    href: "/type-wheel/",
    icon: Shuffle,
    title: "Type Wheel Spinner",
    description: "Spin the wheel to get a random Pokémon type. Great for type-themed challenges.",
    color: "from-green-500 to-emerald-500",
  },
  {
    href: "/pokemon-randomizer/",
    icon: Target,
    title: "Pokémon Randomizer",
    description: "Filter by generation, type, and legendary status. Ideal for Nuzlocke and monotype runs.",
    color: "from-yellow-500 to-amber-500",
  },
  {
    href: "/pokemon-compare/",
    icon: GitCompare,
    title: "Pokémon Comparison",
    description: "Compare two Pokémon side by side. See which has better stats, types, and abilities.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    href: "/type-chart/",
    icon: BarChart3,
    title: "Type Effectiveness Chart",
    description: "Complete 18×18 type matchup matrix. Find strengths, weaknesses, and immunities instantly.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    href: "/shiny-pokemon/",
    icon: Star,
    title: "Shiny Pokémon Checker",
    description: "Browse shiny forms of all 1,025 Pokémon. Compare normal vs shiny side by side.",
    color: "from-pink-500 to-rose-500",
  },
  {
    href: "/random-starter/",
    icon: Swords,
    title: "Random Starter Picker",
    description: "Can't decide which starter to choose? Let our picker decide from all 27 starters.",
    color: "from-orange-500 to-red-500",
  },
  {
    href: "/pokemon-search/",
    icon: Search,
    title: "Pokémon Search",
    description: "Find any Pokémon by name or Pokédex number. Live results with sprites and links.",
    color: "from-sky-500 to-blue-500",
  },
  {
    href: "/tier-lists/",
    icon: ListOrdered,
    title: "Tier List Builder",
    description: "Create custom Pokémon tier lists. Drag and drop Pokémon into S, A, B, C, D, F tiers.",
    color: "from-violet-500 to-purple-500",
  },
  {
    href: "/saved-teams/",
    icon: Database,
    title: "Saved Teams",
    description: "Save, export, and import your Pokémon teams. Manage your team collection in one place.",
    color: "from-emerald-500 to-green-500",
  },
];

const DATABASE_LINKS = [
  { href: "/pokemon/", label: "Pokédex", count: "1,025 Pokémon", icon: "📜" },
  { href: "/moves/", label: "Moves", count: "920+ moves", icon: "⚔️" },
  { href: "/abilities/", label: "Abilities", count: "298+ abilities", icon: "✨" },
  { href: "/generation/1/", label: "Generations", count: "9 regions", icon: "🗺️" },
  { href: "/type/fire/", label: "Types", count: "18 types", icon: "🎯" },
  { href: "/pokemon-of-the-day/", label: "Pokémon of the Day", count: "Daily featured", icon: "📅" },
];

const STATS = [
  { value: "1,025", label: "Pokémon" },
  { value: "920+", label: "Moves" },
  { value: "298+", label: "Abilities" },
  { value: "9", label: "Generations" },
  { value: "18", label: "Types" },
  { value: "100%", label: "Free" },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-red-200/40 blur-3xl" />
            <div className="absolute -top-10 right-0 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-200/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Free · No Signup · 9 Generations
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Pokémon Random
              <br />
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Tools & Database
              </span>
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
              Free Pokémon tools, complete Pokédex, moves database, and abilities reference — all in
              one place. Powered by the open-source PokéAPI, with every Pokémon from Gen I to Gen IX.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/random-pokemon/"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                Start Generating
              </Link>
              <Link
                href="/pokemon/"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-secondary text-secondary-foreground font-semibold border border-border hover:bg-secondary/70 transition-all"
              >
                <Database className="h-4 w-4" />
                Browse Pokédex
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-4xl mx-auto">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-card/80 backdrop-blur px-4 py-3 shadow-sm"
                >
                  <p className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                    {s.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pokémon of the Day (kept — it's a single featured element, not a full tool) */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
          <PokemonOfDay />
        </section>

        <InContentAd />

        {/* Tools Grid — the main hub */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Pokémon Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              12 free interactive tools for Pokémon fans. Click any tool to open its dedicated page
              with full features and detailed information.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${tool.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-md mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <div className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Open tool
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Database Section */}
        <section className="bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                Pokémon Database
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our complete reference database with over 2,400 pages of Pokémon information.
                Each entry has stats, types, abilities, moves, and more.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {DATABASE_LINKS.map((db) => (
                <Link
                  key={db.href}
                  href={db.href}
                  className="block p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition-all text-center"
                >
                  <div className="text-3xl mb-2">{db.icon}</div>
                  <div className="font-bold text-sm mb-1">{db.label}</div>
                  <div className="text-xs text-muted-foreground">{db.count}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                Pokémon Guides & Articles
              </h2>
              <p className="text-muted-foreground">
                Tips, rankings, and challenges for every Pokémon trainer.
              </p>
            </div>
            <Link
              href="/blog/"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View all articles
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group block rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-xs text-muted-foreground mb-2">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    · {post.category}
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-primary">
                    Read more →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              View all articles
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FAQ (kept — good for SEO on homepage) */}
        <section className="bg-secondary/30 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <FaqSection />
          </div>
        </section>

        {/* SEO content */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 prose prose-lg dark:prose-invert">
          <h2>Free Pokémon Tools & Complete Pokédex</h2>
          <p>
            Pokémon Random is a free collection of Pokémon tools and a complete reference database.
            We offer 12 interactive tools including a random Pokémon generator, team builder, type
            wheel, guessing game, advanced randomizer with filters, comparison tool, type chart,
            shiny checker, starter picker, search, tier list builder, and saved teams manager. All
            tools are free to use and require no signup or registration.
          </p>
          <p>
            Our database covers all 1,025 Pokémon from Generation 1 (Kanto) through Generation 9
            (Paldea), with dedicated pages for each Pokémon, move, ability, type, and generation.
            That&apos;s over 2,400 pages of Pokémon information, all sourced from the official
            PokéAPI and updated regularly. Whether you&apos;re a competitive battler, Nuzlocke
            challenger, shiny hunter, or casual fan, we have the tools and data you need.
          </p>
          <p>
            Use our <Link href="/random-pokemon/">random Pokémon generator</Link> to discover new
            creatures, our <Link href="/random-team/">team builder</Link> to draft balanced teams,
            and our <Link href="/pokemon/">complete Pokédex</Link> to look up stats, types,
            abilities, and evolution chains. For move strategies, browse our{" "}
            <Link href="/moves/">moves database</Link> with 920+ moves. For ability research,
            explore our <Link href="/abilities/">abilities database</Link> with 298+ abilities.
          </p>

          <h3>Why Use Pokémon Random?</h3>
          <p>
            There are many Pokémon websites on the internet, but Pokémon Random stands out because
            of its simplicity, speed, and focus on the tools that matter most to fans. Every tool
            here loads instantly on desktop and mobile devices, with no popups, no login walls, and
            no intrusive ads blocking the content. We use the official PokéAPI for all data, which
            means the stats, abilities, types, and sprites you see are accurate and match the
            information in the mainline Pokémon games. Whether you are playing through a Nuzlocke
            challenge in Pokémon FireRed, building a competitive team for Pokémon Showdown, or just
            killing time by spinning our type wheel, our tools are designed to get out of your way
            and let you focus on having fun with Pokémon.
          </p>

          <h3>All 1,025 Pokémon Across Nine Generations</h3>
          <p>
            The Pokémon franchise began in 1996 with Generation 1 (Kanto) and 151 Pokémon. Since
            then, eight more generations have been released, expanding the National Pokédex to
            1,025 Pokémon as of Generation 9 (Paldea). Each generation introduced new Pokémon, new
            regions, new gameplay mechanics, and new battle strategies. Generation 2 (Johto) added
            100 Pokémon and introduced breeding and shiny forms. Generation 3 (Hoenn) brought 135
            new Pokémon and double battles. Generation 4 (Sinnoh) added 107 Pokémon and the
            physical special split. Generation 5 (Unova) introduced 156 new Pokémon, the largest
            single generation. Generation 6 (Kalos) added 72 Pokémon and the Fairy type.
            Generation 7 (Alola) brought 88 new Pokémon and regional variants. Generation 8
            (Galar) added 89 Pokémon and Dynamax forms. Generation 9 (Paldea) introduced 110 new
            Pokémon and Terastallize. Our database covers all of them, with detailed pages for
            every single Pokémon.
          </p>

          <h3>Pokémon Types and Effectiveness</h3>
          <p>
            There are 18 Pokémon types in total: Normal, Fire, Water, Grass, Electric, Ice,
            Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, and
            Fairy. Each type has strengths and weaknesses against other types, creating a complex
            rock paper scissors system that determines battle outcomes. For example, Water type
            moves are super effective against Fire type Pokémon but not very effective against Grass
            types. Understanding these matchups is the foundation of Pokémon battle strategy,
            whether you are playing casually or competitively. Our <Link href="/type-chart/">type
            chart</Link> shows the full 18 by 18 effectiveness matrix in an easy to read format, and
            our <Link href="/type-wheel/">type wheel spinner</Link> is a fun way to randomly pick a
            type for monotype challenges or themed runs.
          </p>

          <h3>Building a Balanced Pokémon Team</h3>
          <p>
            A standard Pokémon team consists of 6 Pokémon, and building a balanced team is one of
            the most rewarding parts of the franchise. A good team typically covers multiple types
            for both offense and defense, has Pokémon that fulfill different roles such as sweepers,
            tanks, and support, and includes moves that can handle a wide range of threats. Our
            <Link href="/random-team/"> random team builder</Link> rolls 6 unique Pokémon at once,
            which is great for casual play or Nuzlocke style challenges. For more control, use our
            <Link href="/pokemon-randomizer/"> advanced randomizer</Link> to filter by generation,
            type, or legendary status. You can also use our{" "}
            <Link href="/pokemon-compare/">comparison tool</Link> to evaluate two Pokémon side by
            side and decide which one fits your team better.
          </p>

          <h3>Nuzlocke Challenges and Self Imposed Rulesets</h3>
          <p>
            The Nuzlocke challenge is a popular self imposed ruleset that makes Pokémon games
            significantly harder. The core rules are simple: you can only catch the first Pokémon
            you encounter in each route or area, and any Pokémon that faints is considered dead and
            must be released or permanently boxed. Additional rules like the Nickname Rule, the
            Species Clause, and the Set Mode Rule are often added to increase difficulty. Nuzlocke
            challenges have spawned a huge community of content creators who document their runs on
            YouTube, Twitch, and Reddit. Our randomizer tool is perfect for Nuzlocke players who
            want to spice up their runs with random encounters, randomized starters, or type
            restrictions.
          </p>

          <h3>Shiny Hunting and Rare Pokémon</h3>
          <p>
            Shiny Pokémon are extremely rare variants with alternate color schemes. The base odds
            of encountering a shiny in most Pokémon games are 1 in 4,096, though methods like the
            Masuda Method, chain fishing, and SOS battles can significantly improve those odds.
            Shiny hunting has become a popular pastime for completionists and content creators
            alike, with some players spending hundreds of hours chasing a single shiny. Our{" "}
            <Link href="/shiny-pokemon/">shiny Pokémon checker</Link> lets you browse all 1,025
            shiny forms in one place, so you can see which ones are worth the hunt and which ones
            look better than their regular counterparts.
          </p>

          <h3>Pokémon Trivia and Fun Facts</h3>
          <p>
            The Pokémon franchise has a rich history spanning video games, trading cards, an
            animated series, movies, and merchandise. Some fun facts: Pikachu is the official
            mascot of the franchise and was chosen for its broad appeal to both boys and girls.
            Magikarp, despite being one of the weakest Pokémon, evolves into Gyarados, one of the
            strongest. Eevee has more evolution options than any other Pokémon, with 8 different
            Eeveelutions as of Generation 9. Arceus is considered the creator of the Pokémon
            universe according to the lore. The Pokédex number 1 belongs to Bulbasaur, while
            number 1,025 currently belongs to the most recent Pokémon introduced in Generation 9.
            Our <Link href="/pokemon-of-the-day/">Pokémon of the Day</Link> feature highlights a
            different Pokémon every day, so check back daily to learn something new.
          </p>
        </section>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
