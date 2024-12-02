import "../src/utils/index.ts";

const YEAR = Deno.args[0] ?? new Date().getFullYear();
const DATE = Deno.args[1] ?? new Date().getDate();
const PART = Deno.args[2] ?? 1;
const TIMES = Number(Deno.args[3]) || 10;
const FIXED = Number(Deno.args[4]) || 2;
const formattedDate = `0${DATE}`.slice(-2);


const INPUT = await Deno.readFile(`./input/${YEAR}/${formattedDate}/input.txt`)
    .then(c => new TextDecoder("utf-8").decode(c));

const { default: solution } = await import(`../src/${YEAR}/${formattedDate}/part${PART}.ts`);


console.log(`Measuring average execution time`);

const timesMeasured = [];
let iterations = 0;

const start = performance.now();
for (let i = 0; i < TIMES; i++) {
    iterations++;
    const start = performance.now();
    solution(INPUT);
    const end = performance.now();

    const execTime = end - start;
    timesMeasured.push(execTime)
}
const end = performance.now();

const totalTimeTaken = ((end - start) / 1000).toFixed(FIXED)

console.log(`%cExecution time measurements ${iterations} iterations in ${totalTimeTaken} seconds`, "background-color: #454c5a");

// HISTOGRAM
const size = Deno.consoleSize();
const BARS = Math.round(size.columns * 0.6);
const ROWS = size.rows - 4; // Line + labels
const steps = (timesMeasured.max() - timesMeasured.min()) / BARS;

const freq = timesMeasured.map(v => Math.round(v / steps)).frequencies();
const lowest = Object.keys(freq).min();

for (let i = 0; i < BARS; i++) {
    const label = (lowest + i);
    freq[label] = freq[label] ? freq[label] : 0;
}

const topLabel = Object.values(freq).max();
const bottomLabel = Object.values(freq).min();
const halfwayLabel = (topLabel + bottomLabel) / 2;

const maxLength = topLabel.toString().length + 1;
const labelSteps = topLabel / ROWS;

for (let i = ROWS - 1; i > 0; i--) {
    let prefix = "";
    const currentMin = Math.floor(i * labelSteps);

    if (i === ROWS - 1) prefix += `${topLabel}`;
    if (i === 1) prefix += `${bottomLabel}`;

    // TODO fix label if not exactly halfway
    if (i === Math.floor((ROWS - 1) / 2)) prefix += `${Math.round(halfwayLabel)}`;

    prefix = prefix.padEnd(maxLength, " ");
    prefix += "▏";

    let index = 0;
    for (const amount of Object.values(freq)) {
        const boxToUse = index % 2 ? "▒" : "░";
        if (i === 1 && amount > 0 && amount < currentMin) prefix += ".";
        else prefix += amount >= currentMin ? boxToUse : " ";

        index++;
    }

    console.log(prefix)
}

console.log("▔".repeat(BARS + maxLength + 2));

const minLabel = Object.keys(freq).min() * steps;
const maxLabel = Object.keys(freq).max() * steps;
const halfLabel = (maxLabel - minLabel) / 2;
const spacingPrefix = "ms".padEnd(maxLength, " ");
const labels = [minLabel, halfLabel, maxLabel].map(v => v.toFixed(FIXED));
labels[0] = spacingPrefix + labels[0];
const labelsLength = labels.join("").length;
const spacing = (BARS + maxLength + 3 - labelsLength) / 2;

console.log(labels.join(" ".repeat(spacing)));

const average = timesMeasured.mean().toFixed(FIXED);
const min = timesMeasured.min().toFixed(FIXED);
const max = timesMeasured.max().toFixed(FIXED);
const median = timesMeasured.median().toFixed(FIXED);
const mean = timesMeasured.mean().toFixed(FIXED);
const dot = Math.round(labelSteps);

const data = [
    `Min: ${min}ms`,
    `Max: ${max}ms`,
    `Median: ${median}ms`,
    `Mean: ${mean}ms`,
    `Average: ${average}ms`,
    `Dot: ${dot}<`
]

console.log(`%c${data.join("    ")}`, "background-color: #454c5a");