import readline from 'readline';
import * as fs from 'fs';
import {BrainfuckInterpreter} from "./brainfuckInterpreter.js";

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode != null) {
    process.stdin.setRawMode(true);
}

async function runCharacterByCharacter(interpreter) {
    process.stdin.on('keypress', (str, key) => {
        //console.log(key)
        if (key.sequence === "\x03") {
            process.exit(0)
        }
        interpreter.acceptChar(key.sequence)
    })
    let steps = 0;
    while (!interpreter.isDone()) {
        interpreter.doStep()
        steps++;
        process.stdout.write(String.fromCharCode(interpreter.output.pop()))
    }
}
async function runLineByLine(interpreter) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.on('line', (line) => {
        interpreter.acceptLine(line)
    })

    let steps = 0;
    while (!interpreter.isDone()) {
        interpreter.doStep()
        steps++;
        if (steps % 1000 === 0) {
            await sleep(10)
        }
        process.stdout.write(String.fromCharCode(interpreter.output.pop()))
    }
}

fs.readFile(process.argv[2], 'utf8', async (err, data) => {
    const interpreter = new BrainfuckInterpreter(data)
    await runCharacterByCharacter(interpreter);
})


