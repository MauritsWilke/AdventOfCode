const { readFileSync } = require(`fs`)
const input = readFileSync("./day_14/input.txt", "utf-8").split("\n").filter(v => v !== "")
let pairs = {}
for (let j = 0; j < input[0].length - 1; j++) pairs[input[0][j] + input[0][j + 1]] ? pairs[input[0][j] + input[0][j + 1]]++ : pairs[input[0][j] + input[0][j + 1]] = 1;
const rules = Object.fromEntries(new Map(input.filter(v => v.includes(" -> ")).map(v => v.split(" -> "))))
const lastLetter = input[0].charAt(input[0].length - 1)
for (let i = 0; i < 40; i++) {
    for (const [key, v] of Object.entries(pairs)) {
        if (v == 0) continue;
        pairs[key] = pairs[key] - v
        pairs[key[0] + rules[key]] ? pairs[key[0] + rules[key]] += v : pairs[key[0] + rules[key]] = v
        pairs[rules[key] + key[1]] ? pairs[rules[key] + key[1]] += v : pairs[rules[key] + key[1]] = v
    }
}
let counts = {}
for (const [key, v] of Object.entries(pairs)) counts[key[0]] ? counts[key[0]] += v : counts[key[0]] = v;
counts[lastLetter]++
console.log(Math.max(...Object.values(counts)) - Math.min(...Object.values(counts)))