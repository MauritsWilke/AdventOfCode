const fs = require(`fs`)
const input = (fs.readFileSync("./day_2/input.txt", "utf-8")).split("\n");

let horizontalPos = 0;
let depth = 0;
let aim = 0;
for (movement of input) {
	if (movement.includes("forward")) {
		horizontalPos += +movement.replace(/\D/g, "")
		depth += (aim * +movement.replace(/\D/g, ""))
	}
	if (movement.includes("up")) aim -= +movement.replace(/\D/g, "")
	if (movement.includes("down")) aim += +movement.replace(/\D/g, "")
}
console.log(`Horizontal Movement: ${horizontalPos}\nDepth: ${depth}\nAim: ${aim}\nMultiplied: ${horizontalPos * depth}`) // 1864715580