function createCrazyCurry(red, redInit) {
    var ret = function (...n) {
        var flat = (data) => data.reduce((r, e) => Array.isArray(e) ? r = r.concat(flat(e)) : r.push(e) && r, []);
        var calc = a => (!a.reduce) ? [a] : flat(a).reduce(red, redInit);
        var f = (...x) => ret([calc(n)].concat(x));
        f.valueOf = () => calc(n);
        return f;
    }
    return ret;
}
export {createCrazyCurry}
