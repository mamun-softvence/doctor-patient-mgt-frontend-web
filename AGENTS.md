# Next.js Project Agent Rules — Canonical Contract

These rules apply to all AI-generated and human-written changes in this frontend repository. Refer to `docs/rules/frontend-structure.md` for complete architecture specifications.

## 1. Scope & Approved Stack
- **Framework**: Next.js 16 with App Router, React 19, TypeScript (strict mode).
- **Design & UI**: Tailwind CSS, shadcn/ui primitives, Lucide React icons.
- **Forms & Charts**: React Hook Form + Zod, Recharts.
- **State**: Centralized typed mock-data store in `src/lib/mock/` during the static frontend phase.
- **Disallowed**: Redux, custom CSS-in-JS, unapproved styling libraries, or parallel backends.

## 2. Directory Ownership & Placement
- `src/app/`: Routing shells, layouts, error/not-found boundaries. Route files (`page.tsx`) must remain thin coordinators.
- `src/components/layout/`: Global app shell (Sidebar, Header, Navigation).
- `src/components/shared/`: Cross-feature UI components (DataTable, Pagination, ConfirmationDialog).
- `src/components/ui/`: Atomic shadcn/ui primitives.
- `src/features/<feature>/`: Feature presentation, domain forms, local hooks, and cards (`auth`, `dashboard`, `doctors`, `patients`).
- `src/lib/mock/`: Centralized seed data (12+ doctors, 60+ patients) and reactive CRUD adapters.
- `src/lib/validation/`: Shared Zod schemas.
- `src/types/`: Domain TypeScript types.

## 3. Mandatory Page Scope
The application consists strictly of:
1. `/login`
2. `/dashboard`
3. `/doctors`
4. `/doctors/[doctorId]`
5. `/patients`
6. `not-found` view

Modals/Dialogs are required for **Add Doctor**, **Add Patient**, **Edit Patient**, and **Delete Patient**. Do not add unauthorized pages (e.g. appointments, settings, billing).

## 4. Component Boundaries & Static Invariants
- Prefer Server Components by default. Keep `"use client"` restricted to interactive leaf components.
- Centralize mock data: Never hardcode dashboard metrics independently of patient/doctor mock records.
- Cross-page synchronization: Any patient or doctor mutation must update lists, counters, and charts immediately.
- Backend readiness: Mock functions return promises matching `{ success, message, data, meta }` envelopes.

## 5. Coding & Verification Standards
- Before editing: Review target directory ownership and define a minimal scoped plan.
- Testing: **Playwright is the approved frontend testing framework for browser-level functionality and user workflows. Do not add Vitest, Jest, React Testing Library, or another frontend test runner without explicit approval.**
- After editing: Run `tsc --noEmit`, `eslint`, `pnpm test` (Playwright), and `next build`. Never claim tests ran without verifying actual terminal execution.
- Git commit recommendations: At the end of every verified task, inspect Git changes and proactively recommend path-specific, atomic, Conventional Commits using the `git-change-commit-manager` skill without automatically committing.
- Maintain a consistent healthcare admin UI with clean, responsive layouts.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
