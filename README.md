# invest.nemi-ai.com

NEMI AI investor portal — landing page with jurisdiction self-select and two offering pages: `/reg-d` (Regulation D 506(c)) and `/reg-s` (Regulation S). Built from `invest-nemi-ai-website-spec.md` (Draft 1.1).

> ⚠️ **Compliance status:** copy is per the working spec. **All language, flows, and disclaimers must be reviewed and approved by securities counsel before launch.** See the spec for the full pre-launch checklist (Section 11).

## Stack

- **Next.js 14** (App Router) — SSR + edge rendering
- **TypeScript**, **Tailwind CSS**, **Montserrat** (via `next/font/google`)
- Animated **constellation canvas** + breathing **nebula glow** on every page
- Nemi AI brand palette (Deep Space + Nemi Violet) and official infinity logo

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Routes

| Route | Notes |
|---|---|
| `/` | Landing page. Jurisdiction-select cards + attestation modal. |
| `/reg-d` | Regulation D 506(c) offering page. `noindex, nofollow` via headers. |
| `/reg-s` | Regulation S offering page. `noindex, nofollow` via headers. |

The attestation modal records the user's self-attestation client-side and navigates them to the appropriate offering page. The offering pages are directly reachable by URL — robots are disallowed and the noindex/nofollow header is set, but there is no server-side gate. If counsel later requires a hard server-side gate, it can be reintroduced as edge middleware + a signed token / KV-backed nonce store.

## Brand

- Palette: Deep Space `#07060B`, Nemi Violet `#513A9F`, Soft Grey `#E6E6E9` (full scale in `tailwind.config.ts`)
- Typography: Montserrat 400/500/600/700/800
- Logo: [public/nemi-logo.png](public/nemi-logo.png) — official NEMI infinity mark, white on transparent
- Hero background: [public/nemi-ai-background.jpg](public/nemi-ai-background.jpg) (faded to 25% behind the nebula glow)

## Before launch — required edits

- [ ] Fill all `[TBD]` rows in `app/reg-d/page.tsx` and `app/reg-s/page.tsx` (valuation cap, discount rate, minimum/maximum, closing date)
- [ ] Replace the disabled DealMaker button in `components/DealMakerCta.tsx` with DealMaker's actual embed code or redirect URL (separate URLs for Reg D and Reg S — confirm with DealMaker account rep)
- [ ] Add real favicon to `public/favicon.ico`
- [ ] Securities counsel review of all on-page language
- [ ] NY Martin Act notice filed before public NY-reachable launch (spec §10.6)
- [ ] Blue Sky notice filings calendared for the 12 target states (spec §10.2)

## Spec source

Source of truth for all copy and compliance language: `invest-nemi-ai-website-spec.md`. When the spec is updated, re-check page content against it.
