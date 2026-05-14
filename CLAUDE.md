@AGENTS.md

## Design system

This site shares the **MDS-2026 / Terminal Direction** language with the
sibling `devnads-blitz-com` repo. Read its `design.md` before adding any
component or section. It's the source of truth for tokens, typography,
voice, decoration, and composition.

@../devnads-blitz-com/design.md

## Rules of thumb specific to this site

- **No em-dashes anywhere.** Use periods, commas, or middle dots. The
  system favors short sentences over long ones joined by em-dashes.
- **No new decoration.** The three decorative elements (corner-squares,
  corner brackets, accent bars) have specific jobs in design.md. This site
  uses corner-squares on `<SectionFrame>` and nothing else. Don't invent
  striped borders, gradient overlays, or new accents.
- **Mono caps for system speaking, sentence case for user reading.** Step
  numbers, eyebrows, button labels, code header chrome use mono caps.
  Headings, body prose, and accordion titles use sentence case.
- **Code Block is the documented exception.** It hardcodes `#0d0d14` /
  `#1e1e2a` rather than using semantic tokens. Don't extend that pattern
  to anything else.

## Local dev

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production smoke test
```

Push to `main` and Vercel auto-deploys to setup.devnads.com.
