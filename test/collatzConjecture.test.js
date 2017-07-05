/**
 * Created by Marcel on 5-7-2017.
 */
import {collatz} from '../src/collatzConjecture.js';
import chai from 'chai';

const assert = chai.assert;
const collatzArr = [0,1,7,2,5,8,16,3,19,6,14,9,9,17,17,4,12,20,20,7,
    7,15,15,10,23,10,111,18,18,18,106,5,26,13,13,21,
    21,21,34,8,109,8,29,16,16,16,104,11,24,24,24,11,
    11,112,112,19,32,19,32,19,19,107,107,6,27,27,27,
    14,14,14,102,22];


describe('Collatztest', ()=>{
    //Let's do this stuff inductively since we don't have mathematical proofs yet
    it('computes correctly according to some precomputed values', () => {
        collatzArr.forEach((o,i) => {
            assert.equal(collatz(i + 1), o);
        });
    });

});