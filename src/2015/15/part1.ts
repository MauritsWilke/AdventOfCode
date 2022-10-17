export default function solution(input:string) {

	const cookies = input.split("\r\n").map(cookie => {
		const name = cookie.match(/\w+/g)![0]
		const [capacity, durability, flavour, texture, calories] = cookie.match(/-*\d+/g)!.map(v => +v)
		
		return {
			capacity: capacity,
			durability: durability,
			flavour: flavour,
			texture: texture,
			calories: calories
		}
	});
	
	let bestScore = 0;
	for(let cookie0 = 0; cookie0 < 100; cookie0++){
		for(let cookie1 = 0; cookie1 < 100; cookie1++){
			for(let cookie2 = 0; cookie2 < 100; cookie2++){
				for(let cookie3 = 0; cookie3 < 100; cookie3++){
					if(cookie0 + cookie1 + cookie2 + cookie3 !== 100) continue;
					let capacity = cookies[0].capacity * cookie0 + cookies[1].capacity * cookie1 + cookies[2].capacity * cookie2 + cookies[3].capacity * cookie3;
					let durability = cookies[0].durability * cookie0 + cookies[1].durability * cookie1 + cookies[2].durability * cookie2 + cookies[3].durability * cookie3;
					let flavour = cookies[0].flavour * cookie0 + cookies[1].flavour * cookie1 + cookies[2].flavour * cookie2 + cookies[3].flavour * cookie3;
					let texture = cookies[0].texture * cookie0 + cookies[1].texture * cookie1 + cookies[2].texture * cookie2 + cookies[3].texture * cookie3;
					if([capacity,durability,flavour,texture].some(v => v <= 0)) continue;
					
					const totalScore = capacity * durability * flavour * texture;
					if(totalScore > bestScore) bestScore = totalScore
				}
			}
		}
	}

	return bestScore;
}