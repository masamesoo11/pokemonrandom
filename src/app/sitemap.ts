import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  // Homepage sections (anchor links)
  const homepageSections = [
    { path: "/", priority: 1.0, freq: "daily" as const },
    { path: "/#generator", priority: 0.9, freq: "daily" as const },
    { path: "/#team", priority: 0.8, freq: "weekly" as const },
    { path: "/#wheel", priority: 0.8, freq: "weekly" as const },
    { path: "/#guess", priority: 0.8, freq: "weekly" as const },
    { path: "/#randomizer", priority: 0.8, freq: "weekly" as const },
    { path: "/#compare", priority: 0.7, freq: "weekly" as const },
    { path: "/#type-chart", priority: 0.7, freq: "monthly" as const },
    { path: "/#blog", priority: 0.7, freq: "weekly" as const },
    { path: "/#faq", priority: 0.6, freq: "monthly" as const },
  ];

  // Legal & info pages
  const staticPages = [
    { path: "/about", priority: 0.7, freq: "monthly" as const },
    { path: "/contact", priority: 0.6, freq: "monthly" as const },
    { path: "/privacy", priority: 0.5, freq: "yearly" as const },
    { path: "/terms", priority: 0.5, freq: "yearly" as const },
    { path: "/cookies", priority: 0.5, freq: "yearly" as const },
    { path: "/disclaimer", priority: 0.5, freq: "yearly" as const },
    { path: "/dmca", priority: 0.5, freq: "yearly" as const },
  ];

  return [...homepageSections, ...staticPages].map((page) => ({
    url: `${base}${page.path}`,
    lastModified: now,
    changeFrequency: page.freq,
    priority: page.priority,
  }));
}
