export default function solution(input: string) {
	const [ins, maps] = input.split("\n\n");
	const instructions = ins.split("");
	const mapped = maps.split("\n").map(v => [...v.match(/[^\s=(),]{3}/g)!]); // I forgot about [A-Z]{3}

	const locations = mapped.filter(v => v[0].at(-1) === "A").map(v => v[0]);

	const stepsTaken = locations.map(v => {
		let location = v;
		let steps = 0;
		while (location.at(-1) !== "Z") {
			const next = instructions[steps % instructions.length];
			location = mapped.find(v => v[0] === location)![next === "L" ? 1 : 2];
			steps++;
		}
		return steps;
	});

	const LCM = listLCM(stepsTaken);

	return LCM;
}

function listLCM(arr: number[]) {
	return arr.reduce((a, c) => (a * c) / gcd(a, c));
}

function gcd(a: number, b: number) {
	if (b === 0) {
		return a;
	}

	return gcd(b, a % b);
}