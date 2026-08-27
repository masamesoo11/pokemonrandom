import { getAllPosts } from "@/lib/blog-content-loader";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const items = posts.map(p => `    <item>
      <title>${p.title}</title>
      <link>https://pokemonrandom.com/blog/${p.slug}/</link>
      <description>${p.description}</description>
      <guid>https://pokemonrandom.com/blog/${p.slug}/</guid>
    </item>`).join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Pokémon Random Blog</title>
    <link>https://pokemonrandom.com/blog/</link>
    <description>Pokémon guides, tips, and strategy</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(rss, { headers: { "Content-Type": "application/xml" } });
}
