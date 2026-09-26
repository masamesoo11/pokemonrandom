import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CodeBlock } from "@/components/code-block";
import {
  HeaderBannerAd,
  InContentAd,
  FooterAd,
  MobileAnchorAd,
} from "@/components/ad-slot";

export const metadata: Metadata = {
  title: "Free Pokémon Widgets for Your Website | PokéRandom",
  description:
    "Embed a free random Pokémon generator or type effectiveness widget on your blog, wiki, or forum. No signup, no API key, lightweight and mobile-friendly.",
  keywords: [
    "pokemon widget",
    "pokemon embed widget",
    "random pokemon generator embed",
    "pokemon type chart embed",
    "free pokemon widget for website",
    "pokemon widget for blog",
    "wordpress pokemon widget",
  ],
  alternates: { canonical: "https://pokemonrandom.com/widgets/" },
  openGraph: {
    title: "Free Pokémon Widgets for Your Website | PokéRandom",
    description:
      "Embed a free random Pokémon generator or type effectiveness widget on your blog, wiki, or forum. No signup, no API key, lightweight and mobile-friendly.",
    url: "https://pokemonrandom.com/widgets/",
    type: "website",
    images: [
      {
        url: "https://pokemonrandom.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PokéRandom — Pokémon Tools & Database",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Pokémon Widgets for Your Website | PokéRandom",
    description:
      "Embed a free random Pokémon generator or type effectiveness widget on your blog, wiki, or forum. No signup, no API key, lightweight and mobile-friendly.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://pokemonrandom.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Free Pokémon Widgets",
      item: "https://pokemonrandom.com/widgets/",
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PokéRandom Widgets — Free Embeddable Pokémon Tools",
  url: "https://pokemonrandom.com/widgets/",
  description:
    "Free embeddable Pokémon widgets: a random Pokémon generator and a type effectiveness lookup for blogs, wikis, and forums. No signup or API key required.",
  applicationCategory: "GameApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://pokemonrandom.com/widgets/",
  },
  publisher: {
    "@type": "Organization",
    name: "Pokemon Random",
    url: "https://pokemonrandom.com",
  },
  image: "https://pokemonrandom.com/og-image.png",
};

const faqItems = [
  {
    q: "Are the Pokémon widgets really free?",
    a: "Yes. Both widgets are completely free with no signup, no account, and no API key. All data comes from the open-source PokeAPI. The only requirement is keeping the small visible 'Powered by PokémonRandom' credit link in place.",
  },
  {
    q: "How do I add a widget to my website?",
    a: "Copy the embed code shown on this page, paste it into your HTML, template, or HTML block (for example a WordPress Custom HTML block), and save. The widget loads automatically wherever the script is included.",
  },
  {
    q: "Can I use the widgets on WordPress, Blogger, or a forum?",
    a: "Yes. The widget works on any platform that allows custom HTML, including WordPress (Custom HTML block), Blogger (HTML/JavaScript gadget), Ghost, Squarespace, Wix, and most forums. If your platform strips <script> tags, it unfortunately can't run the widget — it needs JavaScript to fetch live Pokémon data.",
  },
  {
    q: "Do the widgets work on mobile?",
    a: "Yes. The widgets are responsive, adapt to light and dark color schemes, and load only a few kilobytes of JavaScript. Sprites are loaded lazily from the PokeAPI CDN.",
  },
  {
    q: "Can I change how the widget looks?",
    a: "You can wrap the widget in a container to control its width and position, and the widget automatically matches the visitor's light or dark preference. Please keep the credit link visible — it keeps the widgets free.",
  },
  {
    q: "Where does the Pokémon data come from?",
    a: "All data and artwork come from PokeAPI and its sprite repository, the open-source Pokémon data API used by thousands of fan projects. Pokémon is a trademark of Nintendo, Creatures Inc., and GAME FREAK inc.; this site and its widgets are unofficial fan tools.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const RANDOM_JS_CODE = `<!-- PokémonRandom — Random Pokémon Generator widget -->
<script async src="https://pokemonrandom.com/widget.js"></script>
<div class="pokemonrandom-widget"></div>`;

const TYPES_JS_CODE = `<!-- PokémonRandom — Type Effectiveness widget -->
<script async src="https://pokemonrandom.com/widget.js"></script>
<div class="pokemonrandom-widget" data-widget="types"></div>`;

export default function WidgetsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium">Widgets</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Free Pokémon Widgets for Your Website
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Add a live random Pokémon generator or a type effectiveness lookup to your
              blog, wiki, Discord landing page, or forum post. Both widgets are free,
              need no signup or API key, weigh only a few kilobytes, and adapt to light
              and dark themes automatically. Copy a snippet below and paste it anywhere
              HTML is allowed — that&apos;s it.
            </p>
          </div>
        </section>

        {/* Widget 1 — Random Pokémon Generator */}
        <section id="random-generator-widget" className="py-8 scroll-mt-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold mb-3">
              1. Random Pokémon Generator Widget
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A button that rolls one of all 1,025 Pokémon from every generation and
              shows its official artwork, number, and typing. Every roll links straight
              to that Pokémon&apos;s full{" "}
              <Link href="/pokemon/" className="text-primary underline underline-offset-2">Pokédex entry</Link>,
              so your visitors can keep exploring. Great for fan sites, Nuzlocke
              challenge posts, and &quot;random Pokémon of the week&quot; sidebars.
            </p>

            {/* Live demo — this renders the exact same widget we ship */}
            <div className="rounded-2xl border-2 border-dashed border-border p-4 sm:p-6 mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Live demo
              </p>
              <div className="pokemonrandom-widget" />
            </div>

            <h3 className="text-lg font-semibold mb-3">Embed code (JavaScript)</h3>
            <CodeBlock code={RANDOM_JS_CODE} label="HTML" />

            <p className="text-sm text-muted-foreground mt-4 mb-6">
              Paste this into any HTML block, template partial, or widget area. The
              script is ~6&nbsp;KB, loads asynchronously, and never blocks your page.
            </p>
          </div>
        </section>

        <InContentAd />

        {/* Widget 2 — Type Effectiveness */}
        <section id="type-widget" className="py-8 scroll-mt-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold mb-3">
              2. Type Effectiveness Widget
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A compact dropdown that instantly lists what any attacking type hits for
              2× super effective, ½× not very effective, and 0× no damage. Perfect for
              strategy articles, raid guides, and team-building blog posts — it answers
              the eternal &quot;what beats what?&quot; question right inside your page.
            </p>

            <div className="rounded-2xl border-2 border-dashed border-border p-4 sm:p-6 mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Live demo
              </p>
              <div className="pokemonrandom-widget" data-widget="types" />
            </div>

            <h3 className="text-lg font-semibold mb-3">Embed code (JavaScript)</h3>
            <CodeBlock code={TYPES_JS_CODE} label="HTML" />

            <p className="text-sm text-muted-foreground mt-4 mb-6">
              Both JavaScript widgets can live on the same page — the script
              initializes every{" "}
              <code className="font-mono text-xs bg-secondary px-1.5 py-0.5 rounded">.pokemonrandom-widget</code>{" "}
              div it finds.
            </p>
          </div>
        </section>

        {/* Where it works + customization */}
        <section id="compatibility" className="py-8 scroll-mt-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold mb-3">
              Where the Widgets Work
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Both widgets are plain HTML + one lightweight script, so they run on
              any platform that lets you paste your own code —{" "}
              <strong>WordPress</strong> (Custom HTML block),{" "}
              <strong>Blogger</strong> (HTML/JavaScript gadget),{" "}
              <strong>Ghost</strong>, <strong>Squarespace</strong>,{" "}
              <strong>Wix</strong>, <strong>Weebly</strong>, most forum systems with
              HTML enabled, and of course any hand-built site. If a platform strips
              <code className="font-mono text-xs bg-secondary px-1.5 py-0.5 rounded">&lt;script&gt;</code>{" "}
              tags, it unfortunately cannot run the widget — it needs JavaScript to
              fetch live Pokémon data from PokeAPI.
            </p>
            <div className="rounded-xl border border-border bg-secondary/30 p-5 text-sm text-muted-foreground leading-relaxed">
              <h3 className="font-semibold text-foreground mb-2">Sizing &amp; placement tips</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>The widgets are <strong>responsive</strong> — they fill the width of their container (up to 560px) and reflow on mobile.</li>
                <li>To make one narrower, wrap the container: <code className="font-mono text-xs bg-background px-1.5 py-0.5 rounded">&lt;div style="max-width:320px"&gt;…&lt;/div&gt;</code></li>
                <li>The script loads <code className="font-mono text-xs bg-background px-1.5 py-0.5 rounded">async</code> and never blocks your page rendering — safe above the fold in sidebars and footers.</li>
                <li>Both widgets automatically match your visitor&apos;s <strong>light or dark</strong> color preference.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to add */}
        <section id="how-to-add" className="py-8 scroll-mt-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold mb-6">How to Add a Widget (3 Steps)</h2>
            <ol className="space-y-4">
              {[
                {
                  n: 1,
                  title: "Copy the embed code",
                  text: "Click Copy on any snippet above. The script and container are all you need — no API keys, no accounts, no build step.",
                },
                {
                  n: 2,
                  title: "Paste it where you want it",
                  text: "In WordPress use a Custom HTML block; in Blogger use the HTML/JavaScript gadget; in plain HTML, Ghost, Hugo, or Jekyll just paste it into your template or post.",
                },
                {
                  n: 3,
                  title: "Save and refresh",
                  text: "The widget initializes automatically wherever you placed it. It adapts to your visitor's color scheme and never blocks page rendering.",
                },
              ].map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-1">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ — content visible here, matching the FAQPage schema above */}
        <section id="faq" className="py-8 scroll-mt-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-border bg-secondary/30 overflow-hidden"
                >
                  <summary className="px-5 py-4 cursor-pointer font-semibold list-none flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="rounded-2xl border-2 border-primary/40 bg-secondary/40 p-6 sm:p-8 text-center">
              <h2 className="text-xl font-bold mb-3">
                Want More Than a Widget?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl mx-auto">
                The full toolkit on PokémonRandom is free too: a complete{" "}
                <Link href="/random-pokemon/" className="text-primary underline underline-offset-2">random Pokémon generator</Link> with
                generation and type filters, a{" "}
                <Link href="/random-team/" className="text-primary underline underline-offset-2">team builder</Link>, a{" "}
                <Link href="/shiny-odds-calculator/" className="text-primary underline underline-offset-2">shiny odds calculator</Link>, and
                a{" "}
                <Link href="/pokemon/" className="text-primary underline underline-offset-2">full Pokédex of all 1,025 Pokémon</Link> —
                no signup required.
              </p>
              <p className="text-sm text-muted-foreground">
                Pokémon and Pokémon character names are trademarks of Nintendo,
                Creatures Inc., and GAME FREAK inc. These widgets are unofficial fan
                tools powered by the open-source{" "}
                <a
                  href="https://pokeapi.co"
                  target="_blank"
                  rel="noopener"
                  className="underline underline-offset-2"
                >
                  PokéAPI
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <FooterAd />
      <SiteFooter />
      <MobileAnchorAd />

      {/* Load the actual widget for the live demos */}
      <Script src="/widget.js" strategy="afterInteractive" />
    </div>
  );
}
