const fs = require(`fs`)
const input = (fs.readFileSync("./day_4/input.txt", "utf-8")).split("\n");

const bingoNumbers = input[0].split(",")
let bingoCards = [];

let card = []
for (i = 2; i < input.length; i++) {
	if (input[i] != "") card.push([...input[i].split(/\D/)].filter(v => v != ""))
	if (card.length == 5) {
		bingoCards.push(card)
		card = []
	}
}

let winningCard;
let winningNumber;
for (number of bingoNumbers) {
	for (card of bingoCards) {
		if (winningCard) continue;
		for (line of card) {
			line.forEach((item, i) => {
				if (+item == +number) line[i] = "██"
			})
		}
		if (hasBingo(card)) winningCard = card
		winningNumber = number
	}
}

function hasBingo(card) {
	let hasBingo = false;
	for (line of card) if (!hasBingo) hasBingo = line.every((v, i, a) => v === a[0])
	for (i = 0; i < 5; i++) {
		if (hasBingo) continue;
		let lineFlip = []
		for (line of card) lineFlip.push(line[i])
		hasBingo = lineFlip.every((v, i, a) => v === a[0])
	}
	return hasBingo
}

let sum = 0;
for (line of winningCard) {
	line = line.filter(data => data !== "██")
	line.forEach(number => sum += +number)
}
console.log(`Sum: ${sum}\nWinning Number: ${winningNumber}\nTotal: ${sum * winningNumber}`) // 29440