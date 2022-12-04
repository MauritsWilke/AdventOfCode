export default function solution(input: string) {
	const splitLines = input.split("\r\n").map(v => v.split(",").map(v => v.split("-").map(v => +v))).filter(v => {
		if (v[0][0] <= v[1][0] && v[0][1] >= v[1][1]) return 1
		else if (v[1][0] <= v[0][0] && v[1][1] >= v[0][1]) return 1
	});

	return splitLines.length
}