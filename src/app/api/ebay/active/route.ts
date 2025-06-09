// FILE: /src/app/api/ebay/active/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ items: [] });
  }

  try {
    const client = await pool.connect();
    const res = await client.query(
      `
      SELECT title, price, url, image_url
      FROM raw_ebay_active
      WHERE LOWER(title) LIKE $1
      ORDER BY scraped_at DESC
      LIMIT 5
      `,
      [`%${query.toLowerCase()}%`]
    );
    client.release();

    const items = res.rows.map((row) => ({
      title: row.title,
      price: parseFloat(row.price).toFixed(2),
      url: row.url,
      image: row.image_url,
    }));

    return NextResponse.json({ items });
  } catch (err) {
    console.error('DB fetch failed:', err);
    return NextResponse.json({ items: [] });
  }
}
