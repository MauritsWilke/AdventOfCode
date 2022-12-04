export default function solution(input: string) {
	let overlap = input.split("\r\n")
		.map(v => v.split(",").map(v => v.split("-").map(v => +v)))
		.filter(v => v[1][0] <= v[0][1] && v[0][0] <= v[1][1]).length;

	return overlap;
}