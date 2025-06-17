import { NextResponse } from 'next/server';
import { getEbayAccessToken } from '@/lib/ebayAuth';

interface EbayItem {
  title: string;
  price: { value: string };
  image?: { imageUrl: string };
  itemId: string;
  itemWebUrl: string;
}

export async function GET() {
  const token = await getEbayAccessToken();
  if (!token) {
    return NextResponse.json({ error: 'eBay token failed' }, { status: 500 });
  }

  const query = "pokemon booster box OR etb OR sealed pack";
  const campaignId = process.env.EBAY_CAMPAIGN_ID || '5339108925';

  const url = `https://api.ebay.com/buy/browse/v1/item_summary/search` +
              `?q=${encodeURIComponent(query)}` +
              `&filter=buyingOptions:{FIXED_PRICE},itemLocationCountry:GB` +
              `&limit=20&sort=price`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    console.error('❌ eBay API error:', await res.text());
    return NextResponse.json({ error: 'eBay API fail' }, { status: 500 });
  }

  const data = await res.json();
  const items: EbayItem[] = (data.itemSummaries || [])
    .filter((item: EbayItem) => /(booster|etb|box|pack)/i.test(item.title))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const results = items.map((item: EbayItem) => ({
    title: item.title,
    price: parseFloat(item.price.value),
    img: item.image?.imageUrl ?? null,
    url: `https://www.ebay.co.uk/itm/${item.itemId}?campid=${campaignId}`
  }));

  return NextResponse.json(results);
}
