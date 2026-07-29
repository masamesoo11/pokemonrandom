# Pokemon Random — Random Pokemon Generator

A free, fast, SEO-optimized Pokemon tools platform built with Next.js 16, TypeScript, Tailwind CSS 4, and shadcn/ui. Targets the high-value SEO keyword "random pokemon generator" (KD 15, $4.41 CPC, 53.4K global monthly searches).

🌐 **Live domain**: `pokemonrandom.com`

## ✨ Features

### 5 Pokemon Tools
1. **Random Pokemon Generator** — generation filter, shiny toggle, cry playback, collapsible base stats
2. **Pokemon Team Builder** — rolls 6 unique Pokemon, removable members, share team
3. **Type Wheel Spinner** — animated SVG wheel with all 18 types, shows 4 examples per type
4. **Guess That Pokemon** — silhouette guessing game with 3 attempts, hint system, streak
5. **Pokemon Randomizer** — multi-filter (gens + types + legendary status)

### Unique Features
- ⭐ Pokemon of the Day (deterministic by date)
- 🆚 Pokemon Comparison Tool (2 Pokemon side-by-side)
- 📊 Type Effectiveness Chart (full 18×18 matrix)
- ❤️ Favorites system (saved in localStorage)
- 📤 Share Pokemon / teams (Web Share API + clipboard fallback)
- 🌓 Dark / Light mode toggle

### Admin Dashboard
- Visit `/admin` (password-protected)
- Analytics overview: generated, teams, guesses, spins
- Tool usage bar chart
- Top Pokemon list
- Ad configuration status
- Recent activity + favorites gallery

### SEO Infrastructure
- ✅ Sitemap.xml (auto-generated)
- ✅ Robots.txt (disallows /admin)
- ✅ JSON-LD structured data (WebApplication schema with rating)
- ✅ Open Graph image (1200×630) + Twitter card
- ✅ 4 favicons (32, 180, 192, 512) + PWA manifest
- ✅ Canonical URL + robots meta tags

### Monetization Ready
- 5 AdSense placements (header, 2× in-content, footer, mobile sticky)
- Google Analytics 4 event tracking
- All configuration via environment variables (no code changes needed)

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ or Bun
- Git

### Install & Run Locally
```bash
git clone https://github.com/YOUR_USERNAME/pokemonrandom.git
cd pokemonrandom
bun install
cp .env.example .env.local
# Edit .env.local with your values
bun run dev
```

Open `http://localhost:3000`

### Build for Production
```bash
bun run build
bun run start
```

## 🌐 Deployment (Vercel — Recommended)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pokemonrandom.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. **Add New Project** → Select your `pokemonrandom` repo
3. Framework preset will auto-detect as **Next.js**
4. Click **Deploy** (2-3 minutes)

### Step 3: Set Environment Variables
In Vercel: **Settings → Environment Variables** → Add each from `.env.example`

### Step 4: Redeploy
**Deployments → ⋮ → Redeploy**

## 🔗 Domain Setup (pokemonrandom.com on Cloudflare)

### Step 1: Buy Domain
1. Go to [Cloudflare Registrar](https://dash.cloudflare.com)
2. Search for `pokemonrandom.com` ($10.46/year)
3. Enable **Auto-renew** ✅
4. Enable **WHOIS Privacy** ✅
5. Checkout

### Step 2: Connect to Vercel
1. Vercel → Project Settings → Domains → **Add**
2. Enter `pokemonrandom.com` (primary)
3. Also add `www.pokemonrandom.com` (redirect to primary)
4. Vercel gives you DNS records:
   ```
   A     @     76.76.21.21
   CNAME www   cname.vercel-dns.com
   ```
5. Go to Cloudflare → DNS → Records → Add both records
   - ⚠️ Make sure they are **"DNS Only"** (grey cloud), not Proxied initially
6. Wait 5-30 minutes → green ✓ in Vercel

### Step 3: SSL Certificate
Vercel provisions automatically (Let's Encrypt, free).

## 📊 Post-Deployment Setup

### Google Analytics 4
1. Go to [analytics.google.com](https://analytics.google.com) → Create Property
2. Copy Measurement ID (`G-XXXXXXXXXX`)
3. Add to Vercel env vars: `NEXT_PUBLIC_GA_ID`

### Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add Property → URL prefix → `https://pokemonrandom.com`
3. Verify with HTML tag → copy the token
4. Add to Vercel env vars: `NEXT_PUBLIC_SEARCH_CONSOLE`
5. Submit sitemap: `https://pokemonrandom.com/sitemap.xml`

### Google AdSense (after 1000+ visitors)
1. Go to [adsense.google.com](https://adsense.google.com) → Sign up
2. Wait for approval (1-7 days)
3. Create 5 ad units (header, in-content, sidebar, footer, mobile anchor)
4. Copy each `data-ad-slot` ID
5. Add to Vercel env vars: `NEXT_PUBLIC_ADSENSE_CLIENT` + 5 slot IDs

## 🛡️ Admin Access

1. Visit `https://pokemonrandom.com/admin`
2. Enter password (default: `admin123`)
3. Change it by setting `ADMIN_PASSWORD` env var
4. View analytics, ad config status, recent activity, favorites

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/             # Admin dashboard (password-protected)
│   ├── layout.tsx         # Root layout with SEO metadata
│   ├── page.tsx           # Homepage (10 sections)
│   ├── robots.ts          # Auto-generated robots.txt
│   └── sitemap.ts         # Auto-generated sitemap.xml
├── components/
│   ├── ad-slot.tsx                # 5 AdSense placements
│   ├── analytics-scripts.tsx      # GA4 + AdSense loaders
│   ├── theme-toggle.tsx           # Dark/Light mode
│   ├── pokemon-of-day.tsx         # Daily featured Pokemon
│   ├── pokemon-comparison.tsx     # 2-Pokemon stat comparison
│   ├── type-chart-section.tsx     # 18x18 type matrix
│   ├── random-pokemon-generator.tsx
│   ├── pokemon-team-builder.tsx
│   ├── pokemon-type-wheel.tsx
│   ├── guess-pokemon-game.tsx
│   ├── pokemon-randomizer.tsx
│   ├── hero-section.tsx
│   ├── blog-section.tsx
│   ├── faq-section.tsx
│   ├── site-header.tsx
│   └── site-footer.tsx
├── lib/
│   ├── pokemon-api.ts             # PokeAPI helpers + types
│   ├── type-pokemon-map.json      # Precomputed type->IDs map
│   ├── site-config.ts             # Env-based configuration
│   └── use-local-stats.ts         # Favorites/History/Stats hooks
└── public/
    ├── og-image.png               # 1200x630 OG image
    ├── manifest.json              # PWA manifest
    ├── favicon-32.png
    ├── icon-192.png
    ├── icon-512.png
    └── apple-touch-icon.png

scripts/
├── build_type_map.py              # Fetch type->IDs from PokeAPI
└── generate_og_image.py           # Generate OG image + favicons
```

## ⚙️ Environment Variables

See [`.env.example`](./.env.example) for the full list.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Your final domain URL |
| `ADMIN_PASSWORD` | ✅ | Admin panel password |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 ID |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Optional | AdSense publisher ID |
| `NEXT_PUBLIC_AD_SLOT_*` | Optional | 5 AdSense slot IDs |
| `NEXT_PUBLIC_SEARCH_CONSOLE` | Optional | Search Console verification token |

## 📜 Legal Disclaimer

Pokemon and all related names are trademarks of Nintendo, Game Freak, and The Pokemon Company. This is a fan-made tool, not affiliated with or endorsed by them. All Pokemon data and sprites are sourced from the open-source [PokeAPI](https://pokeapi.co).

## 📄 License

MIT — Free to use, modify, and distribute.

---

Built with ❤️ for Pokemon fans.
