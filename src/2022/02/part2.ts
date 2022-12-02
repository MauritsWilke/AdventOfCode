export default function solution(input: string) {
	const splittedLines = input.split("\r\n").map(v => v.split(" ")!);
	const drawMap = { "A": 1, "B": 2, "C": 3 };
	const loseMap = { "A": 3, "B": 1, "C": 2 };
	const winMap = { "A": 2, "B": 3, "C": 1 };
	let score = 0;

	splittedLines.forEach(round => {
		const [ENEMY, YOU]: ["A" | "B" | "C", "X" | "Y" | "Z"] = round as any;
		if (YOU === "X") score += loseMap[ENEMY];
		if (YOU === "Y") score += drawMap[ENEMY] + 3;
		if (YOU === "Z") score += winMap[ENEMY] + 6;
	})

	return score;
}