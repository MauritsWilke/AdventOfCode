const { readFileSync } = require(`fs`);
const input = readFileSync("./day_12/input.txt", "utf-8").split("\n").filter(v => v !== "")
const isLowerCase = (string) => /^[a-z]*$/.test(string)

let connections = {}
for (let path of input) {
	let split = path.split("-")
	for (part of split) if (!connections[part] && part !== "end") connections[part] = []
	if (split[1] !== "start" && split[0] !== "end") connections[split[0]].push(split[1])
	if (split[0] !== "start" && split[1] !== "end") connections[split[1]].push(split[0])
}

let paths = []
for (let cave of connections["start"]) travel(cave, "start", connections, ["start"])

function travel(location, previous, connections, path) {
	let traversed = [...path]
	traversed.push(location)
	if (location == "end") return paths.push(traversed)
	let copy = Object.assign({}, connections);
	if (isLowerCase(previous)) for (let k in copy) copy[k] = copy[k].filter(v => v !== previous)
	for (let cave of copy[location]) travel(cave, location, copy, traversed)
}
console.log(paths.length) // 4792