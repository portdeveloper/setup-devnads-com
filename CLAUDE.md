@AGENTS.md

## Design system

This site uses the **MDS-2026 / Terminal Direction** language shared with
the sibling `devnads-blitz-com` repo.

## Rules of thumb specific to this site

- **No em-dashes anywhere.** Use periods, commas, or middle dots. The
  system favors short sentences over long ones joined by em-dashes.
- **No new decoration.** The three decorative elements (corner-squares,
  corner brackets, accent bars) have specific jobs. This site uses
  corner-squares on `<SectionFrame>` and nothing else. Don't invent
  striped borders, gradient overlays, or new accents.
- **Mono caps for system speaking, sentence case for user reading.** Step
  numbers, eyebrows, button labels, code header chrome use mono caps.
  Headings, body prose, and accordion titles use sentence case.
- **Theming.** Light is the default; dark lives under `[data-theme="dark"]`
  in `globals.css`. The header toggle persists to `localStorage` and the
  pre-paint script in the locale layout honors `prefers-color-scheme` on
  first load. All chrome (including code blocks) follows the theme via
  the `--code-*` tokens. Don't hardcode hex values in components.

## Local dev

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production smoke test
```

Push to `main` and Vercel auto-deploys to setup.devnads.com.
