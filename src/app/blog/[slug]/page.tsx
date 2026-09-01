import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { getAllPosts, getPostBySlug } from "@/lib/blog-content-loader";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  const canonical = `https://pokemonrandom.com/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical },
    openGraph: {
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const breadcrumbSchema = (post: { title: string; slug: string }) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://pokemonrandom.com/blog/" },
    { "@type": "ListItem", position: 3, name: post.title, item: `https://pokemonrandom.com/blog/${post.slug}/` },
  ],
});

const articleSchema = (post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  modifiedAt: string;
  author: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  url: `https://pokemonrandom.com/blog/${post.slug}/`,
  datePublished: post.publishedAt,
  dateModified: post.modifiedAt,
  author: { "@type": "Organization", name: post.author },
  publisher: {
    "@type": "Organization",
    name: "Pokemon Random",
    url: "https://pokemonrandom.com",
  },
});


const faqSchema = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
});

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const publishDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog/" className="hover:text-foreground">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="text-sm text-muted-foreground mb-2">
              {publishDate} · by {post.author} · {post.category}
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{post.h1 || post.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: post.intro }} />
          </header>

          <HeaderBannerAd />

          {/* Body */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mt-8
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
              prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:my-4 prose-ol:my-4 prose-li:mb-1"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <InContentAd />

          {/* Related tools CTA */}
          <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Try Our Free Pokémon Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <Link href="/random-pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Random Pokémon</div>
                <div className="text-muted-foreground">Generate any Pokémon</div>
              </Link>
              <Link href="/random-team/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Team Builder</div>
                <div className="text-muted-foreground">Build a team of 6</div>
              </Link>
              <Link href="/pokemon-quiz/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Pokémon Quiz</div>
                <div className="text-muted-foreground">Test your knowledge</div>
              </Link>
              <Link href="/type-chart/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Type Chart</div>
                <div className="text-muted-foreground">All 18 types</div>
              </Link>
              <Link href="/shiny-pokemon/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Shiny Checker</div>
                <div className="text-muted-foreground">Browse shiny forms</div>
              </Link>
              <Link href="/pokemon-randomizer/" className="block p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="font-semibold">Randomizer</div>
                <div className="text-muted-foreground">Nuzlocke filters</div>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          {post.faq && post.faq.length > 0 && (
            <section className="mt-12 mb-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {post.faq.map((item, i) => (
                  <div key={i} className="border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{item.q}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* RELATED_ARTICLES_V1 — internal links to other blog posts */}
          <section className="mt-12 mb-8">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(() => {
                const allPosts = getAllPosts();
                const filtered = allPosts.filter((p) => p.slug !== post.slug).slice(0, 4);
                return filtered.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}/`} className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                    <div className="text-xs text-muted-foreground mb-1">{p.category}</div>
                    <div className="font-semibold mb-1">{p.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</div>
                  </Link>
                ));
              })()}
            </div>
          </section>



          {/* Back to blog */}
          <div className="mt-8 text-center">
            <Link href="/blog/" className="inline-flex items-center gap-2 text-primary hover:underline">
              ← Back to all articles
            </Link>
          </div>
        </article>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
      />

      {post.faq && post.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(post.faq)) }}
        />
      )}
    </div>
  );
}
