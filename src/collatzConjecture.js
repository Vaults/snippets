/**
 * Returns the steps necessary to reach {@code n} according to the Collatz conjecture.
 * See https://en.wikipedia.org/wiki/Collatz_conjecture.
 * @param n, integer >= 1 (non-null)
 * @param step
 */
const collatz = (n, step=0) => {
    if(typeof n !== "number" || n <= 0 || n % 1 > 0){throw new Error("Invalid argument, n should be a positive integer");}
    if(n == 1){return step;}
    if(n % 2 == 0){return collatz(n/2, step + 1);}
    if(n % 2 == 1){return collatz(3*n + 1, step + 1);}
};

export {collatz}