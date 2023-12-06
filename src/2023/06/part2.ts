export default function solution(input: string) {
	const races = input.split("\n").map(v => Number(v.match(/\d+/g)!.join("")));

	// # To get the star, I just used brute force:
	// const ways = [];

	// let times = [];
	// for (let j = races[0]; j > 0; j--) times.push(j * (races[0] - j));
	// ways.push(times.filter(v => v > races[1]).length);

	// return ways.product();

	const [a, b, c] = [-1, races[0], -races[1]]
	const D = (Math.pow(b, 2) - 4 * a * c);
	let firstSol = Math.ceil((-b + Math.sqrt(D)) / (2 * a));
	let secondSol = Math.floor((-b - Math.sqrt(D)) / (2 * a));

	firstSol += firstSol * (b - firstSol) === races[1] ? 1 : 0;
	secondSol += secondSol * (b - secondSol) === races[1] ? -1 : 0;

	return secondSol - firstSol + 1;
}