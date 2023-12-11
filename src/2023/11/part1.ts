export default function solution(input: string) {
	const data = input.split("\n").filter(v => v).map(v => v.split(""));

	for (let i = 0; i < data.length; i++) {
		if (data[i].uniques().length === 1) {
			data.splice(i, 0, [...data[i]]);
			i++;
		}
	}

	for (let i = 0; i < data[0].length; i++) {
		const col = data.map(v => v[i]);

		if (col.uniques().length === 1) {
			data.forEach(v => v.splice(i, 0, "."));
			i++;
		}
	}

	const galaxies: Set<string> = new Set();
	for (let i = 0; i < data.length; i++) for (let j = 0; j < data[i].length; j++) if (data[i][j] === "#") galaxies.add(`${i}.${j}`);

	const galaxyPairs = [...galaxies].pairs();

	let sum = 0;
	for (const pair of galaxyPairs) {
		const [y1, x1, y2, x2] = pair.map(v => v.split(".").map(Number)).flat();
		sum += Math.abs(y1 - y2) + Math.abs(x1 - x2);
	}

	return sum;
}