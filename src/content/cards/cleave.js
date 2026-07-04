export default {
	name: 'AOE',
	type: 'attack',
	energy: 1,
	damage: 8,
	target: 'allEnemies',
	description: '对所有敌人造成8点伤害。',
	image: 'vernal-equinox.jpg',
}

export const upgrade = (card) => ({
	...card,
	damage: 11,
	description: '对所有敌人造成11点伤害。',
})
