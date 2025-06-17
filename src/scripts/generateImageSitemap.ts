// ✅ generateImageSitemap.ts (final patched version)
import fs from 'fs';
import path from 'path';
import { getAllCardsWithImages } from '@/lib/db';

const siteUrl = 'https://www.pokebinder.co.uk';

async function run() {
  const cards = await getAllCardsWithImages();

  const entries = cards.map((card) => {
    return `
  <url>
    <loc>${siteUrl}/card/${card.unique_id}</loc>
    <image:image>
      <image:loc>${card.card_image_url}</image:loc>
      <image:title>${card.card_name}</image:title>
      <image:caption>${card.card_name}</image:caption>
    </image:image>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>`;

  const filepath = path.join(process.cwd(), 'public', 'image-sitemap.xml');
  fs.writeFileSync(filepath, xml.trim());
  console.log('✅ image-sitemap.xml generated.');
}

run();
