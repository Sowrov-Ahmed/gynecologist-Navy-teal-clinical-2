# Part 1: Home, Sign-in/Sign-up, 404

## Files delivered
- `index.html`: Home page (static hero, containers for rendered sections).
- `assets/js/pages/index.js`: renders strip, ticker, about tabs, stats, services, chambers, appointment form, testimonial slider, blog, FAQs.
- `auth.html`: Sign-in / Create account shell (split layout, tablist).
- `assets/js/pages/auth.js`: renders forms, tabs, validation, strength meter, storage.
- `404.html`: Not-found page (static, no page script).
- `docs/PART-1-HOME-AUTH-404.md`: this file.

## Pages
**Home** (`data-page="home"`). Sections: hero (`#hero-status`, `#hero-call`, `#hero-points`, `#hero-photo`, `#hero-pattern`), `#strip`, `#ticker`, `#about` (tabs `#tab-exp`/`#tab-edu`, panels `#panel-exp`/`#panel-edu`), `#stats`, `#services`, `#chambers`, `#appointment` (form `#home-appt`, fields `#ha-name/#ha-phone/#ha-chamber/#ha-date`), `#stories` (`#slider`, `#slides`, `#prev`, `#next`, `[data-dot]`), `#blog`, `#faqs` (`#home-faq`). Reads no query string or hash.

**Auth** (`data-page="auth"`, `data-no-cta`). Ids: `#tab-signin/#tab-signup/#tab-slider`, `#panel-signin/#panel-signup/#panel-reset`, forms `#signin-form/#signup-form/#reset-form`, `#forgot`, `#back`, `#meter`, `#terms-error`. Reads `?mode=signup`.

**404** (`data-page="notfound"`, `data-no-cta`, `noindex`). Static; dot pattern is inline SVG because there is no page script.

## Kit APIs used
`SITE.doctor/chambers/services/posts/testimonials/faqs`; `UI.c`, `UI.icon`, `UI.stars`, `UI.money`, `UI.photo`, `UI.todayStatus`, `UI.sectionHead`, `UI.serviceCard`, `UI.chamberCard`, `UI.postCard`, `UI.faqAccordion`, `UI.mount`, `UI.refresh`, `UI.validate.phone/email`, `UI.setError`, `UI.toast`, `UI.url.appointment/param`; `Art.pattern`.

## Links this part expects other parts to provide
`appointment.html` (receives `name, phone, chamber, date`), `about.html`, `services.html`, `chambers.html`, `blog.html`, `testimonials.html`, `faqs.html`, `contact.html`, `terms.html`, `privacy.html`, `index.html`; service, chamber and post links come from the kit card renderers.

## Interactions and edge cases handled
- Live next-slot chip and strip text from `UI.todayStatus()`; counters, wipe/kenburns hero, bobbing card, marquee with duplicated track.
- Accessible About tabs (arrow keys, Home/End); slider with autoplay every 7s, paused on hover/focus, disabled under reduced motion, arrow-key and dot control, inactive slides `inert`.
- Home booking form: inline errors, date `min` = today (local), redirect to `UI.url.appointment`.
- Auth: sliding tab underline, show/hide password, 4-segment strength meter, confirm match, terms check, reset view with toast, spinner and disabled submit, `sh_user` saved as `{name,email}`, redirect to `index.html` after about 1.2s.
- Sign-in reuses the stored name when the email matches; mobile sign-in falls back to "Patient".
- localStorage failures are caught; `?mode=signup` opens the signup tab.

## Merge notes
- No shared kit file was created or edited; only the files above exist.
- Ids are page-scoped; FAQ prefix is `home-faq`.
- Storage: writes `sh_user` only. `sh_auth_id` is private to `auth.js` (Remember me, stores the sign-in identifier); it is not read by other parts.
- Hero primary/outline buttons use `hover:bg-white` instead of `hover:bg-navy` because they sit on a navy band.

## QA checklist
- [x] Only listed files, exact names
- [x] Exact skeleton, one `<h1>` per page, correct `data-page`
- [x] No `<style>`, `style=""`, `href="#"`, blur, pill or circular avatars, glass panels
- [x] Navy text on teal, `text-teal-dark` for teal text on light
- [x] Dynamic blocks rendered via `UI.mount`
- [x] Content from `window.SITE`, fees in ৳, exact hrefs
- [x] Overflow containers around offsets and marquee; 44px targets; visible focus
