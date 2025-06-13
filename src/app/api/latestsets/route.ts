import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT DISTINCT ON (set_id) set_id, set_name, set_logo_url AS image
       FROM mastercard_v2
       WHERE language = 'en'
       ORDER BY set_id, release_date DESC`
    );

    const sets = result.rows.map(row => ({
      set_id: row.set_id,
      set_name: row.set_name,
      image: row.image
    }));

    console.log("✅ /api/latestsets fetched:", sets.length, "sets");

    return NextResponse.json(sets);
  } catch (error) {
    console.error('🔥 Error in /api/latestsets:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
