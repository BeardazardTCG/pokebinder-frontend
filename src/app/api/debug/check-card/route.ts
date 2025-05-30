import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  console.log("🔍 API HIT: /api/debug/check-card");

  try {
    const { rows } = await pool.query(
      `SELECT unique_id, card_name, card_number, set_name 
       FROM mastercard_v2 
       WHERE unique_id = 'g1-24' 
       LIMIT 1`
    );

    if (rows.length === 0) {
      console.log("❌ DB returned 0 rows");
      return NextResponse.json({ error: "Card not found" });
    }

    console.log("✅ DB returned:", rows[0]);
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("🔥 DB ERROR:", err);
    return NextResponse.json({ error: "DB failure" }, { status: 500 });
  }
}
