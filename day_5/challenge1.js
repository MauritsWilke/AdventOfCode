const fs = require(`fs`)
const input = (fs.readFileSync("./day_5/input.txt", "utf-8")).split("\n");
let oceanFloor = [...Array(1000)].map(() => [...Array(1000)].map(() => 0));
for (segment of input) {
	let [x1, y1, x2, y2] = segment.match(/\d+/g).map(Number)
	if (x1 !== x2 && y1 !== y2) continue;
	if (Math.abs(x2 - x1)) for (i = Math.min(x1, x2); i < Math.max(x2, x1) + 1; i++) oceanFloor[y1][i]++
	if (Math.abs(y2 - y1)) for (i = Math.min(y1, y2); i < Math.max(y2, y1) + 1; i++) oceanFloor[i][x1]++
}
console.log(oceanFloor.flat().filter(v => v > 1).length) // 6113