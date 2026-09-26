import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { AbilityDetailView } from "@/components/ability-detail-view";
import { fetchAbility, fetchAbilityList, formatAbilityName } from "@/lib/ability-api";
import { getSpriteUrl } from "@/lib/pokemon-api";

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

  // Server-side fetch at build time — powers the crawlable "Pokémon with
  // this ability" link section (the client view does NOT render these
  // links in the static HTML).
  let holders: { id: number; name: string }[] = [];
  let holderOverflow = 0;
  try {
    const ability = await fetchAbility(slug);
    const MAX_HOLDERS = 48;
    const all = (ability.pokemon || [])
      .map((e) => {
        const url = e.pokemon?.url || "";
        const match = url.match(/\/pokemon\/([0-9]+)\//);
        const pid = match ? parseInt(match[1], 10) : NaN;
        return { id: pid, name: e.pokemon?.name || "" };
      })
      .filter((p) => Number.isInteger(p.id) && p.id >= 1 && p.id <= 1025)
      .sort((a, b) => a.id - b.id);
    holderOverflow = Math.max(0, all.length - MAX_HOLDERS);
    holders = all.slice(0, MAX_HOLDERS);
  } catch {
    // If the API call fails we simply render without the holder links.
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
            <Link href="/abilities/" className="hover:text-foreground">Abilities</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{displayName}</span>
          </nav>

          {/* H1 for SEO (AbilityDetailView fetches client-side, so we add H1 in SSR) */}
          <h1 className="text-4xl font-bold tracking-tight mb-4">{displayName} Ability Guide</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Complete guide to the Pokémon ability {displayName}. View its effect description, flavor
            text, and the full list of Pokémon that can have {displayName} as a standard or hidden
            ability. Free Pokémon ability database with detailed competitive analysis.
          </p>

          <InContentAd />

          {/* Client-side fetched ability detail */}
          <AbilityDetailView slug={slug} />

          {/* Server-rendered crawlable links — Pokémon with this ability */}
          {holders.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Pokémon With the {displayName} Ability</h2>
              <p className="text-muted-foreground mb-4">
                These Pokémon can have {displayName} as a standard or hidden ability. Click any
                Pokémon to view its full Pokédex entry with stats, types, and movepool.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {holders.map((p) => (
                  <Link
                    key={p.id}
                    href={`/pokemon/${p.id}/`}
                    className="flex flex-col items-center p-2 rounded-xl border border-border bg-card hover:border-primary hover:shadow-sm transition-all"
                  >
                    <img
                      src={getSpriteUrl(p.id)}
                      alt={`${p.name.replace(/-/g, " ")} Pokémon`}
                      className="w-14 h-14 object-contain"
                      loading="lazy"
                    />
                    <span className="text-[11px] text-muted-foreground mt-1 text-center capitalize">#{String(p.id).padStart(4, "0")}</span>
                  </Link>
                ))}
              </div>
              {holderOverflow > 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  …and {holderOverflow} more Pokémon can have this ability. Use our{" "}
                  <Link href="/pokemon-search/" className="text-primary hover:underline">Pokémon Search</Link>{" "}
                  tool to explore the complete list.
                </p>
              )}
            </section>
          )}

          {/* SEO Content for ability detail */}
          <section className="mt-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>About the {displayName} Ability</h2>
            <p>
              {displayName} is a Pokémon ability that can be possessed by various Pokémon across
              different generations. Abilities are passive effects that influence battles by
              providing various bonuses, immunities, or triggered effects. The ability {displayName}
              may be a standard ability or a hidden ability, depending on the Pokémon species.
              Hidden abilities are typically rarer and often more powerful than standard abilities.
            </p>
            <p>
              Understanding how {displayName} works is essential for competitive team building.
              Some abilities activate automatically when the Pokémon enters battle, while others
              are triggered by specific conditions such as being hit by certain move types or
              weather effects. Check which Pokémon can have {displayName} in the list above, and
              use our <Link href="/pokemon-compare/">Pokémon Comparison Tool</Link> to compare
              Pokémon with this ability.
            </p>
            <p>
              Browse our complete <Link href="/abilities/">abilities database</Link> with all 298+
              abilities from every generation, or explore our <Link href="/random-team/">team
              builder</Link> to create teams that synergize with the {displayName} ability.
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(abilitySchema(slug, displayName)) }}
      />
    </div>
  );
}
