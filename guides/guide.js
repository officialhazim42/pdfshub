(function(){
  const id = document.body.dataset.guide;
  const guide = (window.PDFHUB_GUIDES || []).find(item => item.id === id);
  if (!guide) return;
  const root = document.getElementById('guideDetail');
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const toolHref = guide.tool.replace(/^\.\.\/tools\//, '../../tools/');
  const related = (guide.related || []).map(relatedId => {
    const item = (window.PDFHUB_GUIDES || []).find(candidate => candidate.id === relatedId);
    return item ? `<a href="../${item.id}/">${esc(item.name)} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>` : '';
  }).join('');

  const walkthroughList = guide.walkthrough || (guide.steps || []).map((step, idx) => ({
    step: idx + 1,
    title: `Step ${idx + 1}`,
    desc: step,
    image: `step-${idx + 1}-upload.webp`,
    alt: `${guide.name} Step ${idx + 1}`
  }));

  const visual = walkthroughList.map((item, idx) => {
    return `<article class="walk-card" data-step="${item.step}">
      <button type="button" class="walk-media-btn" data-step-index="${idx}" aria-label="Zoom screenshot: Step ${item.step} - ${esc(item.title)}" aria-haspopup="dialog">
        <img src="../../assets/guides/${guide.id}/${item.image}" alt="${esc(item.alt)}" width="1440" height="1000" loading="lazy" class="walk-img" onerror="this.onerror=null;this.src='../../assets/guides/${guide.id}/step-${item.step}-open.webp';">
        <span class="walk-badge">Step ${item.step}</span>
        <span class="walk-zoom-hint"><i class="fas fa-magnifying-glass-plus" aria-hidden="true"></i> Click to zoom</span>
      </button>
      <div class="walk-content">
        <strong class="walk-title">${esc(item.title)}</strong>
        <p class="walk-desc">${esc(item.desc)}</p>
      </div>
    </article>`;
  }).join('');

  root.innerHTML = `<header class="guide-detail">
    <span class="eyebrow">${esc(guide.category)} · ${esc(guide.time)} read</span>
    <h1><i class="fas ${guide.icon}" aria-hidden="true"></i> ${esc(guide.name)} Guide</h1>
    <p class="lead">${esc(guide.summary)}</p>
    <div class="detail-actions">
      <a class="guide-btn primary" href="${toolHref}"><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> Open This Tool</a>
      <a class="guide-btn" href="../"><i class="fas fa-books" aria-hidden="true"></i> Back to All Guides</a>
    </div>
  </header>
  <div class="detail-layout">
    <div class="detail-main">
      <section class="guide-section">
        <h2>Tool overview</h2>
        <p>${esc(guide.overview)}</p>
      </section>
      <section class="guide-section">
        <h2>Before you start</h2>
        <div class="facts">
          <div class="fact"><strong>Input</strong><span>${esc(guide.input)}</span></div>
          <div class="fact"><strong>Output</strong><span>${esc(guide.output)}</span></div>
          <div class="fact"><strong>Known requirements</strong><span>${esc(guide.requirements)}</span></div>
        </div>
      </section>
      <section class="guide-section">
        <h2>Step-by-step instructions</h2>
        <ol>${(guide.steps || []).map(step => `<li>${esc(step)}</li>`).join('')}</ol>
      </section>
      <section class="guide-section">
        <h2>Visual walkthrough</h2>
        <p>Follow these real interface screenshots captured directly from ${esc(guide.name)} using non-sensitive synthetic samples. Click any screenshot to view in full size.</p>
        <div class="walkthrough" id="walkthroughGrid">${visual}</div>
      </section>
      <section class="guide-section">
        <h2>Tips and best practices</h2>
        <ul>${(guide.tips || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul>
      </section>
      <section class="guide-section">
        <h2>Common mistakes</h2>
        <ul>${(guide.mistakes || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul>
      </section>
      <section class="guide-section">
        <h2>Troubleshooting</h2>
        <ul>${(guide.trouble || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul>
      </section>
      <section class="guide-section">
        <h2>FAQ</h2>
        ${(guide.faq || []).map(item => {
          const parts = item.split('? ');
          return `<p><strong>${esc(parts[0])}${parts.length > 1 ? '?' : ''}</strong>${parts.length > 1 ? ' ' + esc(parts.slice(1).join('? ')) : ''}</p>`;
        }).join('')}
      </section>
    </div>
    <aside class="detail-aside">
      <section class="guide-section">
        <h2>Related tools</h2>
        <div class="related">${related}</div>
      </section>
    </aside>
  </div>`;

  document.title = `${guide.name} Guide - PDFHub`;

  // LIGHTBOX COMPONENT INJECTION & EVENT HANDLING
  let lightbox = document.getElementById('walkthroughLightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'walkthroughLightbox';
    lightbox.className = 'walk-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', `${guide.name} Screenshot Viewer`);
    lightbox.setAttribute('hidden', '');
    lightbox.innerHTML = `
      <div class="walk-lightbox-backdrop" id="walkLightboxBackdrop" tabindex="-1"></div>
      <div class="walk-lightbox-dialog" role="document">
        <div class="walk-lightbox-header">
          <div class="walk-lightbox-meta">
            <span class="walk-lightbox-counter" id="walkLightboxCounter">Step 1 of ${walkthroughList.length}</span>
            <span class="walk-lightbox-tool" id="walkLightboxTool">${esc(guide.name)}</span>
          </div>
          <button type="button" class="walk-lightbox-close" id="walkLightboxClose" aria-label="Close image viewer (Esc)">
            <i class="fas fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <div class="walk-lightbox-body">
          <button type="button" class="walk-lightbox-nav prev" id="walkLightboxPrev" aria-label="Previous screenshot (Left arrow)">
            <i class="fas fa-chevron-left" aria-hidden="true"></i>
          </button>
          <div class="walk-lightbox-figure-wrap" id="walkLightboxFigure">
            <img id="walkLightboxImg" class="walk-lightbox-img" src="" alt="" />
            <div class="walk-lightbox-caption">
              <h4 id="walkLightboxTitle" class="walk-lightbox-title"></h4>
              <p id="walkLightboxDesc" class="walk-lightbox-desc"></p>
            </div>
          </div>
          <button type="button" class="walk-lightbox-nav next" id="walkLightboxNext" aria-label="Next screenshot (Right arrow)">
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
        <div class="walk-lightbox-footer">
          <span class="walk-lightbox-shortcut"><kbd>Esc</kbd> Close</span>
          <span class="walk-lightbox-shortcut"><kbd>&larr;</kbd> <kbd>&rarr;</kbd> Navigate</span>
          <span class="walk-lightbox-shortcut"><kbd>Click outside</kbd> Dismiss</span>
        </div>
      </div>`;
    document.body.appendChild(lightbox);
  }

  let currentIndex = 0;
  let lastFocusedElement = null;

  const counterEl = document.getElementById('walkLightboxCounter');
  const imgEl = document.getElementById('walkLightboxImg');
  const titleEl = document.getElementById('walkLightboxTitle');
  const descEl = document.getElementById('walkLightboxDesc');
  const closeBtn = document.getElementById('walkLightboxClose');
  const prevBtn = document.getElementById('walkLightboxPrev');
  const nextBtn = document.getElementById('walkLightboxNext');
  const backdrop = document.getElementById('walkLightboxBackdrop');
  const figureWrap = document.getElementById('walkLightboxFigure');

  function renderStep(idx) {
    if (!walkthroughList || walkthroughList.length === 0) return;
    currentIndex = Math.max(0, Math.min(idx, walkthroughList.length - 1));
    const cur = walkthroughList[currentIndex];

    counterEl.textContent = `Step ${cur.step} of ${walkthroughList.length}`;
    imgEl.src = `../../assets/guides/${guide.id}/${cur.image}`;
    imgEl.alt = cur.alt || cur.title;
    titleEl.textContent = cur.title;
    descEl.textContent = cur.desc;

    prevBtn.disabled = currentIndex === 0;
    prevBtn.setAttribute('aria-disabled', currentIndex === 0 ? 'true' : 'false');
    nextBtn.disabled = currentIndex === walkthroughList.length - 1;
    nextBtn.setAttribute('aria-disabled', currentIndex === walkthroughList.length - 1 ? 'true' : 'false');
  }

  function openLightbox(idx) {
    lastFocusedElement = document.activeElement;
    renderStep(idx);
    lightbox.removeAttribute('hidden');
    requestAnimationFrame(() => {
      lightbox.classList.add('is-open');
      closeBtn.focus();
    });
    document.body.classList.add('lightbox-locked');
  }

  function closeLightbox() {
    if (!lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lightbox-locked');
    setTimeout(() => {
      lightbox.setAttribute('hidden', '');
    }, 250);
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // Handle clicking walkthrough images
  const grid = document.getElementById('walkthroughGrid');
  if (grid) {
    grid.addEventListener('click', e => {
      const btn = e.target.closest('.walk-media-btn');
      if (btn) {
        const idx = parseInt(btn.dataset.stepIndex, 10);
        if (!isNaN(idx)) openLightbox(idx);
      }
    });
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => { if (currentIndex > 0) renderStep(currentIndex - 1); });
  nextBtn.addEventListener('click', () => { if (currentIndex < walkthroughList.length - 1) renderStep(currentIndex + 1); });

  // Dismiss on clicking backdrop / outside dialog content
  lightbox.addEventListener('click', e => {
    if (e.target === backdrop || e.target === lightbox || (!e.target.closest('.walk-lightbox-figure-wrap') && !e.target.closest('.walk-lightbox-nav') && !e.target.closest('.walk-lightbox-header'))) {
      closeLightbox();
    }
  });

  // Keyboard navigation & accessibility focus trap
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentIndex > 0) renderStep(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (currentIndex < walkthroughList.length - 1) renderStep(currentIndex + 1);
    } else if (e.key === 'Tab') {
      const focusable = [closeBtn, prevBtn, nextBtn].filter(el => !el.disabled);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();

