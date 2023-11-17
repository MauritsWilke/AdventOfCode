export default function solution(input: string) {
	return input.split("\r\n")
		.filter(v => v.length)
		.map(v => v.match(/\d+/g)!.map(Number))
		.map((v, i, a) => i % 3 === 0 ?
			v.map((v, j) => [v, a[i + 1][j], a[i + 2][j]])
			: []
		)
		.flat()
		.filter(v => Math.max(...v) < v.reduce((a, b) => a + b) - Math.max(...v)).length;
}