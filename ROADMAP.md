# Roadmap

This is direction, not a promise. Items link to issue drafts in [docs/issues/](docs/issues/) where one exists.

## Now

- Keep the research loop tight: read news, save it, record a decision, review the portfolio.
- Improve test coverage around `lib/` (formatting, validation, providers).

## Next

- Rename browser storage keys to `praxis.*` with a read-through to the old `nexus.*` keys, so no one loses data ([issue](docs/issues/migrate-storage-keys.md)).
- Export and import for the journal and holdings ([journal](docs/issues/journal-export-import.md), [holdings CSV](docs/issues/holdings-csv-export.md)).
- Remember the chosen portfolio time range ([issue](docs/issues/persist-portfolio-range.md)).
- Browser-level end-to-end tests for the main flows ([issue](docs/issues/browser-e2e-tests.md)).

## Later

- Client-side price alerts that work while the tab is open ([issue](docs/issues/price-alerts.md)).
- A shared cache for news and prices so serverless deployments do not each keep their own ([issue](docs/issues/shared-server-cache.md)).
- More currencies and more assets with live pricing.

## Not planned

- Trade execution, wallet or exchange connections, or personalised financial advice.
- Accounts and cloud sync (data stays in the browser by design).
