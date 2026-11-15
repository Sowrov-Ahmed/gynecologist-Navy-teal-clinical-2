# Part 2: About, Testimonials, FAQs

## Files delivered
- `about.html`: About page shell (header, philosophy, journey, numbers containers).
- `assets/js/pages/about.js`: renders all About sections from `SITE.doctor`.
- `testimonials.html`: Patient stories page shell.
- `assets/js/pages/testimonials.js`: rating summary, service filter tabs, paged grid.
- `faqs.html`: FAQ page shell.
- `assets/js/pages/faqs.js`: category list, live search, accordion.
- `docs/PART-2-ABOUT-TESTIMONIALS-FAQS.md`: this file.

## Pages
**about.html** (`data-page="about"`): ids `page-head`, `philosophy`, `journey`, `numbers`. Script: `about.js`. No query or hash inputs.
**testimonials.html** (`data-page="testimonials"`): ids `page-head`, `stories`; inner hooks `bars`, `tabs`, `count`, `grid`, `empty`, `more`. Script: `testimonials.js`. No inputs.
**faqs.html** (`data-page="faqs"`): ids `page-head`, `faq-body`; inner hooks `cats`, `faq-search`, `faq-clear`, `faq-count`, `faq-list`, `faq-empty`, `faq-reset`. Script: `faqs.js`. No inputs.

## Kit APIs used
`SITE.doctor`, `SITE.testimonials`, `SITE.faqs`, `UI.c`, `UI.icon`, `UI.stars`, `UI.photo`, `UI.pageHeader`, `UI.sectionHead`, `UI.testimonialCard`, `UI.faqAccordion`, `UI.mount`, `Art.pattern`, `data-reveal`, `data-count`, `data-delay`.

## Links this part expects other parts to provide
`appointment.html`, `contact.html`. Phone and WhatsApp links come from `SITE.doctor`.

## Interactions and edge cases handled
- About: wipe-reveal banner, alternating left/right timeline reveals, animated counters, quote card stacks below the banner on mobile and overlaps its corner from `md` up.
- Testimonials: distribution bars fill when scrolled into view (IntersectionObserver, with fallback); tabs show per-service counts; filter resets paging to 6; "Load more stories" adds 6 and hides at the end; count line; empty state with reset.
- FAQs: live search over questions and answers, clear button, category counts that follow the search, accordion re-rendered with prefix `faqp2`, empty state with "Clear filters", sticky sidebar on desktop only.
- Tab and category buttons are at least 44px tall with visible focus rings; tab strip scrolls inside its own container so the page never scrolls sideways.

## Merge notes
No shared kit file was created or edited. Ids are page-scoped; the only storage use is none (no localStorage keys). The accordion prefix `faqp2` is unique to this part.

## QA checklist
- [x] Only listed files created, exact names
- [x] Exact skeleton, correct `data-page`, one `<h1>` (from `UI.pageHeader`)
- [x] No `<style>`, `style=""` in HTML, custom CSS, blur, glass, pills, circular avatars or `href="#"`
- [x] Teal backgrounds use navy text; teal text on light uses `text-teal-dark`
- [x] Every dynamic block rendered via `UI.mount`
- [x] Content from `window.SITE`; links use exact hrefs
- [x] Overflow contained for 320, 536 and 768 widths
