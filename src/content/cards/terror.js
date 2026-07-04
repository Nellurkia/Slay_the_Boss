export default {
	name: '破防',
	type: 'skill',
	energy: 1,
	damage: 0,
	target: 'enemy',
	powers: {
		vulnerable: 99,
	},
	description: '施加99层易伤。消耗。',
	image: '2.jpg',
	exhaust: true,
}

export const upgrade = (card) => {
	return {
		...card,
		energy: 0,
	}
}
