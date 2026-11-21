(function(){
  const scriptSource=document.currentScript?.src||'';
  const root=document.body.dataset.root||scriptSource.replace(/developer\.js(?:[?#].*)?$/,'');
  if(!document.getElementById('pdfhubDeveloperStyles')){
    const style=document.createElement('link');style.id='pdfhubDeveloperStyles';style.rel='stylesheet';style.href=root+'developer.css';document.head.appendChild(style);
  }
  const applyTheme=theme=>{
    const light=theme==='light';
    document.documentElement.classList.toggle('light',light);
    if(document.body)document.body.classList.toggle('light',light);
    document.querySelectorAll('#themeLabel,.global-theme-toggle .t-label,.theme-toggle .t-label,.t-label').forEach(label=>label.textContent=light?'Light':'Dark');
    document.querySelectorAll('.toggle-knob').forEach(knob=>knob.innerHTML=`<i class="fas fa-${light?'sun':'moon'}"></i>`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',light?'#f4f4f8':'#07070d');
  };
  applyTheme(localStorage.getItem('pdfhub-theme')||'dark');
  if(!document.body){
    document.addEventListener('DOMContentLoaded',()=>applyTheme(localStorage.getItem('pdfhub-theme')||'dark'),{once:true});
  }
  const siteRoot=document.body.dataset.root||root;

  // PWA Manifest and Meta Tags
  const ensurePwaMeta=()=>{
    const head=document.head;if(!head)return;
    if(!head.querySelector('link[rel="manifest"]')){
      const manifest=document.createElement('link');manifest.rel='manifest';manifest.href=siteRoot+'manifest.webmanifest';head.appendChild(manifest);
    }
    if(!head.querySelector('link[rel="apple-touch-icon"]')){
      const appleTouch=document.createElement('link');appleTouch.rel='apple-touch-icon';appleTouch.href=siteRoot+'favicons/apple-touch-icon.png';head.appendChild(appleTouch);
    }
    const metaList=[
      ['mobile-web-app-capable','yes'],
      ['apple-mobile-web-app-capable','yes'],
      ['apple-mobile-web-app-status-bar-style','black-translucent'],
      ['apple-mobile-web-app-title','PDFHub'],
      ['application-name','PDFHub']
    ];
    for(const [name,content] of metaList){
      if(!head.querySelector(`meta[name="${name}"]`)){
        const meta=document.createElement('meta');meta.name=name;meta.content=content;head.appendChild(meta);
      }
    }
  };
  ensurePwaMeta();

  // PWA Install State & Detection
  let deferredPrompt=null;
  const isStandalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;

  const updateInstallMenuAction=()=>{
    const menu=document.getElementById('siteMenu');
    if(!menu)return;
    const existing=menu.querySelector('.menu-action-install-wrap');
    if(existing)existing.remove();

    const wrap=document.createElement('div');
    wrap.className='menu-action-install-wrap';

    if(isStandalone()){
      wrap.innerHTML=`<a class="menu-action" href="${siteRoot}install/"><i class="fas fa-circle-check" aria-hidden="true" style="color:var(--a3);"></i><span>App Installed</span><span class="menu-action-note">PWA</span></a>`;
    }else if(deferredPrompt){
      const btn=document.createElement('button');
      btn.type='button';btn.className='menu-action';
      btn.innerHTML=`<i class="fas fa-download" aria-hidden="true" style="color:var(--accent);"></i><span>Install App</span><span class="menu-badge">Free</span>`;
      btn.addEventListener('click',async e=>{
        e.preventDefault();
        if(!deferredPrompt)return;
        deferredPrompt.prompt();
        const choice=await deferredPrompt.userChoice;
        if(choice&&choice.outcome==='accepted'){
          deferredPrompt=null;
          window.__pdfhubInstallPrompt=null;
        }
        updateInstallMenuAction();
      });
      wrap.appendChild(btn);
    }else{
      wrap.innerHTML=`<a class="menu-action" href="${siteRoot}install/"><i class="fas fa-download" aria-hidden="true" style="color:var(--accent);"></i><span>Install PDFHub</span><span class="menu-action-note">Guide</span></a>`;
    }

    const historyLink=menu.querySelector('.menu-action[href*="history.html"]');
    if(historyLink&&historyLink.parentNode){
      historyLink.parentNode.insertBefore(wrap,historyLink.nextSibling);
    }else{
      const list=menu.querySelector('.menu-list');
      if(list)list.appendChild(wrap);
    }
  };

  window.addEventListener('beforeinstallprompt',event=>{
    event.preventDefault();
    deferredPrompt=event;
    window.__pdfhubInstallPrompt=event;
    window.dispatchEvent(new CustomEvent('pdfhub-install-available'));
    updateInstallMenuAction();
  });

  window.addEventListener('appinstalled',()=>{
    deferredPrompt=null;
    window.__pdfhubInstallPrompt=null;
    window.dispatchEvent(new CustomEvent('pdfhub-app-installed'));
    updateInstallMenuAction();
  });

  // Service Worker Registration
  const registerSW=()=>{
    if('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost' || location.hostname==='127.0.0.1')){
      navigator.serviceWorker.register(siteRoot+'sw.js',{scope:siteRoot})
        .then(reg=>{
          reg.addEventListener('updatefound',()=>{
            const newWorker=reg.installing;
            if(newWorker){
              newWorker.addEventListener('statechange',()=>{
                if(newWorker.state==='installed' && navigator.serviceWorker.controller){
                  window.dispatchEvent(new CustomEvent('pdfhub-update-available',{detail:{registration:reg}}));
                }
              });
            }
          });
        })
        .catch(err=>console.warn('[PDFHub PWA] Service worker registration failed:',err));
    }
  };
  if(document.readyState==='complete')registerSW();else window.addEventListener('load',registerSW);

  const enhanceMenu=()=>{
    const menu=document.getElementById('siteMenu');
    if(!menu)return;
    const dashboard=menu.querySelector('.menu-action[href*="dashboard.html"]');
    if(dashboard)dashboard.remove();
    menu.querySelector('.menu-search')?.remove();
    if(!menu.querySelector('.menu-status')){
      const target=menu.querySelector('.menu-heading') || menu.querySelector('.menu-header');
      target?.insertAdjacentHTML('afterend','<div class="menu-status"><span><i class="fas fa-shield-halved"></i> Runs in your browser</span><span class="menu-status-dot">●</span><span>No account needed</span></div>');
    }
    updateInstallMenuAction();
  };
  enhanceMenu();

  let isThemeTransitioning = false;

  const getThemeToggleOrigin = event => {
    if (event && typeof event.clientX === 'number' && event.clientX > 0 && event.clientY > 0) {
      const target = event.target && event.target.closest ? event.target.closest('#globalThemeToggle, .global-theme-toggle, .theme-toggle') : null;
      if (target) {
        const rect = target.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
    }
    const toggleBtn = document.getElementById('globalThemeToggle') ||
                      document.querySelector('.global-theme-toggle') ||
                      document.querySelector('.theme-toggle');
    if (toggleBtn) {
      const rect = toggleBtn.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return { x: window.innerWidth - 44, y: 36 };
  };

  const executeCircularThemeToggle = event => {
    if (window.__isThemeTransitioning || isThemeTransitioning || document.documentElement.classList.contains('theme-transitioning')) return;
    const current = localStorage.getItem('pdfhub-theme') || (document.documentElement.classList.contains('light') || document.body?.classList.contains('light') ? 'light' : 'dark');
    const next = current === 'light' ? 'dark' : 'light';
    const isNextLight = next === 'light';

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      localStorage.setItem('pdfhub-theme', next);
      applyTheme(next);
      return;
    }

    const { x, y } = getThemeToggleOrigin(event);
    const endRadius = Math.ceil(Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )) + 4;

    if (typeof document.startViewTransition === 'function') {
      window.__isThemeTransitioning = true;
      isThemeTransitioning = true;
      document.documentElement.classList.add('theme-transitioning');
      let transition;
      try {
        transition = document.startViewTransition(() => {
          localStorage.setItem('pdfhub-theme', next);
          applyTheme(next);
        });
      } catch (err) {
        window.__isThemeTransitioning = false;
        isThemeTransitioning = false;
        document.documentElement.classList.remove('theme-transitioning');
        localStorage.setItem('pdfhub-theme', next);
        applyTheme(next);
        return;
      }

      transition.ready.then(() => {
        const animation = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 720,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
        const cleanup = () => {
          window.__isThemeTransitioning = false;
          isThemeTransitioning = false;
          document.documentElement.classList.remove('theme-transitioning');
        };
        setTimeout(cleanup, 740);
        if (animation && animation.finished) {
          animation.finished.then(cleanup).catch(cleanup);
        }
        transition.finished.finally(cleanup);
      }).catch(() => {
        window.__isThemeTransitioning = false;
        isThemeTransitioning = false;
        document.documentElement.classList.remove('theme-transitioning');
      });

      transition.finished.finally(() => {
        window.__isThemeTransitioning = false;
        isThemeTransitioning = false;
        document.documentElement.classList.remove('theme-transitioning');
      });
      return;
    }

    // Fallback: smooth expanding circular overlay
    window.__isThemeTransitioning = true;
    isThemeTransitioning = true;
    const overlay = document.createElement('div');
    overlay.className = 'theme-reveal-overlay';
    overlay.style.cssText = [
      'position: fixed',
      'inset: 0',
      'z-index: 999999',
      'pointer-events: none',
      `background-color: ${isNextLight ? '#f4f4f8' : '#07070d'}`,
      `clip-path: circle(0px at ${x}px ${y}px)`,
      'will-change: clip-path, opacity'
    ].join(';');
    document.body.appendChild(overlay);

    localStorage.setItem('pdfhub-theme', next);
    applyTheme(next);

    const anim = overlay.animate(
      [
        { clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 1 },
        { clipPath: `circle(${endRadius}px at ${x}px ${y}px)`, opacity: 1, offset: 0.85 },
        { clipPath: `circle(${endRadius}px at ${x}px ${y}px)`, opacity: 0, offset: 1 }
      ],
      {
        duration: 720,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    );

    const cleanup = () => {
      window.__isThemeTransitioning = false;
      isThemeTransitioning = false;
      document.documentElement.classList.remove('theme-transitioning');
      overlay.remove();
    };
    anim.onfinish = cleanup;
    anim.oncancel = cleanup;
  };

  if(!window.__pdfhubThemeWrapped){
    window.toggleTheme = executeCircularThemeToggle;
    window.getThemeToggleOrigin = getThemeToggleOrigin;
    window.__pdfhubThemeWrapped = true;
    window.addEventListener('storage', event => {
      if (event.key === 'pdfhub-theme') applyTheme(event.newValue || 'dark');
    });
  }

  const verifiedSupportEmail = 'hazimbashir.dev@gmail.com';
  const supportSubject = 'PDFHub Support Request';
  const supportBody = `Hello PDFHub Support Team,\n\nI need assistance with PDFHub:\n- Tool / Feature: \n- Description of issue: \n- Operating System / Browser: \n\nThank you!`;
  const supportMailtoUrl = `mailto:${verifiedSupportEmail}?subject=${encodeURIComponent(supportSubject)}&body=${encodeURIComponent(supportBody)}`;

  const setupContactSupport = () => {
    // Ensure all existing contact links have the standardized mailto URL
    document.querySelectorAll('a[href*="hazimbashirfaqeer@gmail.com"], a[href*="hazimbashir.dev@gmail.com"]').forEach(link => {
      if (!link.hasAttribute('data-developer-email') && !link.closest('.pdfhub-developer-info')) {
        link.setAttribute('href', supportMailtoUrl);
      }
    });

    document.addEventListener('click', event => {
      const link = event.target.closest('a[href^="mailto:"], .menu-action[href^="mailto:"]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (link.textContent.includes('Contact Support') || href.includes('PDFHub%20Support%20Request')) {
        // Close control center drawer if open
        const siteMenu = document.getElementById('siteMenu');
        if (siteMenu && siteMenu.classList.contains('open')) {
          if (typeof toggleSiteMenu === 'function') toggleSiteMenu(false);
          else {
            siteMenu.classList.remove('open');
            siteMenu.setAttribute('aria-hidden', 'true');
            const toggle = document.getElementById('menuToggle');
            if (toggle) {
              toggle.setAttribute('aria-expanded', 'false');
              toggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
          }
        }

        // Direct navigation to mailto
        try {
          window.location.href = supportMailtoUrl;
        } catch (_) {}
      }
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupContactSupport);
  } else {
    setupContactSupport();
  }

  const enhanceFooter=()=>{
    const footer=document.querySelector('footer');
    if(!footer||footer.querySelector('.footer-grid')||footer.querySelector('.pdfhub-footer-links'))return;
    const links=[
      ['Tools',siteRoot+'index.html'],
      ['Guides',siteRoot+'guides/'],
      ['Install App',siteRoot+'install/'],
      ['History',siteRoot+'menu-bar/history.html'],
      ['About PDFHub',siteRoot+'menu-bar/about.html'],
      ['Terms',siteRoot+'menu-bar/terms.html'],
      ['Privacy',siteRoot+'menu-bar/privacy.html'],
      ['Contact',supportMailtoUrl]
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
  let scrollTop=existingScrollTop;
  if(!scrollTop){
    scrollTop=document.createElement('button');
    scrollTop.id='pdfhubScrollTop';document.body.appendChild(scrollTop);scrollTop.className='pdfhub-scroll-top';scrollTop.type='button';scrollTop.title='Back to top';scrollTop.setAttribute('aria-label','Back to top');scrollTop.innerHTML='<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    scrollTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }else if(!scrollTop.classList.contains('pdfhub-scroll-top')){
    scrollTop.classList.add('pdfhub-scroll-top');
  }
  if(document.getElementById('pdfhubDeveloper'))return;
  const profile={name:'Hazim Bashir',urdu:'حازم بشیر',handle:'@officialhazim42',role:'Android Developer & Software Creator',location:'Ganderbal, Jammu & Kashmir, India',email:'hazimbashir.dev@gmail.com',bio:"Hi, I'm Hazim Bashir (حازم بشیر), an independent software developer from Ganderbal, Jammu & Kashmir, India. I specialize in designing modern, high-performance, and privacy-first Android applications using Kotlin and Jetpack Compose. My mission is to craft clean, offline-first mobile experiences that respect user data privacy without compromise."};
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

  const devImgSrc=siteRoot+'assets/hazim-bashir-dev.png';

  // ============================================================================
  // TEMPORARY VISIBILITY CONFIGURATION: Floating "About Developer" Widget
  // Set SHOW_DEVELOPER_WIDGET to true to immediately restore the floating button
  // across desktop, tablet, and mobile pages.
  // ============================================================================
  const SHOW_DEVELOPER_WIDGET = false;

  const widget=document.createElement('div');widget.id='pdfhubDeveloper';widget.className='pdfhub-developer';
  if(!SHOW_DEVELOPER_WIDGET){
    widget.style.display='none';
    widget.setAttribute('aria-hidden','true');
  }
  widget.innerHTML=`<div class="pdfhub-developer-panel" aria-label="Developer links"><button class="pdfhub-developer-about" type="button"><i class="fas fa-user-astronaut" aria-hidden="true"></i> About Developer</button>${compact.map(item=>external(item[2],item[0], 'pdfhub-developer-social')+`<i class="fab ${item[3]}" aria-hidden="true"></i></a>`).join('')}</div><button class="pdfhub-developer-trigger" type="button" aria-expanded="false" aria-controls="pdfhubDeveloperDialog" aria-label="Open developer panel"><img class="pdfhub-developer-trigger-img" src="${devImgSrc}" alt="Hazim Bashir — Developer Profile" width="52" height="52" /><span class="pdfhub-developer-trigger-close" aria-hidden="true"><i class="fas fa-xmark"></i></span></button>`;
  const dialog=document.createElement('div');dialog.id='pdfhubDeveloperDialog';dialog.className='pdfhub-developer-dialog';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-hidden','true');dialog.setAttribute('aria-labelledby','pdfhubDeveloperTitle');
  dialog.innerHTML=`<div class="pdfhub-developer-card"><button class="pdfhub-developer-close" type="button" aria-label="Close developer profile"><i class="fas fa-xmark" aria-hidden="true"></i></button><div class="pdfhub-developer-content"><header class="pdfhub-developer-header"><div class="pdfhub-developer-avatar"><img class="pdfhub-developer-avatar-img" src="${devImgSrc}" alt="Hazim Bashir — Android Developer &amp; Software Creator" width="84" height="84" /></div><div><h2 class="pdfhub-developer-name" id="pdfhubDeveloperTitle">${profile.name}</h2><div class="pdfhub-developer-urdu" lang="ur" dir="rtl">${profile.urdu}</div><span class="pdfhub-developer-handle">${profile.handle}</span><div class="pdfhub-developer-role">${profile.role}</div><div class="pdfhub-developer-location"><i class="fas fa-location-dot" aria-hidden="true"></i><span>${profile.location}</span></div></div></header><section class="pdfhub-developer-section"><h3>About Me</h3><p class="pdfhub-developer-bio">${profile.bio}</p></section><section class="pdfhub-developer-section"><h3>Developer Information</h3><div class="pdfhub-developer-info"><div class="pdfhub-developer-info-item"><strong>Full Name</strong><span>${profile.name} (${profile.urdu})</span></div><div class="pdfhub-developer-info-item"><strong>Location</strong><span>${profile.location}</span></div><div class="pdfhub-developer-info-item"><strong>Specialization</strong><span>Android Development, Kotlin, and Jetpack Compose</span></div><div class="pdfhub-developer-info-item"><strong>Professional Role</strong><span>${profile.role}</span></div><div class="pdfhub-developer-info-item"><strong>Email</strong><a href="mailto:${profile.email}?subject=${encodeURIComponent('Developer Inquiry — PDFHub')}" data-developer-email>${profile.email}</a></div></div></section><section class="pdfhub-developer-section"><h3>Connect With Me</h3><div class="pdfhub-developer-social-grid">${socials.map(item=>external(item[2],`${item[0]} profile`, 'pdfhub-developer-social-card')+`<i class="fab ${item[3]}" aria-hidden="true"></i><span>${item[0]}<small>${item[1]}</small></span></a>`).join('')}</div></section><footer class="pdfhub-developer-footer">Crafted with care by Hazim Bashir (حازم بشیر) in Kashmir 🏔️<br>Instagram: @officialhazim42 · GitHub: @officialhazim42 · YouTube: @officialhazim42 · LinkedIn: hazim-bashir-faqeer</footer></div></div>`;
  document.body.append(widget,dialog);
  const trigger=widget.querySelector('.pdfhub-developer-trigger'),panel=widget.querySelector('.pdfhub-developer-panel'),about=widget.querySelector('.pdfhub-developer-about'),close=dialog.querySelector('.pdfhub-developer-close');
  let lastFocus=null;
  const toast=message=>{let node=document.querySelector('.pdfhub-developer-toast');if(!node){node=document.createElement('div');node.className='pdfhub-developer-toast';node.setAttribute('role','status');document.body.append(node)}node.textContent=message;node.classList.add('show');setTimeout(()=>node.classList.remove('show'),2600)};

  // Floating Controls Inactivity & Interaction Management
  let inactivityTimer=null;
  const INACTIVITY_DELAY=3000;

  const isDevOpen=()=>widget.classList.contains('open')||dialog.classList.contains('open')||document.body.classList.contains('pdfhub-modal-open');
  const isHoveredOrFocused=el=>{
    if(!el)return false;
    try{return el.matches(':hover')||el.contains(document.activeElement);}catch(_){return false;}
  };

  const hideFloatingControls=()=>{
    if(isDevOpen())return;
    if(!isHoveredOrFocused(widget))widget.classList.remove('show');
    if(!isHoveredOrFocused(scrollTop))scrollTop.classList.remove('show');
  };

  const handleInteraction=()=>{
    if(SHOW_DEVELOPER_WIDGET){
      widget.classList.add('show');
    }
    if(scrollTop){
      if(window.scrollY>300)scrollTop.classList.add('show');
      else scrollTop.classList.remove('show');
    }
    clearTimeout(inactivityTimer);
    inactivityTimer=setTimeout(hideFloatingControls,INACTIVITY_DELAY);
  };

  ['scroll','mousemove','pointerdown','touchstart','keydown','wheel'].forEach(evt=>{
    window.addEventListener(evt,handleInteraction,{passive:true});
  });

  [widget,scrollTop].forEach(el=>{
    if(!el)return;
    el.addEventListener('mouseenter',()=>{
      if(el===widget && !SHOW_DEVELOPER_WIDGET) return;
      clearTimeout(inactivityTimer);el.classList.add('show');
    });
    el.addEventListener('mouseleave',()=>{if(!isDevOpen()){clearTimeout(inactivityTimer);inactivityTimer=setTimeout(hideFloatingControls,INACTIVITY_DELAY);}});
    el.addEventListener('focusin',()=>{
      if(el===widget && !SHOW_DEVELOPER_WIDGET) return;
      clearTimeout(inactivityTimer);el.classList.add('show');
    });
    el.addEventListener('focusout',()=>{if(!isDevOpen()){clearTimeout(inactivityTimer);inactivityTimer=setTimeout(hideFloatingControls,INACTIVITY_DELAY);}});
  });

  const setPanel=open=>{
    widget.classList.toggle('open',open);
    trigger.setAttribute('aria-expanded',String(open));
    trigger.setAttribute('aria-label',open?'Close developer panel':'Open developer panel');
    if(open){widget.classList.add('show');clearTimeout(inactivityTimer);}
    else{clearTimeout(inactivityTimer);inactivityTimer=setTimeout(hideFloatingControls,INACTIVITY_DELAY);}
  };
  const setDialog=open=>{
    dialog.classList.toggle('open',open);
    dialog.setAttribute('aria-hidden',String(!open));
    widget.inert=open;
    scrollTop?.toggleAttribute('inert',open);
    document.body.classList.toggle('pdfhub-modal-open',open);
    if(open){
      lastFocus=document.activeElement;
      setPanel(false);
      clearTimeout(inactivityTimer);
      close.focus();
    }else{
      lastFocus?.focus();
      clearTimeout(inactivityTimer);
      inactivityTimer=setTimeout(hideFloatingControls,INACTIVITY_DELAY);
    }
  };
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

  // Programmatic API for developer profile dialog (modal remains accessible when trigger is hidden)
  window.openPdfhubDeveloperModal = () => setDialog(true);
  window.closePdfhubDeveloperModal = () => setDialog(false);
  window.__PDFHUB_SHOW_DEVELOPER_WIDGET = SHOW_DEVELOPER_WIDGET;
})();
