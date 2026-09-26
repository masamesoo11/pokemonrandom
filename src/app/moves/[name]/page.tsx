import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { MoveDetailView } from "@/components/move-detail-view";
import { fetchMove, fetchMoveList, formatMoveName, extractPokemonIdFromUrl } from "@/lib/move-api";
import { getSpriteUrl } from "@/lib/pokemon-api";

interface PageProps {
  params: Promise<{ name: string }>;
}

// Pre-generate all ~920 move page slugs (just names, one API call at build time).
// The actual move data is fetched client-side after hydration.
export async function generateStaticParams() {
  try {
    const list = await fetchMoveList(1000);
    return list.results.map((m) => ({ name: m.name }));
  } catch (e) {
    console.error("Failed to fetch move list for static params:", e);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name: slug } = await params;
  const displayName = formatMoveName(slug);
  const lowerName = displayName.toLowerCase();
  const canonical = `https://pokemonrandom.com/moves/${slug}/`;
  // Tiered title template: keeps titles <= 60 chars even for the longest
  // official move names (Z-Moves like "Soul-Stealing 7-Star Strike").
  const title =
    displayName.length <= 13
      ? `${displayName} Move — Power, Accuracy & Pokémon | PokéRandom`
      : displayName.length <= 22
        ? `${displayName} Move — Power & Accuracy | PokéRandom`
        : `${displayName} Move | PokéRandom`;
  const description = `${displayName} is a Pokémon move. View its power, accuracy, PP, type, effect, and all Pokémon that can learn it.`;

  return {
    title,
    description,
    keywords: [
      `${slug} move`,
      `${lowerName} pokemon move`,
      `${lowerName} power`,
      `${lowerName} accuracy`,
      `${lowerName} pokemon list`,
      "pokemon move database",
      "pokemon move stats",
    ],
    alternates: { canonical },
    openGraph: {
      images: [
        {
          url: "https://pokemonrandom.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "PokéRandom — Pokémon Tools & Database",
        },
      ],
      title,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const breadcrumbSchema = (slug: string, displayName: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "Moves", item: "https://pokemonrandom.com/moves/" },
    { "@type": "ListItem", position: 3, name: displayName, item: `https://pokemonrandom.com/moves/${slug}/` },
  ],
});

const moveSchema = (slug: string, displayName: string) => ({
  "@context": "https://schema.org",
  "@type": "Thing",
  name: displayName,
  url: `https://pokemonrandom.com/moves/${slug}/`,
  description: `Pokémon move ${displayName}. View power, accuracy, PP, type, effect, and Pokémon that can learn it.`,
});

export default async function MoveDetailPage({ params }: PageProps) {
  const { name: slug } = await params;
  const displayName = formatMoveName(slug);

  // Server-side fetch at build time — powers the crawlable "Pokémon that can
  // learn this move" link section (the client view does NOT render these
  // links in the static HTML).
  let learners: { id: number; name: string }[] = [];
  let learnerOverflow = 0;
  try {
    const move = await fetchMove(slug);
    const MAX_LEARNERS = 60;
    const all = (move.learned_by_pokemon || [])
      .map((p) => ({ id: extractPokemonIdFromUrl(p.url), name: p.name }))
      .filter((p) => Number.isInteger(p.id) && p.id >= 1 && p.id <= 1025)
      .sort((a, b) => a.id - b.id);
    learnerOverflow = Math.max(0, all.length - MAX_LEARNERS);
    learners = all.slice(0, MAX_LEARNERS);
  } catch {
    // If the API call fails we simply render without the learner links.
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/moves/" className="hover:text-foreground">Moves</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{displayName}</span>
          </nav>

          {/* H1 for SEO (MoveDetailView fetches client-side, so we add H1 in SSR) */}
          <h1 className="text-4xl font-bold tracking-tight mb-4">{displayName} Move Guide</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Complete guide to the Pokémon move {displayName}. View its power, accuracy, PP, type,
            effect description, and the full list of Pokémon that can learn {displayName} through
            leveling up, TMs, breeding, and move tutors. Free Pokémon move database with detailed
            stats and competitive analysis.
          </p>

          <InContentAd />

          {/* Client-side fetched move detail */}
          <MoveDetailView slug={slug} />

          {/* Server-rendered crawlable links — Pokémon that can learn this move */}
          {learners.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">
                Pokémon That Can Learn {displayName}
              </h2>
              <p className="text-muted-foreground mb-4">
                The following Pokémon can learn {displayName} through leveling up, TMs,
                breeding, or move tutors. Click any Pokémon to view its full Pokédex entry
                with stats, types, and abilities.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {learners.map((p) => (
                  <Link
                    key={p.id}
                    href={`/pokemon/${p.id}/`}
                    className="flex flex-col items-center p-2 rounded-xl border border-border bg-card hover:border-primary hover:shadow-sm transition-all"
                  >
                    <img
                      src={getSpriteUrl(p.id)}
                      alt={`${p.name.replace(/-/g, " ")} Pokémon`}
                      className="w-14 h-14 object-contain"
                      width={96} height={96} loading="lazy"
                    />
                    <span className="text-[11px] text-muted-foreground mt-1 text-center capitalize">#{String(p.id).padStart(4, "0")}</span>
                  </Link>
                ))}
              </div>
              {learnerOverflow > 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  …and {learnerOverflow} more Pokémon can learn {displayName}. Use our{" "}
                  <Link href="/pokemon-search/" className="text-primary hover:underline">Pokémon Search</Link>{" "}
                  tool to explore the complete list.
                </p>
              )}
            </section>
          )}

          {/* SEO Content for move detail */}
          <section className="mt-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>About {displayName}</h2>
            <p>
              {displayName} is a Pokémon move available in the main series games. Each Pokémon move
              has specific attributes including type, category (Physical, Special, or Status), base
              power, accuracy, and PP (Power Points). The move {displayName} can be learned by
              various Pokémon through different methods such as leveling up, Technical Machines
              (TMs), breeding, or move tutors. Understanding the stats and effects of {displayName}
              is essential for building effective competitive teams and completing your Pokédex.
            </p>
            <p>
              To use {displayName} effectively in battle, consider its type matchup against the
              opponent. Moves that are super effective against the opponent type deal 2x damage,
              while not very effective moves deal 0.5x damage. Same Type Attack Bonus (STAB) gives
              a 1.5x damage boost when a Pokémon of the same type uses {displayName}. Check our{" "}
              <Link href="/type-chart/">Type Chart</Link> for the full effectiveness matrix and use
              our <Link href="/pokemon-compare/">Pokémon Comparison Tool</Link> to find the best
              Pokémon for this move.
            </p>
            <p>
              Browse our complete <Link href="/moves/">moves database</Link> with all 920+ moves
              from every generation, or use our <Link href="/random-pokemon/">random Pokémon
              generator</Link> to discover new Pokémon that can learn {displayName}.
            </p>
          </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(slug, displayName)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(moveSchema(slug, displayName)) }}
      />
    </div>
  );
}
