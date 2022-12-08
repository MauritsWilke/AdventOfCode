export default function solution(input: string) {
	const forestGrid = input.split("\r\n").map(v => v.split("").map(Number));

	let visible = forestGrid.length * 4 - 4;
	for (const row in forestGrid) {
		if (+row === 0 || +row === forestGrid.length - 1) continue
		for (const column in forestGrid[row]) {
			if (+column === 0 || +column === forestGrid.length - 1) continue

			const height = forestGrid[row][column]

			const leftOf = Math.max(...forestGrid[row].slice(0, +column));
			const rightOf = Math.max(...forestGrid[row].slice(+column + 1, forestGrid[row].length));
			const topOf = Math.max(...forestGrid.map(v => v[column]).slice(0, +row));
			const bottomOf = Math.max(...forestGrid.map(v => v[column]).slice(+row + 1, forestGrid[row].length));

			const isVisible = [leftOf, rightOf, topOf, bottomOf].some(v => v < height);

			if (isVisible) visible++;
		}
	}

	return visible;
}