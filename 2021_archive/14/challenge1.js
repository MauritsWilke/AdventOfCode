const { readFileSync } = require(`fs`)
const input = readFileSync("./day_14/input.txt", "utf-8").split("\n").filter(v => v !== "")
let template = input[0]
const rules = Object.fromEntries(new Map(input.filter(v => v.includes(" -> ")).map(v => v.split(" -> "))))
for (let i = 0; i < 10; i++) {
	let pairs = []
	for (let j = 0; j < template.length - 1; j++) pairs.push(template[j] + template[j + 1])
	for (let pair in pairs) pairs[pair] = pairs[pair].slice(0, 1) + rules[pairs[pair]]
	template = pairs.join("") + template.slice(-1)
}
let counts = {}
for (letter of template.split("")) {
	if (!counts[letter]) counts[letter] = 1;
	else counts[letter]++
}
console.log(Math.max(...Object.values(counts)) - Math.min(...Object.values(counts)))