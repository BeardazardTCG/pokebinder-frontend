// ✅ File: src/app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-static'; // ✅ Make it cache-safe + crawlable

export async function GET() {
  const content = `User-agent: *
Disallow: /api/

Allow: /

Sitemap: https://www.pokebinder.co.uk/sitemap-index.xml
Sitemap: https://www.pokebinder.co.uk/cards-sitemap
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
