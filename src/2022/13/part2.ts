export default function solution(input: string) {
	const pairs = input.concat("\r\n[[2]]\r\n[[6]]").split("\r\n").filter(v => v !== "").map(v => JSON.parse(v));
	const rightOrder = pairs.sort((a, b) => compare(a, b)).reverse();
	return ["[[2]]", "[[6]]"].map(a => rightOrder.findIndex(v => JSON.stringify(v) === a) + 1).reduce((a, b) => a * b, 1)
}

function compare(left: number | Array<any>, right: number | Array<any>): 1 | -1 | 0 {
	if (Number.isInteger(left) && Number.isInteger(right)) {
		return left === right ? 0 : left < right ? 1 : -1;
	}

	if (Array.isArray(left) && Array.isArray(right)) {
		for (const value in left) {
			const v = compare(left[value], right[value]);
			if (v !== 0) return v;
		}
		return left.length === right.length ? 0 : left.length < right.length ? 1 : -1;
	}

	if (Number.isInteger(left)) return compare([left], right);
	if (Number.isInteger(right)) return compare(left, [right]);

	return -1; // If I dont do this, TypeScript gets angry with me :(
}