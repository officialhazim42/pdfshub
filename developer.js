(function(){
  const scriptSource=document.currentScript?.src||'';
  const root=document.body.dataset.root||scriptSource.replace(/developer\.js(?:[?#].*)?$/,'');
  if(!document.getElementById('pdfhubDeveloperStyles')){
    const style=document.createElement('link');style.id='pdfhubDeveloperStyles';style.rel='stylesheet';style.href=root+'developer.css';document.head.appendChild(style);
  }
  const applyTheme=theme=>{
    const light=theme==='light';
    document.body.classList.toggle('light',light);
    document.querySelectorAll('#themeLabel,.global-theme-toggle .t-label').forEach(label=>label.textContent=light?'Light':'Dark');
    document.querySelectorAll('.toggle-knob').forEach(knob=>knob.innerHTML=`<i class="fas fa-${light?'sun':'moon'}"></i>`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',light?'#f4f4f8':'#07070d');
  };
  applyTheme(localStorage.getItem('pdfhub-theme')||'dark');
  const enhanceMenu=()=>{
    const menu=document.getElementById('siteMenu');
    if(!menu)return;
    const dashboard=menu.querySelector('.menu-action[href*="dashboard.html"]');
    if(dashboard)dashboard.remove();
    if(!menu.querySelector('.menu-status')){
      menu.querySelector('.menu-search')?.insertAdjacentHTML('afterend','<div class="menu-status"><span><i class="fas fa-shield-halved"></i> Runs in your browser</span><span class="menu-status-dot">●</span><span>No account needed</span></div>');
    }
  };
  enhanceMenu();
  if(!window.__pdfhubThemeWrapped){
    window.toggleTheme=()=>{
      const next=document.body.classList.contains('light')?'dark':'light';
      localStorage.setItem('pdfhub-theme',next);
      applyTheme(next);
    };
    window.__pdfhubThemeWrapped=true;
    window.addEventListener('storage',event=>{if(event.key==='pdfhub-theme')applyTheme(event.newValue||'dark');});
  }
  const siteRoot=document.body.dataset.root||root;
  const enhanceFooter=()=>{
    const footer=document.querySelector('footer');
    if(!footer||footer.querySelector('.footer-grid')||footer.querySelector('.pdfhub-footer-links'))return;
    const links=[
      ['Tools',siteRoot+'index.html'],
      ['Guides',siteRoot+'guides/'],
      ['History',siteRoot+'menu-bar/history.html'],
      ['About PDFHub',siteRoot+'menu-bar/about.html'],
      ['Terms',siteRoot+'menu-bar/terms.html'],
      ['Privacy',siteRoot+'menu-bar/privacy.html'],
      ['Contact',`mailto:hazimbashirfaqeer@gmail.com?subject=${encodeURIComponent('PDFHub Inquiry')}`]
    ];
    const nav=document.createElement('nav');
    nav.className='pdfhub-footer-links';
    nav.setAttribute('aria-label','Footer navigation');
    nav.innerHTML=links.map(([label,href])=>`<a href="${href}">${label}</a>`).join('');
    const status=document.createElement('div');
    status.className='pdfhub-footer-status';
    status.innerHTML='<span><i class="fas fa-shield-halved" aria-hidden="true"></i> Browser-first and privacy-conscious</span><span><i class="fas fa-circle-check" aria-hidden="true"></i> No account required</span>';
    footer.append(nav,status);
  };
  enhanceFooter();
  document.querySelectorAll('.site-menu').forEach(menu=>{
    menu.setAttribute('role','navigation');
    menu.setAttribute('aria-label','PDFHub navigation');
    const toggle=document.querySelector(`[aria-controls="${menu.id}"]`);
    if(!toggle||menu.dataset.accessibilityReady)return;
    menu.dataset.accessibilityReady='true';
    let opener=null;
    toggle.addEventListener('click',()=>{if(menu.classList.contains('open'))opener=document.activeElement;});
    menu.addEventListener('keydown',event=>{
      if(event.key!=='Tab')return;
      const focusable=[...menu.querySelectorAll('a[href],button:not([disabled]),input:not([disabled])')].filter(element=>element.offsetParent!==null);
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    });
    menu.addEventListener('focusout',()=>{
      if(!menu.classList.contains('open')&&opener?.focus)opener.focus();
    });
  });
  const existingScrollTop=document.getElementById('scrollTop')||document.getElementById('pdfhubScrollTop');
  if(!existingScrollTop){
    const scrollTop=document.createElement('button');
    scrollTop.id='pdfhubScrollTop';document.body.appendChild(scrollTop);scrollTop.className='pdfhub-scroll-top';scrollTop.type='button';scrollTop.title='Back to top';scrollTop.setAttribute('aria-label','Back to top');scrollTop.innerHTML='<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    const updateScrollTop=()=>scrollTop.classList.toggle('show',window.scrollY>320);
    window.addEventListener('scroll',updateScrollTop,{passive:true});
    scrollTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    updateScrollTop();
  }else if(!existingScrollTop.classList.contains('pdfhub-scroll-top')){
    existingScrollTop.classList.add('pdfhub-scroll-top');
  }
  if(document.getElementById('pdfhubDeveloper'))return;
  const profile={name:'Hazim Bashir',urdu:'حازم بشیر',handle:'@officialhazim42',role:'Android Developer & Software Creator',location:'Ganderbal, Jammu & Kashmir, India',email:'hazimbashirfaqeer@gmail.com',bio:"Hi, I'm Hazim Bashir (حازم بشیر), an independent software developer from Ganderbal, Jammu & Kashmir, India. I specialize in designing modern, high-performance, and privacy-first Android applications using Kotlin and Jetpack Compose. My mission is to craft clean, offline-first mobile experiences that respect user data privacy without compromise."};
  const socials=[
    ['Instagram','@officialhazim42','https://instagram.com/officialhazim42','fa-instagram'],
    ['GitHub','@officialhazim42','https://github.com/officialhazim42','fa-github'],
    ['Reddit','u/officialhazim42','https://www.reddit.com/user/officialhazim42','fa-reddit-alien'],
    ['Snapchat','@officialhazim42','https://www.snapchat.com/add/officialhazim42','fa-snapchat-ghost'],
    ['Discord','officialhazim42','https://discord.com/users/officialhazim42','fa-discord'],
    ['Threads','@officialhazim42','https://www.threads.net/@officialhazim42','fa-at'],
    ['LinkedIn','hazim-bashir-faqeer','https://www.linkedin.com/in/hazim-bashir-faqeer','fa-linkedin-in'],
    ['X','@officialhazim42','https://x.com/officialhazim42','fa-x-twitter'],
    ['Telegram','@officialhazim42','https://t.me/officialhazim42','fa-telegram'],
    ['YouTube','@officialhazim42','https://youtube.com/@officialhazim42','fa-youtube']
  ];
  const compact=socials.filter(item=>['Instagram','GitHub','YouTube'].includes(item[0]));
  const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const external=(url,label,classes='')=>`<a class="${classes}" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(label)} (opens in a new tab)">`;
  const widget=document.createElement('div');widget.id='pdfhubDeveloper';widget.className='pdfhub-developer';
  widget.innerHTML=`<div class="pdfhub-developer-panel" aria-label="Developer links"><button class="pdfhub-developer-about" type="button"><i class="fas fa-user-astronaut" aria-hidden="true"></i> About Developer</button>${compact.map(item=>external(item[2],item[0], 'pdfhub-developer-social')+`<i class="fab ${item[3]}" aria-hidden="true"></i></a>`).join('')}</div><button class="pdfhub-developer-trigger" type="button" aria-expanded="false" aria-controls="pdfhubDeveloperDialog" aria-label="Open developer panel"><i class="fas fa-user" aria-hidden="true"></i></button></div>`;
  const dialog=document.createElement('div');dialog.id='pdfhubDeveloperDialog';dialog.className='pdfhub-developer-dialog';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-hidden','true');dialog.setAttribute('aria-labelledby','pdfhubDeveloperTitle');
  dialog.innerHTML=`<div class="pdfhub-developer-card"><button class="pdfhub-developer-close" type="button" aria-label="Close developer profile"><i class="fas fa-xmark" aria-hidden="true"></i></button><div class="pdfhub-developer-content"><header class="pdfhub-developer-header"><div class="pdfhub-developer-avatar" aria-hidden="true"><i class="fas fa-code"></i></div><div><h2 class="pdfhub-developer-name" id="pdfhubDeveloperTitle">${profile.name}</h2><div class="pdfhub-developer-urdu" lang="ur" dir="rtl">${profile.urdu}</div><span class="pdfhub-developer-handle">${profile.handle}</span><div class="pdfhub-developer-role">${profile.role}</div><div class="pdfhub-developer-location"><i class="fas fa-location-dot" aria-hidden="true"></i><span>${profile.location}</span></div></div></header><section class="pdfhub-developer-section"><h3>About Me</h3><p class="pdfhub-developer-bio">${profile.bio}</p></section><section class="pdfhub-developer-section"><h3>Developer Information</h3><div class="pdfhub-developer-info"><div class="pdfhub-developer-info-item"><strong>Full Name</strong><span>${profile.name} (${profile.urdu})</span></div><div class="pdfhub-developer-info-item"><strong>Location</strong><span>${profile.location}</span></div><div class="pdfhub-developer-info-item"><strong>Specialization</strong><span>Android Development, Kotlin, and Jetpack Compose</span></div><div class="pdfhub-developer-info-item"><strong>Professional Role</strong><span>${profile.role}</span></div><div class="pdfhub-developer-info-item"><strong>Email</strong><a href="mailto:${profile.email}?subject=${encodeURIComponent('Developer Inquiry — PDFHub')}" data-developer-email>${profile.email}</a></div></div></section><section class="pdfhub-developer-section"><h3>Connect With Me</h3><div class="pdfhub-developer-social-grid">${socials.map(item=>external(item[2],`${item[0]} profile`, 'pdfhub-developer-social-card')+`<i class="fab ${item[3]}" aria-hidden="true"></i><span>${item[0]}<small>${item[1]}</small></span></a>`).join('')}</div></section><footer class="pdfhub-developer-footer">Crafted with care by Hazim Bashir (حازم بشیر) in Kashmir 🏔️<br>Instagram: @officialhazim42 · GitHub: @officialhazim42 · YouTube: @officialhazim42 · LinkedIn: hazim-bashir-faqeer</footer></div></div>`;
  document.body.append(widget,dialog);
  const trigger=widget.querySelector('.pdfhub-developer-trigger'),panel=widget.querySelector('.pdfhub-developer-panel'),about=widget.querySelector('.pdfhub-developer-about'),close=dialog.querySelector('.pdfhub-developer-close');
  let lastFocus=null;
  const toast=message=>{let node=document.querySelector('.pdfhub-developer-toast');if(!node){node=document.createElement('div');node.className='pdfhub-developer-toast';node.setAttribute('role','status');document.body.append(node)}node.textContent=message;node.classList.add('show');setTimeout(()=>node.classList.remove('show'),2600)};
  const setPanel=open=>{widget.classList.toggle('open',open);trigger.setAttribute('aria-expanded',String(open));trigger.setAttribute('aria-label',open?'Close developer panel':'Open developer panel');trigger.innerHTML=`<i class="fas ${open?'fa-xmark':'fa-user'}" aria-hidden="true"></i>`;};
  const setDialog=open=>{dialog.classList.toggle('open',open);dialog.setAttribute('aria-hidden',String(!open));widget.inert=open;document.getElementById('pdfhubScrollTop')?.toggleAttribute('inert',open);document.body.classList.toggle('pdfhub-modal-open',open);if(open){lastFocus=document.activeElement;setPanel(false);close.focus();}else{lastFocus?.focus();}};
  trigger.addEventListener('click',()=>setPanel(!widget.classList.contains('open')));
  about.addEventListener('click',()=>setDialog(true));
  close.addEventListener('click',()=>setDialog(false));dialog.addEventListener('click',event=>{if(event.target===dialog)setDialog(false)});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&dialog.classList.contains('open'))setDialog(false)});
  const copyText=async value=>{if(!navigator.clipboard?.writeText)return false;try{await navigator.clipboard.writeText(value);return true}catch{return false}};
  dialog.querySelector('[data-developer-email]').addEventListener('click',event=>{
    event.preventDefault();
    let leftPage=true;
    const onVisibility=()=>{leftPage=document.visibilityState!=='visible';};
    document.addEventListener('visibilitychange',onVisibility,{once:true});
    window.location.href=`mailto:${profile.email}?subject=${encodeURIComponent('Developer Inquiry — PDFHub')}`;
    setTimeout(async()=>{document.removeEventListener('visibilitychange',onVisibility);if(leftPage)return;if(await copyText(profile.email))toast('Email address copied to clipboard.');else toast('No email app or clipboard is available.');},1200);
  });
  const discord=dialog.querySelector('.pdfhub-developer-social-card[href*="discord.com"]');discord.addEventListener('click',async()=>{if(await copyText('officialhazim42'))toast('Discord username copied to clipboard.');else toast('Clipboard is unavailable; opening Discord profile.')});
  dialog.addEventListener('keydown',event=>{if(event.key!=='Tab')return;const focusable=[close,...dialog.querySelectorAll('a[href]')];const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
})();
