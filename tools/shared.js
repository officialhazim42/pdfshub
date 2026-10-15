/* PDFHub Shared JS — Theme Toggle + Download Modal */

function normalizeBrandLogo(){
  document.querySelectorAll('.logo').forEach(logo=>{
    logo.innerHTML='<img class="logo-mark" src="../favicons/favicon.png" alt="" aria-hidden="true"/>PDF HUB';
  });
}

function buildSiteFooter(){
  return `<footer class="site-footer"><div class="f-logo">PDFHub</div><div class="f-by">Built with ❤️ · Free forever · No sign-up · Files never leave your device</div><div class="f-bottom"><span class="f-copy">©PDFHub</span><div class="f-dot"></div><span class="f-copy">by @officialhazim42</span><div class="f-dot"></div><span class="f-copy">All 33 tools free forever</span><div class="f-dot"></div><span class="f-copy">Your files never leave your device</span></div></footer>`;
}

function normalizeSiteFooter(){
  const existing=document.querySelector('.tool-footer');
  if(existing)existing.outerHTML=buildSiteFooter();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{normalizeBrandLogo();normalizeSiteFooter();},{once:true});else{normalizeBrandLogo();normalizeSiteFooter();}

// Give each tool page its own favicon stored with the shared site icons.
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
  const iconUrl=icons[filename]?`../favicons/${filename.replace(/\.html$/,'.svg')}`:'../favicons/favicon.png';
  document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]').forEach(link=>link.remove());
  const icon=document.createElement('link');icon.rel='icon';icon.href=iconUrl;icon.type=iconUrl.endsWith('.svg')?'image/svg+xml':'image/png';document.head.appendChild(icon);
  const touch=document.createElement('link');touch.rel='apple-touch-icon';touch.href=iconUrl;document.head.appendChild(touch);
})();

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
  document.querySelectorAll('.t-label').forEach(label=>label.textContent=isLight?'Light':'Dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',isLight?'#f4f4f8':'#07070d');
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
  document.querySelectorAll('.t-label').forEach(l=>l.textContent=isLight?'Light':'Dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',isLight?'#f4f4f8':'#07070d');
};
window.addEventListener('storage',event=>{
  if(event.key!=='pdfhub-theme')return;
  const isLight=event.newValue==='light';
  document.body.classList.toggle('light',isLight);
  document.querySelectorAll('.toggle-knob').forEach(k=>{k.innerHTML=isLight?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>';});
  document.querySelectorAll('.t-label').forEach(l=>l.textContent=isLight?'Light':'Dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',isLight?'#f4f4f8':'#07070d');
});

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
  menu.innerHTML=`<div class="menu-heading"><span>PDFHub control center</span><small>Private workspace</small></div><form class="menu-search" id="menuSearch"><i class="fas fa-magnifying-glass" aria-hidden="true"></i><input id="menuSearchInput" type="search" placeholder="Search 33 tools..." aria-label="Search tools"/><button type="submit" title="Search tools"><i class="fas fa-arrow-right"></i></button></form><div class="menu-status"><span><i class="fas fa-shield-halved"></i> Runs in your browser</span><span class="menu-status-dot">●</span><span>No account needed</span></div><div class="menu-list"><div class="menu-section-label">Workspace</div><a class="menu-action menu-featured" href="../menu-bar/dashboard.html" aria-label="Open your dashboard, recent activity, and notifications"><span class="menu-feature-icon"><i class="fas fa-chart-line"></i></span><span class="menu-feature-copy"><span class="menu-feature-title">Dashboard &amp; updates</span><span class="menu-feature-subtitle">Activity, recent tools, and notifications</span></span><span class="menu-feature-meta"><span class="menu-feature-count" id="dashboardCount">${getHistoryTools().length}</span><i class="fas fa-arrow-up-right-from-square"></i></span></a><a class="menu-action" href="../guides/"><i class="fas fa-book-open"></i><span>User Guides &amp; Tips</span><span class="menu-action-note">33 guides</span></a><a class="menu-action" href="../menu-bar/favorites.html"><i class="fas fa-star"></i><span>Favorites</span><span class="menu-action-note">Local</span></a><a class="menu-action" href="../menu-bar/history.html"><i class="fas fa-clock-rotate-left"></i><span>History</span><span class="menu-action-note">Local</span></a><div class="menu-section-label">About PDFHub</div><a class="menu-action" href="../menu-bar/privacy.html"><i class="fas fa-shield-halved"></i><span>Privacy Center</span></a><a class="menu-action" href="../menu-bar/terms.html"><i class="fas fa-file-contract"></i><span>Terms and conditions</span></a><a class="menu-action" href="../menu-bar/about.html"><i class="fas fa-circle-info"></i><span>About us</span></a></div><p class="menu-note">Your files stay on this device. Search, convert, and download without uploading.</p>`;
  menu.querySelector('.menu-theme-row')?.remove();
  const homeLink=document.createElement('a');homeLink.className='menu-action';homeLink.href='../index.html';homeLink.innerHTML='<i class="fas fa-house"></i><span>Home</span>';menu.querySelector('.menu-list').prepend(homeLink);
  container.append(toggle,menu);
  const globalTheme=document.createElement('button');globalTheme.className='global-theme-toggle';globalTheme.id='globalThemeToggle';globalTheme.type='button';globalTheme.title='Toggle light/dark mode';globalTheme.innerHTML='<span class="t-label" id="themeLabel">Dark</span><span class="toggle-track"><span class="toggle-knob" id="themeKnob"><i class="fas fa-moon"></i></span></span>';globalTheme.onclick=toggleTheme;container.insertBefore(globalTheme,toggle);
  if(document.body.classList.contains('light')){globalTheme.querySelector('.t-label').textContent='Light';globalTheme.querySelector('.toggle-knob').innerHTML='<i class="fas fa-sun"></i>';}
  menu.querySelector('.menu-action[href$="history.html"]')?.setAttribute('aria-label',`Open tool history (${getHistoryTools().length} items)`);
  menu.querySelector('#menuSearch').addEventListener('submit',event=>{event.preventDefault();location.href='../index.html?search='+encodeURIComponent(menu.querySelector('#menuSearchInput').value);});
  const close=()=>{menu.classList.remove('open');menu.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');toggle.title='Open menu';toggle.innerHTML='<i class="fas fa-bars"></i>';};
  toggle.setAttribute('aria-label','Open menu');menu.setAttribute('aria-hidden','true');
  toggle.addEventListener('click',event=>{event.stopPropagation();if(menu.classList.contains('open'))close();else{menu.classList.add('open');menu.setAttribute('aria-hidden','false');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close menu');toggle.title='Close menu';toggle.innerHTML='<i class="fas fa-xmark"></i>';menu.querySelector('#menuSearchInput').focus();}});
  menu.querySelectorAll('[data-menu-action]').forEach(action=>action.addEventListener('click',()=>{
    if(action.dataset.menuAction==='dashboard')menu.querySelector('.menu-note').textContent=`${getHistoryTools().length} tool${getHistoryTools().length===1?'':'s'} in your local dashboard.`;
  }));
  document.addEventListener('click',event=>{if(!event.target.closest('#siteMenu')&&!event.target.closest('#menuToggle'))close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.classList.contains('open')){close();toggle.focus();}});
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
  ensureHistoryToggle();
  attachHistoryToggle();
  ensureSiteMenu();
  if(!document.getElementById('pdfhubDeveloperScript')){const developer=document.createElement('script');developer.id='pdfhubDeveloperScript';developer.src='../developer.js';document.body.appendChild(developer);}
});
