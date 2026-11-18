---
title: Add Swiss franc (CHF) as a display currency
labels: [good first issue, enhancement]
---

## Context

Portfolio values can be shown in GBP, USD, EUR, JPY, CAD and AUD. Prices are fetched in USD and converted with a rate from Frankfurter, so adding a currency is mostly configuration.

## Task

Add CHF. Extend the `CURRENCIES` list, the currency label table, and the static fallback FX table used when Frankfurter is unreachable.

## Acceptance

- CHF appears in the currency picker and portfolio values display with the correct symbol.
- `/api/prices?currency=CHF` returns CHF quotes.
- The fallback table has an approximate CHF rate with a comment saying it is approximate.
- Existing saved currency preferences still load.

## Pointers

- `types/index.ts` (`CURRENCIES`)
- `data/currencies.ts` (`CURRENCY_INFO`)
- `lib/market/fx.ts` (`FALLBACK_RATES`)
- `components/portfolio/currency-picker.tsx`
