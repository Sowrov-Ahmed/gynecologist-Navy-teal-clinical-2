# Part 5: Blog, Blog Details, Privacy

## Files delivered
- `blog.html`: magazine-style article listing with sidebar.
- `assets/js/pages/blog.js`: search, category filter, featured post, sidebar rendering.
- `blog-details.html`: article shell with `#post-root`.
- `assets/js/pages/blog-details.js`: reads `?slug=`, renders article, sidebar, related posts.
- `privacy.html`: Privacy Policy shell using the legal layout.
- `assets/js/pages/privacy.js`: renders 10 sections, table of contents, scroll-spy, print.
- `docs/PART-5-BLOG-DETAILS-PRIVACY.md`: this file.

## Pages
**Blog** (`data-page="blog"`): `#page-head`, `#blog-search`, `#blog-tabs`, `#blog-count`, `#blog-featured`, `#blog-grid`, `#blog-cats`, `#blog-recent`, `#blog-cta`. Hooks: `[data-cat]` buttons, `[data-reset]` clear button. Inputs: none.

**Blog Details** (`data-page="blog"`): `#post-root` holds the header, article, sidebar and related band (`#rel-head`, `#copy-link`). Input: `?slug=`. Title and meta description are set from the post.

**Privacy** (`data-page="privacy"`): `#page-head`, `#legal-toc`, `#legal-body`, sections `#s1` to `#s10`, `#print-btn`. Inputs: `#sN` hash anchors.

## Kit APIs used
`SITE.posts`, `SITE.doctor`, `UI.c`, `UI.pageHeader`, `UI.sectionHead`, `UI.postCard`, `UI.mount`, `UI.icon`, `UI.photo`, `UI.formatDate`, `UI.url.post`, `UI.url.param`, `UI.find.post`, `UI.toast`, `Art.cover`.

## Links this part expects other parts to provide
`appointment.html`, `chambers.html`, and the shared header and footer links to `blog.html` and `privacy.html`.

## Interactions and edge cases handled
- Search and category filters combine; the featured post hides while either is active.
- Result count is announced politely; the empty state offers a clear button.
- Grid re-render replays a fade-in animation.
- Missing or invalid `?slug=` shows a not-found panel with a link to `blog.html`, no redirect.
- First or last article hides the Previous or Next card.
- Copy link handles clipboard failure with an error toast.
- Privacy scroll-spy falls back to the first item without `IntersectionObserver`; mobile shows a scrollable chip row.

## Merge notes
No shared kit file was touched. Element ids are page-scoped. No localStorage keys are read or written by this part.

## QA checklist
- [x] Only listed files created, exact names
- [x] Exact skeleton, one `<h1>` per page via `UI.pageHeader`
- [x] No `<style>`, `style=""`, `href="#"`, blur, glass, pill or circular elements
- [x] Navy text on teal, `text-teal-dark` for teal text on white
- [x] Dynamic blocks rendered with `UI.mount`
- [x] Content from `window.SITE`; exact cross-page hrefs
- [x] Touch targets at least 44px, visible focus states
- [x] Horizontal scrollers wrapped so the page never scrolls sideways
