export default function solution(input:string) {
	const splitted = input.split("");
	
	let floor = 0;
	let pos = 0;

	for(let c of splitted){
		floor += c === "(" ? 1 : -1;
		pos++;
		if(floor === -1) break;
	}

	return pos;
}