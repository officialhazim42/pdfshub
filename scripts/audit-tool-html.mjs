import fs from 'node:fs';
import path from 'node:path';

const toolsDir = path.join(process.cwd(), 'tools');
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const content = fs.readFileSync(path.join(toolsDir, file), 'utf8');
  const footerMatches = (content.match(/class=["']tool-footer["']/g) || []).length;
  const seoMatches = (content.match(/class=["']tool-seo-content["']/g) || []).length;
  if (footerMatches !== 1 || seoMatches !== 1) {
    console.log(`Tool ${file} -> footers: ${footerMatches}, seo: ${seoMatches}`);
  }
}
console.log('Tool HTML structure check completed.');
