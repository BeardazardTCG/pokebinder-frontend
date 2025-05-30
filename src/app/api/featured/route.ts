// /src/app/api/featured/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:ckQFRJkrJluWsJnHsDhlhvbtSridadDF@metro.proxy.rlwy.net:52025/railway',
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  const client = await pool.connect();

  try {
    const result = await client.query(`
  SELECT 
    m.unique_id,
    m.card_name,
    m.card_number,
    m.set_name,
    m.set_logo_url,
    m.card_image_url,
    m.clean_avg_value,
    a.url_used
  FROM mastercard_v2 m
  JOIN activedailypricelog a ON m.unique_id = a.unique_id
  WHERE 
    (m.hot_character = true OR m.tier IN (2, 3))
    AND a.url_used IS NOT NULL
    AND m.clean_avg_value IS NOT NULL
  ORDER BY RANDOM()
  LIMIT 4;
`);


    return NextResponse.json({ cards: result.rows });
  } catch (err) {
    console.error("❌ Featured cards fetch failed:", err);
    return NextResponse.json({ cards: [], error: 'Query failed' }, { status: 500 });
  } finally {
    client.release();
  }
}
