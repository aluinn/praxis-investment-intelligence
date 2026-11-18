# Security policy

## Reporting a vulnerability

Please report vulnerabilities privately using GitHub's private advisories: open the repository's **Security** tab and choose **Report a vulnerability**. Do not open a public issue for security problems.

Expect an acknowledgement within a few days. Fixes are released as soon as they are ready and credited in the changelog unless you prefer otherwise.

## Supported versions

Only the latest commit on `main` is supported. Praxis has no tagged releases yet.

## Scope and design notes

Praxis has no accounts, no database and no server-side secrets. Understanding the design helps decide what is in scope:

- **Server routes** (`/api/news`, `/api/prices`, `/api/events`) fetch public data from publisher RSS feeds, Coinbase, Frankfurter, Snapshot and Binance. Responses are validated with Zod before they are returned.
- **Untrusted text.** Feed titles and excerpts are stripped to plain text by `lib/news/sanitize.ts` and links are restricted to `http(s)`. Reports of markup or script reaching the page are in scope.
- **Browser storage.** Holdings, journal entries, saved articles and events live in `localStorage` and are validated on read. Nothing is sent to a server.
- **No trading.** Praxis has no wallet or exchange connection and holds no credentials.

In scope: injection through feed or API data, unsafe link handling, SSRF or open-redirect behaviour in the API routes, and dependency vulnerabilities that are reachable in this app.

Out of scope: the accuracy of third-party prices or news, and attacks that need local access to a user's browser profile.
