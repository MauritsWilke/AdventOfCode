const fs = require(`fs`)
const input = (fs.readFileSync("./day_3/input.txt", "utf-8")).split("\n");

let gammaRate = "";
for (i = 0; i < input[0].length; i++) {
	let amountOfOnes = 0;
	for (data of input) if (data[i] == 1) amountOfOnes++
	amountOfOnes > 1000 - amountOfOnes ? gammaRate += "1" : gammaRate += "0"
}
let epsilonRate = gammaRate.replace(/0/g, `a`).replace(/1/g, `0`).replace(/a/g, `1`)
console.log(`Gamma Rate: ${gammaRate} | Decimal: ${parseInt(gammaRate, 2)}\nEpsilon Rate: ${epsilonRate} | Decimal: ${parseInt(epsilonRate, 2)}\nMultiplied: ${parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)}`) // 2640986