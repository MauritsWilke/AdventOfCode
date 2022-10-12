import { default as oldSolution } from "./part1.js";

export default function solution(input:string) {
	const wireMap: {[key:string]: string} = Object.fromEntries(input.split("\r\n").map(v => v.split(" -> ").reverse()));
	wireMap["b"] = oldSolution(input)

	function get(wire:string){
		let val = wireMap[wire]
			.replace("AND", "&")
			.replace("LSHIFT", "<<")
			.replace("RSHIFT", ">>")
			.replace("NOT", "~")
			.replace("OR", "|");

		const vars = val.match(/[a-z]+/g);
		if(vars) vars.forEach(v => val = val.replace(v, get(v)))


		const ev = eval(val)
		wireMap[wire] = (ev & 0xFFFF).toString();
		return (ev & 0xFFFF).toString();
	}

	return get("a")
}