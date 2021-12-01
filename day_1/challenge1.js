const lineReader = require('readline').createInterface({
	input: require('fs').createReadStream(`./day_1/input.txt`)
});

let timesIncreased = 0;
let previous;
let lineCount = 0;
lineReader.on('line', function (line) {
	let newDepth = parseInt(line)
	if (lineCount !== 0 && (newDepth > previous)) timesIncreased = timesIncreased + 1
	previous = line
	lineCount++
})

lineReader.on('close', function (e) {
	console.log(timesIncreased)
})