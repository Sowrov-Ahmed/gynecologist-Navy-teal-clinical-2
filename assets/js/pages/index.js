(function () {
  'use strict';
  const { SITE, UI, Art } = window;
  const D = SITE.doctor, c = UI.c, $ = (s) => document.querySelector(s);
  const status = UI.todayStatus();
  const arrow = UI.icon('arrow-right', 'h-4 w-4');
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chk = (t, dark) => `<li class="flex items-start gap-3"><span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-teal text-navy">${UI.icon('check', 'h-4 w-4')}</span><span class="font-semibold ${dark ? 'text-white' : 'text-navy'}">${t}</span></li>`;
  const pattern = (cls) => Art.pattern('pointer-events-none absolute inset-0 h-full w-full ' + cls);

  /* Hero */
  $('#hero-status').textContent = status.text;
  $('#hero-call').href = D.phoneHref;
  UI.mount('#hero-pattern', pattern('text-white/10'));
  UI.mount('#hero-photo', UI.photo('hallway', 'h-full w-full object-cover animate-kenburns', { eager: true }));
  UI.mount('#hero-points', D.points.map((p) => chk(p, true)).join(''));

  /* Quick-info strip */
  const cell = (icon, label, body) => `<div class="flex items-center gap-4 p-5"><span class="${c.iconWrap} shrink-0">${UI.icon(icon, 'h-6 w-6')}</span><div class="min-w-0"><p class="text-xs font-bold uppercase tracking-wider text-teal-dark">${label}</p>${body}</div></div>`;
  const val = 'font-heading text-base font-bold text-navy';
  UI.mount('#strip', `<div class="${c.cardTop} grid divide-y divide-ice-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0" data-reveal="up">
    ${cell('calendar-check', 'Next available', `<p class="${val}">${status.text}</p>`)}
    ${cell('phone', 'Call us', `<a href="${D.phoneHref}" class="${val} transition hover:text-teal-dark">${D.phone}</a>`)}
    ${cell('building', 'Three chambers', `<p class="${val}">${SITE.chambers.map((x) => cap(x.id)).join(', ')}</p>`)}
    <div class="flex items-center justify-between gap-4 p-5"><div><p class="text-xs font-bold uppercase tracking-wider text-teal-dark">Consultation from</p><p class="${val}">${UI.money(1200)}</p></div><a href="appointment.html" class="${c.btnPrimary} !px-4 !py-3">Book</a></div>
  </div>`);

  /* Ticker */
  const items = D.expertise.map((x) => (typeof x === 'string' ? x : x.title || x.name));
  const group = items.concat(items).map((x) => `<span class="flex items-center gap-8 pr-8 text-xs font-extrabold uppercase tracking-[0.2em] text-navy"><span class="whitespace-nowrap">${x}</span><span class="h-2 w-2 shrink-0 bg-navy"></span></span>`).join('');
  UI.mount('#ticker', `<div class="flex shrink-0 items-center py-3">${group}</div><div class="flex shrink-0 items-center py-3" aria-hidden="true">${group}</div>`);

  /* About */
  const tl = (list) => `<ol class="relative ml-2 border-l-2 border-ice-2">${list.slice(0, 4).map((i) => `<li class="relative pb-6 pl-8 last:pb-0"><span class="absolute -left-[7px] top-1.5 h-3 w-3 bg-teal"></span><p class="text-xs font-bold uppercase tracking-wider text-teal-dark">${i.year}</p><p class="font-heading font-bold text-navy">${i.title}</p><p class="text-sm">${i.place}</p></li>`).join('')}</ol>`;
  const tab = (id, panel, label, on) => `<button type="button" role="tab" id="${id}" aria-controls="${panel}" aria-selected="${on}" tabindex="${on ? 0 : -1}" class="-mb-px min-h-[44px] border-b-4 px-5 text-sm font-bold uppercase tracking-wide transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40 ${on ? 'border-teal text-navy' : 'border-transparent text-slate-600 hover:text-navy'}">${label}</button>`;
  UI.mount('#about-inner', `<div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
    <div class="lg:col-span-5" data-reveal="left"><div class="relative pb-4 pr-4"><div class="absolute bottom-0 left-4 right-0 top-4 bg-teal" aria-hidden="true"></div><div class="relative aspect-square overflow-hidden rounded-md bg-ice-2">${UI.photo('cutout', 'h-full w-full object-cover')}<span class="absolute bottom-0 left-0 bg-navy px-5 py-3 font-heading text-lg font-extrabold text-white">${D.experience}+ Years</span></div></div></div>
    <div class="lg:col-span-7" data-reveal="right">
      ${UI.sectionHead({ n: '01', eyebrow: 'About the doctor', title: `${D.name}, <span class="text-teal-dark">your specialist</span> in women's health` })}
      <p class="mt-5 ${c.lead}">${D.bio[0]}</p>
      <ul class="mt-6 space-y-3">${D.points.map((p) => chk(p)).join('')}</ul>
      <div class="mt-8"><div role="tablist" aria-label="Career" class="flex border-b border-ice-2">${tab('tab-exp', 'panel-exp', 'Experience', true)}${tab('tab-edu', 'panel-edu', 'Education', false)}</div>
        <div id="panel-exp" role="tabpanel" aria-labelledby="tab-exp" tabindex="0" class="pt-6">${tl(D.experienceList)}</div>
        <div id="panel-edu" role="tabpanel" aria-labelledby="tab-edu" tabindex="0" class="pt-6" hidden>${tl(D.education)}</div></div>
      <div class="mt-8 flex flex-wrap items-center gap-4"><a href="about.html" class="${c.btnNavy}">Know more ${arrow}</a><a href="${D.phoneHref}" class="inline-flex min-h-[44px] items-center gap-2 font-heading font-bold text-navy transition hover:text-teal-dark">${UI.icon('phone', 'h-5 w-5')}${D.phone}</a></div>
    </div></div>`);
  const tabs = [...document.querySelectorAll('#about [role=tab]')];
  const pick = (t) => tabs.forEach((b) => {
    const on = b === t;
    b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
    ['border-teal', 'text-navy'].forEach((k) => b.classList.toggle(k, on));
    ['border-transparent', 'text-slate-600'].forEach((k) => b.classList.toggle(k, !on));
    document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
  });
  tabs.forEach((b, i) => {
    b.addEventListener('click', () => pick(b));
    b.addEventListener('keydown', (e) => {
      const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (k === undefined) return;
      e.preventDefault(); const t = tabs[(k + tabs.length) % tabs.length]; pick(t); t.focus();
    });
  });

  /* Stats */
  const S = D.stats;
  const stat = [[S.experience, '+', 'Years of experience', 0], [S.patients, '+', 'Patients treated', 0], [S.deliveries, '+', 'Safe deliveries', 0], [S.surgeries, '+', 'Surgeries performed', 0], [S.rating, '', 'Patient rating', 1]];
  UI.mount('#stats-inner', `<div class="grid grid-cols-2 lg:grid-cols-5">${stat.map((s, i) => `<div class="border-t border-white/20 px-4 py-6 text-center first:border-t-0 lg:border-l lg:border-t-0 lg:first:border-l-0 [&:nth-child(2)]:border-t-0 lg:[&:nth-child(2)]:border-l ${i === 4 ? 'col-span-2 lg:col-span-1' : ''}" data-reveal="up" data-delay="${i * 100}"><p class="font-heading text-4xl font-extrabold text-teal"><span data-count="${s[0]}" data-suffix="${s[1]}" data-decimals="${s[3]}">${s[0].toLocaleString('en-US')}${s[1]}</span></p><p class="mt-1 text-xs font-bold uppercase tracking-wider text-white">${s[2]}</p></div>`).join('')}</div>`);

  /* Services, chambers */
  UI.mount('#services-inner', `${UI.sectionHead({ n: '02', eyebrow: 'Services', title: 'Care for <span class="text-teal-dark">every stage</span> of a woman\'s life', text: 'From the first antenatal visit to keyhole surgery, each plan is clear, personal and fairly priced.' })}
    <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">${SITE.services.slice(0, 3).map((s, i) => UI.serviceCard(s, i)).join('')}</div>
    <div class="mt-10"><a href="services.html" class="${c.btnOutline}">View all services ${arrow}</a></div>`);
  UI.mount('#chambers-inner', `${UI.sectionHead({ n: '03', eyebrow: 'Chambers', title: 'Three chambers, <span class="text-teal-dark">one standard</span> of care', text: 'Choose the hospital and day that suit you in Dhaka or Chattogram.' })}
    <div class="mt-12 grid gap-6 md:grid-cols-3">${SITE.chambers.map((x, i) => UI.chamberCard(x, i, { compact: true })).join('')}</div>
    <div class="mt-10"><a href="chambers.html" class="inline-flex min-h-[44px] items-center gap-2 border-b-2 border-teal font-heading font-bold text-navy transition hover:text-teal-dark">See all chambers ${arrow}</a></div>`);

  /* Appointment form */
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  const fld = (id, label, body) => `<div class="mb-4"><label for="${id}" class="${c.label}">${label}</label>${body}</div>`;
  UI.mount('#appt-pattern', pattern('text-white/10'));
  UI.mount('#appointment-inner', `<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
    <div class="relative pb-4 pr-4" data-reveal="wipe"><div class="absolute bottom-0 left-4 right-0 top-4 bg-teal" aria-hidden="true"></div><div class="relative aspect-[4/3] overflow-hidden rounded-md">${UI.photo('listening', 'h-full w-full object-cover')}</div></div>
    <div>${UI.sectionHead({ n: '04', eyebrow: 'Appointment', title: 'Book your <span class="text-teal">consultation</span>', text: 'Share your details and choose a chamber. You will confirm the time on the next step.', dark: true })}
      <form id="home-appt" novalidate class="mt-8 rounded-md bg-white p-6 shadow-offset sm:p-8" data-reveal="up">
        ${fld('ha-name', 'Full name', `<input id="ha-name" type="text" autocomplete="name" placeholder="Your full name" class="${c.input}">`)}
        ${fld('ha-phone', 'Mobile number', `<input id="ha-phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="01XXX-XXXXXX" class="${c.input}">`)}
        ${fld('ha-chamber', 'Chamber', `<select id="ha-chamber" class="${c.input}"><option value="">Select a chamber</option>${SITE.chambers.map((x) => `<option value="${x.id}">${x.area} · ${x.name}</option>`).join('')}</select>`)}
        ${fld('ha-date', 'Preferred date', `<input id="ha-date" type="date" min="${today}" class="${c.input}">`)}
        <button type="submit" class="${c.btnPrimary} mt-2 w-full">Continue to booking ${arrow}</button>
      </form></div></div>`);
  const f = document.getElementById('home-appt');
  const el = { name: f.querySelector('#ha-name'), phone: f.querySelector('#ha-phone'), chamber: f.querySelector('#ha-chamber'), date: f.querySelector('#ha-date') };
  Object.values(el).forEach((i) => ['input', 'change'].forEach((ev) => i.addEventListener(ev, () => UI.setError(i, ''))));
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = { name: el.name.value.trim(), phone: el.phone.value.trim(), chamber: el.chamber.value, date: el.date.value };
    const rules = [[el.name, v.name.length < 2, 'Enter your full name'], [el.phone, !UI.validate.phone(v.phone), 'Enter a valid Bangladesh mobile number'], [el.chamber, !v.chamber, 'Select a chamber'], [el.date, !v.date || v.date < today, 'Choose a date from today']];
    let first = null;
    rules.forEach(([i, bad, msg]) => { UI.setError(i, bad ? msg : ''); if (bad && !first) first = i; });
    if (first) return first.focus();
    location.href = UI.url.appointment(v);
  });

  /* Testimonials slider */
  const T = SITE.testimonials.slice(0, 6);
  const slide = (t) => `<article class="col-start-1 row-start-1 grid gap-6 border border-ice-2 border-l-4 border-l-teal bg-white p-6 opacity-0 shadow-card transition duration-500 motion-reduce:transition-none sm:p-10 md:grid-cols-[auto,1fr]" aria-roledescription="slide">
    <span class="${c.iconWrap}">${UI.icon('quote', 'h-7 w-7')}</span>
    <div><div class="flex text-amber-500">${UI.stars(t.rating)}</div><blockquote class="mt-4 font-heading text-lg font-semibold leading-snug text-navy sm:text-2xl">${t.text}</blockquote>
    <div class="mt-6 flex items-center gap-4"><span class="inline-flex h-12 w-12 items-center justify-center rounded bg-navy font-heading text-sm font-bold text-white">${t.initials}</span><div><p class="font-heading font-bold text-navy">${t.name}</p><p class="text-sm">${t.area} · ${t.service}</p></div></div></div></article>`;
  const sq = 'inline-flex h-11 w-11 items-center justify-center rounded transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40';
  UI.mount('#stories-inner', `${UI.sectionHead({ n: '05', eyebrow: 'Patient stories', title: 'Trusted by <span class="text-teal-dark">thousands of families</span>', text: `Rated ${S.rating} from ${S.reviews.toLocaleString('en-US')} patient reviews.` })}
    <div id="slider" class="mt-12" role="region" aria-roledescription="carousel" aria-label="Patient stories" tabindex="0">
      <div id="slides" class="grid overflow-hidden" aria-live="off">${T.map(slide).join('')}</div>
      <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap gap-2">${T.map((_, i) => `<button type="button" data-dot="${i}" aria-label="Show story ${i + 1}" class="${sq} text-xs font-bold">${i + 1}</button>`).join('')}</div>
        <div class="flex gap-2"><button type="button" id="prev" aria-label="Previous story" class="${sq} bg-navy text-white hover:bg-teal hover:text-navy">${UI.icon('arrow-left', 'h-5 w-5')}</button><button type="button" id="next" aria-label="Next story" class="${sq} bg-navy text-white hover:bg-teal hover:text-navy">${UI.icon('arrow-right', 'h-5 w-5')}</button></div>
      </div></div>
    <div class="mt-10"><a href="testimonials.html" class="${c.btnOutline}">Read all stories ${arrow}</a></div>`);
  const box = document.getElementById('slider'), slides = [...box.querySelectorAll('article')], dots = [...box.querySelectorAll('[data-dot]')];
  let cur = 0, timer = null, hold = false;
  const show = (n) => {
    cur = (n + T.length) % T.length;
    slides.forEach((s, i) => {
      const on = i === cur;
      s.classList.toggle('opacity-100', on); s.classList.toggle('opacity-0', !on);
      s.classList.toggle('translate-x-0', on); s.classList.toggle('pointer-events-none', !on);
      s.classList.toggle('translate-x-8', !on && i > cur); s.classList.toggle('-translate-x-8', !on && i < cur);
      s.setAttribute('aria-hidden', !on); s.toggleAttribute('inert', !on);
      s.setAttribute('aria-label', `${i + 1} of ${T.length}`);
    });
    dots.forEach((d, i) => {
      const on = i === cur;
      d.classList.toggle('bg-navy', on); d.classList.toggle('text-white', on); d.classList.toggle('bg-ice', !on); d.classList.toggle('text-navy', !on);
      d.classList.toggle('hover:bg-teal', !on);
      on ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current');
    });
  };
  const stop = () => { clearInterval(timer); timer = null; };
  const play = () => { stop(); if (!reduce && !hold) timer = setInterval(() => show(cur + 1), 7000); };
  const go = (n) => { show(n); play(); };
  show(0); play();
  box.querySelector('#prev').addEventListener('click', () => go(cur - 1));
  box.querySelector('#next').addEventListener('click', () => go(cur + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  box.addEventListener('mouseenter', () => { hold = true; stop(); });
  box.addEventListener('mouseleave', () => { hold = false; play(); });
  box.addEventListener('focusin', () => { hold = true; stop(); });
  box.addEventListener('focusout', (e) => { if (!box.contains(e.relatedTarget)) { hold = false; play(); } });
  box.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') go(cur - 1); if (e.key === 'ArrowRight') go(cur + 1); });

  /* Blog */
  const latest = [...SITE.posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  UI.mount('#blog-inner', `${UI.sectionHead({ n: '06', eyebrow: 'Health articles', title: 'Advice you can <span class="text-teal-dark">act on</span>', text: 'Short, clear guides written by Dr. Rukhsana Alam.' })}
    <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">${latest.map((p, i) => UI.postCard(p, i)).join('')}</div>
    <div class="mt-10"><a href="blog.html" class="${c.btnOutline}">View all articles ${arrow}</a></div>`);

  /* FAQs */
  UI.mount('#faqs-inner', `<div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
    <div class="lg:col-span-5">${UI.sectionHead({ n: '07', eyebrow: 'FAQs', title: 'Questions <span class="text-teal-dark">patients ask</span> most', text: 'Quick answers about booking, pregnancy care, treatments and payments.' })}
      <div class="relative mt-8 pb-4 pr-4" data-reveal="up"><div class="absolute bottom-0 left-4 right-0 top-4 bg-teal" aria-hidden="true"></div><div class="relative aspect-[4/3] overflow-hidden rounded-md">${UI.photo('tablet', 'h-full w-full object-cover transition duration-500 hover:scale-105')}</div></div>
      <div class="mt-8"><a href="faqs.html" class="${c.btnNavy}">More questions ${arrow}</a></div></div>
    <div class="lg:col-span-7"><div id="home-faq"></div></div></div>`);
  const fq = document.getElementById('home-faq');
  UI.faqAccordion(fq, SITE.faqs.slice(0, 5), { prefix: 'home-faq', openFirst: true });
  UI.refresh(fq);
})();
