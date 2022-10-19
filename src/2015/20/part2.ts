export default function solution(input: string) {

	let lowestHouseNum: number = 0;
	for (let houseNum = 1; ; houseNum++) {
		const half = Math.floor(Math.sqrt(houseNum)) + 1;
		const divisors:Set<number> = new Set();
		for (let elf = 1; elf <= half; elf++) {
			if (houseNum % elf === 0) {
				if (houseNum <= elf * 50) divisors.add(elf);
				if (houseNum <= houseNum / elf * 50) divisors.add(houseNum / elf)
			}
		}

		const sum = Array.from(divisors).reduce((a, b) => a + b) * 11

		if (sum >= +input) {
			lowestHouseNum = houseNum;
			break;
		}
	}

	return lowestHouseNum
}