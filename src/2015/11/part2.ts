import { default as oldSolution } from "./part1.js";

export default function solution(input:string) {
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	let password = increase(oldSolution(input));

	function validate(pw:string){
		if(pw.match(/i|o|l/g)) {
			password = password
				.replace("i", "j")
				.replace("o", "p")
				.replace("l", "m");
			return false;
		}

		const matches = pw.match(/(\w)\1/gm)?.length || 0;
		if(matches < 2) return false;

		if(!pw.match(/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/gm)) return false;

		return true;
	}

	function increase(pw:string){
		const splitted = pw.split("").reverse();
		for(let i = 0; i < splitted.length; i++){
			if(splitted[i] !== "z"){
				splitted[i] = alphabet[alphabet.indexOf(splitted[i]) + 1];
				break;
			}
			splitted[i] = "a";
			if(i === splitted.length - 1) {
				splitted.unshift("a");
				break;
			}
		}

		return splitted.reverse().join("");
	}

	while(!validate(password)) password = increase(password);

	return password;
}