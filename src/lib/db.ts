import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:ckQFRJkrJluWsJnHsDhlhvbtSridadDF@metro.proxy.rlwy.net:52025/railway',
  ssl: { rejectUnauthorized: false },
});

// === Fetch main card by unique_id ===
export async function getCardFromDB(uniqueId: string) {
  console.log("🔄 getCardFromDB(): uniqueId =", uniqueId);

  const client = await pool.connect();
  try {
    const latest = await client.query(
      `
      SELECT 
        m.unique_id,
        m.card_name,
        m.card_number,
        m.card_image_url,
        m.set_code,
        m.set_name,
        m.set_logo_url,
        m.set_symbol_url,
        m.clean_avg_value AS price,
        d.sale_count,
        d.sold_date,
        d.median_price,
        d.average_price
      FROM mastercard_v2 m
      LEFT JOIN dailypricelog d ON m.unique_id = d.unique_id
      WHERE m.unique_id = $1
      ORDER BY d.sold_date DESC
      LIMIT 1
      `,
      [uniqueId]
    );

    if (!latest.rows.length) {
      console.log("❌ No card found for unique_id:", uniqueId);
      throw new Error(`Card not found: ${uniqueId}`);
    }

    const card = latest.rows[0];

    const aggregate = await client.query(
      `
      SELECT 
        SUM(sale_count) AS total_sales,
        MIN(median_price) AS min_price,
        MAX(median_price) AS max_price
      FROM dailypricelog
      WHERE unique_id = $1
      `,
      [uniqueId]
    );

    const stats = aggregate.rows[0];

    return {
      ...card,
      price: card.price !== null ? parseFloat(card.price) : null,
      median_price: card.median_price !== null ? parseFloat(card.median_price) : null,
      average_price: card.average_price !== null ? parseFloat(card.average_price) : null,
      sale_count: card.sale_count !== null ? parseInt(card.sale_count) : null,
      sold_date: card.sold_date,
      total_sales: stats.total_sales !== null ? parseInt(stats.total_sales) : null,
      min_price: stats.min_price !== null ? parseFloat(stats.min_price) : null,
      max_price: stats.max_price !== null ? parseFloat(stats.max_price) : null,
    };
  } catch (err) {
    console.error('🔥 DB Fetch Error in getCardFromDB:', err);
    throw err;
  } finally {
    client.release();
  }
}

// === Fetch 4 more cards from the same set ===
export async function getMoreFromSet(setCode: string, excludeId: string) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `
      SELECT 
        unique_id,
        card_name,
        card_number,
        card_image_url,
        clean_avg_value AS price
      FROM mastercard_v2
      WHERE set_code = $1 AND unique_id != $2
      ORDER BY RANDOM()
      LIMIT 4
      `,
      [setCode, excludeId]
    );

    return res.rows.map(card => ({
      ...card,
      price: card.price !== null ? parseFloat(card.price) : null,
    }));
  } catch (err) {
    console.error('🔥 DB Fetch Error in getMoreFromSet:', err);
    throw err;
  } finally {
    client.release();
  }
}

