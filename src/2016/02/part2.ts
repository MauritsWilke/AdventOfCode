export default function solution(input: string) {
	const instructions = input.split("\n").map(v => v.split("")).filter(v => v.length);

	const keypad = [
		[null, null, "1", null, null],
		[null, "2", "3", "4", null],
		["5", "6", "7", "8", "9"],
		[null, "A", "B", "C", null],
		[null, null, "D", null, null]
	]

	let location = [2, 0];
	let code = [];
	for (const line of instructions) {
		for (const ins of line) {
			const oldLocation = location.slice();
			if (ins === "U") location[0] = Math.max(location[0] - 1, 0);
			if (ins === "D") location[0] = Math.min(location[0] + 1, 4);
			if (ins === "R") location[1] = Math.min(location[1] + 1, 4);
			if (ins === "L") location[1] = Math.max(location[1] - 1, 0);
			if (keypad[location[0]][location[1]] === null) location = oldLocation;
		}
		code.push(keypad[location[0]][location[1]]);
	}

	return code.join("");
}