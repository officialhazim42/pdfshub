import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

let modifiedFiles = 0;
let totalReplacements = 0;

function updateFile(relPath, fn) {
  const fullPath = path.join(root, relPath);
  if (!fs.existsSync(fullPath)) return;
  const original = fs.readFileSync(fullPath, 'utf8');
  const updated = fn(original);
  if (updated !== original) {
    fs.writeFileSync(fullPath, updated, 'utf8');
    modifiedFiles++;
    console.log(`Updated: ${relPath}`);
  }
}

// 1. Update index.html
updateFile('index.html', content => {
  return content.replace(
    /<span>[©&copy;]\s*\d{4}\s+PDFHub\.\s*Crafted by\s*<a[\s\S]*?<\/span>/,
    '<span>© PDFHub. Created by Our Team.</span>'
  );
});

// 2. Update install/index.html
updateFile('install/index.html', content => {
  return content.replace(
    /<span>(?:&copy;|©)\s*\d{4}\s+PDFHub\.\s*Crafted by\s*<a[\s\S]*?<\/span>/,
    '<span>© PDFHub. Created by Our Team.</span>'
  );
});

// 3. Update guides/index.html
updateFile('guides/index.html', content => {
  return content.replace(
    /<span>(?:&copy;|©)\s*\d{4}\s+PDFHub\.\s*Crafted by\s*<a[\s\S]*?<\/span>/,
    '<span>© PDFHub. Created by Our Team.</span>'
  );
});

// 4. Update guides/shared-nav.js
updateFile('guides/shared-nav.js', content => {
  return content.replace(
    /<span>(?:&copy;|©)\s*\d{4}\s+PDFHub\.\s*Crafted by\s*<a[\s\S]*?<\/span>/,
    '<span>© PDFHub. Created by Our Team.</span>'
  );
});

// 5. Update menu-bar/site-pages.js
updateFile('menu-bar/site-pages.js', content => {
  return content.replace(
    /<span>(?:&copy;|©)\s*\d{4}\s+PDFHub\.\s*Crafted by\s*<a[\s\S]*?<\/span>/,
    '<span>© PDFHub. Created by Our Team.</span>'
  );
});

// 6. Update tools/shared.js
updateFile('tools/shared.js', content => {
  return content.replace(
    /<span>(?:&copy;|©)\s*\d{4}\s+PDFHub\.\s*Crafted by\s*<a[\s\S]*?<\/span>/,
    '<span>© PDFHub. Created by Our Team.</span>'
  );
});

// 7. Update scripts/build-docs-html.mjs
updateFile('scripts/build-docs-html.mjs', content => {
  return content.replace(
    /<span>&copy;\s*\${new Date\(\)\.getFullYear\(\)}\s*PDFHub\. All rights reserved\. Created by[\s\S]*?<\/span>/,
    '<span>&copy; PDFHub. Created by Our Team.</span>'
  );
});

// 8. Update docs/index.html
updateFile('docs/index.html', content => {
  return content.replace(
    /<span>(?:&copy;|©)\s*\d{4}\s*PDFHub\. All rights reserved\. Created by[\s\S]*?<\/span>/,
    '<span>&copy; PDFHub. Created by Our Team.</span>'
  );
});

// 9. Update all docs/*.html and docs/tools/*.html
function updateDocsDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      updateDocsDir(full);
    } else if (entry.name.endsWith('.html') && entry.name !== 'index.html') {
      const rel = path.relative(root, full);
      updateFile(rel, content => {
        return content.replace(
          /<span>(?:&copy;|©)\s*\d{4}\s*PDFHub\.\s*Crafted by\s*<a[\s\S]*?<\/span>/g,
          '<span>© PDFHub. Created by Our Team.</span>'
        );
      });
    }
  }
}
updateDocsDir(path.join(root, 'docs'));

// 10. Update all tools/*.html
function updateToolsDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.name.endsWith('.html')) {
      const rel = path.relative(root, full);
      updateFile(rel, content => {
        return content.replace(
          /<p>Created by\s*<strong>@officialhazim42<\/strong>\s*·\s*Free forever\s*·\s*No sign-up\s*·\s*No uploads to server<\/p>/g,
          '<p>© PDFHub. Created by Our Team. · Free forever · No sign-up · No uploads to server</p>'
        );
      });
    }
  }
}
updateToolsDir(path.join(root, 'tools'));

console.log(`\nReplacement complete. Total files modified: ${modifiedFiles}`);
