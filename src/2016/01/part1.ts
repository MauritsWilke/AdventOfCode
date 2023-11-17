
export default function solution(input: string) {
	const steps = input.split(",");

	let stepsTaken = [0, 0, 0, 0]; // N E S W
	let facing = 0; // 0->N 1->E etc

	for (const step of steps) {
		const [direction, amount] = step.match(/(L|R)|(\d+)/gm)!;
		facing = direction === "L" ? facing === 0 ? 3 : facing - 1 : facing + 1;
		stepsTaken[facing % 4] += +amount;
	}

	const distance = stepsTaken[0] - stepsTaken[2] + stepsTaken[1] - stepsTaken[3];
	return distance;
}