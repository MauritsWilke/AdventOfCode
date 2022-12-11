export default function solution(input: string) {
	const monkeys = input.split(/(\r\n){2}/).filter(v => v !== "\r\n").map(v => {
		const split = v.split("\r\n");
		const operation = split[2].substring(19).replaceAll("old", "x");
		const trueMonkey = +split[4].match(/\d+/g)![0];
		const falseMonkey = +split[5].match(/\d+/g)![0]

		return {
			items: split[1].match(/\d+/g)!.map(Number),
			operation: (x: number): number => eval(operation.replaceAll("x", x.toString())),
			mod: +split[3].match(/\d+/)!,
			test: (x: number) => x % +split[3].match(/\d+/)! === 0 ? trueMonkey : falseMonkey,
			inspected: 0
		}
	});

	const coolNumberIFoundOnline = monkeys.reduce((a, b) => a * b.mod, 1);
	let rounds = 10000;
	for (let i = 0; i < rounds; i++) {
		for (let monkey of monkeys) {
			monkey.items = monkey.items.map(item => monkey.operation(item) % coolNumberIFoundOnline);
			monkey.items.forEach(item => {
				monkeys[monkey.test(item)].items.push(item);
			})

			monkey.inspected += monkey.items.length
			monkey.items = [];
		}
	}

	const MonkeyBusiness = monkeys.sort((a, b) => a.inspected - b.inspected).slice(-2).reduce((a, b) => a * b.inspected, 1);
	return MonkeyBusiness;
}