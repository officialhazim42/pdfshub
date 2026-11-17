import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');

let foundNetlify = 0;
const matches = [];

function checkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkDir(full);
    } else {
      if (entry.name.endsWith('.png') || entry.name.endsWith('.jpg') || entry.name.endsWith('.ico') || entry.name.endsWith('.pdf')) {
        continue;
      }
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('netlify')) {
        foundNetlify++;
        matches.push(path.relative(dist, full));
      }
    }
  }
}

checkDir(dist);

console.log(`Checking dist/ for any occurrence of "netlify"...`);
if (foundNetlify === 0) {
  console.log(`✓ 100% CLEAN: 0 files in dist/ contain "netlify"!`);
} else {
  console.error(`❌ FAILED: ${foundNetlify} files in dist/ contain "netlify":`);
  matches.forEach(m => console.error(`  - ${m}`));
  process.exit(1);
}
