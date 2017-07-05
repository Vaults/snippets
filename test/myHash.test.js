import {myHash} from "../src/myHash.js";
import {doNTimes} from "util.js";
import chai from "chai";
const assert = chai.assert;

const am = 2500;

describe("is a proper hash", function(){
   it("deterministic", function(){
       doNTimes(() => {
           const r = Math.random();
           assert.equal(myHash(r), myHash(r));
       }, am);
   });
   it("uniform", function(){
       const naiveBase64decode = (o)=>"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(o);
       const sols = [];
       doNTimes(() => {
           sols.push(myHash(Math.random()).split("").map(naiveBase64decode));
       }, am);
       const avg = sols.reduce((p,n) => p.map((x,i)=>x+n[i]), new Array(64).fill(0)).map(o=>o/am);
       console.log(avg);
       assert.isTrue(avg.every(o=>o > 28 && o < 34));
   });

   it("defined range", function() {
       doNTimes(() => {
           const r = Math.random();
           assert.equal(myHash(r).length, 64);
       });
   });
});