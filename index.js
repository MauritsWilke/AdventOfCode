import inquirer from "inquirer";
import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import "./dist/util/index.js";

const args = process.argv.slice(2);
const latest = existsSync("./.latest") ?
	readFileSync("./.latest", "utf8")?.split(",")
	: ["2015", "01", "1"];

async function getYear() {
	const years = readdirSync("./src", { withFileTypes: true })
		.filter(dir => dir.isDirectory())
		.map(dir => dir.name);

	const { year } = await inquirer.prompt({
		"name": "year",
		"message": "What year do you want to solve from?",
		"type": "list",
		"choices": ["Last executed file", ...years]
	});

	return year;
}

async function getDay(year) {
	const days = readdirSync(`./src/${year}`, { withFileTypes: true })
		.filter(dir => dir.isDirectory())
		.map(dir => dir.name);

	const { day } = await inquirer.prompt({
		"name": "day",
		"message": "What day do you want to solve?",
		"type": "list",
		"choices": days
	});

	return day
}

async function getPart(year, day) {
	const parts = readdirSync(`./src/${year}/${day}`, { withFileTypes: true })
		.filter(dir => dir.name.match("ts"))
		.map(dir => dir.name.at(-4));

	const { part } = await inquirer.prompt({
		"name": "part",
		"message": "What part do you want to solve?",
		"type": "list",
		"choices": parts
	});

	return part;
}

async function solve(year, day, part) {
	try {
		const input = readFileSync(`./input/${year}/${day}/input.txt`, "utf-8");
		const { default: solution } = await import(`./dist/${year}/${day}/part${part}.js`);


		console.log("****************************************");
		console.log("*                                      *");
		console.log(`*   Solving part ${part} of day ${day} of ${year}   *`);
		console.log("*                                      *");
		console.log("****************************************");

		const start = process.hrtime.bigint();
		const answer = solution(input) ?? "return function forgotten";
		const end = process.hrtime.bigint();

		console.log(`Solved in ${Number(end - start) / 1_000_000}ms`);
		console.log(`Answer: \n${answer}`);

	} catch (e) {
		console.log(e)
		console.log(`The input couldn't be found! Make sure you have a file named "input.txt" at "input/${year}/${day}/input.txt"`);
	}
}

async function measurePerformance(year, day, part, times) {
	try {
		const input = readFileSync(`./input/${year}/${day}/input.txt`, "utf-8");
		const { default: solution } = await import(`./dist/${year}/${day}/part${part}.js`);

		console.log(`🏗️  Optimising the function, this may take up to 10 seconds max`)
		let start = performance.now();
		let a;
		let b;
		for (let i = 0; i < 1000 && (performance.now() - start) < 10000; i++) {
			a = process.hrtime.bigint();
			solution(input);
			b = process.hrtime.bigint();
		}

		let expectedTime = ((Number(b - a) / 1_000_000_000 * times));
		console.log(`⏱️  Measuring average, expected waiting time: ${Math.min(expectedTime.toFixed(2), 10)} seconds`);

		let timesMeasuredNs = 0n;
		let min = Infinity;
		let max = 0;
		let iterations = 0;

		const globalStart = process.hrtime.bigint();
		for (let i = 0; i < times && (process.hrtime.bigint() - globalStart) < 10_000_000_000n; i++) {
			iterations++;
			const start = process.hrtime.bigint();
			solution(input);
			const end = process.hrtime.bigint();

			const execTime = end - start;
			timesMeasuredNs += execTime
			if (execTime < min) min = execTime;
			if (execTime > max) max = execTime;
		}
		const globalEnd = process.hrtime.bigint();

		const average = Number(timesMeasuredNs) / iterations;
		const minInMs = Number(min) / 1_000_000;
		const maxInMs = Number(max) / 1_000_000;
		const averageInMs = Number(average) / 1_000_000;
		const timeTaken = (Number(globalEnd - globalStart) / 1_000_000_000).toFixed(2)

		console.log(`📊 Execution time measurements ${iterations} iterations in ${timeTaken} seconds`)
		console.log(`✅ min     : ${minInMs}ms`)
		console.log(`❌ max     : ${maxInMs}ms`)
		console.log(`📈 average : ${averageInMs}ms`)

	} catch (e) {
		console.log(e)
		console.log(`The input couldn't be found! Make sure you have a file named "input.txt" at "input/${year}/${day}/input.txt"`);
	}
}

if (args.length >= 3) {
	writeFileSync("./.latest", `${args[0]},${args[1]},${args[2]}`);

	if (args.length === 3) solve(...args);
	else measurePerformance(...args)
} else {
	const year = await getYear();
	if (year === "Last executed file") {
		solve(...latest);
	} else {
		const day = await getDay(year);
		const part = await getPart(year, day);

		writeFileSync("./.latest", `${year},${day},${part}`);

		solve(year, day, part);
	}
}