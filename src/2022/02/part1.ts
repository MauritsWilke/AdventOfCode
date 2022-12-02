export default function solution(input: string) {
	const splittedLines = input.split("\r\n").map(v => v.split(" ")!);
	let score = 0;

	splittedLines.forEach(round => {
		const [ENEMY, YOU] = round;
		if (ENEMY === "A" /* ROCK */) {
			if (YOU === "X") score += 3; // Rock draw
			if (YOU === "Y") score += 6; // Paper wins
			if (YOU === "Z") score += 0; // Scissors lose
		}
		if (ENEMY === "B" /* PAPER */) {
			if (YOU === "X") score += 0; // Rock loses
			if (YOU === "Y") score += 3; // Paper draw
			if (YOU === "Z") score += 6; // Scissors win
		}
		if (ENEMY === "C" /* SCISSORS */) {
			if (YOU === "X") score += 6; // Rock wins
			if (YOU === "Y") score += 0; // Paper loses
			if (YOU === "Z") score += 3; // Scissors draw
		}

		if (YOU === "X") score += 1;
		if (YOU === "Y") score += 2;
		if (YOU === "Z") score += 3;
	})

	return score;
}