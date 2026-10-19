import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

console.log('Building clean production deployment directory (dist)...');

// 1. Clean existing dist directory
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

// 2. Production items to copy (files and directories)
const productionItems = [
  'index.html',
  'developer.css',
  'developer.js',
  'sw.js',
  'manifest.webmanifest',
  'manifest.json',
  'offline.html',
  'install',
  'assets',
  'favicons',
  'guides',
  'docs',
  'tools',
  'menu-bar',
  'robots.txt',
  'sitemap.xml',
  '_redirects'
];

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

let copiedCount = 0;
let totalSizeBytes = 0;

for (const item of productionItems) {
  const srcPath = path.join(root, item);
  const destPath = path.join(dist, item);

  if (!fs.existsSync(srcPath)) {
    console.warn(`Warning: Production item ${item} not found at ${srcPath}`);
    continue;
  }

  copyRecursive(srcPath, destPath);
}

// 3. Inspect generated dist directory
function inspectDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      inspectDir(full);
    } else {
      copiedCount++;
      totalSizeBytes += fs.statSync(full).size;
    }
  }
}
inspectDir(dist);

// 4. Strict assertions on dist
const MAX_ALLOWED_ASSET_SIZE = 25 * 1024 * 1024; // 25 MiB Cloudflare limit
const forbiddenNames = ['node_modules', '.git', '.github', 'workerd', '.capture-samples', 'scripts'];

function verifyDist(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    for (const forbidden of forbiddenNames) {
      if (entry.name.toLowerCase().includes(forbidden)) {
        throw new Error(`CRITICAL: Forbidden item found in dist: ${full}`);
      }
    }
    if (entry.isDirectory()) {
      verifyDist(full);
    } else {
      const size = fs.statSync(full).size;
      if (size > MAX_ALLOWED_ASSET_SIZE) {
        throw new Error(`CRITICAL: File exceeds Cloudflare 25 MiB limit: ${full} (${(size / 1024 / 1024).toFixed(2)} MiB)`);
      }
    }
  }
}
verifyDist(dist);

// Verify key entry points and PWA requirements
if (!fs.existsSync(path.join(dist, 'index.html'))) {
  throw new Error('Verification failed: dist/index.html is missing!');
}
if (!fs.existsSync(path.join(dist, 'manifest.webmanifest'))) {
  throw new Error('Verification failed: dist/manifest.webmanifest is missing!');
}
if (!fs.existsSync(path.join(dist, 'sw.js'))) {
  throw new Error('Verification failed: dist/sw.js is missing!');
}
if (!fs.existsSync(path.join(dist, 'offline.html'))) {
  throw new Error('Verification failed: dist/offline.html is missing!');
}
if (!fs.existsSync(path.join(dist, 'install', 'index.html'))) {
  throw new Error('Verification failed: dist/install/index.html is missing!');
}
if (!fs.existsSync(path.join(dist, 'robots.txt'))) {
  throw new Error('Verification failed: dist/robots.txt is missing!');
}
if (!fs.existsSync(path.join(dist, 'sitemap.xml'))) {
  throw new Error('Verification failed: dist/sitemap.xml is missing!');
}
if (!fs.existsSync(path.join(dist, '_redirects'))) {
  throw new Error('Verification failed: dist/_redirects is missing!');
}

const requiredIcons = [
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-192.png',
  'icon-maskable-512.png',
  'apple-touch-icon.png',
  'favicon.png'
];
for (const icon of requiredIcons) {
  if (!fs.existsSync(path.join(dist, 'favicons', icon))) {
    throw new Error(`Verification failed: PWA icon dist/favicons/${icon} is missing!`);
  }
}

const toolCount = fs.readdirSync(path.join(dist, 'tools')).filter(f => f.endsWith('.html')).length;
if (toolCount < 33) {
  throw new Error(`Verification failed: Expected 33 tools in dist/tools, found ${toolCount}`);
}
const guideCount = fs.readdirSync(path.join(dist, 'guides')).filter(f => fs.statSync(path.join(dist, 'guides', f)).isDirectory()).length;
if (guideCount < 33) {
  throw new Error(`Verification failed: Expected 33 guides in dist/guides, found ${guideCount}`);
}
if (!fs.existsSync(path.join(dist, 'docs', 'index.html'))) {
  throw new Error('Verification failed: dist/docs/index.html is missing!');
}
const docToolCount = fs.readdirSync(path.join(dist, 'docs', 'tools')).filter(f => f.endsWith('.md')).length;
if (docToolCount < 33) {
  throw new Error(`Verification failed: Expected 33 tool docs in dist/docs/tools, found ${docToolCount}`);
}

const mbTotal = (totalSizeBytes / (1024 * 1024)).toFixed(2);
console.log(`✓ Production dist generated successfully: ${copiedCount} files (${mbTotal} MB)`);
console.log(`✓ PWA manifest, service worker, offline shell, and icons verified in dist`);
console.log(`✓ All 33 tools verified in dist/tools/`);
console.log(`✓ All 33 guides verified in dist/guides/`);
console.log(`✓ node_modules, workerd, and development files are 100% excluded.`);
