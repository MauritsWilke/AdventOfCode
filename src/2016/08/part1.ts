export default function solution(input: string) {
	const screen = Array.from({ length: 6 }, e => new Array(50).fill("."))
	const instructions = input.split("\r\n").map(v => [...v.matchAll(/(rect|column|row|\d+)/g)].map(v => v[1]));

	for (const ins of instructions) {
		switch (ins[0]) {
			case 'rect':
				for (let i = 0; i < +ins[2]; i++) for (let j = 0; j < +ins[1]; j++) screen[i][j] = "#"
				break;
			case 'column':
				const col = screen.map(v => v[+ins[1]]);
				col.push(...col.splice(0, (-1 * +ins[2] % col.length + col.length) % col.length))
				col.forEach((v, i) => screen[i][+ins[1]] = v)
				break;
			case 'row':
				const row = screen[+ins[1]]
				row.push(...row.splice(0, (-1 * +ins[2] % row.length + row.length) % row.length))
				break;
		}
	}

	return screen.flat().join("").match(/#/g)?.length;
}