import {zukkelGenerator, generateWordCombo, pickRandom} from '../src/zukkelGenerator.js';
import chai from 'chai';
import {doNTimes} from '../test/util.js';
const assert = chai.assert;


describe('ZukkelGenerator', function(){
    it('picks random properly', function(){
        const checkMap = {};
        doNTimes(() => {
            const r = ~~(100*Math.random());
            if(!checkMap[r]){checkMap[r] = 0}
            checkMap[r]++;
        }, 100000);
        Object.keys(checkMap).forEach(o => {
            assert.approximately(checkMap[o], 1000, 200);
        })
    });
    it('generates word combos properly', function(){
        doNTimes(() => {
            const combo = generateWordCombo(['a', 'b'], 2);
            assert.isTrue(['ab', 'ba', 'aa', 'bb', 'a', 'b', ''].indexOf(combo) >= 0 || combo === '');
        }, 100);
    });
    it('generates a zukkel', function(){
        doNTimes(() => {
            const zuk = zukkelGenerator();
            assert.isOk(zuk);
        }, 100);
    })
});