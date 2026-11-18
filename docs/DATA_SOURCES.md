# Data sources

All sources are public and need no API key. The news, Coinbase and Binance requests send a `User-Agent` of `Praxis/1.0`. Check each provider's terms before deploying at scale.

| Data | Provider | Endpoint (as used in code) | Cache | Code |
| --- | --- | --- | --- | --- |
| News | CoinDesk, Cointelegraph, Decrypt, CryptoSlate, The Block, Bitcoin Magazine, The Defiant (RSS) | See `FEEDS` in `lib/news/sources.ts` | 12 min | `lib/news/aggregate.ts` |
| Prices | Coinbase Exchange public API | `https://api.exchange.coinbase.com/products/{SYMBOL}-USD/ticker` and `/stats` | 60 s | `lib/market/coinbase.ts` |
| Price history | Coinbase Exchange public API | `/products/{SYMBOL}-USD/candles?granularity=86400` | 10 min | `lib/market/coinbase.ts` |
| FX rates | Frankfurter | `https://api.frankfurter.dev/v1/latest?from=USD` | 1 h | `lib/market/fx.ts` |
| Governance votes | Snapshot public GraphQL (`hub.snapshot.org`) for ten well-known spaces | `SNAPSHOT_SPACES` in `lib/events/sources.ts` | 15 min | `lib/events/snapshot.ts` |
| Exchange activity | Binance public announcements (listings and new project launches) | `BINANCE_CATALOGS` in `lib/events/sources.ts` | 15 min | `lib/events/binance.ts` |

## Behaviour worth knowing

- **Per-source timeouts.** News, prices and events use 8 s, 7 s and 8 s timeouts respectively, so one slow provider cannot hold up the page.
- **Plain-text only.** Feed titles and excerpts go through `sanitizeText` and links must be `http(s)`.
- **Prices are USD pairs converted to your currency.** Supported display currencies: GBP, USD, EUR, JPY, CAD, AUD.
- **History limit.** Daily candles are limited to Coinbase's 300-candle window, so `1Y` and `ALL` cover at most that period.
- **Labelled fallbacks.** If a provider is unavailable the UI shows cached or demo data and says so. Demo prices are illustrative and live in `data/assets.ts`.
- **User events** (network upgrades, token unlocks and so on) are entered by the user and stored in the browser. They are not fetched.

## Adding a source

- News: add the publication to `NEWS_SOURCES` in `types/index.ts` and an entry to `FEEDS` in `lib/news/sources.ts`. Use the publisher's official feed.
- Prices: implement `MarketDataProvider` from `lib/market/types.ts` and use it from `quoteForUsd` in `lib/market/service.ts`.
