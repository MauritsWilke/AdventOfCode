export default function solution(input: string) {
	const rooms = input.split("\r\n").filter(v => v.length);

	let count = 0;
	for (const room of rooms) {
		const [, name, id, checksum] = /([\w-]+)-(\d+)\[(\w+)/gi.exec(room)!.map(v => v.replaceAll("-", ""));

		let chars: { [key: string]: number } = {};
		for (const char of name.split("")) {
			if (chars?.[char] !== undefined) chars[char]++;
			else chars[char] = 1;
		}

		const sorted = Object.entries(chars)
			.sort(([, a], [, b]) => b - a)
			.sort((a, b) => a[1] === b[1] ? a[0] > b[0] ? 1 : -1 : 1)
			.slice(0, 5)
			.reduce((a, [b,]) => a + b, "");
		if (checksum === sorted) count += +id;
	}

	return count;
}