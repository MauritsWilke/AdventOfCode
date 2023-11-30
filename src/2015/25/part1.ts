export default function solution(input: string) {
	const [row, column] = input.match(/\d+/g)!.map(v => +v);
	let index = ((row + column - 1) * (row + column) / 2) - row;
	let last = 20151125;
	while (index-- > 0) last = (last * 252533) % 33554393;
	return last;
}