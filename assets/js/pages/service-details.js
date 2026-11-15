(function () {
  'use strict';
  const { c } = UI, S = SITE.services, D = SITE.doctor;
  const s = UI.find.service(UI.url.param('slug'));
  const tel = /^tel:/.test(D.phoneHref) ? D.phoneHref : 'tel:' + D.phoneHref;
  const setMeta = (t, d) => {
    document.title = t + ' | Dr. Rukhsana Alam';
    document.querySelector('meta[name="description"]').setAttribute('content', d);
  };
  const container = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';
  const check = (t) => `<li class="flex items-start gap-3"><span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center bg-teal text-navy">${UI.icon('check', 'h-4 w-4')}</span><span class="text-sm font-medium text-navy">${t}</span></li>`;
  const head = (t) => `<h2 class="${c.h3} text-2xl">${t}</h2><span class="${c.bar} mt-3"></span>`;

  if (!s) {
    setMeta('Service not found', 'This service link does not match any service offered by Dr. Rukhsana Alam. Browse all services.');
    UI.mount('#service-root', UI.pageHeader({
      eyebrow: 'Service',
      title: 'Service not found',
      text: 'This link does not match any of our services. Pick one from the list below.',
      photo: null,
      actions: `<div class="flex flex-wrap gap-3"><a href="services.html" class="${c.btnPrimary}">${UI.icon('arrow-left', 'h-4 w-4')} Back to services</a></div>`
    }) + `<section class="${c.section}"><div class="${container}"><div class="${c.panelIce}">
      <h2 class="${c.h3} text-2xl">All services</h2>
      <ul class="mt-5 grid gap-2 sm:grid-cols-2">${S.map((x) => `<li><a href="${UI.url.service(x.slug)}" class="flex min-h-[44px] items-center justify-between gap-3 border-b border-ice-2 text-sm font-semibold text-navy transition duration-300 hover:text-teal-dark">${x.title}${UI.icon('arrow-right', 'h-4 w-4')}</a></li>`).join('')}</ul>
    </div></div></section>`);
    return;
  }

  setMeta(s.title, s.short);
  const i = S.indexOf(s);
  const related = [1, 2, 3].map((k) => S[(i + k) % S.length]);
  const book = UI.url.appointment({ service: s.slug });

  const header = UI.pageHeader({
    eyebrow: 'Service',
    title: s.title,
    text: s.short,
    photo: null,
    actions: `<div class="flex flex-wrap gap-3"><a href="${book}" class="${c.btnPrimary}">${UI.icon('calendar-check', 'h-4 w-4')} Book this service</a><a href="${tel}" class="${c.btnOutlineLight}">${UI.icon('phone', 'h-4 w-4')} Call ${D.phone}</a></div>`
  });

  const main = `<div class="min-w-0 space-y-12 lg:col-span-8">
    <div class="relative pb-3 pr-3">
      <span class="absolute bottom-0 left-3 right-0 top-3 bg-teal" aria-hidden="true"></span>
      <div class="relative aspect-[16/9] overflow-hidden bg-ice">${Art.cover(s.art, 'h-full w-full')}</div>
    </div>
    <div>${head('Overview')}<p class="${c.lead} mt-5">${s.overview}</p></div>
    <div class="${c.panelIce}">${head('What\u2019s included')}<ul class="mt-6 grid gap-4 sm:grid-cols-2">${s.includes.map(check).join('')}</ul></div>
    <div>${head('Suitable for')}<ul class="mt-5 flex flex-wrap gap-2">${s.suitableFor.map((t) => `<li class="inline-flex items-center gap-1.5 rounded-sm bg-navy px-3 py-1.5 text-xs font-semibold text-white">${t}</li>`).join('')}</ul></div>
    <div>${head('How it works')}<ol class="mt-6 grid gap-8 sm:grid-cols-3">${s.process.map((p, k) => `<li data-reveal="up" data-delay="${k * 150}" class="border-t-4 border-t-teal bg-white pt-4"><span class="font-heading text-5xl font-extrabold leading-none text-teal-dark">${String(k + 1).padStart(2, '0')}</span><h3 class="${c.h3} mt-3">${p.t}</h3><p class="mt-2 text-sm leading-relaxed text-body">${p.d}</p></li>`).join('')}</ol></div>
  </div>`;

  const side = `<aside class="min-w-0 lg:col-span-4" aria-label="Fees and chambers"><div class="space-y-6 lg:sticky lg:top-28">
    <div class="${c.panelNavy}">
      <p class="text-xs font-bold uppercase tracking-wider text-teal">Consultation fee</p>
      <p class="mt-1 font-heading text-3xl font-extrabold">${s.fee}</p>
      <p class="mt-2 flex items-center gap-2 text-sm text-slate-300">${UI.icon('clock', 'h-4 w-4')} ${s.duration}</p>
      <p class="mt-6 text-xs font-bold uppercase tracking-wider text-teal">Chambers</p>
      <ul class="mt-2 divide-y divide-navy-deep">${SITE.chambers.map((ch) => `<li><a href="${UI.url.appointment({ service: s.slug, chamber: ch.id })}" class="block py-3 transition duration-300 hover:text-teal focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40">
        <span class="block font-heading text-sm font-bold">${ch.name}</span>
        <span class="mt-0.5 block text-xs text-slate-300">${ch.days.join(', ')}, ${ch.time}</span>
        <span class="mt-1 block text-xs font-bold text-teal">New patient ${UI.money(ch.fee.new)}</span></a></li>`).join('')}</ul>
      <a href="${book}" class="${c.btnPrimary} mt-6 w-full">Book this service</a>
    </div>
    <div class="${c.cardTop} p-6">
      <h2 class="${c.h3}">Other services</h2>
      <ul class="mt-3">${S.filter((x) => x !== s).map((x) => `<li><a href="${UI.url.service(x.slug)}" class="flex min-h-[44px] items-center justify-between gap-3 border-b border-ice-2 text-sm font-semibold text-navy transition duration-300 hover:text-teal-dark">${x.title}${UI.icon('chevron-right', 'h-4 w-4')}</a></li>`).join('')}</ul>
    </div>
  </div></aside>`;

  UI.mount('#service-root', header +
    `<section class="${c.section}"><div class="${container} grid gap-10 lg:grid-cols-12 lg:gap-12">${main}${side}</div></section>` +
    `<section class="${c.sectionAlt}"><div class="${container}">${UI.sectionHead({ n: '02', eyebrow: 'Related services', title: 'More care from <span class="text-teal-dark">the same doctor</span>' })}
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${related.map((x, k) => UI.serviceCard(x, k)).join('')}</div></div></section>`);
})();
