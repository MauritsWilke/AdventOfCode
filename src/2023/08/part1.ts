export default function solution(input: string) {
	const [ins, maps] = input.split("\n\n");
	const instructions = ins.split("");
	const mapped = maps.split("\n").map(v => [...v.match(/[^\s=(),]{3}/g)!])

	let location = "AAA";
	let steps = 0;
	while (location !== "ZZZ") {
		const next = instructions[steps % instructions.length];
		location = mapped.find(v => v[0] === location)![next === "L" ? 1 : 2];
		steps++;
	}

	return steps;
}