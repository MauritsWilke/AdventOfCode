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

	return hisOfX.map((regVal, currentlyDrawn) => [-1, 0, 1].some(v => (regVal - v) === currentlyDrawn % 40) ? "█" : " ").join("").match(/.{40}/g)!.join("\n")
}