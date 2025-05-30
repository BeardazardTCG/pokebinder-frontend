// /src/app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");

  if (!query || query.trim() === "") {
    return NextResponse.json({ cards: [] });
  }

  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      `SELECT unique_id, card_name, card_number, set_name, card_image_url, set_logo_url, sold_ebay_median
       FROM mastercard_v2
       WHERE query ILIKE $1
       ORDER BY LENGTH(query)
       LIMIT 100`,
      [`%${query}%`]
    );
    client.release();

    return NextResponse.json({ cards: rows });
  } catch (error) {
    console.error("Search error:", error);
    return new NextResponse("Error searching", { status: 500 });
  }
}
