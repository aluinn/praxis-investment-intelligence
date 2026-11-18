---
title: Use a shared cache for news, events and prices
labels: [enhancement]
---

## Context

News, events and prices are cached in module-level variables. On serverless hosts each instance has its own cache, so the upstream providers can be called more often than the cache lifetimes suggest.

## Task

Investigate and implement an optional shared cache (for example the framework's data cache, or a key-value store behind a small interface). Keep the in-memory implementation as the default so the project still runs with zero configuration. Adding a store dependency needs approval on the issue first.

## Acceptance

- Default behaviour with no configuration is unchanged.
- Cache lifetimes stay the same (news 12 min, events 15 min, prices 60 s).
- `docs/ARCHITECTURE.md` and `docs/PERFORMANCE.md` are updated with the trade-offs and new measurements.

## Pointers

- `lib/news/aggregate.ts`, `lib/events/aggregate.ts`, `lib/market/service.ts`
- `docs/ARCHITECTURE.md` (Decisions and trade-offs)
