import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();

/**
 * Packs multiple PNG image buffers into a valid multi-resolution Windows ICO file.
 * Compatible with all modern browsers (Chrome, Edge, Firefox, Safari) and operating systems.
 */
function createIcoFromPngs(pngBuffersWithSizes) {
  const count = pngBuffersWithSizes.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const totalHeaderSize = headerSize + count * dirEntrySize;
  
  let currentOffset = totalHeaderSize;
  const entries = [];
  
  for (const item of pngBuffersWithSizes) {
    const dataLen = item.data.length;
    entries.push({
      width: item.width >= 256 ? 0 : item.width,
      height: item.height >= 256 ? 0 : item.height,
      colorCount: 0,
      reserved: 0,
      planes: 1,
      bitCount: 32,
      bytesInRes: dataLen,
      imageOffset: currentOffset,
      data: item.data
    });
    currentOffset += dataLen;
  }
  
  const icoBuffer = Buffer.alloc(currentOffset);
  
  // ICONDIR header
  icoBuffer.writeUInt16LE(0, 0); // Reserved (must be 0)
  icoBuffer.writeUInt16LE(1, 2); // Type 1 = ICO
  icoBuffer.writeUInt16LE(count, 4); // Number of images
  
  // ICONDIRENTRY entries
  let dirOffset = 6;
  for (const entry of entries) {
    icoBuffer.writeUInt8(entry.width, dirOffset);
    icoBuffer.writeUInt8(entry.height, dirOffset + 1);
    icoBuffer.writeUInt8(entry.colorCount, dirOffset + 2);
    icoBuffer.writeUInt8(entry.reserved, dirOffset + 3);
    icoBuffer.writeUInt16LE(entry.planes, dirOffset + 4);
    icoBuffer.writeUInt16LE(entry.bitCount, dirOffset + 6);
    icoBuffer.writeUInt32LE(entry.bytesInRes, dirOffset + 8);
    icoBuffer.writeUInt32LE(entry.imageOffset, dirOffset + 12);
    
    // Copy PNG bytes into offset position
    entry.data.copy(icoBuffer, entry.imageOffset);
    
    dirOffset += dirEntrySize;
  }
  
  return icoBuffer;
}

/**
 * Returns the optimized SVG source for the new PDFHub visual identity:
 * Standalone Folded Document silhouette with bold white 'P' monogram.
 */
function getFaviconSvg({ isMaskable = false, bg = null, borderRadius = 0 } = {}) {
  // Main sheet: width 356, height 440
  // Left: 78, Right: 434 (78 + 356 = 434, 512 - 434 = 78) - perfectly centered horizontally!
  // Top: 36, Bottom: 476 (36 + 440 = 476, 512 - 476 = 36) - perfectly centered vertically!
  
  const transform = isMaskable 
    ? 'transform="translate(51.2, 51.2) scale(0.8)"' 
    : (bg ? 'transform="translate(25.6, 25.6) scale(0.9)"' : '');

  const rx = bg ? (isMaskable ? 0 : borderRadius || 112) : 0;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <defs>
    <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#705dfd"/>
      <stop offset="45%" stop-color="#5844f4"/>
      <stop offset="100%" stop-color="#1ea8e4"/>
    </linearGradient>
    <linearGradient id="flapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38d9f5"/>
      <stop offset="100%" stop-color="#00e5a0"/>
    </linearGradient>
    <linearGradient id="flapShadow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.08"/>
    </linearGradient>
    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="14" flood-color="#4f46e5" flood-opacity="0.38"/>
    </filter>
  </defs>
  ${bg ? `<rect width="512" height="512" rx="${rx}" fill="${bg}"/>` : ''}
  <g ${transform} filter="${bg ? 'url(#subtleGlow)' : 'none'}">
    <!-- Main Document Silhouette -->
    <path d="M 122 36 L 326 36 L 434 144 L 434 432 C 434 456.3 414.3 476 390 476 L 122 476 C 97.7 476 78 456.3 78 432 L 78 80 C 78 55.7 97.7 36 122 36 Z" fill="url(#docGrad)"/>
    
    <!-- Under-flap fold shadow -->
    <path d="M 326 36 L 434 144 L 346 144 C 334.95 144 326 135.05 326 124 Z" fill="url(#flapShadow)"/>
    
    <!-- Top-right folded corner flap -->
    <path d="M 326 36 L 434 144 L 346 144 C 334.95 144 326 135.05 326 124 Z" fill="url(#flapGrad)"/>
    
    <!-- Bold High-Contrast Pure White 'P' Monogram -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="
      M 166 148 
      L 298 148 
      C 351 148 386 180 386 228 
      C 386 276 351 308 298 308 
      L 230 308 
      L 230 392 
      C 230 400.8 222.8 408 214 408 
      L 182 408 
      C 173.2 408 166 400.8 166 392 
      L 166 148 Z
      
      M 230 204
      L 290 204
      C 316 204 330 214 330 228
      C 330 242 316 252 290 252
      L 230 252
      L 230 204 Z
    " fill="#ffffff"/>
  </g>
</svg>`;
}

async function generateAllFaviconsAndIcons() {
  console.log('======================================================================');
  console.log('GENERATING PREMIUM HIGH-CONTRAST PDFHUB FAVICONS & APP ICONS');
  console.log('======================================================================\n');

  // 1. Save crisp vector master favicon.svg
  const masterSvg = getFaviconSvg();
  const svgOutPath = path.join(root, 'favicons', 'favicon.svg');
  fs.writeFileSync(svgOutPath, masterSvg, 'utf8');
  console.log(`✓ Generated favicons/favicon.svg (${(fs.statSync(svgOutPath).size / 1024).toFixed(1)} KB)`);

  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  const renderPng = async (svgStr, size) => {
    const page = await browser.newPage({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1
    });
    await page.setContent(`<!DOCTYPE html><html><head><style>
      * { margin:0; padding:0; box-sizing:border-box; }
      html, body { width:${size}px; height:${size}px; overflow:hidden; background:transparent; }
      svg { width:100%; height:100%; display:block; }
    </style></head><body>${svgStr}</body></html>`);
    
    const buf = await page.screenshot({ omitBackground: true, type: 'png' });
    await page.close();
    return buf;
  };

  // 2. Generate standard transparent favicons (16x16, 32x32, 48x48, 128x128)
  const buf16 = await renderPng(masterSvg, 16);
  fs.writeFileSync(path.join(root, 'favicons', 'favicon-16x16.png'), buf16);
  console.log(`✓ Generated favicons/favicon-16x16.png (16x16, ${buf16.length} bytes)`);

  const buf32 = await renderPng(masterSvg, 32);
  fs.writeFileSync(path.join(root, 'favicons', 'favicon-32x32.png'), buf32);
  console.log(`✓ Generated favicons/favicon-32x32.png (32x32, ${buf32.length} bytes)`);

  const buf48 = await renderPng(masterSvg, 48);
  fs.writeFileSync(path.join(root, 'favicons', 'favicon-48x48.png'), buf48);
  console.log(`✓ Generated favicons/favicon-48x48.png (48x48, ${buf48.length} bytes)`);

  const buf128 = await renderPng(masterSvg, 128);
  fs.writeFileSync(path.join(root, 'favicons', 'favicon.png'), buf128);
  console.log(`✓ Generated favicons/favicon.png (128x128 brand master, ${(buf128.length / 1024).toFixed(1)} KB)`);

  // 3. Generate multi-resolution ICO file (16, 32, 48)
  const icoBuf = createIcoFromPngs([
    { width: 16, height: 16, data: buf16 },
    { width: 32, height: 32, data: buf32 },
    { width: 48, height: 48, data: buf48 }
  ]);
  fs.writeFileSync(path.join(root, 'favicons', 'favicon.ico'), icoBuf);
  console.log(`✓ Generated favicons/favicon.ico (multi-resolution 16/32/48, ${icoBuf.length} bytes)`);

  // Also write to root favicon.ico for root browser requests
  fs.writeFileSync(path.join(root, 'favicon.ico'), icoBuf);
  console.log(`✓ Generated /favicon.ico (root multi-resolution, ${icoBuf.length} bytes)`);

  // 4. Generate Apple Touch Icon (180x180, solid dark background)
  const appleSvg = getFaviconSvg({ bg: '#0c0c18', borderRadius: 0 }); // iOS auto-rounds
  const bufApple = await renderPng(appleSvg, 180);
  fs.writeFileSync(path.join(root, 'favicons', 'apple-touch-icon.png'), bufApple);
  console.log(`✓ Generated favicons/apple-touch-icon.png (180x180, ${(bufApple.length / 1024).toFixed(1)} KB)`);

  // 5. Generate PWA standard transparent icons (192x192, 512x512)
  const buf192 = await renderPng(masterSvg, 192);
  fs.writeFileSync(path.join(root, 'favicons', 'icon-192.png'), buf192);
  console.log(`✓ Generated favicons/icon-192.png (192x192, ${(buf192.length / 1024).toFixed(1)} KB)`);

  const buf512 = await renderPng(masterSvg, 512);
  fs.writeFileSync(path.join(root, 'favicons', 'icon-512.png'), buf512);
  console.log(`✓ Generated favicons/icon-512.png (512x512, ${(buf512.length / 1024).toFixed(1)} KB)`);

  // 6. Generate PWA Maskable icons (80% safe zone on solid #0c0c18 background)
  const maskableSvg = getFaviconSvg({ isMaskable: true, bg: '#0c0c18' });
  const bufMask192 = await renderPng(maskableSvg, 192);
  fs.writeFileSync(path.join(root, 'favicons', 'icon-maskable-192.png'), bufMask192);
  console.log(`✓ Generated favicons/icon-maskable-192.png (192x192 maskable, ${(bufMask192.length / 1024).toFixed(1)} KB)`);

  const bufMask512 = await renderPng(maskableSvg, 512);
  fs.writeFileSync(path.join(root, 'favicons', 'icon-maskable-512.png'), bufMask512);
  console.log(`✓ Generated favicons/icon-maskable-512.png (512x512 maskable, ${(bufMask512.length / 1024).toFixed(1)} KB)`);

  await browser.close();

  // 7. Verify OG image was preserved intact
  const ogImagePath = path.join(root, 'favicons', 'og-image.png');
  if (fs.existsSync(ogImagePath)) {
    const ogBytes = fs.statSync(ogImagePath).size;
    console.log(`✓ Confirmed favicons/og-image.png is intact (${(ogBytes / 1024).toFixed(1)} KB)`);
  }

  console.log('\nAll PDFHub favicons and PWA application icons generated successfully!\n');
}

generateAllFaviconsAndIcons().catch(err => {
  console.error('Failed to generate favicons and icons:', err);
  process.exit(1);
});
