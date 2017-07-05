/*
    Converts words to their soundex codes
 */

const valMap = {
    "b":1,
    "f":1,
    "p":1,
    "v":1,
    "c":2,
    "g":2,
    "j":2,
    "k":2,
    "q":2,
    "s":2,
    "x":2,
    "z":2,
    "d":3,
    "t":3,
    "l":4,
    "m":5,
    "n":5,
    "r":6
};
const remWithoutFirst = (s, r) => {
    return s.charAt(0) + s.slice(1).replace(r,"");
};

const soundex = str => {
    return str.split(" ").map(word => {
            const firstLetter = word.charAt(0);
            word = remWithoutFirst(
                    remWithoutFirst(word, /[hw]/g)
                    .split("")
                    .map(o => (valMap[o.toLowerCase()] || o))
                    .join("")
                    .replace(/(\d)\1+/g,"$1")
                ,/[aeiouyAEIOUY]/g);

            if(word.match(/^\d/)){word = firstLetter + word.substring(1);}

            return word.substr(0,4) + ((word.length < 4)?"0".repeat(4 - word.length):"");
        })
        .join(" ")
        .toUpperCase();
};

export {remWithoutFirst, soundex};
