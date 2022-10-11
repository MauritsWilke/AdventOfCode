const fs = require(`fs`)
const input = (fs.readFileSync("./day_2/input.txt", "utf-8")).split("\n");

let horizontalPos = 0;
let depth = 0;
for (movement of input) {
	if (movement.includes("forward")) horizontalPos += +movement.replace(/\D/g, "")
	if (movement.includes("up")) depth -= +movement.replace(/\D/g, "")
	if (movement.includes("down")) depth += +movement.replace(/\D/g, "")
}
console.log(`Horizontal Movement: ${horizontalPos}\nDepth: ${depth}\nMultiplied: ${horizontalPos * depth}`) // 2215080