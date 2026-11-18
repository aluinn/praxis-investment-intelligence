import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { primaryTag, tagsFor } from "../../lib/news/tags.ts";

describe("news tagging", () => {
  it("tags named assets", () => {
    assert.deepEqual(tagsFor("Bitcoin climbs", "").filter((t) => t !== "CRYPTO"), ["BTC"]);
    assert.ok(tagsFor("Solana upgrade ships", "").includes("SOL"));
  });

  it("falls back to CRYPTO when no asset matches", () => {
    assert.deepEqual(tagsFor("A quiet day", "nothing here"), ["CRYPTO"]);
  });

  it("prefers a specific asset as the primary tag", () => {
    assert.equal(primaryTag(["CRYPTO", "ETH"]), "ETH");
    assert.equal(primaryTag(["CRYPTO"]), "CRYPTO");
    assert.equal(primaryTag([]), "CRYPTO");
  });
});
