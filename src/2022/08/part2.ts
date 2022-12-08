export default function solution(input: string) {
	const forestGrid = input.split("\r\n").map(v => v.split("").map(Number));

	let maxDistance = 0;
	for (const row in forestGrid) {
		if (+row === 0 || +row === forestGrid.length - 1) continue
		for (const column in forestGrid[row]) {
			if (+column === 0 || +column === forestGrid.length - 1) continue

			const height = forestGrid[row][column]

			const leftOf = forestGrid[row].slice(0, +column).reverse();
			const rightOf = forestGrid[row].slice(+column + 1, forestGrid[row].length)
			const topOf = forestGrid.map(v => v[column]).slice(0, +row).reverse();
			const bottomOf: number[] = forestGrid.map(v => v[column]).slice(+row + 1, forestGrid[row].length)

			const viewingDistance = [leftOf, rightOf, topOf, bottomOf].map(v => {
				const visible = v.findIndex(v => v >= height) + 1;
				return visible === 0 ? v.length : visible;
			}).reduce((a, b) => a * b, 1);

			if (viewingDistance > maxDistance) maxDistance = viewingDistance;
		}
	}

	return maxDistance;
}