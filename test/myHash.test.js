import {myHash} from '../src/myHash.js';
import chai from 'chai';
const assert = chai.assert;

describe('is a proper hash', function(){
   it('deterministic', function(){
       for(let i = 0; i < 2500; i++){
           const r = Math.random();
           assert.equal(myHash(r), myHash(r));
       }
   });
   it('uniform', function(){
       this.timeout(10000);
       const naiveBase64decode = (o)=>"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(o);
       const sols = [];
       const am = 2500;
       for(let i = 0; i < am; i++){
           sols.push(myHash(Math.random()).split('').map(naiveBase64decode));
       }
       const avg = sols.reduce((p,n) => p.map((x,i)=>x+n[i]), new Array(64).fill(0)).map(o=>o/am);
       console.log(avg);
       assert.isTrue(avg.every(o=>o > 28 && o < 34));
   });

   it('defined range', function(){
       for(let i = 0; i < 2500; i++){
           const r = Math.random();
           assert.equal(myHash(r).length, 64);
       }
   });

});