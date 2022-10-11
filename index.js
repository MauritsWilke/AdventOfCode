import inquirer from "inquirer";
import { readdirSync, readFile, writeFileSync } from "fs";

const latest = await readFile("./latest", "utf8", function (err) { })
	?.split(",") ?? ["2015", "01", "1"];

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

		const start = process.hrtime();
		solution(input);
		const end = process.hrtime(start);
		console.log(`Solved in ${end[0]}s ${end[1] / 1000000}ms`)

	} catch {
		console.log(`The input couldn't be found! Make sure you have a file named "input.txt" at "input/${year}/${day}/input.txt"`);
	}
}

const year = await getYear();
if (year === "Last executed file") {
	solve(...latest);
} else {
	const day = await getDay(year);
	const part = await getPart(year, day);

	writeFileSync("./latest", `${year},${day},${part}`);

	solve(year, day, part);
}