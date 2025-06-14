export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:ckQFRJkrJluWsJnHsDhlhvbtSridadDF@metro.proxy.rlwy.net:52025/railway',
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  let client;

  try {
    client = await pool.connect();
  } catch (connectionError) {
    console.error("❌ Failed to connect to DB:", connectionError);
    return NextResponse.json({ cards: [], error: 'DB connection failed' }, { status: 500 });
  }

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
        m.price_range_seen_min,
        m.price_range_seen_max
      FROM mastercard_v2 m
      WHERE 
        m.clean_avg_value BETWEEN 7 AND 11
        AND m.card_image_url IS NOT NULL
        AND m.card_name IS NOT NULL
        AND m.card_name != ''
        AND EXISTS (
          SELECT 1 FROM dailypricelog d
          WHERE d.unique_id = m.unique_id
          AND d.created_at >= CURRENT_DATE - INTERVAL '7 days'
        )
      ORDER BY (
        SELECT COUNT(*) FROM dailypricelog d
        WHERE d.unique_id = m.unique_id
        AND d.created_at >= CURRENT_DATE - INTERVAL '30 days'
      ) DESC
      LIMIT 4;
    `);

    if (result.rows.length === 0) {
      console.warn("⚠️ No featured cards found.");
      return NextResponse.json({ cards: [] });
    }

    return NextResponse.json({ cards: result.rows });
  } catch (queryError) {
    console.error("❌ Query failed:", queryError);
    return NextResponse.json({ cards: [], error: 'Query failed' }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
