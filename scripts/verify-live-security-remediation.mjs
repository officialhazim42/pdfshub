import https from 'node:https';
import fs from 'node:fs';

function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) && res.headers.location && maxRedirects > 0) {
        const nextUrl = new URL(res.headers.location, url).href;
        return resolve(fetchUrl(nextUrl, maxRedirects - 1));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data, finalUrl: url }));
    }).on('error', reject);
  });
}

async function main() {
  console.log('=====================================================');
  console.log('PDFHUB LIVE PRODUCTION SECURITY REMEDIATION AUDIT');
  console.log('Target: https://pdfshub.smartstores.in/');
  console.log('=====================================================\n');

  let allPassed = true;

  // 1. Root and Security Headers
  console.log('--- 1. Testing Live Security Headers on Root (/) ---');
  const root = await fetchUrl('https://pdfshub.smartstores.in/');
  console.log(`HTTP Status: ${root.status}`);

  const expectedHeaders = [
    ['x-frame-options', 'SAMEORIGIN'],
    ['x-content-type-options', 'nosniff'],
    ['referrer-policy', 'strict-origin-when-cross-origin'],
    ['permissions-policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'],
    ['strict-transport-security', 'max-age=31536000; includeSubDomains; preload'],
    ['cross-origin-resource-policy', 'cross-origin']
  ];

  for (const [hdr, expectedVal] of expectedHeaders) {
    const actual = root.headers[hdr];
    if (actual && actual.toLowerCase().includes(expectedVal.toLowerCase().split(';')[0])) {
      console.log(`[PASS] ${hdr}: ${actual}`);
    } else {
      console.log(`[FAIL] ${hdr}: Expected '${expectedVal}', got '${actual}'`);
      allPassed = false;
    }
  }

  // Content-Security-Policy
  const csp = root.headers['content-security-policy'];
  if (csp && csp.includes("default-src 'self'") && csp.includes("script-src 'self'")) {
    console.log(`[PASS] content-security-policy is present and valid:\n  ${csp}`);
  } else {
    console.log(`[FAIL] content-security-policy missing or invalid: ${csp}`);
    allPassed = false;
  }

  // 2. tools/pdf-password.js
  console.log('\n--- 2. Inspecting Live tools/pdf-password.js ---');
  const js = await fetchUrl('https://pdfshub.smartstores.in/tools/pdf-password.js');
  console.log(`HTTP Status: ${js.status}, Length: ${js.body.length} bytes`);

  const hasCurrentPassword = js.body.includes('current-password');
  if (!hasCurrentPassword) {
    console.log('[PASS] "current-password" is NOT present in live tools/pdf-password.js');
  } else {
    console.log('[FAIL] "current-password" IS present in live tools/pdf-password.js');
    allPassed = false;
  }

  const hasOffAutocomplete = js.body.includes('id="pwdInputField" type="password" autocomplete="off"');
  const hasLpIgnore = js.body.includes('data-lpignore="true"');
  const hasFormType = js.body.includes('data-form-type="other"');
  if (hasOffAutocomplete && hasLpIgnore && hasFormType) {
    console.log('[PASS] pwdInputField has autocomplete="off", data-lpignore="true", and data-form-type="other"');
  } else {
    console.log(`[FAIL] pwdInputField attributes missing: autocomplete=${hasOffAutocomplete}, lpignore=${hasLpIgnore}, formType=${hasFormType}`);
    allPassed = false;
  }

  // Compare local tools/pdf-password.js vs live
  const localJs = fs.readFileSync('tools/pdf-password.js', 'utf8');
  if (localJs.trim() === js.body.trim()) {
    console.log('[PASS] Live tools/pdf-password.js exactly matches local source (byte-for-byte)');
  } else {
    console.log('[WARN] Live tools/pdf-password.js length differs from local source: ' +
                `local=${localJs.length}, live=${js.body.length}`);
  }

  // 3. tools/protect.html
  console.log('\n--- 3. Inspecting Live tools/protect.html ---');
  const protect = await fetchUrl('https://pdfshub.smartstores.in/tools/protect.html');
  console.log(`HTTP Status: ${protect.status}, Length: ${protect.body.length} bytes`);

  const protectPw = protect.body.includes('id="pw" autocomplete="off" autocapitalize="off" data-lpignore="true" data-form-type="other"');
  const protectPw2 = protect.body.includes('id="pw2" autocomplete="off" autocapitalize="off" data-lpignore="true" data-form-type="other"');
  if (protectPw && protectPw2) {
    console.log('[PASS] protect.html password inputs (#pw, #pw2) properly configured with autocomplete="off", data-lpignore="true", data-form-type="other"');
  } else {
    console.log(`[FAIL] protect.html password inputs missing attributes: pw=${protectPw}, pw2=${protectPw2}`);
    allPassed = false;
  }

  // 4. tools/unlock.html
  console.log('\n--- 4. Inspecting Live tools/unlock.html ---');
  const unlock = await fetchUrl('https://pdfshub.smartstores.in/tools/unlock.html');
  console.log(`HTTP Status: ${unlock.status}, Length: ${unlock.body.length} bytes`);

  const unlockPw = unlock.body.includes('id="pw" autocomplete="off" autocapitalize="off" data-lpignore="true" data-form-type="other"');
  if (unlockPw) {
    console.log('[PASS] unlock.html password input (#pw) properly configured with autocomplete="off", data-lpignore="true", data-form-type="other"');
  } else {
    console.log(`[FAIL] unlock.html password input missing attributes: pw=${unlockPw}`);
    allPassed = false;
  }

  // 5. Verification Tag and FB App ID
  console.log('\n--- 5. Inspecting Meta Tags on Root ---');
  const hasGVerification = root.body.includes('<meta name="google-site-verification" content="6prR7VscOr8F_g0KcJnfWTCJvqgM0JMaUomUe2XdRdw" />');
  if (hasGVerification) {
    console.log('[PASS] Google Search Console verification meta tag is present on live site');
  } else {
    console.log('[FAIL] Google Search Console verification meta tag is MISSING');
    allPassed = false;
  }

  const hasFbAppId = root.body.includes('<meta property="fb:app_id" content="1485488066275075" />');
  if (hasFbAppId) {
    console.log('[PASS] Facebook App ID meta tag (1485488066275075) is present on live site');
  } else {
    console.log('[FAIL] Facebook App ID meta tag is MISSING');
    allPassed = false;
  }

  // 6. Footer and UI checks
  console.log('\n--- 6. Inspecting Footer & Floating UI on Live ---');
  const hasTeamAttribution = root.body.includes('© PDFHub. Created by Our Team.');
  if (hasTeamAttribution) {
    console.log('[PASS] Footer contains "© PDFHub. Created by Our Team."');
  } else {
    console.log('[FAIL] Footer attribution mismatch');
    allPassed = false;
  }

  const floatingHidden = root.body.includes('class="about-dev-floating" style="display:none"') || 
                         root.body.includes('display: none;') ||
                         !root.body.includes('id="aboutDevBtn"');
  console.log(`[INFO] Floating button status in HTML: ${floatingHidden ? 'Hidden/Suppressed' : 'Present'}`);

  console.log('\n=====================================================');
  console.log(`OVERALL RESULT: ${allPassed ? 'ALL PRODUCTION REMEDIATION CHECKS PASSED' : 'SOME CHECKS FAILED'}`);
  console.log('=====================================================');

  process.exit(allPassed ? 0 : 1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
