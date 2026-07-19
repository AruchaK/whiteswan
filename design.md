# WhiteSwan Web — UI Design Review & Recommendations

_Last updated: 2026-06-08 · Reviewer: design audit · Scope: `whiteswan-web/` (Next.js 16 + Tailwind v4)_

This document audits the current implementation against (1) the **WhiteSwan Brand Guidelines (May 2026)**, (2) the **WhiteSwan Vault Feature Specification v2.0**, and (3) the **2026-02-03 website brief**, and proposes UI improvements optimized for the actual target user.

---

## 0. Overall feeling — Safe · Calm · Beautiful

Brand belief: _"The most loving decisions are often the ones made before they are needed."_ Brand purpose: _help families face life's most sensitive transitions prepared, together, and at peace._ Every pixel must serve three feelings:

| Feeling | What it means visually | How to achieve |
|---|---|---|
| **Safe** | Audience reads death, illness, legacy. UI must feel like a private study, not a bank app. | Anchor in deep slate `#464B54` for primary actions (not pure black, not navy-blue). Use cognac `#704C35` only for warmth accents, never for warnings. Lock surfaces — encryption status, last backup, "who can see this" — visible on every screen without scrolling. |
| **Calm** | Mist-blue `#D0D9DC` skies, sand `#D6C8BC` interiors, lots of negative space. No motion that startles. | 24–32 px gutters minimum; `prefers-reduced-motion` honored; transitions ≤200 ms ease-out; no parallax; no auto-playing carousels. Body line-height ≥ 1.55. |
| **Beautiful** | Serif wordmark and headlines (WHITESWAN custom serif), warm cream + mist palette, editorial pacing. | Hold the brand serif for hero + h1/h2 only. Pair with a calm humanist sans for body. Avoid neon, gradients, glassmorphism, drop-shadow stacks. Photography: mature Asian adults in natural light by windows, never stock smiles. |

Anti-patterns to remove on sight: bright reds, gamified progress confetti, ALL-CAPS shouty banners, dense data tables on the landing surface, modal stacks, surveillance language ("tracking", "monitoring", "score").

---

## 1. Who we are designing for

From the brief and brand book:

- **Primary user:** individuals **aged 45–70**, thinking about later life — wills, healthcare directives, family wishes, legacy.
- **Secondary user:** trusted family members (spouse, adult children, executors).
- **Market:** Asia, headquartered in Thailand → **Thai is the primary language**, English is secondary.
- **Emotional context:** death, illness, aging, legacy. Users approach the product hesitantly; they want *calm*, *control*, *no surprises*, and *no dark patterns*. Brand belief: _"The most loving decisions are often the ones made before they are needed."_

This persona is **older than the typical SaaS user**, often on iPad/desktop, may wear reading glasses, less tolerant of clever microcopy that hides function, and uniquely sensitive to anything that feels surveillance-like or transactional.

These traits drive every recommendation below.

---

## 2. Design north stars

| Principle | What it means in practice |
|---|---|
| **Legible before lyrical** | Body text never below 15px. ALL-CAPS eyebrows used sparingly. Serif headlines stay, but secondary copy goes sans, larger. |
| **One quiet action per screen** | Every page asks for one obvious next step. Decorative quotes never compete with primary CTAs. |
| **Trust on every surface** | "Encrypted · last backup …" visible without scrolling. Sharing always shows *who can see what, right now*. |
| **Bilingual by default** | TH/EN are first-class. Date/number formatting uses `Asia/Bangkok` and `th-TH` when active. |
| **No blank vaults** | First-time states are warm, prefilled, guided — never an empty grid. |
| **Touch-friendly** | All interactive controls ≥ 44×44 px (target 48 px). Increased line-height, generous spacing. |
