# Changelog

All notable changes are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project aims to follow [Semantic Versioning](https://semver.org/) once it has tagged releases.

## [Unreleased]

### Added
- Unit tests (`node:test`) for portfolio maths, text sanitising, news tagging and formatting.
- Production-build smoke test (`npm run test:e2e`) and micro-benchmarks (`npm run bench`).
- CI (lint, typecheck, test, build, smoke) and CodeQL workflows, Dependabot configuration.
- Contributor, security and community documents, architecture and data-source docs, issue drafts.
- Real desktop and mobile screenshots in `docs/assets/`.

### Changed
- Rebranded from Nexus to **Praxis Investment Intelligence** ("From Insight to Action."): new wordmark, P mark, favicon, app icons and Open Graph image.
- Restyled the interface: flat, square-cornered, hairline-ruled layout with serif headlines, a pure black and off-white monochrome palette with Inter and Inter Tight type, and a plain-scroll landing page with light fade-ins.
- Retook product screenshots from the Praxis UI.
- Browser storage keys keep their original `nexus.*` names so existing saved data is preserved.

## [0.1.0]

### Added
- Portfolio view with live multi-currency pricing, allocation chart and time ranges.
- For You news feed from seven publisher RSS feeds.
- Saved articles and collections, trade journal, events calendar (Snapshot, Binance and user events), and demonstration notifications.
