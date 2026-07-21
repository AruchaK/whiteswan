---
name: WhiteSwan
description: A private study for organizing legacy across five pillars — quiet, considered, in control.
colors:
  espresso-50: "#FAF6F1"
  espresso-100: "#F5EDE3"
  espresso-200: "#E8D9C8"
  espresso-250: "#E2D5C3"
  espresso-300: "#D4BFA6"
  espresso-400: "#B89B78"
  espresso-500: "#9C7D5A"
  espresso-550: "#6B6259"
  espresso-600: "#7A5E3F"
  espresso-700: "#5C4530"
  espresso-750: "#493225"
  espresso-800: "#3D2B1F"
  espresso-900: "#2A1D14"
  espresso-950: "#1A110C"
  cream-50: "#FDFCFA"
  cream-100: "#FAF7F2"
  cream-150: "#F6F3EF"
  cream-200: "#F5F0E8"
  cream-300: "#EDE5D8"
  cream-400: "#DDD1BF"
  gold-100: "#F5E4CE"
  gold-400: "#C9A96E"
  gold-500: "#B8944F"
  gold-600: "#9E7D3F"
  slate-800: "#474B54"
  slate-900: "#222428"
  mist-50: "#EEF2F4"
  mist-100: "#DDDDDD"
  mist-200: "#D0DADC"
  sand-400: "#D6CDC2"
  sand-500: "#D5C4AF"
  sand-600: "#C9B8A2"
  sand-700: "#9C8B78"
  pillar-legal: "#7A5E3F"
  pillar-medical: "#C67A5C"
  pillar-financial: "#5E8C6A"
  pillar-personal: "#B8944F"
  pillar-family: "#9E4B54"
  status-verified: "#15803D"
  status-draft: "#B45309"
  status-danger: "#B91C1C"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "2.4rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  meta:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  card: "20px"
  gutter: "24px"
  section: "32px"
components:
  button-primary:
    backgroundColor: "{colors.espresso-900}"
    textColor: "{colors.cream-50}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "9px 20px"
  button-primary-hover:
    backgroundColor: "{colors.espresso-700}"
    textColor: "{colors.cream-50}"
  button-dark:
    backgroundColor: "{colors.espresso-800}"
    textColor: "{colors.cream-50}"
    rounded: "{rounded.full}"
    padding: "9px 20px"
  button-outline:
    backgroundColor: "{colors.cream-50}"
    textColor: "{colors.espresso-700}"
    rounded: "{rounded.full}"
    padding: "9px 20px"
  card:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.espresso-800}"
    rounded: "{rounded.md}"
    padding: "20px"
  badge-verified:
    backgroundColor: "#F0FDF4"
    textColor: "{colors.status-verified}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
---

# Design System: WhiteSwan

## 1. Overview

**Creative North Star: "The Private Study"**

WhiteSwan is a room, not a dashboard. A person aged 45–70 sits down — perhaps with reading glasses, perhaps under emotional weight — to organize the most sensitive decisions of a life: wills, healthcare directives, family wishes, legacy across five pillars (Legal, Medical, Financial, Personal, Family). The interface must feel like a warm, book-lined study where every object is where it should be and nothing raises its voice. Warmth is carried by an espresso-and-cream editorial palette and a quiet serif; safety is carried by restraint, generous whitespace, and trust signals that never hide.

The system is **document-shaped**: white cards on a warm off-white ground, hairline borders instead of heavy shadows, a serif reserved for titles and paired with Inter for everything that must simply be read. Density is low. Each surface asks for **one quiet action**. Color categorizes (the five pillars each own a hue) and confirms (verified/draft), but never decorates and never alarms.

What this system explicitly rejects: the **bank/fintech aesthetic** (navy-and-gold, dense tables on landing surfaces, transactional tone), **gamified SaaS** (streaks, confetti, completion celebrations), **surveillance language** ("tracking", "monitoring", "score"), and every 2026 AI reflex — glassmorphism, gradient text, neon, drop-shadow stacks, shouty banners, and empty-grid first runs. The subject is death, illness, and aging; the design's job is to leave the reader calmer than it found them.

**Key Characteristics:**
- Warm editorial palette: espresso browns on cream, never cold or corporate.
- Flat and document-like — hairline borders (`espresso-250`), not elevation.
- Serif (Cormorant Garamond) for titles only; Inter carries everything else.
- Low density, one primary action per screen, ≥24px gutters.
- Legibility first: body ≥15px, line-height ≥1.55, 44–48px touch targets.
- Status is always color **plus** icon or label — never color alone.

## 2. Colors

A warm, low-saturation palette: espresso browns for text and primary actions, cream for grounds and surfaces, muted gold as the single warmth accent, with cool slate and mist available for restraint.

### Primary
- **Espresso Ink** (`#2A1D14` `espresso-900`, hover `#5C4530` `espresso-700`, active `#1A110C` `espresso-950`): the anchor of every primary and dark button, the Toast pill, and the strongest headings. Near-black but unmistakably warm-brown, never pure black or navy.
- **Espresso Text** (`#3D2B1F` `espresso-800`): default body text on cream. Secondary text steps down to `espresso-700`/`espresso-600` (`#5C4530`/`#7A5E3F`), never lighter than that for readable copy.

### Secondary
- **Muted Gold** (`#C9A96E` `gold-400`, deepening to `#9E7D3F` `gold-600`): the one warmth accent — a Toast action link, a rare highlight. Used sparingly; it is warmth, never a warning and never a call-to-action fill.

### Tertiary
- **Pillar Hues** — each content pillar owns a color used for its banner, tint, and progress fill: **Legal** `#7A5E3F`, **Medical** `#C67A5C`, **Financial** `#5E8C6A`, **Personal** `#B8944F`, **Family** `#9E4B54`. These are categorization colors (data-viz roles), each paired with a soft `bg` tint and a deep `banner`. They classify content; they are not part of the action or brand-accent vocabulary.
- **Cool Neutrals** — **Slate** (`#474B54` `slate-800`, `#222428` `slate-900`) and **Mist** (`#EEF2F4` `mist-50`, `#D0DADC` `mist-200`): a cooler register for the occasional panel or text-on-dark, deliberately distinct in hue from the warm espressos.

### Neutral
- **Cream Ground** (`#FDFCFA` `cream-50`): the body background — a true warm off-white, the "paper" of the study.
- **Cream Surfaces** (`#FAF7F2`–`#F5F0E8` `cream-100/200`): hover fills, tinted panels, skeleton bases.
- **Cream Divider / Track** (`#EDE5D8` `cream-300`, `#DDD1BF` `cream-400`): progress-bar tracks, toggle rest state.
- **Espresso Border** (`#E2D5C3` `espresso-250`): the hairline border on nearly every card and panel — the system's primary separator in place of shadow.
- **Pure White** (`#FFFFFF`): card and surface fills, sitting one step brighter than the cream ground so cards read as objects on paper.
- **Sand Taupe** (`#D6CDC2`–`#9C8B78` `sand-400/700`): dusty taupe panel backgrounds for hero/CTA moments on marketing surfaces.

### Semantic
- **Verified Green** (`#15803D` text on `#F0FDF4`), **Draft Amber** (`#B45309` text on `#FFFBEB`), **Danger Red** (`#B91C1C`/`#DC2626`): status only, always accompanied by an icon or word. Red is reserved for genuine "needs attention" and destructive actions — never decoration.

### Named Rules
**The Warm-Not-Cold Rule.** Every neutral tilts warm (cream, espresso), never toward gray or navy. If a surface reads cool or corporate, it is wrong — this is a study, not a bank app.

**The Accent-Scarcity Rule.** Gold appears on well under 10% of any screen, and never as a primary CTA fill. Its warmth depends on its rarity.

**The Status-Never-Alone Rule.** Color never carries status by itself. Verified, draft, and needs-attention always pair the hue with a lucide icon or a word, for color-blind and low-vision readers.

## 3. Typography

**Display Font:** Cormorant Garamond (with Georgia, serif)
**Body Font:** Inter (with system-ui, -apple-system, sans-serif)
**Accent Font:** Poppins (available for the wordmark / specific brand lockups)

**Character:** A high-contrast serif paired with a humanist sans on a true contrast axis — the serif brings editorial warmth and gravity to titles; Inter stays quiet, legible, and neutral for the reading and working copy. The pairing is the whole personality: lyrical headline, plain-spoken body.

### Hierarchy
- **Display** (Cormorant Garamond, semibold 600, `2.4rem` / ~38px, line-height 1.1): the auth hero and largest page heroes. Fixed, not fluid — product UI reads at consistent DPI. `text-wrap: balance` territory.
- **Headline / H1** (Cormorant Garamond, semibold 600, `28–40px` responsive, line-height ~1.15): page titles via `PageHeader` (`28→36px` default, `32→40px` on the roomier Vault treatment).
- **Serif Numerals** (Cormorant Garamond, `text-2xl`): the large readiness percentage on pillar banners — a serif figure as a calm focal number, not a hero metric.
- **Title** (Inter, semibold/medium, `15–16px`): card titles, list headings, dialog titles.
- **Body** (Inter, regular 400, `15px`, line-height ≥1.55): primary reading copy; capped at 65–75ch on prose surfaces.
- **Meta / Secondary** (Inter, `13px`, `espresso-600/700`): summaries, helper text, link labels, back links.
- **Caption** (Inter, `12px`, `espresso-600`): field hints, inline errors, badge text, timestamps — the practical floor for supporting copy.
- **Label** (Inter, medium 500, `13px`): form labels, tab labels, button text. Sentence case.

### Named Rules
**The Serif-For-Titles-Only Rule.** Cormorant Garamond is permitted on the wordmark, H1/H2, and standalone display numerals — nowhere else. Buttons, labels, data, and body are always Inter. A serif button label is a defect.

**The 15px Floor.** Reading copy never drops below 15px; supporting meta never below 12px. `text-[10px]`/`text-[11px]` are banned — the persona reads with glasses.

**The Sentence-Case Rule.** Body and labels are sentence case. No ALL-CAPS body, no shouty tracked eyebrows as default scaffolding.

## 4. Elevation

This system is **flat by intent**. Depth comes from **hairline borders and tonal layering**, not shadow. White cards sit on a cream ground and are outlined with a single `espresso-250` (`#E2D5C3`) border; that contrast alone makes them read as objects on paper. Shadows are near-invisible and used only to lift a floating element off the page, never to decorate a resting surface. Glassmorphism, blur, and stacked drop-shadows are prohibited.

### Shadow Vocabulary
- **Card Hairline** (`box-shadow: 0 1px 3px rgba(0,0,0,0.04)`): a whisper under `Card` and pillar cards — felt, not seen. Pairs with the border, never replaces it.
- **Control Knob** (`box-shadow: 0 1px 3px rgba(0,0,0,0.15)`): the toggle-switch knob only, so the moving handle reads above its track.
- **Floating** (`shadow-lg`): reserved for genuinely floating layers — the Toast and the floating preparedness widget — that must clear the page.

### Named Rules
**The Border-Before-Shadow Rule.** Separation is a 1px `espresso-250` border first. Reach for shadow only when an element genuinely floats above the document (toast, popover, floating widget). A resting card earns at most the 0.04-alpha hairline.

## 5. Components

Components are calm, familiar, and consistent — the tool disappears into the task. Same button shape everywhere, same pill for status, same hairline card.

### Buttons
- **Shape:** fully rounded pills (`rounded-full`) at call sites; radius and padding are applied per use (typically `px-4/5 py-2/2.25`, `13px` medium/semibold label).
- **Primary:** `espresso-900` fill, `cream-50` text; hover `espresso-700`, active `espresso-950`. The one loud-but-quiet action per screen.
- **Dark:** `espresso-800` fill, `cream-50` text — a slightly softer sibling for secondary primary actions.
- **Outline:** `espresso-300` border, `espresso-700` text, `cream-100` hover fill — cancels and low-emphasis actions.
- **Light:** white fill, `espresso-900` text — for use on darker/colored grounds.
- **Danger:** `red-600` fill — destructive only, never decorative.
- **States:** `transition-colors`; disabled `opacity-40` + `not-allowed` cursor; keyboard focus shows the global 2px `espresso-600` `:focus-visible` ring.

### Chips / Badges
- **StatusBadge:** a fully rounded pill with an inline lucide icon + label. **Verified** = green text on `green-50`/`green-100` border; **Draft** = amber text on `amber-50`/`amber-100`. Two sizes (`md` in the Vault grid, `sm` in side panels). Color is always joined by icon and word.
- **Needs-attention pill:** `red-700` on `red-50` with a `red-100` border — the sole red-forward status, and only when action is genuinely due.

### Cards / Containers
- **Corner Style:** `rounded-xl` (12px); larger state containers use `rounded-2xl` (16px).
- **Background:** pure white on the cream ground.
- **Border:** 1px `espresso-250` (`#E2D5C3`) — always present.
- **Shadow Strategy:** the Card Hairline only (see Elevation); no nested cards, ever.
- **Internal Padding:** `20–24px` (`p-5`/`p-6`).
- **PillarCard:** a signature variant — a colored pillar banner (icon in a translucent white circle, label, done/total, serif % ) over a white body with summary, `ProgressBar`, status, and a quiet "Open pillar →" link.

### Inputs / Controls
- **ToggleSwitch:** `cream-400` track → `espresso-900` when checked; white knob with the Control Knob shadow; `duration-250` transitions. 44px-class hit area.
- **ProgressBar:** `cream-300` track, fill by pillar `color` or class; `h-1.5`, animated `duration-700 cubic-bezier(0.22,1,0.36,1)`. Reads as readiness, never a game score.

### Navigation
- **AppLayout:** top navbar + left sidebar with five items (Dashboard, Vault, Family, Planning, Settings); active link detected via `useLocation`. Plus a `FloatingPreparednessWidget`. Quiet, persistent, low-contrast until active.
- **BackLink:** "← Back to X", `13px` medium `espresso-600`, lucide arrow, no underline — the standard return affordance.

### State Views (signature)
- **LoadingSkeleton:** cream-toned pulsing placeholders that mirror the real grid — never a centered spinner. `animate-skeleton` with a reduced-motion fallback.
- **ErrorState:** bordered white panel, amber warning glyph, message, and an outline "Try again" — recoverable, calm.
- **EmptyState:** a dashed `espresso-250` border on `cream-50`, an icon, and a teaching message + action. Empty is a warm, guiding moment, not a blank grid.
- **Toast:** fixed bottom-center `espresso-900` pill, green check, optional gold action link; top of the z-scale; auto-dismiss ~4.5s; `animate-slide-up`.

## 6. Do's and Don'ts

### Do:
- **Do** anchor primary actions in `espresso-900` (`#2A1D14`) and keep the ground a true warm off-white `cream-50` (`#FDFCFA`).
- **Do** separate surfaces with a 1px `espresso-250` (`#E2D5C3`) border before reaching for any shadow.
- **Do** reserve Cormorant Garamond for the wordmark, H1/H2, and display numerals; set everything else in Inter.
- **Do** keep body ≥15px, line-height ≥1.55, touch targets ≥44px (target 48), and prose capped at 65–75ch.
- **Do** pair every status color with an icon or word (verified/draft/needs-attention).
- **Do** give every surface one quiet primary action and generous ≥24px gutters.
- **Do** honor `prefers-reduced-motion` on every animation, and keep transitions ≤200–250ms ease-out.
- **Do** make first-run states warm, prefilled, and guided — teach the surface.

### Don't:
- **Don't** use glassmorphism, gradients, gradient text, neon, or stacked drop-shadows. Hard ban.
- **Don't** drift toward the bank/fintech aesthetic — no navy-and-gold, no dense data tables on landing surfaces, no transactional tone.
- **Don't** gamify — no streaks, confetti, badges, or completion celebrations. Tonally wrong for this subject.
- **Don't** use surveillance language: "tracking", "monitoring", "score". Never.
- **Don't** ship shouty banners, ALL-CAPS body, bright reds as decoration, modal stacks, or auto-playing motion.
- **Don't** open onto an empty grid; an empty-grid first run is a failure state.
- **Don't** use gold as a primary CTA fill or a warning — it is a scarce warmth accent only.
- **Don't** set body text below 15px or use `text-[10px]`/`text-[11px]`; don't nest cards inside cards.
