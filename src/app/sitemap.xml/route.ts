// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import { getAllCardSlugs, getAllSetSlugs } from '@/lib/sitemap-helpers';

const BASE_URL = 'https://www.pokebinder.co.uk';

export async function GET() {
  // 👇 Replace with actual DB fetch logic
  const cardSlugs = await getAllCardSlugs(); // ['base1-4', 'sv3pt5-199', ...]
  const setSlugs = await getAllSetSlugs();   // ['base1', 'sv3pt5', ...]

  const staticPages = [
    '',
    'search?q=charizard',
    'updates',
    'blog'
  ];

  const urls = [
    ...staticPages.map((slug) => `${BASE_URL}/${slug}`),
    ...cardSlugs.map((slug) => `${BASE_URL}/card/${slug}`),
    ...setSlugs.map((slug) => `${BASE_URL}/set/${slug}`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>${url.includes('/card/') ? '0.8' : '0.5'}</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
