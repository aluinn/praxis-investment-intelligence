import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  allocationPercent,
  holdingValue,
  portfolioTotal,
  priceBeforeChange,
  valueChange,
} from "../../lib/portfolio/calc.ts";

describe("portfolio calculations", () => {
  it("values a holding as quantity x price", () => {
    assert.equal(holdingValue(2, 150), 300);
  });

  it("treats non-finite inputs as zero value", () => {
    assert.equal(holdingValue(Number.NaN, 10), 0);
    assert.equal(holdingValue(1, Number.POSITIVE_INFINITY), 0);
  });

  it("sums values into a total", () => {
    assert.equal(portfolioTotal([100, 250, 50]), 400);
    assert.equal(portfolioTotal([]), 0);
  });

  it("computes allocation as a percentage of the total", () => {
    assert.equal(allocationPercent(25, 100), 25);
  });

  it("returns 0 allocation when the total is not positive", () => {
    assert.equal(allocationPercent(10, 0), 0);
    assert.equal(allocationPercent(10, -5), 0);
  });

  it("computes value change from a previous price", () => {
    assert.equal(valueChange(2, 110, 100), 20);
    assert.equal(valueChange(2, 90, 100), -20);
  });

  it("returns undefined change without a usable previous price", () => {
    assert.equal(valueChange(2, 110, undefined), undefined);
    assert.equal(valueChange(2, 110, 0), undefined);
  });

  it("derives the previous price from a percentage change", () => {
    assert.ok(Math.abs((priceBeforeChange(110, 10) ?? 0) - 100) < 1e-9);
    assert.equal(priceBeforeChange(100, undefined), undefined);
    assert.equal(priceBeforeChange(100, -100), undefined);
  });
});
