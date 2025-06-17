import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'image-sitemap.xml');

  try {
    const xml = fs.readFileSync(filePath, 'utf-8');
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (err) {
    console.error('❌ Failed to load image-sitemap.xml:', err);
    return new NextResponse('Not found', { status: 404 });
  }
}
