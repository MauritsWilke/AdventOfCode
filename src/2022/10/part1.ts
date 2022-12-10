export default function solution(input: string) {
	const instructions = input.split("\r\n").map(v => v.split(" "));

	let x = 1;
	let hisOfX: number[] = [];
	for (const ins of instructions) {
		if (ins[0] === "noop") hisOfX.push(x);
		else {
			hisOfX.push(x, x);
			x += +ins[1]
		}
	}

	let sum = 0;
	for (let v = 20; v <= 220; v += 40) sum += v * hisOfX[v - 1];

	return sum;
}