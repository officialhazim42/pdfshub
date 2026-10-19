import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const issues = [];
let checkedLinksCount = 0;

function checkFile(fileRelPath) {
  const filePath = path.join(root, fileRelPath);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const dir = path.dirname(filePath);

  // 1. Check hrefs
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.includes('${') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('javascript:')) {
      continue;
    }
    checkedLinksCount++;
    const cleanHref = href.split('?')[0].split('#')[0];
    if (!cleanHref) continue;

    let targetPath;
    if (cleanHref.startsWith('/')) {
      targetPath = path.join(root, cleanHref.slice(1));
    } else {
      targetPath = path.resolve(dir, cleanHref);
    }

    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      targetPath = path.join(targetPath, 'index.html');
    }

    if (!fs.existsSync(targetPath)) {
      issues.push({
        source: fileRelPath,
        type: 'broken-link',
        target: href,
        resolved: targetPath
      });
    }
  }

  // 2. Check src
  const srcRegex = /src=["']([^"']+)["']/g;
  while ((match = srcRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.includes('${') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('javascript:')) {
      continue;
    }
    checkedLinksCount++;
    const cleanSrc = src.split('?')[0].split('#')[0];
    if (!cleanSrc) continue;

    let targetPath;
    if (cleanSrc.startsWith('/')) {
      targetPath = path.join(root, cleanSrc.slice(1));
    } else {
      targetPath = path.resolve(dir, cleanSrc);
    }

    if (!fs.existsSync(targetPath)) {
      issues.push({
        source: fileRelPath,
        type: 'broken-src',
        target: src,
        resolved: targetPath
      });
    }
  }
}

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', '.wrangler', '.capture-samples', 'dist'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js') && !dir.includes('scripts')) {
      checkFile(path.relative(root, full));
    }
  }
}

scanDir(root);

console.log(`Audited ${checkedLinksCount} links and sources.`);
if (issues.length === 0) {
  console.log('✓ No broken internal links or missing local assets found!');
} else {
  console.log(`Found ${issues.length} issues:`);
  for (const issue of issues) {
    console.log(`  - [${issue.type}] in ${issue.source} -> ${issue.target} (not found at ${issue.resolved})`);
  }
}
