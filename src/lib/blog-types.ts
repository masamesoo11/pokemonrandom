/** Type definitions for blog posts. */

export interface BlogPostSummary {
  slug: string;
  title: string;
  /** Optional H1 text different from title to avoid SEO over-optimization. */
  h1?: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  publishedAt: string;
  modifiedAt: string;
  author: string;
  category: string;
  intro: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostSummary {
  body: string;
}
