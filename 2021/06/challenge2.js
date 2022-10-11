const fs = require(`fs`)
const input = (fs.readFileSync("./day_6/input.txt", "utf-8")).split(`,`)
let fishes = [...Array(9)].map(() => 0)
for (i = 0; i < input.length; i++) fishes[input[i]]++
for (i = 0; i < 256; i++) {
	fishes[7] += fishes[0]
	fishes.push(fishes.shift())
}
console.log(fishes.reduce((a, b) => a + b, 0)) // 1629570219571