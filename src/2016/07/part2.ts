export default function solution(input: string) {
	return input.split("\r\n")
		.map(v => v
			.split(/\[|\]/)
			.reduce((prev, curr, i) => (prev[i % 2].push(curr)) ? prev : prev, [[], []] as string[][])
			.map(v =>
				[...v.join(".").matchAll(/(?=((?<a>[a-z])((?!\k<a>)([a-z]))\k<a>))/g)!]
					.map(v => v[1])
			).map((v, i) => i !== 1 ? v : v.map(x => [...x].concat(x[1]).slice(1, 4).join("")))
		).filter(v => v[1].some(x => v[0].includes(x))).length
}