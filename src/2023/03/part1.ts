export default function solution(input: string) {
	const ins = input.split("\r\n");

	let sum = 0;

	for (let i = 0; i < ins.length; i++) {
		const numbers = [...ins[i].matchAll(/\d+/g)] || [];

		for (const num of numbers) {
			const coordsToCheck = [];

			for (let k = num.index!; k < num.index! + num[0].length; k++) coordsToCheck.push(k);

			let valid = false;
			for (const coord of coordsToCheck) {
				if (valid) continue;

				const tL = ins[i - 1]?.[coord - 1] || ".";
				const tM = ins[i - 1]?.[coord] || ".";
				const tR = ins[i - 1]?.[coord + 1] || ".";
				const mL = ins[i]?.[coord - 1] || ".";
				const mR = ins[i]?.[coord + 1] || ".";
				const bL = ins[i + 1]?.[coord - 1] || ".";
				const bM = ins[i + 1]?.[coord] || ".";
				const bR = ins[i + 1]?.[coord + 1] || ".";

				const legit = [tL, tM, tR, mL, mR, bL, bM, bR].find(v => v?.match(/[^.0-9]/));
				if (legit) valid = true;
			}

			if (valid) sum += Number(num);
		}
	}

	return sum;
}