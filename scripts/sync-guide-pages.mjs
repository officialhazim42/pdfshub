import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataJsPath = path.join(root, 'guides', 'data.js');
const templatePath = path.join(root, 'guides', 'guide-template.html');

const template = fs.readFileSync(templatePath, 'utf8');
const dataRaw = fs.readFileSync(dataJsPath, 'utf8');
const match = dataRaw.match(/window\.PDFHUB_GUIDES\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
  throw new Error('Could not parse guides from guides/data.js');
}

const guides = (new Function(`return ${match[1]}`))();

let count = 0;
for (const g of guides) {
  const dir = path.join(root, 'guides', g.id);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const content = template
    .replace(/__TOOL_NAME__/g, g.name)
    .replace(/__GUIDE_ID__/g, g.id);
  const target = path.join(dir, 'index.html');
  fs.writeFileSync(target, content, 'utf8');
  count++;
}

console.log(`Successfully synced all ${count} guide pages from guide-template.html!`);
