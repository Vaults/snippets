let dataPointer;
let pointer;
let output;
let inp;
let mem;
let code;

const toEnd = (input) => input.split("").map(o => o.charCodeAt(0)).reverse();
const fromEnd = (out) => out.map((o)=>String.fromCharCode(o)).join("");
const mod = (n,m) => ((n % m) + m) % m;
//executes commands
const interpret = () => {
    const command = code.charAt(pointer);
    if (command === ">") {
        dataPointer++;
    } else if (command === "<") {
        dataPointer--;
    } else if (command === "[") {
        if (accessMem() === 0) {
            find(false); // right
        }
    } else if (command === "]") {
        if (accessMem() !== 0){
            find(true); // left
        }
    }
    else if (command === "+") {
        increment();
    } else if (command === "-"){
        decrement();
    } if (command === ".") {
        output.push(accessMem())
    } else if (command === ",") {
        storeMem(inp.pop());
    }
    pointer++;
};
//finds matching bracket in direction
function find(isLeft) {
    let bc = 1;
    let m = 0;
    const dir = (isLeft) ? -1 : 1;

    while (bc > 0) {
        m += dir;
        if (code.charAt(pointer + m) === "[") {
            bc += dir;
        }
        if (code.charAt(pointer + m) === "]") {
            bc -= dir;
        }
    }
    pointer += m + ((isLeft) ? -1 : 0);
}

//helper functions
function accessMem() {
    if (mem[dataPointer] === undefined) {
        mem[dataPointer] = 0;
    }
    return mem[dataPointer];
}
function storeMem(inp) {
    mem[dataPointer] = inp
}
function increment() {
    storeMem(mod((accessMem() + 1), 256));
}

function decrement() {
    storeMem(mod(accessMem() - 1, 256));
}


function brainfuck(c, input = "") {
    //init constants
    code = c;
    dataPointer = 0;
    pointer = 0;
    output = [];
    mem = [0];
    inp = toEnd(input);

    //run through
    let i = 0;
    while (pointer < code.length) {
        i++;
        interpret(code);
        //console.log({pointer, dataPointer, mem, output})
    }
    return fromEnd(output);
}

export {brainfuck}