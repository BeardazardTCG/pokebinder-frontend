// FILE: /app/api/featured/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || '',
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
        m.price_range_seen_min,
        m.price_range_seen_max
      FROM mastercard_v2 m
      JOIN (
        SELECT unique_id, COUNT(*) AS sale_count
        FROM dailypricelog
        WHERE created_at > NOW() - INTERVAL '7 days'
        GROUP BY unique_id
      ) d ON m.unique_id = d.unique_id
      WHERE 
        m.clean_avg_value BETWEEN 7 AND 11
        AND m.card_image_url IS NOT NULL
      ORDER BY d.sale_count DESC
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
