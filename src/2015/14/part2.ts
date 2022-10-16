export default function solution(input:string) {
	const reindeers = input.split("\r\n");
	const distance:{[reindeer: string]: {distance: number, points:number, speed:number, time:number, rest:number}} = {};

	reindeers.forEach(deer => {
		const [speed, time, rest] = deer.match(/\d+/gm)!.map(v => +v);
		distance[deer] = {
			distance: 0,
			points: 0,
			speed: speed,
			time: time,
			rest: rest
		};
	})

	// sec starts at 1 instead of 0 because it'd break the modulo otherwise :)
	for(let sec = 1; sec < 2503 + 1; sec++){
		reindeers.forEach(deer => {
			const form = sec % (distance[deer].time + distance[deer].rest);
			if(form <= distance[deer].time && form !== 0){
				distance[deer].distance += distance[deer].speed;
			}
		})

		const highest = Object.values(distance).reduce((a, b) => a.distance > b.distance ? a : b).distance;

		Object.entries(distance).forEach(deer => {
			if(deer[1].distance === highest) deer[1].points++
		})
	}

	const mostPoints = Object.values(distance).reduce((a, b) => a.points > b.points ? a : b).points;
	return mostPoints;
}