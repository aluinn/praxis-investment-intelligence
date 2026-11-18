---
title: Client-side price alerts while the tab is open
labels: [enhancement]
---

## Context

The Notifications page lists demonstration notices only. There is no background service, so alerts cannot fire when the app is closed.

## Task

Let users set an above or below threshold per held asset, stored in the browser. When the portfolio page refreshes prices (about once a minute), compare against thresholds and add an in-app notification. Say clearly in the UI that alerts only work while a Praxis tab is open.

## Acceptance

- Thresholds persist across reloads.
- A crossing creates one notification, not one per refresh.
- Notifications page copy explains the limitation.
- The threshold comparison is a pure function with unit tests.

## Pointers

- `components/notifications/notifications-view.tsx`
- `components/portfolio/portfolio-view.tsx` (price refresh loop)
- `lib/storage/local.ts`
