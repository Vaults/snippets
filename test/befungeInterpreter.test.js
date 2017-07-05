/**
 * Created by Marcel on 14-3-2017.
 */
import {interpret} from "../src/befungeInterpreter.js";
import assert from "assert";

describe("Befunge", () => {
    it("hello world", () => {
        assert.equal(interpret(`64+"!dlroW ,olleH">:#,_@`), "Hello, World!\n");
        assert.equal(interpret(">25*\"!dlroW olleH\":v\n                v:,_@\n                >  ^"), "Hello World!\n");
    });
    it("factorial", () => {
        assert.equal(interpret("08>:1-:v v *_$.@ \n  ^    _$>\\:^"), 40320);
    });
    it("quine", () => {
        assert.equal(interpret("01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@"), "01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@");
    });
    it("codewars example", () => {
        assert.equal(interpret(">987v>.v\nv456<  :\n>321 ^ _@"), "123456789");
    });
    it("sieve of eratosthenes", () => {
        assert.equal(interpret("2>:3g\" \"-!v\\  g30          <\n |!`\"&\":+1_:.:03p>03g+:\"&\"`|\n @               ^  p3\\\" \":<\n2 2345678901234567890123456789012345678"), "23571113171923293137");
    });
});