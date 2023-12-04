export default function solution(input: string) {
	const ins = input.split("\n").filter(v => v).map(v => v.replace(/Card\s+\d+:/, "").split("|").map(v => v.match(/\d+/g)!.map(Number)))

	let points = 0;
	for (const card of ins) {
		const overlappingNums = intersection(card[1], card[0]);

		if (overlappingNums.length) points += Math.pow(2, overlappingNums.length - 1)
	}

	return points;
}

function intersection(a: any[], b: any[]) {
	const setA = new Set(a);
	return b.filter(value => setA.has(value));
}