export default {
	name: '捶打',
	type: 'attack',
	energy: 1,
	target: 'enemy',
	damage: 6,
	description: '造成6点伤害。',
	image: 'the-angel-of-death.jpg',
}

export const upgrade = (card) => {
	return {
		...card,
		damage: 9,
		description: '造成9点伤害。',
	}
}
