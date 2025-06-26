import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO users (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING id',
      [email.trim().toLowerCase()]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'User already exists' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Signup successful', userId: result.rows[0].id });
  } catch (err) {
    console.error('🔥 Signup error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  } finally {
    client.release();
  }
}
