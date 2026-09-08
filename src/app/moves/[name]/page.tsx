import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { MoveDetailView } from "@/components/move-detail-view";
import { fetchMoveList, formatMoveName } from "@/lib/move-api";

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
  const title = `${displayName} Move — Power, Accuracy & Pokémon | PokéRandom`;
  const description = `${displayName} is a Pokémon move. View its power, accuracy, PP, type, effect, and all Pokémon that can learn it. Complete move database with stats and competitive analysis.`;

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
