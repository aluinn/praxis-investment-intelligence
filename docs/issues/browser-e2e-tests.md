---
title: Add browser end-to-end tests for the main flows
labels: [enhancement]
---

## Context

CI runs a smoke test that fetches each page and API route, but nothing exercises the interface itself.

## Task

Add Playwright tests for: adding a holding, recording a journal entry, saving an article and adding it to a collection, and creating an event. Adding Playwright is a new dependency, so open a discussion on the issue and wait for approval before adding it. Add the tests to CI as a separate job.

## Acceptance

- Tests pass locally and in CI against the production build.
- Tests set up their own browser storage and do not depend on live feeds.
- Trace and screenshot artifacts are uploaded on failure.

## Pointers

- `.github/workflows/ci.yml`
- `scripts/e2e-smoke.mjs` (existing smoke test)
- `components/portfolio/add-holding-dialog.tsx`, `components/journal/entry-dialog.tsx`
