(function () {
  'use strict';
  const d = SITE.doctor, c = UI.c;
  const fees = SITE.chambers.map((x) => `${x.area}: new ${UI.money(x.fee.new)}, follow-up ${UI.money(x.fee.followup)}`);
  const sections = [
    { t: 'Acceptance of terms', p: ['By using this website or booking a consultation with Dr. Rukhsana Alam, you agree to these Terms & Conditions.', 'If you do not agree, please do not use the website or book an appointment. We may update these terms, and the date above shows the latest version.'] },
    { t: 'Medical information disclaimer', p: ['Articles, FAQs and service pages are for education only. They are not a substitute for a consultation, diagnosis or treatment.'], l: ['Never delay or ignore medical advice because of something you read here.', 'In an emergency, such as heavy bleeding, severe pain or reduced baby movements, go to the nearest hospital or call 999.'] },
    { t: 'Appointments and cancellations', p: ['Appointments are confirmed by SMS once you book online or by phone. Please arrive 15 minutes early.', 'To cancel or reschedule, give at least 12 hours\' notice through the website or by calling the chamber. Late cancellations and repeated missed visits may limit future online booking.'] },
    { t: 'Fees and payments', p: ['All fees are in Bangladeshi Taka (৳) and are payable at the chamber. We accept cash, bKash, Nagad and major debit and credit cards.', 'Consultation fees are as listed for each chamber:'], l: fees.concat(['Investigations, procedures and hospital charges are billed separately and explained beforehand.']) },
    { t: 'Patient responsibilities', p: ['Good care depends on accurate information. Please help us by following these points.'], l: ['Provide correct personal, medical and medication details.', 'Bring previous reports, prescriptions and your pregnancy or antenatal card.', 'Follow the advice given and report any new symptoms promptly.', 'Treat staff and other patients with courtesy.'] },
    { t: 'Website use and accounts', p: ['You may use this website for lawful, personal purposes. Do not attempt to disrupt it, copy it in bulk or access areas that are not meant for you.', 'If you create an account, keep your password private. You are responsible for activity under your account, and you can ask us to close it at any time.'] },
    { t: 'Intellectual property', p: ['Text, photographs, illustrations, logos and design on this website belong to Dr. Rukhsana Alam or are used with permission.', 'You may print pages for personal use. Any other copying or republishing needs our written consent.'] },
    { t: 'Limitation of liability', p: ['We take care to keep the website accurate and available, but we cannot promise it will be free of errors or interruptions.', 'To the extent permitted by law, we are not liable for loss arising from reliance on website content or from links to third-party sites. Nothing here limits liability that cannot be excluded by law.'] },
    { t: 'Governing law', p: ['These terms are governed by the laws of Bangladesh. Any dispute will fall under the jurisdiction of the courts of Dhaka, after both sides have tried in good faith to resolve it directly.'] },
    { t: 'Contact', p: ['Questions about these terms can be sent to us at any time.'], l: [`Email: <a href="mailto:${d.email}" class="font-semibold text-navy underline underline-offset-4 hover:text-teal-dark">${d.email}</a>`, `Phone: <a href="${d.phoneHref}" class="font-semibold text-navy underline underline-offset-4 hover:text-teal-dark">${d.phone}</a>`] }
  ];

  UI.mount('#page-head', UI.pageHeader({
    eyebrow: 'Legal',
    title: 'Terms & <span class="text-teal">Conditions</span>',
    text: 'Last updated: 1 November 2026',
    photo: null,
    actions: `<button type="button" id="print-btn" class="${c.btnPrimary}">${UI.icon('printer', 'h-4 w-4')}Print</button>`
  }));
  document.getElementById('print-btn').addEventListener('click', () => window.print());

  const base = 'inline-flex min-h-11 shrink-0 items-center gap-2 border-l-4 px-3 py-2 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40';
  const off = 'border-l-transparent bg-ice text-body hover:text-navy lg:bg-transparent';
  const on = 'border-l-teal bg-white text-navy lg:bg-white';
  UI.mount('#toc', `<p class="mb-3 hidden text-xs font-bold uppercase tracking-[0.2em] text-teal-dark lg:block">Contents</p>
    <ol class="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">${sections.map((s, i) => `<li class="shrink-0"><a href="#s${i + 1}" data-toc="s${i + 1}" class="${base} ${off}"><span class="font-heading font-extrabold text-teal-dark">${i + 1}.</span>${s.t}</a></li>`).join('')}</ol>`);

  UI.mount('#legal', sections.map((s, i) => `<section id="s${i + 1}" class="scroll-mt-28 ${i ? 'mt-8 border-t border-ice-2 pt-8' : ''}">
    <h2 class="font-heading text-xl font-extrabold text-navy sm:text-2xl"><span class="text-teal-dark">${i + 1}.</span> ${s.t}</h2>
    ${s.p.map((t) => `<p class="mt-3 text-sm leading-relaxed text-body sm:text-base">${t}</p>`).join('')}
    ${s.l ? `<ul class="mt-3 space-y-2">${s.l.map((t) => `<li class="flex items-start gap-3 text-sm leading-relaxed text-body sm:text-base"><span class="mt-2 h-2 w-2 shrink-0 bg-teal" aria-hidden="true"></span><span>${t}</span></li>`).join('')}</ul>` : ''}
  </section>`).join(''));

  const links = [...document.querySelectorAll('[data-toc]')];
  function mark(id) {
    links.forEach((a) => {
      const active = a.dataset.toc === id;
      a.className = `${base} ${active ? on : off}`;
      if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      if (active && window.innerWidth < 1024) {
        const box = a.closest('ol');
        box.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
      }
    });
  }
  mark('s1');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) mark(e.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('#legal section').forEach((s) => io.observe(s));
  }
})();
