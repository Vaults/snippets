const isArray = Array.isArray;
const deepFlatten = (arr) => arr.reduce((acc, elt) => acc.concat(isArray(elt) ? deepFlatten(elt) : elt), []);
const reduceDeep  = (arr, f, init) => (isArray(arr)) ? deepFlatten(arr).reduce(f, init) : arr;

function createCrazyCurry(reduceFunction, reduceInit) {
    const ret = function (...args) {
        const reducedValue = reduceDeep(args, reduceFunction, reduceInit);
        const curriedFunction = (...newArgs) => ret(reducedValue, newArgs);
        curriedFunction.valueOf = () => reducedValue;
        return curriedFunction;
    };
    return ret;
}
export {createCrazyCurry}