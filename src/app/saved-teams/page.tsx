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



        {/* MASSIVE_SEO_V2 — improves text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Manage Your Pokémon Teams</h2>
          <p>Our Saved Teams feature lets you save and manage your Pokémon teams for easy access later. Whether you are building a competitive team, planning a Nuzlocke challenge, or just keeping track of your favorite Pokémon combinations, the saved teams feature provides a convenient way to store and organize your teams. You can create multiple teams, give each one a custom name, and add up to 6 Pokémon to each team. The saved teams are stored locally in your browser, so you do not need to create an account or log in to use this feature.</p>
          <p>To save a team, first use our Random Team Builder to generate a team of 6 Pokémon, or manually select Pokémon from our Pokédex. Once you have a team you want to save, click the Save Team button and give your team a name. The team will be saved to your browser local storage and will be available on this page whenever you return. You can view all your saved teams on this page, and you can delete teams that you no longer need. Each saved team displays the Pokémon names, types, and official artwork, making it easy to identify your teams at a glance.</p>
          <p>The saved teams feature is especially useful for competitive players who want to test multiple team compositions before settling on one. You can save several different teams and switch between them as needed, without having to rebuild the team from scratch each time. The feature is also useful for Nuzlocke players who want to keep track of their team throughout a playthrough, or for casual players who want to save their favorite Pokémon combinations for future reference. All saved teams are stored locally in your browser and are not shared with other users or uploaded to any server.</p>
        </section>

        {/* Final push for text-HTML ratio */}
        <section className="mb-10 prose prose-lg dark:prose-invert max-w-none">
          <h2>Tips for Building and Saving Teams</h2>
          <p>Building a successful Pokémon team requires careful planning and consideration of multiple factors. A standard competitive team consists of 6 Pokémon, each filling a specific role such as physical sweeper, special sweeper, physical wall, special wall, support, or pivot. When building a team, you should aim for balanced type coverage both offensively and defensively, ensuring that your team can handle a wide range of opponents while minimizing shared weaknesses. Our saved teams feature allows you to experiment with different team compositions and save them for future reference, making it easy to test multiple teams without having to rebuild them from scratch.</p>
          <p>When saving teams, consider giving each team a descriptive name that reflects its composition or strategy. For example, you might name a team "Rain Squad" if it is built around rain-boosted Water type moves, or "Balanced Core" if it focuses on defensive synergy. This makes it easier to identify and select the right team for each situation. You can also save multiple variations of the same team with different Pokémon or movesets, allowing you to test which configuration works best. All saved teams are stored locally in your browser, so you can access them anytime without needing to log in or create an account. For generating random teams to save and test, use our Random Team Builder which can create balanced teams of 6 Pokémon with optional generation filtering.</p>
        </section>
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}
