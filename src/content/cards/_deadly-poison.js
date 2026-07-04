// @todo implement posion before using this card

export default {
	name: '吐槽',
	type: 'attack',
	energy: 1,
	damage: 0,
	target: 'enemy',
	powers: {
		poison: 5,
	},
	description: '施加5层中毒。',
	image: '6.jpg',
}

export const upgrade = (card) => {
	return {
		...card,
		powers: {
			poison: 7,
		},

		description: '施加7层中毒。',
	}
}
