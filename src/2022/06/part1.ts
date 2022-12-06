export default function solution(input: string) {
	const lastFour: string[] = [];

	for (const [i, v] of input.split("").entries()) {
		if (lastFour.length === 4) {
			if (new Set(lastFour).size === lastFour.length) return i;
			lastFour.shift();
		}
		lastFour.push(v);
	}
}