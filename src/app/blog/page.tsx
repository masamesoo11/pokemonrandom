import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { getAllPosts } from "@/lib/blog-content-loader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pokémon Blog — Guides, Tips & Strategy | PokéRandom",
  description:
    "In-depth Pokémon guides, Nuzlocke strategy, shiny hunting tips, and complete Pokédex entries. Browse our collection of articles for Pokémon fans of all levels.",
  keywords: [
    "pokemon blog",
    "pokemon guides",
    "pokemon tips",
    "nuzlocke guide",
    "shiny hunting",
    "pokemon strategy",
  ],
  alternates: { canonical: "https://pokemonrandom.com/blog/" },
  openGraph: {
    title: "Pokémon Blog — Guides, Tips & Strategy | PokéRandom",
    description:
      "In-depth Pokémon guides, Nuzlocke strategy, shiny hunting tips, and complete Pokédex entries.",
    url: "https://pokemonrandom.com/blog/",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Blog</span>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight mb-4">Pokémon Blog</h1>
          <p className="text-lg text-muted-foreground mb-8">
            In-depth guides, strategy articles, and complete Pokédex entries for Pokémon fans of all levels.
            Browse {posts.length} articles covering Nuzlocke challenges, shiny hunting, competitive battles,
            and game-specific guides.
          </p>

          {/* Category sections */}
          {categories.map((category) => {
            const categoryPosts = posts.filter((p) => p.category === category);
            return (
              <section key={category} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}/`}
                      className="block p-6 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition-all"
                    >
                      <div className="text-xs text-muted-foreground mb-2">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        · {post.author}
                      </div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 text-sm text-primary font-semibold">
                        Read more →
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          <InContentAd />
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
