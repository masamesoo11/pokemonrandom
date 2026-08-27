import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";
import { SavedTeamsManager } from "@/components/saved-teams-manager";


export const metadata: Metadata = {
  title: "My Saved Teams \u2014 Manage Pok\u00e9mon Teams | Pok\u00e9Random",
  description: "Save, manage, export, and import your Pok\u00e9mon teams. Build teams with our Random Team Builder and store them for later. Free team management tool.",
  keywords: ["saved teams", "pokemon team manager", "save pokemon team", "team export import", "pokemon team storage"],
  alternates: { canonical: "https://pokemonrandom.com/saved-teams/" },
  openGraph: {
    title: "My Saved Teams \u2014 Manage Pok\u00e9mon Teams | Pok\u00e9Random",
    description: "Save, manage, export, and import your Pok\u00e9mon teams. Build teams with our Random Team Builder and store them for later. Free team management tool.",
    url: "https://pokemonrandom.com/saved-teams/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Saved Teams \u2014 Manage Pok\u00e9mon Teams | Pok\u00e9Random",
    description: "Save, manage, export, and import your Pok\u00e9mon teams. Build teams with our Random Team Builder and store them for later. Free team management tool.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "My Saved Teams", item: "https://pokemonrandom.com/saved-teams/" },
  ],
};

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">My Saved Teams</span>
          </nav>


          <h1 className="text-4xl font-bold tracking-tight mb-4">My Saved Teams</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Save and manage your Pokémon teams. Build a team with our{" "}
            <Link href="/random-team/" className="text-primary">Team Builder</Link>{" "}
            and save it here for later reference. Export teams as JSON to share with
            friends or import teams created by others.
          </p>

          <SavedTeamsManager />

          <InContentAd />

          <section className="mt-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>How Saved Teams Work</h2>
            <p>
              Our Saved Teams feature lets you store multiple Pokémon teams in your browser&rsquo;s
              local storage. After generating a team with our{" "}
              <Link href="/random-team/" className="text-primary">Random Team Builder</Link>,
              you can save it with a custom name. Saved teams persist across sessions, so
              you can come back later to review or modify them.
            </p>
            <p>
              Each saved team includes the six Pokémon&rsquo;s IDs, names, and the date the
              team was created. You can rename, delete, or export teams at any time. The
              export feature generates a JSON file that you can share with friends or
              back up to your computer. The import feature lets you load teams from JSON
              files, making it easy to share team compositions.
            </p>
            <p>
              Because teams are stored in your browser&rsquo;s local storage, they are private
              to you and never sent to our servers. Clearing your browser data will remove
              your saved teams, so be sure to export any teams you want to keep before
              clearing your browser. We&rsquo;re working on adding cloud sync in a future update.
            </p>
          </section>


        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
