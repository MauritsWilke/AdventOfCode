export default function solution(input: string) {
	const i = input.split("\r\n");

	let sum = 0;
	for (const line of i) {
		const digits = line.match(/\d/g)!;
		const num = digits[0] + digits.at(-1);
		sum += Number(num);
	}

	return sum;
}