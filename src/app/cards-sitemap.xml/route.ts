import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export const dynamic = 'force-static'; // Ensures static rendering for crawlers

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const BASE_URL = 'https://www.pokebinder.co.uk';

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT card_name, set_slug, card_number
      FROM mastercard_v2
      WHERE card_image_url IS NOT NULL
      LIMIT 18000;
    `);

    const urls = rows.map((row) => {
      const safeName =
        typeof row.card_name === 'string'
          ? row.card_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
          : 'unknown';
      return `${BASE_URL}/cards/${safeName}/${row.set_slug}/${row.card_number}`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    });
  } catch (err) {
    console.error('❌ Sitemap error:', err);
    return new NextResponse('Sitemap generation failed', { status: 500 });
  }
}
