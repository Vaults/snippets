/**
 * Created by Marcel on 29-3-2017.
 */
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const r = require('seedrandom');

const strToB64Ints = s => s.split('').map((o,i)=>((o.charCodeAt(0) || i*i) + i) % 64);
const intsToB64Strs = a => a.map(o=>b64[o]).join('');

const myHash = (inp) => {
    const proc = inp.toString();
    let procRep = strToB64Ints(proc.repeat(~~(64/proc.length)+1).substring(0,64));



    return intsToB64Strs(procRep);



};

export{myHash}