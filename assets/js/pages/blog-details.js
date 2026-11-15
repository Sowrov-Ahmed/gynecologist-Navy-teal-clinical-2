(function () {
  'use strict';
  const { SITE, UI, Art } = window;
  const c = UI.c;
  const d = SITE.doctor;
  const root = document.getElementById('post-root');
  const slug = UI.url.param('slug');
  const post = slug ? UI.find.post(slug) : null;

  if (!post) {
    document.title = 'Article not found | Dr. Rukhsana Alam';
    UI.mount(root, UI.pageHeader({
      eyebrow: 'Health articles',
      title: 'Article <span class="text-teal">not found</span>',
      text: 'The article you are looking for may have moved or the link is incomplete.',
      photo: null
    }) + `<section class="${c.section}"><div class="${c.container}"><div class="${c.panelIce} mx-auto max-w-2xl border-l-4 border-teal text-center"><span class="${c.iconWrap} mx-auto">${UI.icon('file-text', 'h-6 w-6')}</span><h2 class="${c.h3} mt-4">Let us find you something to read</h2><p class="mt-2 text-sm">Browse every article on pregnancy, periods, fertility, screening and surgery.</p><a href="blog.html" class="${c.btnPrimary} mt-6">${UI.icon('arrow-left', 'h-4 w-4')} All articles</a></div></div></section>`);
    return;
  }

  const all = SITE.posts;
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  const others = all.filter((p) => p.slug !== post.slug);
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);
  const pageUrl = location.href;

  document.title = `${post.title} | Dr. Rukhsana Alam`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', post.excerpt);

  const paras = post.body.map((t, i) => `<p class="${i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-6xl first-letter:font-extrabold first-letter:leading-[0.9] first-letter:text-navy' : 'mt-6'}">${t}</p>`).join('');
  const takeaways = post.takeaways.map((t) => `<li class="flex gap-3"><span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-teal text-navy">${UI.icon('check', 'h-4 w-4')}</span><span class="text-sm leading-relaxed sm:text-base">${t}</span></li>`).join('');
  const sq = 'inline-flex h-11 w-11 items-center justify-center rounded bg-navy text-white transition duration-300 hover:bg-teal hover:text-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-navy/30';
  const nav = (p, dir) => p
    ? `<a href="${UI.url.post(p.slug)}" class="${c.card} ${c.cardHover} block p-5 ${dir === 'next' ? 'sm:text-right' : ''} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40"><span class="${c.eyebrow} ${dir === 'next' ? 'sm:flex-row-reverse' : ''}">${dir === 'next' ? 'Next article ' + UI.icon('arrow-right', 'h-4 w-4') : UI.icon('arrow-left', 'h-4 w-4') + ' Previous article'}</span><span class="mt-2 block font-heading text-base font-bold leading-snug text-navy">${p.title}</span></a>`
    : '<span class="hidden sm:block"></span>';
  const more = related.map((p) => `<li><a href="${UI.url.post(p.slug)}" class="group flex items-center gap-4 border-b border-ice-2 px-5 py-3 transition duration-300 hover:bg-ice focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40"><span class="block h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-navy">${Art.cover(p.art, 'h-full w-full')}</span><span class="min-w-0"><span class="line-clamp-2 block text-sm font-bold text-navy transition group-hover:text-teal-dark">${p.title}</span><span class="mt-1 block text-xs text-body">${UI.formatDate(p.date)}</span></span></a></li>`).join('');

  const article = `<article class="min-w-0 lg:col-span-8">
    <div class="relative pb-3 pr-3"><span class="absolute bottom-0 right-0 h-full w-full rounded-md bg-teal" aria-hidden="true"></span><div class="relative aspect-[16/9] overflow-hidden rounded-md bg-navy" data-reveal="wipe">${Art.cover(post.art, 'h-full w-full')}</div></div>
    <div class="mt-10 max-w-3xl text-base leading-8 sm:text-lg">${paras}</div>
    <div class="${c.panelIce} mt-10 border-l-4 border-teal"><h2 class="font-heading text-xl font-extrabold text-navy">Key takeaways</h2><span class="${c.bar} mt-3"></span><ul class="mt-5 space-y-4">${takeaways}</ul></div>
    <div class="mt-10 flex flex-wrap items-center gap-3 border-y border-ice-2 py-5"><span class="mr-2 text-xs font-bold uppercase tracking-wider text-navy">Share</span>
      <button type="button" id="copy-link" class="${sq}" aria-label="Copy article link">${UI.icon('copy', 'h-5 w-5')}</button>
      <a href="https://wa.me/?text=${encodeURIComponent(post.title + ' ' + pageUrl)}" target="_blank" rel="noopener" class="${sq}" aria-label="Share on WhatsApp">${UI.icon('whatsapp', 'h-5 w-5')}</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}" target="_blank" rel="noopener" class="${sq}" aria-label="Share on Facebook">${UI.icon('facebook', 'h-5 w-5')}</a></div>
    <nav class="mt-8 grid gap-4 sm:grid-cols-2" aria-label="More articles">${nav(prev, 'prev')}${nav(next, 'next')}</nav>
    <p class="mt-8 text-xs leading-relaxed text-slate-500">This article is for general information and does not replace a personal medical consultation.</p>
  </article>`;

  const side = `<aside class="lg:col-span-4" aria-label="Article sidebar"><div class="space-y-6 lg:sticky lg:top-28">
    <div class="${c.cardTop} p-6 text-center"><div class="mx-auto aspect-square w-40 overflow-hidden rounded bg-ice">${UI.photo('cutout', 'h-full w-full object-cover')}</div><p class="mt-5 font-heading text-lg font-extrabold text-navy">${d.name}</p><p class="mt-1 text-sm">${d.title}</p><p class="mt-1 text-xs font-semibold uppercase tracking-wider text-teal-dark">BMDC Reg. ${d.bmdc}</p><a href="appointment.html" class="${c.btnPrimary} mt-5 w-full">${UI.icon('calendar-check', 'h-4 w-4')} Book appointment</a></div>
    <div class="${c.cardTop}"><h2 class="px-5 pt-5 font-heading text-lg font-extrabold text-navy">More articles</h2><ul class="mt-3">${more}</ul></div>
    <div class="${c.panelNavy}"><h2 class="font-heading text-xl font-extrabold text-white">Questions about your health?</h2><span class="${c.bar} mt-3"></span><p class="mt-4 text-sm leading-relaxed text-slate-200">Talk to our team on ${d.phone} or visit a chamber near you.</p><a href="chambers.html" class="${c.btnOutlineLight} mt-5 w-full">View chambers</a></div>
  </div></aside>`;

  const band = `<section class="${c.sectionAlt}" aria-label="Related articles"><div class="${c.container}"><div id="rel-head"></div><div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${related.map((p, i) => UI.postCard(p, i)).join('')}</div></div></section>`;

  UI.mount(root, UI.pageHeader({
    eyebrow: post.category,
    title: post.title,
    text: `${UI.formatDate(post.date)} &middot; ${post.readMin} min read &middot; By ${d.name}`,
    photo: null
  }) + `<section class="${c.section}"><div class="${c.container}"><div class="grid gap-10 lg:grid-cols-12">${article}${side}</div></div></section>` + band);
  UI.mount('#rel-head', UI.sectionHead({ n: '02', eyebrow: 'Keep reading', title: 'Related <span class="text-teal-dark">articles</span>' }));

  document.getElementById('copy-link').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      UI.toast('Article link copied', 'success');
    } catch (e) {
      UI.toast('Could not copy the link', 'error');
    }
  });
})();
