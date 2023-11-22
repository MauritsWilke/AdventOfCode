export default function solution(input: string) {
	let length = 0;
	const file = input.replaceAll(/\s/g, "").split(/(\d+|.)/).filter(v => v !== "");

	multiplyComing(0, file.length, 1);
	function multiplyComing(startIndex: number, amount: number, times: number) {
		let decompression = "";
		let chunk = false;
		let amountToLoop = startIndex + amount;

		for (let i = startIndex; i < amountToLoop; i++) {
			if (file[i] === "(") chunk = true;
			else if (file[i] === ")") {
				const [newAmount, newTimes] = decompression.match(/\d+/g)!.map(Number);

				multiplyComing(i + 1, newAmount, (newTimes - 1) * times);

				chunk = false;
				decompression = "";
				length -= times; // don't count the )
			}

			if (chunk) decompression += file[i];
			else length += times;
			if (startIndex !== 0) amountToLoop -= file[i].length - 1;
		}
	}

	return length;
}