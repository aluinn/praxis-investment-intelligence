---
title: Remember the selected portfolio time range
labels: [good first issue, enhancement]
---

## Context

The portfolio range buttons (1D, 7D, 1M, 3M, 1Y, ALL) reset to 1D on every visit. Display currency and interests are already remembered, so range should be too.

## Task

Store the selected range in browser storage using the existing validated storage helpers, and restore it on load. Reuse `timeRangeSchema`.

## Acceptance

- Reloading the page keeps the last selected range.
- A missing or invalid stored value falls back to 1D.
- Storage uses a new key added to `STORAGE_KEYS`; existing keys are unchanged.

## Pointers

- `components/portfolio/portfolio-view.tsx` (`useState<TimeRange>`)
- `lib/storage/use-stored.ts`, `lib/storage/local.ts`
- `lib/validation/schemas.ts` (`timeRangeSchema`)
