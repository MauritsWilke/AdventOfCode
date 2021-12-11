const fs = require(`fs`);
let input = fs.readFileSync("./day_10/input.txt", "utf-8").split("\n").filter((v) => v !== "").map((v) => v.split(""))

let inverseChar = {
	")": "(",
	"]": "[",
	"}": "{",
	">": "<"
}

let reverseChar = {
	"(": ")",
	"[": "]",
	"{": "}",
	"<": ">"
}

let charScore = {
	")": 1,
	"]": 2,
	"}": 3,
	">": 4
}

for (let line of input) {
	let openingChars = []
	for (let char of line) {
		if ([`(`, `[`, `{`, `<`].includes(char)) openingChars.push(char)
		else {
			if (openingChars[openingChars.length - 1] == inverseChar[char]) openingChars.pop()
			else {
				input = input.filter(v => v !== line)
				break;
			}
		}
	}
	input.forEach(function (v, i) { if (v == line) input[i] = openingChars.map(v => reverseChar[v]).reverse(); });
}

for (line of input) {
	let score = 0;
	for (char of line) {
		score = score * 5
		score += charScore[char]
	}
	input.forEach(function (v, i) { if (v == line) input[i] = score })
}

console.log(input.sort(function (a, b) { return a - b })[Math.floor(input.length / 2)])