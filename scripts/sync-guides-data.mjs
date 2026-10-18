import fs from 'node:fs';
import path from 'node:path';
import { TOOL_TUTORIALS } from './tool-tutorial-definitions.mjs';

const root = process.cwd();
const dataJsPath = path.join(root, 'guides', 'data.js');

const raw = fs.readFileSync(dataJsPath, 'utf8');
const match = raw.match(/window\.PDFHUB_GUIDES\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
  throw new Error('Could not find window.PDFHUB_GUIDES in guides/data.js');
}

const guides = (new Function(`return ${match[1]}`))();

let updatedCount = 0;
for (const guide of guides) {
  const tutorial = TOOL_TUTORIALS[guide.id];
  if (tutorial && tutorial.steps) {
    guide.walkthrough = tutorial.steps.map(s => ({
      step: s.step,
      title: s.title,
      control: s.control || '',
      whatToDo: s.whatToDo || s.desc || '',
      whatYouSee: s.whatYouSee || '',
      nextAction: s.nextAction || '',
      tip: s.tip || '',
      image: s.image,
      alt: s.alt || `${guide.name} Step ${s.step}`,
      desc: s.whatToDo || s.desc || ''
    }));
    updatedCount++;
  }
}

const newContent = `window.PDFHUB_GUIDES = ${JSON.stringify(guides, null, 2)};\n`;
fs.writeFileSync(dataJsPath, newContent, 'utf8');
console.log(`Successfully updated ${updatedCount} guides in guides/data.js with rich walkthrough data!`);
