import fs from 'fs';
import path from 'path';

async function generateSitemapIndex() {
  const baseUrl = 'https://www.pokebinder.co.uk';

  const sitemapFiles = [
    '/sitemap.xml',
    '/card-sitemap.xml',
    '/image-sitemap.xml',
    // Add more here as needed, e.g. '/blog-sitemap.xml'
  ];

  const urls = sitemapFiles.map(file => {
    return `<sitemap><loc>${baseUrl}${file}</loc></sitemap>`;
  }).join('\n');

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</sitemapindex>`;

  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap-index.xml'), sitemapIndex);
  console.log('✅ sitemap-index.xml generated.');
}

generateSitemapIndex();
