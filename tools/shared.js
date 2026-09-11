/* PDFHub Shared JS — Theme Toggle + Download Modal */

// Give each tool page its own uploaded favicon.
(function(){
  const icons={
    'compare.html':'faviconcomparepdf.png',
    'compress.html':'favicocompresspdf.png',
    'crop.html':'faviconcroppdf.png',
    'edit.html':'faviconeditpdf.png',
    'excel-to-pdf.html':'faviconexceltopdfpng.png',
    'extract-pages.html':'faviconextractpages.png',
    'forms.html':'faviconpdfforms.png',
    'html-to-pdf.html':'faviconhtmltopdf.png',
    'jpg-to-pdf.html':'faviconjpgtopdf.png',
    'merge.html':'faviconmerge.png',
    'ocr.html':'faviconocrpdf.png',
    'organize.html':'faviconorganizepdf.png',
    'page-numbers.html':'faviconaddpagenumbers.png',
    'pdf-to-excel.html':'faviconpdftoexcel.png',
    'pdf-to-jpg.html':'faviconpdftojpg.png',
    'pdf-to-pdfa.html':'faviconpdftopdfa.png',
    'pdf-to-ppt.html':'faviconpdftopowerpoint.png',
    'pdf-to-word.html':'favicon.png',
    'ppt-to-pdf.html':'faviconpowerpointtopdf.png',
    'protect.html':'faviconprotectpdf.png',
    'redact.html':'faviconredactpdf.png',
    'remove-pages.html':'faviconremovepages.png',
    'repair.html':'faviconrepairpdf.png',
    'rotate.html':'faviconrotatepdf.png',
    'scan-to-pdf.html':'faviconscantopdfpng.png',
    'sign.html':'faviconsignpdf.png',
    'split.html':'faviconsplitpng.png',
    'summarize.html':'faviconaisummarizer.png',
    'translate.html':'favicontranslatepdf.png',
    'unlock.html':'faviconunlockpdf.png',
    'watermark.html':'faviconaddwatermark.png',
    'word-to-pdf.html':'faviconwordtopdf.png'
  };
  const filename=location.pathname.split('/').pop();
  const iconName=icons[filename]||'favicon.png';
  document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]').forEach(link=>link.remove());
  const icon=document.createElement('link');icon.rel='icon';icon.href='../'+iconName;icon.type='image/png';document.head.appendChild(icon);
  const touch=document.createElement('link');touch.rel='apple-touch-icon';touch.href='../'+iconName;document.head.appendChild(touch);
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
    const url=URL.createObjectURL(blob);
    const previewWindow=window.open('', '_blank', 'noopener,noreferrer,width=1200,height=760');
    if(previewWindow){
      const type=(blob.type||'').toLowerCase();
      const isPdf=type.includes('pdf') || filename.toLowerCase().endsWith('.pdf');
      const isImage=type.startsWith('image/');
      const title=escapeHtml(filename);
      const bodyHtml = isPdf ? `<iframe src="${url}" title="${title}" style="width:100%;height:100%;border:0;background:#fff;"></iframe>` : isImage ? `<img src="${url}" alt="${title}" style="max-width:100%;max-height:100vh;display:block;margin:0 auto;box-shadow:0 12px 28px rgba(0,0,0,.18);border-radius:12px;">` : `<div style="font-family:Arial,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;background:#10141d;color:#fff;gap:16px;padding:40px;text-align:center"><div style="font-size:48px">📄</div><h2 style="margin:0">${title}</h2><p style="margin:0;color:#b9c2d3;max-width:540px">This file has been generated and is ready for preview. Use the download button below to save it.</p><a href="${url}" download="${filename}" style="display:inline-block;padding:12px 18px;border-radius:10px;background:#7c6aff;color:#fff;text-decoration:none;font-weight:700">Download file</a></div>`;
      previewWindow.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title><style>html,body{margin:0;height:100%;background:#0d1117;color:#fff} a{color:#fff} body{display:flex;align-items:center;justify-content:center} iframe{width:100vw;height:100vh;border:0}</style></head><body>${bodyHtml}</body></html>`);
      previewWindow.document.close();
    }
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
});
