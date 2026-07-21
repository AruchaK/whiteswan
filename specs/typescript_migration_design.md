# Feature: React TypeScript Migration

## Requirements (EARS Format)

- While the application is being developed, when source code is checked, the system shall validate all React and domain modules with strict TypeScript.
- While a production build is created, when the build command runs, the system shall type-check before Vite emits assets.
- While users navigate or interact with existing screens, when the migrated application runs, the system shall preserve the current routes, rendered content, local state, and mock-data behavior.
- While contributors lint the project, when ESLint runs, the system shall understand TypeScript and TSX syntax and enforce React hook and refresh rules.
- While domain data is accessed by a dynamic key, when TypeScript checks the access, the system shall require a valid domain key or an explicit runtime guard.

## Architecture

### Frontend

- Rename React modules from `.jsx` to `.tsx` and non-JSX source modules from `.js` to `.ts`.
- Add explicit types for component props, form and DOM events, refs, state models, router parameters, icon components, domain records, and local resource stores.
- Keep the existing component hierarchy, route map, Tailwind styling, and client-side behavior intact.
- Use inference where it is precise; add named domain types at shared boundaries and avoid `any`.

### Backend

- No backend, API, database, or server runtime exists in this repository.
- No endpoint or persistence changes are part of this migration.

### Security

- React continues to escape interpolated text by default; the migration will not introduce raw HTML rendering.
- Existing login/sign-up handlers remain mock client-side flows. TypeScript does not make them authenticated or secure, and dashboard route protection remains limited to the existing client-side mock.
- User-entered values and external data will be typed at their usage boundaries, but server-side validation, authorization, rate limiting, and audit logging require a future backend implementation.
- No secrets, credentials, or sensitive response models will be introduced.

## Implementation Plan

- [x] Add strict TypeScript compiler configuration and TypeScript-aware ESLint tooling.
- [x] Convert Vite configuration, the React entry point, and application routes.
- [x] Convert shared domain/library modules and export reusable types.
- [x] Convert UI primitives, shared components, and pages with typed props, events, refs, and state.
- [x] Run type checking, linting, and the production build; resolve all errors.
- [x] Confirm no application `.js` or `.jsx` modules remain.

## Acceptance Criteria

- `pnpm typecheck` succeeds.
- `pnpm lint` succeeds.
- `pnpm build` succeeds and performs type checking.
- All modules under `src` use `.ts` or `.tsx`.
- `vite.config.ts` replaces `vite.config.js`.
- Strict mode is enabled without `any` escape hatches or blanket error suppressions.
- Existing application routes and visible behavior remain unchanged.
