(function () {
  'use strict';
  const { SITE, UI, Art } = window;
  const c = UI.c;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const posts = [...SITE.posts].sort((a, b) => b.date.localeCompare(a.date));
  const cats = [...new Set(posts.map((p) => p.category))];
  const state = { q: '', cat: 'All' };
  const countOf = (k) => (k === 'All' ? posts.length : posts.filter((p) => p.category === k).length);

  UI.mount('#page-head', UI.pageHeader({
    eyebrow: 'Health articles',
    title: 'Advice you can <span class="text-teal">trust</span>',
    text: 'Clear, practical guidance on pregnancy, periods, fertility, screening and surgery, written by Dr. Rukhsana Alam for women and families.',
    photo: null
  }));
  $('search-icon').innerHTML = UI.icon('search', 'h-5 w-5');

  function tabs() {
    const base = 'min-h-[44px] shrink-0 border-b-4 px-4 py-3 text-xs font-bold uppercase tracking-wider transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40 ';
    UI.mount('#blog-tabs', ['All', ...cats].map((k) => {
      const on = state.cat === k;
      return `<button type="button" data-cat="${esc(k)}" aria-pressed="${on}" class="${base}${on ? 'border-teal text-navy' : 'border-ice-2 text-body hover:text-navy'}">${esc(k)}</button>`;
    }).join(''));
  }

  function sideCats() {
    const rows = ['All', ...cats].map((k) => {
      const on = state.cat === k;
      return `<li><button type="button" data-cat="${esc(k)}" aria-pressed="${on}" class="flex min-h-[44px] w-full items-center justify-between gap-3 border-b border-l-4 border-ice-2 px-4 py-3 text-left text-sm transition duration-300 hover:bg-ice focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40 ${on ? 'border-l-teal bg-ice font-bold text-navy' : 'border-l-transparent font-medium text-body'}"><span>${k === 'All' ? 'All articles' : esc(k)}</span><span class="${c.chip}">${countOf(k)}</span></button></li>`;
    }).join('');
    UI.mount('#blog-cats', `<div class="${c.cardTop}"><h2 class="px-5 pt-5 font-heading text-lg font-extrabold text-navy">Categories</h2><ul class="mt-3">${rows}</ul></div>`);
  }

  function sideStatic() {
    const items = posts.slice(0, 4).map((p) => `<li><a href="${UI.url.post(p.slug)}" class="group flex items-center gap-4 border-b border-ice-2 px-5 py-3 transition duration-300 hover:bg-ice focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40"><span class="block h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-navy">${Art.cover(p.art, 'h-full w-full')}</span><span class="min-w-0"><span class="line-clamp-2 block text-sm font-bold text-navy transition group-hover:text-teal-dark">${p.title}</span><span class="mt-1 block text-xs text-body">${UI.formatDate(p.date)}</span></span></a></li>`).join('');
    UI.mount('#blog-recent', `<div class="${c.cardTop}"><h2 class="px-5 pt-5 font-heading text-lg font-extrabold text-navy">Recent articles</h2><ul class="mt-3">${items}</ul></div>`);
    UI.mount('#blog-cta', `<div class="${c.panelNavy}"><h2 class="font-heading text-xl font-extrabold text-white">Need a consultation?</h2><span class="${c.bar} mt-3"></span><p class="mt-4 text-sm leading-relaxed text-slate-200">Book a visit at Gulshan, Mirpur or Chattogram and get advice that fits your health.</p><a href="appointment.html" class="${c.btnPrimary} mt-5 w-full">${UI.icon('calendar-check', 'h-4 w-4')} Book appointment</a></div>`);
  }

  function featured(f) {
    return `<article class="grid overflow-hidden rounded-md border border-ice-2 border-t-4 border-t-teal bg-white shadow-card md:grid-cols-5">
      <div class="relative min-h-[220px] overflow-hidden bg-navy md:col-span-2">${Art.cover(f.art, 'h-full w-full')}<span class="absolute left-0 top-0 bg-teal px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-navy">Featured</span></div>
      <div class="p-6 sm:p-8 md:col-span-3">
        <div class="flex flex-wrap items-center gap-2"><span class="${c.chip}">${esc(f.category)}</span><span class="text-xs font-semibold text-body">${UI.formatDate(f.date)} &middot; ${f.readMin} min read</span></div>
        <h2 class="mt-4 font-heading text-2xl font-extrabold leading-tight text-navy">${f.title}</h2>
        <p class="mt-3 text-sm leading-relaxed sm:text-base">${f.excerpt}</p>
        <a href="${UI.url.post(f.slug)}" class="${c.btnPrimary} mt-6">Read article ${UI.icon('arrow-right', 'h-4 w-4')}</a>
      </div></article>`;
  }

  function render() {
    const q = state.q.trim().toLowerCase();
    const list = posts.filter((p) => (state.cat === 'All' || p.category === state.cat) && (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)));
    const feat = !q && state.cat === 'All' ? posts.find((p) => p.featured) : null;
    const rest = feat ? list.filter((p) => p !== feat) : list;
    const n = list.length;
    $('blog-count').textContent = `${n} article${n === 1 ? '' : 's'}${state.cat !== 'All' ? ' in ' + state.cat : ''}${q ? ' matching "' + state.q.trim() + '"' : ''}`;
    tabs();
    sideCats();
    UI.mount('#blog-featured', feat ? featured(feat) : '');
    const grid = $('blog-grid');
    UI.mount(grid, n
      ? rest.map((p, i) => UI.postCard(p, i)).join('')
      : `<div class="${c.panelIce} col-span-full text-center"><span class="${c.iconWrap} mx-auto">${UI.icon('search', 'h-6 w-6')}</span><h3 class="${c.h3} mt-4">No articles found</h3><p class="mt-2 text-sm">Try a different word or browse every category.</p><button type="button" data-reset class="${c.btnNavy} mt-5">Clear filters</button></div>`);
    grid.classList.remove('animate-fade-in');
    void grid.offsetWidth;
    grid.classList.add('animate-fade-in');
  }

  document.addEventListener('click', (e) => {
    const cat = e.target.closest('[data-cat]');
    if (cat) { state.cat = cat.dataset.cat; render(); return; }
    if (e.target.closest('[data-reset]')) {
      state.q = ''; state.cat = 'All'; $('blog-search').value = ''; render();
    }
  });
  $('blog-search').addEventListener('input', (e) => { state.q = e.target.value; render(); });

  sideStatic();
  render();
})();
