import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const domain = 'https://pdfshub.netlify.app';

const getISODate = (filePath) => {
  try {
    const stat = fs.statSync(filePath);
    return stat.mtime.toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
};

const routes = [];

// 1. Homepage
routes.push({
  url: `${domain}/`,
  lastmod: getISODate(path.join(root, 'index.html')),
  changefreq: 'weekly',
  priority: '1.0'
});

// 2. Guides Hub
routes.push({
  url: `${domain}/guides/`,
  lastmod: getISODate(path.join(root, 'guides', 'index.html')),
  changefreq: 'weekly',
  priority: '0.9'
});

// 3. 33 Tools
const toolsDir = path.join(root, 'tools');
const toolFiles = fs.readdirSync(toolsDir)
  .filter(f => f.endsWith('.html'))
  .sort();

for (const toolFile of toolFiles) {
  routes.push({
    url: `${domain}/tools/${toolFile}`,
    lastmod: getISODate(path.join(toolsDir, toolFile)),
    changefreq: 'monthly',
    priority: '0.9'
  });
}

// 4. 33 Individual Guides
const guidesDir = path.join(root, 'guides');
const guideDirs = fs.readdirSync(guidesDir)
  .filter(f => fs.statSync(path.join(guidesDir, f)).isDirectory())
  .sort();

for (const guideDir of guideDirs) {
  const guideIndex = path.join(guidesDir, guideDir, 'index.html');
  routes.push({
    url: `${domain}/guides/${guideDir}/`,
    lastmod: getISODate(guideIndex),
    changefreq: 'monthly',
    priority: '0.8'
  });
}

// 5. Editorial & App Pages
routes.push({
  url: `${domain}/menu-bar/about.html`,
  lastmod: getISODate(path.join(root, 'menu-bar', 'about.html')),
  changefreq: 'monthly',
  priority: '0.7'
});

routes.push({
  url: `${domain}/install/`,
  lastmod: getISODate(path.join(root, 'install', 'index.html')),
  changefreq: 'monthly',
  priority: '0.7'
});

routes.push({
  url: `${domain}/menu-bar/privacy.html`,
  lastmod: getISODate(path.join(root, 'menu-bar', 'privacy.html')),
  changefreq: 'monthly',
  priority: '0.6'
});

routes.push({
  url: `${domain}/menu-bar/terms.html`,
  lastmod: getISODate(path.join(root, 'menu-bar', 'terms.html')),
  changefreq: 'monthly',
  priority: '0.5'
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${r.url}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outputPath = path.join(root, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemapXml, 'utf8');
console.log(`Generated canonical sitemap.xml with ${routes.length} verified URLs at ${outputPath}`);
