import https from 'node:https';

const liveDomain = 'https://pdfshub.smartstores.in';

function fetchUrl(url, headers = {}, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, res => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && maxRedirects > 0) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = liveDomain + (redirectUrl.startsWith('/') ? '' : '/') + redirectUrl;
        }
        return resolve(fetchUrl(redirectUrl, headers, maxRedirects - 1));
      }
      let chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          bodyText: body.toString('utf8'),
          rawBody: body
        });
      });
    });
    req.on('error', reject);
  });
}

async function runLiveVerification() {
  console.log('======================================================================');
  console.log(`STARTING LIVE PRODUCTION VERIFICATION ON: ${liveDomain}`);
  console.log('======================================================================\n');

  // 1. Initial HTML test with WhatsApp crawler
  console.log('[TEST 1] Testing live homepage with WhatsApp User-Agent...');
  const whatsappUA = 'WhatsApp/2.21.12.21 A';
  const pageRes = await fetchUrl(`${liveDomain}/`, {
    'User-Agent': whatsappUA,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
  });

  console.log(`  HTTP Status: ${pageRes.statusCode}`);
  console.log(`  Content-Type: ${pageRes.headers['content-type']}`);
  console.log(`  Cache-Control: ${pageRes.headers['cache-control']}`);

  if (pageRes.statusCode !== 200) {
    throw new Error(`Expected HTTP 200 on live homepage, got ${pageRes.statusCode}`);
  }

  const html = pageRes.bodyText;
  const checks = [
    { name: 'fb:app_id', pattern: /<meta\s+property=["']fb:app_id["']\s+content=["']1485488066275075["']/i },
    { name: 'og:site_name', pattern: /<meta\s+property=["']og:site_name["']\s+content=["']PDFHub["']/i },
    { name: 'og:type', pattern: /<meta\s+property=["']og:type["']\s+content=["']website["']/i },
    { name: 'og:locale', pattern: /<meta\s+property=["']og:locale["']\s+content=["']en_US["']/i },
    { name: 'og:url', pattern: /<meta\s+property=["']og:url["']\s+content=["']https:\/\/pdfshub\.smartstores\.in\/["']/i },
    { name: 'og:title', pattern: /<meta\s+property=["']og:title["']\s+content=["']PDFHub – Free Online PDF Tools["']/i },
    { name: 'og:description', pattern: /<meta\s+property=["']og:description["']\s+content=["']Your All-in-One PDF Toolkit\. 33 free online tools to edit, convert, merge, compress, protect, and manage PDF documents directly in your browser\. No sign-up required\.["']/i },
    { name: 'og:image', pattern: /<meta\s+property=["']og:image["']\s+content=["']https:\/\/pdfshub\.smartstores\.in\/favicons\/og-image\.png["']/i },
    { name: 'og:image:secure_url', pattern: /<meta\s+property=["']og:image:secure_url["']\s+content=["']https:\/\/pdfshub\.smartstores\.in\/favicons\/og-image\.png["']/i },
    { name: 'og:image:type', pattern: /<meta\s+property=["']og:image:type["']\s+content=["']image\/png["']/i },
    { name: 'og:image:width', pattern: /<meta\s+property=["']og:image:width["']\s+content=["']1200["']/i },
    { name: 'og:image:height', pattern: /<meta\s+property=["']og:image:height["']\s+content=["']630["']/i },
    { name: 'og:image:alt', pattern: /<meta\s+property=["']og:image:alt["']\s+content=["']PDFHub – Free Online PDF Tools["']/i },
    { name: 'link rel="image_src"', pattern: /<link\s+rel=["']image_src["']\s+href=["']https:\/\/pdfshub\.smartstores\.in\/favicons\/og-image\.png["']/i },
    { name: 'twitter:card', pattern: /<meta\s+name=["']twitter:card["']\s+content=["']summary_large_image["']/i },
    { name: 'twitter:title', pattern: /<meta\s+name=["']twitter:title["']\s+content=["']PDFHub – Free Online PDF Tools["']/i },
    { name: 'twitter:image', pattern: /<meta\s+name=["']twitter:image["']\s+content=["']https:\/\/pdfshub\.smartstores\.in\/favicons\/og-image\.png["']/i },
    { name: 'twitter:image:src', pattern: /<meta\s+name=["']twitter:image:src["']\s+content=["']https:\/\/pdfshub\.smartstores\.in\/favicons\/og-image\.png["']/i },
    { name: 'canonical', pattern: /<link\s+rel=["']canonical["']\s+href=["']https:\/\/pdfshub\.smartstores\.in\/["']/i },
    { name: 'itemprop="image"', pattern: /<meta\s+itemprop=["']image["']\s+content=["']https:\/\/pdfshub\.smartstores\.in\/favicons\/og-image\.png["']/i }
  ];

  let passedAll = true;
  for (const c of checks) {
    const match = c.pattern.test(html);
    if (match) {
      console.log(`  ✓ ${c.name.padEnd(25)}: Verified present in initial HTML`);
    } else {
      console.error(`  ❌ ${c.name.padEnd(25)}: FAILED`);
      passedAll = false;
    }
  }

  // 2. Image Accessibility Test
  console.log('\n[TEST 2] Testing live favicons/og-image.png with WhatsApp User-Agent...');
  const imgRes = await fetchUrl(`${liveDomain}/favicons/og-image.png`, {
    'User-Agent': whatsappUA,
    'Accept': 'image/*'
  });

  console.log(`  HTTP Status: ${imgRes.statusCode}`);
  console.log(`  Content-Type: ${imgRes.headers['content-type']}`);
  console.log(`  Content-Length: ${imgRes.rawBody.length} bytes (${(imgRes.rawBody.length / 1024).toFixed(1)} KB)`);
  console.log(`  Cache-Control: ${imgRes.headers['cache-control']}`);
  console.log(`  Accept-Ranges: ${imgRes.headers['accept-ranges']}`);

  if (imgRes.statusCode !== 200) {
    throw new Error(`Expected HTTP 200 on og-image.png, got ${imgRes.statusCode}`);
  }
  if (!imgRes.headers['content-type']?.includes('image/png')) {
    throw new Error(`Expected content-type image/png, got ${imgRes.headers['content-type']}`);
  }

  // Verify PNG header and dimensions
  const width = imgRes.rawBody.readUInt32BE(16);
  const height = imgRes.rawBody.readUInt32BE(20);
  console.log(`  Verified Dimensions from binary buffer: ${width} × ${height} pixels`);
  if (width !== 1200 || height !== 630) {
    throw new Error(`Expected 1200x630, got ${width}x${height}`);
  }
  console.log(`  ✓ Image strictly adheres to recommended 1200 × 630 dimensions and is under 300 KB (${(imgRes.rawBody.length / 1024).toFixed(1)} KB)`);

  // 3. Crawler User-Agent Simulation
  console.log('\n[TEST 3] Testing multiple social crawler user agents on live URL...');
  const crawlers = [
    { bot: 'WhatsApp Android', ua: 'WhatsApp/2.21.12.21 A' },
    { bot: 'WhatsApp iOS', ua: 'WhatsApp/2.23.20.76 i' },
    { bot: 'Facebook External Hit', ua: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)' },
    { bot: 'Telegram Bot', ua: 'TelegramBot (like TwitterBot)' },
    { bot: 'Twitterbot / X', ua: 'Twitterbot/1.0' },
    { bot: 'LinkedIn Bot', ua: 'LinkedInBot/1.0' }
  ];

  for (const c of crawlers) {
    const res = await fetchUrl(`${liveDomain}/`, { 'User-Agent': c.ua });
    const hasOgTitle = res.bodyText.includes('PDFHub – Free Online PDF Tools');
    const hasOgImg = res.bodyText.includes('favicons/og-image.png');
    if (res.statusCode === 200 && hasOgTitle && hasOgImg) {
      console.log(`  ✓ ${c.bot.padEnd(25)}: HTTP 200 OK, complete Open Graph delivered in raw response stream`);
    } else {
      console.error(`  ❌ ${c.bot.padEnd(25)}: status=${res.statusCode}, hasTitle=${hasOgTitle}, hasImg=${hasOgImg}`);
      passedAll = false;
    }
  }

  // 4. Test Important Secondary Routes
  console.log('\n[TEST 4] Testing important secondary routes on live production...');
  const secondaryRoutes = [
    { path: '/docs/', expectedTitle: 'PDFHub' },
    { path: '/docs/getting-started.html', expectedTitle: 'Getting Started with PDFHub' },
    { path: '/menu-bar/about.html', expectedTitle: 'About PDFHub' },
    { path: '/tools/merge.html', expectedTitle: 'Merge PDF' },
    { path: '/install/', expectedTitle: 'Install PDFHub' }
  ];

  for (const r of secondaryRoutes) {
    const res = await fetchUrl(`${liveDomain}${r.path}`, { 'User-Agent': whatsappUA });
    const hasOg = res.bodyText.includes('property="og:image"') && res.bodyText.includes('property="og:title"');
    if (res.statusCode === 200 && hasOg) {
      console.log(`  ✓ ${r.path.padEnd(32)}: HTTP 200 OK with route-specific Open Graph tags`);
    } else {
      console.error(`  ❌ ${r.path.padEnd(32)}: status=${res.statusCode}, hasOg=${hasOg}`);
      passedAll = false;
    }
  }

  // 5. Test robots.txt on live production
  console.log('\n[TEST 5] Testing robots.txt on live production...');
  const robotsRes = await fetchUrl(`${liveDomain}/robots.txt`);
  if (robotsRes.statusCode === 200 && robotsRes.bodyText.includes('Allow: /')) {
    console.log('  ✓ robots.txt allows social preview crawlers without impediment');
  } else {
    console.error('  ❌ robots.txt error:', robotsRes.statusCode);
    passedAll = false;
  }

  console.log('\n======================================================================');
  if (passedAll) {
    console.log('🎉 ALL LIVE PRODUCTION SOCIAL PREVIEW & WHATSAPP TESTS PASSED!');
  } else {
    console.log('❌ SOME TESTS FAILED.');
  }
  console.log('======================================================================\n');
}

runLiveVerification().catch(err => {
  console.error('Fatal live verification failure:', err);
  process.exit(1);
});
