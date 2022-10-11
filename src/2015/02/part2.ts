export default function solution(input:string) {
	const gifts = input.split("\n").map(v => v.split("x").map(v => +v));
	let total = 0

	for(const gift of gifts){
		const [L, W, H] = gift;
		const smallestAreas = [L, W, H].sort((a,b)=>a-b).slice(0,2).reduce((a, b) => a + b, 0) * 2;
		const volume = L*W*H;
		total += smallestAreas+volume;
	}

	return total;
}