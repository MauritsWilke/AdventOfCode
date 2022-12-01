export default function solution(input: string) {
	let count = 0;
	let highest = 0;
	input.split(/\n/).forEach(v => {
		if (v === "") {
			if (count > highest) highest = count;
			count = 0;
		} else count += +v
	});
	return highest;
}