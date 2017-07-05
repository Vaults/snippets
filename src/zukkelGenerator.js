/**
 * I made this for a very special loser to call her names.
 * Ran out of creativity so wrote a program.
 */
const pickRandom = a => a[~~(Math.random() * a.length)];

const generateWordCombo = (a, n) => {
    let str = "";
    for (let i = 0; i < ~~(Math.random() * (n+1)); i++) {
        str += pickRandom(a)
    }
    return str;
};

const zukkelGenerator = () => {
    const prefix = generateWordCombo(["super", "le", "mega", "turbo", "plebeiaanse", "proleetse", "schattige", "gigantisch"], 1);
    const start = generateWordCombo(["suk", "zuk", "zok", "zek", "zik", "soek", "sok"], 2);
    const mid = generateWordCombo(["kel", "zuk", "drol", "gek", "poeperd", "lieverd", "kol", "kil", "kul"], 3);
    const last = generateWordCombo(["inhio", "ulus maximus", "etteje", "pukkel", "tje", "kie"], 1);
    const suffix = generateWordCombo(["💩", "🙅‍♂", "🗿", "👅"], 1);

    return ((prefix)?prefix+" ":"") + start + mid + last + ((suffix)?" "+suffix:"");};

if(typeof window !== "undefined") {
    window.zukkel = zukkelGenerator;
}

export {generateWordCombo, pickRandom, zukkelGenerator};