import fs from 'fs';
import path from 'path';
import { getAllCardSlugs } from '@/lib/db'; // Create if not exists

async function generateCardSitemap() {
  const baseUrl = 'https://www.pokebinder.co.uk/card/';
  const slugs = await getAllCardSlugs();

  const urls = slugs.map((slug: string) => {
    return `<url><loc>${baseUrl}${slug}</loc></url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public/card-sitemap.xml'), sitemap);
  console.log('✅ card-sitemap.xml generated.');
}

generateCardSitemap();
