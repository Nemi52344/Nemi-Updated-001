# invest.nemi-ai.com

NEMI AI investor portal — landing page with jurisdiction self-select plus token-gated `/reg-d` (Regulation D 506(c)) and `/reg-s` (Regulation S) offering pages. Built from `invest-nemi-ai-website-spec.md` (Draft 1.1).

> ⚠️ **Compliance status:** copy is per the working spec. **All language, flows, and disclaimers must be reviewed and approved by securities counsel before launch.** See the spec for the full pre-launch checklist (Section 11).

## Stack

- **Next.js 14** (App Router) — server-side rendering + edge middleware for token validation
- **TypeScript**, **Tailwind CSS**, **Montserrat** (via `next/font/google`)
- **`jose`** for HS256 JWT signing/verification
- In-memory single-use nonce store (`lib/nonce-store.ts`) — replace with Redis / Vercel KV / Cloudflare KV for production

## Run locally

```bash
npm install
cp .env.example .env.local   # then set GATE_TOKEN_SECRET to a long random value
npm run dev
```

Open <http://localhost:3000>.

## Routes

| Route | Access |
|---|---|
| `/` | Public landing page. Self-select jurisdiction. |
| `POST /api/gate` | Issues a 10-minute, single-use HS256 JWT. Requires `{ offering: "reg-d" \| "reg-s", attestation: true }`. |
| `/reg-d` | Gated. Requires valid token via `?token=...`. Refresh → redirect home (nonce consumed). |
| `/reg-s` | Gated. Same as above. |

## Brand

- Palette: Deep Space `#07060B`, Nemi Violet `#513A9F`, Soft Grey `#E6E6E9` (full scale in `tailwind.config.ts`)
- Typography: Montserrat 400/500/600/700/800
- Hero background: `public/nemi-ai-background.jpg` (from Nemi AI brand asset library)

## Before launch — required edits

- [ ] Fill all `[TBD — to be completed]` rows in `app/reg-d/page.tsx` and `app/reg-s/page.tsx` (valuation cap, discount rate, minimum/maximum, closing date)
- [ ] Replace the disabled DealMaker button in `components/DealMakerCta.tsx` with DealMaker's actual embed code or redirect URL (separate URLs for Reg D and Reg S — confirm with DealMaker account rep)
- [ ] Rotate `GATE_TOKEN_SECRET` to a real production secret (32+ bytes)
- [ ] Replace in-memory nonce store with persistent KV (Redis / Vercel KV / Cloudflare KV)
- [ ] Add real favicon to `public/favicon.ico`
- [ ] Securities counsel review of all on-page language
- [ ] NY Martin Act notice filed before the site is publicly reachable to NY residents (see spec §10.6)
- [ ] Blue Sky notice filings calendared for the 12 target states (spec §10.2)
- [ ] Verify analytics ingestion for `gate_click` events emitted by `app/api/gate/route.ts`

## Spec source

Source of truth for all copy and compliance language: `invest-nemi-ai-website-spec.md`. When the spec is updated, re-check page content against it.
