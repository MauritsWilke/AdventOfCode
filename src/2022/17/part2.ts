export default function solution(input: string) {
	const pattern = input.split("");


	const occupied = new Set(["0.0", "1.0", "2.0", "3.0", "4.0", "5.0", "6.0"]); // with floor
	let highest = 0;
	let patternIndex = 0;

	const flatLineCoords: number[] = [];

	for (let i = 0; i < 1000; i++) { // CHANGE BACK TO 2022

		let landed = false;
		let rock = getRock(highest, i)! as number[][];

		while (!landed) {
			const movement = pattern[patternIndex++ % pattern.length] as "<" | ">";
			rock = transformRock(rock, movement, occupied);

			const fallenRock = rock.map(v => [v[0], v[1] - 1]);
			const allowed = fallenRock.every(v => !occupied.has(v.join(".")));

			if (allowed) rock = rock.map(v => [v[0], v[1] - 1]);
			else landed = true;
		}

		rock.forEach(v => occupied.add(v.join(".")));

		const c = rock.reduce((a, b) => a > b[1] ? a : b[1], 0)
		if (c > highest) highest = c;

		if (i % 5 === 0) flatLineCoords.push(rock[0][1]);
	}

	const deltaY = flatLineCoords.map((v, i) => flatLineCoords[i + 1] - v).slice(0, -1);
	const biggestPattern = deltaY.join(".")
		.match(/((\d+.)+?)\1/g)!
		.reduce((a, b) => a.length > b.length ? a : b, "")
		.split(".");
	const repeatingDeltas = biggestPattern.slice(0, biggestPattern.length / 2).map(Number);
	const firstRepeatHeight = flatLineCoords[deltaY.join(".").match(repeatingDeltas.join("."))!.index!];

	console.log(firstRepeatHeight);


	// const b = flatLineCoords.map((v, i) => flatLineCoords[i + 1]?.[1] - v[1]).slice(0, -1);
	// const biggestRepeat = b.join(".").match(/((\d+.)+?)\1/g)!.reduce((a, b) => a.length > b.length ? a : b, "").split(".");
	// const sliced = biggestRepeat.slice(0, Math.floor(biggestRepeat.length / 2)).map(Number);
	// console.log(sliced)

	// 3 of the first rock land before the pattern start
	// 4th rock kicks off a cycle of 7 
	// run the loop 3 times to get the height
	// run the loop 7 times to get the extra height
	// multiply that by 1000000000000 - 3 / 7
	// add the first thingie

	// console.log(b.join(".").match(/((\d+\.)+)\1/g)![1].match(/\./g))

	return highest
}

const getRock = (highestRock: number, index: number) => {
	switch (index % 5) {
		case 0: {
			// -
			return [[2, highestRock + 4], [3, highestRock + 4], [4, highestRock + 4], [5, highestRock + 4]]
		}
		case 1: {
			// +
			return [[2, highestRock + 5], [3, highestRock + 5], [4, highestRock + 5], [3, highestRock + 6], [3, highestRock + 4]]
		}
		case 2: {
			// ⅃
			return [[2, highestRock + 4], [3, highestRock + 4], [4, highestRock + 4], [4, highestRock + 5], [4, highestRock + 6]]
		}
		case 3: {
			// LINE PIECE 🙏
			return [[2, highestRock + 4], [2, highestRock + 5], [2, highestRock + 6], [2, highestRock + 7]]
		}
		case 4: {
			// boulder
			return [[2, highestRock + 4], [2, highestRock + 5], [3, highestRock + 4], [3, highestRock + 5]]
		}
	}
}

const transformRock = (rock: number[][], movement: "<" | ">", occupied: Set<string>) => {
	if (movement === "<") {
		const furthestLeft = rock.reduce((a, b) => a < b[0] ? a : b[0], Infinity);
		if (furthestLeft === 0) return rock;

		const moved = rock.map(v => [v[0] - 1, v[1]]);
		const allowed = moved.every(v => !occupied.has(v.join(".")))

		if (allowed) return moved;
		return rock;
	} else {
		const furthestRight = rock.reduce((a, b) => a > b[0] ? a : b[0], 0)
		if (furthestRight === 6) return rock;

		const moved = rock.map(v => [v[0] + 1, v[1]]);
		const allowed = moved.every(v => !occupied.has(v.join(".")))

		if (allowed) return moved;
		return rock;
	}
}