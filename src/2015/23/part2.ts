export default function solution(input:string) {
	const instructions = input.split("\r\n");
	const registers:{a:number, b:number} = { a: 1, b: 0}
	
	for(let i = 0; i < instructions.length; i++){
		const command = instructions[i].slice(0,3);
		const reg = <"a"|"b"|undefined>instructions[i].match(/a|b/)?.[0];

		if(command === "hlf" && reg) registers[reg] /= 2;
		else if(command === "tpl" && reg) registers[reg] *= 3;
		else if(command === "inc" && reg) registers[reg]++;
		else if(command === "jmp" 
		|| (command === "jie" && reg && registers[reg] % 2 === 0) 
		|| (command === "jio" && reg && registers[reg] === 1)){
			const mod = +instructions[i].match(/-*\d+/)![0];
			i += mod - 1; // -1 because i++ will already move to the next instruction;
		}
	}

	return registers.b
}