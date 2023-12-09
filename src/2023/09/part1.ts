export default function solution(input: string) {
	const history = input.split("\n").map(v => v.match(/-?\d+/g)!.map(Number));

	let sum = 0;
	for (const data of history) {
		const pyramid: number[][] = [data];
		while (pyramid.at(-1)?.uniques().length !== 1) pyramid.push(pyramid.at(-1)!.map((v, i, a) => a[i + 1] - v).filter(v => !isNaN(v)));
		sum += pyramid.reduce((c, p) => c + p.at(-1)!, 0);
	}

	return sum;
}