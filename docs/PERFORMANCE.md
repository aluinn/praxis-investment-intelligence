# Performance

These are measurements, not guarantees. Network-bound numbers depend on the providers and your connection at the time.

**Machine:** Apple M1 Pro (8 cores), macOS 15.7.4, Node.js v24.20.0, Next.js 16.4.0 production build served with `next start`, run once on 18 Nov 2026.

## API route latency

Local `curl` timings against `next start`, one request per row. "Cold" is the first request after the server starts, so it includes the upstream calls to the real providers. "Warm" is the same request again, served from the in-memory cache.

| Route | Cold | Warm (3 requests) |
| --- | --- | --- |
| `/api/news` (7 RSS feeds fetched in parallel) | 454 ms | 2.8 to 4.0 ms |
| `/api/prices?symbols=BTC,ETH,SOL&currency=GBP&range=1D` | 98 ms | 2.0 to 2.4 ms |
| `/api/events` (Snapshot + Binance) | 365 ms | 2.2 to 3.1 ms |

Cold time is dominated by the slowest upstream, because the sources are fetched in parallel. Cache lifetimes: news 12 min, events 15 min, prices 60 s.

Reproduce:

```bash
npm run build
npx next start -p 3101 &
for i in 1 2 3 4; do curl -s -o /dev/null -w "%{time_total}\n" http://127.0.0.1:3101/api/news; done
```

## Pure helper micro-benchmarks

`npm run bench` times the helpers that run for every article or holding. 50,000 to 200,000 iterations per row after a warm-up.

| Operation | Time per op | Ops per second |
| --- | --- | --- |
| `sanitizeText` (about 600 characters of HTML) | 5.10 µs | 196,017 |
| `normalizeHeadline` | 0.31 µs | 3,246,404 |
| `tagsFor` (title and excerpt) | 0.29 µs | 3,410,399 |
| Portfolio total and allocation (100 holdings) | 1.48 µs | 675,680 |

At these speeds, ingesting the 80 articles the news route keeps is well under a millisecond of CPU in the sanitising and tagging steps, so feed latency, not processing, determines how fast news loads.

## What was not measured

Browser rendering performance, bundle sizes and Lighthouse scores have not been measured for this document.
