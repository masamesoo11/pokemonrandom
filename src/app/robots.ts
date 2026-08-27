import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /admin/ is a private admin panel — keep it out of search results.
        // Note: /api/ does not exist in this build, so we don't list it.
        disallow: ["/admin"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,

  };
}
