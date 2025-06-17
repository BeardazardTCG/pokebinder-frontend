import { NextResponse } from 'next/server';
import { getEbayAccessToken } from '@/lib/ebayAuth';

const KEYWORDS = [
  { title: "151 Booster Bundle", query: "pokemon 151 booster bundle sealed" },
  { title: "Paldean Fates ETB", query: "paldean fates elite trainer box sealed" },
  { title: "Scarlet & Violet Booster Box", query: "scarlet violet booster box sealed" },
  { title: "Celebrations Mini Tin", query: "pokemon celebrations mini tin sealed" },
];

export async function GET() {
  const token = await getEbayAccessToken();
  if (!token) return NextResponse.json({ error: 'Failed to fetch eBay token' }, { status: 500 });

  const campaignId = process.env.EBAY_CAMPAIGN_ID;

  const results = await Promise.all(
    KEYWORDS.map(async ({ title, query }) => {
      const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&filter=buyingOptions:{FIXED_PRICE}&limit=1&sort=price&fieldgroups=PRODUCT&buyerRegion=GB`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        console.error(`❌ eBay API error for ${title}:`, await res.text());
        return { title, price: 0, img: null, url: null, warning: true };
      }

      const data = await res.json();
      const item = data.itemSummaries?.[0];

      if (!item) {
        return { title, price: 0, img: null, url: null, warning: true };
      }

      const fullUrl = `${item.itemWebUrl}?campid=${campaignId}`;
      const price = item.price.value;
      const img = item.image?.imageUrl ?? null;

      return {
        title: item.title,
        price: parseFloat(price),
        img,
        url: fullUrl,
        set: title,
      };
    })
  );

  return NextResponse.json(results);
}
