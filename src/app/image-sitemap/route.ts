import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'image-sitemap.xml');

  try {
    const xml = fs.readFileSync(filePath, 'utf8');
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('❌ Sitemap Read Error:', error);
    return new NextResponse('Sitemap not found', { status: 404 });
  }
}

