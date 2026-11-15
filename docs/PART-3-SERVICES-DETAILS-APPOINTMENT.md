# Part 3: Services, Service Details, Appointment

## Files delivered
- `services.html`: services overview page (`data-page="services"`).
- `assets/js/pages/services.js`: renders the header, card grid, vertical tabs, care pathway and fees table.
- `service-details.html`: single service page shell (`data-page="services"`).
- `assets/js/pages/service-details.js`: reads `?slug=`, renders the service, sidebar and related services, or a not-found panel.
- `appointment.html`: booking form and live ticket (`data-page="appointment"`, `data-no-cta`).
- `assets/js/pages/appointment.js`: booking logic, calendar, slots, validation, success state, `.ics` download.
- `docs/PART-3-SERVICES-DETAILS-APPOINTMENT.md`: this file.

## Pages
**services.html**: ids `page-head`, `all-services` (`head-all`, `services-grid`), `explore` (`head-explore`, `explore-root`, `tabs`, `tab-panel`), `pathway` (`head-path`, `path-list`), `fees` (`head-fees`, `fees-table`). Hooks: `[role=tab][data-i]`. Inputs: none.

**service-details.html**: id `service-root` holds the header, content grid and related band. Hooks: none beyond links. Inputs: `?slug=`.

**appointment.html**: ids `page-head`, `booking-wrap`, `booking-form`, panels `panel-service|chamber|date|time|details`, badges `b-*`, errors `err-*`, `service-list`, `chamber-list`, `cal` (`cal-prev`, `cal-next`, `cal-label`, `cal-hint`, `cal-grid`), `slots`, fields `f-name`, `f-phone`, `f-age`, `f-note`, ticket cells `t-service|chamber|date|time|visit|fee`, `success`, `ics`. Hooks: `[data-date]`, `[data-time]`, `[data-nav]`. Inputs: `?service=`, `?chamber=`, `?date=YYYY-MM-DD`, `?name=`, `?phone=`.

## Kit APIs used
`UI.c`, `UI.mount`, `UI.icon`, `UI.pageHeader`, `UI.sectionHead`, `UI.serviceCard`, `UI.money`, `UI.formatDate`, `UI.time12`, `UI.url.service|appointment|param`, `UI.find.service|chamber`, `UI.validate.phone`, `UI.setError`, `UI.toast`, `Art.cover`, `SITE.doctor`, `SITE.services`, `SITE.chambers`.

## Links this part expects other parts to provide
The kit header and footer supply site navigation. This part links out to `services.html`, `service-details.html?slug=`, `appointment.html` (own pages) and relies on other parts only through the kit. Other pages may link here with the query strings above.

## Interactions and edge cases handled
- Vertical tabs: click, arrow keys, Home and End; roving tabindex; panel fades in; horizontal scroll row on mobile.
- Service details: missing or invalid slug shows a not-found panel with links, no redirect; title and meta description set dynamically.
- Booking: native radio cards for service, chamber and visit type; progressive dimming without blocking keyboard access.
- Calendar: only the chamber's clinic days from today up to 90 days ahead are enabled; changing chamber clears a date that no longer fits and always clears the time.
- Slots: booked slots are derived from the date, chamber and slot index, so a date always shows the same pattern; past slots today are hidden; a full day shows a message.
- Query inputs are validated before use; `sh_user` name prefills when available; storage errors are caught.
- Confirm validates all steps with inline errors, scrolls to the first error, then saves `sh_last_booking`, shows the success state with reference `SH-YYMM-NNNN` and downloads a Blob `.ics`.

## Merge notes
No shared kit file was created or edited. Page ids are scoped to this part's pages. The only storage keys touched are `sh_last_booking` (write) and `sh_user` (read).

## QA checklist
- [x] Only the listed files, with exact names
- [x] Exact page skeleton, correct `data-page`, one `<h1>` from `UI.pageHeader`
- [x] No `<style>`, `style=""`, `href="#"`, breadcrumbs, blur, gradients, pill buttons or circular avatars
- [x] Teal backgrounds carry navy text; teal text on white uses `text-teal-dark`
- [x] Dynamic blocks rendered with `UI.mount`
- [x] Content from `window.SITE`; fees in BDT; exact cross-page hrefs
- [x] Wide content (fees table, tab row) scrolls inside its own container
- [x] Forms use `UI.validate` and `UI.setError`
