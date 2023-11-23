export default function solution(input: string) {
	const instructions = input.split("\n").filter(v => v.length);
	type bots = { [key: string]: { values: number[], instructions: { low: string, high: string } } }
	const bots: bots = {};

	for (const ins of instructions) {
		const bot = ins.match(/bot \d+/)![0].match(/\d+/)![0];
		if (!bots[bot]) bots[bot] = { values: [], instructions: { low: "", high: "" } }

		if (ins.match(/value/)) bots[bot].values.push(+ins.match(/\d+/g)![0])
		else {
			const [, low, high] = ins.match(/\w+ \d+/g)!;
			bots[bot].instructions = { low: low, high: high }
		}
	}

	const output = [0, 0, 0];

	let hasTwo = true;
	while (hasTwo) {
		for (const [botNum, bot] of Object.entries(bots)) {
			if (bot.values.length !== 2) continue;

			const [low, high] = bot.values.sort((a, b) => a - b);

			if (bot.instructions.low.match(/bot/)) bots[+bot.instructions.low.match(/\d+/)!].values.push(low);
			if (bot.instructions.high.match(/bot/)) bots[+bot.instructions.high.match(/\d+/)!].values.push(high);

			[0, 1, 2].forEach(v => {
				const regex = new RegExp(`output ${v}(\\s|$)`);
				if (bot.instructions.low.match(regex)) output[v] = low;
				if (bot.instructions.high.match(regex)) output[v] = high;
			})

			bot.values = [];
		}
		hasTwo = !!Object.values(bots).find(v => v.values.length == 2)
	}

	return output.reduce((a, b) => a * b);
}