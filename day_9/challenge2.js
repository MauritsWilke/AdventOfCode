const fs = require(`fs`);
const input = fs
	.readFileSync("./day_9/input.txt", "utf-8")
	.split("\n")
	.filter((v) => v !== "")
	.map((v) => v.split(""))
	.map((a) => a.map(Number));

class Point {
	constructor(y, x, h) {
		(this.y = y), (this.x = x), (this.h = h);
	}
}

function getLowest(input, y, x) {
	let self = new Point(y, x, input[y][x]);
	let left = new Point(y, x - 1, input[y]?.[x - 1] ?? 10);
	let right = new Point(y, x + 1, input[y]?.[x + 1] ?? 10);
	let top = new Point(y - 1, x, input?.[y - 1]?.[x] ?? 10);
	let bottom = new Point(y + 1, x, input?.[y + 1]?.[x] ?? 10);

	let lowest = self;
	[self, left, right, top, bottom].forEach((v) => {
		if (v.h < self.h) lowest = v;
	});

	if ([left.h, right.h, top.h, bottom.h].includes(lowest.h)) return;
	if (lowest.h == self.h) return lowest;
	getLowest(input, lowest.y, lowest.x);
}

let lowPoints = [];
for (y in input) {
	for (x in input[y]) {
		let lowest = getLowest(input, +y, +x);
		if (lowest) lowPoints.push(lowest);
	}
}

function getWall(input, y, x) {
	let left = new Point(y, x - 1, input[y]?.[x - 1] ?? 10);
	let right = new Point(y, x + 1, input[y]?.[x + 1] ?? 10);
	let top = new Point(y - 1, x, input?.[y - 1]?.[x] ?? 10);
	let bottom = new Point(y + 1, x, input?.[y + 1]?.[x] ?? 10);

	let walls = [left, right, top, bottom].filter((v) => v.h < 9);
	return walls;
}

let basins = [];
for (let point of lowPoints) {
	point = {
		x: point.x,
		y: point.y,
		h: point.h,
	};

	let basin = [point];

	for (let point of basin) {
		let walls = getWall(input, point.y, point.x);
		for (let wall of walls) {
			wall = {
				x: wall.x,
				y: wall.y,
				h: wall.h,
			};
			if (!basin.some((v) => v.x === wall.x && v.y === wall.y)) basin.push(wall);
		}
	}
	basins.push(basin.length);
}
basins.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));

console.log(basins[0] * basins[1] * basins[2]);
