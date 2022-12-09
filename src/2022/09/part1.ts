export default function solution(input: string) {
	const movement = input.split("\r\n");

	const visited: Set<string> = new Set();

	let headPos = [0, 0];
	let tailPos = [0, 0];
	for (const mov of movement) {
		let [direction, amount]: ["L" | "R" | "U" | "D", number] = mov.split(" ").map(v => parseInt(v) || v) as any;

		while (amount--) {
			if (direction === "U") headPos[1]++;
			else if (direction === "D") headPos[1]--;
			else if (direction === "L") headPos[0]--;
			else headPos[0]++;

			const distance = Math.hypot(headPos[0] - tailPos[0], headPos[1] - tailPos[1]);
			if (distance > Math.SQRT2) {
				if (distance === Math.sqrt(5)) {
					tailPos[0] += tailPos[0] > headPos[0] ? -1 : 1;
					tailPos[1] += tailPos[1] > headPos[1] ? -1 : 1;
				}
				else if (direction === "U") tailPos[1]++;
				else if (direction === "D") tailPos[1]--;
				else if (direction === "L") tailPos[0]--;
				else tailPos[0]++;
			}
			visited.add(tailPos.join("."));
		}
	}

	return visited.size;
}