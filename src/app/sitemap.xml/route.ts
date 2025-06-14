// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const BASE_URL = 'https://www.pokebinder.co.uk';

export async function GET() {
  // Fetch all card slugs
  const cardResult = await sql`SELECT unique_id FROM mastercard_v2 LIMIT 18000;`;
  const cardSlugs = cardResult.rows.map((row) => row.unique_id);

  // Fetch all set slugs
  const setResult = await sql`SELECT DISTINCT set_slug FROM sets LIMIT 1000;`;
  const setSlugs = setResult.rows.map((row) => row.set_slug);

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
