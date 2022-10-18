export default function solution(input:string) {
	let grid = input.split("\r\n").map(v => v.split(""));
	grid.forEach(line => {
		line.push(".");
		line.unshift(".");
	});

	// @ts-ignore because TS doesn't like me (understandable)
	["unshift","push"].forEach(f => grid[f](new Array(grid[0].length).fill(".")));

	grid[1][1] = "#";
	grid[grid.length -2][1] = "#";
	grid[1][grid[0].length - 2] = "#";
	grid[grid.length -2][grid[0].length - 2] = "#";

	for(let it = 0; it < 100; it++){
		const copy = JSON.parse(JSON.stringify(grid));

		for(let i = 1; i < grid.length - 1; i++){
			for(let j = 1; j < grid[0].length - 1; j++){
				let lightsOn = 0;
				[-1, 0, 1].forEach(v => {
					[-1, 0, 1].forEach(w => {
						if(grid[i + v][j + w] === "#" && !(v === 0 && w === 0)) lightsOn++;
					})
				});

				if(grid[i][j] === "#"){
					if(lightsOn === 2 || lightsOn === 3) copy[i][j] = "#";
					else copy[i][j] = "."
				} else {
					if(lightsOn === 3) copy[i][j] = "#"
				}
			}
		}

		copy[1][1] = "#";
		copy[grid.length -2][1] = "#";
		copy[1][grid[0].length - 2] = "#";
		copy[grid.length -2][grid[0].length - 2] = "#";

		grid = [...copy];
	}

	const lightsOn = grid.map(v => v.filter(v => v === "#").length).reduce((a,b) => a + b, 0);
	return lightsOn
}