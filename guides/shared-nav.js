(function(){
  function esc(v){
    return String(v||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
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
      <div class="menu-header">
        <div class="menu-heading">
          <span>PDFHub control center</span>
          <div class="menu-heading-badges">
            <small class="menu-badge-local">Local only</small>
            <button type="button" class="menu-close-btn" id="menuCloseBtn" aria-label="Close menu" title="Close menu">
              <i class="fas fa-xmark" aria-hidden="true"></i>
            </button>
          </div>
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
      </div>
      <div class="menu-body" id="menuBody">
        <div class="menu-section-label">Tools &amp; Guides</div>
        <div class="menu-list">
          <a class="menu-action" href="${siteRoot}index.html">
            <i class="fas fa-house" aria-hidden="true"></i><span>Home</span>
          </a>
          <a class="menu-action ${!isGuideDetail ? 'active-page' : ''}" href="${isGuideDetail ? '../' : './'}">
            <i class="fas fa-book-open" aria-hidden="true"></i>
            <span>User Guides &amp; Tips</span>
            <span class="menu-action-note">33 guides</span>
          </a>
          <a class="menu-action" href="${siteRoot}menu-bar/favorites.html">
            <i class="fas fa-star" aria-hidden="true"></i><span>Favorite Tools</span><span class="menu-action-note">Local</span>
          </a>
          <a class="menu-action" href="${siteRoot}menu-bar/history.html">
            <i class="fas fa-clock-rotate-left" aria-hidden="true"></i><span>Tool History</span><span class="menu-action-note">Local</span>
          </a>
          <a class="menu-action" href="${siteRoot}docs/">
            <i class="fas fa-book-bookmark" aria-hidden="true"></i><span>Documentation</span><span class="menu-action-note">Docs Hub</span>
          </a>
          <a class="menu-action" href="${siteRoot}install/">
            <i class="fas fa-download" aria-hidden="true"></i><span>Install App</span><span class="menu-action-note">PWA</span>
          </a>
        </div>
        <div class="menu-section-label">Privacy &amp; About</div>
        <div class="menu-list">
          <a class="menu-action" href="${siteRoot}menu-bar/privacy.html">
            <i class="fas fa-shield-halved" aria-hidden="true"></i><span>Privacy Center</span>
          </a>
          <a class="menu-action" href="${siteRoot}menu-bar/terms.html">
            <i class="fas fa-file-contract" aria-hidden="true"></i><span>Terms &amp; Conditions</span>
          </a>
          <a class="menu-action" href="${siteRoot}menu-bar/about.html">
            <i class="fas fa-circle-info" aria-hidden="true"></i><span>About Us</span>
          </a>
          <a class="menu-action" href="mailto:hazimbashirfaqeer@gmail.com?subject=PDFHub%20Inquiry">
            <i class="fas fa-envelope" aria-hidden="true"></i><span>Contact Support</span>
          </a>
        </div>
        <p class="menu-note">Your tools, history, and preferences stay in this browser.</p>
      </div>
    </div>
  </div>
</nav>`;
  }

  function buildFooterHTML(opts){
    const siteRoot = (opts && opts.siteRoot) || '../';
    return `
<footer class="site-footer" role="contentinfo">
  <div class="footer-shell">
    <div class="footer-grid">
      <!-- 1. Brand Section -->
      <div class="footer-col footer-brand">
        <a class="footer-logo f-logo" href="${siteRoot}index.html">
          <img class="logo-mark" src="${siteRoot}favicons/favicon.png" alt="" aria-hidden="true"/>
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
          <li><a href="${siteRoot}tools/merge.html">Merge PDF</a></li>
          <li><a href="${siteRoot}tools/split.html">Split PDF</a></li>
          <li><a href="${siteRoot}tools/compress.html">Compress PDF</a></li>
          <li><a href="${siteRoot}tools/edit.html">Edit PDF</a></li>
          <li><a href="${siteRoot}tools/sign.html">Sign PDF</a></li>
          <li><a href="${siteRoot}tools/pdf-to-word.html">PDF to Word</a></li>
          <li><a href="${siteRoot}tools/protect.html">Protect PDF</a></li>
          <li><a class="footer-more-link" href="${siteRoot}index.html">All 33 Tools <span aria-hidden="true">→</span></a></li>
        </ul>
      </div>

      <!-- 3. Resources -->
      <div class="footer-col">
        <h3 class="footer-title">Resources</h3>
        <ul class="footer-links">
          <li><a href="${siteRoot}guides/">User Guides &amp; Tips</a></li>
          <li><a href="${siteRoot}docs/">Documentation Hub</a></li>
          <li><a href="${siteRoot}install/">Install PDFHub App</a></li>
          <li><a href="${siteRoot}guides/merge-pdf/">Merge PDF Guide</a></li>
          <li><a href="${siteRoot}guides/compress-pdf/">Compress PDF Guide</a></li>
          <li><a href="${siteRoot}guides/edit-pdf/">Edit PDF Guide</a></li>
          <li><a href="${siteRoot}menu-bar/favorites.html">Favorite Tools</a></li>
          <li><a href="${siteRoot}menu-bar/history.html">Tool History</a></li>
        </ul>
      </div>

      <!-- 4. Privacy & Legal -->
      <div class="footer-col">
        <h3 class="footer-title">Privacy &amp; Legal</h3>
        <ul class="footer-links">
          <li><a href="${siteRoot}menu-bar/privacy.html">Privacy Center</a></li>
          <li><a href="${siteRoot}menu-bar/terms.html">Terms &amp; Conditions</a></li>
          <li><a href="${siteRoot}menu-bar/about.html">About PDFHub</a></li>
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
  }

  function initNav(opts){
    const siteRoot = opts.siteRoot || '../';
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('siteMenu');
    const closeBtn = document.getElementById('menuCloseBtn');
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
        if (!menu.classList.contains('open')) return;
        menu.classList.remove('open');
        menu.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        toggle.title = 'Open menu';
        toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        toggle.focus();
      }

      toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (menu.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          closeMenu();
        });
      }

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
