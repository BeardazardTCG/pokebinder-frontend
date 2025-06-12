import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // Or your actual DB client if different

export async function GET() {
  try {
    const result = await sql`
      SELECT DISTINCT ON (set_id) set_id, set_name, image
      FROM mastercard_v2
      WHERE language = 'en'
      ORDER BY release_date DESC
      LIMIT 12;
    `;

    const sets = result.rows.map(row => ({
      set_id: row.set_id,
      set_name: row.set_name,
      image: row.image
    }));

    return NextResponse.json(sets);
  } catch (error) {
    console.error('Error fetching latest sets:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
