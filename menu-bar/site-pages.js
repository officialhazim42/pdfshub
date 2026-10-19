(function(){
  const root=document.body.dataset.root||'';
  const historyHref=url=>root+(url==='index.html'?'index.html':url.startsWith('tools/')?url:`tools/${url}`);
  const polishStyles=document.createElement('link');polishStyles.rel='stylesheet';polishStyles.href=root+'menu-bar/site-pages-polish.css';document.head.appendChild(polishStyles);
  document.querySelectorAll('.logo').forEach(logo=>{logo.innerHTML=`<img class="logo-mark" src="${root}favicons/favicon.png" alt="" aria-hidden="true"/>PDF HUB`;});
  const footerHtml=`<footer class="site-footer" role="contentinfo">
  <div class="footer-shell">
    <div class="footer-grid">
      <!-- 1. Brand Section -->
      <div class="footer-col footer-brand">
        <a class="footer-logo f-logo" href="${root}index.html">
          <img class="logo-mark" src="${root}favicons/favicon.png" alt="" aria-hidden="true"/>
          <span>PDF HUB</span>
        </a>
        <p class="footer-desc">
          A focused, browser-first PDF suite with 33 tools for fast document work. Standard tools process files locally in your browser without requiring an account or server uploads.
        </p>
        <div class="footer-badges">
          <span class="footer-badge"><i class="fas fa-laptop-code" aria-hidden="true"></i> Client-Side Processing</span>
          <span class="footer-badge"><i class="fas fa-user-slash" aria-hidden="true"></i> No Account Required</span>
        </div>
      </div>

      <!-- 2. PDF Tools -->
      <div class="footer-col">
        <h3 class="footer-title">PDF Tools</h3>
        <ul class="footer-links pdfhub-footer-links">
          <li><a href="${root}tools/merge.html">Merge PDF</a></li>
          <li><a href="${root}tools/split.html">Split PDF</a></li>
          <li><a href="${root}tools/compress.html">Compress PDF</a></li>
          <li><a href="${root}tools/edit.html">Edit PDF</a></li>
          <li><a href="${root}tools/sign.html">Sign PDF</a></li>
          <li><a href="${root}tools/pdf-to-word.html">PDF to Word</a></li>
          <li><a href="${root}tools/protect.html">Protect PDF</a></li>
          <li><a class="footer-more-link" href="${root}index.html">All 33 Tools <span aria-hidden="true">→</span></a></li>
        </ul>
      </div>

      <!-- 3. Resources -->
      <div class="footer-col">
        <h3 class="footer-title">Resources</h3>
        <ul class="footer-links">
          <li><a href="${root}guides/">User Guides &amp; Tips</a></li>
          <li><a href="${root}install/">Install PDFHub App</a></li>
          <li><a href="${root}guides/merge-pdf/">Merge PDF Guide</a></li>
          <li><a href="${root}guides/compress-pdf/">Compress PDF Guide</a></li>
          <li><a href="${root}guides/edit-pdf/">Edit PDF Guide</a></li>
          <li><a href="${root}menu-bar/favorites.html">Favorite Tools</a></li>
          <li><a href="${root}menu-bar/history.html">Tool History</a></li>
        </ul>
      </div>

      <!-- 4. Privacy & Legal -->
      <div class="footer-col">
        <h3 class="footer-title">Privacy &amp; Legal</h3>
        <ul class="footer-links">
          <li><a href="${root}menu-bar/privacy.html">Privacy Center</a></li>
          <li><a href="${root}menu-bar/terms.html">Terms &amp; Conditions</a></li>
          <li><a href="${root}menu-bar/about.html">About PDFHub</a></li>
          <li><a href="mailto:hazimbashirfaqeer@gmail.com?subject=PDFHub%20Inquiry">Contact Support</a></li>
        </ul>
        <div class="footer-security-note">
          <i class="fas fa-shield-halved" aria-hidden="true"></i>
          <span>Local browser processing for standard operations. Zero tracking cookies.</span>
        </div>
      </div>
    </div>

    <!-- 5. Footer Bottom Row -->
    <div class="footer-bottom">
      <div class="footer-bottom-copy">
        <span>© 2026 PDFHub. Crafted by <a href="https://github.com/officialhazim42" target="_blank" rel="noopener noreferrer">@officialhazim42</a></span>
      </div>
      <div class="footer-bottom-meta">
        <span>33 Free Utilities</span>
        <span class="f-dot" aria-hidden="true"></span>
        <span>Browser-First Processing</span>
        <span class="f-dot" aria-hidden="true"></span>
        <span>Private by Design</span>
      </div>
    </div>
  </div>
</footer>`;
  document.querySelector('.page-main')?.insertAdjacentHTML('afterend',footerHtml);
  document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]').forEach(link=>link.remove());
  const favicon=document.createElement('link');favicon.rel='icon';favicon.href=root+'favicons/favicon.png';favicon.type='image/png';document.head.appendChild(favicon);
  const touchIcon=document.createElement('link');touchIcon.rel='apple-touch-icon';touchIcon.href=root+'favicons/favicon.png';document.head.appendChild(touchIcon);
  const getHistory=()=>{try{return JSON.parse(localStorage.getItem('pdfhub-history-tools')||'[]')}catch{return []}};
  const saveHistory=(name,url)=>{const items=getHistory().filter(item=>item.url!==url);items.unshift({name,url});localStorage.setItem('pdfhub-history-tools',JSON.stringify(items.slice(0,12)));};
  const theme=localStorage.getItem('pdfhub-theme')||'dark';
  if(theme==='light')document.body.classList.add('light');
  const menu=document.getElementById('siteMenu');
  const toggle=document.getElementById('menuToggle');
  menu?.setAttribute('aria-hidden','true');
  toggle?.setAttribute('aria-controls','siteMenu');
  toggle?.setAttribute('aria-label','Open menu');
  menu?.querySelector('.menu-theme-row')?.remove();
  const dashboardLink=menu?.querySelector('.menu-action[href$="dashboard.html"]');
  dashboardLink?.remove();
  const notificationsLink=menu?.querySelector('.menu-action[href$="dashboard.html#notifications"]');
  notificationsLink?.remove();
  if(menu&&!menu.querySelector('.menu-status')){
    menu.querySelector('.menu-search')?.insertAdjacentHTML('afterend','<div class="menu-status"><span><i class="fas fa-shield-halved"></i> Runs in your browser</span><span class="menu-status-dot">●</span><span>No account needed</span></div>');
  }
  const termsLink=menu?.querySelector('.menu-action[href$="terms.html"]');
  if(termsLink&&!menu.querySelector('.menu-section-label[data-section="about"]')){
    termsLink.insertAdjacentHTML('beforebegin','<div class="menu-section-label" data-section="about">Privacy &amp; About</div>');
  }
  if(menu&&!menu.querySelector('.menu-action[href$="index.html"]')){const home=document.createElement('a');home.className='menu-action';home.href=root+'index.html';home.innerHTML='<i class="fas fa-house"></i><span>Home</span>';menu.querySelector('.menu-list')?.prepend(home);}
  if(menu&&!menu.querySelector('.menu-section-label:not([data-section])')){menu.querySelector('.menu-list')?.insertAdjacentHTML('afterbegin','<div class="menu-section-label">Tools &amp; Guides</div>');}
  if(menu&&!menu.querySelector('.menu-action[href$="guides/"]')){const guides=document.createElement('a');guides.className='menu-action';guides.href=root+'guides/';guides.innerHTML='<i class="fas fa-book-open"></i><span>User Guides &amp; Tips</span><span class="menu-action-note">33 guides</span>';menu.querySelector('.menu-list')?.insertBefore(guides,menu.querySelector('.menu-action[href$="history.html"]'));}
  if(menu&&!menu.querySelector('.menu-action[href$="docs/"]')){const docs=document.createElement('a');docs.className='menu-action';docs.href=root+'docs/';docs.innerHTML='<i class="fas fa-book-bookmark"></i><span>Documentation</span><span class="menu-action-note">Docs Hub</span>';menu.querySelector('.menu-list')?.insertBefore(docs,menu.querySelector('.menu-action[href$="history.html"]'));}
  if(menu&&!menu.querySelector('.menu-action[href$="favorites.html"]')){const favorites=document.createElement('a');favorites.className='menu-action';favorites.href=root+'menu-bar/favorites.html';favorites.innerHTML='<i class="fas fa-star"></i><span>Favorites</span><span class="menu-action-note">Local</span>';menu.querySelector('.menu-list')?.insertBefore(favorites,menu.querySelector('.menu-action[href$="history.html"]'));}
  if(menu&&!menu.querySelector('.menu-action[href$="install/"]')){const install=document.createElement('a');install.className='menu-action';install.href=root+'install/';install.innerHTML='<i class="fas fa-download"></i><span>Install App</span><span class="menu-action-note">PWA</span>';menu.querySelector('.menu-list')?.insertBefore(install,menu.querySelector('.menu-section-label[data-section="about"]'));}
  if(menu&&!menu.querySelector('.menu-action[href$="privacy.html"]')){const privacy=document.createElement('a');privacy.className='menu-action';privacy.href=root+'menu-bar/privacy.html';privacy.innerHTML='<i class="fas fa-shield-halved"></i><span>Privacy Center</span>';menu.querySelector('.menu-list')?.append(privacy);}
  if(menu&&!menu.querySelector('a[href^="mailto:"]')){const contact=document.createElement('a');contact.className='menu-action';contact.href='mailto:hazimbashirfaqeer@gmail.com?subject=PDFHub%20Inquiry';contact.innerHTML='<i class="fas fa-envelope"></i><span>Contact Support</span>';menu.querySelector('.menu-list')?.append(contact);}
  if(menu&&!menu.querySelector('.menu-header')){
    const heading=menu.querySelector('.menu-heading');
    const search=menu.querySelector('.menu-search');
    const status=menu.querySelector('.menu-status');
    const list=menu.querySelector('.menu-list');
    const note=menu.querySelector('.menu-note');
    const header=document.createElement('div');header.className='menu-header';
    if(heading){
      const actions=document.createElement('div');actions.className='menu-heading-actions';
      const small=heading.querySelector('small');if(small)actions.appendChild(small);
      const closeBtn=document.createElement('button');closeBtn.className='menu-close-btn';closeBtn.id='menuCloseBtn';closeBtn.type='button';closeBtn.title='Close menu';closeBtn.setAttribute('aria-label','Close menu');closeBtn.innerHTML='<i class="fas fa-xmark"></i>';
      actions.appendChild(closeBtn);heading.appendChild(actions);header.appendChild(heading);
    }
    if(search)header.appendChild(search);
    if(status)header.appendChild(status);
    const body=document.createElement('div');body.className='menu-body';body.id='menuBody';
    if(list)body.appendChild(list);
    if(note)body.appendChild(note);
    menu.innerHTML='';
    menu.append(header,body);
  }
  const globalTheme=document.createElement('button');globalTheme.className='global-theme-toggle';globalTheme.type='button';globalTheme.title='Toggle light/dark mode';globalTheme.innerHTML='<span class="t-label" id="themeLabel">Dark</span><span class="toggle-track"><span class="toggle-knob" id="themeKnob"><i class="fas fa-moon"></i></span></span>';globalTheme.onclick=()=>window.toggleTheme();toggle?.parentElement.insertBefore(globalTheme,toggle);
  const close=()=>{menu?.classList.remove('open');menu?.setAttribute('aria-hidden','true');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open menu');if(toggle){toggle.title='Open menu';toggle.innerHTML='<i class="fas fa-bars"></i>';toggle.focus();}};
  toggle?.addEventListener('click',event=>{event.stopPropagation();const open=!menu.classList.contains('open');menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');toggle.title=open?'Close menu':'Open menu';toggle.innerHTML=open?'<i class="fas fa-xmark"></i>':'<i class="fas fa-bars"></i>';if(open)menu.querySelector('#menuSearchInput')?.focus();});
  menu?.querySelector('#menuCloseBtn')?.addEventListener('click',event=>{event.stopPropagation();close();});
  document.addEventListener('click',event=>{if(!event.target.closest('#siteMenu')&&!event.target.closest('#menuToggle'))close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.classList.contains('open')){close();}});
  document.getElementById('menuSearch')?.addEventListener('submit',event=>{event.preventDefault();location.href=root+'index.html?search='+encodeURIComponent(document.getElementById('menuSearchInput').value);});
  window.toggleTheme=function(){const light=document.body.classList.toggle('light');localStorage.setItem('pdfhub-theme',light?'light':'dark');document.querySelectorAll('.t-label').forEach(label=>label.textContent=light?'Light':'Dark');document.querySelectorAll('.toggle-knob').forEach(knob=>knob.innerHTML=light?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>');document.querySelector('meta[name="theme-color"]')?.setAttribute('content',light?'#f2f2f8':'#07070d');};
  window.addEventListener('storage',event=>{if(event.key!=='pdfhub-theme')return;const light=event.newValue==='light';document.body.classList.toggle('light',light);document.querySelectorAll('.t-label').forEach(label=>label.textContent=light?'Light':'Dark');document.querySelectorAll('.toggle-knob').forEach(knob=>knob.innerHTML=light?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>');});
  const light=document.body.classList.contains('light');document.getElementById('themeLabel').textContent=light?'Light':'Dark';document.getElementById('themeKnob').innerHTML=light?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>';
  const count=document.getElementById('dashboardCount');if(count)count.textContent=getHistory().length;
  const page=document.body.dataset.page;
  const pageMain=document.querySelector('.page-main');
  if(page==='history'){
    const list=document.getElementById('historyList'),items=getHistory();
    list.innerHTML=items.length?items.map(item=>`<a class="activity-item" href="${historyHref(item.url)}"><i class="fas fa-arrow-up-right-from-square"></i><span>${item.name}</span><small>Recent tool</small></a>`).join(''):'<div class="notice"><i class="fas fa-clock"></i><span>No tool activity yet. Open a PDF tool and it will appear here.</span></div>';
  }
  if(page==='dashboard'){
    const items=getHistory();document.getElementById('toolCount').textContent=items.length;document.getElementById('notificationCountLarge').textContent=localStorage.getItem('pdfhub-notifications-seen')==='true'?'0':'2';
    document.getElementById('dashboardActivity').innerHTML=items.length?items.slice(0,6).map(item=>`<a class="activity-item" href="${historyHref(item.url)}"><i class="fas fa-file-pdf"></i><span>${item.name}</span><small>Available offline</small></a>`).join(''):'<div class="notice"><i class="fas fa-sparkles"></i><span>Your dashboard will populate as you explore PDFHub tools.</span></div>';
    document.getElementById('notificationMessage').textContent=items.length?`Your local workspace has ${items.length} recent tool${items.length===1?'':'s'} ready to revisit.`:'Welcome to PDFHub. Your first tool activity will appear here.';
  }
  if(!document.getElementById('pdfhubDeveloperScript')){const developer=document.createElement('script');developer.id='pdfhubDeveloperScript';developer.src=root+'developer.js';document.body.appendChild(developer);}
})();
