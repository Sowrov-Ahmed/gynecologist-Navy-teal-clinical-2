(function () {
  const d = SITE.doctor;
  const c = UI.c;
  const all = SITE.testimonials;
  const services = [...new Set(all.map((t) => t.service))];
  const PAGE = 6;
  const dist = [[5, 91], [4, 7], [3, 1], [2, 1], [1, 0]];
  let filter = 'All';
  let shown = PAGE;

  UI.mount('#page-head', UI.pageHeader({
    eyebrow: 'Patient stories',
    title: 'Trusted by <span class="text-teal">25,000+ patients</span>',
    text: 'Honest words from mothers and women we have cared for, from first antenatal visit to safe delivery and recovery.',
    photo: 'listening'
  }));

  const bars = dist.map(([n, p]) => `
    <div class="flex items-center gap-3 text-sm">
      <span class="w-8 shrink-0 font-bold text-navy">${n}★</span>
      <div class="h-2.5 flex-1 bg-ice-2" role="img" aria-label="${p}% of reviews are ${n} stars"><div class="h-full w-0 bg-teal transition-[width] duration-1000 ease-out" data-bar="${p}"></div></div>
      <span class="w-10 shrink-0 text-right font-semibold text-navy">${p}%</span>
    </div>`).join('');

  const tabs = ['All', ...services].map((s) => `
    <button type="button" data-tab="${s}" class="min-h-[44px] shrink-0 whitespace-nowrap border-b-4 px-4 text-sm font-bold uppercase tracking-wide transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40"></button>`).join('');

  UI.mount('#stories', `<div class="${c.container}">
    ${UI.sectionHead({ n: '01', eyebrow: 'Reviews', title: 'What patients <span class="text-teal-dark">say about their care</span>' })}
    <div class="mt-12 grid gap-10 lg:grid-cols-12">
      <aside class="self-start rounded-md border border-ice-2 bg-ice p-6 sm:p-8 lg:sticky lg:top-28 lg:col-span-4" data-reveal="left">
        <p class="font-heading text-6xl font-extrabold text-navy">${d.stats.rating}</p>
        <div class="mt-2 flex text-amber-500" aria-label="Rated ${d.stats.rating} out of 5">${UI.stars(d.stats.rating)}</div>
        <p class="mt-2 text-sm font-semibold text-navy">from ${d.stats.reviews.toLocaleString('en-US')} reviews</p>
        <div class="mt-6 space-y-3 border-t border-ice-2 pt-6" id="bars">${bars}</div>
      </aside>
      <div class="min-w-0 lg:col-span-8">
        <div class="-mx-4 overflow-x-auto border-b border-ice-2 px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter stories by service" id="tabs">${tabs}</div>
        <p class="mt-5 text-sm font-semibold text-navy" id="count" aria-live="polite"></p>
        <div class="mt-6 grid gap-6 md:grid-cols-2" id="grid"></div>
        <div id="empty" class="mt-6 hidden rounded-md border border-ice-2 bg-ice p-8 text-center">
          <p class="font-heading text-lg font-bold text-navy">No stories for this service yet.</p>
          <button type="button" data-reset class="${c.btnNavy} mt-4">Show all stories</button>
        </div>
        <div class="mt-8 text-center"><button type="button" id="more" class="${c.btnOutline}">Load more stories ${UI.icon('plus', 'h-4 w-4')}</button></div>
      </div>
    </div>
  </div>`);

  const grid = document.getElementById('grid');
  const count = document.getElementById('count');
  const more = document.getElementById('more');
  const empty = document.getElementById('empty');
  const tabEls = [...document.querySelectorAll('[data-tab]')];

  function render(animate) {
    const list = filter === 'All' ? all : all.filter((t) => t.service === filter);
    const slice = list.slice(0, shown);
    tabEls.forEach((b) => {
      const on = b.dataset.tab === filter;
      const n = b.dataset.tab === 'All' ? all.length : all.filter((t) => t.service === b.dataset.tab).length;
      b.textContent = `${b.dataset.tab} (${n})`;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', on);
      b.className = b.className.replace(/border-teal text-navy|border-transparent text-body hover:text-navy/g, '').trim() +
        (on ? ' border-teal text-navy' : ' border-transparent text-body hover:text-navy');
    });
    UI.mount(grid, slice.map((t, i) => UI.testimonialCard(t, i)).join(''));
    if (animate) {
      grid.classList.remove('animate-fade-in');
      void grid.offsetWidth;
      grid.classList.add('animate-fade-in');
    }
    count.textContent = list.length ? `Showing ${slice.length} of ${list.length} stories` : '';
    empty.classList.toggle('hidden', list.length > 0);
    more.parentElement.classList.toggle('hidden', slice.length >= list.length);
  }

  tabEls.forEach((b) => b.addEventListener('click', () => { filter = b.dataset.tab; shown = PAGE; render(true); }));
  more.addEventListener('click', () => { shown += PAGE; render(false); });
  empty.querySelector('[data-reset]').addEventListener('click', () => { filter = 'All'; shown = PAGE; render(true); });
  render(false);

  const barBox = document.getElementById('bars');
  const fill = () => barBox.querySelectorAll('[data-bar]').forEach((b) => { b.style.width = b.dataset.bar + '%'; });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { fill(); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(barBox);
  } else fill();
})();
