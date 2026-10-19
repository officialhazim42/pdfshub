import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const srcImgPath = path.join(root, 'favicons', 'favicon.png');
const srcBase64 = fs.readFileSync(srcImgPath).toString('base64');
const dataUri = `data:image/png;base64,${srcBase64}`;

async function generateIcons() {
  console.log('Generating PWA icons from brand favicon.png...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  const iconSpecs = [
    { name: 'icon-192.png', size: 192, maskable: false, bg: null },
    { name: 'icon-512.png', size: 512, maskable: false, bg: null },
    { name: 'icon-maskable-192.png', size: 192, maskable: true, bg: '#07070d' },
    { name: 'icon-maskable-512.png', size: 512, maskable: true, bg: '#07070d' },
    { name: 'apple-touch-icon.png', size: 180, maskable: false, bg: '#07070d' },
    { name: 'favicon-32x32.png', size: 32, maskable: false, bg: null },
    { name: 'favicon-16x16.png', size: 16, maskable: false, bg: null }
  ];

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head><style>body { margin: 0; background: transparent; }</style></head>
      <body>
        <canvas id="cvs"></canvas>
      </body>
    </html>
  `);

  for (const spec of iconSpecs) {
    const dataUrl = await page.evaluate(async ({ dataUri, spec }) => {
      const cvs = document.getElementById('cvs');
      cvs.width = spec.size;
      cvs.height = spec.size;
      const ctx = cvs.getContext('2d');
      ctx.clearRect(0, 0, spec.size, spec.size);

      if (spec.bg) {
        ctx.fillStyle = spec.bg;
        ctx.fillRect(0, 0, spec.size, spec.size);
      }

      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = dataUri;
      });

      if (spec.maskable) {
        // Safe zone: fit in 80% center
        const scale = 0.8;
        const targetSize = spec.size * scale;
        const offset = (spec.size - targetSize) / 2;
        ctx.drawImage(img, offset, offset, targetSize, targetSize);
      } else if (spec.bg) {
        // Apple touch icon or solid bg: fit nicely with 90% size
        const scale = 0.92;
        const targetSize = spec.size * scale;
        const offset = (spec.size - targetSize) / 2;
        ctx.drawImage(img, offset, offset, targetSize, targetSize);
      } else {
        // Standard icon: full canvas
        ctx.drawImage(img, 0, 0, spec.size, spec.size);
      }

      return cvs.toDataURL('image/png');
    }, { dataUri, spec });

    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const outPath = path.join(root, 'favicons', spec.name);
    fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
    const bytes = fs.statSync(outPath).size;
    console.log(`✓ Created favicons/${spec.name} (${spec.size}x${spec.size}, ${(bytes / 1024).toFixed(1)} KB)`);
  }

  await browser.close();
  console.log('All PWA icons generated successfully!');
}

generateIcons().catch(err => {
  console.error('Failed to generate icons:', err);
  process.exit(1);
});
