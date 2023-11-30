type Spell = { cost: number, damage: number, heals: number, shield: number, turns: number, newMana: number }
type GameState = {
	player: {
		HP: number,
		mana: number,
		shield: number,
		manaSpent: number
	},
	bossHP: number,
	effects: Spell[]
}

export default function solution(input: string) {
	const [bossHP, bossDMG] = input.match(/\d+/g)!.map(Number);

	const spells: Spell[] = [
		{ cost: 53, damage: 4, heals: 0, shield: 0, turns: 0, newMana: 0 }, // magic missile
		{ cost: 73, damage: 2, heals: 2, shield: 0, turns: 0, newMana: 0 }, // drain
		// EFFECTS
		{ cost: 113, damage: 0, heals: 0, shield: 7, turns: 6, newMana: 0 }, // shield
		{ cost: 173, damage: 3, heals: 0, shield: 0, turns: 6, newMana: 0 }, // poison
		{ cost: 229, damage: 0, heals: 0, shield: 0, turns: 5, newMana: 101 } // recharge
	]

	const initialState: GameState = {
		player: {
			HP: 50,
			mana: 500,
			shield: 0,
			manaSpent: 0
		},
		bossHP: bossHP,
		effects: []
	}

	const queue: GameState[] = [initialState];
	let lowestMana = Infinity;

	while (queue.length) {
		const gameState = queue.shift()!;

		if (gameState.player.manaSpent >= lowestMana) continue;

		for (const spell of spells) {
			let GS = structuredClone(gameState);

			// # Player
			applyEffects(GS);
			GS.effects = GS.effects.filter(v => v.turns);

			if (GS.bossHP <= 0) {
				lowestMana = Math.min(GS.player.manaSpent, lowestMana);
				continue;
			}

			const alreadyActive = GS.effects.find(v => v.cost === spell.cost);
			if (alreadyActive || spell.cost > GS.player.mana) continue;

			GS.player.mana -= spell.cost;
			GS.player.manaSpent += spell.cost;

			if (!spell.turns) {
				GS.bossHP -= spell.damage;
				GS.player.HP += spell.heals;
			} else GS.effects.push(structuredClone(spell));
			if (spell.shield) GS.player.shield = spell.shield;

			if (GS.bossHP <= 0) {
				lowestMana = Math.min(GS.player.manaSpent, lowestMana);
				continue;
			}

			// # Boss
			applyEffects(GS);
			GS.effects = GS.effects.filter(v => v.turns);

			if (GS.bossHP <= 0) {
				lowestMana = Math.min(GS.player.manaSpent, lowestMana);
				continue;
			}

			GS.player.HP -= Math.max(1, bossDMG - GS.player.shield);
			if (GS.player.HP <= 0) continue;

			queue.push(GS);
		}
	}

	return lowestMana;
}

function applyEffects(GS: GameState) {
	for (const effect of GS.effects) {
		effect.turns--;
		GS.player.HP += effect.heals;
		GS.player.mana += effect.newMana;
		GS.bossHP -= effect.damage;
		GS.player.shield = Math.max(GS.player.shield, effect.shield);
		if (effect.shield && !effect.turns) GS.player.shield = 0;
	}
}