export default function solution(input: string) {
	const instructions = input.split("\n").map(v => v.split("")).filter(v => v.length);

	const location = [1, 1];
	let code = [];
	for (const line of instructions) {
		for (const ins of line) {
			if (ins === "U") location[1] = Math.max(location[1] - 1, 0);
			if (ins === "D") location[1] = Math.min(location[1] + 1, 2);
			if (ins === "R") location[0] = Math.min(location[0] + 1, 2);
			if (ins === "L") location[0] = Math.max(location[0] - 1, 0);
		}
		code.push(location[0] + 1 + (location[1] * 3));
	}

	return code.join("");
}