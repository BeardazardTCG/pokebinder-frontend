import fs from 'fs';
import path from 'path';

async function generateSitemapIndex() {
  const baseUrl = 'https://www.pokebinder.co.uk';

  const sitemapFiles = [
    '/card-sitemap.xml',
    '/image-sitemap.xml',
    // Future additions like '/blog-sitemap.xml' can be added here
  ];

  const urls = sitemapFiles
    .map(file => `<sitemap><loc>${baseUrl}${file}</loc></sitemap>`)
    .join('\n');

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</sitemapindex>`;

  const outputPath = path.join(process.cwd(), 'public', 'sitemap-index.xml');
  fs.writeFileSync(outputPath, sitemapIndex);

  console.log('✅ sitemap-index.xml generated.');
}

generateSitemapIndex();
