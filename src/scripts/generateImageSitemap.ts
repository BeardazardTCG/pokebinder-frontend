import fs from 'fs';
import path from 'path';
import { getAllCardsWithImages } from '@/lib/db';

const siteUrl = 'https://www.pokebinder.co.uk';

async function run() {
  try {
    const cards = await getAllCardsWithImages();

    const entries = cards.map((card) => {
      return `
  <url>
    <loc>${siteUrl}/card/${card.unique_id}</loc>
    <image:image>
      <image:loc>${card.card_image_url}</image:loc>
      <image:title>${escapeXML(card.card_name)}</image:title>
      <image:caption>${escapeXML(card.card_name)}</image:caption>
    </image:image>
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>`;

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    const filepath = path.join(publicDir, 'image-sitemap.xml');
    fs.writeFileSync(filepath, xml.trim());
    console.log('✅ image-sitemap.xml generated at /public/image-sitemap.xml');
  } catch (err) {
    console.error('❌ Failed to generate image sitemap:', err);
    process.exit(1);
  }
}

function escapeXML(str: string): string {
  return str.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

run();
