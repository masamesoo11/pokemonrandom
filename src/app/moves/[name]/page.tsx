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
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/moves/" className="hover:text-foreground">Moves</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{displayName}</span>
          </nav>

          <InContentAd />

          {/* Client-side fetched move detail */}
          <MoveDetailView slug={slug} />
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
