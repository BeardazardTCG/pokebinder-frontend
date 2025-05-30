// /src/app/api/search/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:ckQFRJkrJluWsJnHsDhlhvbtSridadDF@metro.proxy.rlwy.net:52025/railway',
  ssl: { rejectUnauthorized: false },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = decodeURIComponent(searchParams.get('q') || '').trim().toLowerCase();
  const terms = rawQuery.split(/\s+/);

  if (!rawQuery) {
    return NextResponse.json({ cards: [] });
  }

  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      SELECT unique_id, card_name, card_number, set_name, set_logo_url, card_image_url, sold_ebay_median
      FROM mastercard_v2
      WHERE 
        LOWER(card_name) LIKE ANY($1::text[])
        AND (
          LOWER(set_name) LIKE ANY($1::text[])
          OR card_number_raw LIKE ANY($1::text[])
        )
      LIMIT 50;
    `,
      [terms.map(t => `%${t}%`)]
    );

    return NextResponse.json({ cards: result.rows });
  } catch (err) {
    console.error('❌ DB search error:', err);
    return NextResponse.json({ cards: [], error: 'Query failed' }, { status: 500 });
  } finally {
    client.release();
  }
}