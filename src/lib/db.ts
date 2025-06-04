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
        m.verified_sales_logged,
        m.price_range_seen_min,
        m.price_range_seen_max,
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

    return {
      ...card,
      price: card.price !== null ? parseFloat(card.price) : null,
      median_price: card.median_price !== null ? parseFloat(card.median_price) : null,
      average_price: card.average_price !== null ? parseFloat(card.average_price) : null,
      verified_sales_logged: card.verified_sales_logged !== null ? parseInt(card.verified_sales_logged) : null,
      price_range_seen_min: card.price_range_seen_min !== null ? parseFloat(card.price_range_seen_min) : null,
      price_range_seen_max: card.price_range_seen_max !== null ? parseFloat(card.price_range_seen_max) : null,
      sold_date: card.sold_date,
    };
  } catch (err) {
    console.error('🔥 DB Fetch Error in getCardFromDB:', err);
    throw err;
  } finally {
    client.release();
  }
}
