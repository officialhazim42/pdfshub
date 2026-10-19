import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const domain = 'https://pdfshub.netlify.app';

console.log('Running Comprehensive PDFHub SEO Audit Suite...\n');

let passCount = 0;
let failCount = 0;
const errors = [];

function assert(condition, message) {
  if (condition) {
    passCount++;
  } else {
    failCount++;
    errors.push(message);
    console.error(`  FAIL: ${message}`);
  }
}

// 1. Audit robots.txt
console.log('1. Auditing robots.txt...');
const robotsPath = path.join(root, 'robots.txt');
assert(fs.existsSync(robotsPath), 'robots.txt must exist in project root');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  assert(robots.includes('User-agent: *'), 'robots.txt must specify User-agent: *');
  assert(robots.includes('Allow: /'), 'robots.txt must allow root crawling');
  assert(robots.includes(`Sitemap: ${domain}/sitemap.xml`), `robots.txt must reference ${domain}/sitemap.xml`);
}

// 2. Audit _redirects
console.log('2. Auditing Netlify _redirects...');
const redirectsPath = path.join(root, '_redirects');
assert(fs.existsSync(redirectsPath), '_redirects must exist for Netlify configuration');
if (fs.existsSync(redirectsPath)) {
  const redirects = fs.readFileSync(redirectsPath, 'utf8');
  assert(!redirects.includes('https://pdfshub.netlify.app/* https://pdfshub.smartstores.in/:splat 301!'), '_redirects must not redirect away from primary Netlify canonical domain');
}

// 3. Audit sitemap.xml
console.log('3. Auditing sitemap.xml...');
const sitemapPath = path.join(root, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'sitemap.xml must exist in project root');

const sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  assert(sitemap.startsWith('<?xml'), 'sitemap.xml must start with XML declaration');
  assert(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'sitemap.xml must have valid urlset namespace');

  const locMatches = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)];
  for (const m of locMatches) {
    sitemapUrls.push(m[1]);
  }
  assert(sitemapUrls.length === 73, `sitemap.xml must contain exactly 73 verified URLs (found ${sitemapUrls.length})`);
  assert(sitemapUrls.every(u => u.startsWith(domain)), 'All sitemap URLs must use canonical domain');
}

// 4. Audit Open Graph Image
console.log('4. Auditing Open Graph social image...');
const ogImagePath = path.join(root, 'favicons', 'og-image.png');
assert(fs.existsSync(ogImagePath), 'favicons/og-image.png must exist');
if (fs.existsSync(ogImagePath)) {
  const stat = fs.statSync(ogImagePath);
  assert(stat.size > 10000, `favicons/og-image.png must be non-empty (size: ${stat.size} bytes)`);
}

// 5. Audit all 73 Canonical HTML Pages
console.log('5. Auditing all 73 canonical public pages for metadata, canonicals, H1s, schema, and links...');

const pagesToAudit = [
  { url: `${domain}/`, file: path.join(root, 'index.html') },
  { url: `${domain}/guides/`, file: path.join(root, 'guides', 'index.html') },
  { url: `${domain}/docs/`, file: path.join(root, 'docs', 'index.html') },
  { url: `${domain}/menu-bar/about.html`, file: path.join(root, 'menu-bar', 'about.html') },
  { url: `${domain}/install/`, file: path.join(root, 'install', 'index.html') },
  { url: `${domain}/menu-bar/privacy.html`, file: path.join(root, 'menu-bar', 'privacy.html') },
  { url: `${domain}/menu-bar/terms.html`, file: path.join(root, 'menu-bar', 'terms.html') }
];

// Add 33 tools
const toolsDir = path.join(root, 'tools');
for (const f of fs.readdirSync(toolsDir)) {
  if (f.endsWith('.html')) {
    pagesToAudit.push({
      url: `${domain}/tools/${f}`,
      file: path.join(toolsDir, f)
    });
  }
}

// Add 33 guides
const guidesDir = path.join(root, 'guides');
for (const d of fs.readdirSync(guidesDir)) {
  const full = path.join(guidesDir, d);
  if (fs.statSync(full).isDirectory()) {
    pagesToAudit.push({
      url: `${domain}/guides/${d}/`,
      file: path.join(full, 'index.html')
    });
  }
}

assert(pagesToAudit.length === 73, `Total public canonical pages must be 73 (found ${pagesToAudit.length})`);

const seenTitles = new Map();
const seenDescriptions = new Map();
const seenCanonicals = new Map();

for (const p of pagesToAudit) {
  assert(fs.existsSync(p.file), `Physical file must exist: ${p.file}`);
  if (!fs.existsSync(p.file)) continue;

  const html = fs.readFileSync(p.file, 'utf8');

  // Title audit
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  assert(titleMatch && titleMatch[1].trim().length > 10, `Page ${p.url} must have a non-empty <title>`);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    if (seenTitles.has(title)) {
      assert(false, `Duplicate <title> found on ${p.url} and ${seenTitles.get(title)}: "${title}"`);
    } else {
      seenTitles.set(title, p.url);
    }
  }

  // Meta description audit
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=(["'])([\s\S]*?)\1/i);
  assert(descMatch && descMatch[2].trim().length >= 40, `Page ${p.url} must have a descriptive meta description (length >= 40)`);
  if (descMatch) {
    const desc = descMatch[2].trim();
    if (seenDescriptions.has(desc)) {
      assert(false, `Duplicate meta description found on ${p.url} and ${seenDescriptions.get(desc)}: "${desc}"`);
    } else {
      seenDescriptions.set(desc, p.url);
    }
  }

  // Canonical tag audit
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  assert(canonicalMatch && canonicalMatch[1].trim() === p.url, `Page ${p.url} must have exact canonical tag pointing to ${p.url} (found ${canonicalMatch ? canonicalMatch[1] : 'none'})`);
  if (canonicalMatch) {
    const cUrl = canonicalMatch[1].trim();
    if (seenCanonicals.has(cUrl)) {
      assert(false, `Duplicate canonical tag reference: ${cUrl}`);
    } else {
      seenCanonicals.set(cUrl, p.url);
    }
  }

  // Robots meta audit
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([\s\S]*?)["']/i);
  assert(robotsMatch && !robotsMatch[1].includes('noindex'), `Page ${p.url} must not be blocked by noindex`);

  // Open Graph audit
  assert(html.includes('property="og:title"'), `Page ${p.url} must have og:title`);
  assert(html.includes('property="og:description"'), `Page ${p.url} must have og:description`);
  assert(html.includes('property="og:url"'), `Page ${p.url} must have og:url`);
  assert(html.includes('property="og:image"'), `Page ${p.url} must have og:image`);

  // Twitter cards audit
  assert(html.includes('name="twitter:card"'), `Page ${p.url} must have twitter:card`);
  assert(html.includes('name="twitter:title"'), `Page ${p.url} must have twitter:title`);

  // JSON-LD structured data audit
  const jsonLdMatches = [...html.matchAll(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  assert(jsonLdMatches.length > 0, `Page ${p.url} must contain at least one JSON-LD structured data block`);
  for (const jm of jsonLdMatches) {
    try {
      const parsed = JSON.parse(jm[1].trim());
      assert(parsed['@context'] === 'https://schema.org', `JSON-LD in ${p.url} must use https://schema.org`);
    } catch (e) {
      assert(false, `Invalid JSON-LD on ${p.url}: ${e.message}`);
    }
  }

  // H1 heading audit
  const h1Match = html.match(/<h1[\s>]/i);
  assert(h1Match !== null, `Page ${p.url} must contain an <h1> tag`);

  // Image alt attribute audit
  const imgMatches = [...html.matchAll(/<img\s+([^>]*?)>/gi)];
  for (const im of imgMatches) {
    const attrs = im[1];
    assert(attrs.includes('alt="') || attrs.includes("alt='"), `Image in ${p.url} must have an alt attribute: ${im[0]}`);
  }
}

console.log(`\n========================================`);
console.log(`SEO Audit Complete!`);
console.log(`Passed checks: ${passCount}`);
console.log(`Failed checks: ${failCount}`);
console.log(`========================================\n`);

if (failCount > 0) {
  console.error(`Audit encountered ${failCount} errors:`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('✓ ALL 72 PAGES AND ASSETS 100% VALIDATED AGAINST RIGOROUS PRODUCTION SEO CRITERIA!');
}
