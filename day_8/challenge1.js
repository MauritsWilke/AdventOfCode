const fs = require(`fs`)
const input = (fs.readFileSync("./day_8/input.txt", "utf-8")).split("\n").map((a) => a.replace(/^[^|]*|\| /g, ""))
let timesOfAppearance = 0;
for(string of input) for(i of string.split(" ")) if([2,3,4,7].includes(i.length)) timesOfAppearance++
console.log(timesOfAppearance)