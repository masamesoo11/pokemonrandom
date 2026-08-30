import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { AbilityDetailView } from "@/components/ability-detail-view";
import { fetchAbilityList, formatAbilityName } from "@/lib/ability-api";

interface PageProps {
  params: Promise<{ name: string }>;
}

// Pre-generate all ~298 ability page slugs (just names, one API call at build time).
export async function generateStaticParams() {
  try {
    const list = await fetchAbilityList(500);
    return list.results.map((a) => ({ name: a.name }));
  } catch (e) {
    console.error("Failed to fetch ability list for static params:", e);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name: slug } = await params;
  const displayName = formatAbilityName(slug);
  const lowerName = displayName.toLowerCase();
  const canonical = `https://pokemonrandom.com/abilities/${slug}/`;
  const title = `${displayName} Ability — Effect, Pokémon & Strategy | PokéRandom`;
  const description = `${displayName} is a Pokémon ability. View its effect, flavor text, and all Pokémon that can have ${displayName} as a regular or hidden ability. Complete ability database.`;

  return {
    title,
    description,
    keywords: [
      `${slug} ability`,
      `${lowerName} pokemon ability`,
      `${lowerName} effect`,
      `${lowerName} pokemon list`,
      `${lowerName} hidden ability`,
      "pokemon ability database",
      "pokemon abilities list",
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
    { "@type": "ListItem", position: 2, name: "Abilities", item: "https://pokemonrandom.com/abilities/" },
    { "@type": "ListItem", position: 3, name: displayName, item: `https://pokemonrandom.com/abilities/${slug}/` },
  ],
});

const abilitySchema = (slug: string, displayName: string) => ({
  "@context": "https://schema.org",
  "@type": "Thing",
  name: displayName,
  url: `https://pokemonrandom.com/abilities/${slug}/`,
  description: `Pokémon ability ${displayName}. View effect, flavor text, and Pokémon that can have this ability.`,
});

export default async function AbilityDetailPage({ params }: PageProps) {
  const { name: slug } = await params;
  const displayName = formatAbilityName(slug);

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
            <Link href="/abilities/" className="hover:text-foreground">Abilities</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{displayName}</span>
          </nav>

          <InContentAd />

          {/* Client-side fetched ability detail */}
          <AbilityDetailView slug={slug} />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(abilitySchema(slug, displayName)) }}
      />
    </div>
  );
}
