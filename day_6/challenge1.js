const fs = require(`fs`)
const input = (fs.readFileSync("./day_6/input.txt", "utf-8")).split(`,`)

let fishes = {
	0: input.filter(age => +age == 0).length,
	1: input.filter(age => +age == 1).length,
	2: input.filter(age => +age == 2).length,
	3: input.filter(age => +age == 3).length,
	4: input.filter(age => +age == 4).length,
	5: input.filter(age => +age == 5).length,
	6: input.filter(age => +age == 6).length,
	7: 0,
	8: 0
}

//for (i = 0; i < 80; i++) {
for (age in fishes) {
	console.log(fishes[age])
}
//}