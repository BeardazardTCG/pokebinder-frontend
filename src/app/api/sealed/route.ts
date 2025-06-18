// ✅ src/app/api/sealed/route.ts

import { NextResponse } from 'next/server';
import { getEbayAccessToken } from '@/lib/ebayAuth';

interface EbayItem {
  title: string;
  price: { value: string; currency: string };
  image?: { imageUrl?: string };
  itemWebUrl: string;
}

export async function GET() {
  const token = await getEbayAccessToken();
  if (!token) return NextResponse.json({ error: 'eBay token failed' }, { status: 500 });

  const query = 'pokemon booster etb pack sealed';
  const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&filter=itemLocationCountry:GB,buyingOptions:{FIXED_PRICE}&limit=24&sort=price`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_GB', // ✅ Ensure GBP pricing
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('❌ eBay API error:', text);
      return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();
    const rawItems: EbayItem[] = data.itemSummaries || [];

    const items = rawItems
      .filter((item) =>
        /(booster|etb|pack)/i.test(item.title) &&
        !/(coin|counter|damage|vstar|marker|code|not factory|display)/i.test(item.title)
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    const affiliateItems = items.map((item) => ({
      title: item.title,
      price: parseFloat(item.price.value),
      img: item.image?.imageUrl || null,
      url: `${item.itemWebUrl}?campid=5339108925`,
    }));

    return NextResponse.json(affiliateItems);
  } catch (err) {
    console.error('🔥 eBay sealed block failed:', err);
    return NextResponse.json([], { status: 200 });
  }
}
