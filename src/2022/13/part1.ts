export default function solution(input: string) {
	const pairs = input.split("\r\n\r\n").map(v => v.split("\r\n"));

	let rightOrder = 0;
	for (const pair in pairs) {
		const compared = compare(JSON.parse(pairs[pair][0]), JSON.parse(pairs[pair][1]));
		if (compared === 1) rightOrder += (+pair + 1);
	}

	return rightOrder;
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