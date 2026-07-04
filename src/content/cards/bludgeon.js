export default {
	name: '头锤',
	type: 'attack',
	energy: 3,
	target: 'enemy',
	damage: 24,
	description: '造成24点伤害。',
	image: 'alice-holds-the-white-king.jpg',
}

export const upgrade = (card) => {
	return {
		...card,
		damage: 36,
		description: '造成36点伤害。',
	}
}
