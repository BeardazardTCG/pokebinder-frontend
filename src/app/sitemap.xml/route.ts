import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

const pool = new Pool({
  connectionString: 'postgresql://postgres:ckQFRJkrJluWsJnHsDhlhvbtSridadDF@metro.proxy.rlwy.net:52025/railway',
  ssl: { rejectUnauthorized: false },
});

const BASE_URL = 'https://www.pokebinder.co.uk';

export async function GET() {
  try {
    const flatCardResult = await pool.query('SELECT unique_id FROM mastercard_v2 LIMIT 18000;');
    const seoCardResult = await pool.query(`
      SELECT card_name, set_slug, card_number
      FROM mastercard_v2
      WHERE card_image_url IS NOT NULL
      LIMIT 18000;
    `);
    const setResult = await pool.query('SELECT DISTINCT set_code FROM mastercard_v2 LIMIT 1000;');

    const staticPages = ['', 'search?q=charizard', 'updates', 'blog'];

    const urls = [
      ...staticPages.map((slug) => `${BASE_URL}/${slug}`),
      ...flatCardResult.rows.map((row) => `${BASE_URL}/card/${row.unique_id}`),
      ...seoCardResult.rows.map((row) => {
        const char = row.card_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return `${BASE_URL}/cards/${char}/${row.set_slug}/${row.card_number}`;
      }),
      ...setResult.rows.map((row) => `${BASE_URL}/set/${row.set_code}`),
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url.includes('/card/') || url.includes('/cards/') ? '0.8' : '0.5'}</priority>
  </url>`).join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error: any) {
    console.error('❌ Sitemap Error:', error);
    return new NextResponse('Sitemap generation failed', { status: 500 });
  }
}
