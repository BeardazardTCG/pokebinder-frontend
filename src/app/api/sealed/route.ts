import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

const CAMP_ID = "5339108925";

const KEYWORDS = [
  { title: "151 Booster Bundle", query: "pokemon 151 sealed bundle" },
  { title: "Paldean Fates ETB", query: "paldean fates etb sealed" },
  { title: "Scarlet & Violet Booster Box", query: "scarlet violet booster box sealed" },
  { title: "Celebrations Mini Tin", query: "celebrations mini tin sealed" },
];

export async function GET() {
  console.log("🔍 Scraping eBay UK for sealed Buy It Now listings...");

  const allItems = await Promise.all(
    KEYWORDS.map(async (item) => {
      const searchUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(
        item.query
      )}&_sop=12&LH_BIN=1&LH_PrefLoc=1`;

      try {
        const res = await fetch(searchUrl);
        const html = await res.text();
        const $ = cheerio.load(html);

        const itemBlock = $("li.s-item")
          .filter((_, el) => {
            const title = $(el).find(".s-item__title").text().toLowerCase();
            const href = $(el).find("a.s-item__link").attr("href") ?? "";
            return (
              Boolean(title) &&
              !title.includes("shop on ebay") &&
              href.includes("/itm/") &&
              !href.includes("123456") &&
              !title.includes("auction") &&
              !title.includes("job lot") &&
              !title.includes("broken") &&
              !title.includes("bundle of")
            );
          })
          .first();

        const title = itemBlock.find(".s-item__title").text().trim();
        const rawUrl = itemBlock.find("a.s-item__link").attr("href") ?? "";

        // fallback: regex scan for image URL directly from raw HTML
        const match = html.match(/https:\/\/i\.ebayimg\.com\S+?s-l\d+\.webp/);
        const img = match ? match[0] : null;

        const priceText = itemBlock.find(".s-item__price").text().replace(/[^\d\.]/g, "");
        const price = parseFloat(priceText) || 0;

        if (!title || !rawUrl || !rawUrl.includes("/itm/")) {
          console.warn(`⚠️ No valid listing for ${item.title}`);
          return {
            title: item.title,
            price: 0,
            img: null,
            url: null,
            set: item.title,
            warning: true,
          };
        }

        // ✅ SAFELY append campid param depending on existing query string
        const fullUrl = rawUrl.includes("?")
          ? `${rawUrl}&campid=${CAMP_ID}`
          : `${rawUrl}?campid=${CAMP_ID}`;

        return {
          title,
          price,
          img,
          url: fullUrl,
          set: item.title,
        };
      } catch (err) {
        console.error(`❌ Error scraping ${item.title}:`, err);
        return null;
      }
    })
  );

  return NextResponse.json(allItems.filter(Boolean));
}
