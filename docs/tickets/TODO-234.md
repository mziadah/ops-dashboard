# TODO-234: Theme toggle follow-ups from the TODO-231 review

**Type:** Tech debt
**Area:** Frontend
**Priority:** Low

## Story

`/code-review` on TODO-231 raised these points. None of them is visible to users of the
wall screen today, so they were left out of TODO-231 to keep that change small.

## Items

- **Storage is not injected.** `initApp(document, fetchImpl)` takes its document and fetch
  as parameters, but the theme code uses the global `window.localStorage`. Read it from
  `document.defaultView` (or pass it in) so tests can inject a fake storage.
- **Theme key and default live in two places.** The inline `<head>` script in `index.html`
  (which prevents a light flash before `app.js` runs) repeats `'ops-theme'` and `'dark'`
  from `app.js`. Keep them in sync, or move both into one small script loaded in `<head>`.
- **Redundant CSS variables.** `--preset-active-border` is identical in both themes, and in
  dark `--border` equals `--rule`. Define shared values once and only override what differs.
- **Accessibility.** The toggle exposes its state only through its text label. Consider
  `aria-pressed`, and give the unused `theme-toggle` class a rule or remove it.

## Fences

- Frontend only, no new dependencies, both test suites stay green.
