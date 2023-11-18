import { createHash } from "crypto"

export default function solution(input: string) {
	let i = 0;
	let password = "";

	while (password.length !== 8) {
		let hash = createHash("md5").update(input + i++).digest('hex');
		if (hash.match(/^00000./)) password += hash.at(5);
	}

	return password
}