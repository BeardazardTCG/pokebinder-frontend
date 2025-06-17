import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'image-sitemap.xml');
    const fileContents = await fs.readFile(filePath, 'utf-8');

    return new NextResponse(fileContents, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (err) {
    console.error('❌ Error loading image sitemap:', err);
    return new NextResponse('Not Found', { status: 404 });
  }
}
