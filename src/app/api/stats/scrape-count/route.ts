import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// 🔒 Direct connection string for now (works exactly like Beekeeper)
const pool = new Pool({
  connectionString: 'postgresql://postgres:ckQFRJkrJluWsJnHsDhlhvbtSridadDF@metro.proxy.rlwy.net:52025/railway',
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET() {
  let client;
  try {
    client = await pool.connect();

    const { rows: soldRows } = await client.query('SELECT COUNT(*) FROM dailypricelog');
    const { rows: activeRows } = await client.query('SELECT COUNT(*) FROM activedailypricelog');
    const { rows: tcgRows } = await client.query('SELECT COUNT(*) FROM tcg_pricing_log');

    const sold = parseInt(soldRows[0]?.count ?? '0', 10);
    const active = parseInt(activeRows[0]?.count ?? '0', 10);
    const tcg = parseInt(tcgRows[0]?.count ?? '0', 10);
    const total = sold + active + tcg;

    return NextResponse.json({
      sold,
      active,
      tcg,
      total,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    console.error('❌ API error:', err);
    return NextResponse.json({
      error: 'Failed to load scrape counts',
      name: err instanceof Error ? err.name : 'UnknownError',
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}

