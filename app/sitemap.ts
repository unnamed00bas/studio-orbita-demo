import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';
import { products } from '@/lib/content/products';
import { cases } from '@/lib/content/cases';
import { guides } from '@/lib/content/guides';
import { posts } from '@/lib/content/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => `${SITE.url}${p}`;

  return [
    { url: url('/'), lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: url('/products'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/cases'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/guide'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: url('/contacts'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    ...products.map((p) => ({
      url: url(`/products/${p.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...cases.map((c) => ({
      url: url(`/cases/${c.slug}`),
      lastModified: new Date(c.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...guides.map((g) => ({
      url: url(`/guide/${g.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(p.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
