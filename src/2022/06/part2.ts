export default function solution(input: string) {
	const lastFour: string[] = []; /* Just imagine it says lastFourteen */

	for (const [i, v] of input.split("").entries()) {
		if (lastFour.length === 14) {
			if (new Set(lastFour).size === lastFour.length) return i;
			lastFour.shift();
		}
		lastFour.push(v);
	}
}