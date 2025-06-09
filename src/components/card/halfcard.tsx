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
          set_logo_url,  -- ✅ now included
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
          set_logo_url,  -- ✅ now included
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
      set_logo_url: card.set_logo_url ?? null, // ✅ now passed to frontend
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
