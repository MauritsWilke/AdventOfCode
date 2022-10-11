const fs = require(`fs`)
const measurements = (fs.readFileSync("./day_1/input.txt", "utf-8")).split("\n");
let timesIncreased = 0;
let previous;
for (i = 2; i < measurements.length; i++) {
	sum = (+measurements[i - 2]) + (+measurements[i - 1]) + (+measurements[i])
	if (sum > previous) timesIncreased++
	previous = sum
}
console.log(timesIncreased) // 1491