(function () {
  'use strict';
  const { c } = UI, S = SITE.services, $ = (s) => document.querySelector(s);
  const num = (i) => String(i + 1).padStart(2, '0');
  let active = 0;

  UI.mount('#page-head', UI.pageHeader({
    eyebrow: 'Services',
    title: 'Complete care, <span class="text-teal">one trusted doctor</span>',
    text: 'From the first antenatal visit to laparoscopic surgery and menopause care, every service is led by Dr. Rukhsana Alam with 18 years of experience.',
    photo: 'tablet'
  }));

  UI.mount('#head-all', UI.sectionHead({ n: '01', eyebrow: 'Services', title: 'Six areas of <span class="text-teal-dark">women\u2019s health</span>', text: 'Choose a service to see what it includes, how long it takes and what it costs.' }));
  UI.mount('#services-grid', S.map((s, i) => UI.serviceCard(s, i)).join(''));

  /* 02 Explore: vertical tabs */
  UI.mount('#head-explore', UI.sectionHead({ n: '02', eyebrow: 'Explore a service', title: 'See what <span class="text-teal-dark">each visit covers</span>' }));
  UI.mount('#explore-root', `<div class="grid gap-6 lg:grid-cols-12">
    <div class="min-w-0 lg:col-span-4"><div id="tabs" role="tablist" aria-orientation="vertical" aria-label="Services" class="flex gap-2 overflow-x-auto p-1 lg:flex-col lg:overflow-visible"></div></div>
    <div class="min-w-0 lg:col-span-8"><div id="tab-panel" role="tabpanel" tabindex="0" class="rounded-md border border-ice-2 bg-white shadow-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40"></div></div>
  </div>`);

  const tab = (s, i) => {
    const on = i === active;
    return `<button type="button" role="tab" id="tab-${s.slug}" aria-selected="${on}" aria-controls="tab-panel" tabindex="${on ? 0 : -1}" data-i="${i}" class="flex min-h-[56px] shrink-0 items-center gap-3 whitespace-nowrap border-l-4 px-4 py-3 text-left font-heading text-sm font-bold transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40 lg:w-full lg:whitespace-normal ${on ? 'border-teal bg-navy text-white' : 'border-ice-2 bg-white text-navy hover:border-teal'}"><span class="inline-flex h-8 w-8 shrink-0 items-center justify-center text-xs font-extrabold text-navy ${on ? 'bg-teal' : 'bg-ice'}">${num(i)}</span>${s.title}</button>`;
  };

  const panel = (s) => `<div class="aspect-[16/7] overflow-hidden bg-ice">${Art.cover(s.art, 'h-full w-full')}</div>
    <div class="p-6 sm:p-8">
      <h3 class="${c.h3} text-2xl">${s.title}</h3>
      <span class="${c.bar} mt-3"></span>
      <p class="mt-4 leading-relaxed text-body">${s.overview}</p>
      <ul class="mt-6 grid gap-3 sm:grid-cols-2">${s.includes.map((t) => `<li class="flex items-start gap-3"><span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center bg-teal text-navy">${UI.icon('check', 'h-4 w-4')}</span><span class="text-sm font-medium text-navy">${t}</span></li>`).join('')}</ul>
      <dl class="mt-6 grid grid-cols-2 divide-x divide-ice-2 border border-ice-2">
        <div class="p-4"><dt class="text-xs font-bold uppercase tracking-wider text-teal-dark">Duration</dt><dd class="mt-1 font-heading font-bold text-navy">${s.duration}</dd></div>
        <div class="p-4"><dt class="text-xs font-bold uppercase tracking-wider text-teal-dark">Fee</dt><dd class="mt-1 font-heading font-bold text-navy">${s.fee}</dd></div>
      </dl>
      <div class="mt-6 flex flex-wrap gap-3">
        <a href="${UI.url.appointment({ service: s.slug })}" class="${c.btnPrimary}">${UI.icon('calendar-check', 'h-4 w-4')} Book this service</a>
        <a href="${UI.url.service(s.slug)}" class="${c.btnOutline}">Details ${UI.icon('arrow-right', 'h-4 w-4')}</a>
      </div>
    </div>`;

  function select(i, focus) {
    active = i;
    const s = S[i], p = $('#tab-panel');
    UI.mount('#tabs', S.map(tab).join(''));
    p.setAttribute('aria-labelledby', 'tab-' + s.slug);
    UI.mount(p, panel(s));
    p.classList.remove('animate-fade-in');
    void p.offsetWidth;
    p.classList.add('animate-fade-in');
    if (focus) $('#tab-' + s.slug).focus();
  }

  $('#tabs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (b) select(+b.dataset.i, true);
  });
  $('#tabs').addEventListener('keydown', (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let i;
    if (step) i = (active + step + S.length) % S.length;
    else if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = S.length - 1;
    else return;
    e.preventDefault();
    select(i, true);
  });
  select(0, false);

  /* 03 Care pathway */
  const steps = [
    ['Book', 'Choose a service, chamber and time online, or call the chamber.'],
    ['Consult', 'Dr. Rukhsana listens, examines you and explains your options in plain language.'],
    ['Treat', 'Medicines, procedures or surgery only when needed, with costs shared first.'],
    ['Follow-up', 'Review visits within 30 days use the follow-up fee. Reports are explained in person.']
  ];
  UI.mount('#head-path', UI.sectionHead({ n: '03', eyebrow: 'How care works', title: 'Four clear steps, <span class="text-teal-dark">no guesswork</span>' }));
  UI.mount('#path-list', `<div class="relative"><span class="absolute left-0 right-0 top-[30px] hidden h-0.5 bg-ice-2 lg:block" aria-hidden="true"></span>
    <ol class="relative grid gap-10 border-l-2 border-ice-2 pl-8 lg:grid-cols-4 lg:gap-8 lg:border-l-0 lg:pl-0">${steps.map((s, i) => `<li data-reveal="up" data-delay="${i * 150}" class="relative">
      <span class="absolute -left-[41px] top-4 h-4 w-4 bg-teal lg:hidden" aria-hidden="true"></span>
      <span class="inline-block bg-white pr-4 font-heading text-6xl font-extrabold leading-none text-teal-dark">${num(i)}</span>
      <h3 class="${c.h3} mt-4">${s[0]}</h3>
      <p class="mt-2 text-sm leading-relaxed text-body">${s[1]}</p></li>`).join('')}</ol></div>`);

  /* 04 Fees */
  const th = 'px-5 py-4 text-xs font-bold uppercase tracking-wider';
  UI.mount('#head-fees', UI.sectionHead({ n: '04', eyebrow: 'Fees', title: 'Starting fees, <span class="text-teal-dark">stated upfront</span>', text: 'The exact consultation fee depends on the chamber and is shown before you confirm.' }));
  UI.mount('#fees-table', `<div class="overflow-x-auto border border-ice-2 bg-white shadow-card"><table class="w-full min-w-[640px] text-left text-sm">
    <caption class="sr-only">Starting fees by service</caption>
    <thead class="bg-navy text-white"><tr><th scope="col" class="${th}">Service</th><th scope="col" class="${th}">Duration</th><th scope="col" class="${th}">Starting fee</th><th scope="col" class="${th}"><span class="sr-only">Book</span></th></tr></thead>
    <tbody>${S.map((s) => `<tr class="border-t border-ice-2 odd:bg-white even:bg-teal-soft">
      <td class="px-5 py-4"><a href="${UI.url.service(s.slug)}" class="font-heading font-bold text-navy transition duration-300 hover:text-teal-dark">${s.title}</a></td>
      <td class="whitespace-nowrap px-5 py-4 text-body">${s.duration}</td>
      <td class="whitespace-nowrap px-5 py-4 font-bold text-navy">${s.fee}</td>
      <td class="px-5 py-2 text-right"><a href="${UI.url.appointment({ service: s.slug })}" class="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-wide text-teal-dark transition duration-300 hover:text-navy">Book ${UI.icon('arrow-right', 'h-4 w-4')}</a></td></tr>`).join('')}</tbody></table></div>`);
})();
