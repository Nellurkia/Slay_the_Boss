// SuckerPunch.js
export default {
	name: '麻了',
	type: 'attack',
	energy: 1,
	damage: 7,
	target: 'enemy',
	powers: {
		weak: 1,
	},
	description: '造成7点伤害。施加1层虚弱。',
	image: 'manicule.jpg',
}

export const upgrade = (card) => ({
	...card,
	damage: 8,
	powers: {
		weak: 2,
	},
	description: '造成8点伤害。施加2层虚弱。',
})
