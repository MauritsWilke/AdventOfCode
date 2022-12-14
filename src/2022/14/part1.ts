export default function solution(input: string) {
	const splitLines = input.split("\n");
	const blockedNumbers = new Set();

	for (const line of splitLines) {
		const pairs = line.match(/\d+,\d+/g)!.map(v => v.split(",").map(Number));

		for (const pair in pairs) {
			const current = pairs[pair];
			const next = pairs[+pair + 1];
			if (next === undefined) continue;
			const fromToX = [current[0], next[0]].sort((a, b) => a - b);
			const fromToY = [current[1], next[1]].sort((a, b) => a - b);

			for (let i = fromToX[0]; i <= fromToX[1]; i++) {
				for (let j = fromToY[0]; j <= fromToY[1]; j++) blockedNumbers.add([i, j].join("."));
			}
		}
	}

	const lowestPoint = Math.max(...([...blockedNumbers].map((v: any) => +v.split(".")![1])));
	const beforeSand = blockedNumbers.size;

	let abyss = false;
	while (!abyss) {
		let blocked = false;
		let coords = [500, 0];

		while (!blocked) {
			coords[1]++;
			if (coords[1] > lowestPoint) {
				abyss = true;
				blocked = true;
				break;
			};

			if (!blockedNumbers.has(coords.join("."))) continue;
			else {
				coords[0]--;
				if (!blockedNumbers.has(coords.join("."))) continue;
				coords[0] += 2;
				if (!blockedNumbers.has(coords.join("."))) continue;
				coords[1]--;
				coords[0]--;
				blocked = true;
			}
		}

		if (!abyss) blockedNumbers.add(coords.join("."));
	}

	const sand = blockedNumbers.size - beforeSand;
	return sand;
}