export default function solution(input:string) {
	const digits = input.match(/-*\d+/g)!.reduce((a,b) => (+a) + (+b), 0);
	return digits;
}