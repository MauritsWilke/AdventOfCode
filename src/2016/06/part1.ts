export default function solution(input: string) {
	return input.split("\r\n")
		.map((v, i, a) => i === 0 ? [...v].map((x, j) => a.map(v => v.at(j)!)) : [])
		.flat()
		.map(v => Object.entries(v
			.reduce((a, b) => (a[b] = (a[b] || 0) + 1) ? a : a, {} as { [key: string]: number }))
			.sort(([, a], [, b]) => b - a)
		).map(v => v[0][0])
		.join("");
}