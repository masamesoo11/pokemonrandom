import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" works for Vercel and Docker. For Cloudflare Pages use "export" mode.
  // We keep "standalone" as default; the deployment platform chooses the right adapter.
  output: "standalone",
  // Disable image optimization - Cloudflare Pages doesn't support next/image optimization,
  // and our Pokemon sprites come from external CDN anyway.
  images: {
    unoptimized: true,
  },
  // TypeScript settings
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Ensure trailing slashes are consistent (better for SEO)
  trailingSlash: false,
};

export default nextConfig;
