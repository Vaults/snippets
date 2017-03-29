import {TSP} from '../src/travelingSalesman.js';
import chai from 'chai';

const assert = chai.assert;

const cityGenerator = () => new Array(~~(Math.random()*100)+1).fill().map(o=>Math.random());
const generateRandCityDist = (cities) => {
    let distances = [];
    let cityMap = {};
    cities.forEach(o => {
        cities.forEach(p => {
            if(cityMap[o]) {
                if (cityMap[o].indexOf(p) < 0 && (!cityMap[p] || cityMap[p].indexOf(o) < 0) && o != p && Math.random() > 0.66) {
                    cityMap[o].push(p);
                }
            }else{
                cityMap[o] = [p];
            }
        })
    });
    
    Object.keys(cityMap).forEach(o => {
        cityMap[o].forEach(p => {
            distances.push({from:o, to:p, distance: Math.random()});
        })
    });
    return distances;
};

describe('should return valid paths', function(){
    it('manual tests', function(){
        const triangle = [
            {from: 'a', to: 'b', dist: 1},
            {from: 'b', to: 'c', dist: 3},
            {from: 'a', to: 'c', dist: 20}
        ];
        assert.deepEqual(TSP(triangle), ['a', 'b', 'c']);
    });

    it('returns paths of same length', function(){
        for(let i = 0; i < 100; i++){
            const cities = cityGenerator();
            const distances = generateRandCityDist(cities);
            assert.equal(TSP(distances).length, cities.length);
        }
    });

    it('does not return cities twice', function(){
        for(let i = 0; i < 100; i++){
            const cities = cityGenerator();
            const distances = generateRandCityDist(cities);
            const TSPCities = TSP(distances);
            assert.equal(TSPCities.length, new Set(TSPCities).size);
        }
    });

    it('all connections exist', function(){
        for(let i = 0; i < 100; i++){
            const cities = cityGenerator();
            const distances = generateRandCityDist(cities);
            const TSPCities = TSP(distances);
            assert.isTrue(TSPCities.every((o,i)=>{
                if(!TSPCities[i-1]){return true;}
                const prev = TSPCities[i-1];
                const curr = TSPCities[i];
                return typeof distances.find(f => f.from === prev && f.to === curr) !== 'undefined';
            }));
        }
    });


});