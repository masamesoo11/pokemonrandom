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

          <h1 className="text-4xl font-bold tracking-tight mb-4">Pokémon Guides, Tips, and Strategy Articles</h1>
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

          {/* SEO Content — improves text-HTML ratio */}
          <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
            <h2>Our Pokémon Blog Content</h2>
            <p>Our blog covers a wide range of Pokémon topics, from game specific guides to general strategy articles. We have guides for classic games like Pokémon FireRed, Pokémon Emerald, and Pokémon Black and White, as well as newer games like Pokémon Scarlet and Violet. Our guides include walkthroughs, tips, and strategies for getting the most out of your Pokémon journey. We also cover competitive Pokémon with articles on team building, tier lists, and battle strategies. For shiny hunters, we have a comprehensive shiny hunting guide that covers all the methods and odds for finding shiny Pokémon in each generation. Whether you are a casual fan or a hardcore competitive player, our blog has content that will help you get more out of the Pokémon franchise.</p>
            <h3>Pokémon Game Guides and Walkthroughs</h3>
            <p>We have in depth guides for every main series Pokémon game, from the original Pokémon Red, Blue, and Green to the latest Pokémon Scarlet and Violet. Our guides cover the main story, side quests, post game content, legendary encounters, and tips for building a strong team. We also have guides for spin off games like Pokémon Mystery Dungeon, Pokémon Legends Arceus, and Pokémon GO. Each guide is written by experienced Pokémon players who have spent hundreds of hours exploring every aspect of the games. Whether you are stuck on a particular gym leader, looking for a specific Pokémon, or just want to get the most out of your playthrough, our guides have you covered. Check out our blog for the latest guides and articles.</p>
            <h3>Competitive Pokémon Strategy Articles</h3>
            <p>Our competitive Pokémon articles cover everything you need to know to get started in the competitive scene. We have articles on team building, covering topics like type synergy, role distribution, and move selection. We cover the main competitive formats, including VGC doubles, Singles, and the various Smogon tiers like OverUsed, UnderUsed, and RarelyUsed. Our tier list articles discuss the best Pokémon in each format and why they are ranked where they are. We also have articles on specific competitive strategies like weather teams, Trick Room teams, and entry hazard stacking. Whether you are a beginner looking to get into competitive Pokémon or an experienced player looking to refine your skills, our articles have something for you.</p>
            <h3>Pokémon Lore and Trivia</h3>
            <p>The Pokémon franchise has a rich lore that spans multiple games, an animated series, movies, and manga. Our lore articles dive deep into the mythology of the Pokémon world, exploring topics like the creation trio of Dialga, Palkia, and Giratina, the role of Arceus as the creator of the universe, and the stories behind the legendary Pokémon of each region. We also have trivia articles that cover fun facts about the franchise, like the origin of Pokémon names, the design inspirations behind popular Pokémon, and the history of the Pokémon Company. Our lore and trivia articles are perfect for fans who want to deepen their knowledge of the Pokémon world beyond just the gameplay mechanics.</p>
          </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
