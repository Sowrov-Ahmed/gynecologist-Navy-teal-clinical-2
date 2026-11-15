# Part 4: Chambers, Contact, Terms & Conditions

## Files delivered
- `chambers.html`: chambers page shell (schedule table, locations).
- `assets/js/pages/chambers.js`: renders header, weekly schedule, chamber blocks, hash anchor highlight.
- `contact.html`: contact page shell with static form markup.
- `assets/js/pages/contact.js`: info rows, form validation, success panel, map tabs.
- `terms.html`: legal page shell (TOC + article containers).
- `assets/js/pages/terms.js`: renders 10 sections, TOC, scroll-spy, Print.
- `docs/PART-4-CHAMBERS-CONTACT-TERMS.md`: this file.

## Pages
**chambers.html** (`data-page="chambers"`): `#page-head`, `#schedule-head`/`#schedule-body` (01 Weekly schedule), `#locations-head`/`#locations-body` (02 Locations), `#gulshan` `#mirpur` `#chattogram` blocks. Reads the URL hash and scrolls to the block with a 1.5s teal ring. Hooks: `[data-jump]` strip buttons, `hashchange`.

**contact.html** (`data-page="contact"`, `data-no-cta`): `#page-head`, `#reach-head`, `#contact-info`, `#contact-form` (`#cf-name`, `#cf-phone`, `#cf-email`, `#cf-subject`, `#cf-message`, `#cf-count`), `#cf-success`, `#map-head`, `#map-body` (`[data-tab]`, `#map-frame`, `#map-panel`). No query or hash inputs.

**terms.html** (`data-page="terms"`): `#page-head`, `#toc` (`[data-toc]`), `#legal` with sections `#s1`..`#s10`. Hooks: `#print-btn`, IntersectionObserver scroll-spy.

## Kit APIs used
`SITE.doctor`, `SITE.chambers`; `UI.c`, `UI.icon`, `UI.pageHeader`, `UI.sectionHead`, `UI.mount`, `UI.refresh`, `UI.money`, `UI.todayStatus`, `UI.find.chamber`, `UI.url.appointment`, `UI.validate.phone|email`, `UI.setError`, `UI.toast`. Motion: `data-reveal`.

## Links this part expects other parts to provide
`appointment.html?chamber=ID` (Member 3). Footer and header link to `chambers.html`, `contact.html`, `terms.html`, `privacy.html` (kit and Member 5). Contact links back to `chambers.html#ID`.

## Interactions and edge cases handled
- Today's row in the schedule is highlighted from the real clock; table scrolls horizontally inside its own wrapper.
- Hash anchors work on load and on later hash changes; unknown hashes are ignored.
- Sticky anchor strip scrolls horizontally on narrow screens.
- Contact form: per-field validation on blur and live after the first error, focus moves to the first invalid field, 500-character counter turns rose near the limit, success panel is focused, "Send another" resets everything.
- Map tabs are keyboard accessible (arrow keys) and update the iframe, title and panel.
- Terms TOC: chips scroll sideways on mobile and follow the active section; Print uses `window.print()`.
- WhatsApp link accepts either a full URL or a bare number from `SITE.doctor.whatsapp`.

## Merge notes
No shared kit file touched. Only the files listed above were created. Element ids are page-scoped and no localStorage keys are used or written.

## QA checklist
- [x] Exact skeleton, correct `data-page`, one `<h1>` (from `UI.pageHeader`)
- [x] No `<style>`, `style=""`, `href="#"`, breadcrumbs, blur, glass, pills or circular avatars
- [x] Teal backgrounds use navy text; teal text on white uses `text-teal-dark`
- [x] Dynamic blocks rendered with `UI.mount` or `UI.refresh`
- [x] Content from `window.SITE`; fees in ৳; exact hrefs
- [x] Overflow contained in table, strip and TOC wrappers
- [x] Forms use `UI.validate` and `UI.setError`; 44px touch targets; visible focus
