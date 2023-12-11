export default function solution(input: string) {
	const data = input.split("\n").filter(v => v).map(v => v.split(""));
	const distanceMultiplier = 1000000;

	const galaxies: Set<string> = new Set();
	const emptyCols: number[] = [];

	let yMultiplier = 0;
	let xMultiplier = 0;

	for (let y = 0; y < data.length; y++) {
		if (data[y].uniques().length === 1) {
			yMultiplier += distanceMultiplier;
			continue;
		}

		for (let x = 0; x < data[y].length; x++) {
			if (emptyCols.includes(x)) xMultiplier += distanceMultiplier;
			else {
				const col = data.map(v => v[x]);
				if (col.uniques().length === 1) {
					emptyCols.push(x);
					xMultiplier += distanceMultiplier;
				}
			}

			if (data[y][x] === "#") {
				let realX = (xMultiplier ? x + xMultiplier : x) - xMultiplier / distanceMultiplier;
				let realY = (yMultiplier ? y + yMultiplier : y) - yMultiplier / distanceMultiplier;
				galaxies.add(`${realY}.${realX}`);
			}
		}

		xMultiplier = 0;
	}

	const galaxyPairs = [...galaxies].pairs();

	let sum = 0;
	for (const pair of galaxyPairs) {
		const [y1, x1, y2, x2] = pair.map(v => v.split(".").map(Number)).flat();
		sum += Math.abs(y1 - y2) + Math.abs(x1 - x2);
	}

	return sum;
}
