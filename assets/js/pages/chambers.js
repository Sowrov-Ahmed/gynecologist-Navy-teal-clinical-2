(function () {
  'use strict';
  const S = window.SITE, c = UI.c, ch = S.chambers;
  const order = [6, 0, 1, 2, 3, 4, 5];
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  const tel = (p) => 'tel:' + String(p).replace(/[^\d+]/g, '');
  const ring = ['ring-4', 'ring-teal', 'ring-offset-8', 'ring-offset-ice'];

  UI.mount('#page-head', UI.pageHeader({
    eyebrow: 'Chambers',
    title: 'Consult at a chamber <span class="text-teal">near you</span>',
    text: 'Three chambers in Dhaka and Chattogram, each with fixed weekly hours, clear fees and online booking. Pick the day and place that suit you.',
    photo: 'window',
    actions: `<div class="flex flex-wrap gap-3"><a href="appointment.html" class="${c.btnPrimary}">Book an appointment ${UI.icon('arrow-right', 'h-4 w-4')}</a><a href="contact.html" class="${c.btnOutlineLight}">Contact us</a></div>`
  }));

  UI.mount('#schedule-head', UI.sectionHead({
    n: '01', eyebrow: 'Weekly schedule',
    title: 'Find your <span class="text-teal-dark">consultation day</span>',
    text: 'Timings are for new and follow-up visits. Please arrive 15 minutes early to complete registration.'
  }));

  const head = ch.map((x) => `<th scope="col" class="px-4 py-3 text-left font-heading text-xs font-bold uppercase tracking-wider"><a href="chambers.html#${x.id}" class="underline-offset-4 hover:underline">${x.area}</a><span class="mt-0.5 block text-[11px] font-medium normal-case tracking-normal text-ice-2">${x.name}</span></th>`).join('');
  const rows = order.map((d) => {
    const t = d === today;
    const cells = ch.map((x) => x.weekdays.includes(d)
      ? `<td class="p-2"><div class="rounded-sm bg-teal-soft px-3 py-2.5 text-sm font-semibold text-navy">${x.time}</div></td>`
      : '<td class="p-2"><div class="px-3 py-2.5 text-sm text-slate-500">Closed</div></td>').join('');
    return `<tr class="border-t border-ice-2 ${t ? 'bg-ice' : 'bg-white'}"><th scope="row" class="whitespace-nowrap border-l-4 ${t ? 'border-l-navy' : 'border-l-transparent'} px-4 py-4 text-left font-heading text-sm font-bold text-navy">${names[d]}${t ? ' <span class="ml-2 rounded-sm bg-navy px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Today</span>' : ''}</th>${cells}</tr>`;
  }).join('');
  UI.mount('#schedule-body', `<div data-reveal="up" class="overflow-x-auto rounded-md border border-ice-2 shadow-card"><table class="w-full min-w-[680px] border-collapse text-left"><caption class="sr-only">Weekly chamber schedule, Saturday to Friday</caption><thead class="bg-navy text-white"><tr><th scope="col" class="px-4 py-3 text-left font-heading text-xs font-bold uppercase tracking-wider">Day</th>${head}</tr></thead><tbody>${rows}</tbody></table></div>
  <p class="mt-4 flex items-start gap-2 text-sm text-body">${UI.icon('clock', 'mt-0.5 h-4 w-4 shrink-0 text-teal-dark')}<span>Booked patients are seen in ${ch[0].slotMin}-minute slots. Walk-ins are seen after booked patients.</span></p>`);

  UI.mount('#locations-head', UI.sectionHead({
    n: '02', eyebrow: 'Locations',
    title: 'Three chambers, <span class="text-teal-dark">one standard of care</span>'
  }));

  const strip = `<nav aria-label="Jump to a chamber" class="sticky top-20 z-20 mb-12 flex gap-2 overflow-x-auto rounded-md border border-ice-2 bg-white p-2 shadow-card">${ch.map((x) => `<a href="#${x.id}" data-jump="${x.id}" class="inline-flex min-h-11 shrink-0 items-center gap-2 rounded px-4 text-xs font-bold uppercase tracking-wide text-navy transition duration-300 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40 sm:flex-1 sm:justify-center">${UI.icon('pin', 'h-4 w-4')}${x.area}</a>`).join('')}</nav>`;

  const block = (x, i) => {
    const left = i % 2 === 0;
    const frame = `<div class="${left ? 'lg:col-span-6' : 'lg:col-span-6 lg:order-2'}" data-reveal="${left ? 'left' : 'right'}"><div class="relative ${left ? 'pb-3 pr-3' : 'pb-3 pl-3'}"><span class="absolute bottom-0 top-3 bg-teal ${left ? 'left-3 right-0' : 'left-0 right-3'}" aria-hidden="true"></span><div class="relative aspect-square overflow-hidden border-2 border-navy bg-ice-2"><iframe src="${x.mapEmbed}" title="Map of ${x.name}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="absolute inset-0 h-full w-full border-0"></iframe></div></div></div>`;
    const feats = x.features.map((f) => `<li class="flex items-start gap-2.5 text-sm text-body"><span class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-teal text-navy">${UI.icon('check', 'h-3 w-3')}</span>${f}</li>`).join('');
    const panel = `<div class="${left ? 'lg:col-span-6' : 'lg:col-span-6 lg:order-1'}" data-reveal="${left ? 'right' : 'left'}"><div class="${c.cardTop} p-6 sm:p-8">
      <span class="${c.chip}">${UI.icon('pin', 'h-3.5 w-3.5')}${x.area}, ${x.city}</span>
      <h3 class="mt-4 font-heading text-2xl font-extrabold text-navy">${x.name}</h3>
      <span class="${c.bar} mt-3"></span>
      <p class="mt-4 flex items-start gap-2 text-sm text-body sm:text-base">${UI.icon('building', 'mt-0.5 h-5 w-5 shrink-0 text-teal-dark')}${x.address}</p>
      <div class="mt-5 flex flex-wrap gap-2" aria-label="Consultation days">${x.days.map((d) => `<span class="${c.chip} ${c.chipActive}">${d}</span>`).join('')}</div>
      <p class="mt-4 flex items-center gap-2 font-heading text-lg font-bold text-navy">${UI.icon('clock', 'h-5 w-5 text-teal-dark')}${x.time}</p>
      <div class="mt-5 grid grid-cols-2 divide-x divide-ice-2 border border-ice-2">
        <div class="p-4"><p class="text-xs font-bold uppercase tracking-wider text-teal-dark">New patient</p><p class="mt-1 font-heading text-2xl font-extrabold text-navy">${UI.money(x.fee.new)}</p></div>
        <div class="p-4"><p class="text-xs font-bold uppercase tracking-wider text-teal-dark">Follow-up</p><p class="mt-1 font-heading text-2xl font-extrabold text-navy">${UI.money(x.fee.followup)}</p></div>
      </div>
      <ul class="mt-5 space-y-2.5">${feats}</ul>
      <p class="${c.panelIce} mt-5 !p-4 text-sm text-body">${x.note}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a href="${UI.url.appointment({ chamber: x.id })}" class="${c.btnPrimary}">Book here ${UI.icon('arrow-right', 'h-4 w-4')}</a>
        <a href="${x.mapLink}" target="_blank" rel="noopener" class="${c.btnOutline}">${UI.icon('navigation', 'h-4 w-4')}Directions</a>
        <a href="${tel(x.phone)}" class="${c.btnNavy}">${UI.icon('phone', 'h-4 w-4')}Call</a>
      </div></div></div>`;
    return `<article id="${x.id}" class="scroll-mt-28 grid items-center gap-8 rounded-md transition duration-300 lg:grid-cols-12 lg:gap-12" aria-label="${x.name}">${frame}${panel}</article>`;
  };
  UI.mount('#locations-body', strip + `<div class="space-y-16 lg:space-y-24">${ch.map(block).join('')}</div>`);

  let timer;
  function focusHash() {
    const id = location.hash.slice(1);
    const el = ch.some((x) => x.id === id) && document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add(...ring);
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove(...ring), 1500);
  }
  document.querySelectorAll('[data-jump]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, '', '#' + a.dataset.jump);
    focusHash();
  }));
  window.addEventListener('hashchange', focusHash);
  if (location.hash) setTimeout(focusHash, 200);
})();
