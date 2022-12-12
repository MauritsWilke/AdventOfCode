export default function solution(input: string) {
	const map = input.split("\r\n").map(v => v.split(""));
	const sIndex = map.flat().findIndex(v => v === "S");
	const eIndex = map.flat().findIndex(v => v === "E");
	const sCoords = [Math.floor(sIndex / map[0].length), sIndex % map[0].length].join(".");
	const eCoords = [Math.floor(eIndex / map[0].length), eIndex % map[0].length].join(".");

	type Graph = Map<string, string[]>
	const adjacencyList: Graph = new Map();
	const charMap = ".abcdefghijklmnopqrstuvwxyz";

	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[0].length; j++) {
			let currentChar = map[i][j];
			let currentCoords = [i, j].join(".");
			if (currentChar === "S") currentChar = "a";
			if (currentChar === "E") currentChar = "z";
			const currentValue = charMap.indexOf(currentChar);

			adjacencyList.set(currentCoords, []);

			[[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(v => {
				let movedChar = map[i + v[0]]?.[j + v[1]];
				if (movedChar === "S") movedChar = "a";
				if (movedChar === "E") movedChar = "z";

				if (movedChar !== undefined) {
					const movedValue = charMap.indexOf(movedChar);
					if (Math.abs(movedValue - currentValue) <= 1 || movedValue < currentValue) {
						const movedCoords = [i + v[0], j + v[1]].join(".");
						adjacencyList.get(currentCoords)!.push(movedCoords);
					}
				}
			})
		}
	}

	function backtrace(parents: { [key: string]: string }, start: string, end: string) {
		let path = [];
		while (end !== start) {
			path.push(end);
			end = parents[end];
		}
		return path;
	}

	function bfs(graph: Graph, start: string, end: string) {
		const queue = [start];
		const visited = new Set();
		const parents: { [key: string]: string } = {};

		while (queue.length > 0) {
			const v = queue.shift()!;

			if (v === end) {
				return backtrace(parents, start, end);
			}
			for (let w of graph.get(v)!) {
				if (!visited.has(w)) {
					parents[w] = v;
					visited.add(w);
					queue.push(w);
				}
			}
		}
	}

	const steps = bfs(adjacencyList, sCoords, eCoords)?.length;

	return steps;
}