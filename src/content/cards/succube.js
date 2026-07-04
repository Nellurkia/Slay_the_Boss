// Succube.js
export default {
	name: 'PUA',
	type: 'attack',
	energy: 3,
	target: 'allEnemies',
	description: '对所有敌人造成2点伤害并将其转化为生命。',
	image: 'succube.png',
	damage: 2,
	actions: [
		{
			type: 'addRegenEqualToAllDamage',
		},
	],
}

export const upgrade = (card) => ({
	...card,
	damage: 3,
	name: '高级PUA+',
	description: '对所有敌人造成3点伤害并将其转化为生命。',
})
