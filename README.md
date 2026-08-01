# RetailVision

RetailVision is a portfolio-quality enterprise retail-operations SaaS prototype. It connects store profiles, programs, physical assets, approval workflows, compliance signals, and executive insights in one application.

## Sprint 1 capabilities

- Mock authentication with persisted sessions
- Protected routes
- Role-aware navigation
- Executive dashboard
- Searchable store directory
- Rich store detail view
- Approval workflow prototype
- Responsive dark design system

## Run locally

Requirements: Node.js 20 or later.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Select a demo persona on the login screen or use:

- `program@retailvision.demo`
- Password: `demo123`

Any valid email and password of six or more characters also signs into the Program Manager demo.

## Production build

```bash
npm run build
npm run preview
```

## Important security note

Authentication is deliberately mocked for this portfolio increment. Production deployment would require server-side authentication and authorization, secure HTTP-only cookies or an OIDC flow, CSRF protections, audit logging, and secrets management.

## Documentation

- `docs/product/sprint-1-backlog.md`
- `docs/architecture/adr-006-mock-authentication.md`
- `docs/releases/v0.2.0-sprint-1.md`

## Sprint 2 — Program Management

This build adds the first Program Management vertical slice:

- Program portfolio navigation and directory
- Search, customer and status filters
- Sortable program data table
- Portfolio summary metrics
- Program detail route and overview
- Milestone timeline
- Assigned store drill-through
- Program asset status table
- Activity feed

Routes:

- `/portal/programs`
- `/portal/programs/:programId`


## Sprint 3 — Execution Tracking
Sprint 3 adds an executive execution control center with KPIs, planned-versus-actual trends, portfolio health, capacity planning, milestone tracking, and a RAID log. See `docs/SPRINT-3-RELEASE-NOTES.md`.

## Sprint 4 API architecture

RetailVision now loads product data asynchronously through `apiClient` → domain services → `RetailDataProvider` → pages. The current adapter uses local fixture data while preserving REST-style endpoint boundaries. To test the error and retry state, open any portal URL with `?apiError=1`.
