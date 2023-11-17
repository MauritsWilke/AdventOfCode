export default function solution(input: string) {
	const pattern = input.split("");

	const occupied = new Set(["0.0", "1.0", "2.0", "3.0", "4.0", "5.0", "6.0"]); // with floor
	let highest = 0;
	let patternIndex = 0;
	for (let i = 0; i < 2022; i++) { // CHANGE BACK TO 2022

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

		const c = rock.reduce((a, b) => a > b[1] ? a : b[1], 0);
		if (c > highest) highest = c;
	}

	visualise(occupied, highest)

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

// * Used this for some debugging, but its p nice so i'm not gonna remove it
const visualise = (v: Set<string>, highest: number) => {
	let height = highest;
	let heightDigits = `${highest}`.length;

	while (v.size > 0) {
		let numAsString = `${height}`.padStart(heightDigits, " ");
		let row = `${numAsString} |`;
		for (let i = 0; i <= 6; i++) {
			const hasCoords = v.delete([i, height].join("."));
			row += hasCoords ? "#" : ".";
		}
		row += "|";
		if (height === 0) row = "+-------+".padStart(heightDigits + 10, " ");
		console.log(row)
		height--;
	}
}