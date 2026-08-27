# Pokemon Random — Full Source Code

## Quick Start (GitHub Actions)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `pokemonrandom`
3. Set to **Private** (recommended)
4. Click **Create repository**

### Step 2: Upload Code
```bash
# Extract the ZIP on your computer
unzip pokemonrandom-github.zip -d pokemonrandom
cd pokemonrandom

# Initialize git
git init
git add .
git commit -m "Initial commit - Pokemon Random full site"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/pokemonrandom.git
git branch -M main
git push -u origin main
```

### Step 3: Add Secrets to GitHub
Go to your repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

Add these 2 secrets:

**Secret 1:**
- Name: `CLOUDFLARE_API_TOKEN`
- Value: `${{ secrets.CLOUDFLARE_API_TOKEN }}`

**Secret 2:**
- Name: `CLOUDFLARE_ACCOUNT_ID`
- Value: `${{ secrets.CLOUDFLARE_ACCOUNT_ID }}`

### Step 4: Trigger Build
1. Go to **Actions** tab in your GitHub repo
2. Click **Build and Deploy to Cloudflare Pages**
3. Click **Run workflow**
4. Wait ~5 minutes for build to complete

### Step 5: Verify
- Your site will be live at https://pokemonrandom.com
- Admin dashboard: https://pokemonrandom.com/admin/
- Admin password: `[SET VIA ADMIN DASHBOARD]`

## Manual Build (Local)
```bash
npm install --legacy-peer-deps
npx next build
npx wrangler pages deploy out/ --project-name=pokemonrandom
```

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── pokemon/[id]/      # 1,025 Pokemon pages (SSG)
│   ├── moves/[name]/      # 937 Move pages (SSG)
│   ├── abilities/[name]/  # 298 Ability pages (SSG)
│   ├── generation/[gen]/  # 9 Generation pages
│   ├── type/[type]/       # 18 Type pages
│   ├── blog/              # Blog index + 20 articles
│   └── ...                # Tools, legal, admin pages
├── components/            # 28 React components
└── lib/                   # APIs, types, blog data

.github/workflows/
└── deploy.yml             # GitHub Actions CI/CD
```

## Tech Stack
- Next.js 16 + React 19
- Tailwind CSS 4
- Cloudflare Pages (static export)
- Cloudflare KV (admin settings)
- Cloudflare Workers (API proxy)
- PokeAPI (Pokemon data)
