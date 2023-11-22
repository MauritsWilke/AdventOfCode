export default function solution(input: string) {
	let length = 0;
	const file = input.replaceAll(/\s/g, "").split("");

	let decompression = "";
	let chunk = false;
	for (let i = 0; i < file.length; i++) {
		if (file[i] === "(") chunk = true;
		if (file[i] === ")") {
			chunk = false;
			const [amount, times] = decompression.match(/\d+/g)!
			length += +amount * +times - 1; // -1 to compensate for counting the )
			decompression = "";
			i += +amount;
		}
		if (chunk) decompression += file[i];
		else length++;
	}

	return length;
}