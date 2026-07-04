export default {
	name: '雷霆',
	type: 'attack',
	energy: 1,
	damage: 4,
	target: 'allEnemies',
	powers: {
		vulnerable: 1,
	},
	description: '造成4点伤害。对所有敌人施加1层易伤。',
	image: '4.jpg',
}

export const upgrade = (card) => {
	return {
		...card,
		damage: 6,
		description: '造成6点伤害。对所有敌人施加1层易伤。',
	}
}
