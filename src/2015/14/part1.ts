export default function solution(input:string) {
	const reindeers = input.split("\n");

	let furthest = 0;
	reindeers.forEach(deer => {
		const [speed, time, rest] = deer.match(/\d+/gm)!.map(v => +v);
		const distance = Math.floor(2503 / (time + rest)) * (speed * time) + Math.min((2503 % (time + rest)), time) * speed;
		if(distance > furthest) furthest = distance;
	})

	return furthest;
}