export default function solution(input:string) {
	const floor = input.match(/\(/g)!.length - input.match(/\)/g)!.length
	return floor
}