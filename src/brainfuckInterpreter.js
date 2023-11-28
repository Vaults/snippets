const mod = (n,m) => ((n % m) + m) % m;

class BrainfuckInterpreter {
    constructor(code) {
        this.code = code
        this.dataPointer = 0;
        this.pointer = 0;
        this.output = [];
        this.mem = [0];
        this.input = [];
    }

    doStep() {
        const command = this.code.charAt(this.pointer);
        if (command === ">") { this.dataPointer++;}
        if (command === "<") { this.dataPointer--; }
        if (command === "[") { if (this.accessMem() === 0) { this.pointerToBracket(false); } }
        if (command === "]") { if (this.accessMem() !== 0) { this.pointerToBracket(true); } }
        if (command === "+") { this.increment(); }
        if (command === "-") { this.decrement(); }
        if (command === ".") { this.output.push(this.accessMem()) }
        if (command === ",") { this.storeMem(this.input.pop()); }
        this.pointer++;
    };

    //finds matching bracket in direction
    pointerToBracket(isLeft) {
        let bracketCount = 1;
        let span = 0;
        const dir = (isLeft) ? -1 : 1;

        while (bracketCount > 0) {
            span += dir;
            if (this.code.charAt(this.pointer + span) === "[") {
                bracketCount += dir;
            }
            if (this.code.charAt(this.pointer + span) === "]") {
                bracketCount -= dir;
            }
        }
        let leftCorrection = (isLeft) ? -1 : 0;
        this.pointer += span + leftCorrection;
    }

//helper functions
    accessMem() {
        if (this.mem[this.dataPointer] === undefined) {
            this.mem[this.dataPointer] = 0;
        }
        return this.mem[this.dataPointer];
    }
    storeMem(inp) {
        this.mem[this.dataPointer] = inp
    }
    increment() {
        this.storeMem(mod((this.accessMem() + 1), 256));
    }

    decrement() {
        this.storeMem(mod(this.accessMem() - 1, 256));
    }


}

const parseInput = (input) => input.split("").map(o => o.charCodeAt(0)).reverse();
const parseOutput = (out) => out.map((o)=>String.fromCharCode(o)).join("");

function brainfuckSimple(c, input = "") {
    let interpreter = new BrainfuckInterpreter(c)
    interpreter.input = parseInput(input)
    //run through
    while (interpreter.pointer < c.length) {
        interpreter.doStep()
        //console.log({pointer, dataPointer, mem, output})
    }
    return parseOutput(interpreter.output);
}

export {brainfuckSimple}