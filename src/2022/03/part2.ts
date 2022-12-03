export default function solution(input: string) {
	const splittedLines = input.split("\r\n");
	const shared = [];

	for (let i = 0; i < splittedLines.length - 1; i += 3) {
		const firstRegex = new RegExp(`[${splittedLines[i]}]`, "g");
		const temp = [... new Set(splittedLines[i + 1].match(firstRegex))].join("");
		const secondRegex = new RegExp(`[${temp}]`, "g");
		const allShared = splittedLines[i + 2].match(secondRegex)![0];
		shared.push(allShared);
	}

	const sum = shared
		.map(v => v === v.toUpperCase() ? v.toLowerCase().charCodeAt(0) - 96 + 26 : v.toLowerCase().charCodeAt(0) - 96)
		.reduce((a, b) => a + b, 0);

	return sum;
}