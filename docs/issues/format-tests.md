---
title: Add unit tests for the date and time formatters
labels: [good first issue, enhancement]
---

## Context

`lib/format.ts` has relative-time, journal-date, event-date and countdown formatters used across the app. Only currency, percent and quantity formatting are covered by tests today.

## Task

Add tests for `formatRelativeTime`, `formatJournalDate`, `formatEventDate` and `formatDayCountdown`. Pass a fixed `now` value so the tests are deterministic, and cover boundaries (under a minute, 59 minutes, 23 hours, 6 days, a week or more) and invalid dates.

## Acceptance

- New cases in `tests/unit/format.test.ts`.
- Tests do not depend on the machine's current date or timezone.
- `npm test` passes.

## Pointers

- `lib/format.ts`
- `tests/unit/format.test.ts`
