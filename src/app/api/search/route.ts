// /src/app/api/search/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://postgres:ckQFRJkrJluWsJnHsDhlhvbtSridadDF@metro.proxy.rlwy.net:52025/railway",
  ssl: { rejectUnauthorized: false },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get("q")?.trim();

  if (!rawQuery) {
    return NextResponse.json({ cards: [] });
  }

  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      SELECT 
        unique_id,
        card_name,
        card_number,
        set_name,
        set_logo_url,
        card_image_url,
        clean_avg_value  -- ✅ ADDED HERE
      FROM mastercard_v2
      WHERE query ILIKE $1
      ORDER BY LENGTH(query)
      LIMIT 100;
      `,
      [`%${rawQuery}%`]
    );

    return NextResponse.json({ cards: result.rows });
  } catch (err) {
    console.error("❌ DB search error:", err);
    return NextResponse.json({ cards: [], error: "Query failed" }, { status: 500 });
  } finally {
    client.release();
  }
}
