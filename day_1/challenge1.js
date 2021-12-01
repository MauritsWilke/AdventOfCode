const fs = require(`fs`)
const input = (fs.readFileSync("./day_1/input.txt", "utf-8")).split("\n");
let timesIncreased = 0;
for (depth in input) if (input[depth] > +input[depth - 1]) timesIncreased++
console.log(timesIncreased) // 1466