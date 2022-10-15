export default function solution(input:string) {
	const doc = JSON.parse(input);
	let count = 0;

	function parse(input:[]|{[key: string]: number|string}){
		if(Array.isArray(input)){
			input.forEach(v => {
				if(typeof v === "number") count += v;
				if(typeof v === "object") parse(v);
			})
		}

		if(!Array.isArray(input) && typeof input === 'object'){
			if(Object.values(input).includes("red")) return;
			for(let v of Object.values(input)){
				if(typeof v === "number") count += v;
				if(typeof v === "object") parse(v);
			}
		}
	}

	parse(doc);

	return count;
}