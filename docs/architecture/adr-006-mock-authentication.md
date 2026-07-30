# ADR-006: Use mock authentication for the portfolio MVP

## Status
Accepted for Sprint 1.

## Context
RetailVision needs a realistic login, session, protected-route, and role-navigation experience before a production identity provider is available.

## Decision
Use a React context backed by localStorage and predefined demo roles. Keep authentication behind a small API-shaped interface so it can later be replaced by Entra ID, Auth0, or another OIDC provider.

## Consequences
- Enables a complete demo flow immediately.
- Keeps the implementation understandable for portfolio reviewers.
- Does not provide production security.
- Backend authorization remains required before any real deployment.
