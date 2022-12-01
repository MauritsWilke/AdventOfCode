export default function solution(input: string) {
	const elves: number[] = [];
	let index = 0;
	input.split(/\n/).forEach(v => {
		if (v === "") index++
		else {
			elves[index] ||= 0;
			elves[index] += +v
		}
	});
	const sum = elves.sort(function (a, b) { return b - a }).slice(0, 3).reduce((a, b) => a + b, 0);
	return sum;
}