# RetailVision Sprint 3 Backlog

## Sprint Goal
Provide executives and program managers with a centralized execution workspace for monitoring portfolio progress, schedule variance, capacity, milestones, and RAID items.

## Stories

### EXE-301 — Executive KPI summary
As an executive, I want a concise set of portfolio KPIs so that I can identify delivery concerns quickly.

Acceptance criteria:
- Display portfolio completion, open RAID items, team capacity, and schedule variance.
- Values are derived from shared mock data.
- KPI cards remain readable on supported screen sizes.

### EXE-302 — Planned-versus-actual trend
As a program manager, I want to compare planned and actual completion so that I can identify schedule drift.

Acceptance criteria:
- Display eight weeks of planned and actual progress.
- Provide chart legend and hover details.
- Actual progress is visually distinguishable from plan.

### EXE-303 — Portfolio health
As an executive, I want a summary of program health so that I can focus attention on at-risk work.

Acceptance criteria:
- Show On Track, Needs Attention, and At Risk categories.
- Display counts and a graphical breakdown.

### EXE-304 — Resource capacity
As a program manager, I want visibility into team allocations so that I can identify capacity constraints.

Acceptance criteria:
- Display allocation by team.
- Support values from zero through 100 percent.
- Identify teams approaching capacity.

### EXE-305 — Executive milestone timeline
As an executive, I want upcoming milestones in chronological order so that I know which commitments require attention.

Acceptance criteria:
- Show date, milestone, and program.
- Distinguish complete, current, and upcoming milestones.

### EXE-306 — RAID log
As a program manager, I want one view of risks, assumptions, issues, and dependencies so that ownership and mitigation remain visible.

Acceptance criteria:
- Display item ID, description, type, owner, severity, status, and due date.
- Filter by RAID type.
- Sort by severity.
- Preserve readable behavior on narrow screens through horizontal scrolling.

## Definition of Done
- `npm run build` succeeds locally.
- The application runs without browser-console errors.
- Existing Dashboard, Stores, Programs, and Approvals workflows continue to function.
- Execution is available to Executive, Program Manager, and Administrator roles.
- Sprint documentation and release notes are included.
