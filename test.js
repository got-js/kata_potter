var price = require("./code").price
var assert = require("assert")

describe("price", function() {
  it("prices single books without discounts", function() {
    assert.equal(0, price([]))
    assert.equal(8, price([0]))
    assert.equal(8, price([1]))
    assert.equal(8, price([2]))
    assert.equal(8, price([3]))
    assert.equal(8, price([4]))
    assert.equal(8 * 2, price([0, 0]))
    assert.equal(8 * 3, price([1, 1, 1]))
  });

  it("gives simple discounts", function() {
    assert.equal(8 * 2 * 0.95, price([0, 1]))
    assert.equal(8 * 3 * 0.9, price([0, 2, 4]))
    assert.equal(8 * 4 * 0.8, price([0, 1, 2, 4]))
    assert.equal(8 * 5 * 0.75, price([0, 1, 2, 3, 4]))
  });

  it("gives several discounts", function() {
    assert.equal(8 + (8 * 2 * 0.95), price([0, 0, 1]))
    assert.equal(2 * (8 * 2 * 0.95), price([0, 0, 1, 1]))
    assert.equal((8 * 4 * 0.8) + (8 * 2 * 0.95), price([0, 0, 1, 2, 2, 3]))
    assert.equal(8 + (8 * 5 * 0.75), price([0, 1, 1, 2, 3, 4]))
  });

  it("covers edge cases", function() {
    assert.equal(2 * (8 * 4 * 0.8), price([0, 0, 1, 1, 2, 2, 3, 4]))
    assert.equal(3 * (8 * 5 * 0.75) + 2 * (8 * 4 * 0.8),
      price([0, 0, 0, 0, 0,
             1, 1, 1, 1, 1,
             2, 2, 2, 2,
             3, 3, 3, 3, 3,
             4, 4, 4, 4]))
  });
});
