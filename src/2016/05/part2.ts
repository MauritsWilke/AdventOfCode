import { createHash } from "crypto"

export default function solution(input: string) {
	let i = 0;
	let password = new Array(8);

	while (password.join("").length !== 8) {
		let hash = createHash("md5").update(input + i++).digest('hex');
		if (hash.match(/^00000/) && +hash[5] < 8 && !password[+hash[5]]) password[+hash[5]] = hash[6];
	}

	return password.join("")
}