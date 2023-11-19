export default function solution(input: string) {
	return input.split("\r\n")
		.map(v => v
			.split(/\[|\]/)
			.reduce((prev, curr, i) => (prev[i % 2].push(curr)) ? prev : prev, [[], []] as string[][])
			.map(v => v.join(".")
				.match(/(?<a>.)((?!\k<a>)(?<b>.))\k<b>\k<a>/g)?.length || 0
			)
		).filter(v => v[0] !== 0 && v[1] === 0).length
}