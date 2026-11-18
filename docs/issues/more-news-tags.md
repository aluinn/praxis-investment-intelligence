---
title: Tag more assets in news headlines
labels: [good first issue, enhancement]
---

## Context

News articles get asset tags (BTC, ETH, SOL, ADA, XRP, NEAR) from simple patterns. The app supports many more assets (LINK, DOT, AVAX, UNI, AAVE and others), so stories about them currently only get the generic CRYPTO tag and are missed by the For You asset filters.

## Task

Add tagging rules for more of the assets listed in `data/assets.ts`. Watch for symbols that are also common English words (for example OP, NEAR, SUI): require the full project name, or match case-sensitively, as the existing NEAR rules do.

## Acceptance

- At least five more assets are tagged from headlines.
- Unit tests in `tests/unit/tags.test.ts` cover each new rule, including one false-positive case.
- `npm test` and `npm run lint` pass.

## Pointers

- `lib/news/tags.ts` (`ASSET_RULES`)
- `data/assets.ts`
- `tests/unit/tags.test.ts`
