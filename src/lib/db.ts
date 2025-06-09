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
        m.clean_avg_value,
        m.verified_sales_logged,
        m.price_range_seen_min,
        m.price_range_seen_max,
        m.type,
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
      unique_id: card.unique_id,
      set_code: card.set_code,
      card_name: card.card_name,
      card_number: card.card_number,
      card_image_url: card.card_image_url,
      set_logo_url: card.set_logo_url,
      clean_avg_value: card.clean_avg_value !== null ? parseFloat(card.clean_avg_value) : null,
      price: card.clean_avg_value !== null ? parseFloat(card.clean_avg_value) : null,
      set_name: card.set_name,
      sold_date: card.sold_date,
      average_price: card.average_price !== null ? parseFloat(card.average_price) : null,
      median_price: card.median_price !== null ? parseFloat(card.median_price) : null,
      verified_sales_logged: card.verified_sales_logged !== null ? parseInt(card.verified_sales_logged) : null,
      price_range_seen_min: card.price_range_seen_min !== null ? parseFloat(card.price_range_seen_min) : null,
      price_range_seen_max: card.price_range_seen_max !== null ? parseFloat(card.price_range_seen_max) : null,
      type: card.type ?? null, // ✅ <-- new field added
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

// === Hybrid search: 2-of-3 match if multiple words, OR match-any if only 1 keyword ===
export async function getSearchResults(query: string) {
  const client = await pool.connect();
  try {
    const keywords = query.toLowerCase().split(/[\s\-\/]+/).filter(Boolean);

    if (!keywords.length) {
      console.warn("🔍 No usable keywords in query");
      return [];
    }

    const fuzzyKeywords = keywords.map(k => `%${k}%`);

    let sql;

    if (keywords.length === 1) {
      // Simple fallback: match any 1 field
      sql = `
        SELECT 
          unique_id,
          card_name,
          card_number,
          set_name,
          card_image_url,
          clean_avg_value,
          price_range_seen_min,
          price_range_seen_max
        FROM mastercard_v2
        WHERE
          LOWER(card_name) LIKE ANY ($1::text[])
          OR LOWER(set_name) LIKE ANY ($1::text[])
          OR card_number LIKE ANY ($1::text[])
        LIMIT 50
      `;
    } else {
      // Stricter logic: must match 2 out of 3 fields
      sql = `
        SELECT 
          unique_id,
          card_name,
          card_number,
          set_name,
          card_image_url,
          clean_avg_value,
          price_range_seen_min,
          price_range_seen_max
        FROM mastercard_v2
        WHERE (
          (LOWER(card_name) LIKE ANY ($1::text[])::boolean)::int +
          (LOWER(set_name) LIKE ANY ($1::text[])::boolean)::int +
          (card_number LIKE ANY ($1::text[])::boolean)::int
        ) >= 2
        LIMIT 50
      `;
    }

    const result = await client.query(sql, [fuzzyKeywords]);

    return result.rows.map(card => ({
      unique_id: card.unique_id,
      card_name: card.card_name,
      set_name: card.set_name,
      card_number: card.card_number,
      card_image_url: card.card_image_url,
      clean_avg_value: card.clean_avg_value !== null ? parseFloat(card.clean_avg_value) : null,
      price_range_seen_min: card.price_range_seen_min !== null ? parseFloat(card.price_range_seen_min) : null,
      price_range_seen_max: card.price_range_seen_max !== null ? parseFloat(card.price_range_seen_max) : null,
    }));
  } catch (err) {
    console.error("🔥 DB Fetch Error in getSearchResults:", err);
    return [];
  } finally {
    client.release();
  }
}
