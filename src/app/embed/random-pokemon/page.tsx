import type { Metadata } from "next";
import { EmbedRandomGenerator } from "@/components/embed/random-generator";

export const metadata: Metadata = {
  title: "Random Pokémon Widget — PokémonRandom",
  description: "Embeddable random Pokémon generator widget.",
  robots: { index: false, follow: true },
};

export default function EmbedRandomPokemonPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hide the site-wide cookie banner inside embeds (iframes have no use for it) */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "body > div[role='dialog'][aria-labelledby='cookie-banner-title']{display:none!important}",
        }}
      />
      <main className="max-w-[560px] mx-auto">
        <EmbedRandomGenerator />
      </main>
    </div>
  );
}
