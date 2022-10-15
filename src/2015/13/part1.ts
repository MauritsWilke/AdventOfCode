type Graph = {[key:string]: {[key:string]: number}}

export default function solution(input:string) {
	let shortest:{distance:number,path:string[]} = {
		distance: 0,
		path: []
	}

	const likings:Graph = {};

	input.split("\n").forEach(person => {
		const p1 = person.match(/\w+/)![0];
		const ranking = person.match("gain") ? +person.match(/\d+/)![0] : -person.match(/\d+/)![0];
		const p2 = person.match(/\w+/g)!.at(-1)!;
		likings[p1] ??= {};
		Object.assign(likings[p1], { [p2]: ranking});
	})

	const graph:Graph = JSON.parse(JSON.stringify(likings));

	for(const [k, v] of Object.entries(graph)){
		for(const [k2, v2] of Object.entries(v)){
			graph[k][k2] += likings[k2][k]	
		}
	}

	function traverse(location:string, visited:string[] = [], distance:number = 0){
		const connections = Object.fromEntries(
			Object.entries(graph[location]).filter(v => !visited.includes(v[0]))
		);
		
		const newPath = [...visited];
		newPath.push(location);
		const locations = Object.keys(connections);

		locations.forEach(city => {
			traverse(city, newPath, distance + graph[location][city]);
		})

		if(locations.length === 0) {
			visited.push(location)
			if(shortest.distance < distance){
				distance += graph[visited[0]][visited.at(-1)!]
				shortest = {
					distance: distance,
					path: visited
				}
			}
		}
	}
	
	Object.keys(graph).forEach(person => {
		traverse(person);
	});

	console.log(shortest);

	return shortest.distance;
}