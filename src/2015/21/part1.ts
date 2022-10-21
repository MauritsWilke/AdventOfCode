export default function solution(input:string) {
    const bossStats = input.split("\n").map(v => +v.match(/\d+/)![0])

    const store = {
        weapons: [
            { cost: 8, damage: 4, armour: 0 },
            { cost: 10, damage: 5, armour: 0 },
            { cost: 25, damage: 6, armour: 0 },
            { cost: 40, damage: 7, armour: 0 },
            { cost: 74, damage: 8, armour: 0 }
        ],
        armour: [
            { cost: 13, damage: 0, armour: 1 },
            { cost: 31, damage: 0, armour: 2 },
            { cost: 53, damage: 0, armour: 3 },
            { cost: 75, damage: 0, armour: 4 },
            { cost: 102, damage: 0, armour: 5 },
			{ cost: 0, damage: 0, armour: 0} // Phantom armour piece :)
        ],
        rings: [
            { cost: 25, damage: 1, armour: 0 },
            { cost: 50, damage: 2, armour: 0 },
            { cost: 100, damage: 3, armour: 0 },
            { cost: 20, damage: 0, armour: 1 },
            { cost: 40, damage: 0, armour: 2 },
            { cost: 80, damage: 0, armour: 2 },
			{ cost: 0, damage: 0, armour: 0 }, // Phantom ring 👻
        ]
    }

	let combinations = [];
	for(let weapon of store.weapons){
		for(let armour of store.armour){
			for(let ring1 of store.rings){
				for(let i = store.rings.indexOf(ring1) + 1; i < store.rings.length; i++){
					const ring2 = store.rings[i]
					const totalCost = weapon.cost + armour.cost + ring1.cost + ring2.cost;
					const totalDamage = weapon.damage + ring1.damage + ring2.damage;
					const totalArmour = armour.armour + ring1.armour + ring2.armour;
					combinations.push({ cost: totalCost, damage: totalDamage, armour: totalArmour})
				}
			}
			combinations.push({cost: weapon.cost + armour.cost, damage: weapon.damage, armour: armour.armour})
		}
	}

	combinations = combinations.filter(s => {
		const player:Entity = { HP: 100, damage: s.damage, armour: s.armour};
		const boss:Entity = { HP: bossStats[0], damage: bossStats[1], armour: bossStats[2] };
		return simulateFight(player, boss)
	});

	const cheapest = combinations.reduce((a,b) => a.cost < b.cost ? a : b)
	return cheapest.cost
}

type Entity = {HP: number, damage: number, armour: number}
function simulateFight(player:Entity, boss:Entity){
    const bossTrueDMG = Math.max(1, boss.damage - player.armour);
    const playerTrueDMG = Math.max(1, player.damage - boss.armour);
    const bossMoves = Math.ceil(player.HP / bossTrueDMG);
    const playerMoves = Math.ceil(boss.HP / playerTrueDMG);
    return playerMoves <= bossMoves
}