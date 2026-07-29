"use client";

import { BookOpen, ArrowRight, Clock } from "lucide-react";

const ARTICLES = [
  {
    title: "Top 10 Strongest Legendary Pokemon of All Time",
    excerpt:
      "From Mewtwo to Arceus, we rank the most powerful legendaries by base stat totals, movepool, and competitive viability across every generation.",
    category: "Rankings",
    readTime: "8 min",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "How to Build a Balanced Pokemon Team",
    excerpt:
      "Learn the fundamentals of team building — type synergy, role distribution, speed tiers, and entry hazards — with examples from our random team generator.",
    category: "Guide",
    readTime: "12 min",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Every Pokemon Generation Ranked",
    excerpt:
      "Generation I through IX: which region added the most iconic Pokemon, the best mechanics, and the most memorable adventures? Our definitive ranking.",
    category: "Listicle",
    readTime: "10 min",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Type Chart Explained: Strengths, Weaknesses & Immunities",
    excerpt:
      "Master the 18-type system with our complete type chart. Memorize super-effective matchups, resistances, and immunities in under 10 minutes.",
    category: "Reference",
    readTime: "6 min",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Nuzlocke Challenge: Rules, Tips & Random Pokemon",
    excerpt:
      "The complete Nuzlocke guide. We explain the rules, share our top survival tips, and show you how to use the randomizer to pick your starter.",
    category: "Challenge",
    readTime: "9 min",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    title: "Shiny Hunting Guide: Odds, Methods & Best Targets",
    excerpt:
      "Everything about shiny Pokemon — base odds, Masuda method, Chain Fishing, and which shinies are actually worth the grind.",
    category: "Guide",
    readTime: "11 min",
    gradient: "from-yellow-500 to-amber-500",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="scroll-mt-20">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-semibold mb-3">
          <BookOpen className="h-3.5 w-3.5" />
          POKEMON BLOG
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Pokemon Guides &amp; Articles
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Tips, rankings, and challenges for every Pokemon trainer — from beginners to
          competitive players.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ARTICLES.map((article, i) => (
          <article
            key={i}
            className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div
              className={`relative aspect-[16/9] bg-gradient-to-br ${article.gradient} flex items-center justify-center overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_50%,white_1px,transparent_1px)] [background-size:24px_24px]" />
              <span className="relative px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold">
                {article.category}
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Clock className="h-3 w-3" />
                {article.readTime} read
              </div>
              <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
