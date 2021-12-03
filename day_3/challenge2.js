const fs = require(`fs`)
const input = (fs.readFileSync("./day_3/input.txt", "utf-8")).split("\n");

let oxygenArray = input
for (i = 0; i < 12; i++) {
	if (oxygenArray.length != 1) {
		let mostCommonBit;
		let amountOfOnes = 0;
		let amountOfZero = 0;

		for (data of oxygenArray) data[i] == 1 ? amountOfOnes++ : amountOfZero++

		if (amountOfOnes == amountOfZero) mostCommonBit = 1;
		else mostCommonBit = amountOfOnes > amountOfZero ? 1 : 0

		oxygenArray = oxygenArray.filter(data => data[i] == mostCommonBit)
	}
}

let carbonArray = input
for (i = 0; i < 12; i++) {
	if (carbonArray.length != 1) {
		let leastCommonBit;
		let amountOfOnes = 0;
		let amountOfZero = 0;

		for (data of carbonArray) data[i] == 1 ? amountOfOnes++ : amountOfZero++

		if (amountOfOnes == amountOfZero) leastCommonBit = 0;
		else leastCommonBit = amountOfOnes > amountOfZero ? 0 : 1
		carbonArray = carbonArray.filter(data => data[i] == leastCommonBit)
	}
}

console.log(parseInt(oxygenArray[0], 2) * parseInt(carbonArray[0], 2)) // 6822109