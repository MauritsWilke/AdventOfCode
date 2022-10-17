export default function solution(input:string) {
	const containers = input.split("\r\n").map(v => +v);

	let combinations = 0;

	for(let i = 0; i < 1 << containers.length; i++){
		const active = (i).toString(2).padStart(containers.length, "0").split("").map(v => +v);
		const total = containers.filter((v,i) => active[i] === 1).reduce((a,b) => a + b, 0);
		if(total === 150) combinations++
	}

	return combinations
}