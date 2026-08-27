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
        </section>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
