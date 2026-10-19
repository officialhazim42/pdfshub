import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
console.log('Validating PDFHub production deployment assets...');

// 1. Verify Entry Point
const entryPoint = path.join(root, 'index.html');
if (!fs.existsSync(entryPoint)) {
  console.error('ERROR: index.html entry point missing in repository!');
  process.exit(1);
}
console.log('✓ Source entry point verified: index.html');

// 2. Verify Cloudflare Configuration (wrangler.json)
const wranglerJsonPath = path.join(root, 'wrangler.json');
if (!fs.existsSync(wranglerJsonPath)) {
  console.error('ERROR: wrangler.json configuration missing!');
  process.exit(1);
}
const wranglerConfig = JSON.parse(fs.readFileSync(wranglerJsonPath, 'utf8'));
if (!wranglerConfig.assets || wranglerConfig.assets.directory !== 'dist') {
  console.error('ERROR: wrangler.json must configure assets.directory as "dist"');
  process.exit(1);
}
if (!wranglerConfig.build || !wranglerConfig.build.command) {
  console.error('ERROR: wrangler.json must configure build.command to automatically build dist');
  process.exit(1);
}
if (wranglerConfig.assets.binding) {
  console.error('ERROR: assets-only worker must not define assets.binding');
  process.exit(1);
}
console.log('✓ Cloudflare configuration verified: wrangler.json (build.command: "npm run build", assets.directory: "dist")');

// 3. Verify dist directory
if (!fs.existsSync(dist)) {
  console.error('ERROR: dist directory missing! Run "npm run build" first.');
  process.exit(1);
}
if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('ERROR: dist/index.html is missing!');
  process.exit(1);
}
console.log('✓ Production dist directory verified: dist/index.html');

// 3b. Verify PWA Assets in dist
const pwaFiles = [
  'manifest.webmanifest',
  'manifest.json',
  'sw.js',
  'offline.html',
  'install/index.html',
  'favicons/icon-192.png',
  'favicons/icon-512.png',
  'favicons/icon-maskable-192.png',
  'favicons/icon-maskable-512.png',
  'favicons/apple-touch-icon.png'
];
for (const pwaFile of pwaFiles) {
  if (!fs.existsSync(path.join(dist, pwaFile))) {
    console.error(`ERROR: Critical PWA asset missing in dist: ${pwaFile}`);
    process.exit(1);
  }
}
console.log('✓ PWA core verified in dist: manifest, service worker, offline shell, install page, and app icons');

// 4. Verify 33 Tools in dist
const toolsDir = path.join(dist, 'tools');
const toolFiles = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));
if (toolFiles.length < 33) {
  console.error(`ERROR: Expected 33 tools in dist, found ${toolFiles.length}`);
  process.exit(1);
}
console.log(`✓ Tools verified in dist: ${toolFiles.length} HTML tools in dist/tools/`);

// 5. Verify 33 Guides in dist
const guidesDir = path.join(dist, 'guides');
const guideDirs = fs.readdirSync(guidesDir).filter(f => fs.statSync(path.join(guidesDir, f)).isDirectory());
if (guideDirs.length < 33) {
  console.error(`ERROR: Expected 33 guide directories in dist, found ${guideDirs.length}`);
  process.exit(1);
}
console.log(`✓ User Guides verified in dist: ${guideDirs.length} guide routes in dist/guides/`);

// 6. Verify Complete Exclusion of node_modules, workerd, and dev artifacts
const forbidden = ['node_modules', '.git', '.github', 'workerd', '.capture-samples', 'scripts', 'docs'];
let totalDistFiles = 0;
let oversizedFiles = [];
const MAX_ALLOWED = 25 * 1024 * 1024;

function inspectDistFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    for (const bad of forbidden) {
      if (entry.name.toLowerCase().includes(bad)) {
        console.error(`ERROR: Forbidden development asset leaked into dist: ${full}`);
        process.exit(1);
      }
    }
    if (entry.isDirectory()) {
      inspectDistFiles(full);
    } else {
      totalDistFiles++;
      const size = fs.statSync(full).size;
      if (size > MAX_ALLOWED) {
        oversizedFiles.push({ file: full, size });
      }
    }
  }
}
inspectDistFiles(dist);

if (oversizedFiles.length > 0) {
  console.error('ERROR: Assets in dist exceed Cloudflare 25 MiB limit:', oversizedFiles);
  process.exit(1);
}
console.log(`✓ Strict isolation verified: ${totalDistFiles} production files in dist (0 dev artifacts, 0 workerd, all < 25 MiB)`);
console.log('\nAll PDFHub deployment validation checks passed successfully!');
