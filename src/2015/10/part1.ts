export default function solution(input:string) {
	let splitted = input.split("");

	for(let i = 0; i < 40; i++){
		let last = splitted[0];
		let amount = 0;
		let updated = "";
		splitted.forEach((v,i) => {
			if(v === last) amount++;
			else {
				updated = `${updated}${amount}${last}`;
				last = v;
				amount = 1;
			}
			if(i ===  splitted.length-1) updated = `${updated}${amount}${last}`;
		})
		splitted = updated.split("");
	}

	return splitted.length;
}