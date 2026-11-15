(function () {
  'use strict';
  const { SITE, UI } = window;
  const c = UI.c;
  const d = SITE.doctor;

  const sections = [
    { t: 'Information we collect', p: ['We collect only what we need to look after you and run appointments.'], l: ['Your name, age and contact details', 'Appointment details such as service, chamber and date', 'Messages you send through the contact form, phone or WhatsApp'] },
    { t: 'How we use it', p: ['Your information is used to confirm and manage your visits, send SMS reminders and answer your questions.', 'We may also use it to improve our website and services.'] },
    { t: 'Medical confidentiality', p: ['Your health records are confidential and treated under the ethical duty that applies to every registered doctor.', 'Only the treating team can see your clinical details, and only when needed for your care.'] },
    { t: 'Cookies and analytics', p: ['This website uses small browser storage items to remember your sign-in and your last booking on your own device.', 'We may use basic, anonymous analytics to see which pages are useful. These do not identify you.'] },
    { t: 'Sharing of information', p: ['We never sell your personal information.'], l: ['Shared only with the treating team, laboratories or hospitals involved in your care', 'Disclosed when required by law or a lawful request from an authority'] },
    { t: 'Data security', p: ['We use access controls and secure systems to protect your information.', 'No online service is completely risk free, so please avoid sharing sensitive details in public messages.'] },
    { t: 'Retention', p: ['Medical records are kept for the period recommended for clinical care and by Bangladesh regulations.', 'Website enquiries are deleted once they are answered and no longer needed.'] },
    { t: 'Your rights', p: ['You may ask us at any time to:'], l: ['Access the information we hold about you', 'Correct anything that is wrong or out of date', 'Request deletion, where the law allows it'] },
    { t: "Children's privacy", p: ['Parents or guardians book and consent on behalf of patients under 18.', 'We do not knowingly collect information directly from children through this website.'] },
    { t: 'Contact for privacy questions', p: [`Write to <a class="font-semibold text-teal-dark underline underline-offset-4 transition hover:text-navy" href="mailto:${d.email}">${d.email}</a> or call <a class="font-semibold text-teal-dark underline underline-offset-4 transition hover:text-navy" href="${d.phoneHref}">${d.phone}</a>. We reply within 5 working days.`] }
  ];

  UI.mount('#page-head', UI.pageHeader({
    eyebrow: 'Legal',
    title: 'Privacy <span class="text-teal">Policy</span>',
    text: 'Last updated: 1 November 2026',
    photo: null,
    actions: `<div><button type="button" id="print-btn" class="${c.btnPrimary}">${UI.icon('printer', 'h-4 w-4')} Print</button></div>`
  }));

  const chipCls = 'inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-sm bg-ice px-4 py-2 text-xs font-bold text-navy transition duration-300 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40';
  const mobile = sections.map((s, i) => `<a href="#s${i + 1}" class="${chipCls}">${i + 1}. ${s.t}</a>`).join('');
  const desktop = sections.map((s, i) => `<li><a href="#s${i + 1}" data-toc="s${i + 1}" class="flex min-h-[44px] items-center gap-2 border-l-4 border-transparent px-3 py-2 text-sm font-semibold text-body transition duration-300 hover:text-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40"><span class="text-teal-dark">${i + 1}.</span>${s.t}</a></li>`).join('');
  UI.mount('#legal-toc', `<div class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:hidden" aria-label="Sections">${mobile}</div>
    <nav class="hidden rounded-md border border-ice-2 bg-ice p-5 lg:sticky lg:top-28 lg:block" aria-label="Privacy policy sections"><p class="${c.eyebrow}"><span class="h-2 w-2 bg-teal"></span>Contents</p><ol class="mt-3">${desktop}</ol></nav>`);

  const body = sections.map((s, i) => {
    const paras = s.p.map((t) => `<p class="mt-3 text-sm leading-relaxed text-body sm:text-base">${t}</p>`).join('');
    const list = s.l ? `<ul class="mt-3 space-y-2">${s.l.map((t) => `<li class="flex gap-3 text-sm leading-relaxed text-body sm:text-base"><span class="mt-2 h-2 w-2 shrink-0 bg-teal"></span><span>${t}</span></li>`).join('')}</ul>` : '';
    return `<section id="s${i + 1}" class="scroll-mt-28${i ? ' mt-8 border-t border-ice-2 pt-8' : ''}"><h2 class="font-heading text-xl font-extrabold text-navy sm:text-2xl"><span class="text-teal-dark">${i + 1}.</span> ${s.t}</h2>${paras}${list}</section>`;
  }).join('');
  UI.mount('#legal-body', `<div class="${c.card} p-6 sm:p-10">${body}</div>`);

  document.getElementById('print-btn').addEventListener('click', () => window.print());

  const links = [...document.querySelectorAll('[data-toc]')];
  const setActive = (id) => links.forEach((a) => {
    const on = a.dataset.toc === id;
    a.classList.toggle('border-teal', on);
    a.classList.toggle('bg-white', on);
    a.classList.toggle('text-navy', on);
    a.classList.toggle('border-transparent', !on);
  });
  setActive('s1');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('#legal-body section[id]').forEach((s) => io.observe(s));
  }
})();
