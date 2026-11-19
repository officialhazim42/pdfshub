import https from 'node:https';

const expectedToken = '6prR7VscOr8F_g0KcJnfWTCJvqgM0JMaUomUe2XdRdw';
const expectedTag = `<meta name="google-site-verification" content="${expectedToken}" />`;

https.get('https://pdfshub.smartstores.in/', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Cache-Control': 'no-cache, no-store' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status Code:', res.statusCode);
    const match = data.match(/<meta[^>]+name=["']google-site-verification["'][^>]*>/i);
    console.log('Live Meta Tag:', match ? match[0] : 'None');
    if (match && match[0].includes(expectedToken)) {
      console.log('✓ SUCCESS: Live production response contains the exact Google verification meta tag!');
      process.exit(0);
    } else {
      console.error('❌ FAILURE: Expected token not found in live production response.');
      process.exit(1);
    }
  });
}).on('error', err => {
  console.error('Network error:', err);
  process.exit(1);
});
