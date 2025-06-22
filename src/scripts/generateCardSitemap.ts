import fs from 'fs';
import path from 'path';
import { getAllCardSlugs } from '@/lib/db'; // Must return an array of slug strings

async function generateCardSitemap() {
  try {
    const baseUrl = 'https://www.pokebinder.co.uk/card/';
    const slugs: string[] = await getAllCardSlugs();

    const urls = slugs.map((slug) => {
      return `
  <url>
    <loc>${baseUrl}${slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    const outputPath = path.join(process.cwd(), 'public/card-sitemap.xml');
    fs.writeFileSync(outputPath, sitemap.trim());
    console.log(`✅ card-sitemap.xml written to ${outputPath}`);
  } catch (err) {
    console.error('❌ Error generating card sitemap:', err);
  }
}

generateCardSitemap();
