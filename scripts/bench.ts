// Micro-benchmarks for the pure helpers on the hot path (news ingestion, portfolio maths).
// Usage: node scripts/bench.ts   (Node >= 22.18, or 22.6+ with --experimental-strip-types)
import { allocationPercent, holdingValue, portfolioTotal } from "../lib/portfolio/calc.ts";
import { normalizeHeadline, sanitizeText } from "../lib/news/sanitize.ts";
import { tagsFor } from "../lib/news/tags.ts";

function bench(name: string, iterations: number, fn: () => void) {
  for (let i = 0; i < Math.min(iterations, 1000); i++) fn(); // warm-up
  const start = process.hrtime.bigint();
  for (let i = 0; i < iterations; i++) fn();
  const ns = Number(process.hrtime.bigint() - start);
  const perOp = ns / iterations;
  console.log(`| ${name} | ${iterations.toLocaleString("en-GB")} | ${(perOp / 1000).toFixed(2)} µs | ${Math.round(1e9 / perOp).toLocaleString("en-GB")} |`);
}

const html = `<p>Bitcoin &amp; <b>Ethereum</b> rally as the SEC approves a spot ETF.</p>`.repeat(8) + `<script>alert(1)</script>`;
const holdings = Array.from({ length: 100 }, (_, i) => ({ quantity: i + 1, price: 100 + i }));

console.log(`node ${process.version} · ${process.platform}/${process.arch}\n`);
console.log("| Operation | Iterations | Time per op | Ops per second |");
console.log("| --- | --- | --- | --- |");
bench("sanitizeText (~600 chars of HTML)", 50_000, () => sanitizeText(html));
bench("normalizeHeadline", 200_000, () => normalizeHeadline("Bitcoin Rallies Past $100,000 As Traders Pile In!"));
bench("tagsFor (title + excerpt)", 100_000, () => tagsFor("Ethereum upgrade lands", "Solana and Bitcoin also moved on ETF news"));
bench("portfolio total + allocation (100 holdings)", 50_000, () => {
  const values = holdings.map((h) => holdingValue(h.quantity, h.price));
  const total = portfolioTotal(values);
  values.map((v) => allocationPercent(v, total));
});
