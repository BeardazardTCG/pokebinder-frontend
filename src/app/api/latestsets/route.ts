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

    const sets = await Promise.all(
      result.rows.map(async (row) => {
        const cardsRes = await pool.query(
          `SELECT card_slug, set_slug, card_number
           FROM mastercard_v2
           WHERE set_id = $1 AND card_slug IS NOT NULL
           LIMIT 6`,
          [row.set_id]
        );

        const cards = cardsRes.rows.map(card => ({
          url: `/cards/${card.card_slug}/${card.set_slug}/${card.card_number}`
        }));

        return {
          set_id: row.set_id,
          set_name: row.set_name,
          image: row.image,
          cards
        };
      })
    );

    console.log("✅ /api/latestsets fetched:", sets.length, "sets");

    return NextResponse.json(sets);
  } catch (error) {
    console.error('🔥 Error in /api/latestsets:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
