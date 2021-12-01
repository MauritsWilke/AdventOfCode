const lineReader = require('readline').createInterface({
	input: require('fs').createReadStream(`./day_1/input.txt`)
});

let timesIncreased = 0;
let previous;
let measurements = []
lineReader.on('line', function (line) { measurements.push(+line) })

lineReader.on('close', function (e) {
	for (i = 2; i < measurements.length; i++) {
		sum = measurements[i - 2] + measurements[i - 1] + measurements[i]
		if (sum > previous) timesIncreased++
		previous = sum
	}

	console.log(timesIncreased)
})