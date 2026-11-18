---
title: Export holdings as CSV
labels: [good first issue, enhancement]
---

## Context

Holdings live only in the browser, so there is no way to take them elsewhere.

## Task

Add an Export CSV action to the portfolio page that downloads symbol, name, quantity, purchase value and purchase currency for each holding. Generate the file client-side. Escape fields correctly.

## Acceptance

- A button on the portfolio page downloads `praxis-holdings.csv`.
- Values containing commas or quotes are escaped.
- A pure `holdingsToCsv` helper in `lib/` has unit tests.
- No new dependency.

## Pointers

- `components/portfolio/portfolio-view.tsx`
- `types/index.ts` (`Holding`)
- `lib/storage/local.ts`
