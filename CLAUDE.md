# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server with HMR
pnpm build      # production build
pnpm preview    # preview production build
pnpm lint       # ESLint
```

No test suite is configured.

## Architecture

**Stack:** React 19 + Vite 8 + Tailwind CSS v4, JavaScript (`.jsx`), react-router-dom v7, lucide-react icons.

**Routing** is defined entirely in `src/App.jsx`:

| Path | Component |
|---|---|
| `/` | `LandingPage` (inline, composed of section components) |
| `/login`, `/signup` | `LoginPage`, `SignUpPage` — wrapped in `AuthLayout` |
| `/about` | `AboutPage` |
| `/dashboard` | `DashboardPage` |
| `/dashboard/vault` | `VaultPage` |
| `/dashboard/settings` | `SettingsPage` |
| `/dashboard/family` | `FamilyPage` |
| `/family/add` | `FamilyAddPage` |
| `/family/tree` | `FamilyTreePage` |
| `/dashboard/planning` | `PlanningPage` — five pillar cards + overall preparedness |
| `/dashboard/planning/:pillar` | `PillarPlanningPage` — one page for all five pillars |

The `/dashboard/*` pages wrap their content in `AppLayout` themselves (the layout is not applied at the route level).

**Layouts (`src/components/`):**
- `AuthLayout` — split-panel (decorative SVG dune scene left, form right); used by login/signup.
- `AppLayout` — top navbar + left sidebar with five nav items (Dashboard, Vault, Family, Planning, Settings) + a `FloatingPreparednessWidget`. Active link is detected via `useLocation`. Every dashboard page renders `<AppLayout>{…}</AppLayout>`.

**Landing page sections** (rendered in order): `Navbar → Hero → About → Plan → Tagline → Features → CallToAction → Footer`. `Quote` is commented out.

**Styling:** Tailwind v4 configured via `@import "tailwindcss"` in `src/index.css`. Custom tokens and keyframe/animation utilities (`animate-fade-in`, `animate-slide-up`, `animate-gentle-pulse`) are defined there — there are **no** per-page CSS files and no `tailwind.config.js`; **do not** add tokens as `tailwind.config.js` entries. The palette (all defined with `@theme` in `src/index.css`):
- `espresso-50` … `espresso-950` — warm brown scale (primary text/backgrounds)
- `cream-50` … `cream-400` — warm off-white scale
- `gold-100` … `gold-600` — muted gold accents
- `slate-800/900`, `mist-50/100/200`, `sand-400`…`sand-700` — cool neutral darks, text-on-dark grays, and dusty taupe panel backgrounds

Font families: `font-sans` (Inter), `font-serif` (Cormorant Garamond), `font-poppins` (Poppins).

**Shared UI primitives (`src/components/ui/`):** `Card`, `Button` (variants: primary/outline/dark/light/danger, polymorphic via `as`), `ToggleSwitch`, `CategoryIcon`, `FloatingPreparednessWidget`. Prefer these over re-implementing.

**Domain data & helpers (`src/lib/`):**
- `pillars.js` — the five pillars (`legal`, `medical`, `financial`, `personal`, `family`) with `label`, `color`, `bg`, `banner`, and lucide `icon`; plus `PILLARS_BY_KEY` lookup. Single source of truth for pillar identity across pages.
- `pillarData.js` — per-pillar mock planning content (badges, readiness, tasks, completed, contacts, notes) keyed by pillar; consumed by `PillarPlanningPage`.
- `currentUser.js` — the hardcoded demo user (`Somchai Jaidee`).

**State & data:** No backend or auth is wired up yet. Pages use hardcoded mock data (inline at the top of each file, or in `src/lib/`). Auth form handlers contain `// TODO: integrate auth` stubs. There are no route guards protecting `/dashboard/*`. Interactive state (section tabs, the "Add a new task" dialog in `NewTaskDialog`, checkbox toggles) is local `useState` only — nothing persists across reloads.
