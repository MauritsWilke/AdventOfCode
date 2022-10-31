export default function solution(input: string) {
	const sum = input.split("\r\n").map(v => +v).reduce((a, b) => a + b, 0) / 4;
	const packages = input.split("\r\n").map(v => +v).sort((a, b) => a - b);

	let groups: number[][] = [];

	for(let i = 1; i < packages.length; i++){
		const combis = combinations(packages, i);
		for(let combi of combis){
			const weight = combi.reduce((a,b) => a + b,0);
			if(weight === sum) groups.push(combi);
		}
		if(groups.length > 0) break;
	}

	const QE = groups.map(v => v.reduce((a, b) => a * b));
	return Math.min(...QE);
}

/*
	Edited version of:
	https://rosettacode.org/wiki/Combinations#JavaScript
*/
function combinations<T>(arr: T[], size: number): T[][] {
	const combis: T[][] = [];
	let sub: T[][];

	for (let i = 0; i < arr.length; i++) {
		if (size === 1) combis.push([arr[i]]);
		else {
			sub = combinations(arr.slice(i + 1, arr.length), size - 1);

			for (let subI = 0; subI < sub.length; subI++) {
				let next = sub[subI];
				next.unshift(arr[i]);
				combis.push(next);
			}
		}
	}
	return combis;
}
