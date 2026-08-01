# Sprint 4 Backlog — API Integration and Service Layer

## Sprint Goal
Decouple the RetailVision user interface from static mock-data imports and introduce an asynchronous, replaceable API architecture.

## Delivered Stories
- RV-401 Central API client with simulated latency and normalized errors.
- RV-402 Domain service layer for Dashboard, Stores, Programs, Approvals, and Execution.
- RV-403 Shared data provider that loads endpoint responses asynchronously.
- RV-404 Loading skeleton displayed while requests are in progress.
- RV-405 Error state with retry action.
- RV-406 Pages consume service-backed data rather than importing business data directly.
- RV-407 REST contracts documented for future backend implementation.

## Acceptance Criteria
- No page imports business data from `src/data/mockData.ts`.
- All primary modules load through services.
- A forced API failure displays an error and retry option.
- Existing filtering, drill-downs, charts, and RAID functionality remain available.
- TypeScript compilation succeeds.
