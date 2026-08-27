import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, InContentAd, FooterAd, MobileAnchorAd } from "@/components/ad-slot";


export const metadata: Metadata = {
  title: "API Documentation \u2014 Pok\u00e9API Integration Guide | Pok\u00e9Random",
  description: "Complete API documentation for Pok\u00e9Random. Learn how we use Pok\u00e9API to fetch Pok\u00e9mon data, with code examples for developers building their own Pok\u00e9mon applications.",
  keywords: ["pokemon api", "pokeapi documentation", "pokemon api docs", "pokemon data api", "pokeapi integration"],
  alternates: { canonical: "https://pokemonrandom.com/api-docs/" },
  openGraph: {
    title: "API Documentation \u2014 Pok\u00e9API Integration Guide | Pok\u00e9Random",
    description: "Complete API documentation for Pok\u00e9Random. Learn how we use Pok\u00e9API to fetch Pok\u00e9mon data, with code examples for developers building their own Pok\u00e9mon applications.",
    url: "https://pokemonrandom.com/api-docs/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Documentation \u2014 Pok\u00e9API Integration Guide | Pok\u00e9Random",
    description: "Complete API documentation for Pok\u00e9Random. Learn how we use Pok\u00e9API to fetch Pok\u00e9mon data, with code examples for developers building their own Pok\u00e9mon applications.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pokemonrandom.com/" },
    { "@type": "ListItem", position: 2, name: "API Documentation", item: "https://pokemonrandom.com/api-docs/" },
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
            <span className="text-foreground">API Documentation</span>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight mb-4">API Documentation</h1>
          <p className="text-lg text-muted-foreground mb-8">
            PokéRandom uses the open-source PokéAPI to fetch Pokémon data. This page
            documents the API endpoints we use and provides examples for developers who
            want to build their own Pokémon applications.
          </p>

          <section className="rounded-2xl border border-border bg-card p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">PokéAPI Overview</h2>
            <p className="mb-3">
              <a href="https://pokeapi.co" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                PokéAPI
              </a>{" "}
              is a free, open-source REST API that provides data about all 1,025 Pokémon
              from the main series games. It requires no authentication and has no rate
              limits (though we recommend caching responses to be respectful).
            </p>
            <p>
              Base URL: <code className="bg-secondary px-2 py-0.5 rounded text-sm">https://pokeapi.co/api/v2</code>
            </p>
          </section>

          <InContentAd />

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Endpoints We Use</h2>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold mb-2">GET /pokemon/:id</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Fetch a single Pokémon by its National Pokédex ID (1-1025). Returns base
                  stats, types, abilities, sprites, and cries.
                </p>
                <pre className="bg-secondary/50 p-3 rounded text-xs overflow-x-auto"><code>fetch("https://pokeapi.co/api/v2/pokemon/25")
  .then(r =&gt; r.json())
  .then(pokemon =&gt; console.log(pokemon.name)); // "pikachu"</code></pre>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold mb-2">GET /pokemon-species/:id</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Fetch species data including flavor text, evolution chain URL, generation,
                  gender rate, and legendary/mythical status.
                </p>
                <pre className="bg-secondary/50 p-3 rounded text-xs overflow-x-auto"><code>fetch("https://pokeapi.co/api/v2/pokemon-species/25")
  .then(r =&gt; r.json())
  .then(species =&gt; console.log(species.is_legendary)); // false</code></pre>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold mb-2">GET /evolution-chain/:id</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Fetch the full evolution chain for a Pokémon. Returns a nested tree of
                  species and their evolution details (level, item, trigger).
                </p>
                <pre className="bg-secondary/50 p-3 rounded text-xs overflow-x-auto"><code>fetch("https://pokeapi.co/api/v2/evolution-chain/10")
  .then(r =&gt; r.json())
  .then(chain =&gt; console.log(chain.chain.species.name)); // "bulbasaur"</code></pre>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold mb-2">GET /type/:name</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Fetch all Pokémon of a specific type. Returns a list of Pokémon that have
                  the specified type as either their primary or secondary type.
                </p>
                <pre className="bg-secondary/50 p-3 rounded text-xs overflow-x-auto"><code>fetch("https://pokeapi.co/api/v2/type/fire")
  .then(r =&gt; r.json())
  .then(type =&gt; console.log(type.pokemon.length)); // ~85 fire types</code></pre>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Caching Strategy</h2>
            <p className="mb-3">
              PokéRandom caches all API responses for 24 hours using Next.js&rsquo;s built-in
              <code className="bg-secondary px-1.5 py-0.5 rounded text-sm">fetch()</code> caching:
            </p>
            <pre className="bg-secondary/50 p-3 rounded text-xs overflow-x-auto"><code>{`fetch(url, { next: { revalidate: 86400 } }); // 24 hours`}</code></pre>
            <p className="mt-3">
              This reduces load on PokéAPI&rsquo;s servers and makes our pages load faster.
              We also maintain an in-memory cache for the most common requests during a
              single build cycle.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Sprite Artwork URLs</h2>
            <p className="mb-3">
              Pokémon sprites and official artwork are served from the PokeAPI/sprites
              GitHub repository. These URLs follow predictable patterns and don&rsquo;t require
              an API call:
            </p>
            <pre className="bg-secondary/50 p-3 rounded text-xs overflow-x-auto"><code>{`// Official artwork (high quality)
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png

// Official artwork (shiny)
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/{id}.png

// Pixel sprite (small, fast loading)
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png

// Pokémon cry (audio)
https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/{id}.ogg`}</code></pre>
          </section>

          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Building Your Own Pokémon App</h2>
            <p>
              If you want to build your own Pokémon application using PokéAPI, we recommend
              using TypeScript with a typed fetcher. PokéRandom&rsquo;s{" "}
              <code className="bg-secondary px-1.5 py-0.5 rounded text-sm">pokemon-api.ts</code>{" "}
              module (available in our{" "}
              <a href="https://github.com/masamesoo11/pokemonrandom" className="text-primary" target="_blank" rel="noopener noreferrer">
                GitHub repository
              </a>) provides a complete, typed wrapper around the API with caching, error
              handling, and helper functions for filtering by generation, type, and
              legendary status.
            </p>
            <p>
              Always cache API responses, as PokéAPI is a community-maintained project and
              excessive requests can slow it down for everyone. Consider using a CDN like
              Cloudflare to cache responses at the edge. And if you build something cool
              with PokéAPI, consider donating to the project on their website.
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
