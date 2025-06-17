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

  const campaignId = process.env.EBAY_CAMPAIGN_ID || '5339108925';

  const results = await Promise.all(
    KEYWORDS.map(async ({ title, query }) => {
      const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&filter=buyingOptions:{FIXED_PRICE},itemLocationCountry:GB&limit=4&sort=price&fieldgroups=PRODUCT`;

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
      const options = data.itemSummaries || [];
      if (!options.length) return { title, price: 0, img: null, url: null };

      const item = options[Math.floor(Math.random() * options.length)];
      const cleanUrl = `https://rover.ebay.com/rover/1/${campaignId}/0/1?ff3=4&pub=${campaignId}&toolid=10001&campid=${campaignId}&customid=pokebinder&mpre=${encodeURIComponent(item.itemWebUrl)}`;

      return {
        title: item.title,
        price: parseFloat(item.price.value),
        img: item.image?.imageUrl ?? null,
        url: cleanUrl,
        set: title,
      };
    })
  );

  return NextResponse.json(results);
}
