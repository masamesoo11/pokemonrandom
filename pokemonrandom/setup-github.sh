#!/bin/bash
# ====================================================================
# 🚀 Pokemon Random — GitHub Setup Script
# ====================================================================
# This script does ALL the local work for you. After running it,
# you'll have a clean git repository ready to push to GitHub.
#
# USAGE:
#   1. Make it executable:  chmod +x setup-github.sh
#   2. Run it:              ./setup-github.sh
#
# After running, just create an empty repo on GitHub and run:
#   git remote add origin https://github.com/YOUR_USERNAME/pokemonrandom.git
#   git push -u origin main
# ====================================================================

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  🚀 Pokemon Random — GitHub Setup Script${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo ""

# ===== Step 1: Check prerequisites =====
echo -e "${YELLOW}📋 Step 1: Checking prerequisites...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo -e "${RED}❌ Error: Run this script from the project root directory.${NC}"
  echo -e "   Make sure package.json and src/ folder are in the current directory."
  exit 1
fi
echo -e "${GREEN}✅ Project files detected${NC}"

# Check if git is installed
if ! command -v git &> /dev/null; then
  echo -e "${RED}❌ Git is not installed.${NC}"
  echo -e "   Install from: https://git-scm.com/downloads"
  exit 1
fi
echo -e "${GREEN}✅ Git is installed: $(git --version)${NC}"

# Check git user config
if ! git config user.name &> /dev/null; then
  echo -e "${YELLOW}⚠️  Git user.name not set. Setting default...${NC}"
  git config user.name "Pokemon Random"
fi

if ! git config user.email &> /dev/null; then
  echo -e "${YELLOW}⚠️  Git user.email not set. Setting default...${NC}"
  git config user.email "noreply@pokemonrandom.com"
fi

echo -e "${GREEN}✅ Git user: $(git config user.name) <$(git config user.email)>${NC}"
echo ""

# ===== Step 2: Initialize fresh git repo =====
echo -e "${YELLOW}📦 Step 2: Setting up Git repository...${NC}"

# Remove existing .git if it exists (for clean start)
if [ -d ".git" ]; then
  echo -e "${YELLOW}   Removing existing git history (clean start)...${NC}"
  rm -rf .git
fi

git init -b main
echo -e "${GREEN}✅ Git repository initialized${NC}"

# ===== Step 3: Verify .gitignore =====
echo -e "${YELLOW}📝 Step 3: Verifying .gitignore...${NC}"

if [ ! -f ".gitignore" ]; then
  echo -e "${YELLOW}   Creating .gitignore...${NC}"
  cat > .gitignore << 'GITIGNORE'
# dependencies
node_modules
/.pnp
.pnp.*

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files
.env
.env.local
.env.production
.env.development.local
.env.test.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# logs
*.log
dev.log
server.log

# IDE
.idea
.vscode
*.swp
*.swo

# OS
Thumbs.db

# Project-specific
.zscripts
.z-ai-config
.claude
skills
db
worklog.md
GITIGNORE
fi
echo -e "${GREEN}✅ .gitignore ready${NC}"

# ===== Step 4: Stage and commit =====
echo -e "${YELLOW}💾 Step 4: Staging and committing files...${NC}"

git add .

FILE_COUNT=$(git diff --cached --numstat | wc -l)
echo -e "   ${GREEN}Staged $FILE_COUNT files${NC}"

git commit -m "🚀 Initial release — Pokemon Random

✨ Features:
- Random Pokemon Generator (1025 Pokemon, 9 generations)
- Team Builder (6 Pokemon)
- Type Wheel Spinner
- Guess That Pokemon game
- Pokemon Randomizer with filters
- Pokemon Comparison tool
- Type Effectiveness Chart
- Pokemon of the Day
- Dark/Light mode
- Favorites system + sharing

🔐 Admin:
- Password-protected dashboard at /admin
- Analytics overview, tool usage, top Pokemon

📜 Legal pages:
- About, Privacy, Terms, Contact
- Cookie Policy, Disclaimer, DMCA

🔍 SEO:
- Sitemap.xml, robots.txt
- JSON-LD structured data (WebApplication + FAQ)
- Open Graph image, Twitter cards
- 4 favicons + PWA manifest

🍪 GDPR:
- Cookie consent banner with preferences

🚀 Deployment:
- Cloudflare Pages + Vercel workflows
- GitHub Actions (CI/CD)
- Lighthouse audit workflow
- Sitemap submission workflow
- Slack/Discord notifications

🛠️ Tech Stack:
- Next.js 16 + React 19 + TypeScript 5
- Tailwind CSS 4 + shadcn/ui
- PokeAPI (open-source)" --quiet

echo -e "${GREEN}✅ Initial commit created${NC}"
echo ""

# ===== Step 5: Summary =====
echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  🎉 LOCAL SETUP COMPLETE!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📊 Repository Summary:${NC}"
echo -e "   Files committed: ${FILE_COUNT}"
echo -e "   Branch: main"
echo -e "   Last commit: $(git log -1 --oneline)"
echo ""
echo -e "${YELLOW}🚀 NEXT STEPS (do these manually):${NC}"
echo ""
echo -e "${BLUE}━━━ 1. Create an empty GitHub repository ━━━${NC}"
echo -e "   1. Go to: https://github.com/new"
echo -e "   2. Repository name: ${GREEN}pokemonrandom${NC}"
echo -e "   3. Description: Free Random Pokemon Generator"
echo -e "   4. Visibility: Public (recommended)"
echo -e "   5. ${RED}DO NOT${NC} check 'Add README' or '.gitignore' (already included)"
echo -e "   6. Click 'Create repository'"
echo ""
echo -e "${BLUE}━━━ 2. Connect to GitHub (replace YOUR_USERNAME) ━━━${NC}"
echo -e "   ${GREEN}git remote add origin https://github.com/YOUR_USERNAME/pokemonrandom.git${NC}"
echo -e "   ${GREEN}git branch -M main${NC}"
echo -e "   ${GREEN}git push -u origin main${NC}"
echo ""
echo -e "${BLUE}━━━ 3. When prompted for credentials ━━━${NC}"
echo -e "   Username: YOUR GitHub username"
echo -e "   Password: YOUR GitHub Personal Access Token (PAT)"
echo -e "            (NOT your account password!)"
echo -e "   Create a PAT at: https://github.com/settings/tokens"
echo -e "   - Click 'Generate new token (classic)'"
echo -e "   - Check 'repo' scope"
echo -e "   - Copy the token and paste it as password"
echo ""
echo -e "${BLUE}━━━ 4. After successful push ━━━${NC}"
echo -e "   Your repo is live at: https://github.com/YOUR_USERNAME/pokemonrandom"
echo -e "   Cloudflare Pages will auto-detect it if you connect it."
echo ""
echo -e "${YELLOW}💡 Need help? Visit: https://docs.github.com/en/get-started${NC}"
echo ""
