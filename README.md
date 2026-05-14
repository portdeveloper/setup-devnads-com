# setup.devnads.com

Single-page setup guide for the Monad / Scaffold-ETH 2 workshops. Lives at <https://setup.devnads.com>.

Wraps two sibling repos:

- [`portdeveloper/se2-workshop-windows-setup`](https://github.com/portdeveloper/se2-workshop-windows-setup) — bootstrap scripts, verify script, Docker e2e test
- [`portdeveloper/se2-monad-extension`](https://github.com/portdeveloper/se2-monad-extension) — `create-eth` extension that pre-wires Monad Testnet (chain 10143)

The page is a thin presentation layer over the URLs hosted by those repos — every code block on the page points at a script or command that the upstream repos test in CI.

## Stack

- Next.js 16, React 19, Tailwind v4
- Geist Sans + Geist Mono (via `next/font`)
- Design tokens copied from [`devnads-blitz-com`](https://github.com/portdeveloper/devnads-blitz-com) (Terminal Direction palette, mono-caps voice, sharp corners)

## Local dev

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build smoke test
```

## Deploy

Push to `main` — Vercel auto-deploys. Custom domain `setup.devnads.com` is wired in the Vercel project settings; nothing to configure in this repo.
