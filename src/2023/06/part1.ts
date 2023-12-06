export default function solution(input: string) {
	const races = input.split("\n").map(v => v.match(/\d+/g)!.map(Number));

	const ways = [];
	for (let i = 0; i < races[0].length; i++) {
		const time = races[0][i];
		const distance = races[1][i];

		// # First solution
		// let times = [];
		// for (let j = time; j > 0; j--) times.push(j * (time - j));
		// ways.push(times.filter(v => v > distance).length);

		const [a, b, c] = [-1, time, -distance]
		const D = (Math.pow(b, 2) - 4 * a * c);
		let firstSol = Math.ceil((-b + Math.sqrt(D)) / (2 * a));
		let secondSol = Math.floor((-b - Math.sqrt(D)) / (2 * a));

		firstSol += firstSol * (time - firstSol) === distance ? 1 : 0;
		secondSol += secondSol * (time - secondSol) === distance ? -1 : 0;

		ways.push(secondSol - firstSol + 1);
	}

	return ways.product();
}