/**
 * Created by Marcel on 14-3-2017.
 */
import {remWithoutFirst, soundex} from '../src/americanSoundex.js';
import chai from 'chai';
const assert = chai.assert;

describe("Soundex", () => {
    it("remWithoutFirst works", () => {
        assert.equal(remWithoutFirst("h", /h/g), "h");
        assert.equal(remWithoutFirst("he", /h/g), "he");
        assert.equal(remWithoutFirst("hey", /[hy]/g), "he");
    });
    it("works for Sarah Connor", () => {
        assert.equal(soundex("Sarah Connor"), "S600 C560");
        assert.equal(soundex("Sara Conar"), "S600 C560");
        assert.equal(soundex("Serah Coner"), "S600 C560");
        assert.equal(soundex("Sarh Connor"), "S600 C560");
        assert.equal(soundex("Sayra Cunnarr"), "S600 C560");
    });
    it("Works for seperate test cases", () => {
        assert.equal(soundex("Ashcraft"), "A261");
        assert.equal(soundex("Pfister"), "P236");
        assert.equal(soundex("uryrtkzp"), "U663");
        assert.equal(soundex("hmpoqihkehwshfbb"), "H512");
    });

});