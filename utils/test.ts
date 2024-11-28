import { run } from "./run.ts";

export async function runTests(YEAR: string, DATE: string, PART: string | number) {
    console.clear();
    const formattedDate = `0${DATE}`.slice(-2);

    const { tests } = await import(`../src/${YEAR}/${formattedDate}/part${PART}.ts?t=${Date.now()}`);

    if (tests) {
        for (const i of tests.keys()) {
            const [input, answer] = tests[i];

            const attempt = await run(YEAR, DATE, PART, input);
            if (attempt == answer) console.log(`%c(${i}) Passed`, "background-color: green")
            else {
                console.log(`%c(${i}) Failed`, "background-color: red");
                console.log(` ╰  Expected: ${answer}`)
                console.log(` ╰  Received: ${attempt}`)
            }
        }
    } else console.log("No tests were specified");

    const attempt = await run(YEAR, DATE, PART);
    console.log(`%cPuzzle input gives ${attempt}`, "background-color: orange");
}
