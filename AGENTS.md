# Next.js Project Agent Rules — Canonical Contract

These rules apply to all AI-generated and human-written changes in this frontend repository. Refer to `docs/rules/frontend-structure.md` for complete architecture specifications.

## 1. Scope & Approved Stack
- **Framework**: Next.js 16 with App Router, React 19, TypeScript (strict mode).
- **Design & UI**: Tailwind CSS, shadcn/ui primitives, Lucide React icons.
- **Forms & Charts**: React Hook Form + Zod, Recharts.
- **State**: Centralized typed mock-data store in `src/lib/mock/` during the static frontend phase.
- **Strict Backend & Database Boundary**:
  - **No Database Operations from Next.js**: Under no circumstances should Next.js connect directly to MongoDB, Mongoose, Prisma, or any database driver. No database packages may be installed in the frontend.
  - **All Database Operations in Express**: All database operations, persistence, schema validation, and aggregations are owned exclusively by the Express backend.
  - **Server-Side Data Requests via Express API**: If there is a server-side data request from a Next.js server function (Server Component, Route Handler, Server Action, or server utility), it must request an API endpoint of the Express backend (`NEXT_PUBLIC_API_URL` or internal backend URL).
- **Mandatory Documentation**: Whenever creating or extending application features, always create and maintain its required documentation.
- **Disallowed**: Direct database drivers (Mongoose, MongoDB, Prisma), Redux, custom CSS-in-JS, unapproved styling libraries, or parallel backends.

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

## 6. Frontend State Management Architecture & Boundaries
Refer to `docs/rules/frontend-state-management.md` and `docs/state/state-architecture.md` for complete policies:
- **Local Component State**: React `useState` for transient UI toggles/modals.
- **Shared UI State**: Zustand for cross-page UI settings only.
- **Domain Records (Mock Phase)**: Single authoritative Zustand mock store in `src/lib/mock/store.ts`. All dashboard counts and doctor caseloads must derive from this single source of truth.
- **Server State (API Phase)**: TanStack Query owns Express server responses. Never replicate API records into Zustand.
- **Search, Filters & Pagination**: Always store in URL search params. Filter changes reset `page=1`.
- **Forms**: React Hook Form + Zod (`@hookform/resolvers/zod`).
- **State Management Skills**:
  - `frontend-state-boundaries`: Place state into local, URL, store, form, or server cache.
  - `state-mock-api-transition`: Migrate mock actions to Express API endpoints with TanStack Query.
  - `state-consistency-audit`: Verify cross-page reactive synchronization and caseload invariants.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
