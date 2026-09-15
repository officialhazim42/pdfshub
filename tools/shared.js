/* PDFHub Shared JS — Theme Toggle + Download Modal */

function normalizeBrandLogo(){
  document.querySelectorAll('.logo').forEach(logo=>{
    logo.innerHTML='<img class="logo-mark" src="../favicon.png" alt="" aria-hidden="true"/>PDF HUB';
  });
}

function buildSiteFooter(){
  return `<footer class="site-footer"><div class="f-logo">PDFHub</div><div class="f-by">Built with ❤️ by <a href="https://instagram.com/officialhazim42" target="_blank">@officialhazim42</a> · Free forever · No sign-up · Files never leave your device</div><div class="socials"><a class="soc" href="https://instagram.com/officialhazim42" target="_blank"><i class="fab fa-instagram" style="color:#e1306c"></i> Instagram</a><a class="soc" href="https://twitter.com/officialhazim42" target="_blank"><i class="fab fa-x-twitter"></i> Twitter / X</a><a class="soc" href="https://youtube.com/@officialhazim42" target="_blank"><i class="fab fa-youtube" style="color:#ff0000"></i> YouTube</a><a class="soc" href="https://tiktok.com/@officialhazim42" target="_blank"><i class="fab fa-tiktok" style="color:#69c9d0"></i> TikTok</a><a class="soc" href="https://facebook.com/officialhazim42" target="_blank"><i class="fab fa-facebook" style="color:#1877f2"></i> Facebook</a><a class="soc" href="https://linkedin.com/in/hazim-bashir-faqeer" target="_blank"><i class="fab fa-linkedin" style="color:#0077b5"></i> LinkedIn</a><a class="soc" href="https://github.com/officialhazim42" target="_blank"><i class="fab fa-github"></i> GitHub</a><a class="soc" href="https://t.me/officialhazim42" target="_blank"><i class="fab fa-telegram" style="color:#26a5e4"></i> Telegram</a><a class="soc" href="https://snapchat.com/add/officialhazim42" target="_blank"><i class="fab fa-snapchat" style="color:#fffc00"></i> Snapchat</a><a class="soc" href="https://wa.me/9055267442" target="_blank"><i class="fab fa-whatsapp" style="color:#25d366"></i> WhatsApp</a></div><div class="f-bottom"><span class="f-copy">©PDFHub</span><div class="f-dot"></div><span class="f-copy">by @officialhazim42</span><div class="f-dot"></div><span class="f-copy">All 33 tools free forever</span><div class="f-dot"></div><span class="f-copy">Your files never leave your device</span></div></footer>`;
}

function normalizeSiteFooter(){
  const existing=document.querySelector('.tool-footer');
  if(existing)existing.outerHTML=buildSiteFooter();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{normalizeBrandLogo();normalizeSiteFooter();},{once:true});else{normalizeBrandLogo();normalizeSiteFooter();}

// Give each tool page its own uploaded favicon.
(function(){
  const icons={
    'compare.html':['CMP','#facc15'],
    'compress.html':['ZIP','#00e5a0'],
    'crop.html':['CRP','#38d9f5'],
    'edit.html':['EDT','#ff5f7e'],
    'excel-to-pdf.html':['XLS','#00e5a0'],
    'extract-pages.html':['EXT','#ffb347'],
    'forms.html':['FRM','#c084fc'],
    'html-to-pdf.html':['HTML','#ff8a65'],
    'jpg-to-pdf.html':['JPG','#38d9f5'],
    'merge.html':['MRG','#7c6aff'],
    'ocr.html':['OCR','#00e5a0'],
    'organize.html':['ORG','#ffb347'],
    'page-numbers.html':['NUM','#c084fc'],
    'pdf-to-excel.html':['XLS','#00e5a0'],
    'pdf-to-jpg.html':['JPG','#38d9f5'],
    'pdf-to-pdfa.html':['A','#ffb347'],
    'pdf-to-ppt.html':['PPT','#ff5f7e'],
    'pdf-to-word.html':['DOC','#38d9f5'],
    'ppt-to-pdf.html':['PPT','#ff5f7e'],
    'protect.html':['LOCK','#facc15'],
    'redact.html':['RED','#ff5f7e'],
    'remove-pages.html':['DEL','#ff5f7e'],
    'repair.html':['FIX','#00e5a0'],
    'rotate.html':['ROT','#c084fc'],
    'scan-to-pdf.html':['SCAN','#38d9f5'],
    'sign.html':['SIG','#ffb347'],
    'split.html':['SPL','#7c6aff'],
    'summarize.html':['AI','#c084fc'],
    'translate.html':['LANG','#38d9f5'],
    'pdf-to-markdown.html':['MD','#fff'],
    'unlock.html':['OPEN','#facc15'],
    'watermark.html':['WM','#38d9f5'],
    'word-to-pdf.html':['DOC','#38d9f5']
  };
  const filename=location.pathname.split('/').pop();
  const [label,color]=icons[filename]||['PDF','#7c6aff'];
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0f0f1a"/><rect x="7" y="7" width="50" height="50" rx="11" fill="${color}"/><path d="M19 15h17l9 9v25H19z" fill="#0f0f1a" opacity=".92"/><path d="M36 15v11h9" fill="${color}" opacity=".7"/><text x="32" y="43" fill="#fff" font-family="Arial,sans-serif" font-size="${label.length>4?'9':'12'}" font-weight="700" text-anchor="middle">${label}</text></svg>`;
  const iconUrl=`data:image/svg+xml,${encodeURIComponent(svg)}`;
  document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]').forEach(link=>link.remove());
  const icon=document.createElement('link');icon.rel='icon';icon.href=iconUrl;icon.type='image/svg+xml';document.head.appendChild(icon);
  const touch=document.createElement('link');touch.rel='apple-touch-icon';touch.href=iconUrl;document.head.appendChild(touch);
})();

const toolGuides={
  'merge.html':{steps:['Select two or more PDF files.','Drag the files into the order you want.','Click Merge PDFs and download the combined file.'],tips:['Keep the original files until you check the final page order.','Large files may take a few seconds to process locally.']},
  'split.html':{steps:['Upload one PDF.','Choose page ranges or split every page.','Run the split and download the generated files.'],tips:['Use commas and hyphens for ranges such as 1-3,5.','Check the page count before downloading.']},
  'remove-pages.html':{steps:['Upload your PDF.','Select the pages you want to remove.','Apply the change and download the new PDF.'],tips:['Preview page numbers carefully before deleting.','Keep a copy of the original document.']},
  'extract-pages.html':{steps:['Upload a PDF.','Enter the pages you want to keep.','Extract and download the new PDF.'],tips:['Use ranges for consecutive pages.','The original PDF is not modified.']},
  'organize.html':{steps:['Upload a PDF.','Drag thumbnails to reorder, rotate, or delete pages.','Export the organized PDF.'],tips:['Use the thumbnail preview to verify orientation.','Review the first and last pages before export.']},
  'scan-to-pdf.html':{steps:['Allow camera access or select images.','Capture or add all document pages.','Arrange the pages and export as PDF.'],tips:['Use even lighting for cleaner scans.','Keep the camera parallel to the page.']},
  'compress.html':{steps:['Upload a PDF.','Choose the compression level if available.','Start compression and download the result.'],tips:['Compare quality on image-heavy documents.','Compression runs in your browser.']},
  'repair.html':{steps:['Upload the damaged PDF.','Start the repair process.','Download and test the repaired file.'],tips:['Repair cannot restore missing source data.','Keep the original file for comparison.']},
  'ocr.html':{steps:['Upload a scanned PDF.','Choose the document language and pages.','Run OCR, then copy or download the extracted text.'],tips:['Select the correct language for better recognition.','Clear, high-resolution scans produce better results.']},
  'jpg-to-pdf.html':{steps:['Select one or more images.','Arrange them and choose page settings.','Create and download the PDF.'],tips:['Use consistent image orientation.','PNG and WebP files are supported too.']},
  'word-to-pdf.html':{steps:['Choose a DOCX file.','Set page size and text options.','Convert and download the PDF.'],tips:['Review complex layouts after conversion.','Only DOCX files are accepted.']},
  'ppt-to-pdf.html':{steps:['Choose a PPTX presentation.','Set the page or slide options.','Convert and download the PDF.'],tips:['Check fonts and slide spacing in the result.','Remember that presentation animations are not exported.']},
  'excel-to-pdf.html':{steps:['Choose an XLSX workbook.','Select the sheet and page options.','Convert and download the PDF.'],tips:['Set print areas in the source workbook when possible.','Wide sheets may span several PDF pages.']},
  'html-to-pdf.html':{steps:['Paste HTML or enter a URL.','Set the page size and margins.','Generate and download the PDF.'],tips:['Use print-friendly CSS for predictable output.','External content may require an internet connection.']},
  'pdf-to-jpg.html':{steps:['Upload a PDF.','Choose the page and image format.','Render and download the image files.'],tips:['Higher quality creates larger files.','Check transparent or white background settings.']},
  'pdf-to-word.html':{steps:['Upload a text-based PDF.','Start the conversion.','Download and edit the DOCX result.'],tips:['Scanned PDFs may need OCR first.','Complex layouts can change during extraction.']},
  'pdf-to-ppt.html':{steps:['Upload a PDF.','Choose the conversion settings.','Create and download the PPTX slides.'],tips:['Each PDF page becomes a presentation slide.','Review text placement before presenting.']},
  'pdf-to-excel.html':{steps:['Upload a PDF containing tables.','Choose the pages or tables to extract.','Export and download the XLSX file.'],tips:['Clean table borders improve extraction.','Verify totals and column alignment.']},
  'pdf-to-pdfa.html':{steps:['Upload a PDF.','Start PDF/A conversion.','Download and validate the archival copy.'],tips:['PDF/A may change unsupported features.','Keep the source PDF for future editing.']},
  'rotate.html':{steps:['Upload a PDF.','Choose the pages and rotation angle.','Apply rotation and download the result.'],tips:['Preview odd and even pages separately.','Rotation changes view orientation, not text content.']},
  'page-numbers.html':{steps:['Upload a PDF.','Choose position, style, and starting number.','Apply numbering and download the file.'],tips:['Leave enough margin for the number.','Check the first and last page after export.']},
  'watermark.html':{steps:['Upload a PDF.','Enter watermark text and adjust size, color, and opacity.','Apply the watermark and download the result.'],tips:['Use low opacity for readable documents.','Test one copy before sharing widely.']},
  'crop.html':{steps:['Upload a PDF.','Set the crop margins.','Apply the crop and download the result.'],tips:['Use preview dimensions to avoid cutting content.','Cropping changes visible page bounds.']},
  'edit.html':{steps:['Upload a PDF.','Use text, drawing, or highlight tools on the page.','Export the annotated PDF.'],tips:['Save often when making many annotations.','Zoom in for precise placement.']},
  'forms.html':{steps:['Upload a fillable PDF.','Click each field and enter the requested information.','Save and download the completed PDF.'],tips:['Some scanned PDFs do not contain interactive fields.','Review every field before saving.']},
  'unlock.html':{steps:['Upload the protected PDF.','Enter its password if required.','Unlock and download the new copy.'],tips:['Only unlock documents you are authorized to use.','A wrong password cannot be bypassed here.']},
  'protect.html':{steps:['Upload a PDF.','Set and confirm a strong password and permissions.','Encrypt and download the protected file.'],tips:['Store the password somewhere secure.','Test the downloaded file before deleting the source.']},
  'sign.html':{steps:['Upload a PDF.','Draw or type your signature.','Place it on the page and export the signed PDF.'],tips:['Use a mouse, stylus, or touch screen for drawing.','Check the signature position before export.']},
  'redact.html':{steps:['Upload a PDF.','Draw redaction boxes over sensitive content.','Apply redactions and download the sanitized file.'],tips:['Redaction is permanent after export.','Open the result and confirm hidden text cannot be selected.']},
  'compare.html':{steps:['Upload the original and modified PDFs.','Choose the page to compare.','Review the side-by-side difference view.'],tips:['Use matching page sizes for clearer comparison.','Compare several pages when changes may be elsewhere.']},
  'summarize.html':{steps:['Upload a text-based PDF.','Start the summarizer.','Review the summary and key points.'],tips:['Short, well-structured documents produce clearer summaries.','Verify important facts against the original PDF.']},
  'translate.html':{steps:['Upload a PDF.','Choose source and target languages.','Translate, review, and download the result.'],tips:['Text-based PDFs work best.','Check names, numbers, and technical terms manually.']},
  'pdf-to-markdown.html':{steps:['Upload a text-based PDF.','Extract the document text.','Review and download the Markdown output.'],tips:['Headings and complex layouts may need cleanup.','Use the editable output as a starting point.']}
};

function injectToolGuide(){
  const filename=location.pathname.split('/').pop();
  const guide=toolGuides[filename];
  const header=document.querySelector('.tool-header');
  if(!guide||!header||document.querySelector('.tool-guide'))return;
  const section=document.createElement('section');
  section.className='tool-guide';
  section.innerHTML=`<div><h2><i class="fas fa-list-check"></i> How to use</h2><ol>${guide.steps.map(step=>`<li>${step}</li>`).join('')}</ol></div><div class="tool-guide-tips"><h2><i class="fas fa-lightbulb"></i> Tips</h2><ul>${guide.tips.map(tip=>`<li>${tip}</li>`).join('')}</ul></div>`;
  header.insertAdjacentElement('afterend',section);
}

// ── THEME ──────────────────────────────────────────────
(function(){
  const saved=localStorage.getItem('pdfhub-theme')||'dark';
  const applyTheme=()=>{if(saved==='light')document.body.classList.add('light');};
  if(document.body)applyTheme();else document.addEventListener('DOMContentLoaded',applyTheme,{once:true});
})();

function getHistoryTools(){
  try{return JSON.parse(localStorage.getItem('pdfhub-history-tools')||'[]');}catch{return []}
}

function renderHistoryMenu(){
  const menu=document.getElementById('historyMenu');
  if(!menu)return;
  const items=getHistoryTools();
  if(!items.length){menu.innerHTML='<div class="history-empty">No recent tools yet</div>';return;}
  menu.innerHTML=items.map(item=>`<a class="history-item" href="${item.url}"><span>${item.name}</span><i class="fas fa-arrow-right"></i></a>`).join('');
}

function saveHistoryTool(name,url){
  const cleanUrl=url||'index.html';
  const entries=getHistoryTools();
  const next=[{name, url:cleanUrl}, ...entries.filter(item=>item.url!==cleanUrl && item.name!==name)].slice(0,6);
  localStorage.setItem('pdfhub-history-tools', JSON.stringify(next));
  renderHistoryMenu();
}

function toggleHistoryMenu(){
  const toggle=document.getElementById('historyToggle');
  if(!toggle)return;
  const isOpen=toggle.classList.contains('open');
  document.querySelectorAll('.history-toggle').forEach(el=>el.classList.remove('open'));
  if(!isOpen) toggle.classList.add('open');
  toggle.setAttribute('aria-expanded', String(!isOpen));
}

document.addEventListener('click', (event)=>{
  if(!event.target.closest('.history-toggle')){
    document.querySelectorAll('.history-toggle').forEach(el=>el.classList.remove('open'));
  }
});

function toggleTheme(){
  const isLight=document.body.classList.toggle('light');
  localStorage.setItem('pdfhub-theme',isLight?'light':'dark');
  // Update all toggle icons on page
  document.querySelectorAll('.toggle-knob').forEach(k=>{
    k.innerHTML=isLight?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>';
  });
}

function buildThemeToggle(){
  const isLight=document.body.classList.contains('light');
  return `<div class="theme-toggle" onclick="toggleTheme()" title="Toggle theme">
    <span class="t-label" id="themeLabel">${isLight?'Light':'Dark'}</span>
    <div class="toggle-track">
      <div class="toggle-knob">${isLight?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>'}</div>
    </div>
  </div>`;
}

// Keep label in sync
const _origToggle=window.toggleTheme;
window.toggleTheme=function(){
  const isLight=document.body.classList.toggle('light');
  localStorage.setItem('pdfhub-theme',isLight?'light':'dark');
  document.querySelectorAll('.toggle-knob').forEach(k=>{
    k.innerHTML=isLight?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>';
  });
  document.querySelectorAll('#themeLabel').forEach(l=>l.textContent=isLight?'Light':'Dark');
};

function ensureHistoryToggle(){
  const container = document.querySelector('.nav-right') || document.querySelector('.nav-right-tools');
  if(!container) return;
  container.querySelectorAll('.history-toggle,.theme-toggle').forEach(control=>control.remove());
}

function attachHistoryToggle(){
  ensureHistoryToggle();
  const currentName=document.title.replace(' – PDFHub','').trim() || 'PDFHub';
  const currentUrl=location.pathname.split('/').pop() || 'index.html';
  saveHistoryTool(currentName, currentUrl === 'index.html' ? 'index.html' : currentUrl);
}

function ensureSiteMenu(){
  const container=document.querySelector('.nav-right-tools');
  if(!container||document.getElementById('menuToggle'))return;
  const toggle=document.createElement('button');
  toggle.className='menu-toggle';toggle.id='menuToggle';toggle.type='button';toggle.title='Open menu';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','siteMenu');toggle.innerHTML='<i class="fas fa-bars"></i>';
  const menu=document.createElement('div');menu.className='site-menu';menu.id='siteMenu';menu.setAttribute('aria-hidden','true');
  const notificationCount=localStorage.getItem('pdfhub-notifications-seen')==='true'?'0':'2';
  menu.innerHTML=`<div class="menu-heading"><span>PDFHub control center</span><small>Stored in this browser</small></div><form class="menu-search" id="menuSearch"><input id="menuSearchInput" type="search" placeholder="Search tools..." aria-label="Search tools"/><button type="submit" title="Search"><i class="fas fa-arrow-right"></i></button></form><div class="menu-list"><div class="menu-theme-row"><span><i class="fas fa-circle-half-stroke"></i> Appearance</span><button class="theme-toggle" id="menuThemeToggle" type="button" onclick="toggleTheme()" title="Toggle light/dark mode"><span class="t-label" id="themeLabel">Dark</span><span class="toggle-track"><span class="toggle-knob" id="themeKnob"><i class="fas fa-moon"></i></span></span></button></div><a class="menu-action" href="../dashboard.html"><i class="fas fa-chart-line"></i><span>Personal dashboard</span><span class="menu-badge" id="dashboardCount">${getHistoryTools().length}</span></a><a class="menu-action" href="../dashboard.html#notifications"><i class="fas fa-bell"></i><span>Notifications</span><span class="menu-badge" id="notificationCount">${notificationCount}</span></a><a class="menu-action" href="../history.html"><i class="fas fa-clock-rotate-left"></i><span>History</span></a><a class="menu-action" href="../terms.html"><i class="fas fa-file-contract"></i><span>Terms and conditions</span></a><a class="menu-action" href="../about.html"><i class="fas fa-circle-info"></i><span>About us</span></a></div><p class="menu-note">Your files stay on this device. No account required.</p>`;
  menu.querySelector('.menu-theme-row')?.remove();
  const homeLink=document.createElement('a');homeLink.className='menu-action';homeLink.href='../index.html';homeLink.innerHTML='<i class="fas fa-house"></i><span>Home</span>';menu.querySelector('.menu-list').prepend(homeLink);
  container.append(toggle,menu);
  const globalTheme=document.createElement('button');globalTheme.className='global-theme-toggle';globalTheme.id='globalThemeToggle';globalTheme.type='button';globalTheme.title='Toggle light/dark mode';globalTheme.innerHTML='<span class="t-label" id="themeLabel">Dark</span><span class="toggle-track"><span class="toggle-knob" id="themeKnob"><i class="fas fa-moon"></i></span></span>';globalTheme.onclick=toggleTheme;container.insertBefore(globalTheme,toggle);
  if(document.body.classList.contains('light')){globalTheme.querySelector('.t-label').textContent='Light';globalTheme.querySelector('.toggle-knob').innerHTML='<i class="fas fa-sun"></i>';}
  menu.querySelector('#menuSearch').addEventListener('submit',event=>{event.preventDefault();location.href='../index.html?search='+encodeURIComponent(menu.querySelector('#menuSearchInput').value);});
  const close=()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');toggle.innerHTML='<i class="fas fa-bars"></i>';};
  toggle.addEventListener('click',event=>{event.stopPropagation();if(menu.classList.contains('open'))close();else{menu.classList.add('open');menu.setAttribute('aria-hidden','false');toggle.setAttribute('aria-expanded','true');toggle.innerHTML='<i class="fas fa-xmark"></i>';}});
  menu.querySelectorAll('[data-menu-action]').forEach(action=>action.addEventListener('click',()=>{
    if(action.dataset.menuAction==='dashboard')menu.querySelector('.menu-note').textContent=`${getHistoryTools().length} tool${getHistoryTools().length===1?'':'s'} in your local dashboard.`;
  }));
  document.addEventListener('click',event=>{if(!event.target.closest('#siteMenu')&&!event.target.closest('#menuToggle'))close();});
}

// ── DOWNLOAD MODAL ─────────────────────────────────────
let _pendingDownload=null; // {blob, filename}
let _previewUrl=null;

function previewGeneratedFile(blob, filename){
  try{
    const existing=document.getElementById('generatedPreview');
    if(existing)existing.remove();
    if(_previewUrl){try{URL.revokeObjectURL(_previewUrl);}catch{};_previewUrl=null;}
    const url=URL.createObjectURL(blob);
    const type=(blob.type||'').toLowerCase();
    const isPdf=type.includes('pdf') || filename.toLowerCase().endsWith('.pdf');
    const isImage=type.startsWith('image/');
    const isText=type.startsWith('text/') || /\.(txt|md|csv|rtf)$/i.test(filename);
    const title=escapeHtml(filename);
    const section=document.createElement('section');
    section.id='generatedPreview';
    section.className='generated-preview';
    const media=isPdf ? `<iframe src="${url}" title="${title}" class="generated-preview-frame"></iframe>` : isImage ? `<img src="${url}" alt="${title}" class="generated-preview-image">` : isText ? `<pre class="generated-preview-text">${escapeHtml('Preview available for this generated file. Use Continue to download to save the complete output.')}</pre>` : `<div class="generated-preview-unavailable"><i class="fas fa-file-circle-check"></i><p>This output format cannot be rendered in the browser, but the generated file is ready.</p></div>`;
    section.innerHTML=`<div class="generated-preview-heading"><div><span class="generated-preview-kicker"><i class="fas fa-eye"></i> Mandatory preview</span><h2>Review your changes</h2><p>${title} is ready. Check the result before downloading.</p></div><span class="generated-preview-status"><i class="fas fa-check"></i> Generated</span></div><div class="generated-preview-content">${media}</div><div class="generated-preview-file"><label for="generatedFilename"><i class="fas fa-pen"></i> File name</label><input id="generatedFilename" type="text" value="${title}" aria-label="File name" spellcheck="false"></div><div class="generated-preview-actions"><button class="btn btn-primary" type="button" onclick="continueToDownload()"><i class="fas fa-arrow-right"></i> Continue to download</button><button class="btn btn-secondary" type="button" onclick="discardGeneratedPreview()"><i class="fas fa-trash"></i> Discard</button></div>`;
    const wrap=document.querySelector('.tool-wrap');
    if(wrap)wrap.appendChild(section);else document.body.appendChild(section);
    if(isText)blob.text().then(content=>{const text=section.querySelector('.generated-preview-text');if(text)text.textContent=content.slice(0,200000);}).catch(()=>{});
    section.scrollIntoView({behavior:'smooth',block:'start'});
    _previewUrl=url;
    return url;
  }catch(error){
    console.warn('Preview failed:', error);
    return null;
  }
}

function escapeHtml(value){
  return String(value)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function showDownloadModal(blob, filename){
  _pendingDownload={blob,filename};
  previewGeneratedFile(blob, filename);
}

function continueToDownload(){
  if(!_pendingDownload)return;
  const input=document.getElementById('generatedFilename');
  const filename=input?.value.trim()||_pendingDownload.filename;
  _pendingDownload.filename=filename;
  openDownloadModal(_pendingDownload.blob,_pendingDownload.filename);
}

function discardGeneratedPreview(){
  _pendingDownload=null;
  const preview=document.getElementById('generatedPreview');
  if(preview)preview.remove();
  if(_previewUrl){try{URL.revokeObjectURL(_previewUrl);}catch{};_previewUrl=null;}
}

function openDownloadModal(blob, filename){
  const sizeMB=(blob.size/1024/1024).toFixed(2);
  const sizeKB=(blob.size/1024).toFixed(0);
  const displaySize=blob.size>1024*1024?sizeMB+' MB':sizeKB+' KB';
  const ext=(filename.split('.').pop()||'file').toUpperCase();
  const iconMap={PDF:'fa-file-pdf',DOCX:'fa-file-word',XLSX:'fa-file-excel',PPTX:'fa-file-powerpoint',JPG:'fa-file-image',PNG:'fa-file-image',TXT:'fa-file-alt',RTF:'fa-file-alt',ZIP:'fa-file-archive'};
  const icon=iconMap[ext]||'fa-file';
  let modal=document.getElementById('dlModal');
  if(!modal){
    modal=document.createElement('div');modal.id='dlModal';
    document.body.appendChild(modal);
  }
  modal.className='';
  modal.innerHTML=`
    <div class="dl-card">
      <span class="dl-icon">✅</span>
      <div class="dl-title">Ready to Download</div>
      <div class="dl-subtitle">Your file has been processed successfully.<br>Click Download to save it to your device.</div>
      <div class="dl-fileinfo">
        <i class="fas ${icon}"></i>
        <div>
          <div class="dl-fname">${filename}</div>
          <div class="dl-fsize">${displaySize} · ${ext} file</div>
        </div>
      </div>
      <div class="dl-btns">
        <button class="btn btn-success" onclick="confirmDownload()"><i class="fas fa-download"></i> Download</button>
        <button class="dl-cancel" onclick="closeModal()"><i class="fas fa-times"></i> Cancel</button>
      </div>
    </div>`;
  modal.classList.add('show');
  // Close on backdrop click
  modal.onclick=e=>{if(e.target===modal)closeModal()};
  // Close on Escape
  document.onkeydown=e=>{if(e.key==='Escape')closeModal()};
}

function confirmDownload(){
  if(!_pendingDownload)return;
  const {blob,filename}=_pendingDownload;
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=filename;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),10000);
  if(_previewUrl){
    setTimeout(()=>{try{URL.revokeObjectURL(_previewUrl);}catch{};_previewUrl=null;},1500);
  }
  try{
    const size = blob.size > 1048576 ? (blob.size/1048576).toFixed(2)+' MB' : (blob.size/1024).toFixed(0)+' KB';
    addArchiveEntry(filename, size);
  }catch{}
  closeModal();
}

function closeModal(){
  const modal=document.getElementById('dlModal');
  if(modal){modal.classList.remove('show');setTimeout(()=>modal.classList.add(''),200);}
  if(_previewUrl){
    setTimeout(()=>{try{URL.revokeObjectURL(_previewUrl);}catch{};_previewUrl=null;},1500);
  }
  document.onkeydown=null;
}

// Helper: show modal for Uint8Array (PDF bytes)
function downloadPDF(bytes, filename){
  const blob=new Blob([bytes],{type:'application/pdf'});
  showDownloadModal(blob,filename);
}

// Helper: show modal for any blob
function downloadBlob(blob, filename){
  showDownloadModal(blob,filename);
}

window.addEventListener('DOMContentLoaded',()=>{
  injectToolGuide();
  ensureHistoryToggle();
  attachHistoryToggle();
  ensureSiteMenu();
});
