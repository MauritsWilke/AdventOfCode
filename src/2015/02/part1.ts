export default function solution(input:string) {
	const gifts = (input.split("\n").map(v => v.split("x")) as any) as Array<Array<number>>;
	let total = 0

	for(const gift of gifts){
		const [L, W, H] = gift;
		const areas = [L*W, W*H, H*L]
		const smallestArea = Math.min(...areas);
		total += areas.map(v => v*2)
			.reduce((a,b) => a+b, 0) + smallestArea
	}

	return total;
}