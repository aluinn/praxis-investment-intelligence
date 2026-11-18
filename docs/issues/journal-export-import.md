---
title: Export and import the journal as JSON
labels: [enhancement]
---

## Context

Journal entries are stored only in this browser. Clearing site data or switching browser loses them.

## Task

Add Export and Import actions to the journal page. Export downloads a JSON file. Import validates the file with the existing journal schema, shows how many entries will be added, skips entries with ids that already exist, and never overwrites existing entries silently.

## Acceptance

- Export then import into a clean browser restores all entries.
- Invalid or oversized files show a clear error and change nothing.
- Duplicate ids are skipped and reported.
- Import and export logic is a pure function with unit tests.

## Pointers

- `components/journal/journal-view.tsx`
- `lib/validation/schemas.ts` (`journalSchema`)
- `lib/storage/local.ts`
