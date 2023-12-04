export default function solution(input: string) {
	let cards = input.split("\n").filter(v => v).map(v => v.split(":")).map(v => [+v[0].match(/\d+/)!, v[1].split("|").map(v => v.match(/\d+/g)!.map(Number))]);
	const copies = [...cards];

	for (let i = 0; i < cards.length; i++) {
		// @ts-ignore
		const overlappingNums = intersection(cards[i][1][0], cards[i][1][1]);

		if (overlappingNums.length) {
			// @ts-ignore
			const copiedCards = copies.slice(cards[i][0], cards[i][0] + overlappingNums.length);

			cards.push(...copiedCards);
		}
	}

	return cards.length;
}

function intersection(a: any[], b: any[]) {
	const setA = new Set(a);
	return b.filter(value => setA.has(value));
}