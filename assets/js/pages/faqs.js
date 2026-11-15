(function () {
  const d = SITE.doctor;
  const c = UI.c;
  const ic = UI.icon;
  const faqs = SITE.faqs;
  const cats = ['All', 'Appointments', 'Pregnancy', 'Treatments', 'Payments'];
  let cat = 'All';
  let q = '';

  UI.mount('#page-head', UI.pageHeader({
    eyebrow: 'FAQs',
    title: 'Answers to your <span class="text-teal">questions</span>',
    text: 'Booking, pregnancy care, treatments and payments explained clearly, so you know what to expect before you visit.',
    photo: 'tablet'
  }));

  const catBtns = cats.map((k) => `
    <button type="button" data-cat="${k}" class="flex min-h-[44px] w-full items-center justify-between gap-3 border-l-4 px-4 py-2.5 text-left text-sm font-bold uppercase tracking-wide transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40">
      <span>${k}</span><span data-n class="rounded-sm px-2 py-0.5 text-xs"></span>
    </button>`).join('');

  UI.mount('#faq-body', `<div class="${c.container}">
    ${UI.sectionHead({ n: '01', eyebrow: 'Help centre', title: 'Everything patients <span class="text-teal-dark">ask us most</span>' })}
    <div class="mt-12 grid gap-10 lg:grid-cols-12">
      <aside class="space-y-6 self-start lg:sticky lg:top-28 lg:col-span-4">
        <nav aria-label="FAQ categories" class="${c.card} overflow-hidden p-2"><div class="space-y-1" id="cats">${catBtns}</div></nav>
        <div class="${c.panelNavy}">
          <h3 class="font-heading text-xl font-bold">Still have questions?</h3>
          <p class="mt-2 text-sm text-white/80">Our team replies within working hours, Saturday to Thursday.</p>
          <div class="mt-5 grid gap-3">
            <a href="${d.phoneHref}" class="${c.btnPrimary}">${ic('phone', 'h-4 w-4')} Call now</a>
            <a href="${d.whatsapp}" target="_blank" rel="noopener" class="${c.btnOutlineLight}">${ic('whatsapp', 'h-4 w-4')} WhatsApp</a>
            <a href="contact.html" class="${c.btnOutlineLight}">${ic('mail', 'h-4 w-4')} Send a message</a>
          </div>
        </div>
      </aside>
      <div class="min-w-0 lg:col-span-8">
        <div class="relative">
          <label for="faq-search" class="${c.label}">Search questions</label>
          <span class="pointer-events-none absolute bottom-3.5 left-4 text-slate-400">${ic('search', 'h-5 w-5')}</span>
          <input id="faq-search" type="search" autocomplete="off" placeholder="Try &quot;fee&quot;, &quot;delivery&quot; or &quot;bKash&quot;" class="${c.input} pl-12 pr-12 [&::-webkit-search-cancel-button]:hidden">
          <button type="button" id="faq-clear" aria-label="Clear search" class="absolute bottom-0.5 right-1 hidden h-11 w-11 items-center justify-center text-slate-500 transition duration-300 hover:text-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40">${ic('x', 'h-5 w-5')}</button>
        </div>
        <p class="mt-4 text-sm font-semibold text-navy" id="faq-count" aria-live="polite"></p>
        <div class="mt-4" id="faq-list"></div>
        <div id="faq-empty" class="mt-4 hidden rounded-md border border-ice-2 bg-ice p-8 text-center">
          <p class="font-heading text-lg font-bold text-navy">No matching questions found.</p>
          <p class="mt-1 text-sm">Try a different word or call us on ${d.phone}.</p>
          <button type="button" id="faq-reset" class="${c.btnNavy} mt-4">Clear filters</button>
        </div>
      </div>
    </div>
  </div>`);

  const list = document.getElementById('faq-list');
  const input = document.getElementById('faq-search');
  const clear = document.getElementById('faq-clear');
  const count = document.getElementById('faq-count');
  const empty = document.getElementById('faq-empty');
  const btns = [...document.querySelectorAll('[data-cat]')];

  const match = (f) => !q || (f.q + ' ' + f.a).toLowerCase().includes(q);
  const inCat = (f, k) => k === 'All' || f.cat === k;

  function render() {
    const items = faqs.filter((f) => inCat(f, cat) && match(f));
    btns.forEach((b) => {
      const k = b.dataset.cat;
      const on = k === cat;
      b.querySelector('[data-n]').textContent = faqs.filter((f) => inCat(f, k) && match(f)).length;
      b.setAttribute('aria-pressed', on);
      b.className = `flex min-h-[44px] w-full items-center justify-between gap-3 border-l-4 px-4 py-2.5 text-left text-sm font-bold uppercase tracking-wide transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40 ${on ? 'border-teal bg-navy text-white' : 'border-transparent text-navy hover:bg-ice'}`;
      b.querySelector('[data-n]').className = `rounded-sm px-2 py-0.5 text-xs ${on ? 'bg-teal text-navy' : 'bg-ice-2 text-navy'}`;
    });
    clear.classList.toggle('hidden', !q);
    clear.classList.toggle('flex', !!q);
    empty.classList.toggle('hidden', items.length > 0);
    list.classList.toggle('hidden', items.length === 0);
    count.textContent = items.length ? `${items.length} ${items.length === 1 ? 'question' : 'questions'} found` : '';
    if (items.length) UI.faqAccordion(list, items, { prefix: 'faqp2', openFirst: !q });
  }

  const reset = () => { cat = 'All'; q = ''; input.value = ''; render(); };
  btns.forEach((b) => b.addEventListener('click', () => { cat = b.dataset.cat; render(); }));
  input.addEventListener('input', () => { q = input.value.trim().toLowerCase(); render(); });
  clear.addEventListener('click', () => { q = ''; input.value = ''; render(); input.focus(); });
  document.getElementById('faq-reset').addEventListener('click', reset);
  render();
})();
