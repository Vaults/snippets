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
        if (command === "[") { if (this.accessMem() === 0) { this.pointerToMatchingBracket(false); } }
        if (command === "]") { if (this.accessMem() !== 0) { this.pointerToMatchingBracket(true); } }
        if (command === "+") { this.increment(); }
        if (command === "-") { this.decrement(); }
        if (command === ".") { this.output.push(this.accessMem()) }
        if (command === ",") { this.storeMem(this.input.pop()); }
        this.pointer++;
    };

    //finds matching bracket in direction
    pointerToMatchingBracket(isLeft) {
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

    isDone(){
        return this.pointer === this.code.length
    }

    acceptChar(char){
        this.input.push(char.charCodeAt(0))
    }

    acceptLine(line) {
        this.input = line.split("").map(o => o.charCodeAt(0)).reverse().concat(this.input)
    }

    humanReadableOutput(){
        return this.output.map((o)=>String.fromCharCode(o)).join("")
    }

}

export {BrainfuckInterpreter}