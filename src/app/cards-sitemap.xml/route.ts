import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  const client = await pool.connect();

  try {
    const res = await client.query(`
      SELECT card_name, set_slug, card_number
      FROM mastercard_v2
      WHERE card_image_url IS NOT NULL
    `);

    const urls = res.rows.map(row => {
      const char = row.card_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const set = row.set_slug;
      const number = row.card_number;
      return `<url><loc>https://pokebinder.co.uk/cards/${char}/${set}/${number}</loc></url>`;
    }).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (err) {
    console.error('❌ Error generating cards sitemap:', err);
    return new NextResponse('Failed to generate sitemap', { status: 500 });
  } finally {
    client.release();
  }
}
