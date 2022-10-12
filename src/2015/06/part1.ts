export default function solution(input:string) {
	const instructions = input.split("\n");
	const grid = new Array(1000*1000).fill(0);

	instructions.forEach(ins => {
		const command = ins.match(/\D+/)![0];
		const [X1, Y1, X2, Y2] = ins.match(/\d+/g)?.map(v => +v)!;

		for(let X = X1; X <= X2; X++){
			for(let Y = Y1; Y <= Y2; Y++){

				if(command === "turn on ") grid[X * 1000 + Y] = 1;
				if(command === "turn off ") grid[X * 1000 + Y] = 0;
				if(command === "toggle ") grid[X * 1000 + Y] = +!grid[X * 1000 + Y];

			}
		}
	})

	return grid.filter(v => v === 1).length

}