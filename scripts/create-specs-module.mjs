import fs from 'node:fs';
import path from 'node:path';

const content = fs.readFileSync('scripts/build-docs-suite.mjs', 'utf8');
const start = content.indexOf('// Technical specifications dictionary per tool');
const end = content.indexOf('// 2. Generate all 33 individual tool markdown files');
const specsCode = content.slice(start, end).trim();

const fileOut = `import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataJsPath = path.join(root, 'guides', 'data.js');
const dataContent = fs.readFileSync(dataJsPath, 'utf8');
const match = dataContent.match(/window\\.PDFHUB_GUIDES\\s*=\\s*(\\[[\\s\\S]*?\\]);/);
if (!match) throw new Error('Unable to parse guides data');
export const guides = (new Function(\`return \${match[1]}\`))();

export ${specsCode}
`;

fs.writeFileSync('scripts/technical-specs.mjs', fileOut, 'utf8');
console.log('Created scripts/technical-specs.mjs successfully');
