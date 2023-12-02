export default function solution(input: string) {
	const ins = input.split("\r\n").filter(v => v);

	let sum = 0;
	for (const line of ins) {
		const red = Math.max(0, ...[...line.matchAll(/\d+ red/g)].map(v => v[0].match(/\d+/)).map(Number));
		const green = Math.max(0, ...[...line.matchAll(/\d+ green/g)].map(v => v[0].match(/\d+/)).map(Number));
		const blue = Math.max(0, ...[...line.matchAll(/\d+ blue/g)].map(v => v[0].match(/\d+/)).map(Number));

		const power = red * green * blue;

		sum += power;
	}

	return sum
}