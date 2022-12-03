export default function solution(input: string) {
	const answer = input.split("\r\n")
		.map(v => [v.substring(0, v.length / 2), v.substring(v.length / 2)])
		.map(v => (v[0].match(new RegExp(`[${v[1]}]`, "g")))![0])
		.map(v => v === v.toUpperCase() ? v.toLowerCase().charCodeAt(0) - 96 + 26 : v.toLowerCase().charCodeAt(0) - 96)
		.reduce((a, b) => a + b, 0);

	return answer
}