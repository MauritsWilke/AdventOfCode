const fs = require(`fs`);
let input = fs.readFileSync("./day_11/input.txt", "utf-8").split("\n").filter(v => v !== "").map(v => v.split("")).map(a => a.map(Number))

let flashCount = 0
let hasFlashed = []
for (let i = 0; i < 100; i++) {
	hasFlashed = []
	for (line in input) for (octo in input[line]) input[line][octo]++
	for (line in input) for (octo in input[line]) if (input[line][octo] > 9) flash(input, +line, +octo)
}

function flash(input, line, octo) {
	if (hasFlashed.includes(`${line}-${octo}`)) return;
	input[line][octo] = 0;
	hasFlashed.push(`${line}-${octo}`)
	flashCount++
	for (let y = line - 1; y <= line + 1; y++) {
		for (let x = octo - 1; x <= octo + 1; x++) {
			if (input?.[y]?.[x]) input[y][x]++
			if (input?.[y]?.[x] > 9) flash(input, y, x)
		}
	}
}
console.log(flashCount)