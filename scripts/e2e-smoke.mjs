// End-to-end smoke test: serves the production build and checks every page and API route.
// Usage: npm run build && node scripts/e2e-smoke.mjs
import { spawn } from "node:child_process";
import assert from "node:assert/strict";

const PORT = process.env.PORT ?? "3100";
const base = `http://127.0.0.1:${PORT}`;
const server = spawn("npx", ["next", "start", "-p", PORT], { stdio: "inherit", env: { ...process.env, NODE_ENV: "production" } });
const stop = () => server.kill();
process.on("exit", stop);

async function waitReady() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(base);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("server did not start");
}

const pages = [
  ["/", "Praxis"],
  ["/app/for-you", "Praxis"],
  ["/app/portfolio", "Praxis"],
  ["/app/journal", "Praxis"],
  ["/app/saved", "Praxis"],
  ["/app/notifications", "Praxis"],
  ["/app/events", "Praxis"],
];

try {
  await waitReady();
  for (const [path, needle] of pages) {
    const res = await fetch(base + path);
    assert.equal(res.status, 200, `${path} status`);
    const html = await res.text();
    assert.ok(html.includes(needle), `${path} contains "${needle}"`);
    assert.ok(!/Nexus/.test(html), `${path} has no leftover "Nexus" branding`);
    console.log("ok  ", path);
  }

  const home = await (await fetch(base)).text();
  assert.ok(home.includes("<title>Praxis Investment Intelligence</title>"), "home title");
  assert.ok(home.includes('property="og:site_name" content="Praxis"'), "open graph site name");

  const news = await (await fetch(`${base}/api/news`)).json();
  assert.ok(Array.isArray(news.articles) && news.articles.length > 0, "news returns articles (live or fallback)");
  console.log("ok   /api/news", news.articles.length, "articles");

  const prices = await (await fetch(`${base}/api/prices?symbols=BTC,ETH&currency=GBP&range=1D`)).json();
  assert.equal(prices.currency, "GBP");
  assert.ok(prices.quotes.BTC && prices.quotes.BTC.price > 0, "BTC quote present");
  assert.ok(["live", "cached", "demo"].includes(prices.quotes.BTC.source), "quote source label");
  console.log("ok   /api/prices BTC", prices.quotes.BTC.source);

  const events = await (await fetch(`${base}/api/events`)).json();
  assert.ok(Array.isArray(events.events), "events array");
  console.log("ok   /api/events", events.events.length, "events");

  console.log("\nsmoke test passed");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  stop();
}
