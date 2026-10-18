(function(){
  function esc(v){
    return String(v||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function getHistoryTools(){
    try {
      return JSON.parse(localStorage.getItem('pdfhub-history-tools')||'[]');
    } catch(e) {
      return [];
    }
  }

  function buildHeaderHTML(opts){
    const siteRoot = opts.siteRoot || '../';
    const isGuideDetail = !!opts.isGuideDetail;
    const guideName = opts.guideName || 'Guide';
    const toolHref = opts.toolHref || (siteRoot + 'index.html');
    const isLight = document.body ? document.body.classList.contains('light') : ((localStorage.getItem('pdfhub-theme')||'dark')==='light');

    return `
<nav class="site-nav" role="navigation" aria-label="PDFHub Main Navigation">
  <div class="nav-left">
    <a class="logo" href="${siteRoot}index.html" title="PDFHub Home">
      <img class="logo-mark" src="${siteRoot}favicons/favicon.png" alt="" aria-hidden="true"/>
      <span>PDF HUB</span>
    </a>
    <span class="nav-divider" aria-hidden="true">/</span>
    ${isGuideDetail ? `
      <a class="nav-sub-link" href="../" title="All User Guides &amp; Tips">
        <i class="fas fa-book-open" aria-hidden="true"></i>
        <span>Guides</span>
      </a>
      <span class="nav-divider" aria-hidden="true">/</span>
      <span class="nav-current-tool" title="${esc(guideName)}">${esc(guideName)}</span>
    ` : `
      <span class="nav-badge">
        <i class="fas fa-book-open" aria-hidden="true"></i>
        <span>User Guides &amp; Tips</span>
      </span>
    `}
  </div>
  <div class="nav-right">
    ${isGuideDetail ? `
      <a class="nav-cta-btn" href="${toolHref}" title="Launch ${esc(guideName)} in browser">
        <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
        <span>Open Tool</span>
      </a>
    ` : `
      <a class="nav-subtle-link" href="${siteRoot}index.html" title="Browse all 33 tools">
        <i class="fas fa-th-large" aria-hidden="true"></i>
        <span>All Tools</span>
      </a>
    `}
    <button class="global-theme-toggle" id="globalThemeToggle" type="button" onclick="toggleTheme()" title="Toggle light/dark mode" aria-label="Toggle light or dark theme">
      <span class="t-label" id="themeLabel">${isLight ? 'Light' : 'Dark'}</span>
      <span class="toggle-track">
        <span class="toggle-knob" id="themeKnob">
          <i class="fas ${isLight ? 'fa-sun' : 'fa-moon'}"></i>
        </span>
      </span>
    </button>
    <button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="siteMenu" title="Open control center menu" aria-label="Open menu">
      <i class="fas fa-bars" aria-hidden="true"></i>
    </button>
    <div class="site-menu" id="siteMenu" aria-hidden="true" role="navigation" aria-label="PDFHub control center">
      <div class="menu-heading">
        <span>PDFHub control center</span>
        <small>Local only</small>
      </div>
      <form class="menu-search" id="menuSearch" role="search">
        <i class="fas fa-search" aria-hidden="true"></i>
        <input id="menuSearchInput" type="search" placeholder="Search 33 tools..." aria-label="Search tools" autocomplete="off"/>
        <button type="submit" title="Search"><i class="fas fa-arrow-right" aria-hidden="true"></i></button>
      </form>
      <div class="menu-status">
        <span><i class="fas fa-shield-halved" aria-hidden="true"></i> Runs in your browser</span>
        <span class="menu-status-dot">●</span>
        <span>No account needed</span>
      </div>
      <div class="menu-list">
        <div class="menu-section-label">Workspace</div>
        <a class="menu-action" href="${siteRoot}index.html">
          <i class="fas fa-house" aria-hidden="true"></i><span>Home</span>
        </a>
        <a class="menu-action menu-featured" href="${siteRoot}menu-bar/dashboard.html" aria-label="Open your dashboard, recent activity, and notifications">
          <span class="menu-feature-icon"><i class="fas fa-chart-line" aria-hidden="true"></i></span>
          <span class="menu-feature-copy">
            <span class="menu-feature-title">Dashboard &amp; updates</span>
            <span class="menu-feature-subtitle">Activity, recent tools, and notifications</span>
          </span>
          <span class="menu-feature-meta">
            <span class="menu-feature-count" id="dashboardCount">${getHistoryTools().length}</span>
            <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </span>
        </a>
        <a class="menu-action ${!isGuideDetail ? 'active-page' : ''}" href="${isGuideDetail ? '../' : './'}">
          <i class="fas fa-book-open" aria-hidden="true"></i>
          <span>User Guides &amp; Tips</span>
          <span class="menu-action-note">33 guides</span>
        </a>
        <a class="menu-action" href="${siteRoot}menu-bar/favorites.html">
          <i class="fas fa-star" aria-hidden="true"></i><span>Favorites</span><span class="menu-action-note">Local</span>
        </a>
        <a class="menu-action" href="${siteRoot}menu-bar/history.html">
          <i class="fas fa-clock-rotate-left" aria-hidden="true"></i><span>History</span><span class="menu-action-note">Local</span>
        </a>
        <div class="menu-section-label" data-section="about">About PDFHub</div>
        <a class="menu-action" href="${siteRoot}menu-bar/privacy.html">
          <i class="fas fa-shield-halved" aria-hidden="true"></i><span>Privacy Center</span>
        </a>
        <a class="menu-action" href="${siteRoot}menu-bar/terms.html">
          <i class="fas fa-file-contract" aria-hidden="true"></i><span>Terms and conditions</span>
        </a>
        <a class="menu-action" href="${siteRoot}menu-bar/about.html">
          <i class="fas fa-circle-info" aria-hidden="true"></i><span>About us</span>
        </a>
      </div>
      <p class="menu-note">Your tools, history, and preferences stay in this browser.</p>
    </div>
  </div>
</nav>`;
  }

  function buildFooterHTML(){
    return `
<footer class="site-footer" role="contentinfo">
  <div class="f-logo">PDFHub</div>
  <div class="f-by">Built with ❤️ · Free forever · No sign-up · Files never leave your device</div>
  <div class="f-bottom">
    <span class="f-copy">©PDFHub</span><div class="f-dot"></div>
    <span class="f-copy">by @officialhazim42</span><div class="f-dot"></div>
    <span class="f-copy">All 33 tools free forever</span><div class="f-dot"></div>
    <span class="f-copy">Your files never leave your device</span>
  </div>
</footer>`;
  }

  function initNav(opts){
    const siteRoot = opts.siteRoot || '../';
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('siteMenu');
    const searchForm = document.getElementById('menuSearch');
    const searchInput = document.getElementById('menuSearchInput');

    // Theme toggle fallback if developer.js has not set window.toggleTheme yet
    if (!window.toggleTheme) {
      window.toggleTheme = function() {
        const isLight = document.body.classList.toggle('light');
        localStorage.setItem('pdfhub-theme', isLight ? 'light' : 'dark');
        const lbl = document.getElementById('themeLabel');
        const knob = document.getElementById('themeKnob');
        if (lbl) lbl.textContent = isLight ? 'Light' : 'Dark';
        if (knob) knob.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isLight ? '#f4f4f8' : '#07070d');
      };
    }

    // Update initial dashboard count
    const countEl = document.getElementById('dashboardCount');
    if (countEl) countEl.textContent = getHistoryTools().length;

    if (toggle && menu) {
      function openMenu() {
        menu.classList.add('open');
        menu.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
        toggle.title = 'Close menu';
        toggle.innerHTML = '<i class="fas fa-xmark" aria-hidden="true"></i>';
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 80);
        }
      }

      function closeMenu() {
        menu.classList.remove('open');
        menu.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        toggle.title = 'Open menu';
        toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
      }

      toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (menu.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const query = searchInput.value.trim();
          closeMenu();
          if (query) {
            window.location.href = siteRoot + 'index.html?search=' + encodeURIComponent(query);
          }
        });
      }

      document.addEventListener('click', function(e) {
        if (!e.target.closest('#siteMenu') && !e.target.closest('#menuToggle')) {
          if (menu.classList.contains('open')) {
            closeMenu();
          }
        }
      });

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
          closeMenu();
          toggle.focus();
        }
      });
    }
  }

  window.PDFHUB_NAV = {
    buildHeaderHTML: buildHeaderHTML,
    buildFooterHTML: buildFooterHTML,
    initNav: initNav
  };
})();
