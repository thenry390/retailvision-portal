# RetailVision REST API Contracts — Sprint 4

The Sprint 4 adapter simulates these read endpoints. The UI accesses them only through domain services.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/dashboard` | Dashboard approval activity and delivery trend |
| GET | `/api/stores` | Store directory, store assets, and store timeline |
| GET | `/api/programs` | Program portfolio, milestones, assets, and activity |
| GET | `/api/approvals` | Approval queue |
| GET | `/api/execution` | Execution trend, program health, capacity, milestones, and RAID |

## Error Contract
Errors are normalized as `ApiError` with a message and HTTP-like status code. Add `?apiError=1` to the browser URL to simulate a 503 response and validate the shared retry experience.

## Migration Path
Replace the route map in `src/api/apiClient.ts` with `fetch` or Axios calls. Page components and domain services should not require redesign.
