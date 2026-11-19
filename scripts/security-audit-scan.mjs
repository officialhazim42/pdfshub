import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const externalScripts = new Set();
const externalStylesheets = new Set();
const iframes = [];
const passwordInputs = [];
const forms = [];
const evals = [];
const suspiciousUrls = [];
const networkCalls = [];

const KNOWN_CDN_DOMAINS = [
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net',
  'unpkg.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'code.jquery.com'
];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // External scripts
  const scriptMatches = content.matchAll(/<script[^>]+src=["']([^"']+)["']/gi);
  for (const m of scriptMatches) {
    if (m[1].startsWith('http://') || m[1].startsWith('https://') || m[1].startsWith('//')) {
      externalScripts.add({ file: path.relative(root, filePath), src: m[1] });
    }
  }

  // External stylesheets
  const linkMatches = content.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]*>/gi);
  for (const m of linkMatches) {
    const href = m[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
      if (!href.includes('smartstores.in') && !href.includes('w3.org')) {
        externalStylesheets.add({ file: path.relative(root, filePath), href });
      }
    }
  }

  // Iframes
  const iframeMatches = content.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi);
  for (const m of iframeMatches) {
    iframes.push({ file: path.relative(root, filePath), src: m[1] });
  }

  // Password inputs
  const pwdMatches = content.matchAll(/<input[^>]+type=["']password["'][^>]*>/gi);
  for (const m of pwdMatches) {
    passwordInputs.push({ file: path.relative(root, filePath), tag: m[0] });
  }

  // Forms
  const formMatches = content.matchAll(/<form[^>]*>/gi);
  for (const m of formMatches) {
    forms.push({ file: path.relative(root, filePath), tag: m[0] });
  }

  // eval or Function constructor
  const evalMatches = content.matchAll(/(?:\beval\s*\(|new\s+Function\s*\()/g);
  for (const m of evalMatches) {
    evals.push({ file: path.relative(root, filePath), match: m[0] });
  }

  // Network calls like fetch, XMLHttpRequest, sendBeacon, websocket
  const fetchMatches = content.matchAll(/(?:fetch\s*\(\s*["'`](https?:)?\/\/([^"'`]+)["'`]|new\s+XMLHttpRequest\(\)|\.sendBeacon\s*\(\s*["'`](https?:)?\/\/([^"'`]+)["'`]|new\s+WebSocket\s*\(\s*["'`](wss?:)?\/\/([^"'`]+)["'`])/g);
  for (const m of fetchMatches) {
    networkCalls.push({ file: path.relative(root, filePath), match: m[0] });
  }

  // Suspicious keywords: download .exe, apk, base64 data blobs in scripts, phishing keywords
  const suspiciousKeywords = [
    /\.exe\b/i,
    /\.apk\b/i,
    /\.bat\b/i,
    /\.vbs\b/i,
    /\.scr\b/i,
    /install software/i,
    /update chrome/i,
    /flash player/i,
    /verify your account/i,
    /security alert/i,
    /credit card/i,
    /bank account/i,
    /billing information/i,
    /ssn\b/i,
    /social security/i
  ];

  for (const kw of suspiciousKeywords) {
    if (kw.test(content) && !filePath.includes('test') && !filePath.includes('docx') && !filePath.includes('node_modules')) {
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        if (kw.test(l)) {
          suspiciousUrls.push({ file: path.relative(root, filePath), line: idx + 1, pattern: kw.toString(), text: l.trim().slice(0, 140) });
        }
      });
    }
  }
}

function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'dist'].includes(item.name)) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) walk(full);
    else if (/\.(html|js|mjs)$/.test(item.name)) scanFile(full);
  }
}

walk('.');

console.log('=== 1. External Scripts ===');
const scriptUrls = [...new Set([...externalScripts].map(x => x.src))];
console.log(scriptUrls);

console.log('\n=== 2. External Stylesheets ===');
const styleUrls = [...new Set([...externalStylesheets].map(x => x.href))];
console.log(styleUrls);

console.log('\n=== 3. Iframes ===');
console.log(iframes);

console.log('\n=== 4. Password Inputs ===');
console.log(passwordInputs);

console.log('\n=== 5. Forms ===');
console.log(forms);

console.log('\n=== 6. Evals ===');
console.log(evals.slice(0, 20));

console.log('\n=== 7. Network Calls to External Endpoints ===');
console.log(networkCalls);

console.log('\n=== 8. Suspicious Keywords (Phishing / Dangerous Software / Banking) ===');
console.log(suspiciousUrls);
