import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Use static export for Cloudflare Pages (no SSR needed — all pages are SSG).
  // Output goes to `out/` directory which we then deploy directly.
  output: "export",
  // Disable image optimization - Cloudflare Pages doesn't support next/image optimization,
  // and our Pokemon sprites come from external CDN anyway.
  images: {
    unoptimized: true,
  },
  // TypeScript settings
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: true,
  // Use webpack instead of turbopack
  webpack: (config) => { config.cache = false; return config; },
  // Ensure trailing slashes are consistent (better for SEO + matches existing site URLs)
  trailingSlash: true,
  // Pin workspace root to this project (avoid /home/z/my-project/package-lock.json conflict)
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
