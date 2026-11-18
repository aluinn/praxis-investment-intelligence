import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatCurrency, formatPercent, formatQuantity, formatSignedCurrency } from "../../lib/format.ts";

describe("formatting", () => {
  it("formats currency", () => {
    assert.equal(formatCurrency(1234.5, "GBP"), "£1,234.50");
  });

  it("signs positive and negative changes", () => {
    assert.equal(formatSignedCurrency(10, "GBP"), "+£10.00");
    assert.equal(formatSignedCurrency(-10, "GBP"), "−£10.00");
    assert.equal(formatSignedCurrency(0, "GBP"), "£0.00");
  });

  it("formats percentages to one decimal place", () => {
    assert.equal(formatPercent(12.345), "12.3%");
  });

  it("shows more precision for small quantities", () => {
    assert.equal(formatQuantity(0.12345678), "0.12345678");
    assert.equal(formatQuantity(4.123456), "4.1235");
  });
});
