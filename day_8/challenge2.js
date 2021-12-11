const fs = require(`fs`)
const input = (fs.readFileSync("./day_8/input.txt", "utf-8")).split("\n").map((a) => a.split(/\|/g))
let total = 0;
for (i of input) {
	let one = i[0].split(" ").filter(a => a.length == 2).toString()
	let four = i[0].split(" ").filter(a => a.length == 4).toString()
	let seven = i[0].split(" ").filter(a => a.length == 3).toString()
	let eight = i[0].split(" ").filter(a => a.length == 7).toString()
	let three = i[0].split(" ").filter(a => a.length == 5 && a.match(new RegExp(seven.split("").join("|"), "g")).length == 3).toString()
	let two = i[0].split(" ").filter(a => a.length == 5 && a.match(new RegExp(eight.replace(new RegExp(four.split("").join("|"), "g"), "").split("").join("|"), "g")).length == 3).toString()
	let five = i[0].split(" ").filter(a => a.length == 5 && a !== three && a !== two).toString()
	let zero = i[0].split(" ").filter(a => a.length == 6 && a.match(new RegExp(eight.replace(new RegExp(three.split("").join("|"), "g"), "").split("").join("|"), "g")).length == 2 && a.match(new RegExp(one.split("").join("|"), "g")).length == 2).toString()
	let six = i[0].split(" ").filter(a => a.length == 6 && a.match(new RegExp(one.split("").join("|"), "g")).length == 1).toString()
	let nine = i[0].split(" ").filter(a => a.length == 6 && a !== zero && a !== six).toString()
	let digits = i[1].split(" ").filter(a => a !== "")
	for (let i in digits) {
		if (digits[i].match(new RegExp(eight.split("").join("|"), "g")).length === 7) { digits[i] = 8; continue }
		if (digits[i].match(new RegExp(zero.split("").join("|"), "g")).length === 6) { digits[i] = 0; continue }
		if (digits[i].match(new RegExp(six.split("").join("|"), "g")).length === 6) { digits[i] = 6; continue }
		if (digits[i].match(new RegExp(nine.split("").join("|"), "g")).length === 6) { digits[i] = 9; continue }
		if (digits[i].match(new RegExp(two.split("").join("|"), "g")).length === 5) { digits[i] = 2; continue }
		if (digits[i].match(new RegExp(three.split("").join("|"), "g")).length === 5) { digits[i] = 3; continue }
		if (digits[i].match(new RegExp(five.split("").join("|"), "g")).length === 5) { digits[i] = 5; continue }
		if (digits[i].match(new RegExp(four.split("").join("|"), "g")).length === 4) { digits[i] = 4; continue }
		if (digits[i].match(new RegExp(seven.split("").join("|"), "g")).length === 3) { digits[i] = 7; continue }
		if (digits[i].match(new RegExp(one.split("").join("|"), "g")).length === 2) { digits[i] = 1; continue }
	}
	total += parseInt(digits.join(""))
}
console.log(total)