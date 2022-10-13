type Graph = {[key:string]: {[key:string]: number}}

export default function solution(input:string) {
	const paths = input.split("\r\n");
	const graph:Graph = {}
	let shortest:{distance:number,path:string[]} = {
		distance: 0,
		path: []
	}

	paths.forEach(path => {
		const [placeA, placeB] = path.match(/[A-Z]\w*/g)!;
		const distance = +path.match(/\d+/)![0];
		graph[placeA] ??= {};
		graph[placeB] ??= {};
		Object.assign(graph[placeA], { [placeB]: distance});
		Object.assign(graph[placeB], { [placeA]: distance});
	})

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
				shortest = {
					distance: distance,
					path: visited
				}
			}
		}
	}

	Object.keys(graph).forEach(place => {
		traverse(place);
	})

	return shortest.distance;
}

