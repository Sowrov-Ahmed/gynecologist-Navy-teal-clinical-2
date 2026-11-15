/* Shared layout: top bar, sticky header, drawer, footer, motion engine. Owned by the Team Lead. DO NOT EDIT. */
(function () {
  const S = window.SITE, UI = window.UI, C = UI.c, ic = UI.icon, d = S.doctor;
  const page = document.body.dataset.page || '';
  const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  let user = null;
  try { user = JSON.parse(localStorage.getItem('sh_user') || 'null'); } catch (e) { user = null; }
  const first = user && user.name ? user.name.split(' ')[0] : '';
  const initials = user && user.name ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : '';

  /* horizontal overflow guard: clip never creates a scroll container */
  ['overflow-x-hidden', 'overflow-x-clip'].forEach(c => { document.documentElement.classList.add(c); document.body.classList.add(c); });
  document.body.classList.add('max-w-full', 'bg-white');

  const bar = document.createElement('div');
  bar.setAttribute('aria-hidden', 'true');
  bar.className = 'fixed left-0 top-0 z-[70] h-1 w-full origin-left scale-x-0 bg-teal';
  document.body.prepend(bar);

  /* ---------- top utility bar + sticky header ---------- */
  const st = UI.todayStatus();
  const topBar = `<div class="bg-navy-deep text-xs text-slate-200">
    <div class="${C.container} flex items-center justify-between gap-4 py-2">
      <div class="flex min-w-0 items-center gap-5">
        <span class="hidden items-center gap-2 md:inline-flex"><span class="relative flex h-2.5 w-2.5"><span class="absolute inline-flex h-full w-full rounded-full ${st.open ? 'bg-teal animate-pulse-ring' : 'bg-amber-300'}"></span><span class="relative inline-flex h-2.5 w-2.5 rounded-full ${st.open ? 'bg-teal' : 'bg-amber-300'}"></span></span><span class="font-semibold text-white">${st.text}</span></span>
        <a href="${d.phoneHref}" class="inline-flex items-center gap-2 font-semibold transition hover:text-teal">${ic('phone', 'h-3.5 w-3.5 text-teal')}${d.phone}</a>
        <a href="mailto:${d.email}" class="hidden items-center gap-2 transition hover:text-teal lg:inline-flex">${ic('mail', 'h-3.5 w-3.5 text-teal')}${d.email}</a>
      </div>
      <div class="flex items-center gap-4">
        <div class="hidden items-center gap-3 sm:flex">${['facebook', 'linkedin', 'youtube'].map(k => `<a href="${d.social[k]}" target="_blank" rel="noopener" aria-label="${k}" class="transition hover:text-teal">${ic(k, 'h-3.5 w-3.5')}</a>`).join('')}</div>
        ${user ? `<span class="inline-flex items-center gap-2 font-semibold text-white"><span class="inline-flex h-6 w-6 items-center justify-center bg-teal text-[10px] font-extrabold text-navy">${initials}</span>${first}<button type="button" data-signout class="ml-1 text-slate-300 underline-offset-2 hover:text-teal hover:underline">Sign out</button></span>`
          : `<a href="auth.html" class="inline-flex items-center gap-1.5 font-semibold transition hover:text-teal ${page === 'auth' ? 'text-teal' : ''}">${ic('user', 'h-3.5 w-3.5')}Sign in</a>`}
      </div></div></div>`;

  const logo = (dark) => `<a href="index.html" class="flex items-center gap-3" aria-label="${d.name} home">
    <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center ${dark ? 'bg-teal text-navy' : 'bg-navy text-teal'} font-heading text-base font-extrabold">${d.initials}</span>
    <span class="leading-tight"><span class="block font-heading text-base font-extrabold ${dark ? 'text-white' : 'text-navy'}">${d.name}</span><span class="block text-[10px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-teal' : 'text-teal-dark'}">${d.role}</span></span></a>`;

  const links = S.nav.map(n => {
    const on = page === n.key;
    return `<li><a href="${n.href}" ${on ? 'aria-current="page"' : ''} class="relative block px-4 py-2 font-heading text-sm font-bold transition hover:text-teal-dark after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-teal after:transition after:duration-300 ${on ? 'text-teal-dark after:scale-x-100' : 'text-navy after:scale-x-0 hover:after:scale-x-100'}">${n.label}</a></li>`;
  }).join('');

  const drawerLinks = S.nav.map((n, i) => `<a href="${n.href}" ${page === n.key ? 'aria-current="page"' : ''} class="flex items-center gap-4 border-b border-white/10 py-4 font-heading text-lg font-bold transition hover:text-teal ${page === n.key ? 'text-teal' : 'text-white'}"><span class="text-xs font-extrabold text-teal">${String(i + 1).padStart(2, '0')}</span>${n.label}</a>`).join('');

  const header = `<header id="siteHeader" class="sticky top-0 z-50 border-b border-ice-2 bg-white transition duration-300">
    <div class="${C.container} flex h-[72px] items-center justify-between gap-4">
      ${logo(false)}
      <nav aria-label="Primary" class="hidden lg:block"><ul class="flex items-center gap-1">${links}</ul></nav>
      <div class="flex items-center gap-3">
        <a href="appointment.html" class="${C.btnPrimary} hidden !px-5 !py-3 sm:inline-flex">${ic('calendar', 'h-4 w-4')}Book Appointment</a>
        <button type="button" id="menuBtn" aria-expanded="false" aria-controls="drawer" aria-label="Open menu" class="inline-flex h-11 w-11 items-center justify-center border-2 border-navy text-navy transition hover:bg-navy hover:text-white lg:hidden">${ic('menu', 'h-5 w-5')}</button>
      </div></div></header>
    <div id="drawerOverlay" class="invisible fixed inset-0 z-[55] bg-navy-deep/70 opacity-0 transition-all duration-300 lg:hidden"></div>
    <aside id="drawer" aria-label="Menu" class="invisible fixed inset-y-0 right-0 z-[60] flex w-[86%] max-w-sm translate-x-full flex-col overflow-y-auto bg-navy p-6 text-white transition-all duration-300 lg:hidden">
      <div class="flex items-center justify-between">${logo(true)}<button type="button" id="drawerClose" aria-label="Close menu" class="inline-flex h-11 w-11 items-center justify-center border-2 border-white/40 text-white transition hover:bg-white hover:text-navy">${ic('x', 'h-5 w-5')}</button></div>
      <nav class="mt-8" aria-label="Mobile">${drawerLinks}${user ? '' : `<a href="auth.html" class="flex items-center gap-4 border-b border-white/10 py-4 font-heading text-lg font-bold text-white transition hover:text-teal"><span class="text-xs font-extrabold text-teal">06</span>Sign in / Sign up</a>`}</nav>
      <a href="appointment.html" class="${C.btnPrimary} mt-8 w-full">${ic('calendar', 'h-4 w-4')}Book Appointment</a>
      <div class="mt-auto pt-8 text-sm text-slate-300"><p class="font-semibold text-white">${d.phone}</p><p class="mt-1">${d.email}</p><p class="mt-3 text-xs text-teal">${st.text}</p></div>
    </aside>`;

  /* ---------- footer ---------- */
  const noCta = document.body.hasAttribute('data-no-cta');
  const cta = noCta ? '' : `<section class="relative overflow-hidden bg-teal">
    ${window.Art.pattern('pointer-events-none absolute inset-0 h-full w-full text-navy/10')}
    <div class="${C.container} relative flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
      <div data-reveal="left"><h2 class="font-heading text-2xl font-extrabold text-navy sm:text-3xl">Book your consultation today</h2><p class="mt-1 text-navy/80">Chambers in Gulshan, Mirpur and Chattogram. New patients are always welcome.</p></div>
      <div class="flex flex-wrap gap-3" data-reveal="right"><a href="appointment.html" class="${C.btnNavy}">${ic('calendar', 'h-4 w-4')}Book Appointment</a><a href="${d.phoneHref}" class="${C.btnOutline}">${ic('phone', 'h-4 w-4')}${d.phone}</a></div>
    </div></section>`;

  const social = Object.entries(d.social).map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener" aria-label="${k}" class="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-white transition duration-300 hover:border-teal hover:bg-teal hover:text-navy">${ic(k, 'h-4 w-4')}</a>`).join('');
  const svc = S.services.map(s => `<li><a href="${UI.url.service(s.slug)}" class="flex items-center gap-2 text-sm text-slate-300 transition hover:text-teal">${ic('chevron-right', 'h-3.5 w-3.5 text-teal')}${s.title}</a></li>`).join('');
  const hours = S.chambers.map(c => `<li class="border-b border-white/10 pb-3"><a href="${UI.url.chamber(c.id)}" class="block text-sm font-bold text-white transition hover:text-teal">${c.name}</a><span class="block text-xs text-slate-400">${c.area}, ${c.city}</span><span class="mt-1 block text-xs text-slate-300">${c.days.join(', ')} · ${c.time}</span></li>`).join('');
  const quick = [['About', 'about.html'], ['Chambers', 'chambers.html'], ['Blog', 'blog.html'], ['Testimonials', 'testimonials.html'], ['FAQs', 'faqs.html'], ['Appointment', 'appointment.html']].map(([l, h]) => `<li><a href="${h}" class="text-sm text-slate-300 transition hover:text-teal">${l}</a></li>`).join('');

  const footer = `${cta}<footer class="bg-navy-deep text-slate-300">
    <div class="${C.container} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
      <div class="lg:col-span-4">${logo(true)}
        <p class="mt-5 max-w-xs text-sm leading-relaxed">${d.tagline}</p>
        <p class="mt-5 text-xs font-bold uppercase tracking-widest text-teal">Call for appointment</p>
        <a href="${d.phoneHref}" class="font-heading text-2xl font-extrabold text-white transition hover:text-teal">${d.phone}</a>
        <p class="mt-4 text-xs text-slate-400">${d.degrees} · BMDC Reg. ${d.bmdc}</p>
        <div class="mt-5 flex gap-2">${social}</div></div>
      <div class="lg:col-span-3"><h3 class="font-heading text-base font-extrabold text-white">Services</h3><span class="mb-4 mt-2 block h-0.5 w-10 bg-teal"></span><ul class="space-y-2.5">${svc}</ul></div>
      <div class="lg:col-span-3"><h3 class="font-heading text-base font-extrabold text-white">Chamber hours</h3><span class="mb-4 mt-2 block h-0.5 w-10 bg-teal"></span><ul class="space-y-3">${hours}</ul></div>
      <div class="lg:col-span-2"><h3 class="font-heading text-base font-extrabold text-white">Quick links</h3><span class="mb-4 mt-2 block h-0.5 w-10 bg-teal"></span><ul class="space-y-2.5">${quick}</ul></div>
    </div>
    <div class="border-t border-white/10"><div class="${C.container} flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-400 sm:flex-row">
      <p>© ${new Date().getFullYear()} ${d.name}. All rights reserved.</p>
      <div class="flex gap-5"><a href="terms.html" class="transition hover:text-teal">Terms &amp; Conditions</a><a href="privacy.html" class="transition hover:text-teal">Privacy Policy</a></div></div></div></footer>`;

  const hh = document.getElementById('site-header'), fh = document.getElementById('site-footer');
  if (hh) hh.outerHTML = topBar + header;
  if (fh) fh.outerHTML = footer;

  const top = document.createElement('button');
  top.type = 'button';
  top.setAttribute('aria-label', 'Back to top');
  top.className = 'pointer-events-none fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 translate-y-4 items-center justify-center bg-teal text-navy opacity-0 shadow-card-lg transition duration-300 hover:bg-navy hover:text-white';
  top.innerHTML = ic('arrow-up', 'h-5 w-5');
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  document.body.appendChild(top);

  /* ---------- interactions ---------- */
  const drawer = document.getElementById('drawer'), overlay = document.getElementById('drawerOverlay'), menuBtn = document.getElementById('menuBtn'), hdr = document.getElementById('siteHeader');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('translate-x-full', !open); drawer.classList.toggle('invisible', !open);
    overlay.classList.toggle('opacity-0', !open); overlay.classList.toggle('invisible', !open);
    document.body.classList.toggle('overflow-hidden', open);
    menuBtn.setAttribute('aria-expanded', open);
    if (open) document.getElementById('drawerClose').focus(); else if (document.activeElement && drawer.contains(document.activeElement)) menuBtn.focus();
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', () => setDrawer(true));
    document.getElementById('drawerClose').addEventListener('click', () => setDrawer(false));
    overlay.addEventListener('click', () => setDrawer(false));
    drawer.addEventListener('click', e => { if (e.target.closest('a')) setDrawer(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setDrawer(false); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setDrawer(false); });
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-signout]')) { localStorage.removeItem('sh_user'); UI.toast('You have been signed out.'); setTimeout(() => location.reload(), 900); }
  });

  /* ---------- motion engine ---------- */
  const HIDE = { up: 'opacity-0 translate-y-8', down: 'opacity-0 -translate-y-8', left: 'opacity-0 -translate-x-10', right: 'opacity-0 translate-x-10', zoom: 'opacity-0 scale-95', fade: 'opacity-0', wipe: '[clip-path:inset(0_100%_0_0)]' };
  const BASE = ['transition-all', 'duration-700', 'ease-out'];
  const SHOWN = ['opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100', '[clip-path:inset(0_0_0_0)]'];

  function runCounter(el) {
    const target = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 0), suf = el.dataset.suffix || '', t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / 1600, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function show(el) {
    const kind = el.dataset.reveal;
    if (!kind) return;
    (HIDE[kind] || HIDE.up).split(' ').forEach(c => el.classList.remove(c));
    SHOWN.forEach(c => el.classList.add(c));
    setTimeout(() => { BASE.concat(SHOWN).forEach(c => el.classList.remove(c)); el.style.transitionDelay = ''; }, 900 + (+el.dataset.delay || 0));
  }

  /* a fully clipped element (wipe) never intersects, so its parent is observed instead */
  const proxied = new Map();
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      if (en.target.dataset.count) runCounter(en.target);
      show(en.target);
      (proxied.get(en.target) || []).forEach(show);
      proxied.delete(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;

  const par = [];
  function refresh(root) {
    root = root || document;
    root.querySelectorAll('.animate-marquee').forEach(el => { if (el.parentElement) el.parentElement.classList.add('overflow-hidden'); });
    root.querySelectorAll('[data-reveal]:not([data-rv])').forEach(el => {
      el.dataset.rv = '1';
      if (reduce || !io) return;
      el.classList.add(...BASE, ...(HIDE[el.dataset.reveal] || HIDE.up).split(' '));
      if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + 'ms';
      if (el.dataset.reveal === 'wipe' && el.parentElement) {
        const host = el.parentElement;
        proxied.set(host, (proxied.get(host) || []).concat(el));
        io.observe(host);
      } else io.observe(el);
    });
    root.querySelectorAll('[data-count]:not([data-ct])').forEach(el => {
      el.dataset.ct = '1';
      if (reduce || !io) { el.textContent = (+el.dataset.count).toLocaleString('en-US', { minimumFractionDigits: +(el.dataset.decimals || 0) }) + (el.dataset.suffix || ''); return; }
      if (!el.dataset.rv) io.observe(el);
    });
    root.querySelectorAll('[data-parallax]:not([data-pl])').forEach(el => { el.dataset.pl = '1'; if (!reduce) par.push(el); });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? Math.min(y / h, 1) : 0})`;
      if (hdr) hdr.classList.toggle('shadow-card-lg', y > 60);
      const on = y > 600;
      ['pointer-events-none', 'translate-y-4', 'opacity-0'].forEach(c => top.classList.toggle(c, !on));
      par.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        const off = (r.top + r.height / 2 - window.innerHeight / 2) * -(parseFloat(el.dataset.parallax) || 0.08);
        el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
      });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  UI.refresh = refresh;
  refresh(document);
  onScroll();
})();
