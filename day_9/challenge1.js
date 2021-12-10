const fs = require(`fs`);
const input = fs.readFileSync("./day_9/input.txt", "utf-8").split("\n").filter((v) => v !== "").map((v) => v.split("")).map((a) => a.map(Number));

let total = 0;
for (y in input) {
	for (x in input[y]) {
		let self = input[+y][+x];
		let left = input[+y]?.[+x - 1] ?? 10;
		let right = input[+y]?.[+x + 1] ?? 10;
		let top = input?.[+y - 1]?.[+x] ?? 10;
		let bottom = input?.[+y + 1]?.[+x] ?? 10;
		let lowestH = Math.min(self, left, right, top, bottom);
		if (lowestH == self && ![left, right, top, bottom].includes(lowestH)) total += self + 1;
	}
}
console.log(total);