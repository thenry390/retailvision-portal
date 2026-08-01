# RetailVision Sprint 3 Test Plan

## Smoke Tests
1. Production build completes.
2. Application starts and login succeeds.
3. Execution navigation is visible for Executive, Program Manager, and Administrator roles.
4. Execution page renders without a blank screen or browser-console error.
5. Existing primary navigation remains functional.

## Functional Tests

| ID | Test | Expected Result |
|---|---|---|
| TP-301 | Open Execution workspace | KPI cards, charts, milestones, and RAID log render |
| TP-302 | Review KPI cards | Values are populated and labels are readable |
| TP-303 | Hover delivery trend | Planned and actual values appear in tooltip |
| TP-304 | Review portfolio health | All health categories and counts appear |
| TP-305 | Review capacity chart | All teams and allocations appear |
| TP-306 | Review milestone timeline | Milestones appear in chronological order |
| TP-307 | Filter RAID by type | Only records matching the selected type remain |
| TP-308 | Sort RAID by severity | Rows reorder by severity ranking |
| TP-309 | Test role navigation | Store Manager does not see Execution; authorized roles do |
| TP-310 | Refresh `/portal/execution` | Route reloads without failure |

## Regression Tests
- Dashboard loads and chart renders.
- Store list and store detail navigation work.
- Programs list, filters, and detail navigation work.
- Approvals list renders.
- Login, logout, and protected routes work.

## Release Gate
Sprint 3 is release-ready when all smoke tests pass, no critical defects remain open, and the production build succeeds.
