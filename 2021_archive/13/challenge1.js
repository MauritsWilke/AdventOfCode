const { readFileSync } = require(`fs`)
const input = readFileSync("./day_13/input.txt", "utf-8").split("\n").filter(v => v !== "")
let coords = [...input].filter(v => !v.includes("fold along")).map(v => v.split(",")).map(v => v.map(Number))
let folds = [[...input].filter(v => v.includes("fold along")).map(v => v.replace("fold along ", "")).map(v => v.split("="))[0]]
for (const fold of folds) {
	if (fold[0] === "y") for (const coord of coords) if (coord[1] > fold[1]) coord[1] = fold[1] - (coord[1] - fold[1])
	if (fold[0] === "x") for (const coord of coords) if (coord[0] > fold[1]) coord[0] = fold[1] - (coord[0] - fold[1])
	coords = Array.from(new Set(coords.map(JSON.stringify)), JSON.parse)
}
console.log(coords.length)