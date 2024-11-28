import { fetchInput } from "./api/get_input.ts";
import { runTests } from "./test.ts";

const SESSION = Deno.env.get("SESSION")!; // TS-Config disagrees with its existence even if I check it
const YEAR = Deno.args[0] ?? new Date().getFullYear();
const DATE = Deno.args[1] ?? new Date().getDate();
const PART = Deno.args[2] ?? 1
const SCHEDULED = !!Deno.args[3];
const formattedDate = `0${DATE}`.slice(-2); // I like this better
const TEMPLATE =
    `export default function solution(input: string) {
    return;
}

export const tests = [
    ["", ],
]`;


if (!SESSION) throw new Error("Make sure you have a .env file with SESSION=<your token>");
if (+DATE > 25) throw new Error("This date seems to be out of range for Advent of Code");

await Deno.mkdir("./src").catch(() => { });
await Deno.mkdir(`./src/${YEAR}`).catch(() => { });
await Deno.mkdir(`./src/${YEAR}/${formattedDate}`).catch(() => { });

await Deno.mkdir("./input").catch(() => { });
await Deno.mkdir(`./input/${YEAR}`).catch(() => { });
await Deno.mkdir(`./input/${YEAR}/${formattedDate}`).catch(() => { });

const encoded = new TextEncoder().encode(TEMPLATE);
await Deno.writeFile(`./src/${YEAR}/${formattedDate}/part1.ts`, encoded, { createNew: true }).catch(() => { });
await Deno.writeFile(`./src/${YEAR}/${formattedDate}/part2.ts`, encoded, { createNew: true }).catch(() => { });
console.log(`🎄 Created ./src/${YEAR}/${formattedDate}/part1.ts and ./src/${YEAR}/${formattedDate}/part2.ts`);

if (SCHEDULED) {
    console.log("⏰ Scheduler is waiting...");
    Deno.cron("fetch right on time", "* 5 * * *", {
        backoffSchedule: [500, 1000, 5000]
    }, prep)
} else prep();


async function prep() {
    await fetchInput(YEAR, DATE, SESSION);

    const watcher = Deno.watchFs("./src", { recursive: true });

    console.log(`🧪 Watcher started for test cases`);

    for await (const e of watcher) {
        if (e.kind === "access") await runTests(YEAR, DATE, PART);
    }
}