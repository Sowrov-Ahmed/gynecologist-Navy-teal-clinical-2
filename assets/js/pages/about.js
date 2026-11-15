(function () {
  const d = SITE.doctor;
  const c = UI.c;
  const ic = UI.icon;
  const txt = (x) => (typeof x === 'string' ? x : x.title || x.name || x.text || '');
  const wrap = (inner) => `<div class="${c.container}">${inner}</div>`;

  UI.mount('#page-head', UI.pageHeader({
    eyebrow: 'About the doctor',
    title: 'Meet <span class="text-teal">Dr. Rukhsana Alam</span>',
    text: d.bio[0],
    photo: 'cutout',
    actions: `<div class="flex flex-wrap gap-3">
      <a href="appointment.html" class="${c.btnPrimary}">Book Appointment ${ic('arrow-right', 'h-4 w-4')}</a>
      <a href="${d.phoneHref}" class="${c.btnOutlineLight}">${ic('phone', 'h-4 w-4')} Call ${d.phone}</a>
    </div>`
  }));

  /* 01 Philosophy */
  const values = d.values.map((v, i) => `
    <article class="${c.cardTop} ${c.cardHover} p-6 sm:p-8" data-reveal="up" data-delay="${i * 120}">
      <div class="flex items-start justify-between">
        <span class="${c.iconWrap}">${ic(v.icon, 'h-6 w-6')}</span>
        <span class="font-heading text-4xl font-extrabold text-slate-300">0${i + 1}</span>
      </div>
      <h3 class="${c.h3} mt-6">${v.title}</h3>
      <p class="mt-3 text-sm leading-relaxed">${v.text}</p>
    </article>`).join('');

  UI.mount('#philosophy', wrap(`
    ${UI.sectionHead({ n: '01', eyebrow: 'Philosophy', title: 'Care that starts with <span class="text-teal-dark">listening</span>' })}
    <div class="relative mt-10 md:mb-14">
      <div class="relative aspect-[4/3] overflow-hidden rounded-md sm:aspect-[16/9] lg:aspect-[21/9]" data-reveal="wipe">
        ${UI.photo('window', 'h-full w-full object-cover')}
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent"></div>
      </div>
      <figure class="relative z-10 mx-4 -mt-10 rounded-md bg-navy p-6 text-white shadow-offset sm:mx-6 md:absolute md:-bottom-14 md:left-8 md:mx-0 md:mt-0 md:max-w-md">
        <span class="mb-3 inline-flex h-10 w-10 items-center justify-center rounded bg-teal text-navy">${ic('quote', 'h-5 w-5')}</span>
        <blockquote class="font-heading text-lg font-bold leading-snug">I listen first. The right treatment always begins with the patient's own story.</blockquote>
        <figcaption class="mt-4 border-t border-white/20 pt-3 text-sm"><span class="font-bold text-teal">${d.name}</span><br><span class="text-white/80">${d.degrees}</span></figcaption>
      </figure>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-3">${values}</div>`));

  /* 02 Journey */
  const timeline = (title, items) => `
    <div>
      <h3 class="${c.h3} mb-8 flex items-center gap-3"><span class="h-3 w-3 bg-teal" aria-hidden="true"></span>${title}</h3>
      <ol class="relative space-y-8 border-l border-slate-300 pl-8">
        ${items.map((it, i) => `
        <li class="relative" data-reveal="${i % 2 ? 'right' : 'left'}" data-delay="${i * 80}">
          <span class="absolute -left-[38px] top-1.5 h-3 w-3 bg-teal" aria-hidden="true"></span>
          <p class="font-heading text-sm font-extrabold text-teal-dark">${it.year}</p>
          <p class="mt-0.5 font-heading font-bold text-navy">${it.title}</p>
          <p class="text-sm">${it.place}</p>
        </li>`).join('')}
      </ol>
    </div>`;

  const memberships = d.memberships.map((m) => `
    <li class="flex items-start gap-3 text-sm">
      <span class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-teal text-navy">${ic('check', 'h-3 w-3')}</span>
      <span>${txt(m)}</span>
    </li>`).join('');

  const tileIcons = ['heart', 'activity', 'scissors', 'shield', 'sparkles', 'droplet'];
  const expertise = d.expertise.map((e, i) => `
    <div class="flex items-center gap-3 rounded-md border border-ice-2 border-l-4 border-l-teal bg-white p-4 shadow-card" data-reveal="up" data-delay="${i * 70}">
      <span class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded bg-navy text-white">${ic(tileIcons[i % tileIcons.length], 'h-4 w-4')}</span>
      <span class="text-sm font-semibold text-navy">${txt(e)}</span>
    </div>`).join('');

  UI.mount('#journey', wrap(`
    ${UI.sectionHead({ n: '02', eyebrow: 'Experience & education', title: 'Eighteen years of <span class="text-teal-dark">training and practice</span>' })}
    <div class="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
      ${timeline('Experience', d.experienceList)}
      ${timeline('Education', d.education)}
    </div>
    <div class="mt-16 grid gap-8 lg:grid-cols-12">
      <div class="${c.cardTop} p-6 sm:p-8 lg:col-span-5" data-reveal="up">
        <h3 class="${c.h3} mb-5">Memberships</h3>
        <ul class="space-y-3">${memberships}</ul>
      </div>
      <div class="lg:col-span-7">
        <h3 class="${c.h3} mb-5">Areas of expertise</h3>
        <div class="grid gap-3 sm:grid-cols-2">${expertise}</div>
      </div>
    </div>`));

  /* 03 Numbers */
  const s = d.stats;
  const counters = [
    [s.experience, 'Years of experience'],
    [s.patients, 'Patients treated'],
    [s.deliveries, 'Safe deliveries'],
    [s.surgeries, 'Surgeries performed'],
    [s.publications, 'Publications']
  ].map(([n, l]) => `
    <div class="bg-navy p-6 text-center sm:p-8">
      <p class="font-heading text-3xl font-extrabold text-white sm:text-4xl" data-count="${n}" data-suffix="+" data-decimals="0">${n.toLocaleString('en-US')}+</p>
      <p class="mt-2 text-xs font-bold uppercase tracking-wider text-teal">${l}</p>
    </div>`).join('');

  UI.mount('#numbers', `
    ${Art.pattern('pointer-events-none absolute inset-0 h-full w-full text-white/10')}
    <div class="${c.container} relative">
      ${UI.sectionHead({ n: '03', eyebrow: 'In numbers', title: 'A record built on <span class="text-teal">patient trust</span>', dark: true })}
      <div class="mt-12 grid grid-cols-2 gap-px border border-white/20 bg-white/20 lg:grid-cols-6" data-reveal="up">
        ${counters}
        <div class="col-span-2 flex flex-col items-center justify-center bg-white p-6 text-center text-navy sm:p-8 lg:col-span-1">
          <p class="font-heading text-4xl font-extrabold">${s.rating}</p>
          <div class="mt-1 flex text-amber-500" aria-label="Rated ${s.rating} out of 5">${UI.stars(s.rating)}</div>
          <p class="mt-2 text-xs font-bold uppercase tracking-wider text-teal-dark">${s.reviews.toLocaleString('en-US')} reviews</p>
        </div>
      </div>
    </div>`);
})();
