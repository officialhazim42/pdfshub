(function(){
  const root=document.body.dataset.root||'';
  const historyHref=url=>root+(url==='index.html'?'index.html':url.startsWith('tools/')?url:`tools/${url}`);
  const polishStyles=document.createElement('link');polishStyles.rel='stylesheet';polishStyles.href=root+'menu-bar/site-pages-polish.css';document.head.appendChild(polishStyles);
  document.querySelectorAll('.logo').forEach(logo=>{logo.innerHTML=`<img class="logo-mark" src="${root}favicons/favicon.png" alt="" aria-hidden="true"/>PDF HUB`;});
  const footerHtml=`<footer class="site-footer"><div class="f-logo">PDFHub</div><div class="f-by">Built with ❤️ · Free forever · No sign-up · Files never leave your device</div><div class="f-bottom"><span class="f-copy">©PDFHub</span><div class="f-dot"></div><span class="f-copy">by @officialhazim42</span><div class="f-dot"></div><span class="f-copy">All 33 tools free forever</span><div class="f-dot"></div><span class="f-copy">Your files never leave your device</span></div></footer>`;
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
  const notificationsLink=menu?.querySelector('.menu-action[href$="dashboard.html#notifications"]');
  if(dashboardLink){
    dashboardLink.classList.add('menu-featured');
    dashboardLink.setAttribute('aria-label','Open your dashboard, recent activity, and notifications');
    dashboardLink.innerHTML='<span class="menu-feature-icon"><i class="fas fa-chart-line"></i></span><span class="menu-feature-copy"><span class="menu-feature-title">Dashboard &amp; updates</span><span class="menu-feature-subtitle">Activity, recent tools, and notifications</span></span><span class="menu-feature-meta"><span class="menu-feature-count" id="dashboardCount">0</span><i class="fas fa-arrow-up-right-from-square"></i></span>';
  }
  notificationsLink?.remove();
  if(menu){const home=document.createElement('a');home.className='menu-action';home.href=root+'index.html';home.innerHTML='<i class="fas fa-house"></i><span>Home</span>';menu.querySelector('.menu-list')?.prepend(home);}
  const globalTheme=document.createElement('button');globalTheme.className='global-theme-toggle';globalTheme.type='button';globalTheme.title='Toggle light/dark mode';globalTheme.innerHTML='<span class="t-label" id="themeLabel">Dark</span><span class="toggle-track"><span class="toggle-knob" id="themeKnob"><i class="fas fa-moon"></i></span></span>';globalTheme.onclick=()=>window.toggleTheme();toggle.parentElement.insertBefore(globalTheme,toggle);
  const close=()=>{menu?.classList.remove('open');menu?.setAttribute('aria-hidden','true');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open menu');if(toggle){toggle.title='Open menu';toggle.innerHTML='<i class="fas fa-bars"></i>';}};
  toggle?.addEventListener('click',event=>{event.stopPropagation();const open=!menu.classList.contains('open');menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');toggle.title=open?'Close menu':'Open menu';toggle.innerHTML=open?'<i class="fas fa-xmark"></i>':'<i class="fas fa-bars"></i>';if(open)menu.querySelector('#menuSearchInput')?.focus();});
  document.addEventListener('click',event=>{if(!event.target.closest('#siteMenu')&&!event.target.closest('#menuToggle'))close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.classList.contains('open')){close();toggle?.focus();}});
  document.getElementById('menuSearch')?.addEventListener('submit',event=>{event.preventDefault();location.href=root+'index.html?search='+encodeURIComponent(document.getElementById('menuSearchInput').value);});
  window.toggleTheme=function(){const light=document.body.classList.toggle('light');localStorage.setItem('pdfhub-theme',light?'light':'dark');const label=document.getElementById('themeLabel'),knob=document.getElementById('themeKnob');if(label)label.textContent=light?'Light':'Dark';if(knob)knob.innerHTML=light?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>';};
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
})();
