# Product

## Register

product

## Users

Primary: individuals aged **45–70** preparing for later life — wills, healthcare directives, family wishes, legacy. Often on iPad or desktop, may wear reading glasses, low tolerance for clever microcopy that hides function. Approach the product **hesitantly**; the subject matter is death, illness, aging.

Secondary: trusted family members (spouse, adult children, executors) who arrive via shared access, often under emotional load.

Market: Asia, HQ Thailand. **Thai is the primary language; English is secondary.** Dates, numbers, currency: `Asia/Bangkok`, `th-TH` when active.

Context of use: a private moment at home, not a workflow at a desk. Sessions are short, infrequent, and emotionally costly. The product must feel like a private study — quiet, considered, in control — not a bank app, not a SaaS dashboard.

## Product Purpose

WhiteSwan helps families face life's most sensitive transitions prepared, together, and at peace. The app organizes legacy across five pillars — **Legal, Medical, Financial, Personal, Family** — and makes the right things visible to the right people at the right time (executors, beneficiaries, deputies, triggers, access log).

Success = a user finishes a session feeling **calmer than when they started**, with one concrete thing more in place. Not minutes-in-app, not streaks, not completion percentage as a game.

Brand belief: _"The most loving decisions are often the ones made before they are needed."_

## Brand Personality

Three words: **Safe · Calm · Beautiful**.

- **Safe** — private study, not bank app. Deep slate `#464B54` anchors primary actions. Encryption status and "who can see this" are visible without scrolling.
- **Calm** — mist `#D0D9DC`, sand `#D6C8BC`, generous gutters (≥24–32px), `prefers-reduced-motion` honored, transitions ≤200ms ease-out, no parallax, no carousels.
- **Beautiful** — editorial pacing. Brand serif for wordmark + h1/h2 only, paired with a humanist sans for body. Cognac `#704C35` as a warmth accent, never as a warning.

Voice: warm, plain-spoken, considered. Sentence case. No buzzwords, no cheer, no urgency. A trusted family advisor in a quiet room, not a coach.

Closest references: **Are.na, Readwise** — editorial private-study aesthetic. Quiet serif accents, document-shaped pages, ample whitespace.

## Anti-references

- **Glassmorphism, gradients, neon, drop-shadow stacks.** Hard ban.
- **Bank / fintech aesthetic** — navy-and-gold, dense data tables on landing surfaces, transactional tone.
- **Gamified SaaS** — confetti, streaks, badges, completion celebrations. Tonally wrong for this subject.
- **Surveillance language** — "tracking", "monitoring", "score". Never.
- **Shouty banners, ALL-CAPS body, bright reds, modal stacks, auto-playing motion.**
- **Empty-grid first-time states.** First runs are warm, prefilled, guided.
- **Stock-smile photography.** When photography appears: mature Asian adults in natural light by windows.

## Design Principles

1. **Legible before lyrical.** Body never below 15px. Touch targets ≥44px (target 48). Eyebrow caps used sparingly, never as default scaffold. The persona reads with glasses; readability outranks elegance every time.
2. **One quiet action per screen.** Each surface asks for one obvious next step. Decorative quotes never compete with primary CTAs.
3. **Trust on every surface.** Encryption status, last backup, and "who can see this" appear without scrolling on every screen that holds private content. Sharing always names the people.
4. **Bilingual by default.** TH/EN are first-class; layouts hold both. No copy that assumes English-first phrasing or word length.
5. **No blank vaults.** First-time states are warm, prefilled with examples, and guide one step. An empty grid is a failure state, not a default.

## Accessibility & Inclusion

- **WCAG 2.2 AA** floor, with persona tweaks above the spec:
  - Body text ≥15px (16px preferred). Ban `text-[10px]` / `text-[11px]`.
  - All interactive targets ≥44×44px (target 48).
  - Body line-height ≥1.55.
  - Body contrast hits AA (≥4.5:1); placeholder text held to the same bar, not muted-gray default.
- **Reduced motion** honored on every animation. Crossfade or instant fallback, no exceptions.
- **Color blindness**: never encode status by color alone. Pair color with icon or label (e.g. executor access, document status, alerts).
- **Reading load**: cap line length 65–75ch on prose surfaces. Sentence case in body. No all-caps body copy.
- **Pillar naming canonical set** (user-facing): **Legal / Medical / Financial / Personal / Family**. Brand-guideline names win over feature-spec names; warmer for persona.
- **Wordmark**: **WHITESWAN** (all caps custom serif) in mastheads only; **WhiteSwan** in body prose. One rule, applied everywhere.
