import fs from 'node:fs';
import path from 'node:path';
import child_process from 'node:child_process';

const root = process.cwd();
const domain = 'https://pdfshub.netlify.app';

// 1. Read guides data
const dataJsPath = path.join(root, 'guides', 'data.js');
const dataContent = fs.readFileSync(dataJsPath, 'utf8');
const match = dataContent.match(/window\.PDFHUB_GUIDES\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
  throw new Error('Unable to extract PDFHUB_GUIDES from guides/data.js');
}
const guides = (new Function(`return ${match[1]}`))();
console.log(`Loaded ${guides.length} guide definitions from guides/data.js`);

const esc = value => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

// Tool SEO Metadata dictionary (intent-focused, concise, unique)
const toolSeoConfig = {
  'compare.html': {
    title: 'Compare PDF Files Online – Visual Difference Checker | PDFHub',
    desc: 'Compare two PDF documents side by side to highlight visual changes, pixel shifts, and layout differences. 100% private in-browser comparison.',
    intentKeyword: 'Compare PDF files online',
    isExternal: false
  },
  'compress.html': {
    title: 'Compress PDF Online – Reduce PDF File Size Free | PDFHub',
    desc: 'Reduce PDF file size quickly while preserving document clarity. Select low, medium, or high compression levels with local browser execution.',
    intentKeyword: 'Compress PDF online free',
    isExternal: false
  },
  'crop.html': {
    title: 'Crop PDF Pages Online – Trim Margins & Custom Canvas | PDFHub',
    desc: 'Trim white margins and crop PDF page dimensions with an interactive visual preview. 100% private client-side processing.',
    intentKeyword: 'Crop PDF pages online',
    isExternal: false
  },
  'edit.html': {
    title: 'Edit PDF Online – Add Text, Images & Annotations | PDFHub',
    desc: 'Annotate and edit PDF files in your browser. Add custom text, signatures, geometric shapes, and highlight content without uploading documents.',
    intentKeyword: 'Edit PDF online free',
    isExternal: false
  },
  'excel-to-pdf.html': {
    title: 'Excel to PDF Converter – Convert XLS & XLSX to PDF | PDFHub',
    desc: 'Convert Excel spreadsheets (.xls, .xlsx) into clean, printable PDF documents directly in your browser. No registration or server storage.',
    intentKeyword: 'Convert Excel to PDF online',
    isExternal: false
  },
  'extract-pages.html': {
    title: 'Extract PDF Pages Online – Separate Specific Pages Free | PDFHub',
    desc: 'Select and extract individual pages or custom page ranges into a new PDF document. Runs client-side for maximum confidentiality.',
    intentKeyword: 'Extract pages from PDF',
    isExternal: false
  },
  'forms.html': {
    title: 'Fill PDF Forms Online – Interactive AcroForm Editor | PDFHub',
    desc: 'Fill, modify, and complete interactive PDF form fields, text inputs, and checkboxes directly in your web browser with instant download.',
    intentKeyword: 'Fill PDF forms online',
    isExternal: false
  },
  'html-to-pdf.html': {
    title: 'HTML to PDF Converter – Convert Web Pages & Code to PDF | PDFHub',
    desc: 'Render HTML code, web snippets, and formatted web pages into downloadable PDF documents directly in your browser.',
    intentKeyword: 'Convert HTML to PDF online',
    isExternal: false
  },
  'jpg-to-pdf.html': {
    title: 'JPG to PDF Converter – Convert Images to PDF Online | PDFHub',
    desc: 'Convert JPG, PNG, and JPEG images into a single formatted PDF file. Reorder pages and customize layout without server uploads.',
    intentKeyword: 'Convert JPG to PDF online',
    isExternal: false
  },
  'merge.html': {
    title: 'Merge PDF Files Online – Combine PDFs Free & Privately | PDFHub',
    desc: 'Combine multiple PDF files into a single organized document. Drag and drop to reorder pages with fast, private client-side processing.',
    intentKeyword: 'Merge PDF files online free',
    isExternal: false
  },
  'ocr.html': {
    title: 'OCR PDF Online – Optical Character Recognition & Text Extraction | PDFHub',
    desc: 'Extract searchable text from scanned PDFs and document images using browser-based Optical Character Recognition (OCR).',
    intentKeyword: 'OCR PDF text recognition online',
    isExternal: false
  },
  'organize.html': {
    title: 'Organize PDF Pages Online – Reorder, Rotate & Sort | PDFHub',
    desc: 'Rearrange, delete, rotate, and sort PDF pages with an intuitive visual grid. Instant private processing with zero file uploads.',
    intentKeyword: 'Organize PDF pages online',
    isExternal: false
  },
  'page-numbers.html': {
    title: 'Add Page Numbers to PDF Online – Customize Headers & Footers | PDFHub',
    desc: 'Insert customizable page numbers, Bates numbering, and headers/footers on your PDF documents. Set custom starting numbers and positions.',
    intentKeyword: 'Add page numbers to PDF online',
    isExternal: false
  },
  'pdf-to-excel.html': {
    title: 'PDF to Excel Converter – Extract Tables to XLSX Free | PDFHub',
    desc: 'Convert PDF documents and tabular data into editable Microsoft Excel spreadsheets (.xlsx). Private client-side extraction.',
    intentKeyword: 'Convert PDF to Excel online',
    isExternal: false
  },
  'pdf-to-jpg.html': {
    title: 'PDF to JPG Converter – Save PDF Pages as Images | PDFHub',
    desc: 'Convert PDF pages into high-resolution JPG images. Extract single pages or complete document archives in your browser.',
    intentKeyword: 'Convert PDF to JPG online',
    isExternal: false
  },
  'pdf-to-markdown.html': {
    title: 'PDF to Markdown Converter – Convert PDF to Clean MD | PDFHub',
    desc: 'Extract clean, structured Markdown from PDF documents. Preserve headings, lists, tables, and formatting for notes and documentation.',
    intentKeyword: 'Convert PDF to Markdown online',
    isExternal: false
  },
  'pdf-to-pdfa.html': {
    title: 'Convert PDF to PDF/A – Archival Document Standard | PDFHub',
    desc: 'Transform standard PDF files into ISO-compliant PDF/A format for long-term document archiving and preservation.',
    intentKeyword: 'Convert PDF to PDF/A online',
    isExternal: false
  },
  'pdf-to-ppt.html': {
    title: 'PDF to PowerPoint Converter – Convert PDF to PPTX | PDFHub',
    desc: 'Convert PDF slides and presentations into editable Microsoft PowerPoint (.pptx) decks directly in your web browser.',
    intentKeyword: 'Convert PDF to PowerPoint online',
    isExternal: false
  },
  'pdf-to-word.html': {
    title: 'PDF to Word Converter – Convert PDF to DOCX Free | PDFHub',
    desc: 'Convert PDF documents into editable Microsoft Word (.docx) files. Fast, private client-side conversion without email requirements.',
    intentKeyword: 'Convert PDF to Word free online',
    isExternal: false
  },
  'ppt-to-pdf.html': {
    title: 'PowerPoint to PDF Converter – Convert PPT & PPTX | PDFHub',
    desc: 'Convert PowerPoint presentations (.ppt, .pptx) into clean, universally viewable PDF slides in your web browser.',
    intentKeyword: 'Convert PowerPoint to PDF online',
    isExternal: false
  },
  'protect.html': {
    title: 'Password Protect PDF – Encrypt PDF Files Online | PDFHub',
    desc: 'Secure your PDF files with standard 128-bit AES encryption. Set custom user passwords to prevent unauthorized access and viewing.',
    intentKeyword: 'Password protect PDF online',
    isExternal: false
  },
  'redact.html': {
    title: 'Redact PDF Online – Permanently Black Out Sensitive Info | PDFHub',
    desc: 'Permanently redact sensitive text, numbers, and private content from PDF documents. Client-side sanitization prevents data leakage.',
    intentKeyword: 'Redact PDF online',
    isExternal: false
  },
  'remove-pages.html': {
    title: 'Delete PDF Pages Online – Remove Unwanted Pages Free | PDFHub',
    desc: 'Quickly remove individual pages or custom page ranges from your PDF files. Private, fast, and simple browser-based editing.',
    intentKeyword: 'Delete pages from PDF online',
    isExternal: false
  },
  'repair.html': {
    title: 'Repair PDF Online – Recover Damaged or Corrupted PDFs | PDFHub',
    desc: 'Diagnose, rebuild, and recover damaged PDF documents and broken cross-reference tables directly in your browser.',
    intentKeyword: 'Repair damaged PDF online',
    isExternal: false
  },
  'rotate.html': {
    title: 'Rotate PDF Pages Online – Turn 90, 180, 270 Degrees | PDFHub',
    desc: 'Rotate individual PDF pages or entire documents clockwise and counter-clockwise. Permanently save rotated orientation.',
    intentKeyword: 'Rotate PDF pages online',
    isExternal: false
  },
  'scan-to-pdf.html': {
    title: 'Scan to PDF Online – Capture Documents via Camera | PDFHub',
    desc: 'Use your device camera or scanner to capture physical documents, enhance contrast, and save them as multi-page PDFs.',
    intentKeyword: 'Scan to PDF online',
    isExternal: false
  },
  'sign.html': {
    title: 'Sign PDF Online – Draw, Type & Insert Digital Signature | PDFHub',
    desc: 'Sign PDF contracts and forms digitally. Draw your signature, upload a signature image, or type your name with zero server uploads.',
    intentKeyword: 'Sign PDF online free',
    isExternal: false
  },
  'split.html': {
    title: 'Split PDF Online – Separate PDF Pages into Individual Files | PDFHub',
    desc: 'Divide large PDF files into smaller documents. Extract specific page ranges or split into individual single-page files.',
    intentKeyword: 'Split PDF pages online',
    isExternal: false
  },
  'summarize.html': {
    title: 'AI PDF Summarizer – Extract Key Points & Executive Summaries | PDFHub',
    desc: 'Generate concise summaries and key takeaways from lengthy PDF reports, academic papers, and legal documents.',
    intentKeyword: 'AI PDF summarizer online',
    isExternal: true
  },
  'translate.html': {
    title: 'Translate PDF Online – Real-Time Document Translation | PDFHub',
    desc: 'Translate PDF content into multiple languages while maintaining paragraph structure and formatting.',
    intentKeyword: 'Translate PDF document online',
    isExternal: true
  },
  'unlock.html': {
    title: 'Unlock PDF Online – Remove PDF Password & Restrictions | PDFHub',
    desc: 'Remove password protection and printing/editing restrictions from PDF files you have the password to unlock.',
    intentKeyword: 'Unlock PDF password online',
    isExternal: false
  },
  'watermark.html': {
    title: 'Add Watermark to PDF – Insert Custom Text or Image Stamp | PDFHub',
    desc: 'Stamp confidential, draft, or custom text and logo watermarks onto PDF pages. Customize opacity, angle, and position.',
    intentKeyword: 'Add watermark to PDF online',
    isExternal: false
  },
  'word-to-pdf.html': {
    title: 'Word to PDF Converter – Convert DOC & DOCX to PDF Free | PDFHub',
    desc: 'Convert Microsoft Word documents (.doc, .docx) into pristine PDF files directly in your browser with zero server uploads.',
    intentKeyword: 'Convert Word to PDF online',
    isExternal: false
  }
};

// 2. Process each of the 33 Tool HTML files
const toolsDir = path.join(root, 'tools');
for (const [toolFile, cfg] of Object.entries(toolSeoConfig)) {
  const toolFilePath = path.join(toolsDir, toolFile);
  if (!fs.existsSync(toolFilePath)) {
    console.warn(`Warning: Tool file ${toolFile} not found.`);
    continue;
  }

  // Find corresponding guide
  const guide = guides.find(g => g.tool.endsWith(toolFile));
  if (!guide) {
    console.warn(`Warning: No guide found for tool ${toolFile}`);
    continue;
  }

  let html = fs.readFileSync(toolFilePath, 'utf8');

  // Related tools chips HTML
  const relatedChips = (guide.related || []).map(relId => {
    const relGuide = guides.find(g => g.id === relId);
    if (!relGuide) return '';
    const relFileName = path.basename(relGuide.tool);
    return `<a class="related-tool-chip" href="${relFileName}"><i class="fas ${relGuide.icon || 'fa-file-pdf'}"></i> <span>${esc(relGuide.name)}</span></a>`;
  }).filter(Boolean).join('');

  // Structured Data for Tool
  const toolCanonicalUrl = `${domain}/tools/${toolFile}`;
  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${toolCanonicalUrl}#app`,
        'url': toolCanonicalUrl,
        'name': `${guide.name} – PDFHub`,
        'description': cfg.desc,
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'All (Web Browser, Windows, macOS, Linux, iOS, Android)',
        'browserRequirements': 'Requires JavaScript and modern browser WebAssembly capabilities.',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': guide.steps || []
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${domain}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Tools',
            'item': `${domain}/#tools`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': guide.name,
            'item': toolCanonicalUrl
          }
        ]
      }
    ]
  };

  // Extract original scripts from git HEAD to preserve all tool dependencies
  let origScripts = '';
  try {
    const origGitContent = child_process.execSync(`git show HEAD:tools/${toolFile}`, { encoding: 'utf8' });
    const origHeadMatch = origGitContent.match(/<head>([\s\S]*?)<\/head>/i);
    if (origHeadMatch) {
      const scriptTags = [...origHeadMatch[1].matchAll(/<script[\s\S]*?<\/script>/gi)].map(m => m[0]);
      origScripts = scriptTags.join('\n  ');
    }
  } catch(e) {
    console.warn(`Could not read git HEAD for ${toolFile}:`, e.message);
  }

  // Build new <head> metadata block
  const seoHeadBlock = `  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${esc(cfg.title)}</title>
  <meta name="description" content="${esc(cfg.desc)}"/>
  <link rel="canonical" href="${toolCanonicalUrl}"/>
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
  <meta name="theme-color" content="#07070d"/>

  <!-- Open Graph / Facebook -->
  <meta property="og:site_name" content="PDFHub"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${esc(cfg.title)}"/>
  <meta property="og:description" content="${esc(cfg.desc)}"/>
  <meta property="og:url" content="${toolCanonicalUrl}"/>
  <meta property="og:image" content="${domain}/favicons/og-image.png"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:image:alt" content="${esc(guide.name)} – PDFHub"/>

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${esc(cfg.title)}"/>
  <meta name="twitter:description" content="${esc(cfg.desc)}"/>
  <meta name="twitter:image" content="${domain}/favicons/og-image.png"/>

  <link rel="icon" href="../favicons/favicon.png" type="image/png"/>
  <link rel="apple-touch-icon" href="../favicons/favicon.png"/>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <link rel="stylesheet" href="shared.css"/>
  ${origScripts}

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
${JSON.stringify(toolJsonLd, null, 2)}
  </script>`;

  // Replace <head> content
  html = html.replace(/<head>[\s\S]*?<\/head>/i, `<head>\n${seoHeadBlock}\n</head>`);

  // Build the on-page SEO content block
  const seoContentBlock = `
<!-- On-Page SEO Educational & Content Section -->
<section class="tool-seo-content" aria-labelledby="aboutToolHeading">
  <div class="tool-seo-card">
    <h2 id="aboutToolHeading">About ${esc(guide.name)}</h2>
    <p>${esc(guide.overview || guide.summary)}</p>

    <h3>How to Use ${esc(guide.name)} Online</h3>
    <ol class="tool-steps-list">
      ${(guide.steps || []).map(s => `<li>${esc(s)}</li>`).join('\n      ')}
    </ol>

    <div class="tool-feature-grid">
      <div class="tool-feature-box">
        <h4><i class="fas fa-shield-halved" aria-hidden="true" style="color:var(--a3)"></i> ${cfg.isExternal ? 'Data Handling & Privacy' : '100% Client-Side Privacy'}</h4>
        <p>${cfg.isExternal ? 'Document text extraction executes locally before communicating with inference APIs. Files are never retained.' : 'Files process in local browser memory via WebAssembly. Your documents are never uploaded to remote servers.'}</p>
      </div>
      <div class="tool-feature-box">
        <h4><i class="fas fa-file-circle-check" aria-hidden="true" style="color:var(--accent)"></i> Supported Input</h4>
        <p>${esc(guide.input || 'PDF documents')}</p>
      </div>
      <div class="tool-feature-box">
        <h4><i class="fas fa-bolt" aria-hidden="true" style="color:var(--a4)"></i> Output Result</h4>
        <p>${esc(guide.output || 'Processed PDF download')}</p>
      </div>
      <div class="tool-feature-box">
        <h4><i class="fas fa-lightbulb" aria-hidden="true" style="color:var(--a5)"></i> Practical Pro-Tip</h4>
        <p>${esc((guide.tips && guide.tips[0]) ? guide.tips[0] : 'Check your page selections before downloading the finalized document.')}</p>
      </div>
    </div>

    <div class="tool-guide-cta">
      <div>
        <h3>Need Visual Step-by-Step Guidance?</h3>
        <p>Explore our complete walkthrough for ${esc(guide.name)} with full interface screenshots, option reference, and troubleshooting FAQs.</p>
      </div>
      <a class="tool-guide-btn" href="../guides/${guide.id}/">
        <i class="fas fa-book-open" aria-hidden="true"></i> Read ${esc(guide.name)} Guide
      </a>
    </div>

    ${relatedChips ? `
    <div class="related-tools-box">
      <h4>Related PDF Utilities</h4>
      <div class="related-tools-chips">
        ${relatedChips}
      </div>
    </div>` : ''}
  </div>
</section>
`;

  // Remove any previously inserted tool-seo-content
  html = html.replace(/<!-- On-Page SEO Educational & Content Section -->[\s\S]*?<\/section>/i, '');

  // Insert before `<div class="tool-footer">` or before `</body>`
  if (html.includes('<div class="tool-footer">')) {
    html = html.replace('<div class="tool-footer">', `${seoContentBlock}\n<div class="tool-footer">`);
  } else if (html.includes('</body>')) {
    html = html.replace('</body>', `${seoContentBlock}\n</body>`);
  }

  fs.writeFileSync(toolFilePath, html, 'utf8');
}
console.log('✓ Successfully enhanced all 33 tool pages with SEO metadata, schema, and on-page content.');

// 3. Process each of the 33 Guide Pages
const guidesBaseDir = path.join(root, 'guides');

for (const guide of guides) {
  const guideDir = path.join(guidesBaseDir, guide.id);
  if (!fs.existsSync(guideDir)) {
    fs.mkdirSync(guideDir, { recursive: true });
  }

  const guideCanonicalUrl = `${domain}/guides/${guide.id}/`;
  const guideToolFileName = path.basename(guide.tool);
  const guideToolHref = `../../tools/${guideToolFileName}`;
  const totalSteps = (guide.walkthrough && guide.walkthrough.length > 0) ? guide.walkthrough.length : (guide.steps || []).length;

  const guideTitle = `${guide.name} Guide & Tutorial – Step-by-Step Walkthrough | PDFHub`;
  const guideDesc = `Complete visual guide and tutorial for ${guide.name} on PDFHub. ${guide.summary} Learn exact controls, step walkthroughs, tips, and troubleshooting.`;

  // Related guide cards
  const relatedGuideCards = (guide.related || []).map(relId => {
    const rel = guides.find(g => g.id === relId);
    if (!rel) return '';
    return `
      <a class="related-card" href="../${rel.id}/">
        <span><i class="fas ${rel.icon || 'fa-file-pdf'}" aria-hidden="true"></i> ${esc(rel.name)}</span>
        <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </a>`;
  }).filter(Boolean).join('');

  // Structured Data for Guide (TechArticle + HowTo + BreadcrumbList)
  const guideJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${guideCanonicalUrl}#article`,
        'url': guideCanonicalUrl,
        'headline': `${guide.name} Guide & Walkthrough`,
        'description': guideDesc,
        'author': {
          '@type': 'Person',
          'name': 'Hazim Bashir',
          'url': 'https://github.com/officialhazim42'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'PDFHub',
          'url': `${domain}/`,
          'logo': `${domain}/favicons/favicon.png`
        },
        'mainEntityOfPage': guideCanonicalUrl,
        'about': {
          '@type': 'WebApplication',
          'name': guide.name,
          'url': `${domain}/tools/${guideToolFileName}`
        }
      },
      {
        '@type': 'HowTo',
        '@id': `${guideCanonicalUrl}#howto`,
        'name': `How to use ${guide.name}`,
        'description': guide.overview,
        'step': (guide.steps || []).map((s, idx) => ({
          '@type': 'HowToStep',
          'position': idx + 1,
          'name': `Step ${idx + 1}`,
          'text': s
        }))
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${domain}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'User Guides & Tips',
            'item': `${domain}/guides/`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': `${guide.name} Guide`,
            'item': guideCanonicalUrl
          }
        ]
      }
    ]
  };

  // Pre-rendered Walkthrough Cards
  const walkthroughItems = (guide.walkthrough && guide.walkthrough.length > 0) ? guide.walkthrough : (guide.steps || []).map((step, idx) => ({
    step: idx + 1,
    title: `Step ${idx + 1}`,
    control: 'Workspace Interface',
    whatToDo: step,
    whatYouSee: 'The tool interface responds to your interaction.',
    nextAction: idx < (guide.steps.length - 1) ? `Proceed to Step ${idx + 2}.` : 'Save and download your result.',
    tip: 'Ensure your file is ready before proceeding.',
    image: `step-${idx + 1}-upload.webp`,
    alt: `${guide.name} Step ${idx + 1}`
  }));

  const preRenderedWalkCards = walkthroughItems.map((item, idx) => `
      <article class="walk-card" id="walkCard-${idx}" data-step="${item.step}">
        <div class="walk-card-header">
          <span class="walk-step-pill"><i class="fas fa-list-check" aria-hidden="true"></i> Step ${item.step} of ${totalSteps}</span>
          ${item.control ? `<span class="walk-control-badge" title="Target Interface Element"><i class="fas fa-crosshairs" aria-hidden="true"></i> ${esc(item.control)}</span>` : ''}
        </div>
        <button type="button" class="walk-media-btn" data-step-index="${idx}" aria-label="Enlarge screenshot for Step ${item.step}: ${esc(item.title)}" aria-haspopup="dialog">
          <img src="../../assets/guides/${guide.id}/${item.image}" alt="${esc(item.alt || item.title)}" width="1440" height="1000" loading="lazy" class="walk-img" onerror="this.onerror=null;this.src='../../assets/guides/${guide.id}/step-${item.step}-open.webp';">
          <span class="walk-badge">Step ${item.step}</span>
          <span class="walk-zoom-hint"><i class="fas fa-magnifying-glass-plus" aria-hidden="true"></i> Click to zoom</span>
        </button>
        <div class="walk-content">
          <h3 class="walk-title">${esc(item.title)}</h3>
          <div class="walk-field-group">
            <div class="walk-field what-to-do">
              <span class="walk-field-badge"><i class="fas fa-hand-pointer" aria-hidden="true"></i> What to do:</span>
              <p class="walk-field-desc">${esc(item.whatToDo || item.desc)}</p>
            </div>
            ${item.whatYouSee ? `
            <div class="walk-field what-you-see">
              <span class="walk-field-badge"><i class="fas fa-eye" aria-hidden="true"></i> What you will see:</span>
              <p class="walk-field-desc">${esc(item.whatYouSee)}</p>
            </div>` : ''}
            ${item.nextAction ? `
            <div class="walk-field next-action">
              <span class="walk-field-badge"><i class="fas fa-arrow-right" aria-hidden="true"></i> Next:</span>
              <p class="walk-field-desc">${esc(item.nextAction)}</p>
            </div>` : ''}
            ${item.tip ? `
            <div class="walk-field tip-box">
              <span class="walk-field-badge"><i class="fas fa-lightbulb" aria-hidden="true"></i> Tip:</span>
              <p class="walk-field-desc">${esc(item.tip)}</p>
            </div>` : ''}
          </div>
        </div>
        <div class="walk-card-footer">
          <button type="button" class="walk-nav-btn prev-step" data-target-step="${idx - 1}" ${idx === 0 ? 'disabled' : ''} aria-label="Go to previous step">
            <i class="fas fa-chevron-left" aria-hidden="true"></i> Previous
          </button>
          <span class="walk-step-indicator">${item.step} / ${totalSteps}</span>
          <button type="button" class="walk-nav-btn next-step" data-target-step="${idx + 1}" ${idx === totalSteps - 1 ? 'disabled' : ''} aria-label="Go to next step">
            Next <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </article>`).join('\n');

  const preRenderedStepChips = walkthroughItems.map((item, idx) => `
    <button type="button" class="walk-step-chip ${idx === 0 ? 'active' : ''}" data-step-target="${idx}" aria-label="Jump to Step ${item.step}: ${esc(item.title)}">
      <span class="chip-num">${item.step}</span>
      <span class="chip-title">${esc(item.title)}</span>
    </button>`).join('\n');

  // Pre-rendered HTML inside <main class="guide-shell" id="guideDetail">
  const preRenderedGuideBody = `
      <!-- BREADCRUMBS -->
      <nav class="guide-breadcrumbs" aria-label="Breadcrumb">
        <a href="../../index.html"><i class="fas fa-house" aria-hidden="true"></i> Home</a>
        <span class="crumb-sep" aria-hidden="true">/</span>
        <a href="../"><i class="fas fa-book-open" aria-hidden="true"></i> User Guides &amp; Tips</a>
        <span class="crumb-sep" aria-hidden="true">/</span>
        <span class="crumb-current">${esc(guide.name)}</span>
      </nav>

      <!-- HERO SECTION -->
      <header class="guide-detail-hero">
        <div class="guide-hero-badge">
          <i class="fas ${guide.icon || 'fa-file-pdf'}" aria-hidden="true"></i>
          <span>${esc(guide.category)} · ${esc(guide.time || '3 min')} read</span>
        </div>
        <h1 class="guide-title">${esc(guide.name)} Guide &amp; Walkthrough</h1>
        <p class="guide-lead">${esc(guide.summary)}</p>
        <div class="detail-actions">
          <a class="guide-btn primary" href="${guideToolHref}">
            <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> Open This Tool
          </a>
          <a class="guide-btn" href="../">
            <i class="fas fa-arrow-left" aria-hidden="true"></i> All Guides
          </a>
          <button type="button" class="guide-btn accent" id="heroStartTourBtn">
            <i class="fas fa-images" aria-hidden="true"></i> Fullscreen Walkthrough
          </button>
        </div>
      </header>

      <!-- STICKY QUICK GUIDE SECTION NAVIGATION -->
      <nav class="guide-quick-nav" id="guideQuickNav" aria-label="Guide section navigation">
        <div class="quick-nav-track">
          <a class="quick-nav-link active" href="#section-overview"><i class="fas fa-circle-info" aria-hidden="true"></i> Overview</a>
          <a class="quick-nav-link" href="#section-instructions"><i class="fas fa-list-ol" aria-hidden="true"></i> Instructions</a>
          <a class="quick-nav-link" href="#section-walkthrough"><i class="fas fa-images" aria-hidden="true"></i> Walkthrough <span class="nav-count">${totalSteps}</span></a>
          <a class="quick-nav-link" href="#section-tips"><i class="fas fa-lightbulb" aria-hidden="true"></i> Tips</a>
          <a class="quick-nav-link" href="#section-mistakes"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Common Mistakes</a>
          <a class="quick-nav-link" href="#section-trouble"><i class="fas fa-wrench" aria-hidden="true"></i> Troubleshooting</a>
          <a class="quick-nav-link" href="#section-faq"><i class="fas fa-circle-question" aria-hidden="true"></i> FAQs</a>
          ${relatedGuideCards ? `<a class="quick-nav-link" href="#section-related"><i class="fas fa-layer-group" aria-hidden="true"></i> Related Tools</a>` : ''}
        </div>
      </nav>

      <!-- MAIN CONTENT LAYOUT -->
      <div class="detail-layout">
        <div class="detail-main">

          <!-- 1. OVERVIEW & BEFORE YOU START -->
          <section class="guide-section" id="section-overview">
            <div class="guide-section-header">
              <i class="fas fa-circle-info" aria-hidden="true"></i>
              <h2>Tool Overview &amp; Requirements</h2>
            </div>
            <p>${esc(guide.overview)}</p>
            <div class="facts">
              <div class="fact">
                <strong><i class="fas fa-file-import" aria-hidden="true"></i> Input</strong>
                <span>${esc(guide.input)}</span>
              </div>
              <div class="fact">
                <strong><i class="fas fa-file-export" aria-hidden="true"></i> Output</strong>
                <span>${esc(guide.output)}</span>
              </div>
              <div class="fact">
                <strong><i class="fas fa-shield-halved" aria-hidden="true"></i> Requirements</strong>
                <span>${esc(guide.requirements)}</span>
              </div>
            </div>
          </section>

          <!-- 2. STEP-BY-STEP INSTRUCTIONS -->
          <section class="guide-section" id="section-instructions">
            <div class="guide-section-header">
              <i class="fas fa-list-ol" aria-hidden="true"></i>
              <h2>Step-by-Step Instructions</h2>
            </div>
            <p>Follow these essential instructions to achieve optimal results when using ${esc(guide.name)}:</p>
            <ol class="guide-step-list">
              ${(guide.steps || []).map(step => `<li>${esc(step)}</li>`).join('\n              ')}
            </ol>
          </section>

          <!-- 3. VISUAL WALKTHROUGH SECTION -->
          <section class="guide-section visual-walkthrough-section" id="section-walkthrough">
            <div class="walk-section-header">
              <div>
                <span class="walk-eyebrow"><i class="fas fa-graduation-cap" aria-hidden="true"></i> Interactive Tutorial</span>
                <h2>Visual Step-by-Step Walkthrough</h2>
                <p class="walk-subtitle">Follow these real interface screenshots captured directly from ${esc(guide.name)}. Every step highlights the exact buttons, selections, and downloads. Click any screenshot or "Launch Fullscreen Viewer" to inspect in high resolution.</p>
              </div>
              <div class="walk-tour-action">
                <button type="button" class="guide-btn primary walk-start-tour-btn" id="startTourBtn" aria-label="Launch interactive full-screen walkthrough">
                  <i class="fas fa-play" aria-hidden="true"></i> Launch Fullscreen Viewer
                </button>
              </div>
            </div>

            <!-- Step Progress Navigation Bar -->
            <div class="walk-progress-nav" id="walkProgressNav" role="navigation" aria-label="Walkthrough steps">
              <div class="walk-progress-track">
                <div class="walk-progress-bar" id="walkProgressBar" style="width: ${Math.round(100 / totalSteps)}%;"></div>
              </div>
              <div class="walk-step-chips" id="walkStepChips">
                ${preRenderedStepChips}
              </div>
            </div>

            <div class="walkthrough" id="walkthroughGrid">
              ${preRenderedWalkCards}
            </div>
          </section>

          <!-- 4. TIPS & BEST PRACTICES -->
          <section class="guide-section" id="section-tips">
            <div class="guide-section-header">
              <i class="fas fa-lightbulb" aria-hidden="true"></i>
              <h2>Tips &amp; Best Practices</h2>
            </div>
            <ul class="tips-list">
              ${(guide.tips || []).map(item => `<li><i class="fas fa-circle-check" aria-hidden="true"></i><span>${esc(item)}</span></li>`).join('\n              ')}
            </ul>
          </section>

          <!-- 5. COMMON MISTAKES -->
          <section class="guide-section" id="section-mistakes">
            <div class="guide-section-header">
              <i class="fas fa-triangle-exclamation" aria-hidden="true"></i>
              <h2>Common Mistakes to Avoid</h2>
            </div>
            <ul class="mistakes-list">
              ${(guide.mistakes || []).map(item => `<li><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><span>${esc(item)}</span></li>`).join('\n              ')}
            </ul>
          </section>

          <!-- 6. TROUBLESHOOTING -->
          <section class="guide-section" id="section-trouble">
            <div class="guide-section-header">
              <i class="fas fa-wrench" aria-hidden="true"></i>
              <h2>Troubleshooting &amp; FAQ</h2>
            </div>
            <div class="trouble-list">
              ${(guide.trouble || []).map(item => `<div class="trouble-item"><i class="fas fa-circle-exclamation" aria-hidden="true"></i><p>${esc(item)}</p></div>`).join('\n              ')}
            </div>
          </section>

          <!-- 7. FREQUENTLY ASKED QUESTIONS -->
          <section class="guide-section" id="section-faq">
            <div class="guide-section-header">
              <i class="fas fa-circle-question" aria-hidden="true"></i>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div class="faq-list">
              ${(guide.faq || []).map(item => {
                const parts = item.split('?');
                const q = parts[0] + '?';
                const a = parts.slice(1).join('?').trim();
                return `
                <details class="faq-item">
                  <summary class="faq-question"><strong>${esc(q)}</strong></summary>
                  <p class="faq-answer">${esc(a)}</p>
                </details>`;
              }).join('\n              ')}
            </div>
          </section>

          <!-- 8. RELATED TOOLS -->
          ${relatedGuideCards ? `
          <section class="guide-section" id="section-related">
            <div class="guide-section-header">
              <i class="fas fa-layer-group" aria-hidden="true"></i>
              <h2>Related PDF Tools &amp; Guides</h2>
            </div>
            <div class="related-grid">
              ${relatedGuideCards}
            </div>
          </section>` : ''}

        </div>
      </div>
`;

  const guideHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(guideTitle)}</title>
  <meta name="description" content="${esc(guideDesc)}">
  <link rel="canonical" href="${guideCanonicalUrl}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="theme-color" content="#07070d">

  <!-- Open Graph / Facebook -->
  <meta property="og:site_name" content="PDFHub">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${esc(guideTitle)}">
  <meta property="og:description" content="${esc(guideDesc)}">
  <meta property="og:url" content="${guideCanonicalUrl}">
  <meta property="og:image" content="${domain}/favicons/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(guide.name)} Guide – PDFHub">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(guideTitle)}">
  <meta name="twitter:description" content="${esc(guideDesc)}">
  <meta name="twitter:image" content="${domain}/favicons/og-image.png">

  <link rel="icon" href="../../favicons/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="../../favicons/favicon.png">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../../developer.css">
  <link rel="stylesheet" href="../styles.css">

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
${JSON.stringify(guideJsonLd, null, 2)}
  </script>
  <script>
    (function(){
      try {
        const saved = localStorage.getItem('pdfhub-theme');
        if (saved === 'light') {
          document.documentElement.classList.add('light');
          document.body?.classList.add('light');
        }
      } catch(e){}
    })();
  </script>
</head>
<body data-root="../../" data-guide="${guide.id}">
  <main class="guide-shell" id="guideDetail">
${preRenderedGuideBody}
  </main>
  <script src="../data.js"></script>
  <script src="../shared-nav.js"></script>
  <script src="../guide.js"></script>
  <script src="../../developer.js"></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(guideDir, 'index.html'), guideHtml, 'utf8');
}
console.log('✓ Successfully generated pre-rendered HTML, unique titles, descriptions, and schemas for all 33 guide pages.');

// 4. Update guides/guide-template.html as well
const guideTemplateHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>__TOOL_NAME__ Guide &amp; Tutorial – Step-by-Step Walkthrough | PDFHub</title>
  <meta name="description" content="Step-by-step user guide and tutorial for __TOOL_NAME__ on PDFHub with visual screenshots, tips, and troubleshooting FAQs.">
  <link rel="canonical" href="${domain}/guides/__GUIDE_ID__/">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="theme-color" content="#07070d">

  <meta property="og:site_name" content="PDFHub">
  <meta property="og:type" content="article">
  <meta property="og:title" content="__TOOL_NAME__ Guide &amp; Tutorial | PDFHub">
  <meta property="og:description" content="Step-by-step user guide and tutorial for __TOOL_NAME__ on PDFHub with visual screenshots, tips, and troubleshooting FAQs.">
  <meta property="og:url" content="${domain}/guides/__GUIDE_ID__/">
  <meta property="og:image" content="${domain}/favicons/og-image.png">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="__TOOL_NAME__ Guide &amp; Tutorial | PDFHub">
  <meta name="twitter:description" content="Step-by-step user guide and tutorial for __TOOL_NAME__ on PDFHub with visual screenshots, tips, and troubleshooting FAQs.">
  <meta name="twitter:image" content="${domain}/favicons/og-image.png">

  <link rel="icon" href="../../favicons/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="../../favicons/favicon.png">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../../developer.css">
  <link rel="stylesheet" href="../styles.css">
  <script>
    (function(){
      try {
        const saved = localStorage.getItem('pdfhub-theme');
        if (saved === 'light') {
          document.documentElement.classList.add('light');
          document.body?.classList.add('light');
        }
      } catch(e){}
    })();
  </script>
</head>
<body data-root="../../" data-guide="__GUIDE_ID__">
  <main class="guide-shell" id="guideDetail"></main>
  <script src="../data.js"></script>
  <script src="../shared-nav.js"></script>
  <script src="../guide.js"></script>
  <script src="../../developer.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(root, 'guides', 'guide-template.html'), guideTemplateHtml, 'utf8');
console.log('✓ Updated guides/guide-template.html');

console.log('\n=== COMPLETED ALL TOOL AND GUIDE SEO ENHANCEMENTS ===\n');
