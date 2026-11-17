import { execSync } from 'node:child_process';

let out = '';
const targetDomain = ['pdfshub', 'netlify', 'app'].join('.');

try {
  out = execSync(`git grep -in "${targetDomain}" -- ":!scripts/audit-domain-references.mjs"`, {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024
  });
} catch (e) {
  // Exit code 1 means 0 occurrences found
  if (e.status === 1) {
    out = '';
  } else {
    throw e;
  }
}

const lines = out.split('\n').filter(Boolean);

if (lines.length === 0) {
  console.log(`✓ SUCCESS: 0 occurrences of "${targetDomain}" found across all tracked repository files!`);
  process.exit(0);
}

const fileMap = new Map();
for (const line of lines) {
  const colonIndex = line.indexOf(':');
  const file = line.substring(0, colonIndex);
  fileMap.set(file, (fileMap.get(file) || 0) + 1);
}

console.log(`Total files containing ${targetDomain}:`, fileMap.size);
console.log('Total occurrences:', lines.length);
console.log('\nBreakdown by file:');
for (const [file, count] of fileMap.entries()) {
  console.log(`  ${file}: ${count}`);
}
process.exit(1);
