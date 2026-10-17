import fs from 'node:fs';
import path from 'node:path';

const toolsDir = path.join(process.cwd(), 'tools');
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html')).sort();

const summary = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(toolsDir, file), 'utf8');
  const fileInputs = [...content.matchAll(/<input[^>]+type=["']?file["']?[^>]*>/gi)].map(m => m[0]);
  const buttons = [...content.matchAll(/<button[^>]+id=["']?([^"' >]+)["']?[^>]*>/gi)].map(m => m[1]);
  const btnClasses = [...content.matchAll(/class=["']([^"']*btn-primary[^"']*)["']/gi)].map(m => m[1]);
  const selects = [...content.matchAll(/<select[^>]+id=["']?([^"' >]+)["']?[^>]*>/gi)].map(m => m[1]);
  const textInputs = [...content.matchAll(/<input[^>]+id=["']?([^"' >]+)["']?[^>]*>/gi)].map(m => m[1]);
  const h1 = content.match(/<h1>([^<]+)<\/h1>/)?.[1] || '';
  summary.push({ file, h1, fileInputs: fileInputs.length, buttons, selects, textInputs });
}

console.log(JSON.stringify(summary, null, 2));
