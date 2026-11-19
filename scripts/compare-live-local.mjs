import https from 'node:https';
import fs from 'node:fs';

https.get('https://pdfshub.smartstores.in/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let live = '';
  res.on('data', c => live += c);
  res.on('end', () => {
    const local = fs.readFileSync('dist/index.html', 'utf8');
    const liveNorm = live.replace(/\r\n/g, '\n');
    const localNorm = local.replace(/\r\n/g, '\n');
    if (liveNorm === localNorm) {
      console.log('✓ Normalized content is 100% identical! (Only CRLF vs LF line endings differed)');
    } else {
      console.log('Real content differences found:');
      const liveLines = liveNorm.split('\n');
      const localLines = localNorm.split('\n');
      for (let i = 0; i < Math.max(liveLines.length, localLines.length); i++) {
        if (liveLines[i] !== localLines[i]) {
          console.log(`Diff at line ${i+1}:`);
          console.log('Live: ', liveLines[i]);
          console.log('Local:', localLines[i]);
          break;
        }
      }
    }
  });
});
