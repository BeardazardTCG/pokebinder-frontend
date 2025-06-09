// FILE: /src/app/api/ebay/active/route.ts

import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ items: [] });
  }

  const encoded = encodeURIComponent(query);
  const ebayUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${encoded}&_sop=1&_ipg=50&_in_kw=4&LH_BIN=1&rt=nc&LH_PrefLoc=1`;

  try {
    const res = await fetch(ebayUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const items: any[] = [];

    $('li.s-item').each((_, el) => {
      const title = $(el).find('h3.s-item__title').text().trim();
      const priceText = $(el).find('.s-item__price').text().replace(/[^\d.]/g, '');
      const url = $(el).find('a.s-item__link').attr('href');
      const image = $(el).find('.s-item__image-img').attr('src');

      if (title && priceText && url && image) {
        items.push({ title, price: priceText, url, image });
      }
    });

    return NextResponse.json({ items });
  } catch (err) {
    console.error('eBay fetch failed:', err);
    return NextResponse.json({ items: [] });
  }
}
