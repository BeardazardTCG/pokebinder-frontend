import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });

  const client = await pool.connect();
  try {
    // Insert email if not already present
    await client.query(
      'INSERT INTO notify_list (email) VALUES ($1) ON CONFLICT DO NOTHING',
      [email]
    );

    // Check if this email has already claimed a code
    const existing = await client.query(
      'SELECT code FROM tcg_codes_pool WHERE claimed_by = $1',
      [email]
    );

    if (existing.rows.length) {
      return res.status(200).json({ success: true, code: existing.rows[0].code });
    }

    // Grab one unclaimed code
    const codeRes = await client.query(
      'SELECT id, code FROM tcg_codes_pool WHERE claimed_by IS NULL LIMIT 1'
    );

    if (codeRes.rows.length === 0) {
      return res.status(200).json({ success: true, code: null }); // All codes claimed
    }

    const { id, code } = codeRes.rows[0];

    // Mark code as claimed
    await client.query(
      'UPDATE tcg_codes_pool SET claimed_by = $1, claimed_at = NOW() WHERE id = $2',
      [email, id]
    );

    return res.status(200).json({ success: true, code });
  } catch (err) {
    console.error('🔥 Notify API error:', err);
    return res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
}
