export default function solution(input: string) {
	const splitLines = input.split("\r\n");

	const crates: string[][] = [];
	const instructions: [amount: number, from: number, to: number][] = [];

	for (const line of splitLines) {
		if (line === "" || line.match(/\s\d+\s+/) && !line.match("move")) continue;
		if (line.match("move")) {
			const inst = line.match(/\d+/g)!.map(Number);
			instructions.push(inst as any);
		} else {
			const parts = line.match(new RegExp(`.{3,4}`, "g"))!;
			for (const [i, v] of parts.entries()) {
				if (v.trim() === "") continue;
				crates[i] ||= [];
				crates[i].push(v);
			}
		}
	}
	crates.map(v => v.reverse());

	for (const ins of instructions) {
		const cratesToMove = crates[ins[1] - 1].splice(-ins[0]);
		crates[ins[2] - 1] = crates[ins[2] - 1].concat(cratesToMove);
	}

	let ans = "";
	for (let crateStack of crates) ans += crateStack.at(-1);
	ans = ans.match(/\w/g)!.join("");

	return ans;
}