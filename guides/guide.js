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

  const visual = walkthroughList.map(item => {
    return `<article class="walk-card">
      <div class="walk-media">
        <img src="../../assets/guides/${guide.id}/${item.image}" alt="${esc(item.alt)}" width="1440" height="1000" loading="lazy" class="walk-img" onerror="this.onerror=null;this.src='../../assets/guides/${guide.id}/step-${item.step}-open.webp';">
        <span class="walk-badge">Step ${item.step}</span>
      </div>
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
        <p>Follow these real interface screenshots captured directly from ${esc(guide.name)} using non-sensitive synthetic samples.</p>
        <div class="walkthrough">${visual}</div>
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
})();
