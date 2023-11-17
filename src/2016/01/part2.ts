
export default function solution(input: string) {
	const steps = input.split(",");
	let facing = 0; // 0->N 1->E etc

	const visited = new Set();
	const location = [0, 0];

	for (const step of steps) {
		let [direction, amount] = step.match(/(L|R)|(\d+)/gm)!;
		facing = (direction === "L" ? facing + 3 : facing + 1) % 4;

		for (let i = 0; i < +amount; i++) {
			location[facing % 2] += (facing === 2 || facing === 3) ? -1 : 1;

			if (visited.has(location.join("."))) return Math.abs(location[0]) + Math.abs(location[1]);
			else visited.add(location.join("."));
		}
	}

	return location[0] + location[1];
}