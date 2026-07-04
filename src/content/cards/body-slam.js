export default {
	name: '偷袭',
	energy: 1,
	type: 'attack',
	target: 'enemy',
	description: '造成等同于你格挡值的伤害。',
	image: 'fallback.jpg',
	actions: [
		{
			type: 'dealDamageEqualToBlock',
		},
	],
}

export const upgrade = (card) => {
	return {
		...card,
		energy: 0,
	}
}
