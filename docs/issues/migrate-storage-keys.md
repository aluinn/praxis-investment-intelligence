---
title: Migrate browser storage keys from nexus.* to praxis.*
labels: [enhancement]
---

## Context

The app was renamed from Nexus to Praxis but browser storage keys still start with `nexus.` so that no one lost data. New contributors will find that confusing.

## Task

Introduce `praxis.*` keys. On read, use the new key if present, otherwise read the old `nexus.*` key and write the value to the new key. Do not delete the old key in the first release. Do the same for the session flag `nexus-intro-complete`.

## Acceptance

- Existing data under `nexus.*` keys appears after upgrading.
- New writes go to `praxis.*` keys.
- Unit tests cover: only old key, only new key, both keys (new wins), corrupt value.
- README storage table updated.

## Pointers

- `lib/storage/local.ts` (`STORAGE_KEYS`)
- `lib/storage/use-stored.ts`
- `lib/motion.ts` (`INTRO_STORAGE_KEY`)
