import {createCrazyCurry} from "../src/currychain.js";
import assert from "assert";

const add = createCrazyCurry((p, n) => p + n, 0);
const mul = createCrazyCurry((p, n) => p * n, 1);
const min = createCrazyCurry((p, n) => p - n, 1);
const concat = createCrazyCurry((p, n) => p + n, "");
const compose = createCrazyCurry((p, n) => (typeof n === "function") ? n(p) : n);

describe("Crazy currying", () => {
    it("mathematical adding works", () => {
        assert.equal(add(3, [6, [6]])(2, 3)([])([3]), 23);
    });
    it("composing, uh oh", () => {
        assert.equal(compose(3, o => o + 3)([o => o - 3, o => o * 5, [o => o + 65], [String.fromCharCode], []])(), "P");
        assert.equal(concat(compose("a", o => o.repeat(5))([], [[[o => o.substring(1, 3)]]]), "bb"), "aabb");
    });
    it("string concatenation", () => {
        assert.equal(concat(concat("a"), ["b", "c"])(concat("d", "e")("f")([])), "abcdef");
        assert.equal(concat(concat(concat(concat(["a", "c"])))), "ac");
    });
    it("Very nested crazy-ass curries", () => {
        assert.equal(+concat([[]], [], [min([[]], [], [~~min([[]], [], [mul([[]], [], [[4].concat([[]], [], [mul([[]], [], [add([[]], [], [add([[]], [], [3, mul([[]], [], [124, [44, -3.2]]) - mul([[]], [], [2000, min([[]], [], [9, 1])])])])])])]), -2170])]) - 1, 2]).valueOf() + 27, 69);
    });
});
