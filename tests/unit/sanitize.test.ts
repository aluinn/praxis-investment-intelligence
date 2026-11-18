import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  canonicalUrl,
  normalizeHeadline,
  safeHttpUrl,
  sanitizeText,
  stableId,
} from "../../lib/news/sanitize.ts";

describe("sanitizeText", () => {
  it("strips tags, scripts and styles", () => {
    const out = sanitizeText("<p>Hello <b>world</b></p><script>alert(1)</script><style>p{}</style>");
    assert.equal(out, "Hello world");
  });

  it("decodes common entities", () => {
    assert.equal(sanitizeText("Fish &amp; Chips &lt;3"), "Fish & Chips <3");
  });

  it("never returns markup", () => {
    assert.ok(!/[<>]/.test(sanitizeText("<img src=x onerror=alert(1)>text")));
  });

  it("limits output length", () => {
    assert.ok(sanitizeText("a".repeat(1000), 50).length <= 51);
  });
});

describe("url helpers", () => {
  it("accepts only http(s) urls", () => {
    assert.equal(safeHttpUrl("https://example.com/a"), "https://example.com/a");
    assert.equal(safeHttpUrl("javascript:alert(1)"), undefined);
    assert.equal(safeHttpUrl(42), undefined);
  });

  it("canonicalises urls so tracking variants match", () => {
    const a = canonicalUrl("https://example.com/story?utm_source=x");
    const b = canonicalUrl("https://example.com/story");
    assert.equal(a, b);
  });
});

describe("headline helpers", () => {
  it("normalises headlines for duplicate detection", () => {
    assert.equal(normalizeHeadline("Bitcoin  Rallies!"), normalizeHeadline("bitcoin rallies"));
  });

  it("produces stable ids", () => {
    assert.equal(stableId("abc"), stableId("abc"));
    assert.notEqual(stableId("abc"), stableId("abd"));
  });
});
