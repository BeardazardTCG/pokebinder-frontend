// src/app/cards-sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export const dynamic = 'force-static'; // Required for sitemap crawling

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:ckQFRJkrJluWsJnHsDhlhvbtSridadDF@metro.proxy.rlwy.net:52025/railway',
  ssl: { rejectUnauthorized: false },
});

const BASE_URL = 'https://www.pokebinder.co.uk';

export async function GET() {
  try {
    const seoCardResult = await pool.query(`
      SELECT card_name, set_slug, card_number
      FROM mastercard_v2
      WHERE card_image_url IS NOT NULL
      LIMIT 18000;
    `);

    const urls = seoCardResult.rows.map((row) => {
      const char = row.card_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `${BASE_URL}/cards/${char}/${row.set_slug}/${row.card_number}`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    });
  } catch (error: any) {
    console.error('❌ Sitemap Error:', error);
    return new NextResponse('Sitemap generation failed', { status: 500 });
  }
}
