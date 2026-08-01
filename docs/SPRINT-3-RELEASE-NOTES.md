# RetailVision Sprint 3 Release Notes

## Release
v0.3.0 — Execution Management

## Added
- Execution navigation and protected route
- Portfolio KPI cards
- Planned-versus-actual delivery trend
- Program-health visualization
- Team-capacity visualization
- 30-day executive milestone timeline
- RAID log covering risks, assumptions, issues, and dependencies
- RAID type filtering and severity sorting
- Responsive Execution workspace styling
- Sprint 3 backlog and test plan

## Corrective Changes
- Corrected Ant Design table-filter typing for current React and Ant Design definitions.
- Retained a single populated `mockData.ts` source to avoid duplicate-module resolution problems.

## Known Limitations
- Data is static and imported from `src/data/mockData.ts`.
- Add RAID Item and Export Status buttons are presentation-only.
- No persistent backend or API integration is included.
