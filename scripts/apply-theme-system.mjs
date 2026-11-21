import fs from 'node:fs';
import path from 'node:path';

const CANONICAL_DARK_VARS = `  --bg: #07070d;
  --s1: #0f0f1a;
  --s2: #161625;
  --s3: #1f1f33;
  --border: #252538;
  --border-focus: #7c6aff;
  --text: #eeeef8;
  --muted: #8c8ca8;
  --muted2: #5a5a78;
  --accent: #7c6aff;
  --accent-light: rgba(124, 106, 255, 0.12);
  --accent-glow: rgba(124, 106, 255, 0.28);
  --a2: #ff5f7e;
  --a3: #00e5a0;
  --a3-light: rgba(0, 229, 160, 0.12);
  --a4: #ffb347;
  --a5: #38d9f5;
  --a6: #c084fc;
  --sec: #facc15;
  --radius: 14px;
  --shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  --nav-bg: rgba(7, 7, 13, 0.92);
  --modal-bg: rgba(0, 0, 0, 0.7);
  --card-hover-bg: rgba(124, 106, 255, 0.04);
  --glow-1: rgba(124, 106, 255, 0.09);
  --glow-2: rgba(255, 95, 126, 0.06);
  --toggle-bg: #252538;
  --toggle-knob: #7c6aff;
  color-scheme: dark;`;

const CANONICAL_LIGHT_VARS = `  --bg: #f4f4f8;
  --s1: #ffffff;
  --s2: #eeeef6;
  --s3: #e2e2ee;
  --border: #d8d8e8;
  --border-focus: #5b47e0;
  --text: #1a1a2e;
  --muted: #64648c;
  --muted2: #8e8eb0;
  --accent: #5b47e0;
  --accent-light: rgba(91, 71, 224, 0.08);
  --accent-glow: rgba(91, 71, 224, 0.22);
  --a2: #e11d48;
  --a3: #059669;
  --a3-light: rgba(5, 150, 105, 0.1);
  --a4: #d97706;
  --a5: #0284c7;
  --a6: #7c3aed;
  --sec: #b45309;
  --radius: 14px;
  --shadow: 0 8px 32px rgba(26, 26, 46, 0.08);
  --nav-bg: rgba(244, 244, 248, 0.94);
  --modal-bg: rgba(26, 26, 46, 0.5);
  --card-hover-bg: rgba(91, 71, 224, 0.04);
  --glow-1: rgba(91, 71, 224, 0.06);
  --glow-2: rgba(225, 29, 72, 0.04);
  --toggle-bg: #d8d8e8;
  --toggle-knob: #5b47e0;
  color-scheme: light;`;

const EARLY_THEME_SCRIPT = `  <script>
    (function(){
      try {
        if (localStorage.getItem('pdfhub-theme') === 'light') {
          document.documentElement.classList.add('light');
        }
      } catch (e) {}
    })();
  </script>`;

console.log('--- Applying Unified Global Theme System & Icon Polish ---');

// 1. Inject Early Theme Script into all HTML files missing it
function findHtmlFiles(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git'].includes(item.name)) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) files = files.concat(findHtmlFiles(full));
    else if (item.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const htmlFiles = findHtmlFiles('.');
let injectedCount = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('pdfhub-theme')) continue;

  // Insert early script right after <meta name="theme-color" ... /> or right after <head>
  if (content.includes('<meta name="theme-color"')) {
    content = content.replace(/(<meta name="theme-color"[^>]*>)/i, `$1\n${EARLY_THEME_SCRIPT}`);
    fs.writeFileSync(file, content, 'utf8');
    injectedCount++;
  } else if (content.includes('<head>')) {
    content = content.replace(/<head>/i, `<head>\n${EARLY_THEME_SCRIPT}`);
    fs.writeFileSync(file, content, 'utf8');
    injectedCount++;
  }
}
console.log(`[1] Injected early theme script into ${injectedCount} HTML files.`);

// 2. Update tools with #facc15 to use var(--sec)
const secTools = [
  'tools/compare.html',
  'tools/protect.html',
  'tools/redact.html',
  'tools/sign.html',
  'tools/unlock.html'
];
for (const tool of secTools) {
  if (fs.existsSync(tool)) {
    let content = fs.readFileSync(tool, 'utf8');
    if (content.includes('style="color:#facc15"')) {
      content = content.replace(/style="color:#facc15"/g, 'style="color:var(--sec)"');
      fs.writeFileSync(tool, content, 'utf8');
      console.log(`[2] Updated ${tool} icon color to var(--sec)`);
    }
  }
}

console.log('Script step 1 & 2 completed.');
