export default function solution(input: string) {
	const i = input.split("\r\n").filter(v => v);

	const numMap = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

	let sum = 0;
	for (const line of i) {
		const digits = [...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)!].map(v => v[1]);
		let num = digits[0] + digits.at(-1);

		num = num.replace(/one|two|three|four|five|six|seven|eight|nine/g, (v) => String(numMap.indexOf(v) + 1));
		sum += Number(num);
	}

	return sum;
}