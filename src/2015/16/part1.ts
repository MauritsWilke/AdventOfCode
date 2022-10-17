export default function solution(input: string) {
	const sues = input.split("\n");

	const unknownSue:{[key:string]: number} = {
		children: 3,
		cats: 7,
		samoyeds: 2,
		pomeranians: 3,
		akitas: 0,
		vizslas: 0,
		goldfish: 5,
		trees: 3,
		cars: 2,
		perfumes: 1
	};

	const realSue = sues.filter(sue => {
		const info = sue.match(/\w+: \d/g)!.map(v => v.match(/\w+/g)!.map(v => String(v)));

		const canBeReal = info.every((info) => {
			const [key, value] = info;
			return unknownSue[key] === +value;
		})

		return canBeReal;
	})

	return realSue[0].match(/\d+/)![0];
}