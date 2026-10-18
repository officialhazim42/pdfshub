(function(){
  const guides = window.PDFHUB_GUIDES || [];
  const grid = document.getElementById('guideGrid');
  const filters = document.getElementById('filters');
  const search = document.getElementById('guideSearch');
  const clearBtn = document.getElementById('guideSearchClear');

  const categories = ['All guides', ...new Set(guides.map(g => g.category))];
  let active = 'All guides';

  const esc = v => String(v || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Initialize navigation handlers
  if (window.PDFHUB_NAV && typeof window.PDFHUB_NAV.initNav === 'function') {
    window.PDFHUB_NAV.initNav({ siteRoot: '../' });
  }

  function renderFilters(){
    if (!filters) return;
    filters.innerHTML = categories.map(c => `
      <button class="filter ${c === active ? 'active' : ''}" type="button" data-category="${esc(c)}">
        ${esc(c)}
      </button>
    `).join('');

    filters.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        active = b.dataset.category;
        renderFilters();
        render();
      });
    });
  }

  function render(){
    if (!grid || !search) return;
    const term = search.value.trim().toLowerCase();
    const items = guides.filter(g => {
      const matchCat = (active === 'All guides' || g.category === active);
      if (!matchCat) return false;
      if (!term) return true;
      const haystack = [
        g.name,
        g.category,
        g.summary,
        g.overview,
        g.input,
        g.output,
        ...(g.tips || []),
        ...(g.trouble || [])
      ].join(' ').toLowerCase();
      return haystack.includes(term);
    });

    if (items.length > 0) {
      grid.innerHTML = items.map(g => `
        <article class="guide-card">
          <div class="guide-icon"><i class="fas ${g.icon}" aria-hidden="true"></i></div>
          <h2>${esc(g.name)}</h2>
          <p>${esc(g.summary)}</p>
          <div class="guide-meta">
            <span>${esc(g.category)}</span>
            <span>${esc(g.time)} read</span>
          </div>
          <div class="guide-actions">
            <a class="guide-btn primary" href="${g.id}/">
              <i class="fas fa-book-open" aria-hidden="true"></i> Read Guide
            </a>
            <a class="guide-btn" href="${g.tool}">
              <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> Open Tool
            </a>
          </div>
        </article>
      `).join('');
    } else {
      grid.innerHTML = `<div class="guide-empty">No guides match “${esc(search.value)}”. Try another tool name, workflow, or select “All guides”.</div>`;
    }
  }

  if (search) {
    search.addEventListener('input', render);
  }

  if (clearBtn && search) {
    clearBtn.addEventListener('click', () => {
      search.value = '';
      search.focus();
      render();
    });
  }

  // Pre-fill search if URL parameter ?search= is passed
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('search');
  if (initialQuery && search) {
    search.value = initialQuery;
  }

  renderFilters();
  render();
})();
