import { Pool } from 'pg';

// 🔒 Hardcoded DB string for now to bypass .env issues
const pool = new Pool({
  connectionString: 'postgresql://postgres:ckQFRJkrJluWsJnHsDhlhvbtSridadDF@metro.proxy.rlwy.net:52025/railway',
  ssl: { rejectUnauthorized: false },
});

export async function getCardFromDB(uniqueId: string) {
  console.log("🔄 getCardFromDB(): uniqueId =", uniqueId);

  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT card_name, card_number, card_image_url, set_name, 
              clean_avg_value AS price,
              set_logo_url, set_symbol_url
       FROM mastercard_v2 
       WHERE unique_id = $1 
       LIMIT 1`,
      [uniqueId]
    );

    console.log("🧾 Query result:", res.rows);

    if (!res.rows.length) {
      console.log("❌ No card found for unique_id:", uniqueId);
      throw new Error(`Card not found: ${uniqueId}`);
    }

    const card = res.rows[0];

    return {
      ...card,
      price: card.price !== null ? parseFloat(card.price) : null,
    }; // ← ✅ SEMICOLON HERE
  } catch (err) {
    console.error('🔥 DB Fetch Error in getCardFromDB:', err);
    throw err;
  } finally {
    client.release();
  }
}
