import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const client = await pool.connect();

  try {
    await client.query(
      'INSERT INTO notify_list (email) VALUES ($1) ON CONFLICT DO NOTHING',
      [email]
    );

    const existing = await client.query(
      'SELECT code FROM tcg_codes_pool WHERE claimed_by = $1',
      [email]
    );

    if (existing.rows.length) {
      return NextResponse.json({ success: true, code: existing.rows[0].code });
    }

    const codeRes = await client.query(
      'SELECT id, code FROM tcg_codes_pool WHERE claimed_by IS NULL LIMIT 1'
    );

    if (codeRes.rows.length === 0) {
      return NextResponse.json({ success: true, code: null });
    }

    const { id, code } = codeRes.rows[0];

    await client.query(
      'UPDATE tcg_codes_pool SET claimed_by = $1, claimed_at = NOW() WHERE id = $2',
      [email, id]
    );

    return NextResponse.json({ success: true, code });
  } catch (err) {
    console.error('🔥 Notify API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  } finally {
    client.release();
  }
}
