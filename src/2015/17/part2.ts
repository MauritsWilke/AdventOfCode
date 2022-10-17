export default function solution(input:string) {
	const containers = input.split("\r\n").map(v => +v);

	let combinations = 0;
	let minimum = Infinity;
	let minComb = 0;

	for(let i = 0; i < 1 << containers.length; i++){
		const active = (i).toString(2).padStart(containers.length, "0").split("").map(v => +v);
		const total = containers.filter((v,i) => active[i] === 1);

		if(total.reduce((a,b) => a + b, 0) === 150){ 
			combinations++;
			if(total.length === minimum) minComb++;
			if(total.length < minimum) {
				minimum = total.length
				minComb = 1
			};
		}
	}

	return minComb
}