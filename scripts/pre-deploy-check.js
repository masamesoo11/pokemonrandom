#!/usr/bin/env node
/**
 * Pre-deploy verification script.
 * Run this before deploying to catch common issues.
 *
 * Usage:
 *   node scripts/pre-deploy-check.js
 *   bun scripts/pre-deploy-check.js
 */

import { readFileSync, existsSync, statSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const CHECKS = [];
let passed = 0;
let warnings = 0;
let failed = 0;

function check(name, condition, level = "pass", details = "") {
  CHECKS.push({ name, condition, level, details });
  if (condition) passed++;
  else if (level === "warn") warnings++;
  else failed++;
}

function fileExists(path) {
  return existsSync(join(ROOT, path));
}

function readPackage() {
  try {
    return JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  } catch {
    return null;
  }
}

// ===== Required files =====
console.log("\n📁 Checking required files...");
check("package.json exists", fileExists("package.json"));
check("next.config.ts exists", fileExists("next.config.ts"));
check("tsconfig.json exists", fileExists("tsconfig.json"));
check("tailwind.config.ts exists", fileExists("tailwind.config.ts"));
check(".env.example exists", fileExists(".env.example"));
check("README.md exists", fileExists("README.md"));
check("src/app/layout.tsx exists", fileExists("src/app/layout.tsx"));
check("src/app/page.tsx exists", fileExists("src/app/page.tsx"));
check("src/app/admin/page.tsx exists", fileExists("src/app/admin/page.tsx"));
check("src/app/robots.ts exists", fileExists("src/app/robots.ts"));
check("src/app/sitemap.ts exists", fileExists("src/app/sitemap.ts"));
check("src/app/not-found.tsx exists", fileExists("src/app/not-found.tsx"));

// ===== Legal pages (required for AdSense) =====
console.log("\n📄 Checking legal pages...");
check("About page exists", fileExists("src/app/about/page.tsx"), "warn");
check("Privacy Policy exists", fileExists("src/app/privacy/page.tsx"));
check("Terms of Service exists", fileExists("src/app/terms/page.tsx"));
check("Contact page exists", fileExists("src/app/contact/page.tsx"));
check("Cookie Policy exists", fileExists("src/app/cookies/page.tsx"));
check("Disclaimer exists", fileExists("src/app/disclaimer/page.tsx"));
check("DMCA page exists", fileExists("src/app/dmca/page.tsx"));

// ===== SEO assets =====
console.log("\n🔍 Checking SEO assets...");
check("OG image exists", fileExists("public/og-image.png"));
check("Favicon 32px exists", fileExists("public/favicon-32.png"));
check("Icon 192px exists", fileExists("public/icon-192.png"));
check("Icon 512px exists", fileExists("public/icon-512.png"));
check("Apple touch icon exists", fileExists("public/apple-touch-icon.png"));
check("manifest.json exists", fileExists("public/manifest.json"));

// ===== Deployment configs =====
console.log("\n🚀 Checking deployment configs...");
check(
  "Cloudflare workflow exists",
  fileExists(".github/workflows/deploy-cloudflare.yml")
);
check(
  "Vercel workflow exists",
  fileExists(".github/workflows/deploy-vercel.yml")
);
check(
  "Code quality workflow exists",
  fileExists(".github/workflows/code-quality.yml")
);
check("_routes.toml exists (Cloudflare)", fileExists("_routes.toml"));

// ===== Package.json checks =====
console.log("\n📦 Checking package.json...");
const pkg = readPackage();
if (pkg) {
  check("package.json has name", !!pkg.name);
  check("package.json has scripts.dev", !!(pkg.scripts && pkg.scripts.dev));
  check("package.json has scripts.build", !!(pkg.scripts && pkg.scripts.build));
  check("package.json has scripts.lint", !!(pkg.scripts && pkg.scripts.lint));
  check("Next.js dependency exists", !!(pkg.dependencies && pkg.dependencies.next));
  check("React dependency exists", !!(pkg.dependencies && pkg.dependencies.react));
} else {
  check("package.json is valid JSON", false);
}

// ===== Components =====
console.log("\n🧩 Checking components...");
const requiredComponents = [
  "site-header",
  "site-footer",
  "hero-section",
  "random-pokemon-generator",
  "pokemon-team-builder",
  "pokemon-type-wheel",
  "guess-pokemon-game",
  "pokemon-randomizer",
  "pokemon-comparison",
  "type-chart-section",
  "pokemon-of-day",
  "faq-section",
  "blog-section",
  "ad-slot",
  "analytics-scripts",
  "theme-toggle",
  "cookie-consent-banner",
];
for (const comp of requiredComponents) {
  check(`Component: ${comp}.tsx`, fileExists(`src/components/${comp}.tsx`));
}

// ===== Lib files =====
console.log("\n📚 Checking lib files...");
check("site-config.ts exists", fileExists("src/lib/site-config.ts"));
check("pokemon-api.ts exists", fileExists("src/lib/pokemon-api.ts"));
check("use-local-stats.ts exists", fileExists("src/lib/use-local-stats.ts"));
check("faq-data.ts exists", fileExists("src/lib/faq-data.ts"));
check("type-pokemon-map.json exists", fileExists("src/lib/type-pokemon-map.json"));

// ===== Environment variables =====
console.log("\n🔐 Checking environment setup...");
if (fileExists(".env.example")) {
  const envExample = readFileSync(join(ROOT, ".env.example"), "utf8");
  check(
    ".env.example has NEXT_PUBLIC_SITE_URL",
    envExample.includes("NEXT_PUBLIC_SITE_URL")
  );
  check(
    ".env.example has ADMIN_PASSWORD",
    envExample.includes("ADMIN_PASSWORD")
  );
  check(
    ".env.example has NEXT_PUBLIC_GA_ID",
    envExample.includes("NEXT_PUBLIC_GA_ID")
  );
  check(
    ".env.example has NEXT_PUBLIC_ADSENSE_CLIENT",
    envExample.includes("NEXT_PUBLIC_ADSENSE_CLIENT")
  );
}

// ===== Print report =====
console.log("\n" + "=".repeat(60));
console.log("📋 PRE-DEPLOY CHECK REPORT");
console.log("=".repeat(60));
console.log(`✅ Passed:   ${passed}`);
console.log(`⚠️  Warnings: ${warnings}`);
console.log(`❌ Failed:   ${failed}`);
console.log("=".repeat(60));

if (failed > 0) {
  console.log("\n❌ FAILED CHECKS:");
  CHECKS.filter((c) => !c.condition && c.level === "fail").forEach((c) => {
    console.log(`   • ${c.name}`);
  });
}

if (warnings > 0) {
  console.log("\n⚠️  WARNINGS:");
  CHECKS.filter((c) => !c.condition && c.level === "warn").forEach((c) => {
    console.log(`   • ${c.name}`);
  });
}

console.log("");
if (failed > 0) {
  console.log("🚫 DEPLOYMENT BLOCKED — fix the failed checks above.");
  process.exit(1);
} else if (warnings > 0) {
  console.log("⚠️  Ready to deploy, but consider fixing the warnings.");
  process.exit(0);
} else {
  console.log("🎉 All checks passed! Ready to deploy.");
  process.exit(0);
}
