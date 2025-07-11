// ✅ File: /lib/db.ts

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:ckQFRJkrJluWsJnHsDhlhvbtSridadDF@metro.proxy.rlwy.net:52025/railway',
  ssl: { rejectUnauthorized: false },
});

export { pool };

// === Hybrid search: 2-of-3 match if multiple words, OR match-any if only 1 keyword ===
export async function getSearchResults(query: string) {
  const client = await pool.connect();
  try {
    const keywords = query.toLowerCase().split(/[\s\-/]+/).filter(Boolean);
    if (!keywords.length) {
      console.warn("🔍 No usable keywords in query");
      return [];
    }

    const fuzzyKeywords = keywords.map(k => `%${k}%`);
    let sql;

    if (keywords.length === 1) {
      sql = `
        SELECT 
          unique_id,
          card_name,
          card_number,
          set_name,
          set_logo_url,
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
      sql = `
        SELECT 
          unique_id,
          card_name,
          card_number,
          set_name,
          set_logo_url,
          card_image_url,
          clean_avg_value,
          price_range_seen_min,
          price_range_seen_max
        FROM mastercard_v2
        WHERE (
          CASE WHEN LOWER(card_name) LIKE ANY ($1::text[]) THEN 1 ELSE 0 END +
          CASE WHEN LOWER(set_name) LIKE ANY ($1::text[]) THEN 1 ELSE 0 END +
          CASE WHEN card_number LIKE ANY ($1::text[]) THEN 1 ELSE 0 END
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
      set_logo_url: card.set_logo_url ?? null,
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

// === Fetch main card by unique_id ===
export async function getCardFromDB(uniqueId: string) {
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
      throw new Error(`Card not found: ${uniqueId}`);
    }

    const card = latest.rows[0];

    return {
      unique_id: card.unique_id,
      set_code: card.set_code,
      card_name: card.card_name,
      card_number: card.card_number,
      card_image_url: card.card_image_url,
      set_logo_url: card.set_logo_url ?? null,
      clean_avg_value: card.clean_avg_value !== null ? parseFloat(card.clean_avg_value) : null,
      price: card.clean_avg_value !== null ? parseFloat(card.clean_avg_value) : null,
      set_name: card.set_name,
      sold_date: card.sold_date,
      average_price: card.average_price !== null ? parseFloat(card.average_price) : null,
      median_price: card.median_price !== null ? parseFloat(card.median_price) : null,
      verified_sales_logged: card.verified_sales_logged !== null ? parseInt(card.verified_sales_logged) : null,
      price_range_seen_min: card.price_range_seen_min !== null ? parseFloat(card.price_range_seen_min) : null,
      price_range_seen_max: card.price_range_seen_max !== null ? parseFloat(card.price_range_seen_max) : null,
      type: card.type ?? null,
    };
  } catch (err) {
    console.error('🔥 DB Fetch Error in getCardFromDB:', err);
    throw err;
  } finally {
    client.release();
  }
}

export async function getCardByParts(character: string, setSlug: string, cardNumber: string) {
  const client = await pool.connect();
  try {
    const safeCharacter = decodeURIComponent(character).toLowerCase().replace(/\s+/g, '-');

    const res = await client.query(
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
      WHERE 
        m.card_slug = $1
        AND m.set_slug = $2
        AND m.card_number = $3
      ORDER BY d.sold_date DESC
      LIMIT 1
      `,
      [safeCharacter, setSlug, cardNumber]
    );

    if (!res.rows.length) {
      throw new Error(`Card not found for ${safeCharacter}/${setSlug}/${cardNumber}`);
    }

    const card = res.rows[0];

    return {
      unique_id: card.unique_id,
      set_code: card.set_code,
      card_name: card.card_name,
      card_number: card.card_number,
      card_image_url: card.card_image_url,
      set_logo_url: card.set_logo_url ?? null,
      clean_avg_value: card.clean_avg_value !== null ? parseFloat(card.clean_avg_value) : null,
      price: card.clean_avg_value !== null ? parseFloat(card.clean_avg_value) : null,
      set_name: card.set_name,
      sold_date: card.sold_date,
      average_price: card.average_price !== null ? parseFloat(card.average_price) : null,
      median_price: card.median_price !== null ? parseFloat(card.median_price) : null,
      verified_sales_logged: card.verified_sales_logged !== null ? parseInt(card.verified_sales_logged) : null,
      price_range_seen_min: card.price_range_seen_min !== null ? parseFloat(card.price_range_seen_min) : null,
      price_range_seen_max: card.price_range_seen_max !== null ? parseFloat(card.price_range_seen_max) : null,
      type: card.type ?? null,
    };
  } catch (err) {
    console.error("🔥 DB Fetch Error in getCardByParts:", err);
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

// === Fetch all cards in a set ===
export async function getCardsBySetId(setId: string) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `
      SELECT 
        unique_id,
        card_name,
        card_number,
        card_image_url,
        set_name,
        set_logo_url,
        clean_avg_value,
        price_range_seen_min,
        price_range_seen_max
      FROM mastercard_v2
      WHERE set_id = $1
      ORDER BY card_number::int NULLS LAST
      `,
      [setId]
    );

    return res.rows.map(card => ({
      unique_id: card.unique_id,
      card_name: card.card_name,
      card_number: card.card_number,
      card_image_url: card.card_image_url,
      set_name: card.set_name,
      set_logo_url: card.set_logo_url ?? null,
      clean_avg_value: card.clean_avg_value !== null ? parseFloat(card.clean_avg_value) : null,
      price_range_seen_min: card.price_range_seen_min !== null ? parseFloat(card.price_range_seen_min) : null,
      price_range_seen_max: card.price_range_seen_max !== null ? parseFloat(card.price_range_seen_max) : null,
    }));
  } catch (err) {
    console.error('🔥 DB Fetch Error in getCardsBySetId:', err);
    throw err;
  } finally {
    client.release();
  }
}

// === Fetch all cards with images and unique IDs ===
export async function getAllCardsWithImages() {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT unique_id, card_image_url
      FROM mastercard_v2
      WHERE card_image_url IS NOT NULL
    `);
    return result.rows;
  } catch (err) {
    console.error('🔥 DB Fetch Error in getAllCardsWithImages:', err);
    throw err;
  } finally {
    client.release();
  }
}

// === Fetch all unique card slugs (for old sitemap) ===
export async function getAllCardSlugs(): Promise<string[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT unique_id
      FROM mastercard_v2
      WHERE unique_id IS NOT NULL AND card_image_url IS NOT NULL
    `);
    return result.rows.map((row) => row.unique_id);
  } catch (err) {
    console.error('🔥 DB Fetch Error in getAllCardSlugs:', err);
    throw err;
  } finally {
    client.release();
  }
}

// ✅ === NEW: Fetch slugs for clean card URLs (for new sitemap) ===
export async function getAllSeoCardSlugs(): Promise<
  { card_name: string; set_slug: string; card_number: string }[]
> {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT card_name, set_slug, card_number
      FROM mastercard_v2
      WHERE card_image_url IS NOT NULL
      LIMIT 18000;
    `);
    return result.rows;
  } catch (err) {
    console.error('🔥 DB Fetch Error in getAllSeoCardSlugs:', err);
    throw err;
  } finally {
    client.release();
  }
}
