function createCrazyCurry(red, redInit) {
    const ret = function (...n) {
        const flat = (data) => data.reduce((r, e) => Array.isArray(e) ? r.concat(flat(e)) : r.push(e) && r, []);
        const calc = (a) => (!a.reduce) ? [a] : flat(a).reduce(red, redInit);
        const f = (...x) => ret([calc(n)].concat(x));
        f.valueOf = () => calc(n);
        return f;
    };
    return ret;
}
export {createCrazyCurry}
