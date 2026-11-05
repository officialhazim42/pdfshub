/**
 * PDFHub Documentation System - Client-Side Controller
 * Handles mobile sidebar drawer, dynamic Table of Contents,
 * quick search (Ctrl+K), active navigation highlighting, and theme sync.
 */

(function () {
  'use strict';

  // 1. THEME INITIALIZATION
  const initTheme = () => {
    const savedTheme = localStorage.getItem('pdfhub-theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
    const themeLabel = document.getElementById('themeLabel');
    const themeKnob = document.getElementById('themeKnob');
    if (themeLabel) themeLabel.textContent = savedTheme === 'light' ? 'Light' : 'Dark';
    if (themeKnob) {
      themeKnob.innerHTML = savedTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
  };
  initTheme();

  window.toggleTheme = function () {
    const isLight = document.body.classList.toggle('light');
    const nextTheme = isLight ? 'light' : 'dark';
    localStorage.setItem('pdfhub-theme', nextTheme);
    const themeLabel = document.getElementById('themeLabel');
    const themeKnob = document.getElementById('themeKnob');
    if (themeLabel) themeLabel.textContent = isLight ? 'Light' : 'Dark';
    if (themeKnob) {
      themeKnob.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
  };

  // 2. SUPPORT MAILTO ENHANCER
  const supportEmail = 'hazimbashirfaqeer@gmail.com';
  const supportSubject = 'PDFHub Support Request';
  const supportBody = `Hello PDFHub Support Team,\n\nI need assistance with PDFHub:\n- Tool / Feature: \n- Description of issue: \n- Operating System / Browser: \n\nThank you!`;
  const supportMailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(supportSubject)}&body=${encodeURIComponent(supportBody)}`;

  function setupContactSupportLinks() {
    document.querySelectorAll('a[href*="hazimbashirfaqeer@gmail.com"]').forEach(link => {
      link.setAttribute('href', supportMailtoUrl);
    });
  }

  // 3. RESPONSIVE SIDEBAR NAVIGATION DRAWER
  function setupResponsiveSidebar() {
    const sidebar = document.getElementById('docsSidebarLeft');
    const toggleBtn = document.getElementById('sidebarToggle');
    if (!sidebar) {
      // If page doesn't have left sidebar (e.g. docs index portal), hide toggle button
      if (toggleBtn) toggleBtn.style.display = 'none';
      return;
    }

    // Ensure toggle button is styled and ready
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-controls', 'docsSidebarLeft');
      toggleBtn.title = 'Open documentation navigation';
    }

    // Ensure Backdrop element exists
    let backdrop = document.getElementById('sidebarBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'sidebarBackdrop';
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    // Inject mobile header into sidebar if not present
    if (!sidebar.querySelector('.sidebar-mobile-header')) {
      const mobileHeader = document.createElement('div');
      mobileHeader.className = 'sidebar-mobile-header';
      mobileHeader.innerHTML = `
        <div class="sidebar-mobile-title">
          <i class="fas fa-book-bookmark" aria-hidden="true"></i>
          <span>Documentation</span>
        </div>
        <button type="button" class="sidebar-close-btn" id="sidebarCloseBtn" aria-label="Close navigation sidebar" title="Close sidebar">
          <i class="fas fa-xmark" aria-hidden="true"></i>
        </button>
      `;
      sidebar.insertBefore(mobileHeader, sidebar.firstChild);
    }

    const closeBtn = document.getElementById('sidebarCloseBtn');

    function openSidebar() {
      sidebar.classList.add('open');
      backdrop.classList.add('open');
      document.body.classList.add('sidebar-open');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.setAttribute('aria-label', 'Close navigation sidebar');
      }
    }

    function closeSidebar() {
      sidebar.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.classList.remove('sidebar-open');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Open navigation sidebar');
      }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (sidebar.classList.contains('open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSidebar();
      });
    }

    backdrop.addEventListener('click', closeSidebar);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (sidebar.classList.contains('open')) closeSidebar();
      }
    });

    // Auto-close drawer on link click in mobile view
    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          closeSidebar();
        }
      });
    });

    // Collapsible sidebar groups
    sidebar.querySelectorAll('.sidebar-group-title').forEach(title => {
      title.addEventListener('click', () => {
        const group = title.closest('.sidebar-group');
        if (group) group.classList.toggle('collapsed');
      });
    });
  }

  // 4. ACTIVE NAVIGATION LINK HIGHLIGHTING
  function highlightActiveSidebarLink() {
    const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    let matchedLink = null;
    sidebarLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (!href) return;
      
      const linkUrl = new URL(href, window.location.href);
      const linkPath = linkUrl.pathname.replace(/\/index\.html$/, '/');
      
      if (linkPath === currentPath || (currentPath.endsWith(linkPath) && linkPath !== '/')) {
        matchedLink = link;
      }
    });

    if (matchedLink) {
      matchedLink.classList.add('active');
      // Scroll matched link into view inside sidebar if needed
      setTimeout(() => {
        matchedLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 100);
    }
  }

  // 5. TABLE OF CONTENTS & COLLAPSIBLE MOBILE ACCORDION
  function setupTableOfContents() {
    const article = document.querySelector('.docs-article');
    if (!article) return;

    const headings = Array.from(article.querySelectorAll('h2, h3'));
    if (!headings.length) return;

    // Ensure all headings have IDs
    headings.forEach((h, index) => {
      if (!h.id) {
        const slug = h.textContent
          .trim()
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        h.id = slug || `section-${index + 1}`;
      }
    });

    // A. Desktop Rail TOC
    const tocList = document.getElementById('tocList');
    if (tocList) {
      tocList.innerHTML = '';
      headings.forEach(h => {
        const li = document.createElement('li');
        li.className = h.tagName.toLowerCase() === 'h3' ? 'toc-sub-item' : 'toc-main-item';
        const a = document.createElement('a');
        a.href = `#${h.id}`;
        // Clean text by stripping FontAwesome icon text if any
        a.textContent = h.textContent.replace(/[\n\r]+/g, ' ').trim();
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById(h.id);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, '', `#${h.id}`);
          }
        });
        li.appendChild(a);
        tocList.appendChild(li);
      });
    }

    // B. Mobile Collapsible In-Article TOC
    let mobileToc = article.querySelector('.mobile-toc-accordion');
    if (!mobileToc && headings.length >= 2) {
      mobileToc = document.createElement('div');
      mobileToc.className = 'mobile-toc-accordion';
      
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'mobile-toc-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = `
        <span class="mobile-toc-toggle-left">
          <i class="fas fa-list-ol" aria-hidden="true"></i>
          <span>On this page <small>(${headings.length} sections)</small></span>
        </span>
        <i class="fas fa-chevron-down mobile-toc-chevron" aria-hidden="true"></i>
      `;

      const body = document.createElement('div');
      body.className = 'mobile-toc-body';

      const list = document.createElement('ul');
      list.className = 'mobile-toc-list';
      headings.forEach(h => {
        const li = document.createElement('li');
        li.className = h.tagName.toLowerCase() === 'h3' ? 'toc-sub' : 'toc-main';
        const a = document.createElement('a');
        a.href = `#${h.id}`;
        a.textContent = h.textContent.replace(/[\n\r]+/g, ' ').trim();
        a.addEventListener('click', (e) => {
          e.preventDefault();
          toggle.setAttribute('aria-expanded', 'false');
          mobileToc.classList.remove('open');
          const target = document.getElementById(h.id);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, '', `#${h.id}`);
          }
        });
        li.appendChild(a);
        list.appendChild(li);
      });

      body.appendChild(list);
      mobileToc.appendChild(toggle);
      mobileToc.appendChild(body);

      toggle.addEventListener('click', () => {
        const open = mobileToc.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });

      // Insert right after the header in article
      const header = article.querySelector('.docs-header');
      if (header && header.nextSibling) {
        article.insertBefore(mobileToc, header.nextSibling);
      } else {
        article.insertBefore(mobileToc, article.firstChild);
      }
    }

    // C. Intersection Observer for Active TOC Link Highlight
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('.toc-list a, .mobile-toc-list a').forEach(a => {
              const active = a.getAttribute('href') === `#${id}`;
              a.classList.toggle('active', active);
            });
          }
        });
      }, { rootMargin: '0px 0px -70% 0px' });

      headings.forEach(h => observer.observe(h));
    }
  }

  // 6. QUICK SEARCH DIALOG (Ctrl+K)
  const docsDirectory = [
    { title: 'Getting Started with PDFHub', category: 'Guides', url: 'getting-started.html', desc: 'Workflows, file uploads, PWA installation, shortcuts.' },
    { title: 'Project Overview', category: 'Architecture', url: 'project-overview.html', desc: 'Core mission, design principles, client execution.' },
    { title: 'System Architecture', category: 'Architecture', url: 'system-architecture.html', desc: 'Static routing, WebAssembly runtime, zero-server privacy.' },
    { title: 'Technology Stack', category: 'Architecture', url: 'technology-stack.html', desc: 'pdf-lib, pdf.js, SheetJS, Mammoth, JSZip, Tesseract.' },
    { title: 'Privacy & Data Processing', category: 'Security', url: 'privacy-and-data-processing.html', desc: 'Browser RAM isolation, zero telemetry, secure sandboxing.' },
    { title: 'Supported File Formats', category: 'Specifications', url: 'supported-formats.html', desc: 'PDF, Office DOCX/XLSX/PPTX, Images, HTML, PDF/A.' },
    { title: 'Hardware & Memory Limits', category: 'Performance', url: 'hardware-requirements.html', desc: 'RAM usage, device heap constraints, large files.' },
    { title: 'Complete Tools Reference', category: 'Reference', url: 'all-tools-reference.html', desc: 'Authoritative technical matrix of all 33 tools.' },
    { title: 'Troubleshooting Guide', category: 'Support', url: 'troubleshooting.html', desc: 'Solving memory limits, corrupt PDFs, AcroForms.' },
    { title: 'Frequently Asked Questions', category: 'Support', url: 'faq.html', desc: 'Security, offline mode, browser compatibility FAQ.' },
    { title: 'PWA & Offline Capabilities', category: 'Mobile & PWA', url: 'pwa-offline.html', desc: 'Service workers, offline caching, mobile installation.' },
    { title: 'Developer Guide', category: 'Development', url: 'developer-guide.html', desc: 'Adding tools, code style, building and testing.' },
    { title: 'Installation & Setup', category: 'Development', url: 'installation-setup.html', desc: 'Local environment, dependencies, running preview server.' },
    { title: 'Build & Deployment', category: 'DevOps', url: 'build-and-deployment.html', desc: 'Netlify, Cloudflare Pages, dist builder pipeline.' },
    { title: 'Testing & Quality Assurance', category: 'QA', url: 'testing-and-qa.html', desc: 'Playwright E2E suites, asset validation, WCAG audits.' },
    { title: 'Merge PDF', category: 'Tool', url: 'tools/merge-pdf.html', desc: 'Combine multiple PDF documents into a single file.' },
    { title: 'Split PDF', category: 'Tool', url: 'tools/split-pdf.html', desc: 'Extract pages or split into individual PDF files.' },
    { title: 'Compress PDF', category: 'Tool', url: 'tools/compress-pdf.html', desc: 'Reduce PDF file size while preserving document quality.' },
    { title: 'Unlock PDF', category: 'Tool', url: 'tools/unlock-pdf.html', desc: 'Remove password and decrypt protected PDF files.' },
    { title: 'Protect PDF', category: 'Tool', url: 'tools/protect-pdf.html', desc: 'Encrypt PDF documents with strong AES-256 password protection.' },
    { title: 'Rotate PDF', category: 'Tool', url: 'tools/rotate-pdf.html', desc: 'Rotate specific or all PDF pages 90, 180, or 270 degrees.' },
    { title: 'OCR PDF', category: 'Tool', url: 'tools/ocr-pdf.html', desc: 'Recognize text from scanned PDFs using client Tesseract OCR.' },
    { title: 'PDF to JPG', category: 'Tool', url: 'tools/pdf-to-jpg.html', desc: 'Convert PDF pages to high-resolution JPEG images.' },
    { title: 'PDF to Word', category: 'Tool', url: 'tools/pdf-to-word.html', desc: 'Extract content and formatting into editable Word DOCX.' },
    { title: 'PDF to Excel', category: 'Tool', url: 'tools/pdf-to-excel.html', desc: 'Extract tabular data into clean Microsoft Excel XLSX spreadsheets.' },
    { title: 'PDF to Markdown', category: 'Tool', url: 'tools/pdf-to-markdown.html', desc: 'Convert PDF layouts and text into structured Markdown.' },
    { title: 'Sign PDF', category: 'Tool', url: 'tools/sign-pdf.html', desc: 'Draw, type, or stamp legal digital signatures onto PDFs.' },
    { title: 'Redact PDF', category: 'Tool', url: 'tools/redact-pdf.html', desc: 'Black out sensitive text and permanent redaction.' },
    { title: 'Compare PDF', category: 'Tool', url: 'tools/compare-pdf.html', desc: 'Side-by-side visual difference comparison between two PDFs.' },
    { title: 'AI Summarizer', category: 'Tool', url: 'tools/summarize-pdf.html', desc: 'Extract executive summaries and key points from documents.' },
    { title: 'Translate PDF', category: 'Tool', url: 'tools/translate-pdf.html', desc: 'Translate document contents across multiple languages.' }
  ];

  function setupQuickSearchModal() {
    let modal = document.getElementById('docSearchModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'docSearchModal';
      modal.className = 'doc-search-modal';
      modal.innerHTML = `
        <div class="doc-search-modal-card" role="dialog" aria-modal="true" aria-label="Quick Search Documentation">
          <div class="doc-search-modal-header">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input type="search" class="doc-search-modal-input" id="quickSearchInput" placeholder="Search documentation, guides & 33 tools..." aria-label="Search documentation" autocomplete="off"/>
            <button type="button" class="doc-search-modal-close" id="quickSearchClose" aria-label="Close search">
              <kbd>Esc</kbd>
            </button>
          </div>
          <div class="doc-search-modal-results" id="quickSearchResults"></div>
          <div class="doc-search-modal-footer">
            <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
            <span><kbd>ESC</kbd> to close</span>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const input = document.getElementById('quickSearchInput');
    const resultsContainer = document.getElementById('quickSearchResults');
    const closeBtn = document.getElementById('quickSearchClose');

    // Base root calculation
    const isSubDir = window.location.pathname.includes('/tools/');
    const prefix = isSubDir ? '../' : './';

    function renderResults(q) {
      const query = (q || '').trim().toLowerCase();
      const filtered = docsDirectory.filter(item => {
        if (!query) return true;
        return item.title.toLowerCase().includes(query) ||
               item.desc.toLowerCase().includes(query) ||
               item.category.toLowerCase().includes(query);
      }).slice(0, 10);

      if (!filtered.length) {
        resultsContainer.innerHTML = `<div class="doc-search-empty"><i class="fas fa-circle-question"></i> No results found for "${query}"</div>`;
        return;
      }

      resultsContainer.innerHTML = filtered.map((item, idx) => `
        <a class="doc-search-result-item ${idx === 0 ? 'selected' : ''}" href="${prefix}${item.url}">
          <div class="result-icon"><i class="fas ${item.category === 'Tool' ? 'fa-screwdriver-wrench' : 'fa-file-lines'}"></i></div>
          <div class="result-info">
            <div class="result-title">${item.title} <span class="result-badge">${item.category}</span></div>
            <div class="result-desc">${item.desc}</div>
          </div>
          <i class="fas fa-arrow-right result-arrow"></i>
        </a>
      `).join('');
    }

    function openSearch() {
      modal.classList.add('open');
      renderResults(input.value);
      setTimeout(() => input.focus(), 50);
      document.body.classList.add('search-modal-open');
    }

    function closeSearch() {
      modal.classList.remove('open');
      document.body.classList.remove('search-modal-open');
    }

    input.addEventListener('input', () => renderResults(input.value));
    closeBtn.addEventListener('click', closeSearch);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSearch();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal.classList.contains('open')) closeSearch();
        else openSearch();
      } else if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeSearch();
      } else if (modal.classList.contains('open')) {
        const items = Array.from(resultsContainer.querySelectorAll('.doc-search-result-item'));
        if (!items.length) return;
        const selectedIdx = items.findIndex(el => el.classList.contains('selected'));

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = (selectedIdx + 1) % items.length;
          items.forEach(el => el.classList.remove('selected'));
          items[next].classList.add('selected');
          items[next].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = (selectedIdx - 1 + items.length) % items.length;
          items.forEach(el => el.classList.remove('selected'));
          items[prev].classList.add('selected');
          items[prev].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
          if (selectedIdx >= 0) {
            e.preventDefault();
            items[selectedIdx].click();
          }
        }
      }
    });

    // Trigger buttons
    document.querySelectorAll('.sidebar-search-btn, .nav-search-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
      });
    });
  }

  // 7. CONTROL CENTER DRAWER TOGGLE
  function setupSiteMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('siteMenu');
    const closeBtn = document.getElementById('menuCloseBtn');

    if (!toggle || !menu) return;

    function toggleMenu(force) {
      const open = typeof force === 'boolean' ? force : !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      menu.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
      toggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) {
        document.getElementById('menuSearchInput')?.focus();
      }
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu(false);
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#siteMenu') && !e.target.closest('#menuToggle')) {
        toggleMenu(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // 8. DOCS PORTAL TAB NAVIGATION & FILTERING (For docs/index.html)
  function setupDocsPortal() {
    const tabBtns = document.querySelectorAll('.doc-tab-btn');
    const sections = document.querySelectorAll('.doc-section');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });

    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.tool-card');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.cat;
        
        cards.forEach(card => {
          if (cat === 'all' || card.dataset.category.toLowerCase().includes(cat.toLowerCase())) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    const searchInput = document.getElementById('docSearchInput');
    const clearBtn = document.getElementById('docSearchClear');

    function applySearch() {
      if (!searchInput) return;
      const q = (searchInput.value || '').trim().toLowerCase();
      if (clearBtn) {
        if (q.length > 0) clearBtn.classList.add('visible');
        else clearBtn.classList.remove('visible');
      }

      if (q.length > 0) {
        const toolsTabBtn = document.querySelector('[data-tab="tab-tools"]');
        if (toolsTabBtn && !toolsTabBtn.classList.contains('active')) {
          toolsTabBtn.click();
        }
      }

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    if (searchInput) searchInput.addEventListener('input', applySearch);
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        applySearch();
        searchInput.focus();
      });
    }

    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        if (item) item.classList.toggle('open');
      });
    });
  }

  // DOM READY EXECUTION
  const onReady = () => {
    setupContactSupportLinks();
    setupResponsiveSidebar();
    highlightActiveSidebarLink();
    setupTableOfContents();
    setupQuickSearchModal();
    setupSiteMenu();
    setupDocsPortal();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
