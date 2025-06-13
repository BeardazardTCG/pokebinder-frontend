import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:ckQFRJkrJluWsJnHsDhlhvbtSridadDF@metro.proxy.rlwy.net:52025/railway',
  ssl: { rejectUnauthorized: false },
});

// Optional: faster estimated row counts without scanning tables
async function getEstimatedCount(client: any, table: string) {
  const res = await client.query(`
    SELECT reltuples::BIGINT AS estimate
    FROM pg_class
    WHERE relname = $1
  `, [table]);
  return parseInt(res.rows?.[0]?.estimate ?? '0', 10);
}

export async function GET() {
  let client;
  try {
    client = await pool.connect();

    const [sold, active, tcg] = await Promise.all([
      getEstimatedCount(client, 'dailypricelog'),
      getEstimatedCount(client, 'activedailypricelog'),
      getEstimatedCount(client, 'tcg_pricing_log'),
    ]);

    const total = sold + active + tcg;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`✅ Scrape count API hit: ${total} total (${sold} sold, ${active} active, ${tcg} tcg)`);
    }

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
