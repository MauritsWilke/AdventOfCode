export default function solution(input: string) {
	return input.split("\r\n")
		.filter(v => v.length)
		.map(v => v.match(/\d+/g)!.map(Number))
		.filter(v => Math.max(...v) < v.reduce((a, b) => a + b) - Math.max(...v)).length;
}