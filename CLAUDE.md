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
| `/dashboard` | `DashboardPage` — wrapped in `DashboardLayout` |
| `/dashboard/vault` | `VaultPage` |
| `/dashboard/settings` | `SettingsPage` |

**Layouts (`src/components/`):**
- `AuthLayout` — split-panel (decorative SVG dune scene left, form right); used by login/signup.
- `DashboardLayout` — top navbar + left sidebar with five nav items (Dashboard, Vault, Family, Planning, Settings). Active link is detected via `useLocation`.

**Landing page sections** (rendered in order): `Navbar → Hero → About → Plan → Tagline → Features → CallToAction → Footer`. `Quote` is commented out.

**Styling:** Tailwind v4 configured via `@import "tailwindcss"` in `src/index.css`. Custom tokens are defined with `@theme` — **do not** add them as `tailwind.config.js` entries. The palette:
- `espresso-50` … `espresso-950` — warm brown scale (primary text/backgrounds)
- `cream-50` … `cream-400` — warm off-white scale
- `gold-400` … `gold-600` — muted gold accents

Font families: `font-sans` (Inter), `font-serif` (Cormorant Garamond), `font-poppins` (Poppins).

**State & data:** No backend or auth is wired up yet. Dashboard and Vault pages use hardcoded mock data at the top of each file. Auth form handlers contain `// TODO: integrate auth` stubs. There are no route guards protecting `/dashboard/*`.

**Per-page CSS files** (`DashboardPage.css`, `VaultPage.css`, `SettingsPage.css`) hold custom classes (e.g. `.pillar-bar`, `.pentagon-chart`, `.floating-widget`) that complement Tailwind utility classes used inline.
