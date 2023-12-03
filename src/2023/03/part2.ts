export default function solution(input: string) {
	const ins = input.split("\r\n");

	const gearMap: { [key: string]: number[] } = {}

	for (let i = 0; i < ins.length; i++) {
		const numbers = [...ins[i].matchAll(/\d+/g)] || [];

		for (const num of numbers) {
			const coordsToCheck = [];

			for (let k = num.index!; k < num.index! + num[0].length; k++) coordsToCheck.push(k);

			let gearwheelCoords: string | undefined;
			for (const coord of coordsToCheck) {
				[-1, 0, 1].forEach((k) => {
					[-1, 0, 1].forEach((l) => {
						const char = ins[i + k]?.[coord + l] || ".";
						if (char === "*") gearwheelCoords = `${i + k}.${coord + l}`;
					})
				})
			}

			if (gearwheelCoords) {
				if (!gearMap?.[gearwheelCoords]) gearMap[gearwheelCoords] = [+num[0]];
				else gearMap?.[gearwheelCoords].push(+num[0])
			}
		}
	}

	let sum = Object.entries(gearMap).filter(v => v[1].length === 2).map(v => v[1].product()).sum();

	return sum;
}