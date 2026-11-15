(function () {
  'use strict';
  const S = window.SITE, d = S.doctor, c = UI.c, ch = S.chambers;
  const tel = (p) => 'tel:' + String(p).replace(/[^\d+]/g, '');

  UI.mount('#page-head', UI.pageHeader({
    eyebrow: 'Contact',
    title: 'Let us <span class="text-teal">help you</span>',
    text: 'Questions about appointments, reports or treatment? Call, message or write to us and our team will respond promptly.',
    photo: 'hallway'
  }));
  UI.mount('#reach-head', UI.sectionHead({
    n: '01', eyebrow: 'Get in touch',
    title: 'Talk to <span class="text-teal-dark">our team</span>'
  }));

  const row = (icon, label, body) => `<li class="flex items-start gap-4"><span class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded bg-teal text-navy">${UI.icon(icon, 'h-5 w-5')}</span><div class="min-w-0"><p class="text-xs font-bold uppercase tracking-wider text-teal-dark">${label}</p><div class="mt-0.5 break-words font-heading text-base font-bold text-navy">${body}</div></div></li>`;
  const link = 'underline-offset-4 transition duration-300 hover:text-teal-dark hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40';
  const st = UI.todayStatus();
  const waHref = /^https?:/.test(d.whatsapp) ? d.whatsapp : 'https://wa.me/' + String(d.whatsapp).replace(/\D/g, '');
  const soc = [['facebook', 'Facebook'], ['linkedin', 'LinkedIn'], ['youtube', 'YouTube'], ['instagram', 'Instagram']]
    .filter(([k]) => d.social[k])
    .map(([k, n]) => `<a href="${d.social[k]}" target="_blank" rel="noopener" aria-label="${n}" class="inline-flex h-11 w-11 items-center justify-center rounded bg-navy text-white transition duration-300 hover:bg-teal hover:text-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-navy/30">${UI.icon(k, 'h-5 w-5')}</a>`).join('');

  UI.mount('#contact-info', `<div data-reveal="left"><ul class="space-y-6">
    ${row('phone', 'Call', `<a href="${d.phoneHref}" class="${link}">${d.phone}</a>`)}
    ${row('whatsapp', 'WhatsApp', `<a href="${waHref}" target="_blank" rel="noopener" class="${link}">Message on WhatsApp</a>`)}
    ${row('mail', 'Email', `<a href="mailto:${d.email}" class="${link}">${d.email}</a>`)}
    ${row('clock', 'Today at the chambers', `<span id="today-status">${st.text}</span>`)}
  </ul>
  <div class="${c.panelIce} mt-8 border-l-4 border-l-navy"><p class="flex items-start gap-3 text-sm leading-relaxed text-body">${UI.icon('alert', 'mt-0.5 h-5 w-5 shrink-0 text-navy')}<span><strong class="text-navy">Emergency?</strong> For obstetric emergencies go to the nearest hospital or call 999. Do not wait for a reply to this form.</span></p></div>
  <div class="mt-8"><p class="text-xs font-bold uppercase tracking-wider text-teal-dark">Follow us</p><div class="mt-3 flex flex-wrap gap-3">${soc}</div></div></div>`);

  UI.mount('#map-head', UI.sectionHead({
    n: '02', eyebrow: 'Find us',
    title: 'Visit a <span class="text-teal-dark">chamber</span>'
  }));
  UI.mount('#map-body', `<div class="grid gap-6 lg:grid-cols-12" data-reveal="up">
    <div class="lg:col-span-7"><div role="tablist" aria-label="Choose a chamber" class="mb-4 flex gap-2 overflow-x-auto pb-1">${ch.map((x, i) => `<button type="button" role="tab" id="tab-${x.id}" data-tab="${x.id}" aria-selected="${i === 0}" aria-controls="map-panel" tabindex="${i === 0 ? 0 : -1}" class="inline-flex min-h-11 shrink-0 items-center gap-2 rounded px-5 text-xs font-bold uppercase tracking-wide transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40 ${i === 0 ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-teal'}">${UI.icon('pin', 'h-4 w-4')}${x.area}</button>`).join('')}</div>
    <div class="relative aspect-[4/3] overflow-hidden border-2 border-navy bg-ice-2"><iframe id="map-frame" src="${ch[0].mapEmbed}" title="Map of ${ch[0].name}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="absolute inset-0 h-full w-full border-0"></iframe></div></div>
    <div id="map-panel" role="tabpanel" aria-labelledby="tab-${ch[0].id}" class="lg:col-span-5"></div></div>`);

  const frame = document.getElementById('map-frame'), panel = document.getElementById('map-panel');
  const tabs = [...document.querySelectorAll('[data-tab]')];
  function show(id) {
    const x = UI.find.chamber(id) || ch[0];
    tabs.forEach((t) => {
      const on = t.dataset.tab === x.id;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      t.classList.toggle('bg-navy', on); t.classList.toggle('text-white', on);
      t.classList.toggle('bg-white', !on); t.classList.toggle('text-navy', !on);
    });
    frame.src = x.mapEmbed; frame.title = 'Map of ' + x.name;
    panel.setAttribute('aria-labelledby', 'tab-' + x.id);
    panel.innerHTML = `<div class="${c.panelNavy} h-full"><span class="${c.chip}">${x.area}, ${x.city}</span><h3 class="mt-4 font-heading text-2xl font-extrabold text-white">${x.name}</h3><span class="mt-3 block h-1 w-16 bg-teal"></span>
      <dl class="mt-6 space-y-4 text-sm">
        <div class="flex gap-3"><dt class="shrink-0 text-teal">${UI.icon('building', 'h-5 w-5')}<span class="sr-only">Address</span></dt><dd class="text-ice-2">${x.address}</dd></div>
        <div class="flex gap-3"><dt class="shrink-0 text-teal">${UI.icon('calendar', 'h-5 w-5')}<span class="sr-only">Days</span></dt><dd class="text-ice-2">${x.days.join(', ')}</dd></div>
        <div class="flex gap-3"><dt class="shrink-0 text-teal">${UI.icon('clock', 'h-5 w-5')}<span class="sr-only">Time</span></dt><dd class="text-ice-2">${x.time}</dd></div>
        <div class="flex gap-3"><dt class="shrink-0 text-teal">${UI.icon('phone', 'h-5 w-5')}<span class="sr-only">Phone</span></dt><dd><a href="${tel(x.phone)}" class="font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30">${x.phone}</a></dd></div>
      </dl>
      <div class="mt-7 flex flex-wrap gap-3"><a href="${UI.url.appointment({ chamber: x.id })}" class="${c.btnPrimary}">Book here</a><a href="chambers.html#${x.id}" class="${c.btnOutlineLight}">Full details</a></div></div>`;
    UI.refresh(panel);
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(t.dataset.tab));
    t.addEventListener('keydown', (e) => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!k) return;
      const n = tabs[(i + k + tabs.length) % tabs.length];
      n.focus(); show(n.dataset.tab);
    });
  });
  show(ch[0].id);

  const form = document.getElementById('contact-form'), ok = document.getElementById('cf-success');
  const f = { name: form.name, phone: form.phone, email: form.email, subject: form.subject, message: form.message };
  const count = document.getElementById('cf-count');
  f.message.addEventListener('input', () => {
    const n = f.message.value.length;
    count.textContent = n + ' / 500';
    count.classList.toggle('text-rose-600', n >= 480);
    count.classList.toggle('text-slate-500', n < 480);
  });
  const rules = {
    name: (v) => (v.trim().length < 2 ? 'Please enter your full name.' : ''),
    phone: (v) => (UI.validate.phone(v.trim()) ? '' : 'Enter a valid Bangladesh mobile number, e.g. 01819-336472.'),
    email: (v) => (UI.validate.email(v.trim()) ? '' : 'Enter a valid email address.'),
    subject: (v) => (v ? '' : 'Please choose a subject.'),
    message: (v) => (v.trim().length < 10 ? 'Please write at least 10 characters.' : '')
  };
  Object.keys(rules).forEach((k) => {
    f[k].addEventListener('blur', () => UI.setError(f[k], rules[k](f[k].value)));
    f[k].addEventListener('input', () => { if (f[k].getAttribute('aria-invalid') === 'true') UI.setError(f[k], rules[k](f[k].value)); });
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let first = null;
    Object.keys(rules).forEach((k) => {
      const m = rules[k](f[k].value);
      UI.setError(f[k], m);
      if (m && !first) first = f[k];
    });
    if (first) { first.focus(); UI.toast('Please correct the highlighted fields.', 'error'); return; }
    const first1 = f.name.value.trim().split(/\s+/)[0];
    ok.innerHTML = `<div class="py-6 text-center sm:py-10"><span class="mx-auto inline-flex h-16 w-16 items-center justify-center rounded bg-teal text-navy">${UI.icon('check', 'h-8 w-8')}</span><h2 class="mt-5 font-heading text-2xl font-extrabold text-navy">Thank you, ${first1}</h2><p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-body">Your message about "${f.subject.value}" has been received. Our team will reply by phone or email within one working day.</p><button type="button" id="cf-again" class="${c.btnOutline} mt-6">Send another</button></div>`;
    form.classList.add('hidden');
    ok.classList.remove('hidden');
    UI.refresh(ok);
    ok.focus();
    UI.toast('Message sent. We will reply within one working day.', 'success');
    document.getElementById('cf-again').addEventListener('click', () => {
      form.reset();
      Object.values(f).forEach((el) => UI.setError(el, ''));
      count.textContent = '0 / 500';
      ok.classList.add('hidden');
      form.classList.remove('hidden');
      f.name.focus();
    });
  });
})();
