// /app/api/sealed/route.ts
import { NextResponse } from 'next/server';
import { getEbayAccessToken } from '@/lib/ebayAuth';

export async function GET() {
  const token = await getEbayAccessToken();
  if (!token) return NextResponse.json({ error: 'Failed to fetch eBay token' }, { status: 500 });

  const campaignId = process.env.EBAY_CAMPAIGN_ID || '5339108925';
  const query = `pokemon sealed -psa -graded -lot -bundle`;
  const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&filter=buyingOptions:{FIXED_PRICE},itemLocationCountry:GB&limit=30&sort=price&fieldgroups=PRODUCT`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error('❌ eBay API failed:', await res.text());
    return NextResponse.json([], { status: 500 });
  }

  const data = await res.json();
  const items = (data.itemSummaries || []).slice(0, 20);

  const formatted = items.map((item: any) => ({
    title: item.title,
    price: parseFloat(item.price?.value ?? 0),
    img: item.image?.imageUrl || null,
    url: `https://rover.ebay.com/rover/1/${campaignId}/0/1?ff3=4&pub=${campaignId}&toolid=10001&campid=${campaignId}&customid=pokebinder&mpre=${encodeURIComponent(item.itemWebUrl)}`,
  }));

  return NextResponse.json(formatted);
}
