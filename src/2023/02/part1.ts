export default function solution(input: string) {
	const ins = input.split("\r\n").filter(v => v);

	let sum = 0;
	for (const line of ins) {
		const red = [...line.matchAll(/\d+ red/g)].map(v => v[0].match(/\d+/)).map(Number).find(v => v > 12);
		const green = [...line.matchAll(/\d+ green/g)].map(v => v[0].match(/\d+/)).map(Number).find(v => v > 13);
		const blue = [...line.matchAll(/\d+ blue/g)].map(v => v[0].match(/\d+/)).map(Number).find(v => v > 14);

		if (!red && !green && !blue) sum += +line.match(/\d+/)!
	}

	return sum
}