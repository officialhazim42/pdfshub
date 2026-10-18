(function(){
  const id = document.body.dataset.guide;
  const guide = (window.PDFHUB_GUIDES || []).find(item => item.id === id);
  if (!guide) return;
  const root = document.getElementById('guideDetail');
  const esc = value => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const toolHref = guide.tool.replace(/^\.\.\/tools\//, '../../tools/');
  const related = (guide.related || []).map(relatedId => {
    const item = (window.PDFHUB_GUIDES || []).find(candidate => candidate.id === relatedId);
    return item ? `<a href="../${item.id}/">${esc(item.name)} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>` : '';
  }).join('');

  const walkthroughList = (guide.walkthrough && guide.walkthrough.length > 0) ? guide.walkthrough : (guide.steps || []).map((step, idx) => ({
    step: idx + 1,
    title: `Step ${idx + 1}`,
    control: 'Workspace Interface',
    whatToDo: step,
    whatYouSee: 'The tool interface responds to your interaction.',
    nextAction: idx < (guide.steps.length - 1) ? `Proceed to Step ${idx + 2}.` : 'Save and download your result.',
    tip: 'Ensure your file is ready before proceeding.',
    image: `step-${idx + 1}-upload.webp`,
    alt: `${guide.name} Step ${idx + 1}`
  }));

  const totalSteps = walkthroughList.length;

  const visual = walkthroughList.map((item, idx) => {
    const hasNext = idx < totalSteps - 1;
    const hasPrev = idx > 0;
    return `
      <article class="walk-card" id="walkCard-${idx}" data-step="${item.step}">
        <div class="walk-card-header">
          <span class="walk-step-pill"><i class="fas fa-list-check" aria-hidden="true"></i> Step ${item.step} of ${totalSteps}</span>
          ${item.control ? `<span class="walk-control-badge" title="Target Interface Element"><i class="fas fa-crosshairs" aria-hidden="true"></i> ${esc(item.control)}</span>` : ''}
        </div>
        <button type="button" class="walk-media-btn" data-step-index="${idx}" aria-label="Enlarge screenshot for Step ${item.step}: ${esc(item.title)}" aria-haspopup="dialog">
          <img src="../../assets/guides/${guide.id}/${item.image}" alt="${esc(item.alt || item.title)}" width="1440" height="1000" loading="lazy" class="walk-img" onerror="this.onerror=null;this.src='../../assets/guides/${guide.id}/step-${item.step}-open.webp';">
          <span class="walk-badge">Step ${item.step}</span>
          <span class="walk-zoom-hint"><i class="fas fa-magnifying-glass-plus" aria-hidden="true"></i> Click to zoom</span>
        </button>
        <div class="walk-content">
          <h3 class="walk-title">${esc(item.title)}</h3>
          <div class="walk-field-group">
            <div class="walk-field what-to-do">
              <span class="walk-field-badge"><i class="fas fa-hand-pointer" aria-hidden="true"></i> What to do:</span>
              <p class="walk-field-desc">${esc(item.whatToDo || item.desc)}</p>
            </div>
            ${item.whatYouSee ? `
            <div class="walk-field what-you-see">
              <span class="walk-field-badge"><i class="fas fa-eye" aria-hidden="true"></i> What you will see:</span>
              <p class="walk-field-desc">${esc(item.whatYouSee)}</p>
            </div>` : ''}
            ${item.nextAction ? `
            <div class="walk-field next-action">
              <span class="walk-field-badge"><i class="fas fa-arrow-right" aria-hidden="true"></i> Next:</span>
              <p class="walk-field-desc">${esc(item.nextAction)}</p>
            </div>` : ''}
            ${item.tip ? `
            <div class="walk-field tip-box">
              <span class="walk-field-badge"><i class="fas fa-lightbulb" aria-hidden="true"></i> Tip:</span>
              <p class="walk-field-desc">${esc(item.tip)}</p>
            </div>` : ''}
          </div>
        </div>
        <div class="walk-card-footer">
          <button type="button" class="walk-nav-btn prev-step" data-target-step="${idx - 1}" ${!hasPrev ? 'disabled' : ''} aria-label="Go to previous step">
            <i class="fas fa-chevron-left" aria-hidden="true"></i> Previous
          </button>
          <span class="walk-step-indicator">${item.step} / ${totalSteps}</span>
          <button type="button" class="walk-nav-btn next-step" data-target-step="${idx + 1}" ${!hasNext ? 'disabled' : ''} aria-label="Go to next step">
            Next <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </article>`;
  }).join('');

  const stepChips = walkthroughList.map((item, idx) => `
    <button type="button" class="walk-step-chip ${idx === 0 ? 'active' : ''}" data-step-target="${idx}" aria-label="Jump to Step ${item.step}: ${esc(item.title)}">
      <span class="chip-num">${item.step}</span>
      <span class="chip-title">${esc(item.title)}</span>
    </button>
  `).join('');

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
      <section class="guide-section visual-walkthrough-section">
        <div class="walk-section-header">
          <div>
            <span class="walk-eyebrow"><i class="fas fa-graduation-cap"></i> Interactive Tutorial</span>
            <h2>Visual step-by-step walkthrough</h2>
            <p class="walk-subtitle">Follow these real interface screenshots captured directly from ${esc(guide.name)}. Every step highlights the exact buttons, selections, and downloads. Click any screenshot or "Launch Fullscreen Viewer" to inspect in high resolution.</p>
          </div>
          <div class="walk-tour-action">
            <button type="button" class="guide-btn primary walk-start-tour-btn" id="startTourBtn" aria-label="Launch interactive full-screen walkthrough">
              <i class="fas fa-play" aria-hidden="true"></i> Launch Fullscreen Viewer
            </button>
          </div>
        </div>

        <!-- Step Progress Navigation Bar -->
        <div class="walk-progress-nav" id="walkProgressNav" role="navigation" aria-label="Walkthrough steps">
          <div class="walk-progress-track">
            <div class="walk-progress-bar" id="walkProgressBar" style="width: ${Math.round(100 / totalSteps)}%;"></div>
          </div>
          <div class="walk-step-chips" id="walkStepChips">${stepChips}</div>
        </div>

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
    lightbox.setAttribute('aria-label', `${guide.name} Step-by-Step Tutorial`);
    lightbox.setAttribute('hidden', '');
    lightbox.innerHTML = `
      <div class="walk-lightbox-backdrop" id="walkLightboxBackdrop" tabindex="-1"></div>
      <div class="walk-lightbox-dialog" role="document">
        <div class="walk-lightbox-header">
          <div class="walk-lightbox-meta">
            <span class="walk-lightbox-counter" id="walkLightboxCounter">Step 1 of ${totalSteps}</span>
            <span class="walk-lightbox-tool" id="walkLightboxTool">${esc(guide.name)}</span>
            <span class="walk-lightbox-control" id="walkLightboxControl"></span>
          </div>
          <button type="button" class="walk-lightbox-close" id="walkLightboxClose" aria-label="Close image viewer (Esc)">
            <i class="fas fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <div class="walk-lightbox-body">
          <button type="button" class="walk-lightbox-nav prev" id="walkLightboxPrev" aria-label="Previous step (Left arrow)">
            <i class="fas fa-chevron-left" aria-hidden="true"></i>
          </button>
          <div class="walk-lightbox-figure-wrap" id="walkLightboxFigure">
            <div class="walk-lightbox-img-box">
              <img id="walkLightboxImg" class="walk-lightbox-img" src="" alt="" />
            </div>
            <div class="walk-lightbox-caption" id="walkLightboxCaption">
              <h4 id="walkLightboxTitle" class="walk-lightbox-title"></h4>
              <div class="walk-lightbox-info-grid" id="walkLightboxInfoGrid"></div>
            </div>
          </div>
          <button type="button" class="walk-lightbox-nav next" id="walkLightboxNext" aria-label="Next step (Right arrow)">
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
  const controlEl = document.getElementById('walkLightboxControl');
  const imgEl = document.getElementById('walkLightboxImg');
  const titleEl = document.getElementById('walkLightboxTitle');
  const infoGridEl = document.getElementById('walkLightboxInfoGrid');
  const closeBtn = document.getElementById('walkLightboxClose');
  const prevBtn = document.getElementById('walkLightboxPrev');
  const nextBtn = document.getElementById('walkLightboxNext');
  const backdrop = document.getElementById('walkLightboxBackdrop');
  const progressBar = document.getElementById('walkProgressBar');
  const chipsContainer = document.getElementById('walkStepChips');

  function updateActiveChip(idx) {
    if (!chipsContainer) return;
    const chips = chipsContainer.querySelectorAll('.walk-step-chip');
    chips.forEach((c, i) => {
      c.classList.toggle('active', i === idx);
    });
    if (progressBar) {
      progressBar.style.width = `${Math.round(((idx + 1) / totalSteps) * 100)}%`;
    }
  }

  function renderStep(idx) {
    if (!walkthroughList || walkthroughList.length === 0) return;
    currentIndex = Math.max(0, Math.min(idx, walkthroughList.length - 1));
    const cur = walkthroughList[currentIndex];

    counterEl.textContent = `Step ${cur.step} of ${totalSteps}`;
    if (controlEl) {
      controlEl.innerHTML = cur.control ? `<i class="fas fa-crosshairs" aria-hidden="true"></i> ${esc(cur.control)}` : '';
      controlEl.style.display = cur.control ? 'inline-flex' : 'none';
    }

    imgEl.src = `../../assets/guides/${guide.id}/${cur.image}`;
    imgEl.alt = cur.alt || cur.title;
    titleEl.textContent = cur.title;

    if (infoGridEl) {
      infoGridEl.innerHTML = `
        <div class="lb-info-block what-to-do">
          <span class="lb-info-label"><i class="fas fa-hand-pointer"></i> What to do:</span>
          <p class="lb-info-text">${esc(cur.whatToDo || cur.desc)}</p>
        </div>
        ${cur.whatYouSee ? `
        <div class="lb-info-block what-you-see">
          <span class="lb-info-label"><i class="fas fa-eye"></i> What you will see:</span>
          <p class="lb-info-text">${esc(cur.whatYouSee)}</p>
        </div>` : ''}
        ${cur.nextAction ? `
        <div class="lb-info-block next-action">
          <span class="lb-info-label"><i class="fas fa-arrow-right"></i> Next:</span>
          <p class="lb-info-text">${esc(cur.nextAction)}</p>
        </div>` : ''}
        ${cur.tip ? `
        <div class="lb-info-block tip-box">
          <span class="lb-info-label"><i class="fas fa-lightbulb"></i> Tip:</span>
          <p class="lb-info-text">${esc(cur.tip)}</p>
        </div>` : ''}
      `;
    }

    prevBtn.disabled = currentIndex === 0;
    prevBtn.setAttribute('aria-disabled', currentIndex === 0 ? 'true' : 'false');
    nextBtn.disabled = currentIndex === totalSteps - 1;
    nextBtn.setAttribute('aria-disabled', currentIndex === totalSteps - 1 ? 'true' : 'false');

    updateActiveChip(currentIndex);
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

  // Handle clicking walkthrough images and buttons
  const grid = document.getElementById('walkthroughGrid');
  if (grid) {
    grid.addEventListener('click', e => {
      const mediaBtn = e.target.closest('.walk-media-btn');
      if (mediaBtn) {
        const idx = parseInt(mediaBtn.dataset.stepIndex, 10);
        if (!isNaN(idx)) openLightbox(idx);
        return;
      }
      const navBtn = e.target.closest('.walk-nav-btn');
      if (navBtn) {
        const targetStep = parseInt(navBtn.dataset.targetStep, 10);
        if (!isNaN(targetStep) && targetStep >= 0 && targetStep < totalSteps) {
          const targetCard = document.getElementById(`walkCard-${targetStep}`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            updateActiveChip(targetStep);
          }
        }
      }
    });
  }

  // Handle step chip clicks
  if (chipsContainer) {
    chipsContainer.addEventListener('click', e => {
      const chip = e.target.closest('.walk-step-chip');
      if (chip) {
        const targetIdx = parseInt(chip.dataset.stepTarget, 10);
        if (!isNaN(targetIdx)) {
          const targetCard = document.getElementById(`walkCard-${targetIdx}`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            updateActiveChip(targetIdx);
          }
        }
      }
    });
  }

  // Handle "Launch Fullscreen Viewer" button
  const startTourBtn = document.getElementById('startTourBtn');
  if (startTourBtn) {
    startTourBtn.addEventListener('click', () => openLightbox(0));
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => { if (currentIndex > 0) renderStep(currentIndex - 1); });
  nextBtn.addEventListener('click', () => { if (currentIndex < totalSteps - 1) renderStep(currentIndex + 1); });

  // Dismiss on clicking backdrop / outside dialog content (do NOT close on clicking image)
  lightbox.addEventListener('click', e => {
    if (e.target === backdrop || e.target === lightbox || (!e.target.closest('.walk-lightbox-figure-wrap') && !e.target.closest('.walk-lightbox-nav') && !e.target.closest('.walk-lightbox-header') && !e.target.closest('.walk-lightbox-footer'))) {
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
      if (currentIndex < totalSteps - 1) renderStep(currentIndex + 1);
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
