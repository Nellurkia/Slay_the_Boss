export default {
	name: '电眼',
	type: 'attack',
	energy: 2,
	damage: 8,
	target: 'enemy',
	image: 'apteryx-mantelli.jpg',
	powers: {
		vulnerable: 2,
	},
	description: '造成8点伤害。施加2层易伤。',
}

export const upgrade = (card) => {
	return {
		...card,
		damage: 10,
		description: '造成10点伤害。施加3层易伤。',
		powers: {
			vulnerable: 3,
		},
	}
}
