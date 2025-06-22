// src/app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const content = `User-agent: *
Disallow: /api/
Allow: /api/cards-sitemap
Allow: /

Sitemap: https://www.pokebinder.co.uk/sitemap-index.xml
Sitemap: https://www.pokebinder.co.uk/api/cards-sitemap
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
