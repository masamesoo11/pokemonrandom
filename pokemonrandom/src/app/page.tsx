"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/hero-section";
import { RandomPokemonGenerator } from "@/components/random-pokemon-generator";
import { PokemonTeamBuilder } from "@/components/pokemon-team-builder";
import { PokemonTypeWheel } from "@/components/pokemon-type-wheel";
import { GuessPokemonGame } from "@/components/guess-pokemon-game";
import { PokemonRandomizer } from "@/components/pokemon-randomizer";
import { PokemonComparison } from "@/components/pokemon-comparison";
import { TypeChartSection } from "@/components/type-chart-section";
import { PokemonOfDay } from "@/components/pokemon-of-day";
import { FaqSection } from "@/components/faq-section";
import { BlogSection } from "@/components/blog-section";
import {
  HeaderBannerAd,
  InContentAd,
  FooterAd,
  MobileAnchorAd,
} from "@/components/ad-slot";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1">
        <HeroSection />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-20 pb-20">
          <PokemonOfDay />
          <RandomPokemonGenerator />

          <InContentAd />

          <SectionDivider label="Build Your Team" emoji="⚔️" />
          <PokemonTeamBuilder />

          <SectionDivider label="Spin The Wheel" emoji="🎡" />
          <PokemonTypeWheel />

          <InContentAd />

          <SectionDivider label="Mini Game" emoji="🎮" />
          <GuessPokemonGame />

          <SectionDivider label="Advanced Filters" emoji="🎚️" />
          <PokemonRandomizer />

          <SectionDivider label="Head To Head" emoji="🆚" />
          <PokemonComparison />

          <SectionDivider label="Type Matchups" emoji="📊" />
          <TypeChartSection />

          <SectionDivider label="Learn More" emoji="📚" />
          <BlogSection />
          <FaqSection />
        </div>
      </main>
      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />
    </div>
  );
}

function SectionDivider({ label, emoji }: { label: string; emoji: string }) {
  return (
    <div className="flex items-center gap-4 select-none">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
        <span className="text-lg">{emoji}</span>
        {label}
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
