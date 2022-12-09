export default function solution(input: string) {
	const movement = input.split("\r\n");

	const visited: Set<string> = new Set();

	const ropeArray = new Array(10).fill(0).map(v => [0, 0]);

	for (const mov of movement) {
		let [direction, amount]: ["L" | "R" | "U" | "D", number] = mov.split(" ").map(v => parseInt(v) || v) as any;

		while (amount--) {
			if (direction === "U") ropeArray[0][1]++
			else if (direction === "D") ropeArray[0][1]--
			else if (direction === "L") ropeArray[0][0]--
			else ropeArray[0][0]++

			for (let i = 1; i < ropeArray.length; i++) {
				const previousKnot = ropeArray[i - 1];
				const currentKnot = ropeArray[i];
				const distance = Math.hypot(previousKnot[0] - currentKnot[0], previousKnot[1] - currentKnot[1]);

				if (distance > Math.SQRT2) {
					if (distance === Math.sqrt(5)) {
						currentKnot[0] += currentKnot[0] > previousKnot[0] ? -1 : 1;
						currentKnot[1] += currentKnot[1] > previousKnot[1] ? -1 : 1;
					} else[0, 1].forEach(v => currentKnot[v] += previousKnot[v] > currentKnot[v] ? 1 : previousKnot[v] < currentKnot[v] ? -1 : 0); // Suck it GPT3
				}
			}

			visited.add(ropeArray.at(-1)!.join("."));
		}
	}

	return visited.size;
}