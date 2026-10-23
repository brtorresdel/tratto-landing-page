import type { MetadataRoute } from 'next';
import { getAllChangelogEntries } from '@/data/changelog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tratto.devtorres.com.br';
  const changelogEntries = getAllChangelogEntries();

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  for (const entry of changelogEntries) {
    entries.push({
      url: `${baseUrl}/changelog/${entry.date}`,
      lastModified: new Date(entry.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
