import { NextResponse } from 'next/server';
import { getEbayAccessToken } from '@/lib/ebayAuth';

type EbayItem = {
  title: string;
  price: { value: string };
  image?: { imageUrl?: string };
  itemWebUrl: string;
};

export async function GET() {
  const token = await getEbayAccessToken();
  if (!token) return NextResponse.json({ error: 'Failed to fetch eBay token' }, { status: 500 });

  const campaignId = process.env.EBAY_CAMPAIGN_ID || '5339108925';

  const query = 'pokemon sealed booster box pack etb -marker -counter -coin -damage -vstar -energy';
  const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&filter=buyingOptions:{FIXED_PRICE},itemLocationCountry:GB&limit=20&sort=price`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`❌ eBay API error:`, errText);
    return NextResponse.json([], { status: 200 });
  }

  const data = await res.json();
  const items: EbayItem[] = (data.itemSummaries || [])
    .filter((item) => /(booster|etb|box|pack)/i.test(item.title))
    .sort(() => 0.5 - Math.random()) // shuffle
    .slice(0, 6); // limit to 6

  const results = items.map((item) => ({
    title: item.title,
    price: parseFloat(item.price.value),
    img: item.image?.imageUrl || null,
    url: `${item.itemWebUrl}?campid=${campaignId}`,
  }));

  return NextResponse.json(results);
}
