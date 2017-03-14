var dataPointer;
var pointer;
var output;
var inp;
var mem;
var code;
var pad = function (o) {
    while (o.length % 8 != 0) {
        o = "0" + o;
    }
    return o;
}
var toEnd = input => [].concat.apply([], input.split('').reverse().map(o=>pad(o.charCodeAt(0).toString(2)).split('')));
var fromEnd = out => (out.match(/.{1,8}/g) || [] ).map(o=>String.fromCharCode(parseInt(o, 2))).reverse().join('');
//executes commands
var interpret = function () {
    var command = code.charAt(pointer);
    //console.log(accessMem(), command, pointer);
    if (command === ">") {
        dataPointer++;
    } else if (command === "<") {
        dataPointer--;
    } else if (command === "[") {
        if (accessMem() == 0) {
            find(false); // right
        }
    } else if (command === "]") {
        find(true); // left
    }
    else if (command === "+") {
        modMem();
    } else if (command === ";") {
        output = accessMem() + output;
    } else if (command === ",") {
        storeMem(inp.pop());
    }
    pointer++;
}
//finds matching bracket in direction
function find(left) {
    var bc = 1;
    var dir = (left) ? -1 : 1;
    var m = 0;
    while (bc > 0) {
        m += dir;
        if (code.charAt(pointer + m) === '[') {
            bc += dir;
        }
        if (code.charAt(pointer + m) === ']') {
            bc -= dir;
        }
    }
    var n = pointer + m + ((left) ? -1 : 0);
    pointer = n;
}

//helper functions
function accessMem() {
    if (!(dataPointer in mem)) {
        mem[dataPointer] = 0;
    }
    return mem[dataPointer];
}
function storeMem(inp) {
    mem[dataPointer] = (typeof inp == 'undefined') ? 0 : inp;
}
function modMem(i) {
    storeMem(((accessMem() == 0) ? 1 : 0));
}


function boolfuck(c, input = "") {
    //init variables
    code = c;
    dataPointer = 0;
    pointer = 0;
    output = '';
    mem = {"0": 0};
    inp = toEnd(input);

    //run through
    var c = 0;
    while (pointer < code.length) {
        c++;
        interpret(code);
    }
    output = pad(output);

    return fromEnd(output);
}

export {boolfuck}