export default function solution(input: string) {
	const ins = input.split("\n").map(v => v.split(" "))

	const strength = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

	const groupedHands: { [key: string]: string[][] } = { fi: [], fo: [], fu: [], th: [], tw: [], pa: [], hi: [] }

	for (const hand of ins) {
		const cards = hand[0].split("").reduce((p, c) => {
			p[c] = p?.[c] ? p[c] + 1 : 1;
			return p
		}, {} as { [key: string]: number });

		const uniques = Object.entries(cards);
		const max = Object.values(cards).max();
		const min = Object.values(cards).min();

		if (max === 5) groupedHands.fi.push(hand);
		else if (max === 4) groupedHands.fo.push(hand);
		else if (max === 3) {
			if (min === 2) groupedHands.fu.push(hand);
			else groupedHands.th.push(hand);
		} else if (max === 2) {
			if (uniques.length === 3) groupedHands.tw.push(hand);
			else groupedHands.pa.push(hand);
		} else groupedHands.hi.push(hand);
	}

	Object.values(groupedHands).forEach(hands => {
		hands.sort((a, b) => {
			const aCopy = [...a];
			const bCopy = [...b];

			let done = false;
			while (!done) {
				if (aCopy[0][0] === bCopy[0][0]) {
					aCopy[0] = aCopy[0].slice(1);
					bCopy[0] = bCopy[0].slice(1);
				} else done = true;
			}

			return strength.indexOf(aCopy[0][0]) - strength.indexOf(bCopy[0][0])
		})
	})

	const sortedHands = Object.values(groupedHands).flat().reverse();
	const sum = sortedHands.reduce((p, c, i) => p + (+c[1] * (i + 1)), 0);

	return sum;
}